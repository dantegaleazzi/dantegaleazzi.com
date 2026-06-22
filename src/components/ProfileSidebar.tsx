import { AtSign, BriefcaseBusiness, GitBranch, LayoutGrid, FileText } from 'lucide-react'

const socialLinks = [
  { label: 'X / Twitter', href: '#x', Icon: AtSign },
  { label: 'Projects', href: '#projects', Icon: LayoutGrid },
  { label: 'GitHub', href: '#github', Icon: GitBranch },
  { label: 'LinkedIn', href: '#linkedin', Icon: BriefcaseBusiness },
]

export function ProfileSidebar() {
  return (
    <aside
      className="profile-sidebar flex flex-col gap-8 py-8 lg:py-8 lg:pr-[clamp(1.25rem,2.5vw,2.5rem)]"
      id="about"
      aria-label="About Dante"
    >
      <div className="flex flex-col items-start gap-4">
        <div className="profile-image-placeholder size-20 rounded-full border-2 border-ink bg-signal shadow-[4px_4px_0_var(--color-ink)]" aria-hidden="true" />
        <div className="sidebar-label font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase">
          Builder log / 2026
        </div>
      </div>

      <div className="profile-bio text-[0.96rem] leading-relaxed lg:text-[clamp(0.88rem,1vw,1rem)] lg:leading-[1.5]">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Hi! I'm Dante</h2>
        <p className="mb-4">I’m learning to code by building real products with AI agents.</p>
        <p className="mb-4">
          I’m testing how regular people can use AI to build apps, automate work, save money and make things happen.
        </p>
        <a href="#about" className="font-mono text-[0.7rem] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-signal">
          Read more about my story →
        </a>
      </div>

      <div className="profile-socials pt-4 lg:max-w-65">
        <h3 className="mb-2.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">Find Me</h3>
        <ul className="flex flex-col gap-0.5">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                className="group flex items-center gap-2.5 py-1.5 text-[0.78rem] no-underline opacity-70 transition-opacity duration-150 hover:opacity-100 hover:text-signal focus-visible:opacity-100 focus-visible:text-signal focus-visible:outline-none"
                href={href}
              >
                <Icon className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
