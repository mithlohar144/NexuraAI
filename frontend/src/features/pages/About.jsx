import React from 'react'
import NexuraNavbar from '../component/Navbar.jsx'
import Footer from '../component/Footer.jsx'

const About = () => {
	return (
		<div className="min-h-screen bg-[#050008] text-zinc-100 font-sans">
			<div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-20 pt-6 md:px-8">
				<NexuraNavbar />

				<main className="mt-14 flex-1 space-y-14">
					{/* Intro */}
					<section className="max-w-3xl">
						<p className="text-[0.7rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
							About Nexura
						</p>
						<h1 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
							An AI research studio for teams who care about clarity.
						</h1>
						<p className="mt-4 text-sm text-zinc-300/85">
							Nexura combines fast models, live web search, and a calm
							interface so you can move from vague questions to cited answers
							without juggling a dozen tabs. Built for founders, analysts, and
							writers who want signal, not noise.
						</p>
					</section>

					{/* Pillars */}
					<section className="grid gap-6 md:grid-cols-3">
						<div className="rounded-3xl border border-amber-500/35 bg-gradient-to-b from-amber-500/20 via-zinc-950/90 to-black/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.9)]">
							<p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-amber-200">
								Research that cites
							</p>
							<p className="mt-3 text-sm text-zinc-50">
								Every answer can pull fresh sources from the web so you can
								see exactly where claims come from.
							</p>
						</div>
						<div className="rounded-3xl border border-zinc-700/80 bg-zinc-950/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.9)]">
							<p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-300">
								Built for teams
							</p>
							<p className="mt-3 text-sm text-zinc-200">
								Keep threads for each project, share links with teammates, and
								keep decisions in one calm workspace.
							</p>
						</div>
						<div className="rounded-3xl border border-zinc-700/80 bg-zinc-950/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.9)]">
							<p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-300">
								Opinionated design
							</p>
							<p className="mt-3 text-sm text-zinc-200">
								Thoughtful typography, spacing, and dark mode that feels like
								a product site, not a terminal.
							</p>
						</div>
					</section>

					{/* Values */}
					<section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
						<div>
							<h2 className="text-lg font-semibold text-zinc-50 sm:text-xl">
								What we&apos;re building toward
							</h2>
							<p className="mt-3 text-sm text-zinc-300/85">
								Nexura started as a simple research assistant. It&apos;s growing
								into a workspace where every question, draft, and decision
								lives in a single, searchable timeline.
							</p>
							<p className="mt-3 text-sm text-zinc-300/80">
								We care about trustworthy answers, transparent tooling, and
								interfaces that feel considered instead of cluttered.
							</p>
						</div>
						<div className="space-y-3 text-sm text-zinc-300/85">
							<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
								<p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-400">
									Today
								</p>
								<p className="mt-2 text-sm">
									Ask questions, explore the live web, and keep long-running
									research threads with your team.
								</p>
							</div>
							<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
								<p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-zinc-400">
									Next
								</p>
								<p className="mt-2 text-sm">
									Richer collaboration, team workspaces, and more control over
									which models and tools power each answer.
								</p>
							</div>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</div>
	)
}

export default About

