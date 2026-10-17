'use client'

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { FiPlus, FiX, FiEdit3, FiUploadCloud, FiImage, FiTrash2, FiLink } from 'react-icons/fi'
import { getSafeImageUrl } from '@/lib/image-url'

export type Career = {
    id?: string
    title: string
    category: string
    requirements: string[]
    description: string
    shouldHave: string[]
    status: 'Published' | 'Draft'
    image?: string
}

type Props = {
    onClose: () => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    submitting: boolean
    initialCareer?: Career | null
}

export default function AdminCareerComposer({
    onClose,
    onSubmit,
    submitting,
    initialCareer,
}: Props) {
    const isEditing = Boolean(initialCareer)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [status, setStatus] = useState<'Published' | 'Draft'>(
        initialCareer?.status || 'Draft',
    )
    const [existingImage, setExistingImage] = useState<string>(
        initialCareer?.image || '',
    )
    const [imagePreview, setImagePreview] = useState<string>(() => {
        return getSafeImageUrl(initialCareer?.image)
    })
    const [isDragging, setIsDragging] = useState(false)
    const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload')
    const [imageUrlInput, setImageUrlInput] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')

    const location = initialCareer?.requirements?.[0] || 'Enugu, Nigeria'
    const employmentType = initialCareer?.requirements?.[1] || 'Fulltime'
    const gender = initialCareer?.requirements?.[2] || 'Female/Male'
    const shouldHaveText = initialCareer?.shouldHave?.join('\n') || ''

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (PNG, JPG, or WebP)')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be under 5MB')
            return
        }
        setFileName(file.name)
        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(String(reader.result))
        }
        reader.readAsDataURL(file)
    }

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                fileInputRef.current.files = dataTransfer.files
            }
            handleFile(file)
        }
    }

    const handleClearImage = () => {
        setImagePreview('')
        setExistingImage('')
        setImageUrlInput('')
        setFileName('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleUrlBlur = () => {
        if (imageUrlInput.trim()) {
            setImagePreview(getSafeImageUrl(imageUrlInput.trim()))
            setExistingImage(imageUrlInput.trim())
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#063f70]/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
                <div className="flex justify-between items-start border-b border-[#edf1ef] pb-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                            {isEditing ? 'Update opening' : 'New opening'}
                        </p>
                        <h2 className="mt-1 font-heading text-2xl font-bold text-[#0f242b]">
                            {isEditing ? 'Edit job opening' : 'Add a job opening'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-2 text-[#718187] hover:bg-[#f1f6f4] transition"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                    {isEditing && (
                        <input
                            type="hidden"
                            name="id"
                            value={initialCareer?.id}
                        />
                    )}
                    <input type="hidden" name="status" value={status} />
                    <input type="hidden" name="existingImage" value={existingImage} />

                    {/* Job Title */}
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            Job title <span className="text-red-500">*</span>
                        </span>
                        <input
                            required
                            name="title"
                            defaultValue={initialCareer?.title || ''}
                            placeholder="e.g. Operations Coordinator"
                            className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                        />
                    </label>

                    {/* Category, Status, Location, Employment, Gender */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                Category
                            </span>
                            <select
                                name="category"
                                defaultValue={initialCareer?.category || 'Operations'}
                                className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            >
                                <option>Marketing</option>
                                <option>Sales</option>
                                <option>Operations</option>
                                <option>Technology</option>
                                <option>Customer Service</option>
                                <option>Design</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                Status
                            </span>
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as 'Published' | 'Draft',
                                    )
                                }
                                className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            >
                                <option value="Draft">Draft (Internal)</option>
                                <option value="Published">Published (Public)</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                Location
                            </span>
                            <input
                                name="location"
                                defaultValue={location}
                                className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                Employment type
                            </span>
                            <input
                                name="employmentType"
                                defaultValue={employmentType}
                                className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            />
                        </label>

                        <label className="block sm:col-span-2">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                Gender preference
                            </span>
                            <input
                                name="gender"
                                defaultValue={gender}
                                className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            />
                        </label>
                    </div>

                    {/* Image Upload Space */}
                    <div className="rounded-2xl border border-[#d9e5e1] bg-[#f8fbfa] p-4 sm:p-5">
                        <div className="flex items-center justify-between pb-3 border-b border-[#e7eee9]">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#066ac0]">
                                    <FiImage className="h-4 w-4" />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#152329]">
                                        Job Image
                                    </span>
                                    <span className="text-[11px] text-[#819096]">
                                        Featured photo for career card & detail page
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 rounded-lg bg-[#edf3f1] p-1 text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setImageInputMode('upload')}
                                    className={`rounded-md px-2.5 py-1 transition ${imageInputMode === 'upload' ? 'bg-white text-[#066ac0] shadow-sm' : 'text-[#718187] hover:text-black'}`}
                                >
                                    Upload
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageInputMode('url')}
                                    className={`rounded-md px-2.5 py-1 transition ${imageInputMode === 'url' ? 'bg-white text-[#066ac0] shadow-sm' : 'text-[#718187] hover:text-black'}`}
                                >
                                    Image URL
                                </button>
                            </div>
                        </div>

                        {/* Hidden Native File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="imageFile"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleFileInputChange}
                            className="hidden"
                        />

                        {imagePreview ? (
                            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-[#d9e5e1] bg-white p-3">
                                <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-[#e1eae7] bg-[#edf2f0]">
                                    <Image
                                        src={imagePreview}
                                        alt="Career preview"
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 space-y-1 text-left">
                                    <p className="truncate text-xs font-bold text-[#152329]">
                                        {fileName || (existingImage ? 'Current job image' : 'Selected image')}
                                    </p>
                                    <p className="text-[11px] text-[#819096]">
                                        This image will be showcased on the job card and job spotlight banner.
                                    </p>
                                    <div className="pt-2 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9e5e1] bg-white px-3 py-1.5 text-xs font-semibold text-[#066ac0] hover:bg-[#f1f6f4] transition"
                                        >
                                            <FiUploadCloud className="h-3.5 w-3.5" />
                                            Replace
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearImage}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#f3d4d0] bg-white px-3 py-1.5 text-xs font-semibold text-[#c5574d] hover:bg-[#fef2f2] transition"
                                        >
                                            <FiTrash2 className="h-3.5 w-3.5" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : imageInputMode === 'upload' ? (
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setIsDragging(true)
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${isDragging ? 'border-[#066ac0] bg-[#eef5fa]' : 'border-[#cfe0da] bg-white hover:border-[#066ac0] hover:bg-[#f7fbfd]'}`}
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f2fb] text-[#066ac0]">
                                    <FiUploadCloud className="h-5 w-5" />
                                </div>
                                <p className="mt-2 text-xs font-bold text-[#152329]">
                                    Click to upload or drag and drop
                                </p>
                                <p className="mt-1 text-[11px] text-[#819096]">
                                    PNG, JPG, or WebP (max. 5MB)
                                </p>
                            </div>
                        ) : (
                            <div className="mt-4 space-y-2">
                                <label className="block">
                                    <span className="mb-1 block text-xs font-semibold text-[#718187]">
                                        Paste direct image URL
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            name="imageUrl"
                                            value={imageUrlInput}
                                            onChange={(e) => setImageUrlInput(e.target.value)}
                                            onBlur={handleUrlBlur}
                                            placeholder="https://example.com/team-photo.jpg"
                                            className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-2.5 pl-9 text-xs outline-none focus:border-[#066ac0]"
                                        />
                                        <FiLink className="absolute left-3 top-3 h-3.5 w-3.5 text-[#9aa9ac]" />
                                    </div>
                                </label>
                                <p className="text-[11px] text-[#819096]">
                                    Enter a direct link to an image. It will be loaded and displayed on the job card.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Job Description */}
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            Job description <span className="text-red-500">*</span>
                        </span>
                        <textarea
                            required
                            name="description"
                            rows={6}
                            defaultValue={initialCareer?.description || ''}
                            placeholder="Describe the role, mission, and key responsibilities"
                            className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                        />
                    </label>

                    {/* What you should have */}
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            What you should have (One requirement per line)
                        </span>
                        <textarea
                            name="shouldHave"
                            rows={5}
                            defaultValue={shouldHaveText}
                            placeholder="e.g. 2+ years experience in logistics&#10;Excellent communication skills&#10;Fluency in English"
                            className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                        />
                    </label>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-[#edf1ef] pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="rounded-xl px-4 py-3 text-sm font-bold text-[#718187] hover:bg-[#f1f6f4] transition disabled:opacity-40"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#05579e] disabled:cursor-wait disabled:opacity-80"
                        >
                            {submitting ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />{' '}
                                    Saving...
                                </>
                            ) : (
                                <>
                                    {isEditing ? <FiEdit3 /> : <FiPlus />}
                                    {isEditing ? 'Update opening' : 'Save draft'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
