import React from 'react'
import NexuraNavbar from '../component/Navbar.jsx'
import Footer from '../component/Footer.jsx'

const heroCards = [
	{
		title: 'Research workflow',
		description:
			'Prompt-based questions, follow-up threads, and snapshots for sharing decisions.',
	},
	{
		title: 'Account & billing',
		description:
			'Email login, plan upgrades, credit top-ups, and team settings.',
	},
	{
		title: 'Workspace',
		description:
			'Project dashboards, saved threads, and controls for web search usage.',
	},
	{
		title: 'Integrations',
		description:
			'AI providers, email notifications, and hooks for connecting your stack.',
	},
]

const overviewCards = [
	{
		title: 'Research project code',
		description:
			'Turn messy prompts into structured briefs, outlines, and experiment plans.',
	},
	{
		title: 'Preview in workspace',
		description:
			'Review answers, citations, and follow-ups before sharing with your team.',
	},
	{
		title: 'Ship decisions',
		description:
			'Use summaries and action lists to move projects toward real launches.',
	},
	{
		title: 'Keep accounts safe',
		description:
			'Guarded routes, secure sessions, and controls around premium features.',
	},
]

const featureGroups = [
	{
		title: 'Creation',
		items: [
			'Ask detailed prompts to generate research plans and starter documents.',
			'Capture multiple angles on a question with parallel threads.',
			'Save important prompts as templates for your team.',
		],
	},
	{
		title: 'Workspace',
		items: [
			'Organise work by projects so context stays focused.',
			'Pin critical threads to revisit decisions over time.',
			'Filter history by keyword to quickly find past answers.',
		],
	},
	{
		title: 'Preview & release',
		items: [
			'Use concise summaries before sending research to stakeholders.',
			'Download or copy formatted answers for decks and docs.',
			'Export key insights into your own knowledge base tools.',
		],
	},
	{
		title: 'Account & billing',
		items: [
			'Upgrade to unlock live web search and higher limits.',
			'Check remaining credits directly from the account page.',
			'Keep invoices and plan history in one place.',
		],
	},
]

const journeySteps = [
	{
		title: 'Sign in and set your goal',
		description:
			'Create an account, describe the outcome you want, and pick a project space.',
	},
	{
		title: 'Create a research thread',
		description:
			'Ask your first question, choose whether to use live web search, and refine.',
	},
	{
		title: 'Edit and review',
		description:
			'Highlight key sections, request alternatives, and align on next steps.',
	},
	{
		title: 'Share and track',
		description:
			'Share links with your team and revisit the same thread as work evolves.',
	},
]

const operationalNotes = [
	{
		title: 'Search routing',
		description:
			'Live web calls use Nexura\'s backend tools; keep questions specific for best results.',
	},
	{
		title: 'Model safety',
		description:
			'Inputs are filtered before reaching providers and never shared publicly.',
	},
	{
		title: 'Error diagnostics',
		description:
			'When a run fails, Nexura surfaces status messages so you can retry confidently.',
	},
]

