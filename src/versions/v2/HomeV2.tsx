// The main home (the "version 2" layout) with the story's hero. The full story lives at /shipaton-application.
import { Hero } from '../../components/Hero'
import { NewsletterSoon } from '../../components/home/HomeSections'
import { BuildYoursSection, ProcessSection, StedSection } from './HomeSectionsV2'

export function HomeV2() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <Hero storyHref="/shipaton-application" interviewsHref="#experts" />
      </section>
      <StedSection />
      <ProcessSection />
      <BuildYoursSection />
      <NewsletterSoon />
    </>
  )
}
