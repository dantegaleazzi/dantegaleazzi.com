import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { StartHere } from './components/StartHere'
import { BuildLogs } from './components/BuildLogs'
import { WorkflowCards } from './components/WorkflowCards'
import { NewsletterSection } from './components/NewsletterSection'
import { ProjectsSection } from './components/ProjectsSection'
import { FreeResources } from './components/FreeResources'
import { ZeroToHundredGuide, ZeroToHundredIndex } from './components/ZeroToHundred'
import { guideIndexPath, guideTitles } from './guides'

function getZeroToHundredRoute(pathname: string): 'index' | number | null {
  const path = pathname.replace(/\/+$/, '')
  if (path === guideIndexPath) return 'index'
  const match = path.match(/^\/zero-to-100-guide-(\d+)$/)
  if (!match) return null
  const number = Number(match[1])
  return number >= 1 && number <= guideTitles.length ? number : null
}

function App() {
  const zeroToHundredRoute = getZeroToHundredRoute(window.location.pathname)
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home')

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
    <div className="site-frame mx-auto w-[min(100%-1.5rem,90rem)] sm:w-[min(100%-2.5rem,90rem)]">
      <Header />

      <main id="top">
        {zeroToHundredRoute === 'index' ? (
          <ZeroToHundredIndex />
        ) : zeroToHundredRoute !== null ? (
          <ZeroToHundredGuide number={zeroToHundredRoute} />
        ) : currentPage === 'home' ? (
          <>
            <section className="hero-section" aria-labelledby="hero-title">
              <Hero />
            </section>
            <StartHere />
            <BuildLogs />
            <WorkflowCards />
            <FreeResources />
            <ProjectsSection />
            <NewsletterSection />
          </>
        ) : (
          <section className="border-b-2 border-ink lg:p-12 lg:pb-16" aria-labelledby="hero-title">
            <About />
          </section>
        )}
      </main>

      <footer className="site-footer flex flex-col gap-3 py-6 font-mono text-[0.68rem] uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Dante Galeazzi · Make useful things.</p>
        <div className="flex gap-5">
          <a className="nav-link" href="https://x.com/dantegaleazzi" target="_blank" rel="noreferrer">X</a>
          <a className="nav-link" href="https://github.com/dantegaleazzi" target="_blank" rel="noreferrer">GitHub</a>
          <a className="nav-link" href="https://www.linkedin.com/in/dantesgaleazzi/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  )
}

export default App