const Docs = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b bg-black text-zinc-100 font-sans">
			<div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-20 pt-6 md:px-8">
				<NexuraNavbar />

				<main className="mt-14 flex-1 space-y-16">
					{/* Hero section */}
					<section className="grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-start">
						<div>
							<p className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-amber-200">
								<span className="text-xs">
									📘
								</span>
								Workspace documentation
							</p>
							<h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
								Nexura docs for the full
								<br />
								workspace.
							</h1>
							<p className="mt-4 max-w-xl text-sm text-zinc-300/85">
								This page summarises how Nexura handles research threads, accounts,
								and live web tools so your team knows what to expect in production.
							</p>

							<div className="mt-6 flex flex-wrap items-center gap-4 text-[0.75rem] font-mono uppercase tracking-[0.25em]">
								<a
									href="/app"
									className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 text-black shadow-[0_0_40px_rgba(249,115,22,0.6)]"
								>
									Open dashboard
								</a>
								<a
									href="/contact"
									className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-black/40 px-5 py-2 text-zinc-200 hover:border-amber-400 hover:text-amber-200"
								>
									Contact support
									<span className="text-base" aria-hidden="true">
										✉️
									</span>
								</a>
							</div>
						</div>

						<div className="space-y-4">
							{heroCards.map((card) => (
								<div
									key={card.title}
									className="rounded-2xl border border-zinc-800 bg-black/70 p-4 text-sm shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
								>
									<p className="text-sm font-semibold text-zinc-50">
										{card.title}
									</p>
									<p className="mt-2 text-xs text-zinc-400">{card.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Platform overview */}
					<section className="space-y-6">
						<div>
							<p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
								Platform overview
							</p>
							<h2 className="mt-3 text-2xl font-semibold text-zinc-50 sm:text-3xl">
								What Nexura does
							</h2>
							<p className="mt-3 max-w-2xl text-sm text-zinc-300/85">
								Nexura compresses the path from idea to documented decision by
								combining research, summarisation, and collaboration in one
								workspace.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-4">
							{overviewCards.map((card) => (
								<div
									key={card.title}
									className="rounded-3xl border border-zinc-800 bg-black/70 p-4 text-sm shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
								>
									<p className="text-sm font-semibold text-zinc-50">
										{card.title}
									</p>
									<p className="mt-2 text-xs text-zinc-400">{card.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Complete features */}
					<section className="space-y-6">
						<div>
							<p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
								Workspace features
							</p>
							<h2 className="mt-3 text-2xl font-semibold text-zinc-50 sm:text-3xl">
								Everything Nexura currently offers
							</h2>
							<p className="mt-2 max-w-2xl text-sm text-zinc-300/85">
								These are the core capabilities available across the Nexura
								experience.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							{featureGroups.map((group) => (
								<div
									key={group.title}
									className="rounded-3xl border border-zinc-800 bg-black/75 p-5 text-sm shadow-[0_28px_80px_rgba(0,0,0,0.9)]"
								>
									<p className="text-sm font-semibold text-zinc-50">
										{group.title}
									</p>
									<ul className="mt-3 space-y-2 text-xs text-zinc-300">
										{group.items.map((item) => (
											<li key={item} className="flex gap-2">
												<span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-amber-400" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

					{/* User journey */}
					<section className="space-y-6">
						<p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
							User journey
						</p>
						<h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
							How the app is intended to be used
						</h2>
						<p className="mt-2 max-w-2xl text-sm text-zinc-300/85">
							The main workflow starts with authentication and goal setting,
							then moves through research, review, and sharing.
						</p>

						<div className="grid gap-4 md:grid-cols-2">
							{journeySteps.map((step, index) => (
								<div
									key={step.title}
									className="rounded-3xl border border-zinc-800 bg-black/75 p-5 text-sm shadow-[0_26px_80px_rgba(0,0,0,0.9)]"
								>
									<p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300">
										{index + 1}. {step.title}
									</p>
									<p className="mt-2 text-xs text-zinc-300">{step.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Operational notes */}
					<section className="space-y-6">
						<p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
							Operational notes
						</p>
						<h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
							Things that matter in production
						</h2>
						<p className="mt-2 max-w-2xl text-sm text-zinc-300/85">
							These are the details that help avoid surprises when you roll
							Nexura out to your team.
						</p>

						<div className="grid gap-4 md:grid-cols-3">
							{operationalNotes.map((note) => (
								<div
									key={note.title}
									className="rounded-3xl border border-zinc-800 bg-black/80 p-5 text-sm shadow-[0_26px_80px_rgba(0,0,0,0.95)]"
								>
									<p className="text-sm font-semibold text-zinc-50">
										{note.title}
									</p>
									<p className="mt-2 text-xs text-zinc-300">{note.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* Need help CTA */}
					<section className="space-y-4 rounded-3xl border border-amber-500/35 bg-gradient-to-r from-amber-500/15 via-zinc-950 to-black px-6 py-7 text-sm shadow-[0_32px_110px_rgba(0,0,0,0.95)]">
						<p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-amber-200">
							Need help
						</p>
						<h2 className="text-lg font-semibold text-zinc-50 sm:text-xl">
							Keep the docs page close to the workspace.
						</h2>
						<p className="text-xs text-zinc-200/90">
							If anything in the app feels unclear, open this page from the
							workspace, review the feature that matches your task, and reach out
							if you still need help.
						</p>

						<div className="mt-4 flex flex-wrap gap-3">
							<a
								href="/contact"
								className="inline-flex items-center justify-center rounded-full bg-black/90 px-5 py-2 text-[0.75rem] font-mono uppercase tracking-[0.24em] text-amber-200 border border-amber-400/70 hover:bg-amber-500 hover:text-black"
							>
								Open support form
							</a>
							<a
								href="/app"
								className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-5 py-2 text-[0.75rem] font-mono uppercase tracking-[0.24em] text-zinc-300 hover:border-amber-300 hover:text-amber-200"
							>
								Return to workspace
							</a>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</div>
	)
}

export default Docs

