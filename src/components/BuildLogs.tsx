import { ArrowUpRight } from 'lucide-react'

type LogEntry = {
  entry: string
  date: string
  title: string
  description: string
  tools: string
  href: string
}

const logs: LogEntry[] = [
  {
    entry: '#001',
    date: 'Today',
    title: 'Sted / Day 0',
    description: 'Started building Sted in public: from a first idea to a mobile app on the App Store.',
    tools: 'Sted · AI agents',
    href: 'https://www.sted.ai/build/day-0',
  },
]

export function BuildLogs() {
  return (
    <section className="build-logs-section py-8 lg:py-11" aria-labelledby="build-logs-title">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker mb-3 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-[#5f625b] uppercase">
            Public experiments / from the lab
          </p>
          <h2 className="text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.06em]" id="build-logs-title">
            Latest build logs
          </h2>
        </div>
        <a href="#newsletter" className="nav-link hidden font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase sm:inline-block">
          New log every week
        </a>
      </div>

      <div className="grid gap-4.5 lg:grid-cols-3">
        {logs.map(({ entry, date, title, description, tools, href }) => {
          const isExternal = href.startsWith('http')

          return (
          <a
            key={entry}
            href={href}
            className="group flex min-h-56 flex-col rounded-2xl border-2 border-ink bg-white p-5.5 no-underline transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:outline-none"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
          >
            <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink/55">
              <span>Entry {entry}</span>
              <span>{date}</span>
            </div>
            <h3 className="mt-3 text-[1.2rem] font-bold leading-tight tracking-[-0.02em]">{title}</h3>
            <p className="mt-2 text-[0.9rem] leading-snug text-ink/65">{description}</p>
            <div className="mt-auto flex items-end justify-between gap-3 pt-5">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.06em] text-[#5f625b]">{tools}</span>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink/40 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                aria-hidden="true"
              />
            </div>
          </a>
          )
        })}
      </div>
    </section>
  )
}
