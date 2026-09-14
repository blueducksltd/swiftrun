'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { FiPlus, FiX, FiCheck, FiUploadCloud, FiEdit3 } from 'react-icons/fi'
import BlogWysiwygEditor from './BlogWysiwygEditor'

export type Blog = {
    id?: string
    title: string
    content: string
    category: string
    image?: string
    createdAt?: string
    date?: string
    status: 'Published' | 'Draft'
}

export type Partner = {
    id?: string
    name: string
    category: string
    location: string
    image?: string
    logo?: string
    url: string
    createdAt?: string
    status: 'Published' | 'Draft' | 'Active' | 'Pending'
}

type Props = {
    type: 'blog' | 'partner'
    isSubmitting: boolean
    onClose: () => void
    onBlogSubmit: (event: FormEvent<HTMLFormElement>) => void
    onPartnerSubmit: (event: FormEvent<HTMLFormElement>) => void
    initialBlog?: Blog | null
    initialPartner?: Partner | null
}

export default function AdminComposer({
    type,
    isSubmitting,
    onClose,
    onBlogSubmit,
    onPartnerSubmit,
    initialBlog,
    initialPartner,
}: Props) {
    const isBlog = type === 'blog'
    const isEditing = isBlog ? Boolean(initialBlog) : Boolean(initialPartner)

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#063f70]/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div
                className={`max-h-[95vh] w-full ${
                    isBlog ? 'max-w-5xl' : 'max-w-2xl'
                } overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8 transition-all`}
            >
                <div className="flex items-start justify-between border-b border-[#edf1ef] pb-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                            {isEditing
                                ? isBlog
                                    ? 'Update content'
                                    : 'Update connection'
                                : isBlog
                                  ? 'New content'
                                  : 'New connection'}
                        </p>
                        <h2 className="mt-1 font-heading text-2xl font-bold text-[#0f242b]">
                            {isEditing
                                ? isBlog
                                    ? 'Edit blog post'
                                    : 'Edit partner'
                                : isBlog
                                  ? 'Add a blog post'
                                  : 'Add a partner'}
                        </h2>
                        <p className="mt-1 text-sm text-[#819096]">
                            {isEditing
                                ? 'Make your edits and save the updated information.'
                                : isBlog
                                  ? 'Write and format your story with the full WYSIWYG editor before publishing.'
                                  : 'Add a business to your SwiftRun partner network.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-[#718187] hover:bg-[#f1f6f4] transition"
                        aria-label="Close form"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                {isBlog ? (
                    <BlogForm
                        isSubmitting={isSubmitting}
                        onSubmit={onBlogSubmit}
                        onClose={onClose}
                        initialBlog={initialBlog}
                    />
                ) : (
                    <PartnerForm
                        isSubmitting={isSubmitting}
                        onSubmit={onPartnerSubmit}
                        onClose={onClose}
                        initialPartner={initialPartner}
                    />
                )}
            </div>
        </div>
    )
}

