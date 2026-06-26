import { ArrowRight, Dumbbell, Megaphone, Sparkles, type LucideIcon } from 'lucide-react'

type Project = {
  eyebrow: string
  title: string
  description: string
  status: string
  cta: string
  href?: string
  Icon: LucideIcon
}

const projects: Project[] = [
  {
    eyebrow: 'Newsletter / workflows',
    title: 'Make AI Do The Work',
    description: 'Practical AI workflows for your workday, business, and ideas.',
    status: 'Subscribe',
    cta: 'Subscribe soon',
    href: '#newsletter',
    Icon: Sparkles,
  },
  {
    eyebrow: 'Mobile app',
    title: 'Moti',
    description: 'Your gym routine motivator and buddy.',
    status: 'Soon mobile app',
    cta: 'Coming soon',
    Icon: Dumbbell,
  },
  {
    eyebrow: 'Distribution systems',
    title: 'Distribution Loop',
    description: 'LinkedIn distribution systems for founder-led companies.',
    status: 'Soon agency',
    cta: 'Coming soon',
    Icon: Megaphone,
  },
]

export function ProjectsSection() {
  return (
    <section className="projects-section py-8 lg:py-11" id="projects" aria-labelledby="projects-title">
      <div className="projects-shell border-2 border-ink bg-ink text-white">
        <div className="grid gap-5 border-b-2 border-white/20 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-8">
          <div>
            <p className="mb-3 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-signal uppercase">
              Building in public / product shelf
            </p>
            <h2
              className="max-w-180 text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.06em]"
              id="projects-title"
            >
              Projects I’m Building
            </h2>
          </div>
          <p className="max-w-95 font-mono text-[0.72rem] leading-relaxed tracking-[0.02em] text-white/70 uppercase">
            Apps, workflows, and products I’m building in public.
          </p>
        </div>

        <div className="grid gap-px bg-white/20 lg:grid-cols-3">
          {projects.map(({ eyebrow, title, description, status, cta, href, Icon }, index) => {
            const CardContent = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/55">0{index + 1}</span>
                  <span className="border border-white/35 bg-white/8 px-2 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.08em] text-white/80 transition-colors group-hover:border-ink group-hover:bg-white group-hover:text-ink">
                    {status}
                  </span>
                </div>

                <div className="mt-9">
                  <span className="grid size-11 place-items-center border-2 border-white/35 bg-white/8 transition-colors group-hover:border-ink group-hover:bg-white">
                    <Icon className="size-5 transition-colors group-hover:text-ink" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-signal transition-colors group-hover:text-ink/60">
                    {eyebrow}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.65rem,2.6vw,2.5rem)] leading-[0.98] font-bold tracking-[-0.05em]">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-90 text-sm leading-relaxed text-white/72 transition-colors group-hover:text-ink/75">
                    {description}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white transition-colors group-hover:text-ink">
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                </span>
              </>
            )

            if (href) {
              return (
                <a className="project-card group flex min-h-82 flex-col justify-between bg-ink p-5 no-underline transition-colors hover:bg-signal focus-visible:bg-signal focus-visible:outline-none sm:p-6" href={href} key={title}>
                  {CardContent}
                </a>
              )
            }

            return (
              <article className="project-card group flex min-h-82 flex-col justify-between bg-ink p-5 transition-colors hover:bg-signal sm:p-6" key={title}>
                {CardContent}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
