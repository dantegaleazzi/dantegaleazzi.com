import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ProfileSidebar } from './components/ProfileSidebar'
import { WorkflowCards } from './components/WorkflowCards'
import { NewsletterSection } from './components/NewsletterSection'
import { ProjectsSection } from './components/ProjectsSection'
import { FreeResources } from './components/FreeResources'

function App() {
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
        <section
          className={`hero-section grid border-b-2 border-ink ${
            currentPage === 'home'
              ? 'lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,2.35fr)]'
              : 'grid-cols-1 lg:p-12 lg:pb-16'
          }`}
          aria-labelledby="hero-title"
        >
          {currentPage === 'home' && <ProfileSidebar />}
          {currentPage === 'home' ? <Hero /> : <About />}
        </section>

        {currentPage === 'home' && (
          <div className="flex justify-center py-2">
            <span className="animate-bounce-subtle flex items-center gap-3 font-mono text-[1.08rem] font-bold uppercase tracking-widest text-ink/65">
              Scroll for workflows
              <ArrowDown className="size-[1.3rem]" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </div>
        )}

        {currentPage === 'home' && (
          <>
            <WorkflowCards />
            <NewsletterSection />
            <FreeResources />
            <ProjectsSection />
          </>
        )}
      </main>

      <footer className="site-footer flex flex-col gap-2 py-6 font-mono text-[0.68rem] uppercase sm:flex-row sm:justify-between">
        <p>Make useful things. Show your work.</p>
        <p>© {new Date().getFullYear()} Dante Galeazzi</p>
      </footer>
    </div>
  )
}

export default App
