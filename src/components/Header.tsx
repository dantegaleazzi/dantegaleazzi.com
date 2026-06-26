import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Workflows', href: '#workflows' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Free Resources', href: '#resources' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header flex min-h-18 flex-wrap items-center justify-between gap-4">
      <a
        className="shrink-0 font-mono text-[0.66rem] font-medium tracking-[0.05em] no-underline sm:text-[0.8rem]"
        href="#top"
        aria-label="Dante Galeazzi, home"
        onClick={() => setIsMenuOpen(false)}
      >
        DANTE GALEAZZI
      </a>

      <button
        className="flex items-center gap-2 border border-ink bg-signal px-3 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] shadow-[2px_2px_0_var(--color-ink)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_var(--color-ink)] md:hidden"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
        {isMenuOpen ? <X className="size-3.5" aria-hidden="true" /> : <Menu className="size-3.5" aria-hidden="true" />}
      </button>

      <nav
        className="hidden items-center justify-end gap-2 font-mono text-[0.5rem] font-medium uppercase sm:gap-5 sm:text-[0.66rem] md:flex lg:gap-7"
        aria-label="Primary navigation"
      >
        {navItems.map(({ label, href }) => (
          <a className="nav-link" href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      {isMenuOpen && (
        <nav
          className="grid w-full gap-2 border-t-2 border-ink pt-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] md:hidden"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map(({ label, href }) => (
            <a
              className="border border-ink bg-white px-3 py-3 no-underline transition-colors hover:bg-signal focus-visible:bg-signal focus-visible:outline-none"
              href={href}
              key={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
