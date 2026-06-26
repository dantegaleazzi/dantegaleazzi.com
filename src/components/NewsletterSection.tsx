import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react'
import { FormEvent, useState } from 'react'

const pinnedPosts = [
  {
    date: 'Soon',
    category: 'Workflow',
    title: 'Make AI QA your app overnight',
  },
  {
    date: 'Soon',
    category: 'Build log',
    title: 'What it actually costs to build an app with agents',
  },
  {
    date: 'Soon',
    category: 'Tool test',
    title: 'The AI tools that earned a place in my workflow',
  },
]

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="newsletter-section py-8 lg:py-11" id="newsletter" aria-labelledby="newsletter-title">
      <div className="section-heading mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker mb-3 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-[#5f625b] uppercase">
            Check the newsletter
          </p>
          <h2
            className="text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.06em]"
            id="newsletter-title"
          >
            Make AI Do The Work
          </h2>
        </div>
        <p className="hidden font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase sm:block">
          Weekly execution notes
        </p>
      </div>

      <div className="newsletter-console grid overflow-hidden border-2 border-ink bg-white lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
        <div className="newsletter-pinned p-5 sm:p-7 lg:border-r-2 lg:border-ink">
          <div className="mb-2 flex items-center justify-between border-b-2 border-ink pb-3">
            <h3 className="font-mono text-sm font-bold uppercase tracking-[0.08em]">Pinned</h3>
            <span className="font-mono text-[0.62rem] uppercase opacity-55">003 posts</span>
          </div>

          <div className="divide-y divide-ink/25">
            {pinnedPosts.map(({ date, category, title }) => (
              <article className="pinned-post grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4" key={title}>
                <span className="grid size-9 place-items-center border border-ink bg-[#fffef8]">
                  <FileText className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="mb-1 font-mono text-[0.58rem] uppercase tracking-wider opacity-55">
                    {date} / {category}
                  </p>
                  <h4 className="text-sm leading-tight font-bold tracking-[-0.02em] sm:text-base">{title}</h4>
                </div>
                <span className="grid size-7 place-items-center" aria-label="Coming soon">
                  <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="newsletter-signup flex flex-col justify-center border-t-2 border-ink bg-signal p-5 sm:p-7 lg:border-t-0 lg:p-9">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em]">Get every new workflow</p>
          <h3 className="mt-3 max-w-120 text-[clamp(1.8rem,3vw,3rem)] leading-[0.98] font-bold tracking-[-0.05em]">
            Make AI useful—not just impressive.
          </h3>
          <p className="mt-4 max-w-125 text-sm leading-relaxed">
            Build logs, agents, automations, costs and failures delivered to your inbox.
          </p>

          <form className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-0" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="h-12 min-w-0 rounded-none border-2 border-ink bg-[#fffef8] px-4 text-sm outline-none focus:shadow-[inset_0_0_0_3px_#ffd400]"
              id="newsletter-email"
              name="newsletter-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
            <button
              className="group flex h-12 cursor-pointer items-center justify-center gap-2 border-2 border-ink bg-ink px-5 font-mono text-[0.7rem] font-bold text-white uppercase hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink focus-visible:outline-none sm:border-l-0"
              type="submit"
            >
              Subscribe
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>

          {submitted ? (
            <p className="mt-3 font-mono text-[0.65rem]" role="status">
              You’re on the launch list. Substack integration comes next.
            </p>
          ) : (
            <p className="mt-3 font-mono text-[0.62rem] opacity-65">0 → 1,000 builders making AI useful.</p>
          )}
        </div>
      </div>
    </section>
  )
}
