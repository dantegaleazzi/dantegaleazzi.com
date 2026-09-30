import { ArrowDown, ArrowRight, ArrowUpRight, CirclePlay, ListVideo, Mic, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  apps,
  expertEpisodes,
  latestVideo,
  resources,
  shipatonPlaylist,
  socials,
  tools,
  youtubeThumbnail,
  type SocialKey,
} from '../../content/site'
import { guidePath, guides, guideTitles } from '../../guides'
import { lessons } from '../../guides/lessons'
import { monoLabel } from '../../components/guide/Visuals'
import { SansDigits } from '../../components/guide/text'
import { SectionHeader, buttonClass } from '../../components/home/ui'

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

// 03 — The process

const channelOrder: SocialKey[] = ['youtube', 'shorts', 'instagram', 'tiktok', 'linkedin', 'x']

const processWays = [
  {
    href: '#build-log',
    Icon: ListVideo,
    title: 'The daily build log',
    description: 'Every step of the Shipaton on YouTube, in order.',
  },
  {
    href: '#experts',
    Icon: Mic,
    title: 'Expert interviews',
    description: '8 conversations with founders and builders.',
  },
  {
    href: '#follow',
    Icon: Smartphone,
    title: 'Short updates',
    description: 'Behind the scenes on Instagram, TikTok and more.',
  },
]

