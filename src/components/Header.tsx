export function Header() {
  return (
    <header className="site-header flex min-h-18 items-center justify-between gap-4">
      <a
        className="shrink-0 font-mono text-[0.66rem] font-medium tracking-[0.05em] no-underline sm:text-[0.8rem]"
        href="#top"
        aria-label="Dante Galeazzi, home"
      >
        DANTE GALEAZZI
      </a>

      <nav
        className="flex items-center justify-end gap-2 font-mono text-[0.5rem] font-medium uppercase sm:gap-5 sm:text-[0.66rem] lg:gap-7"
        aria-label="Primary navigation"
      >
        <a className="nav-link" href="#workflows">Workflows</a>
        <a className="nav-link" href="#newsletter">Newsletter</a>
        <a className="nav-link" href="#resources">Free Resources</a>
        <a className="nav-link" href="#projects">Projects</a>
        <a className="nav-link" href="#about">About Me</a>
      </nav>
    </header>
  )
}
