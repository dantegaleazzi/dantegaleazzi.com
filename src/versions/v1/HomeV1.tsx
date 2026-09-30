// Temporary: the previous home iteration, mounted at /version-1 for side-by-side comparison. Remove before shipping.
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Check,
  CirclePlay,
  Clock3,
  ListVideo,
  Smartphone,
} from 'lucide-react'
import type { ReactNode } from 'react'
import {
  apps,
  expertEpisodes,
  latestVideo,
  links,
  resources,
  shipatonPlaylist,
  socials,
  tools,
  type SocialKey,
} from '../../content/site'
import { guideIndexPath, guidePath, guides, guideTitles } from '../../guides'
import { monoLabel } from '../../components/guide/Visuals'
import { SansDigits } from '../../components/guide/text'
import { NewsletterSoon } from '../../components/home/HomeSections'
import { MaybeLink, SectionHeader } from '../../components/home/ui'
import { socialIcons } from '../../components/home/socialIcons'

const buttonClass =
  'inline-flex items-center gap-2 rounded-md border-2 border-ink px-4 py-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] no-underline transition-colors'
const card = 'rounded-md border-2 border-ink bg-white'
const comingSoon = `${monoLabel} rounded-sm border-2 border-dashed border-ink px-2 py-1 text-[0.6rem]`

const heroSocials: SocialKey[] = ['youtube', 'instagram', 'tiktok', 'linkedin', 'x', 'github']
const perks = ['13 free guides, from zero to launch', '7 conversations with founders and experts', 'Every prompt, tool and mistake']

function HeroV1() {
  return (
    <div className="hero-panel">
      <div className="desktop-window-bar" aria-hidden="true">
        <div className="desktop-window-controls">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <div className="text-[0.62rem] font-mono uppercase tracking-widest opacity-40">SHIPATON_2026.DOC</div>
        <div className="w-12" />
      </div>

      <div className="flex flex-col gap-10 px-6 py-10 lg:flex-row lg:gap-0 lg:px-[75px] lg:py-12">
        <div className="flex flex-col gap-5 lg:w-72 lg:shrink-0">
          <img
            src="/dante-profile.png"
            alt="Dante Galeazzi"
            className="size-24 shrink-0 rounded-full border-2 border-ink object-cover object-top"
            width={96}
            height={96}
          />
          <div className="space-y-5 text-[0.95rem] leading-relaxed text-ink/75">
            <p className="font-mono text-[0.78rem] font-medium tracking-[0.08em] text-ink uppercase">
              Build log / Shipaton <span className="font-sans">2026</span>
            </p>
            <p className="text-2xl font-bold leading-tight tracking-[-0.04em] text-ink">Hi, I’m Dante.</p>
            <p>
              I entered{' '}
              <a href={links.shipaton} target="_blank" rel="noreferrer" className="pixel-underline relative z-0 font-medium text-ink no-underline">
                RevenueCat’s Shipaton
              </a>{' '}
              2026 without knowing how to code, to see if I could build and ship a mobile app.
            </p>
            <p>
              <span className="font-medium text-ink">Sted</span> is now live on the App Store.
            </p>
            <p>I’m building the whole thing in public.</p>
          </div>
          <MaybeLink
            href={links.storyVideo}
            className="flex w-fit items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink no-underline transition-colors hover:border-signal"
          >
            Watch my story →
          </MaybeLink>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {heroSocials.map((key) => {
              const Icon = socialIcons[key]
              return (
                <MaybeLink
                  key={key}
                  href={socials[key].href}
                  className="-mx-2 flex items-center gap-2 px-2 py-1 text-[0.85rem] text-ink/65 no-underline transition-colors hover:bg-signal hover:text-ink"
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  {socials[key].label}
                </MaybeLink>
              )
            })}
          </div>
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-center">
          <div className="flex flex-col lg:max-w-[640px]">
            <p className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-ink/60">
              Shipaton <span className="font-sans">2026</span> / Sted is live on the App Store
            </p>
            <h1 className="hero-title text-[clamp(2.8rem,7vw,5rem)] leading-[0.9] font-bold tracking-[-0.05em]" id="hero-title">
              <span className="block w-fit">Building an App</span>
              <span className="pixel-underline relative z-0 mt-[0.08em] block w-fit">100% With AI</span>
            </h1>
            <p className="mt-6 max-w-150 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-normal text-ink/75">
              I built Sted from idea to App Store with AI, without knowing how to code. Now I’m sharing everything I
              learned so you can build your own.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <a href={guideIndexPath} className={`${buttonClass} group bg-signal px-5 py-3.5 hover:bg-ink hover:text-white`}>
                Start the free guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href="#videos" className={`${buttonClass} bg-white px-5 py-3.5 hover:bg-butter`}>
                <CirclePlay className="size-4" aria-hidden="true" />
                Watch the build
              </a>
            </div>
            <ul className="mt-6 grid gap-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-[0.92rem] text-ink/80">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal">
                    <Check className="size-3 text-ink" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 py-10 lg:py-14" aria-labelledby={`${id}-title`}>
      {children}
    </section>
  )
}

