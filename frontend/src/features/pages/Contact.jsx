import React from 'react'
import NexuraNavbar from '../component/Navbar.jsx'
import Footer from '../component/Footer.jsx'

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#050008] text-zinc-100 font-sans">
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-20 pt-6 md:px-8">
        <NexuraNavbar />

        <main className="mt-12 flex-1 gap-10 md:mt-16 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
          {/* Left copy + contact details */}
          <section className="mb-10 md:mb-0 md:pr-4">
            <p className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-amber-200">
              Contact
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-4 text-sm text-zinc-300/85">
              Have product questions, team needs, or ideas for Nexura? Share a
              bit of context and we&apos;ll follow up with the right next steps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-black px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                  <span className="text-lg" aria-hidden="true">
                    ✉️
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-100">Email</p>
                  <p className="text-sm text-zinc-300">hello@nexura.studio</p>
                  <p className="mt-1 text-xs text-zinc-500">We usually reply within one business day.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-black px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                  <span className="text-lg" aria-hidden="true">
                    📞
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-100">Call</p>
                  <p className="text-sm text-zinc-300">+91 00000 00000</p>
                  <p className="mt-1 text-xs text-zinc-500">Mon–Fri, 9:00 AM – 6:00 PM IST.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-black px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                  <span className="text-lg" aria-hidden="true">
                    📍
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-100">Office</p>
                  <p className="text-sm text-zinc-300">Remote-first team based in India.</p>
                  <p className="mt-1 text-xs text-zinc-500">Working with founders and teams worldwide.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right form */}
          <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-black p-6 shadow-[0_32px_110px_rgba(0,0,0,0.9)]">
            <h2 className="text-lg font-semibold text-zinc-50 sm:text-xl">
              Send a message
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Share enough context so we can route your request quickly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-zinc-300">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your use case or team."
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-[0.8rem] font-mono uppercase tracking-[0.24em] text-black shadow-[0_0_40px_rgba(249,115,22,0.7)]"
              >
                Send message
              </button>
            </form>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Contact