function PartnerForm({
    isSubmitting,
    onSubmit,
    onClose,
    initialPartner,
}: {
    isSubmitting: boolean
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onClose: () => void
    initialPartner?: Partner | null
}) {
    const isEditing = Boolean(initialPartner)
    const [imagePreview, setImagePreview] = useState<string>(() => {
        if (!initialPartner?.image) return ''
        return initialPartner.image.startsWith('http')
            ? `/api/blogs/blob?url=${encodeURIComponent(initialPartner.image)}`
            : initialPartner.image
    })
    const [logoPreview, setLogoPreview] = useState<string>(() => {
        if (!initialPartner?.logo) return ''
        return initialPartner.logo.startsWith('http')
            ? `/api/blogs/blob?url=${encodeURIComponent(initialPartner.logo)}`
            : initialPartner.logo
    })

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setImagePreview(String(reader.result))
        reader.readAsDataURL(file)
    }

    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setLogoPreview(String(reader.result))
        reader.readAsDataURL(file)
    }

    return (
        <form onSubmit={onSubmit} className="mt-7 space-y-5">
            {isEditing && (
                <>
                    <input type="hidden" name="id" value={initialPartner?.id} />
                    <input
                        type="hidden"
                        name="existingImage"
                        value={initialPartner?.image || ''}
                    />
                    <input
                        type="hidden"
                        name="existingLogo"
                        value={initialPartner?.logo || ''}
                    />
                </>
            )}

            <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                    Business name <span className="text-red-500">*</span>
                </span>
                <input
                    required
                    name="name"
                    defaultValue={initialPartner?.name || ''}
                    placeholder="e.g. The Green Basket"
                    className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                        Business type
                    </span>
                    <select
                        name="category"
                        defaultValue={initialPartner?.category || 'Groceries'}
                        className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                    >
                        <option>Groceries</option>
                        <option>Restaurant</option>
                        <option>Healthcare</option>
                        <option>Other</option>
                    </select>
                </label>
                <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                        Location
                    </span>
                    <input
                        name="location"
                        defaultValue={initialPartner?.location || 'Lagos, NG'}
                        className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                    />
                </label>
            </div>
            <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                    Partner URL <span className="text-red-500">*</span>
                </span>
                <input
                    required
                    type="url"
                    name="url"
                    defaultValue={initialPartner?.url || ''}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            Partner image {isEditing ? '(Optional to replace)' : '*'}
                        </span>
                        <input
                            type="file"
                            name="imageFile"
                            required={!isEditing && !initialPartner?.image}
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="w-full rounded-xl border border-dashed border-[#b7cfc8] px-3 py-2.5 text-xs text-[#819096]"
                        />
                    </label>
                    {imagePreview && (
                        <div className="relative mt-2 h-20 w-36 rounded-lg overflow-hidden border border-[#d9e5e1]">
                            <Image
                                src={imagePreview}
                                alt="Partner preview"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            Partner logo {isEditing ? '(Optional to replace)' : '*'}
                        </span>
                        <input
                            type="file"
                            name="logoFile"
                            required={!isEditing && !initialPartner?.logo}
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleLogoChange}
                            className="w-full rounded-xl border border-dashed border-[#b7cfc8] px-3 py-2.5 text-xs text-[#819096]"
                        />
                    </label>
                    {logoPreview && (
                        <div className="relative mt-2 h-20 w-20 rounded-lg overflow-hidden border border-[#d9e5e1]">
                            <Image
                                src={logoPreview}
                                alt="Logo preview"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#edf1ef] pt-5">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-[#718187] disabled:opacity-40"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-80"
                >
                    {isSubmitting ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />{' '}
                            Saving...
                        </>
                    ) : (
                        <>
                            {isEditing ? <FiEdit3 /> : <FiPlus />}
                            {isEditing ? 'Update partner' : 'Add partner'}
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

function BlogForm({
    isSubmitting,
    onSubmit,
    onClose,
    initialBlog,
}: {
    isSubmitting: boolean
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onClose: () => void
    initialBlog?: Blog | null
}) {
    const isEditing = Boolean(initialBlog)

    const [imagePreview, setImagePreview] = useState<string>(() => {
        if (!initialBlog?.image) return ''
        return initialBlog.image.startsWith('http')
            ? `/api/blogs/blob?url=${encodeURIComponent(initialBlog.image)}`
            : initialBlog.image
    })
    const [blogStatus, setBlogStatus] = useState<'Draft' | 'Published'>(
        initialBlog?.status || 'Draft',
    )
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleCoverImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            setImagePreview('')
            return
        }
        const reader = new FileReader()
        reader.onload = () => setImagePreview(String(reader.result))
        reader.readAsDataURL(file)
    }

    const clearCoverImage = () => {
        setImagePreview('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <input type="hidden" name="status" value={blogStatus} />
            {isEditing && (
                <>
                    <input type="hidden" name="id" value={initialBlog?.id} />
                    <input
                        type="hidden"
                        name="existingImage"
                        value={imagePreview ? initialBlog?.image || '' : ''}
                    />
                </>
            )}

            {/* Post Title */}
            <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                    Post title <span className="text-red-500">*</span>
                </span>
                <input
                    required
                    name="title"
                    defaultValue={initialBlog?.title || ''}
                    placeholder="e.g. The Future of Fast Logistics: Delivering Beyond Boundaries"
                    className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm font-medium outline-none focus:border-[#066ac0] transition"
                />
            </label>

            {/* Category and Publication Status */}
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                        Category
                    </span>
                    <select
                        name="category"
                        defaultValue={initialBlog?.category || 'Product'}
                        className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0] transition"
                    >
                        <option>Product</option>
                        <option>Business</option>
                        <option>Community</option>
                        <option>How Tos</option>
                        <option>News</option>
                    </select>
                </label>

                <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                        Publication Status
                    </span>
                    <select
                        value={blogStatus}
                        onChange={(e) =>
                            setBlogStatus(
                                e.target.value as 'Draft' | 'Published',
                            )
                        }
                        className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0] transition"
                    >
                        <option value="Draft">Draft (Only Admins Can See)</option>
                        <option value="Published">Published (Public to All Readers)</option>
                    </select>
                </label>
            </div>

            {/* Cover Image */}
            <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                    Cover Image {isEditing ? '(Optional to replace)' : ''}
                </span>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex-1 w-full">
                        <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#b7cfc8] bg-[#f8faf9] p-4 text-center cursor-pointer hover:bg-[#f1f6f4] hover:border-[#066ac0] transition">
                            <FiUploadCloud className="h-6 w-6 text-[#066ac0]" />
                            <span className="mt-1 text-xs font-semibold text-[#324349]">
                                {imagePreview
                                    ? 'Change cover image'
                                    : 'Upload post cover photo'}
                            </span>
                            <span className="text-[11px] text-[#819096]">
                                PNG, JPG, or WebP up to 5MB
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="imageFile"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleCoverImage}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {imagePreview && (
                        <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-[#d9e5e1] shrink-0 shadow-2xs group">
                            <Image
                                src={imagePreview}
                                alt="Selected blog cover preview"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={clearCoverImage}
                                className="absolute top-1.5 right-1.5 rounded-lg bg-black/60 p-1 text-white hover:bg-black transition"
                                title="Remove cover image"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* WYSIWYG Content Editor */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                        Article Content <span className="text-red-500">*</span>
                    </span>
                    <span className="text-xs text-[#819096]">
                        Full WYSIWYG Editor
                    </span>
                </div>
                <BlogWysiwygEditor
                    key={initialBlog?.id || 'new-blog'}
                    initialContent={initialBlog?.content || ''}
                    name="content"
                    minHeight="380px"
                />
            </div>

            {/* Submit & Cancel Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf1ef] pt-5">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-[#718187] hover:bg-[#f1f6f4] transition disabled:opacity-40"
                >
                    Cancel
                </button>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setBlogStatus('Draft')}
                        className="flex items-center gap-2 rounded-xl border border-[#d9e5e1] bg-white px-5 py-3 text-sm font-bold text-[#40535a] hover:bg-[#f8faf9] hover:border-[#066ac0] transition disabled:opacity-40"
                    >
                        {isEditing ? 'Save as Draft' : 'Save as Draft'}
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setBlogStatus('Published')}
                        className="flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#05579e] transition disabled:cursor-wait disabled:opacity-80"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />{' '}
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiCheck className="h-4 w-4" />{' '}
                                {isEditing
                                    ? blogStatus === 'Published'
                                        ? 'Update & Publish'
                                        : 'Update Post'
                                    : blogStatus === 'Published'
                                      ? 'Publish Post'
                                      : 'Save & Publish'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}
