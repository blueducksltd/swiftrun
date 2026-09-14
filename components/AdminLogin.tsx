'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { FiArrowRight, FiLock, FiUser } from 'react-icons/fi'

export default function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)
        setError('')
        try {
            const response = await fetch('/api/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
            if (!response.ok) throw new Error('Invalid username or password')
            onAuthenticated()
        } catch (loginError) {
            setError(loginError instanceof Error ? loginError.message : 'Unable to sign in')
        } finally {
            setSubmitting(false)
        }
    }

    return <main className="flex min-h-screen items-center justify-center bg-[#f6f8f7] px-5 py-10 text-[#152329]"><div className="w-full max-w-md rounded-3xl border border-[#dfe8e5] bg-white p-7 shadow-[0_22px_70px_rgba(30,70,58,0.1)] sm:p-10"><Image src="/logosvg.svg" alt="SwiftRun" width={150} height={41} priority className="h-auto w-[150px]" /><div className="mt-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#066ac0]">Private area</p><h1 className="mt-2 font-heading text-3xl font-bold">Welcome back</h1><p className="mt-2 text-sm leading-6 text-[#718187]">Sign in to manage your blogs and partners.</p></div><form onSubmit={submit} className="mt-8 space-y-4"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">Username</span><span className="flex items-center gap-3 rounded-xl border border-[#d9e5e1] px-4 focus-within:border-[#066ac0]"><FiUser className="text-[#8da0a2]" /><input required value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" className="min-w-0 flex-1 py-3 text-sm outline-none" /></span></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#718187]">Password</span><span className="flex items-center gap-3 rounded-xl border border-[#d9e5e1] px-4 focus-within:border-[#066ac0]"><FiLock className="text-[#8da0a2]" /><input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="min-w-0 flex-1 py-3 text-sm outline-none" /></span></label>{error && <p className="rounded-lg bg-[#fff0ed] px-3 py-2 text-sm text-[#b34e43]">{error}</p>}<button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#066ac0] px-5 py-3.5 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-70">{submitting ? 'Signing in...' : 'Sign in'} {!submitting && <FiArrowRight />}</button></form></div></main>
}
