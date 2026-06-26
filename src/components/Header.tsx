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
    <header className="site-header relative flex min-h-18 items-center justify-between gap-4">
      <a
        className="shrink-0 font-mono text-[0.66rem] font-medium tracking-[0.05em] no-underline sm:text-[0.8rem]"
        href="#top"
        aria-label="Dante Galeazzi, home"
        onClick={() => setIsMenuOpen(false)}
      >
        DANTE GALEAZZI
      </a>

      <button
        className="flex items-center gap-2 border-2 border-ink bg-signal px-3 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] shadow-[3px_3px_0_var(--color-ink)] transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_var(--color-ink)] md:hidden"
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
          className="absolute top-[calc(100%+0.55rem)] right-0 z-30 grid w-[min(15.5rem,calc(100vw-2.5rem))] overflow-hidden rounded-lg border-2 border-ink bg-white font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] shadow-[5px_5px_0_rgba(30,30,30,0.16)] md:hidden"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map(({ label, href }) => (
            <a
              className="border-b border-ink/20 px-4 py-3 no-underline transition-colors last:border-b-0 hover:bg-signal focus-visible:bg-signal focus-visible:outline-none"
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
