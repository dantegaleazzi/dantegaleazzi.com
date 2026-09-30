// Temporary: the previous home iteration, mounted at /version-2 for side-by-side comparison. Remove before shipping.
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