export function ProcessSection() {
  return (
    <HomeSection id="process">
      <SectionHeader
        id="process-title"
        chapter="03"
        kicker="The process"
        title="How I built it, in public"
        description="I documented the whole thing on video — the wins, the setbacks and every expert who helped. Pick where to start:"
      />

      <ol className="grid gap-3 md:grid-cols-3">
        {processWays.map(({ href, Icon, title, description }, index) => (
          <li key={href}>
            <a href={href} className={`${card} group flex h-full items-start gap-3.5 p-4 no-underline transition-colors hover:bg-butter`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-md border-2 border-ink bg-butter">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`${monoLabel} block text-[0.6rem] text-muted`}>
                  <SansDigits text={`Option ${index + 1}`} />
                </span>
                <span className="mt-0.5 block font-bold leading-tight tracking-[-0.02em]">{title}</span>
                <span className="mt-1 block text-[0.92rem] leading-snug text-ink/70">
                  <SansDigits text={description} />
                </span>
              </span>
              <ArrowDown className="mt-1 size-4 shrink-0 opacity-40 transition group-hover:translate-y-0.5 group-hover:opacity-100" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>

      <div id="build-log" className="mt-12 scroll-mt-6">
        <SubHeader
          id="build-log-title"
          step="Option 1"
          title="The daily build log"
          description="Watch the Shipaton from day one: what I built, what broke and what I decided each day."
        />
        <div className="grid gap-3 sm:grid-cols-[3fr_2fr]">
          <article className="flex flex-col gap-4 rounded-md border-2 border-ink bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Logo src={socials.youtube.logo ?? ''} size="size-9" />
              <p className={`${monoLabel} text-[0.64rem]`}>YouTube playlist</p>
            </div>
            <h4 className={subTitle}>{shipatonPlaylist.title}</h4>
            <p className="leading-snug text-ink/75">{shipatonPlaylist.description}</p>
            <ExternalLink href={shipatonPlaylist.href} className={`${buttonClass} mt-auto w-fit bg-signal hover:bg-ink hover:text-white`}>
              <CirclePlay className="size-4" aria-hidden="true" />
              Watch the playlist
            </ExternalLink>
          </article>
          <ExternalLink href={latestVideo.href} className={`${card} group flex flex-col overflow-hidden no-underline transition-colors hover:bg-butter`}>
            <span className="relative block border-b-2 border-ink">
              <img src={youtubeThumbnail(latestVideo.id)} alt="" className="aspect-video w-full object-cover" loading="lazy" />
              <span className="absolute right-2 bottom-2 rounded-sm bg-ink px-1.5 py-0.5 text-[0.75rem] font-medium text-white tabular-nums">
                {latestVideo.duration}
              </span>
            </span>
            <span className="flex flex-1 flex-col gap-1.5 p-4">
              <span className={`${monoLabel} text-[0.62rem] text-muted`}>
                Latest · <SansDigits text={latestVideo.label} />
              </span>
              <span className="font-bold leading-snug tracking-[-0.02em]">{latestVideo.title}</span>
            </span>
          </ExternalLink>
        </div>
      </div>

      <div id="experts" className="mt-12 scroll-mt-6">
        <SubHeader
          id="experts-title"
          step="Option 2"
          title="Building Sted with Experts"
          description="Founders and builders I talked to during the Shipaton — and what I learned from each one."
          action={
            <ExternalLink href={shipatonPlaylist.href} className={`${buttonClass} bg-white hover:bg-butter`}>
              <CirclePlay className="size-4" aria-hidden="true" />
              Watch them all
            </ExternalLink>
          }
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expertEpisodes.map(({ number, id, title, duration, href }) => (
            <li key={number}>
              <ExternalLink href={href} className={`${card} group flex h-full flex-col overflow-hidden no-underline transition-colors hover:bg-butter`}>
                <span className="relative block border-b-2 border-ink">
                  <img src={youtubeThumbnail(id)} alt="" className="aspect-video w-full object-cover" loading="lazy" />
                  <span className="absolute right-2 bottom-2 rounded-sm bg-ink px-1.5 py-0.5 text-[0.75rem] font-medium text-white tabular-nums">
                    {duration}
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-1.5 p-4">
                  <span className={`${monoLabel} text-[0.62rem] text-muted`}>
                    Episode <span className="font-sans tabular-nums">{number}</span>
                  </span>
                  <span className="font-bold leading-snug tracking-[-0.02em]">{title}</span>
                </span>
              </ExternalLink>
            </li>
          ))}
        </ol>
      </div>

      <div id="follow" className="mt-12 scroll-mt-6">
        <SubHeader id="follow-title" step="Option 3" title="Short updates" description="Quick clips and behind the scenes, wherever you watch." />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {channelOrder.map((key) => (
            <li key={key}>
              <ExternalLink
                href={socials[key].href}
                className={`${card} flex items-center gap-2.5 px-3 py-2.5 font-bold tracking-[-0.01em] no-underline transition-colors hover:bg-butter`}
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
        description="The steps, the lessons, the tools and the prompts I used to go from zero to the App Store — so you can build your own app, even if you can’t code."
      />

      <div id="guides" className="scroll-mt-6">
        <SubHeader
          id="guides-title"
          step="Start here"
          title="From Zero to 100"
          description="13 free guides, in order: find a problem, validate it, build it with AI and launch it. Each ends with a 2-minute test and prompts you can copy."
          action={
            <a href={guidePath(1)} className={`${buttonClass} group bg-signal hover:bg-ink hover:text-white`}>
              Start with part 1
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          }
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

      <div id="lessons" className="mt-14 scroll-mt-6">
        <SubHeader
          id="lessons-title"
          step="Then"
          title="Lessons from the build"
          description="What building Sted and Shimpaku taught me — the mistakes, the store rules and how I work with AI."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {lessons.map(({ path, title, description }, index) => (
            <a key={path} href={path} className={`${card} group flex flex-col gap-3 p-5 no-underline transition-colors hover:bg-butter`}>
              <span className="flex items-center justify-between">
                <span className={`${monoLabel} rounded-sm bg-ink px-2 py-1 text-[0.6rem] text-signal`}>
                  Lesson <span className="font-sans">{index + 1}</span>
                </span>
                <ArrowRight className="size-4 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span className="text-[1.3rem] leading-[1.15] font-bold tracking-[-0.03em]">
                <SansDigits text={title} />
              </span>
              <span className="leading-snug text-ink/70">{description}</span>
            </a>
          ))}
        </div>
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
