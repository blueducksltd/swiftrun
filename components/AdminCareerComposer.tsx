'use client'

import { FormEvent, useState } from 'react'
import { FiPlus, FiX, FiEdit3, FiCheck } from 'react-icons/fi'

export type Career = {
    id?: string
    title: string
    category: string
    requirements: string[]
    description: string
    shouldHave: string[]
    status: 'Published' | 'Draft'
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
    const [status, setStatus] = useState<'Published' | 'Draft'>(
        initialCareer?.status || 'Draft',
    )

    const location = initialCareer?.requirements?.[0] || 'Enugu, Nigeria'
    const employmentType = initialCareer?.requirements?.[1] || 'Fulltime'
    const gender = initialCareer?.requirements?.[2] || 'Female/Male'
    const shouldHaveText = initialCareer?.shouldHave?.join('\n') || ''

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

                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            Job title <span className="text-red-500">*</span>
                        </span>
                        <input
                            required
                            name="title"
                            defaultValue={initialCareer?.title || ''}
                            placeholder="e.g. Customer Success Officer"
                            className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                        />
                    </label>

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
