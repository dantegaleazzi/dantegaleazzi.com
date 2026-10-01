import { ArrowRight, ArrowUpRight, CirclePlay } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  apps,
  expertsPlaylist,
  latestVideo,
  resources,
  shipatonPlaylist,
  socials,
  tools,
  youtubeThumbnail,
  type SocialKey,
} from '../../content/site'
import { guidePath, guides, guideTitles } from '../../guides'
import { monoLabel } from '../../components/guide/Visuals'
import { SansDigits } from '../../components/guide/text'
import { GuideSeriesActions, SectionHeader, buttonClass } from '../../components/home/ui'

const card = 'rounded-md border-2 border-ink bg-white'
const subTitle = 'text-[1.5rem] leading-[1.1] font-bold tracking-[-0.035em]'

function HomeSection({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 py-10 lg:py-14" aria-labelledby={`${id}-title`}>
      {children}
    </section>
  )
}

function SubHeader({
  id,
  step,
  title,
  description,
  action,
}: {
  id: string
  step?: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-2xl">
        {step && <p className={`${monoLabel} mb-1.5 text-[0.62rem] text-muted`}>{step}</p>}
        <h3 id={id} className={subTitle}>
          <SansDigits text={title} />
        </h3>
        <p className="mt-1.5 leading-[1.5] text-ink/70">{description}</p>
      </div>
      {action}
    </div>
  )
}

function Logo({ src, size = 'size-8' }: { src: string; size?: string }) {
  return (
    <img src={src} alt="" width={32} height={32} loading="lazy" className={`${size} shrink-0 rounded-md border border-ink/15 bg-white object-contain p-0.5`} />
  )
}

function ExternalLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

// 02 — The app

