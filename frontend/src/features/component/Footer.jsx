import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-zinc-900/80 pt-10 pb-6 text-zinc-400">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
            {/* Brand + description */}
            <div>
              <h2 className="text-3xl font-semibold tracking-[0.35em] text-zinc-50 uppercase sm:text-4xl">
                Nexura
              </h2>
              <p className="mt-4 max-w-md text-sm text-zinc-300/90">
                Nexura is an AI research studio that helps you turn messy
                questions into clear, cited answers. Explore ideas, verify
                sources, and ship confident decisions faster.
              </p>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="/about" className="hover:text-amber-200">About us</a></li>
                <li><a href="/docs" className="hover:text-amber-200">Documentation</a></li>
                <li><a href="/contact" className="hover:text-amber-200">Contact us</a></li>
                <li><a href="#" className="hover:text-amber-200">Privacy policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Subscribe to our newsletter</h3>
              <p className="mt-3 text-xs text-zinc-400">
                Get the latest research notes, product updates, and prompts
                delivered to your inbox.
              </p>
              <form
                className="mt-4 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:bg-amber-400"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-900/70 pt-4 text-[0.65rem] text-zinc-500 md:flex-row">
            <div>
              © {new Date().getFullYear()} Nexura. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-amber-200">Privacy Policy</a>
              <a href="#" className="hover:text-amber-200">Terms of Service</a>
              <a href="#" className="hover:text-amber-200">Cookie Policy</a>
            </div>
          </div>
        </footer>
  )
}

export default Footer