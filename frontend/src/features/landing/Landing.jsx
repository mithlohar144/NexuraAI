import React from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useSelector } from 'react-redux'
import Footer from '../component/Footer.jsx'
import NexuraNavbar from '../component/Navbar.jsx'
import TrustedStrip from '../component/TrustedStrip.jsx'
import Testimonials from '../component/Testimonials.jsx'

gsap.registerPlugin(ScrollToPlugin)

const Landing = () => {
  const user = useSelector((state) => state.auth.user)

  const handleScrollTo = (event, target) => {
    event.preventDefault()
    gsap.to(window, {
      duration: 2,
      ease: 'power3.inOut',
      scrollTo: { y: target, offsetY: 90, autoKill: true },
    })
  }

  return (
    <div className="min-h-screen bg-[#050008] text-zinc-100 font-sans">
      {/* Top glow background */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-6 md:px-8">
        <NexuraNavbar />

        {/* Hero */}
        <main className="mt-10 grid flex-1 gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Research mode · Live web
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl md:text-6xl">
              Launch faster.<br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                Answer better.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm text-zinc-300/80">
              An AI research workspace that feels like a crafted landing page.
              Ask complex questions, pull fresh sources from the web, and share
              polished answers with your team.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-[0.7rem] font-mono uppercase tracking-[0.22em]">
              <a
                href="/login"
                className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 px-5 py-2 text-black shadow-[0_0_40px_rgba(251,191,36,0.55)]"
              >
                Start a chat
              </a>
              <a
                href="/pricing"
                className="rounded-full border border-zinc-700/80 bg-black/40 px-5 py-2 text-zinc-200 hover:border-amber-400 hover:text-amber-200"
              >
                View pricing
              </a>
            </div>
            <p className="mt-6 text-[0.65rem] text-zinc-500 uppercase tracking-[0.25em]">
              Powered by Tavily · Mistral · Gemini
            </p>
          </section>

          {/* Hero right panel */}
          <section className="relative">
            <div className="absolute inset-x-8 top-10 h-40 rounded-[40px] bg-gradient-to-b from-amber-500/50 via-amber-500/10 to-transparent blur-3xl" />
            <div className="relative rounded-[34px] border border-amber-500/30 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-black/90 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between text-[0.65rem] text-zinc-400 font-mono">
                <span>Live Research Thread</span>
                <span className="text-emerald-300">● online</span>
              </div>
              <div className="mt-4 space-y-4 text-xs text-zinc-200">
                <div className="rounded-2xl bg-zinc-900/70 p-3">
                  <div className="mb-1 text-[0.6rem] font-mono text-zinc-500">You</div>
                  <p>Give me a concise update on today&apos;s AI news with sources.</p>
                </div>
                <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/5 via-zinc-900/80 to-zinc-950/80 p-3">
                  <div className="mb-1 text-[0.6rem] font-mono text-amber-300">Perplexity · Research mode</div>
                  <p className="text-amber-50/90">
                    Scanning the live web for today&apos;s AI releases, funding
                    rounds, and notable papers. You&apos;ll get a 5‑bullet summary +
                    direct links in under 10 seconds.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <TrustedStrip />

        {/* Why section */}
        <section id="why" className="mt-20 space-y-6">
          <div className="text-center">
            <p className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
              Why clients stick with us
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50 sm:text-2xl">
              Built for founders who care about conversion & clarity.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/20 via-zinc-900/90 to-black/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-amber-200">
                Implementation & research
              </p>
              <p className="mt-2 text-sm text-zinc-100">
                Ask once. We fetch live sources, organise them, and keep a
                persistent thread so you can revisit decisions.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-700/80 bg-zinc-950/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-300">
                High‑converting answers
              </p>
              <p className="mt-2 text-sm text-zinc-200">
                Every reply is formatted for skimming: headings, bullets, and
                citations that look good in a screenshot.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-700/80 bg-zinc-950/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-300">
                Clear steps & trust
              </p>
              <p className="mt-2 text-sm text-zinc-200">
                See exactly what tools were used (models, web search) so you
                can trust how each answer was produced.
              </p>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Pricing */}
        <section id="pricing" className="mt-24 space-y-8">
          <div className="text-center">
            <p className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
              Plans & credits
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50 sm:text-2xl">
              Pick a plan that matches how often you research.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 text-sm">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                Starter
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">Free</p>
              <p className="mt-2 text-xs text-zinc-400">Great for trying Nexura with a few threads.</p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                <li>• Unlimited local answers</li>
                <li>• 3 saved research threads</li>
                <li>• Community support</li>
              </ul>
            </div>
            <div className="relative rounded-3xl border border-amber-500/60 bg-gradient-to-b from-amber-500/25 via-zinc-950 to-black/95 p-5 text-sm shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              <div className="absolute right-5 top-4 rounded-full bg-amber-400 px-3 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.2em] text-black">
                Most used
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200">
                Studio
              </p>
              <p className="mt-2 text-2xl font-semibold text-amber-50">Rs 499 · 40 credits</p>
              <p className="mt-2 text-xs text-amber-100/80">
                Enough research runs for active founders and product teams.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-amber-50/90">
                <li>• Everything in Starter</li>
                <li>• Priority performance on busy days</li>
                <li>• Live web research (Tavily)</li>
                <li>• Export-ready answers for decks and docs</li>
              </ul>
              <a
                href={user ? "/app" : "/register"}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-amber-400/70 bg-black/90 px-4 py-2 text-[0.7rem] font-mono uppercase tracking-[0.25em] text-amber-200 hover:bg-amber-500 hover:text-black disabled:cursor-default disabled:border-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-500"
              >
                {user ? 'Open workspace' : 'Get started'}
              </a>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 text-sm">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                Organization
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">Custom</p>
              <p className="mt-2 text-xs text-zinc-400">For teams that want higher limits and SLAs.</p>
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                <li>• Shared workspace for multiple teams</li>
                <li>• Role-based access controls</li>
                <li>• Priority onboarding & support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
              Questions? We&apos;ve got answers.
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50 sm:text-2xl">
              Not another generic chatbot. A focused research partner.
            </h2>
            <p className="mt-4 text-sm text-zinc-300/80">
              Every plan includes the same core experience you see in the
              product screenshots: structured answers, sources, and a calm dark
              interface that feels like home.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <details className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
              <summary className="cursor-pointer list-none px-4 py-3 font-medium text-zinc-100">
                How does live web search work?
              </summary>
              <p className="border-t border-zinc-800 px-4 py-3 text-xs text-zinc-300">
                Our Tavily‑powered searchInternet tool pulls fresh pages,
                filters noise, and sends only clean context into the model
                for every user.
              </p>
            </details>
            <details className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
              <summary className="cursor-pointer list-none px-4 py-3 font-medium text-zinc-100">
                Can I cancel anytime?
              </summary>
              <p className="border-t border-zinc-800 px-4 py-3 text-xs text-zinc-300">
                Yes. You can downgrade or cancel your plan at any time. Your
                existing threads remain accessible.
              </p>
            </details>
            <details className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
              <summary className="cursor-pointer list-none px-4 py-3 font-medium text-zinc-100">
                Is my data private?
              </summary>
              <p className="border-t border-zinc-800 px-4 py-3 text-xs text-zinc-300">
                Your chats are stored securely and never used to train
                third‑party models beyond what the provider requires.
              </p>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-24 rounded-[40px]  px-6 py-14 text-center shadow-[0_40px_160px_rgba(0,0,0,0.95)]">
          <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
            Ready to ship with Nexura?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-sm text-zinc-300/85">
            See how quickly you can turn messy questions into clear, cited
            answers. Get started for free—no credit card needed.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={user ? '/app' : '/register'}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-2.5 text-sm font-mono uppercase tracking-[0.24em] text-black shadow-[0_0_40px_rgba(249,115,22,0.6)]"
            >
              {user ? 'Open workspace' : 'Try Nexura now'}
              <span className="text-lg" aria-hidden="true">
                
                
                
                
                
                
                →
              </span>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default Landing