export function StedSection() {
  const [sted, shimpaku] = apps
  return (
    <HomeSection id="sted">
      <SectionHeader
        id="sted-title"
        chapter="02"
        kicker="The app"
        title="Meet Sted"
        description="The app I built during the Shipaton — and the one I use every day."
      />
      <div className="grid gap-3 lg:grid-cols-[3fr_2fr]">
        <article className="flex flex-col gap-6 rounded-lg border-2 border-ink bg-signal p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <img src={sted.icon} alt="Sted app icon" width={72} height={72} className="size-18 rounded-[1.1rem] border-2 border-ink" />
            <div>
              <p className="text-[2.2rem] leading-none font-bold tracking-[-0.05em]">Sted</p>
              <p className={`${monoLabel} mt-1.5 text-[0.64rem]`}>{sted.status}</p>
            </div>
          </div>
          <div>
            <p className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] font-bold tracking-[-0.04em]">{sted.tagline}</p>
            <p className="mt-3 max-w-lg text-[1.05rem] leading-[1.5]">{sted.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sted.actions.map(({ label, href }, index) => (
              <ExternalLink
                key={label}
                href={href}
                className={`${buttonClass} ${index === 0 ? 'bg-ink text-white hover:bg-white hover:text-ink' : 'bg-white hover:bg-butter'}`}
              >
                {label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ExternalLink>
            ))}
          </div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem]">
            <span className="font-medium">Follow {sted.handle} on</span>
            {sted.socials.map(({ label, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-4">
                {label}
              </a>
            ))}
          </p>
        </article>

        <article className={`${card} flex flex-col gap-4 p-6`}>
          <p className={`${monoLabel} text-[0.62rem] text-muted`}>Also shipped during the Shipaton</p>
          <div className="flex items-center gap-3.5">
            <img src={shimpaku.icon} alt="Shimpaku app icon" width={56} height={56} className="size-14 rounded-[0.9rem] border-2 border-ink" />
            <div>
              <p className="text-[1.6rem] leading-none font-bold tracking-[-0.04em]">{shimpaku.name}</p>
              <p className={`${monoLabel} mt-1 text-[0.6rem] text-muted`}>{shimpaku.status}</p>
            </div>
          </div>
          <div>
            <p className="font-bold leading-snug">{shimpaku.tagline}</p>
            <p className="mt-1 leading-snug text-ink/70">{shimpaku.description}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {shimpaku.actions.map(({ label, href }) => (
              <ExternalLink key={label} href={href} className={`${buttonClass} bg-white px-3 py-2 text-[0.85rem] hover:bg-butter`}>
                {label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </ExternalLink>
            ))}
          </div>
        </article>
      </div>
    </HomeSection>
  )
}

// 03 — Follow my journey

const journeySocials: SocialKey[] = ['instagram', 'youtube', 'linkedin', 'x']

// The ids keep the old /#build-log and /#experts links (and the hero's "8 interviews") landing here.
const playlists = [
  {
    id: 'build-log',
    label: 'Daily build log',
    title: shipatonPlaylist.title,
    description: 'Every day of the Shipaton, in order — from the first idea to Sted going live.',
    href: shipatonPlaylist.href,
  },
  {
    id: 'experts',
    label: 'Interviews',
    title: 'Building Sted with Experts',
    description: '8 conversations with founders and builders, and what I learned from each one.',
    href: expertsPlaylist.href,
  },
]

export function ProcessSection() {
  return (
    <HomeSection id="process">
      <SectionHeader
        id="process-title"
        chapter="03"
        kicker="Build in public"
        title="Follow my journey"
        description="I share every step of building Sted: daily videos, conversations with founders and what happens behind the scenes."
      />

      <div className="grid gap-3 lg:grid-cols-[3fr_2fr]">
        <ExternalLink href={latestVideo.href} className={`${card} group flex flex-col overflow-hidden no-underline transition-colors hover:bg-butter`}>
          <span className="relative block border-b-2 border-ink">
            <img src={youtubeThumbnail(latestVideo.id, 'maxresdefault')} alt="" className="aspect-video w-full object-cover" loading="lazy" />
            <span className="absolute right-2 bottom-2 rounded-sm bg-ink px-1.5 py-0.5 text-[0.75rem] font-medium text-white tabular-nums">
              {latestVideo.duration}
            </span>
          </span>
          <span className="flex flex-1 items-center justify-between gap-4 p-5">
            <span>
              <span className={`${monoLabel} block text-[0.62rem] text-muted`}>
                Launch day · <SansDigits text={latestVideo.label} />
              </span>
              <span className="mt-1.5 block text-[1.3rem] leading-tight font-bold tracking-[-0.03em]">{latestVideo.title}</span>
            </span>
            <CirclePlay className="size-7 shrink-0 transition-transform group-hover:scale-110" strokeWidth={1.6} aria-hidden="true" />
          </span>
        </ExternalLink>

        <div className="grid gap-3">
          {playlists.map(({ id, label, title, description, href }) => (
            <div key={id} id={id} className="scroll-mt-6">
              <ExternalLink href={href} className={`${card} group flex h-full flex-col gap-3 p-5 no-underline transition-colors hover:bg-butter`}>
                <span className="flex items-center gap-3">
                  <Logo src={socials.youtube.logo ?? ''} size="size-8" />
                  <span className={`${monoLabel} text-[0.62rem] text-muted`}>YouTube playlist · {label}</span>
                </span>
                <span className="text-[1.2rem] leading-tight font-bold tracking-[-0.03em]">{title}</span>
                <span className="leading-snug text-ink/70">
                  <SansDigits text={description} />
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-bold">
                  Watch the playlist
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </ExternalLink>
            </div>
          ))}
        </div>
      </div>

      <div id="follow" className="mt-6 flex scroll-mt-6 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className={`${monoLabel} text-[0.64rem] text-muted`}>Follow along</p>
        <ul className="flex flex-wrap gap-2">
          {journeySocials.map((key) => (
            <li key={key}>
              <ExternalLink
                href={socials[key].href}
                className={`${card} flex items-center gap-2.5 px-3 py-2 font-bold tracking-[-0.01em] no-underline transition-colors hover:bg-butter`}
              >
                {socials[key].logo && <Logo src={socials[key].logo} size="size-7" />}
                {socials[key].label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  )
}

// 04 — Build yours

export function BuildYoursSection() {
  return (
    <HomeSection id="build-yours">
      <SectionHeader
        id="build-yours-title"
        chapter="04"
        kicker="Build yours"
        title="I turned everything I learned into guides you can follow"
        description="The steps, the tools and the prompts I used to go from zero to the App Store — so you can build your own app, even if you can’t code."
      />

      <div id="guides" className="scroll-mt-6">
        <SubHeader
          id="guides-title"
          step="Start here"
          title="From Zero to 100"
          description="13 free guides, in order: find a problem, validate it, build it with AI and launch it. Each ends with a 2-minute test and prompts you can copy."
          action={<GuideSeriesActions />}
        />
        <ol className="grid gap-x-8 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
          {guideTitles.map((title, index) => (
            <li key={title} className="border-b border-ink/20">
              <a href={guidePath(index + 1)} className="group flex items-center gap-3.5 py-3.5 no-underline">
                <span className="w-7 shrink-0 font-bold text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1 font-bold leading-tight tracking-[-0.02em] group-hover:underline">
                  {guides[index + 1].chip ?? title}
                </span>
                <ArrowRight className="size-4 shrink-0 opacity-30 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div id="tools" className="mt-14 scroll-mt-6">
        <SubHeader id="tools-title" step="What I use" title="Tools I use" description="The AI, design and everyday tools behind Sted and this site." />
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
          {tools.map(({ group, items }) => (
            <div key={group}>
              <p className={`${monoLabel} mb-2 text-[0.64rem] text-muted`}>{group}</p>
              <ul className="border-t-2 border-ink">
                {items.map(({ name, description, href, logo }) => (
                  <li key={name} className="border-b border-ink/20">
                    <ExternalLink href={href} className="group flex items-center gap-3 py-3 no-underline">
                      <Logo src={logo} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold tracking-[-0.02em] group-hover:underline">{name}</span>
                        <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink/65">{description}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 opacity-40 group-hover:opacity-100" aria-hidden="true" />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div id="resources" className="mt-14 scroll-mt-6">
        <SubHeader id="resources-title" step="Reading" title="Free resources" description="Docs and articles that helped me build and ship." />
        <ul className="border-t-2 border-ink">
          {resources.map(({ source, title, href, logo }) => (
            <li key={href} className="border-b border-ink/20">
              <ExternalLink href={href} className="group flex items-center gap-3.5 py-3 no-underline">
                <Logo src={logo} size="size-7" />
                <span className="min-w-0 flex-1">
                  <span className={`${monoLabel} block text-[0.58rem] text-muted`}>{source}</span>
                  <span className="block font-bold tracking-[-0.015em] group-hover:underline">
                    <SansDigits text={title} />
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-40 group-hover:opacity-100" aria-hidden="true" />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  )
}
