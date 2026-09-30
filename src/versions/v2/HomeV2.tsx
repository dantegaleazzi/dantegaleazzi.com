// The main home (the "version 2" layout). The Shipaton story lives at /shipaton-application.
import { NewsletterSoon } from '../../components/home/HomeSections'
import { HeroV2 } from './HeroV2'
import { BuildYoursSection, ProcessSection, StedSection } from './HomeSectionsV2'

export function HomeV2() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <HeroV2 />
      </section>
      <StedSection />
      <ProcessSection />
      <BuildYoursSection />
      <NewsletterSoon />
    </>
  )
}