const channelOrder: SocialKey[] = ['youtube', 'shorts', 'instagram', 'tiktok', 'linkedin', 'x']

export function HomeV1() {
  return (
    <>
      <div className="mt-3 mb-2 rounded-md border-2 border-dashed border-ink bg-butter px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
        Version 1 — previous home, for comparison only
      </div>
      <section className="hero-section" aria-labelledby="hero-title">
        <HeroV1 />
      </section>

      <Section id="guides">
        <SectionHeader
          id="guides-title"
          kicker="How to build an app business from scratch"
          title="From Zero to 100"
          description="13 free guides based on building Sted: find a problem, validate it, build it with AI and launch it. Each one ends with a 2-minute test and prompts you can copy."
          action={
            <a href={guidePath(1)} className={`${buttonClass} group bg-signal hover:bg-ink hover:text-white`}>
              Start with part 1
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          }
        />
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {guideTitles.map((title, index) => (
            <li key={title}>
              <a
                href={guidePath(index + 1)}
                className={`${card} group flex h-full items-center gap-3.5 px-3.5 py-3 no-underline transition-colors hover:bg-butter`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-ink font-sans text-[0.85rem] font-bold text-signal tabular-nums">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 leading-tight font-bold tracking-[-0.02em]">{guides[index + 1].chip ?? title}</span>
                <ArrowRight className="size-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
        <a href={guideIndexPath} className={`${monoLabel} mt-5 inline-block text-muted hover:text-ink`}>
          See all guides →
        </a>
      </Section>

      <Section id="lessons">
        <SectionHeader
          id="lessons-title"
          kicker="Lessons"
          title="What I Learned Building 2 Apps in 6 Weeks"
          description="Everything I learned building Sted and Shimpaku with AI — written down so you don’t have to learn it the hard way."
        />
        <div className="grid gap-3 lg:grid-cols-[3fr_2fr]">
          {[
            {
              Icon: BookOpenText,
              title: 'What I Learned Building 2 Apps in 6 Weeks',
              description: 'The mistakes I’d avoid, what I’d do differently, and the tips and prompts that actually helped.',
              tags: ['Mistakes', 'Tips', 'Prompts'],
            },
            {
              Icon: AppWindow,
              title: 'How I Build My Websites',
              description: 'A mini guide to how I design and ship sites like this one with AI.',
              tags: ['Design', 'AI', 'Deploy'],
            },
          ].map(({ Icon, title, description, tags }) => (
            <article key={title} className={`${card} flex flex-col gap-5 p-6`}>
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-md border-2 border-ink bg-butter">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={comingSoon}>Coming soon</span>
              </div>
              <div>
                <h3 className="text-[1.45rem] leading-[1.1] font-bold tracking-[-0.035em]">
                  <SansDigits text={title} />
                </h3>
                <p className="mt-2 leading-snug text-ink/70">{description}</p>
              </div>
              <ul className="mt-auto flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <li key={tag} className={`${monoLabel} rounded-sm bg-paper px-2 py-1 text-[0.6rem]`}>
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="experts">
        <SectionHeader
          id="experts-title"
          kicker="Interviews"
          title="Building Sted with Experts"
          description="Conversations with founders and builders during the Shipaton — what I asked, what I learned and what I changed in Sted."
          action={
            <MaybeLink href={socials.youtube.href} className={`${buttonClass} bg-white hover:bg-butter`}>
              <CirclePlay className="size-4" aria-hidden="true" />
              All episodes
            </MaybeLink>
          }
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expertEpisodes.map(({ number, title, duration, href }) => (
            <li key={number} className={`${card} flex flex-col gap-4 p-4`}>
              <div className="flex items-center justify-between">
                <span className={`${monoLabel} rounded-sm bg-ink px-2 py-1 text-[0.64rem] text-signal`}>
                  Ep <span className="font-sans tabular-nums">{String(number).padStart(2, '0')}</span>
                </span>
                <span className="flex items-center gap-1 text-[0.8rem] text-muted tabular-nums">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {duration}
                </span>
              </div>
              <h3 className="text-[1.08rem] leading-[1.2] font-bold tracking-[-0.02em]">{title}</h3>
              <MaybeLink href={href} className={`${monoLabel} mt-auto flex items-center gap-1.5 text-[0.66rem] text-ink no-underline hover:underline`}>
                <CirclePlay className="size-3.5" aria-hidden="true" />
                Watch
              </MaybeLink>
            </li>
          ))}
          <li className="flex flex-col justify-center gap-2 rounded-md border-2 border-dashed border-ink p-4">
            <p className={`${monoLabel} text-muted`}>Next</p>
            <p className="text-[1.08rem] leading-[1.2] font-bold tracking-[-0.02em]">More episodes on the way</p>
          </li>
        </ol>
      </Section>

      <Section id="videos">
        <SectionHeader
          id="videos-title"
          kicker="Videos"
          title="Build in Public"
          description="Every step of building Sted, from day 1 to launch. Follow along wherever you watch."
        />
        <div className="grid gap-3 lg:grid-cols-[2fr_3fr]">
          <ul className="grid grid-cols-2 gap-2 self-start">
            {channelOrder.map((key) => {
              const Icon = socialIcons[key]
              return (
                <li key={key}>
                  <MaybeLink
                    href={socials[key].href}
                    className={`${card} flex items-center gap-2.5 px-3.5 py-3 font-bold tracking-[-0.01em] no-underline transition-colors hover:bg-butter`}
                  >
                    <Icon className="size-4.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    {socials[key].label}
                  </MaybeLink>
                </li>
              )
            })}
          </ul>
          <div className="grid gap-3 sm:grid-cols-[3fr_2fr]">
            <article className="flex flex-col gap-4 rounded-md border-2 border-ink bg-signal p-5">
              <p className={`${monoLabel} flex items-center gap-2 text-[0.64rem]`}>
                <ListVideo className="size-4" strokeWidth={1.8} aria-hidden="true" />
                YouTube playlist
              </p>
              <h3 className="text-[1.45rem] leading-[1.1] font-bold tracking-[-0.035em]">{shipatonPlaylist.title}</h3>
              <p className="leading-snug">{shipatonPlaylist.description}</p>
              <a href={shipatonPlaylist.href} target="_blank" rel="noreferrer" className={`${buttonClass} mt-auto w-fit bg-white hover:bg-ink hover:text-white`}>
                <CirclePlay className="size-4" aria-hidden="true" />
                Watch the playlist
              </a>
            </article>
            <article className={`${card} flex flex-col gap-4 p-5`}>
              <div className="flex items-center justify-between">
                <span className={`${monoLabel} rounded-sm bg-butter px-2 py-1 text-[0.64rem]`}>
                  Latest · <SansDigits text={latestVideo.label} />
                </span>
                <span className="text-[0.8rem] text-muted tabular-nums">{latestVideo.duration}</span>
              </div>
              <h3 className="text-[1.2rem] leading-[1.15] font-bold tracking-[-0.03em]">{latestVideo.title}</h3>
              <a href={latestVideo.href} target="_blank" rel="noreferrer" className={`${buttonClass} mt-auto w-full justify-center bg-white hover:bg-butter`}>
                <CirclePlay className="size-4" aria-hidden="true" />
                Watch
              </a>
            </article>
          </div>
        </div>
      </Section>

      <Section id="apps">
        <SectionHeader id="apps-title" kicker="Try them" title="My Apps" description="The two apps I built in 6 weeks with AI." />
        <div className="grid gap-3 md:grid-cols-2">
          {apps.map(({ name, status, description, actions, handle, socials: appSocials }, index) => (
            <article key={name} className={`${card} flex flex-col gap-5 p-6`}>
              <div className="flex items-start justify-between gap-4">
                <span className={`grid size-12 place-items-center rounded-xl border-2 border-ink ${index === 0 ? 'bg-signal' : 'bg-lilac'}`}>
                  <Smartphone className="size-5.5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={`${monoLabel} rounded-sm bg-paper px-2 py-1 text-[0.6rem] text-ink/70`}>{status}</span>
              </div>
              <div>
                <h3 className="text-[1.8rem] leading-none font-bold tracking-[-0.045em]">{name}</h3>
                <p className="mt-2 leading-snug text-ink/70">{description}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {actions.map(({ label, href }, actionIndex) => (
                  <MaybeLink
                    key={label}
                    href={href}
                    className={`${buttonClass} ${actionIndex === 0 ? 'bg-butter hover:bg-signal' : 'bg-white hover:bg-butter'}`}
                  >
                    {label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </MaybeLink>
                ))}
              </div>
              {appSocials.length > 0 && (
                <p className={`${monoLabel} flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.64rem] text-muted`}>
                  <span>{handle} on</span>
                  {appSocials.map(({ label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noreferrer" className="text-ink underline-offset-4 hover:underline">
                      {label}
                    </a>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section id="tools">
        <SectionHeader id="tools-title" kicker="Stack" title="Tools I Use" description="The AI, design and everyday tools behind Sted and this site." />
        <div className="grid gap-3 md:grid-cols-3">
          {tools.map(({ group, items }) => (
            <div key={group} className={`${card} overflow-hidden`}>
              <p className={`${monoLabel} border-b-2 border-ink bg-chrome px-4 py-2.5`}>{group}</p>
              <ul className="divide-y divide-ink/15">
                {items.map(({ name, description, href }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" className="group flex items-start gap-3 px-4 py-3.5 no-underline transition-colors hover:bg-butter">
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold tracking-[-0.02em]">{name}</span>
                        <span className="mt-0.5 block text-[0.9rem] leading-snug text-ink/65">{description}</span>
                      </span>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="resources">
        <SectionHeader id="resources-title" kicker="Reading" title="Free Resources" description="Docs and articles that helped me build and ship Sted." />
        <ul className={`${card} divide-y divide-ink/15`}>
          {resources.map(({ source, title, href }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 px-4 py-3.5 no-underline transition-colors hover:bg-butter sm:px-5">
                <span className={`${monoLabel} w-24 shrink-0 text-[0.62rem] text-muted`}>{source}</span>
                <span className="min-w-0 flex-1 font-bold tracking-[-0.015em]">
                  <SansDigits text={title} />
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
              </a>
            </li>
          ))}
          <li className="flex items-center gap-4 px-4 py-3.5 text-muted sm:px-5">
            <span className={`${monoLabel} w-24 shrink-0 text-[0.62rem]`}>Next</span>
            <span className="flex-1">More resources coming soon.</span>
          </li>
        </ul>
      </Section>

      <NewsletterSoon />
    </>
  )
}
