'use client'

import { FormEvent, useEffect, useState } from 'react'
import {
    FiArrowUpRight,
    FiBell,
    FiBookOpen,
    FiChevronDown,
    FiChevronRight,
    FiGrid,
    FiImage,
    FiLogOut,
    FiMenu,
    FiMoreHorizontal,
    FiPlus,
    FiSearch,
    FiSettings,
    FiTrash2,
    FiUsers,
    FiX,
} from 'react-icons/fi'

import AdminComposer from '@/components/AdminComposer'
import AdminCareerComposer from '@/components/AdminCareerComposer'
import AdminLogin from '@/components/AdminLogin'

type View = 'overview' | 'blogs' | 'partners' | 'careers' | 'applications'

type Blog = {
    id?: string
    title: string
    content: string
    category: string
    image?: string
    createdAt?: string
    date: string
    status: 'Published' | 'Draft'
}

type Partner = {
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

type Career = {
    id?: string
    title: string
    category: string
    requirements: string[]
    description: string
    shouldHave: string[]
    status: 'Published' | 'Draft'
}

type Application = {
    id: string
    name: string
    email: string
    phone: string
    careerTitle: string
    coverLetter: string
    cvUrl: string
    createdAt: string
    status: string
}

const navItems: {
    label: string
    value: View
    icon: typeof FiGrid
}[] = [
        { label: 'Overview', value: 'overview', icon: FiGrid },
        { label: 'Blogs', value: 'blogs', icon: FiBookOpen },
        { label: 'Partners', value: 'partners', icon: FiUsers },
        { label: 'Careers', value: 'careers', icon: FiUsers },
        { label: 'Applications', value: 'applications', icon: FiBookOpen },
    ]

export default function Admin() {
    const [activeView, setActiveView] = useState<View>('overview')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [composer, setComposer] = useState<
        'blog' | 'partner' | 'career' | null
    >(null)
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [partners, setPartners] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(
        null,
    )
    const [careers, setCareers] = useState<Career[]>([])
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
    const [applications, setApplications] = useState<Application[]>([])
    const [authState, setAuthState] = useState<
        'checking' | 'unauthenticated' | 'authenticated'
    >('checking')

    useEffect(() => {
        fetch('/api/admin/auth/session')
            .then((response) =>
                setAuthState(
                    response.ok ? 'authenticated' : 'unauthenticated',
                ),
            )
            .catch(() => setAuthState('unauthenticated'))
    }, [])

    useEffect(() => {
        if (authState !== 'authenticated') return

        Promise.all([
            fetch('/api/admin/blogs'),
            fetch('/api/admin/partners'),
            fetch('/api/admin/careers'),
            fetch('/api/admin/applications'),
        ])
            .then(
                async ([
                    blogResponse,
                    partnerResponse,
                    careerResponse,
                    applicationResponse,
                ]) => {
                    if (
                        !blogResponse.ok ||
                        !partnerResponse.ok ||
                        !careerResponse.ok ||
                        !applicationResponse.ok
                    ) {
                        throw new Error()
                    }

                    setBlogs(await blogResponse.json())
                    setPartners(await partnerResponse.json())
                    setCareers(await careerResponse.json())
                    setApplications(await applicationResponse.json())
                },
            )
            .catch(() => setError('Connect MongoDB to load saved content.'))
            .finally(() => setLoading(false))
    }, [authState])

    const addBlog = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSaving(true)

        const form = new FormData(event.currentTarget)

        try {
            const imageFile = form.get('imageFile')
            let image = ''

            if (imageFile instanceof File && imageFile.size > 0) {
                const uploadData = new FormData()
                uploadData.append('file', imageFile)

                const uploadResponse = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: uploadData,
                })

                const uploadResult = await uploadResponse.json()

                if (!uploadResponse.ok) {
                    throw new Error(
                        uploadResult.error || 'The image could not be uploaded.',
                    )
                }

                image = uploadResult.url
            }

            const response = await fetch('/api/admin/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: form.get('title'),
                    content: form.get('content'),
                    category: form.get('category'),
                    image,
                    status: 'Draft',
                }),
            })

            if (!response.ok) {
                throw new Error('The blog could not be saved.')
            }

            const blog = (await response.json()) as Blog

            setBlogs((current) => [blog, ...current])
            setComposer(null)
            setActiveView('blogs')
        } catch (saveError) {
            setError(
                saveError instanceof Error
                    ? saveError.message
                    : 'The blog could not be saved.',
            )
        } finally {
            setSaving(false)
        }
    }

    const updateBlogStatus = async (
        blog: Blog,
        status: Blog['status'],
    ) => {
        const response = await fetch('/api/admin/blogs', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: blog.id,
                status,
            }),
        })

        if (!response.ok) {
            return setError('The blog status could not be updated.')
        }

        const updated = (await response.json()) as Blog

        setBlogs((current) =>
            current.map((item) =>
                item.id === updated.id ? updated : item,
            ),
        )

        setSelectedBlog(null)
    }

    const deleteBlog = async (blog: Blog) => {
        const response = await fetch(
            `/api/admin/blogs?id=${blog.id}`,
            {
                method: 'DELETE',
            },
        )

        if (!response.ok) {
            return setError('The blog could not be deleted.')
        }

        setBlogs((current) =>
            current.filter((item) => item.id !== blog.id),
        )

        setSelectedBlog(null)
    }

    const addPartner = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        setSaving(true)

        const form = new FormData(event.currentTarget)

        try {
            const upload = async (field: string) => {
                const file = form.get(field)

                if (!(file instanceof File) || file.size === 0) {
                    return ''
                }

                const uploadData = new FormData()
                uploadData.append('file', file)

                const uploadResponse = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: uploadData,
                })

                const uploadResult = await uploadResponse.json()

                if (!uploadResponse.ok) {
                    throw new Error(
                        uploadResult.error || 'An image could not be uploaded.',
                    )
                }

                return uploadResult.url as string
            }

            const [image, logo] = await Promise.all([
                upload('imageFile'),
                upload('logoFile'),
            ])

            const response = await fetch('/api/admin/partners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.get('name'),
                    category: form.get('category'),
                    location: form.get('location'),
                    url: form.get('url'),
                    image,
                    logo,
                }),
            })

            if (!response.ok) {
                throw new Error(
                    (await response.json()).error ||
                    'The partner could not be saved.',
                )
            }

            const partner = (await response.json()) as Partner

            setPartners((current) => [partner, ...current])
            setComposer(null)
            setActiveView('partners')
        } catch (saveError) {
            setError(
                saveError instanceof Error
                    ? saveError.message
                    : 'The partner could not be saved.',
            )
        } finally {
            setSaving(false)
        }
    }

    const updatePartnerStatus = async (
        partner: Partner,
        status: 'Published' | 'Draft',
    ) => {
        const response = await fetch('/api/admin/partners', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: partner.id,
                status,
            }),
        })

        if (!response.ok) {
            return setError('The partner status could not be updated.')
        }

        const updated = (await response.json()) as Partner

        setPartners((current) =>
            current.map((item) =>
                item.id === updated.id ? updated : item,
            ),
        )

        setSelectedPartner(null)
    }

    const deletePartner = async (partner: Partner) => {
        const response = await fetch(
            `/api/admin/partners?id=${partner.id}`,
            {
                method: 'DELETE',
            },
        )

        if (!response.ok) {
            return setError('The partner could not be deleted.')
        }

        setPartners((current) =>
            current.filter((item) => item.id !== partner.id),
        )

        setSelectedPartner(null)
    }

    const addCareer = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        setSaving(true)

        const form = new FormData(event.currentTarget)

        try {
            const response = await fetch('/api/admin/careers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: form.get('title'),
                    category: form.get('category'),
                    location: form.get('location'),
                    employmentType: form.get('employmentType'),
                    gender: form.get('gender'),
                    description: form.get('description'),
                    shouldHave: String(form.get('shouldHave') || '')
                        .split('\n')
                        .map((item) => item.trim())
                        .filter(Boolean),
                }),
            })

            if (!response.ok) {
                throw new Error(
                    (await response.json()).error ||
                    'The job opening could not be saved.',
                )
            }

            const career = (await response.json()) as Career

            setCareers((current) => [career, ...current])
            setComposer(null)
            setActiveView('careers')
        } catch (saveError) {
            setError(
                saveError instanceof Error
                    ? saveError.message
                    : 'The job opening could not be saved.',
            )
        } finally {
            setSaving(false)
        }
    }

    const updateCareerStatus = async (
        career: Career,
        status: Career['status'],
    ) => {
        const response = await fetch('/api/admin/careers', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: career.id,
                status,
            }),
        })

        if (!response.ok) {
            return setError('The job status could not be updated.')
        }

        const updated = (await response.json()) as Career

        setCareers((current) =>
            current.map((item) =>
                item.id === updated.id ? updated : item,
            ),
        )

        setSelectedCareer(null)
    }

    const deleteCareer = async (career: Career) => {
        const response = await fetch(
            `/api/admin/careers?id=${career.id}`,
            {
                method: 'DELETE',
            },
        )

        if (!response.ok) {
            return setError('The job opening could not be deleted.')
        }

        setCareers((current) =>
            current.filter((item) => item.id !== career.id),
        )

        setSelectedCareer(null)
    }

    const logout = async () => {
        await fetch('/api/admin/auth/logout', {
            method: 'POST',
        })

        setAuthState('unauthenticated')
    }

    if (authState === 'checking') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7] text-sm text-[#718187]">
                Checking access...
            </div>
        )
    }

    if (authState === 'unauthenticated') {
        return (
            <AdminLogin
                onAuthenticated={() => {
                    setAuthState('authenticated')
                    setLoading(true)
                }}
            />
        )
    }

    return (
        <main className="min-h-screen bg-[#f6f8f7] text-[#152329] lg:flex">
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col bg-[#063f70] px-5 py-6 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff100] text-lg font-black text-[#063f70]">
                            S
                        </div>

                        <span className="font-heading text-xl font-bold tracking-tight">
                            SwiftRun
                        </span>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
                        aria-label="Close menu"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="mt-14 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Workspace
                </div>

                <nav className="mt-3 space-y-1">
                    {navItems.map(({ label, value, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={() => {
                                setActiveView(value)
                                setIsSidebarOpen(false)
                            }}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeView === value
                                    ? 'bg-white text-[#063f70] shadow-lg shadow-black/10'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon className="text-[18px]" />

                            {label}

                            {value === 'blogs' && (
                                <span
                                    className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${activeView === value
                                            ? 'bg-[#e6f4f1] text-[#066ac0]'
                                            : 'bg-white/10 text-white/70'
                                        }`}
                                >
                                    {blogs.length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto space-y-1">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white">
                        <FiSettings />
                        Settings
                    </button>

                    <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-2 pt-5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6d58c] text-sm font-bold text-[#60431d]">
                            AM
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                Administrator
                            </p>
                            <p className="text-xs text-white/50">
                                Administrator
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white"
                            aria-label="Sign out"
                        >
                            <FiLogOut />
                        </button>
                    </div>
                </div>
            </aside>

            {isSidebarOpen && (
                <button
                    aria-label="Close menu overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-[#063f70]/30 lg:hidden"
                />
            )}

            <section className="min-w-0 flex-1">
                <header className="flex h-[76px] items-center justify-between border-b border-[#dfe8e5] bg-white px-5 sm:px-8 lg:px-12">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="rounded-lg p-2 text-[#063f70] hover:bg-[#e6f4f1] lg:hidden"
                            aria-label="Open menu"
                        >
                            <FiMenu />
                        </button>

                        <span className="text-sm font-medium text-[#75858b]">
                            Workspace /{' '}
                            <strong className="text-[#152329]">
                                {activeView === 'overview'
                                    ? 'Overview'
                                    : activeView}
                            </strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="relative rounded-xl p-2.5 text-[#597079] hover:bg-[#f1f6f4]"
                            aria-label="Notifications"
                        >
                            <FiBell />

                            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f0665d]" />
                        </button>

                        <div className="hidden h-8 w-px bg-[#e3ebe8] sm:block" />

                        <div className="hidden items-center gap-2 text-sm font-semibold sm:flex">
                            Good morning, Admin
                            <FiChevronDown className="text-[#819197]" />
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-[1380px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
                    {error && (
                        <div className="mb-6 flex items-center justify-between rounded-xl border border-[#f3c7c1] bg-[#fff0ed] px-4 py-3 text-sm text-[#b34e43]">
                            {error}

                            <button
                                onClick={() => setError('')}
                                aria-label="Dismiss error"
                            >
                                <FiX />
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div className="rounded-2xl border border-[#dfe8e5] bg-white p-10 text-center text-sm text-[#819096]">
                            Loading workspace...
                        </div>
                    ) : (
                        <>
                            {activeView === 'overview' && (
                                <Overview
                                    onAddBlog={() => setComposer('blog')}
                                    onAddPartner={() => setComposer('partner')}
                                    blogs={blogs}
                                    partners={partners}
                                    setView={setActiveView}
                                />
                            )}

                            {activeView === 'blogs' && (
                                <CollectionView
                                    title="Blogs"
                                    eyebrow="Content library"
                                    description="Publish stories that keep customers and partners moving with SwiftRun."
                                    icon={FiBookOpen}
                                    actionLabel="Add blog"
                                    onAction={() => setComposer('blog')}
                                >
                                    <BlogTable
                                        blogs={blogs}
                                        onSelect={setSelectedBlog}
                                    />
                                </CollectionView>
                            )}

                            {activeView === 'partners' && (
                                <CollectionView
                                    title="Partners"
                                    eyebrow="Partner network"
                                    description="Manage the businesses making local delivery more useful every day."
                                    icon={FiUsers}
                                    actionLabel="Add partner"
                                    onAction={() => setComposer('partner')}
                                >
                                    <PartnerTable
                                        partners={partners}
                                        onSelect={setSelectedPartner}
                                    />
                                </CollectionView>
                            )}

                            {activeView === 'careers' && (
                                <CollectionView
                                    title="Careers"
                                    eyebrow="Talent board"
                                    description="Create and publish openings using the same fields candidates see."
                                    icon={FiUsers}
                                    actionLabel="Add opening"
                                    onAction={() => setComposer('career')}
                                >
                                    <CareerTable
                                        careers={careers}
                                        onSelect={setSelectedCareer}
                                    />
                                </CollectionView>
                            )}

                            {activeView === 'applications' && (
                                <CollectionView
                                    title="Applications"
                                    eyebrow="Hiring inbox"
                                    description="Review candidate submissions from published openings."
                                    icon={FiBookOpen}
                                    actionLabel=""
                                    onAction={() => undefined}
                                >
                                    <ApplicationTable
                                        applications={applications}
                                    />
                                </CollectionView>
                            )}
                        </>
                    )}
                </div>
            </section>

            {composer === 'blog' && (
                <AdminComposer
                    type="blog"
                    isSubmitting={saving}
                    onClose={() => !saving && setComposer(null)}
                    onBlogSubmit={addBlog}
                    onPartnerSubmit={addPartner}
                />
            )}

            {composer === 'partner' && (
                <AdminComposer
                    type="partner"
                    isSubmitting={saving}
                    onClose={() => !saving && setComposer(null)}
                    onBlogSubmit={addBlog}
                    onPartnerSubmit={addPartner}
                />
            )}

            {composer === 'career' && (
                <AdminCareerComposer
                    submitting={saving}
                    onClose={() => !saving && setComposer(null)}
                    onSubmit={addCareer}
                />
            )}

            {selectedBlog && (
                <BlogActions
                    blog={selectedBlog}
                    onClose={() => setSelectedBlog(null)}
                    onPublish={() =>
                        updateBlogStatus(selectedBlog, 'Published')
                    }
                    onSaveDraft={() =>
                        updateBlogStatus(selectedBlog, 'Draft')
                    }
                    onDelete={() => deleteBlog(selectedBlog)}
                />
            )}

            {selectedPartner && (
                <PartnerActions
                    partner={selectedPartner}
                    onClose={() => setSelectedPartner(null)}
                    onPublish={() =>
                        updatePartnerStatus(selectedPartner, 'Published')
                    }
                    onSaveDraft={() =>
                        updatePartnerStatus(selectedPartner, 'Draft')
                    }
                    onDelete={() => deletePartner(selectedPartner)}
                />
            )}

            {selectedCareer && (
                <CareerActions
                    career={selectedCareer}
                    onClose={() => setSelectedCareer(null)}
                    onPublish={() =>
                        updateCareerStatus(selectedCareer, 'Published')
                    }
                    onSaveDraft={() =>
                        updateCareerStatus(selectedCareer, 'Draft')
                    }
                    onDelete={() => deleteCareer(selectedCareer)}
                />
            )}
        </main>
    )
}

function Overview({
    onAddBlog,
    onAddPartner,
    blogs,
    partners,
    setView,
}: {
    onAddBlog: () => void
    onAddPartner: () => void
    blogs: Blog[]
    partners: Partner[]
    setView: (view: View) => void
}) {
    const now = new Date()

    const weekStart = new Date(now)
    const day = weekStart.getDay()

    weekStart.setDate(
        weekStart.getDate() - (day === 0 ? 6 : day - 1),
    )

    weekStart.setHours(0, 0, 0, 0)

    const previousWeekStart = new Date(weekStart)
    previousWeekStart.setDate(
        previousWeekStart.getDate() - 7,
    )

    const activity = [...blogs, ...partners]

    const createdThisWeek = activity.filter(
        (item) =>
            item.createdAt &&
            new Date(item.createdAt) >= weekStart,
    ).length

    const createdLastWeek = activity.filter(
        (item) =>
            item.createdAt &&
            new Date(item.createdAt) >= previousWeekStart &&
            new Date(item.createdAt) < weekStart,
    ).length

    const change = createdLastWeek
        ? Math.round(
            ((createdThisWeek - createdLastWeek) /
                createdLastWeek) *
            100,
        )
        : createdThisWeek
            ? 100
            : 0

    const activityShare = Math.min(
        100,
        Math.round(
            (createdThisWeek /
                Math.max(createdThisWeek + createdLastWeek, 1)) *
            100,
        ),
    )

    return (
        <>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#066ac0]">
                        Tuesday, September 9
                    </p>

                    <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-[#152329] sm:text-5xl">
                        Good morning, Admin{' '}
                        <span className="text-[#f1ba45]">.</span>
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#718187]">
                        Here’s a quick look at what’s happening across your
                        SwiftRun workspace.
                    </p>
                </div>

                <button className="flex items-center gap-2 self-start rounded-xl border border-[#d7e4df] bg-white px-4 py-3 text-sm font-semibold text-[#38515a] shadow-sm transition hover:border-[#066ac0] hover:text-[#066ac0] sm:self-auto">
                    <FiSearch />
                    Search workspace

                    <span className="hidden rounded-md bg-[#f1f5f3] px-1.5 py-0.5 text-[10px] text-[#91a09f] md:inline">
                        ⌘ K
                    </span>
                </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    label="Total partners"
                    value={String(partners.length)}
                    note="Open partner directory"
                    icon={FiUsers}
                    color="blue"
                    onClick={() => setView('partners')}
                />

                <StatCard
                    label="Published blogs"
                    value={String(
                        blogs.filter(
                            (blog) => blog.status === 'Published',
                        ).length,
                    )}
                    note="View published content"
                    icon={FiBookOpen}
                    color="yellow"
                    onClick={() => setView('blogs')}
                />

                <StatCard
                    label="Draft blogs"
                    value={String(
                        blogs.filter(
                            (blog) => blog.status === 'Draft',
                        ).length,
                    )}
                    note="Continue editing drafts"
                    icon={FiGrid}
                    color="mint"
                    onClick={() => setView('blogs')}
                />
            </div>

            <div className="mt-7 grid gap-7 xl:grid-cols-[1.45fr_1fr]">
                <section className="rounded-2xl border border-[#dfe8e5] bg-white p-6 shadow-[0_12px_35px_rgba(30,70,58,0.04)] sm:p-7">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-heading text-xl font-bold">
                                Quick actions
                            </h2>

                            <p className="mt-1 text-sm text-[#809096]">
                                Keep your workspace fresh.
                            </p>
                        </div>

                        <FiMoreHorizontal className="text-xl text-[#9aa9ac]" />
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <ActionCard
                            title="Add a blog"
                            description="Share a new story or update"
                            icon={FiBookOpen}
                            color="blue"
                            onClick={onAddBlog}
                        />

                        <ActionCard
                            title="Add a partner"
                            description="Bring a new business onboard"
                            icon={FiUsers}
                            color="yellow"
                            onClick={onAddPartner}
                        />
                    </div>
                </section>

                <section className="rounded-2xl border border-[#dfe8e5] bg-[#e6f4f1] p-6 sm:p-7">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267d73]">
                                This week
                            </p>

                            <h2 className="mt-2 font-heading text-2xl font-bold text-[#16453f]">
                                {createdThisWeek} new
                                <br />
                                workspace updates.
                            </h2>
                        </div>

                        <div className="rounded-xl bg-white/70 p-3 text-[#267d73]">
                            <FiArrowUpRight />
                        </div>
                    </div>

                    <div className="mt-8 flex items-end gap-2">
                        <span className="font-heading text-4xl font-bold text-[#16453f]">
                            {change >= 0 ? '+' : ''}
                            {change}%
                        </span>

                        <span className="mb-1 text-xs font-semibold text-[#267d73]">
                            vs last week
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-[#267d73]">
                        {createdThisWeek} created this week ·{' '}
                        {createdLastWeek} last week
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
                        <div
                            className="h-full rounded-full bg-[#267d73] transition-all"
                            style={{ width: `${activityShare}%` }}
                        />
                    </div>
                </section>
            </div>

            <section className="mt-7 rounded-2xl border border-[#dfe8e5] bg-white shadow-[0_12px_35px_rgba(30,70,58,0.04)]">
                <div className="flex flex-col gap-3 border-b border-[#edf1ef] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div>
                        <h2 className="font-heading text-xl font-bold">
                            Recent activity
                        </h2>

                        <p className="mt-1 text-sm text-[#809096]">
                            The latest updates from your workspace.
                        </p>
                    </div>

                    <button
                        onClick={() => setView('blogs')}
                        className="flex items-center gap-1 self-start text-sm font-bold text-[#066ac0] hover:gap-2"
                    >
                        View all
                        <FiChevronRight />
                    </button>
                </div>

                <div className="divide-y divide-[#edf1ef]">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <div
                            key={`${blog.title}-${index}`}
                            className="flex items-center gap-4 px-6 py-4 sm:px-7"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f2fb] text-[#066ac0]">
                                <FiImage />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">
                                    {blog.title}
                                </p>

                                <p className="mt-1 text-xs text-[#8b999d]">
                                    Blog post · {blog.date}
                                </p>
                            </div>

                            <Status status={blog.status} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

function StatCard({
    label,
    value,
    note,
    icon: Icon,
    color,
    onClick,
}: {
    label: string
    value: string
    note: string
    icon: typeof FiGrid
    color: string
    onClick: () => void
}) {
    const styles: Record<string, string> = {
        blue: 'bg-[#e9f2fb] text-[#066ac0]',
        yellow: 'bg-[#fff7d1] text-[#a17100]',
        mint: 'bg-[#e6f4f1] text-[#267d73]',
    }

    return (
        <button
            onClick={onClick}
            className="rounded-2xl border border-[#dfe8e5] bg-white p-5 text-left shadow-[0_12px_35px_rgba(30,70,58,0.04)] transition hover:-translate-y-0.5 hover:border-[#b9d6e9] hover:shadow-md"
        >
            <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#819096]">
                    {label}
                </p>

                <div className={`rounded-lg p-2 ${styles[color]}`}>
                    <Icon />
                </div>
            </div>

            <p className="mt-5 font-heading text-3xl font-bold">
                {value}
            </p>

            <p className="mt-1 text-xs font-semibold text-[#267d73]">
                ↗ {note}
            </p>
        </button>
    )
}

function ActionCard({
    title,
    description,
    icon: Icon,
    color,
    onClick,
}: {
    title: string
    description: string
    icon: typeof FiGrid
    color: string
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center gap-4 rounded-xl border border-[#e2ebe8] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#b9d6e9] hover:shadow-md"
        >
            <div
                className={`rounded-xl p-3 ${color === 'blue'
                        ? 'bg-[#e9f2fb] text-[#066ac0]'
                        : 'bg-[#fff7d1] text-[#a17100]'
                    }`}
            >
                <Icon className="text-xl" />
            </div>

            <span className="min-w-0 flex-1">
                <strong className="block text-sm">{title}</strong>
                <small className="mt-1 block text-xs text-[#819096]">
                    {description}
                </small>
            </span>

            <FiPlus className="text-[#aab5b7] transition group-hover:text-[#066ac0]" />
        </button>
    )
}

function CollectionView({
    title,
    eyebrow,
    description,
    icon: Icon,
    actionLabel,
    onAction,
    children,
}: {
    title: string
    eyebrow: string
    description: string
    icon: typeof FiGrid
    actionLabel: string
    onAction: () => void
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                        <Icon />
                        {eyebrow}
                    </div>

                    <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight">
                        {title}
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#718187]">
                        {description}
                    </p>
                </div>

                <button
                    onClick={onAction}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#066ac0]/20 transition hover:-translate-y-0.5 hover:bg-[#05589e]"
                >
                    <FiPlus />
                    {actionLabel}
                </button>
            </div>

            <div className="mt-8">{children}</div>
        </>
    )
}

function BlogTable({
    blogs,
    onSelect,
}: {
    blogs: Blog[]
    onSelect: (blog: Blog) => void
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfe8e5] bg-white shadow-[0_12px_35px_rgba(30,70,58,0.04)]">
            <div className="flex items-center justify-between border-b border-[#edf1ef] px-6 py-5">
                <h2 className="font-heading text-lg font-bold">
                    All blog posts
                    <span className="ml-2 rounded-full bg-[#e9f2fb] px-2 py-1 text-xs text-[#066ac0]">
                        {blogs.length}
                    </span>
                </h2>

                <button
                    className="rounded-lg p-2 text-[#718187] hover:bg-[#f1f6f4]"
                    aria-label="Filter blogs"
                >
                    <FiChevronDown />
                </button>
            </div>

            <div className="divide-y divide-[#edf1ef]">
                {blogs.map((blog, index) => (
                    <div
                        key={`${blog.title}-${index}`}
                        className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_120px_130px_30px] sm:items-center"
                    >
                        <div>
                            <p className="text-sm font-bold">{blog.title}</p>
                            <p className="mt-1 text-xs text-[#8b999d]">
                                {blog.category}
                            </p>
                        </div>

                        <p className="text-xs text-[#819096]">
                            {blog.date}
                        </p>

                        <Status status={blog.status} />

                        <button
                            onClick={() => onSelect(blog)}
                            className="rounded-lg p-2 text-[#9aa9ac] hover:bg-[#f1f6f4]"
                            aria-label={`More options for ${blog.title}`}
                        >
                            <FiMoreHorizontal />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function PartnerTable({
    partners,
    onSelect,
}: {
    partners: Partner[]
    onSelect: (partner: Partner) => void
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfe8e5] bg-white shadow-[0_12px_35px_rgba(30,70,58,0.04)]">
            <div className="flex items-center justify-between border-b border-[#edf1ef] px-6 py-5">
                <h2 className="font-heading text-lg font-bold">
                    Partner directory
                    <span className="ml-2 rounded-full bg-[#e6f4f1] px-2 py-1 text-xs text-[#267d73]">
                        {partners.length}
                    </span>
                </h2>

                <button
                    className="rounded-lg p-2 text-[#718187] hover:bg-[#f1f6f4]"
                    aria-label="Search partners"
                >
                    <FiSearch />
                </button>
            </div>

            <div className="divide-y divide-[#edf1ef]">
                {partners.map((partner, index) => (
                    <div
                        key={`${partner.name}-${index}`}
                        className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_150px_130px_30px] sm:items-center"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e7ece9] bg-[#fff7d1] text-[10px] font-bold text-[#a17100]">
                                {partner.logo ? (
                                    <div
                                        role="img"
                                        aria-label={`${partner.name} logo`}
                                        className="h-full w-full bg-contain bg-center bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(/api/admin/blob?url=${encodeURIComponent(
                                                partner.logo,
                                            )})`,
                                        }}
                                    />
                                ) : (
                                    partner.name.slice(0, 2).toUpperCase()
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold">
                                    {partner.name}
                                </p>

                                <p className="mt-1 text-xs text-[#8b999d]">
                                    {partner.category} · {partner.location}
                                </p>

                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 block truncate text-xs text-[#066ac0] hover:underline"
                                >
                                    {partner.url}
                                </a>
                            </div>
                        </div>

                        <p className="text-xs text-[#819096]">
                            {partner.image ? 'Image added' : 'No image'}
                        </p>

                        <Status status={partner.status} />

                        <button
                            onClick={() => onSelect(partner)}
                            className="rounded-lg p-2 text-[#9aa9ac] hover:bg-[#f1f6f4]"
                            aria-label={`More options for ${partner.name}`}
                        >
                            <FiMoreHorizontal />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CareerTable({
    careers,
    onSelect,
}: {
    careers: Career[]
    onSelect: (career: Career) => void
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfe8e5] bg-white">
            <div className="border-b border-[#edf1ef] px-6 py-5">
                <h2 className="font-heading text-lg font-bold">
                    Job openings
                    <span className="ml-2 rounded-full bg-[#e9f2fb] px-2 py-1 text-xs text-[#066ac0]">
                        {careers.length}
                    </span>
                </h2>
            </div>

            <div className="divide-y divide-[#edf1ef]">
                {careers.map((career) => (
                    <div
                        key={career.id}
                        className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_150px_130px_30px] sm:items-center"
                    >
                        <div>
                            <p className="text-sm font-bold">{career.title}</p>

                            <p className="mt-1 text-xs text-[#8b999d]">
                                {career.category} ·{' '}
                                {career.requirements.join(' · ')}
                            </p>
                        </div>

                        <p className="text-xs text-[#819096]">
                            {career.shouldHave.length} requirements
                        </p>

                        <Status status={career.status} />

                        <button
                            onClick={() => onSelect(career)}
                            className="rounded-lg p-2 text-[#9aa9ac]"
                            aria-label={`More options for ${career.title}`}
                        >
                            <FiMoreHorizontal />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ApplicationTable({
    applications,
}: {
    applications: Application[]
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfe8e5] bg-white">
            <div className="border-b border-[#edf1ef] px-6 py-5">
                <h2 className="font-heading text-lg font-bold">
                    Candidate submissions
                    <span className="ml-2 rounded-full bg-[#e6f4f1] px-2 py-1 text-xs text-[#267d73]">
                        {applications.length}
                    </span>
                </h2>
            </div>

            <div className="divide-y divide-[#edf1ef]">
                {applications.map((application) => (
                    <div
                        key={application.id}
                        className="grid gap-2 px-6 py-5 sm:grid-cols-[1fr_1fr_150px_100px] sm:items-center"
                    >
                        <div>
                            <p className="text-sm font-bold">
                                {application.name}
                            </p>

                            <p className="mt-1 text-xs text-[#8b999d]">
                                {application.email} · {application.phone}
                            </p>
                        </div>

                        <p className="text-sm text-[#52656b]">
                            {application.careerTitle}
                        </p>

                        <a
                            href={`/api/admin/applications/blob?url=${encodeURIComponent(
                                application.cvUrl,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-[#066ac0] hover:underline"
                        >
                            View CV
                        </a>

                        <p className="text-xs text-[#819096]">
                            {application.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Status({
    status,
}: {
    status: Blog['status'] | Partner['status']
}) {
    const isActive =
        status === 'Published' || status === 'Active'

    return (
        <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${isActive
                    ? 'bg-[#e6f4f1] text-[#267d73]'
                    : 'bg-[#fff7d1] text-[#9a7100]'
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${isActive
                        ? 'bg-[#267d73]'
                        : 'bg-[#d5a521]'
                    }`}
            />

            {status}
        </span>
    )
}

function BlogActions({
    blog,
    onClose,
    onPublish,
    onSaveDraft,
    onDelete,
}: {
    blog: Blog
    onClose: () => void
    onPublish: () => Promise<void>
    onSaveDraft: () => Promise<void>
    onDelete: () => Promise<void>
}) {
    const [confirmation, setConfirmation] = useState<
        'publish' | 'delete' | null
    >(null)

    const [busy, setBusy] = useState(false)

    const runConfirmedAction = async () => {
        if (!confirmation) return

        setBusy(true)

        try {
            if (confirmation === 'publish') {
                await onPublish()
            } else {
                await onDelete()
            }
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#063f70]/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                            Blog actions
                        </p>

                        <h2 className="mt-2 font-heading text-2xl font-bold">
                            {confirmation
                                ? `Confirm ${confirmation}`
                                : 'Manage post'}
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm text-[#819096]">
                            {confirmation === 'delete'
                                ? 'This permanently removes the blog and its image.'
                                : confirmation === 'publish'
                                    ? 'This will make the post visible to readers.'
                                    : blog.title}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={busy}
                        className="rounded-lg p-2 text-[#718187] disabled:opacity-40"
                        aria-label="Close blog actions"
                    >
                        <FiX />
                    </button>
                </div>

                {confirmation ? (
                    <div className="mt-7 flex gap-3">
                        <button
                            onClick={() => setConfirmation(null)}
                            disabled={busy}
                            className="flex-1 rounded-xl bg-[#f1f6f4] px-4 py-3 text-sm font-bold text-[#52656b]"
                        >
                            Go back
                        </button>

                        <button
                            onClick={runConfirmedAction}
                            disabled={busy}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white ${confirmation === 'delete'
                                    ? 'bg-[#c5574d]'
                                    : 'bg-[#267d73]'
                                }`}
                        >
                            {busy && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            )}

                            {busy
                                ? 'Working...'
                                : `Yes, ${confirmation}`}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mt-7 space-y-3">
                            <button
                                onClick={() => setConfirmation('publish')}
                                disabled={blog.status === 'Published'}
                                className="flex w-full items-center justify-between rounded-xl border border-[#d9e5e1] px-4 py-3 text-left text-sm font-bold transition hover:border-[#267d73] hover:bg-[#e6f4f1] disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                <span>
                                    <span className="block">
                                        Publish blog
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#819096]">
                                        Make this post visible to readers.
                                    </span>
                                </span>

                                <FiArrowUpRight />
                            </button>

                            <button
                                onClick={onSaveDraft}
                                disabled={blog.status === 'Draft'}
                                className="flex w-full items-center justify-between rounded-xl border border-[#d9e5e1] px-4 py-3 text-left text-sm font-bold transition hover:border-[#066ac0] hover:bg-[#e9f2fb] disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                <span>
                                    <span className="block">
                                        Move to drafts
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#819096]">
                                        Keep the post private for now.
                                    </span>
                                </span>

                                <FiBookOpen />
                            </button>

                            <button
                                onClick={() => setConfirmation('delete')}
                                className="flex w-full items-center justify-between rounded-xl border border-[#f3c7c1] px-4 py-3 text-left text-sm font-bold text-[#b34e43] transition hover:bg-[#fff0ed]"
                            >
                                <span>
                                    <span className="block">
                                        Delete blog
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#b34e43]/70">
                                        This cannot be undone.
                                    </span>
                                </span>

                                <FiTrash2 />
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-5 w-full rounded-xl bg-[#f1f6f4] px-4 py-3 text-sm font-bold text-[#52656b]"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

function PartnerActions({
    partner,
    onClose,
    onPublish,
    onSaveDraft,
    onDelete,
}: {
    partner: Partner
    onClose: () => void
    onPublish: () => Promise<void>
    onSaveDraft: () => Promise<void>
    onDelete: () => Promise<void>
}) {
    const [confirmation, setConfirmation] = useState<
        'publish' | 'draft' | 'delete' | null
    >(null)

    const [busy, setBusy] = useState(false)

    const confirmAction = async () => {
        if (!confirmation) return

        setBusy(true)

        try {
            if (confirmation === 'publish') {
                await onPublish()
            } else if (confirmation === 'draft') {
                await onSaveDraft()
            } else {
                await onDelete()
            }
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#063f70]/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                            Partner actions
                        </p>

                        <h2 className="mt-2 font-heading text-2xl font-bold">
                            {confirmation
                                ? `Confirm ${confirmation}`
                                : 'Manage partner'}
                        </h2>

                        <p className="mt-2 text-sm text-[#819096]">
                            {confirmation === 'publish'
                                ? 'This will make the partner visible to customers.'
                                : confirmation === 'draft'
                                    ? 'This will keep the partner hidden until ready.'
                                    : confirmation === 'delete'
                                        ? 'This permanently removes the partner and its images.'
                                        : partner.name}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={busy}
                        className="rounded-lg p-2 text-[#718187] disabled:opacity-40"
                        aria-label="Close partner actions"
                    >
                        <FiX />
                    </button>
                </div>

                {confirmation ? (
                    <div className="mt-7 flex gap-3">
                        <button
                            onClick={() => setConfirmation(null)}
                            disabled={busy}
                            className="flex-1 rounded-xl bg-[#f1f6f4] px-4 py-3 text-sm font-bold text-[#52656b]"
                        >
                            Go back
                        </button>

                        <button
                            onClick={confirmAction}
                            disabled={busy}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white ${confirmation === 'delete'
                                    ? 'bg-[#c5574d]'
                                    : 'bg-[#267d73]'
                                }`}
                        >
                            {busy && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            )}

                            {busy
                                ? 'Working...'
                                : `Yes, ${confirmation}`}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mt-7 space-y-3">
                            <button
                                onClick={() => setConfirmation('publish')}
                                disabled={partner.status === 'Published'}
                                className="flex w-full items-center justify-between rounded-xl border border-[#d9e5e1] px-4 py-3 text-left text-sm font-bold hover:bg-[#e6f4f1] disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                <span>
                                    <span className="block">
                                        Publish partner
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#819096]">
                                        Make this partner visible.
                                    </span>
                                </span>

                                <FiArrowUpRight />
                            </button>

                            <button
                                onClick={() => setConfirmation('draft')}
                                disabled={partner.status === 'Draft'}
                                className="flex w-full items-center justify-between rounded-xl border border-[#d9e5e1] px-4 py-3 text-left text-sm font-bold hover:bg-[#e9f2fb] disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                <span>
                                    <span className="block">
                                        Save to draft
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#819096]">
                                        Keep this partner private.
                                    </span>
                                </span>

                                <FiBookOpen />
                            </button>

                            <button
                                onClick={() => setConfirmation('delete')}
                                className="flex w-full items-center justify-between rounded-xl border border-[#f3c7c1] px-4 py-3 text-left text-sm font-bold text-[#b34e43] hover:bg-[#fff0ed]"
                            >
                                <span>
                                    <span className="block">
                                        Delete partner
                                    </span>

                                    <span className="mt-1 block text-xs font-normal text-[#b34e43]/70">
                                        This cannot be undone.
                                    </span>
                                </span>

                                <FiTrash2 />
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-5 w-full rounded-xl bg-[#f1f6f4] px-4 py-3 text-sm font-bold text-[#52656b]"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

function CareerActions({
    career,
    onClose,
    onPublish,
    onSaveDraft,
    onDelete,
}: {
    career: Career
    onClose: () => void
    onPublish: () => Promise<void>
    onSaveDraft: () => Promise<void>
    onDelete: () => Promise<void>
}) {
    const [confirmation, setConfirmation] = useState<
        'publish' | 'draft' | 'delete' | null
    >(null)

    const [busy, setBusy] = useState(false)

    const confirm = async () => {
        if (!confirmation) return

        setBusy(true)

        try {
            if (confirmation === 'publish') {
                await onPublish()
            } else if (confirmation === 'draft') {
                await onSaveDraft()
            } else {
                await onDelete()
            }
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063f70]/30 p-5 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#066ac0]">
                            Career actions
                        </p>

                        <h2 className="mt-2 font-heading text-2xl font-bold">
                            {confirmation
                                ? `Confirm ${confirmation}`
                                : 'Manage opening'}
                        </h2>

                        <p className="mt-2 text-sm text-[#819096]">
                            {confirmation === 'delete'
                                ? 'This permanently deletes the opening.'
                                : confirmation
                                    ? 'This changes what candidates can see.'
                                    : career.title}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={busy}
                        aria-label="Close"
                    >
                        <FiX />
                    </button>
                </div>

                {confirmation ? (
                    <div className="mt-7 flex gap-3">
                        <button
                            onClick={() => setConfirmation(null)}
                            disabled={busy}
                            className="flex-1 rounded-xl bg-[#f1f6f4] px-4 py-3 text-sm font-bold"
                        >
                            Go back
                        </button>

                        <button
                            onClick={confirm}
                            disabled={busy}
                            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white ${confirmation === 'delete'
                                    ? 'bg-[#c5574d]'
                                    : 'bg-[#267d73]'
                                }`}
                        >
                            {busy
                                ? 'Working...'
                                : `Yes, ${confirmation}`}
                        </button>
                    </div>
                ) : (
                    <div className="mt-7 space-y-3">
                        <button
                            onClick={() => setConfirmation('publish')}
                            disabled={career.status === 'Published'}
                            className="w-full rounded-xl border p-4 text-left text-sm font-bold disabled:opacity-40"
                        >
                            Publish opening
                        </button>

                        <button
                            onClick={() => setConfirmation('draft')}
                            disabled={career.status === 'Draft'}
                            className="w-full rounded-xl border p-4 text-left text-sm font-bold disabled:opacity-40"
                        >
                            Save to draft
                        </button>

                        <button
                            onClick={() => setConfirmation('delete')}
                            className="w-full rounded-xl border border-[#f3c7c1] p-4 text-left text-sm font-bold text-[#b34e43]"
                        >
                            Delete opening
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full rounded-xl bg-[#f1f6f4] p-3 text-sm font-bold"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function Composer({
    type,
    onClose,
    onSubmit,
}: {
    type: 'blog' | 'partner'
    onClose: () => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
    const isBlog = type === 'blog'

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#063f70]/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div className="w-full max-w-xl rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#066ac0]">
                            New {isBlog ? 'content' : 'connection'}
                        </p>

                        <h2 className="mt-2 font-heading text-2xl font-bold">
                            Add {isBlog ? 'a blog post' : 'a partner'}
                        </h2>

                        <p className="mt-1 text-sm text-[#819096]">
                            {isBlog
                                ? 'Start with the essentials. You can add the details later.'
                                : 'Add a business to your SwiftRun partner network.'}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-[#718187] hover:bg-[#f1f6f4]"
                        aria-label="Close form"
                    >
                        <FiX />
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="mt-7 space-y-5"
                >
                    <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                            {isBlog ? 'Post title' : 'Business name'}
                        </span>

                        <input
                            required
                            name={isBlog ? 'title' : 'name'}
                            placeholder={
                                isBlog
                                    ? 'e.g. The future of local delivery'
                                    : 'e.g. The Green Basket'
                            }
                            className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none transition placeholder:text-[#a5b0b2] focus:border-[#066ac0] focus:ring-4 focus:ring-[#066ac0]/10"
                        />
                    </label>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                {isBlog ? 'Category' : 'Business type'}
                            </span>

                            <select
                                name="category"
                                className="w-full rounded-xl border border-[#d9e5e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                            >
                                <option>Product</option>
                                <option>Business</option>
                                <option>Community</option>
                                <option>Other</option>
                            </select>
                        </label>

                        {isBlog ? (
                            <label className="block">
                                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                    Cover image
                                </span>

                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2 rounded-xl border border-dashed border-[#b7cfc8] px-4 py-3 text-left text-sm text-[#819096]"
                                >
                                    <FiImage />
                                    Choose an image
                                </button>
                            </label>
                        ) : (
                            <label className="block">
                                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">
                                    Location
                                </span>

                                <input
                                    name="location"
                                    defaultValue="Lagos, NG"
                                    className="w-full rounded-xl border border-[#d9e5e1] px-4 py-3 text-sm outline-none focus:border-[#066ac0]"
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-[#edf1ef] pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-3 text-sm font-bold text-[#718187] hover:bg-[#f1f6f4]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#066ac0]/20 hover:bg-[#05589e]"
                        >
                            <FiPlus />
                            Add {isBlog ? 'blog' : 'partner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

void Composer