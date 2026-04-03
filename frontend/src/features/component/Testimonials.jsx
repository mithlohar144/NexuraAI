import React from 'react'

const testimonials = [
  {
    role: 'Founder & CEO',
    quote:
      'Nexura feels like an operator on my team. Our research briefs are twice as clear and ship in half the time.',
    name: 'Maya Singh',
    initials: 'MS',
  },
  {
    role: 'Head of Product',
    quote:
      'The mix of live web search and structured answers means I can walk into stakeholder meetings already prepared.',
    name: 'Ethan Cole',
    initials: 'EC',
  },
  {
    role: 'Research Lead',
    quote:
      'We replaced a tangle of docs with Nexura threads. Context stays fresh and handoffs are finally painless.',
    name: 'Lena Ortiz',
    initials: 'LO',
  },
  {
    role: 'Growth PM',
    quote:
      'Experiment reviews now take minutes, not hours. Nexura surfaces the why behind the numbers without the noise.',
    name: 'Jordan Park',
    initials: 'JP',
  },
  {
    role: 'Design Director',
    quote:
      'The tone of the answers is calm and crisp. It reads like a teammate who understands product, not a bot.',
    name: 'Zoe Laurent',
    initials: 'ZL',
  },
  {
    role: 'Operations Lead',
    quote:
      'Our ops playbooks live inside threads now. New hires ramp faster because everything is explained step by step.',
    name: 'Arjun Mehta',
    initials: 'AM',
  },
]

const Testimonials = () => {
  return (
    <section className="mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-zinc-500">
          What teams say about Nexura
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-zinc-50 sm:text-3xl">
          Trusted by people who ship real products.
        </h2>
        <p className="mt-3 text-sm text-zinc-300/80">
          Stories from builders using Nexura to keep research, decisions, and
          context in one calm workspace.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="flex h-full flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
          >
            <header className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                  {item.role}
                </p>
                <p className="mt-1 text-xs text-zinc-500">Nexura customer</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-semibold text-black shadow-[0_0_0_2px_rgba(0,0,0,0.85)]">
                {item.initials}
              </div>
            </header>

            <p className="mt-5 text-sm leading-relaxed text-zinc-200">
              
              {`"${item.quote}"`}
            </p>

            <p className="mt-5 text-xs font-medium text-zinc-400">- {item.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
