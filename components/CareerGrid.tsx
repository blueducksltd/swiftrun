"use client";
import { careers } from '@/app/util/data';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BiChevronDown, BiCheck } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci';




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
    icon,
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

export default function CareerGrid() {
    const [openDropdown, setOpenDropdown] = useState<'category' | 'location' | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    const categoryOptions: DropdownOption[] = useMemo(() => {
        const unique = Array.from(new Set(careers.map((c) => c.category)))
        return unique.map((c) => ({ label: c, value: c }))
    }, [])

    const locationOptions: DropdownOption[] = useMemo(() => {
        const unique = Array.from(
            new Set(careers.map((c) => c.requirements[0]).filter(Boolean))
        )
        return unique.map((l) => ({ label: l, value: l }))
    }, [])

    const filteredCareers = useMemo(() => {
        return careers.filter((item) => {
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true
            const matchesLocation = selectedLocation ? item.requirements[0] === selectedLocation : true
            const matchesSearch = search.trim()
                ? item.title.toLowerCase().includes(search.trim().toLowerCase())
                : true
            return matchesCategory && matchesLocation && matchesSearch
        })
    }, [selectedCategory, selectedLocation, search])

    const toggleDropdown = (name: 'category' | 'location') => {
        setOpenDropdown((current) => (current === name ? null : name))
    }



    return (
        <div className=''>
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

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-20 p-0 md:p-5 md:pt-5'>
                {
                    filteredCareers.map((item, index) =>
                        <Link href={`/career/${item.id}`} key={index} className='flex'>
                            <div key={index} className='shadow-[0px_4px_30px_#0000001A] bg-white w-full  rounded-4xl p-10 flex flex-col justify-between'>
                                <div>
                                    <p className='mb-2 text-[#00000033]'>{item.category}</p>
                                    <h1 className='font-bold text-3xl'>{item.title}</h1>
                                </div>
                                <div className='mt-10 opacity-70 text-base md:text-sm grid gap-2'>
                                    {item.requirements.map((requirement, requirementsIndex) => <div key={requirementsIndex} className='flex items-center gap-2'>
                                        <div className='w-2 h-2 rounded-full outline-1 outline-offset-2 bg-black'></div>
                                        <p>{requirement}</p>
                                    </div>)}
                                </div>
                            </div>
                        </Link>
                    )
                }

                {filteredCareers.length === 0 && (
                    <div className='md:col-span-3 text-center py-20 text-black/40'>
                        No openings match your filters right now.
                    </div>
                )}
            </div>
        </div>
    )
}