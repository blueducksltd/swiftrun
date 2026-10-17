"use client";
import { careers } from '@/app/util/data';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BiChevronDown, BiCheck } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci';
import { FiArrowUpRight, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { getSafeImageUrl } from '@/lib/image-url';
import { createCareerSlug } from '@/lib/career-slug';




// ---- Dropdown primitive -------------------------------------------------
// A single, reusable dropdown styled with a restrained, "Apple-ish" language:
// translucent frosted panel, hairline border, soft shadow, tight radius,
// quiet motion (scale + fade), and a checkmark for the active row.

type DropdownOption = { label: string; value: string }

function Dropdown({
    label,
    placeholder,
    options,
    value,
    onChange,
    isOpen,
    onToggle,
}: {
    label: string
    placeholder: string
    options: DropdownOption[]
    value: string | null
    onChange: (value: string | null) => void
    isOpen: boolean
    onToggle: () => void
    icon?: React.ReactNode
}) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (isOpen) onToggle()
            }
        }
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape' && isOpen) onToggle()
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onToggle])

    const selectedLabel = options.find((o) => o.value === value)?.label

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={onToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`w-full p-5 flex items-center justify-between gap-3 rounded-full transition-colors duration-200 ease-out
                    ${isOpen ? 'bg-[#0000000D] ring-1 ring-black/10' : 'bg-[#0000000D] hover:bg-[#00000014]'}`}
            >
                <span className={`truncate text-left ${selectedLabel ? 'text-black' : 'text-black/60'}`}>
                    {selectedLabel ?? placeholder}
                </span>
                <BiChevronDown
                    size={20}
                    className={`shrink-0 text-black/50 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                role="listbox"
                aria-label={label}
                className={`absolute z-20 mt-2 w-full min-w-[220px] origin-top rounded-2xl border border-black/5
                    bg-white/90 backdrop-blur-xl shadow-[0px_12px_40px_rgba(0,0,0,0.12)] p-1.5
                    transition-all duration-150 ease-out
                    ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <button
                    type="button"
                    role="option"
                    aria-selected={value === null}
                    onClick={() => {
                        onChange(null)
                        onToggle()
                    }}
                    className="w-full flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm text-black/50 hover:bg-black/4 transition-colors duration-150"
                >
                    All {label}
                    {value === null && <BiCheck size={18} className="text-black" />}
                </button>

                <div className="my-1 h-px bg-black/5" />

                <div className="max-h-64 overflow-y-auto">
                    {options.map((option) => {
                        const active = option.value === value
                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => {
                                    onChange(option.value)
                                    onToggle()
                                }}
                                className={`w-full flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-150
                                    ${active ? 'bg-black/5 text-black font-medium' : 'text-black/80 hover:bg-black/[4'}`}
                            >
                                <span className="truncate">{option.label}</span>
                                {active && <BiCheck size={18} className="text-black shrink-0" />}
                            </button>
                        )
                    })}
                    {options.length === 0 && (
                        <p className="px-3.5 py-2.5 text-sm text-black/40">No options</p>
                    )}
                </div>
            </div>
        </div>
    )
}

// ---- Main component ------------------------------------------------------

type CareerItem = {
    id: string
    title: string
    category: string
    requirements: string[]
    description?: string
    shouldHave?: string[]
    image?: string
}

function getCategoryTheme(category: string) {
    const cat = (category || '').toLowerCase()
    if (cat.includes('tech') || cat.includes('engine') || cat.includes('product')) {
        return {
            gradient: 'from-[#063f70] via-[#066ac0] to-[#1893a6]',
            accent: '#066ac0',
        }
    }
    if (cat.includes('market') || cat.includes('design') || cat.includes('brand')) {
        return {
            gradient: 'from-[#6c1d45] via-[#c93b76] to-[#ffb5cb]',
            accent: '#c93b76',
        }
    }
    if (cat.includes('sale') || cat.includes('growth') || cat.includes('biz')) {
        return {
            gradient: 'from-[#823b12] via-[#d96b27] to-[#ffdebc]',
            accent: '#d96b27',
        }
    }
    if (cat.includes('customer') || cat.includes('support')) {
        return {
            gradient: 'from-[#0b4d45] via-[#1c8374] to-[#7be0d2]',
            accent: '#1c8374',
        }
    }
    return {
        gradient: 'from-[#0f242b] via-[#1d4d5b] to-[#408b9e]',
        accent: '#1d4d5b',
    }
}

