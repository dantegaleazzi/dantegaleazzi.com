import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { BuildYoursSection, InPublicSection, NewsletterSoon, StorySection } from './components/home/HomeSections'
import { ZeroToHundredGuide, ZeroToHundredIndex } from './components/ZeroToHundred'
import { socials } from './content/site'
import { guideIndexPath, guideTitles } from './guides'
import { HomeV1 } from './versions/v1/HomeV1'
import { HomeV2 } from './versions/v2/HomeV2'
import { GuidePage } from './components/guide/GuidePage'
import { lessonMeta, lessons } from './guides/lessons'

function getZeroToHundredRoute(pathname: string): 'index' | number | null {
  const path = pathname.replace(/\/+$/, '')
  if (path === guideIndexPath) return 'index'
  const match = path.match(/^\/zero-to-100-guide-(\d+)$/)
  if (!match) return null
  const number = Number(match[1])
  return number >= 1 && number <= guideTitles.length ? number : null
}

const footerLinks = Object.values(socials).filter((social) => social.href)

function App() {
  const zeroToHundredRoute = getZeroToHundredRoute(window.location.pathname)
  const path = window.location.pathname.replace(/\/+$/, '')
  const isVersion1 = path === '/version-1'
  const isVersion2 = path === '/version-2'
  const isShipatonApplication = path === '/shipaton-application'
  const lessonIndex = lessons.findIndex((lesson) => lesson.path === path)

  // The browser tries to jump to the #hash before React renders the page, so do it once rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const jump = () => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), 0)
    if (document.readyState === 'complete') jump()
    else window.addEventListener('load', jump, { once: true })
    return () => window.removeEventListener('load', jump)
  }, [])

  return (
    <div className="site-frame mx-auto w-[min(100%-1.5rem,90rem)] sm:w-[min(100%-2.5rem,90rem)]">
      <Header />

      <main id="top">
        {isVersion1 ? (
          <HomeV1 />
        ) : isShipatonApplication ? (
          <>
            <section className="hero-section" aria-labelledby="hero-title">
              <Hero />
            </section>
            <StorySection />
            <InPublicSection />
            <BuildYoursSection />
            <NewsletterSoon />
          </>
        ) : isVersion2 ? (
          <HomeV2 />
        ) : lessonIndex >= 0 ? (
          <GuidePage guide={lessons[lessonIndex].guide} meta={lessonMeta(lessonIndex)} />
        ) : zeroToHundredRoute === 'index' ? (
          <ZeroToHundredIndex />
        ) : zeroToHundredRoute !== null ? (
          <ZeroToHundredGuide number={zeroToHundredRoute} />
        ) : (
          // The main home is the version-2 layout until its cleanup lands.
          <HomeV2 />
        )}
      </main>

      <footer className="site-footer flex flex-col gap-3 border-t-2 border-ink py-6 font-mono text-[0.68rem] uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <span className="font-sans">{new Date().getFullYear()}</span> Dante Galeazzi · Building in public
        </p>
        <div className="flex flex-wrap gap-5">
          {footerLinks.map(({ label, href }) => (
            <a key={href} className="nav-link" href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
