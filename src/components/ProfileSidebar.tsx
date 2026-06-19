import { AtSign, BriefcaseBusiness, GitBranch } from 'lucide-react'

const socialLinks = [
  { label: 'X / Twitter', href: '#x', Icon: AtSign },
  { label: 'GitHub', href: '#github', Icon: GitBranch },
  { label: 'LinkedIn', href: '#linkedin', Icon: BriefcaseBusiness },
]

export function ProfileSidebar() {
  return (
    <aside
      className="profile-sidebar grid gap-7 border-b-2 border-ink py-8 lg:flex lg:flex-col lg:border-r-2 lg:border-b-0 lg:py-8 lg:pr-[clamp(1.25rem,2.5vw,2.5rem)] md:grid-cols-[1fr_1.4fr_0.8fr]"
      id="about"
      aria-label="About Dante"
    >
      <div className="sidebar-label flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase">
        <span className="size-2 border border-ink bg-signal shadow-[2px_2px_0_#10110f] aria-hidden='true'" />
        Builder log / 2026
      </div>

      <div className="player-stats" aria-label="Builder status">
        <span>LVL <b>01</b></span>
        <span>XP <b>000</b></span>
        <span>STATUS <b>LEARNING</b></span>
      </div>

      <div className="profile-bio text-[0.96rem] leading-relaxed lg:mt-8 lg:text-[clamp(0.88rem,1vw,1rem)] lg:leading-[1.5]">
        <p className="mb-4 lg:mb-3.5">I’m learning to code by building real products with AI agents.</p>
        <p className="mb-4 lg:mb-3.5">
          I’m testing how regular people can use AI to build apps, automate work, save money and make things happen.
        </p>
        <p className="current-build border-2 border-ink bg-signal p-3.5 font-mono text-xs font-medium leading-relaxed shadow-[5px_5px_0_#10110f] lg:p-3 lg:text-[0.68rem]">
          Currently building Make AI Do The Work.
        </p>
      </div>

      <div className="profile-socials max-w-65 lg:mt-auto lg:pt-6">
        <h2 className="mb-2.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">Find Me</h2>
        <ul className="border-t border-ink">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                className="group flex items-center justify-between border-b border-ink px-0.5 py-2 text-[0.8rem] no-underline transition-[padding,background-color] duration-150 hover:bg-signal hover:pl-2 focus-visible:bg-signal focus-visible:pl-2 focus-visible:outline-none"
                href={href}
              >
                {label}
                <Icon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
