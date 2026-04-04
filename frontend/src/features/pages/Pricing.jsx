import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../component/Footer.jsx'
import NexuraNavbar from '../component/Navbar.jsx'

const Pricing = () => {
  const user = useSelector((state) => state.auth.user)
  const primaryCtaHref = user ? '/account' : '/register'

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b bg-black text-zinc-100 font-sans">
       <NexuraNavbar />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-24 pt-16 md:px-8">
        {/* Header */}
       
        <header className="text-center">
          <p className="text-[0.7rem] font-mono uppercase tracking-[0.35em] text-zinc-500">
            Plans & credits
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl md:text-5xl">
            Pricing that scales with your research.
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-sm text-zinc-300/85">
            Start small, top up when work gets busy, and keep every plan focused
            on clear, cited answers instead of seat counts.
          </p>
        </header>

        {/* Cards */}
        <section className="mt-12 grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)_minmax(0,1.05fr)]">
          {/* Starter */}
          <div className="flex flex-col rounded-3xl border border-zinc-800/80 bg-black/70 px-6 py-7 text-sm shadow-[0_26px_80px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-700/70 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.18em]">
                Starter
              </span>
            </div>
            <div className="mt-5 text-3xl font-semibold text-zinc-50">Rs 199</div>
            <div className="mt-1 text-xs text-amber-300">15 credits · solo builders</div>
            <p className="mt-4 text-sm text-zinc-300">
              For individuals and early teams who want a calm research partner
              without committing to a big plan.
            </p>
            <a
              href={primaryCtaHref}
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-amber-400 hover:text-amber-200"
            >
              Buy Starter
            </a>
            <ul className="mt-5 space-y-2 text-xs text-zinc-300">
              <li>• 15 research credits for web-backed runs</li>
              <li>• 1 credit per generate / edit</li>
              <li>• Access to core Nexura models</li>
              <li>• Credit balance visible in account</li>
              <li>• Email support</li>
            </ul>
          </div>

          {/* Studio (featured) */}
          <div className="relative flex flex-col rounded-3xl border border-amber-500/80 bg-gradient-to-b from-amber-500/18 via-zinc-950 to-black px-6 py-8 text-sm shadow-[0_34px_110px_rgba(0,0,0,1)]">
            <div className="absolute right-5 top-4 rounded-full bg-amber-400 px-3 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-black">
              Most popular
            </div>
            <div className="mt-1 text-xs font-mono uppercase tracking-[0.22em] text-amber-200">
              Studio team
            </div>
            <div className="mt-4 text-3xl font-semibold text-amber-50">Rs 499</div>
            <div className="mt-1 text-xs text-amber-200">40 credits · product teams</div>
            <p className="mt-4 text-sm text-amber-50/95">
              For growing teams that rely on Nexura for weekly launches,
              research reviews, and decision docs.
            </p>
            <a
              href={primaryCtaHref}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(251,191,36,0.7)] hover:bg-amber-400"
            >
              Choose Studio
            </a>
            <ul className="mt-5 space-y-2 text-xs text-amber-50/90">
              <li>• 40 research credits each billing cycle</li>
              <li>• Priority performance & lower latency</li>
              <li>• Access to all Nexura tools and web search</li>
              <li>• Shared threads & export-friendly answers</li>
              <li>• Priority support</li>
            </ul>
          </div>

          {/* Organization */}
          <div className="flex flex-col rounded-3xl border border-zinc-800/80 bg-black/80 px-6 py-7 text-sm shadow-[0_26px_80px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-700/70 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.18em]">
                Organization
              </span>
            </div>
            <div className="mt-5 text-3xl font-semibold text-zinc-50">Rs 1499</div>
            <div className="mt-1 text-xs text-amber-300">120 credits · larger teams</div>
            <p className="mt-4 text-sm text-zinc-300">
              For organisations that need high-volume usage, controls, and a
              clear line to the team behind Nexura.
            </p>
            <a
              href={primaryCtaHref}
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-amber-400 hover:text-amber-200"
            >
              Talk to us
            </a>
            <ul className="mt-5 space-y-2 text-xs text-zinc-300">
              <li>• 120+ research credits and flexible top-ups</li>
              <li>• Designed for heavy, multi-team usage</li>
              <li>• Role-based access and workspace controls</li>
              <li>• Priority SLA & guided onboarding</li>
              <li>• Custom billing options</li>
            </ul>
          </div>
        </section>

        {/* Shared note */}
        <section className="mt-12 rounded-3xl border border-zinc-800 bg-black/70 px-6 py-6 text-xs text-zinc-300 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
          <p className="font-mono uppercase tracking-[0.2em] text-zinc-400">
            All plans include
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            Structured answers with citations, the same calm dark interface you
            see on the landing page, and the ability to export research into
            your own tools.
          </p>
        </section>

        <Footer />
      </div>
    </div>
    </>
  )
}

export default Pricing