export default function CareerGrid() {
    const [databaseCareers, setDatabaseCareers] = useState<CareerItem[]>([])
    const [openDropdown, setOpenDropdown] = useState<'category' | 'location' | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch('/api/careers')
            .then(async (response) => {
                if (response.ok) setDatabaseCareers((await response.json()) as CareerItem[])
            })
            .catch(() => undefined)
    }, [])
    const availableCareers: CareerItem[] = databaseCareers.length
        ? databaseCareers
        : (careers as unknown as CareerItem[])

    const categoryOptions: DropdownOption[] = useMemo(() => {
        const unique = Array.from(new Set(availableCareers.map((c) => c.category)))
        return unique.map((c) => ({ label: c, value: c }))
    }, [availableCareers])

    const locationOptions: DropdownOption[] = useMemo(() => {
        const unique = Array.from(
            new Set(availableCareers.map((c) => c.requirements?.[0]).filter(Boolean))
        )
        return unique.map((l) => ({ label: l, value: l }))
    }, [availableCareers])

    const filteredCareers = useMemo(() => {
        return availableCareers.filter((item) => {
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true
            const matchesLocation = selectedLocation ? item.requirements?.[0] === selectedLocation : true
            const matchesSearch = search.trim()
                ? item.title.toLowerCase().includes(search.trim().toLowerCase())
                : true
            return matchesCategory && matchesLocation && matchesSearch
        })
    }, [availableCareers, selectedCategory, selectedLocation, search])

    const toggleDropdown = (name: 'category' | 'location') => {
        setOpenDropdown((current) => (current === name ? null : name))
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-0 md:p-20 md:pb-10 relative z-10 mb-6'>
                <Dropdown
                    label="categories"
                    placeholder="Filter category"
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    isOpen={openDropdown === 'category'}
                    onToggle={() => toggleDropdown('category')}
                />

                <Dropdown
                    label="locations"
                    placeholder="Location"
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    isOpen={openDropdown === 'location'}
                    onToggle={() => toggleDropdown('location')}
                />

                <div className='p-5 flex items-center gap-2 bg-[#0000000D] rounded-full focus-within:ring-1 focus-within:ring-black/10 transition-shadow duration-200'>
                    <CiSearch size={20} className="text-black/50 shrink-0" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='outline-none bg-transparent w-full placeholder:text-black/50'
                        placeholder='Search'
                    />
                </div>
            </div>

            {(selectedCategory || selectedLocation || search) && (
                <div className='px-0 md:px-20 pb-2 flex flex-wrap items-center gap-2 text-sm text-black/50'>
                    <span>{filteredCareers.length} result{filteredCareers.length === 1 ? '' : 's'}</span>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedCategory(null)
                            setSelectedLocation(null)
                            setSearch('')
                        }}
                        className="underline decoration-black/20 hover:decoration-black/50 transition-colors"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-16 p-0 md:p-5 md:pt-5'>
                {filteredCareers.map((item, index) => {
                    const safeImage = getSafeImageUrl(item.image)
                    const theme = getCategoryTheme(item.category)
                    const location = item.requirements?.[0]
                    const employmentType = item.requirements?.[1]

                    return (
                        <Link
                            href={`/career/${createCareerSlug(item.title)}`}
                            key={item.id || index}
                            className="group flex"
                        >
                            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-[32px] bg-white border border-black/5 shadow-[0px_4px_30px_#0000000d] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_20px_40px_rgba(6,106,192,0.14)]">
                                {/* Modern Image Header */}
                                <div className="relative h-52 w-full overflow-hidden bg-[#063f70]">
                                    {safeImage ? (
                                        <>
                                            <Image
                                                src={safeImage}
                                                alt={item.title}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />
                                        </>
                                    ) : (
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} flex items-center justify-center p-6 text-white`}
                                        >
                                            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-xl" />
                                            <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-black/15 blur-xl" />
                                            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                                                    <FiBriefcase className="h-6 w-6 text-white" />
                                                </div>
                                                <span className="mt-2 text-[11px] font-semibold tracking-wider uppercase text-white/80">
                                                    SwiftRun Careers
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Floating Category Pill */}
                                    <div className="absolute left-4 top-4 z-10">
                                        <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0f242b] shadow-sm backdrop-blur-md">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Floating Status Badge */}
                                    <div className="absolute right-4 top-4 z-10">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
                                            Hiring
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold text-[#0f242b] transition-colors group-hover:text-[#066ac0] line-clamp-2">
                                            {item.title}
                                        </h2>

                                        {/* Requirements / Tags */}
                                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#52636a]">
                                            {location && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f4] px-3 py-1 font-medium text-[#2d4249]">
                                                    <FiMapPin className="text-[#066ac0]" />
                                                    {location}
                                                </span>
                                            )}
                                            {employmentType && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f4] px-3 py-1 font-medium text-[#2d4249]">
                                                    <FiBriefcase className="text-[#066ac0]" />
                                                    {employmentType}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom CTA Bar */}
                                    <div className="mt-6 flex items-center justify-between border-t border-[#f0f4f2] pt-4">
                                        <span className="text-xs font-bold text-[#066ac0] group-hover:underline">
                                            View role details
                                        </span>
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f2fb] text-[#066ac0] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#066ac0] group-hover:text-white">
                                            <FiArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}

                {filteredCareers.length === 0 && (
                    <div className='md:col-span-3 text-center py-20 text-black/40'>
                        No openings match your filters right now.
                    </div>
                )}
            </div>
        </div>
    )
}