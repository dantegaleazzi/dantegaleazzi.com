import { ArrowDown, AtSign, BriefcaseBusiness, GitBranch, LayoutGrid } from 'lucide-react'

const socialLinks = [
  { label: 'X / Twitter', href: 'https://x.com/dantegaleazzi', Icon: AtSign },
  { label: 'Projects', href: '#projects', Icon: LayoutGrid },
  { label: 'GitHub', href: 'https://github.com/dantegaleazzi', Icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dantesgaleazzi/', Icon: BriefcaseBusiness },
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
          AI work log / 2026
        </div>
      </div>

      <div className="profile-bio text-[0.96rem] leading-relaxed lg:text-[clamp(0.88rem,1vw,1rem)] lg:leading-[1.5]">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Hi! I'm Dante</h2>
        <p className="mb-4">I’m learning to code and building real products with AI agents.</p>
        <p className="mb-4">
          I test how regular people can use AI to automate work, build useful tools, save money, and make ideas real.
        </p>
        <div className="inline-flex w-fit flex-col items-stretch">
          <a href="#about" className="font-mono text-[0.7rem] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-signal">
            Read my story →
          </a>
          <a
            href="#subscribe"
            className="mobile-subscribe-cta mt-2 flex w-full items-center justify-between border border-ink bg-signal px-2.5 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider no-underline transition-colors hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white focus-visible:outline-none lg:hidden"
          >
            Make AI Do The Work
            <ArrowDown className="size-3" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="profile-socials pt-4 lg:max-w-65">
        <h3 className="mb-2.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">Find Me</h3>
        <ul className="grid grid-cols-2 gap-1">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                className="group flex items-center gap-2 border border-ink px-2.5 py-2 text-[0.75rem] no-underline transition-colors duration-150 hover:bg-signal focus-visible:bg-signal focus-visible:outline-none"
                href={href}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
