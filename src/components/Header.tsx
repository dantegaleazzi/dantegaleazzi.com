import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ThemeName } from '../App'

type HeaderProps = {
  activeTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
}

const themes: Array<{ id: ThemeName; label: string }> = [
  { id: 'brutalist', label: 'Brutalist Grid' },
  { id: 'gamer', label: 'Pixel Gamer' },
  { id: 'desktop-os', label: 'Desktop OS' },
  { id: 'desktop-os-y', label: 'Desktop OS Y' },
  { id: 'desktop-os-g', label: 'Desktop OS G' },
  { id: 'desktop-os-b', label: 'Desktop OS B' },
  { id: 'desktop-os-yy', label: 'Desktop OS YY' },
  { id: 'desktop-os-yyy', label: 'Desktop OS YYY' },
]

export function Header({ activeTheme, onThemeChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="site-header flex min-h-18 items-center justify-between border-b-2 border-ink">
      <a
        className="font-mono text-[0.7rem] font-medium tracking-[0.06em] no-underline sm:text-[0.8rem]"
        href="#top"
        aria-label="Dante Galeazzi, home"
      >
        DANTE GALEAZZI
      </a>

      <nav className="flex gap-3 font-mono text-[0.58rem] font-medium uppercase sm:gap-7 sm:text-[0.68rem]" aria-label="Primary navigation">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-link flex items-center gap-1 cursor-pointer uppercase"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            Themes <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 min-w-[160px] border-2 border-ink bg-white shadow-[4px_4px_0_var(--color-ink)] py-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-signal transition-colors duration-150 ${
                    activeTheme === theme.id ? 'bg-signal font-bold' : ''
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <a className="nav-link" href="#workflows">Blog</a>
        <a className="nav-link" href="#about">About Me</a>
      </nav>
    </header>
  )
}
