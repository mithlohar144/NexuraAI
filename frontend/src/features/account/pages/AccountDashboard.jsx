import React from 'react'
import { useSelector } from 'react-redux'

const AccountDashboard = () => {
  const { user, loading, error } = useSelector((state) => state.auth)

  const planLabel = 'Research workspace'
  const planDescription = 'You have access to live web research and all available tools.'

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#050008] flex items-center justify-center text-zinc-200">
        <p className="text-sm tracking-[0.25em] font-mono uppercase text-zinc-500">Loading account...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020008] text-zinc-100 font-sans">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-8 md:px-10">
        <header className="flex items-center justify-between border-b border-zinc-900/70 pb-5">
          <div>
            <p className="text-[0.6rem] font-mono uppercase tracking-[0.35em] text-zinc-500">Account</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-[1.7rem]">Your dashboard</h1>
          </div>
          <a
            href="/app"
            className="rounded-full border border-zinc-700/70 bg-zinc-950/70 px-5 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.22em] text-zinc-200 shadow-[0_16px_40px_rgba(0,0,0,0.7)] hover:border-amber-400 hover:text-amber-200"
          >
            Open AI workspace
          </a>
        </header>

        <main className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.15fr)] items-start">
          <section className="space-y-4">
            <div className="rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950/80 via-zinc-950/50 to-black/70 p-6 md:p-7 shadow-[0_28px_90px_rgba(0,0,0,1)]">
              <p className="text-[0.6rem] font-mono uppercase tracking-[0.28em] text-zinc-500">Profile</p>
              <h2 className="mt-3 text-xl font-semibold text-zinc-50 md:text-[1.35rem]">{user?.username}</h2>
              <p className="mt-1 text-sm text-zinc-400">{user?.email}</p>
              <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                This account is linked to all of your chat history and saved threads.
              </p>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-900/60 bg-red-950/40 px-4 py-2 text-xs text-red-200">
                {error}
              </div>
            )}
          </section>

          <section>
            <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/18 via-zinc-950 to-black px-6 py-7 shadow-[0_32px_100px_rgba(0,0,0,1)]">
              <p className="text-[0.6rem] font-mono uppercase tracking-[0.28em] text-amber-200/90">Plan</p>
              <h2 className="mt-3 text-lg font-semibold text-amber-50 md:text-[1.25rem]">{planLabel}</h2>
              <p className="mt-2 text-xs text-amber-100/80">{planDescription}</p>

              <ul className="mt-5 space-y-1.5 text-xs text-amber-50/90">
                <li>• Structured, citation‑ready answers</li>
                <li>• Persistent chat threads</li>
                <li>• Live web research enabled</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AccountDashboard
