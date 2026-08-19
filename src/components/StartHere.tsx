import { ArrowUpRight, FolderGit2, Library, Mail, Workflow, type LucideIcon } from 'lucide-react'

type Pillar = {
  label: string
  title: string
  desc: string
  href: string
  Icon: LucideIcon
}

const pillars: Pillar[] = [
  { label: 'Newsletter', title: 'Field Notes', desc: 'Weekly AI workflows in your inbox.', href: '#newsletter', Icon: Mail },
  { label: 'Workflows', title: 'Popular workflows', desc: 'Copy-paste AI systems that work.', href: '#workflows', Icon: Workflow },
  { label: 'Projects', title: "What I'm building", desc: 'Apps and products, in public.', href: '#projects', Icon: FolderGit2 },
  { label: 'Resources', title: 'Free resources', desc: 'The AI tools I actually use.', href: '#resources', Icon: Library },
]

export function StartHere() {
  return (
    <section className="py-3" aria-label="Start here">
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ label, title, desc, href, Icon }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col rounded-2xl border-2 border-ink bg-white p-5 no-underline transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:outline-none"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl border-2 border-ink bg-signal">
                <Icon className="size-5 text-ink" strokeWidth={2} aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="size-4 text-ink/30 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#5f625b]">{label}</p>
            <h3 className="mt-1 text-[1.15rem] font-bold leading-tight tracking-[-0.02em]">{title}</h3>
            <p className="mt-1.5 text-[0.85rem] leading-snug text-ink/60">{desc}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
