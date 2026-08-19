import { ArrowUpRight, Flame, Mail, Sparkles, type LucideIcon } from 'lucide-react'

type Project = {
  eyebrow: string
  title: string
  description: string
  status: string
  href?: string
  Icon: LucideIcon
  tile: string
  iconColor: string
}

const projects: Project[] = [
  {
    eyebrow: 'Mobile app · Knowledge system',
    title: 'Sted',
    description: 'A calm, intelligent notebook for everything you save, build and want to remember.',
    status: 'In progress',
    href: 'https://www.sted.ai',
    Icon: Sparkles,
    tile: 'bg-signal',
    iconColor: 'text-ink',
  },
  {
    eyebrow: 'AI product lab',
    title: 'Finiks Labs',
    description: 'Building useful products and experiments with AI in public.',
    status: 'In progress',
    href: 'https://www.finikslabs.com',
    Icon: Flame,
    tile: 'bg-[#ff5c1a]',
    iconColor: 'text-white',
  },
  {
    eyebrow: 'Newsletter · Workflows',
    title: 'Make AI Do The Work',
    description: 'Practical AI workflows for your workday, business, and ideas.',
    status: 'Live soon',
    href: '#newsletter',
    Icon: Mail,
    tile: 'bg-[#3ba776]',
    iconColor: 'text-white',
  },
]

export function ProjectsSection() {
  return (
    <section className="projects-section py-8 lg:py-11" id="projects" aria-labelledby="projects-title">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker mb-3 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-[#5f625b] uppercase">
            Building in public
          </p>
          <h2 className="text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.06em]" id="projects-title">
            Projects I’m Building
          </h2>
        </div>
        <p className="hidden font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase sm:block">003 entries</p>
      </div>

      <div className="grid gap-4.5 lg:grid-cols-3">
        {projects.map(({ eyebrow, title, description, status, href, Icon, tile, iconColor }) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-4">
                <span className={`grid size-14 place-items-center rounded-2xl border-2 border-ink ${tile}`}>
                  <Icon className={`size-7 ${iconColor}`} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.08em] text-ink/60">
                  {status}
                </span>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#5f625b]">{eyebrow}</p>
                <h3 className="mt-2 text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.05] font-bold tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-snug text-ink/65">{description}</p>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.06em] text-ink/70 transition-colors group-hover:text-ink">
                View
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </span>
            </>
          )

          const cls =
            'project-card group flex min-h-64 flex-col justify-between rounded-2xl border-2 border-ink bg-white p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)]'

          if (href) {
            const isExternal = href.startsWith('http')

            return (
              <a
                className={`${cls} no-underline focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:outline-none`}
                href={href}
                key={title}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {inner}
              </a>
            )
          }

          return (
            <article className={cls} key={title}>
              {inner}
            </article>
          )
        })}
      </div>
    </section>
  )
}
