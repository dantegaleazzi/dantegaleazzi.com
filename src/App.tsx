import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ProfileSidebar } from './components/ProfileSidebar'
import { WorkflowCards } from './components/WorkflowCards'

export type ThemeName =
  | 'brutalist'
  | 'gamer'
  | 'desktop-os'
  | 'desktop-os-y'
  | 'desktop-os-g'
  | 'desktop-os-b'
  | 'desktop-os-yy'
  | 'desktop-os-yyy'

function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('desktop-os-y')
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home')

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme
  }, [activeTheme])

  // Handle hash changes for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#about') {
        setCurrentPage('about')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check on load

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div
      className={`site-frame mx-auto w-[min(100%-1.5rem,90rem)] sm:w-[min(100%-2.5rem,90rem)] theme-${activeTheme}`}
      data-theme={activeTheme}
    >
      <Header activeTheme={activeTheme} onThemeChange={setActiveTheme} />

      <main id="top">
        <section
          className={`hero-section grid border-b-2 border-ink lg:min-h-[calc(100svh-4.5rem)] ${
            currentPage === 'home'
              ? 'lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,2.35fr)]'
              : 'grid-cols-1 lg:p-12 lg:pb-16'
          }`}
          aria-labelledby="hero-title"
        >
          {currentPage === 'home' && <ProfileSidebar />}
          {currentPage === 'home' ? <Hero /> : <About />}
        </section>

        {currentPage === 'home' && <WorkflowCards />}
      </main>

      <footer className="site-footer flex flex-col gap-2 py-6 font-mono text-[0.68rem] uppercase sm:flex-row sm:justify-between">
        <p>Make useful things. Show your work.</p>
        <p>© {new Date().getFullYear()} Dante Galeazzi</p>
      </footer>
    </div>
  )
}

export default App
