import { ArrowRight, ArrowUpRight, BellRing, CirclePlay, Play } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import {
  apps,
  biggestLesson,
  expertEpisodes,
  feedbackLoops,
  links,
  reelCover,
  reelDays,
  reelHref,
  reelViewsDate,
  reels,
  resources,
  shipatonPlaylist,
  socials,
  story,
  tools,
  youtubeThumbnail,
  type StoryBeat,
  type StoryThumb,
} from '../../content/site'
import { guidePath, guides, guideTitles } from '../../guides'
import { lessons } from '../../guides/lessons'
import { subscribeToNewsletter } from '../../lib/subscribe'
import { monoLabel } from '../guide/Visuals'
import { SansDigits } from '../guide/text'
import { SectionHeader, buttonClass } from './ui'

const card = 'rounded-md border-2 border-ink bg-white'
const subTitle = 'text-[1.5rem] leading-[1.1] font-bold tracking-[-0.035em]'
const formatViews = (views: number) => views.toLocaleString('en-US')

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

// Same look as the day tags on the reel covers: yellow on white cards, white on yellow ones.
function DayTag({ text, onYellow = false }: { text: string; onYellow?: boolean }) {
  return (
    <span
      className={`${monoLabel} inline-block w-fit shrink-0 rounded-[3px] px-1.5 py-0.5 text-[0.6rem] font-bold whitespace-nowrap text-ink ${
        onYellow ? 'border border-ink bg-white' : 'bg-signal'
      }`}
    >
      <SansDigits text={text} />
    </span>
  )
}

// 01 — The story

const thumbFrame = 'relative block aspect-[3/4] w-20 shrink-0 self-start overflow-hidden rounded-[5px] border-2 border-ink sm:w-24'

const typeThumbs: Record<StoryThumb, { className: string; content: ReactNode }> = {
  start: {
    className: 'bg-signal',
    content: (
      <>
        <span className={`${monoLabel} text-[0.55rem]`}>Day</span>
        <span className="text-[2.4rem] leading-none font-bold tracking-[-0.05em]">01</span>
      </>
    ),
  },
  guides: {
    className: 'bg-white',
    content: (
      <>
        <span className="text-[1.35rem] leading-none font-bold tracking-[-0.05em]">0→100</span>
        <span className={`${monoLabel} mt-1.5 text-[0.5rem]`}>
          <SansDigits text="13 guides" />
        </span>
      </>
    ),
  },
  sted: {
    className: 'bg-white',
    content: <img src={apps[0].icon} alt="" width={64} height={64} className="w-[78%] rounded-[0.7rem] border-2 border-ink" />,
  },
  paid: {
    className: 'bg-ink text-signal',
    content: (
      <>
        <span className="text-[2.6rem] leading-none font-bold">$</span>
        <span className={`${monoLabel} mt-1 text-[0.5rem] text-white`}>Paid</span>
      </>
    ),
  },
  subscribers: {
    className: 'bg-signal',
    content: (
      <>
        <span className="text-[1.9rem] leading-none font-bold tracking-[-0.05em]">1st</span>
        <span className={`${monoLabel} mt-1 text-center text-[0.48rem] leading-tight`}>
          Yearly
          <br />+ monthly
        </span>
      </>
    ),
  },
}

function BeatThumb({ beat }: { beat: StoryBeat }) {
  if (beat.reel) {
    return (
      <a
        href={reelHref(beat.reel)}
        target="_blank"
        rel="noreferrer"
        className={`${thumbFrame} group`}
        aria-label={`Watch the Day ${beat.reel} reel on Instagram`}
      >
        <img
          src={reelCover(beat.reel)}
          alt=""
          width={96}
          height={128}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-1 bottom-1 grid size-6 place-items-center rounded-full border border-white/40 bg-ink/80 text-white">
          <Play className="size-3 fill-current" aria-hidden="true" />
        </span>
      </a>
    )
  }
  const thumb = typeThumbs[beat.thumb ?? 'start']
  return (
    <span className={`${thumbFrame} flex flex-col items-center justify-center ${thumb.className}`} aria-hidden="true">
      {thumb.content}
    </span>
  )
}

function StoryBeatCard({ beat, wide }: { beat: StoryBeat; wide: boolean }) {
  const reel = beat.reel ? reels[beat.reel] : null
  const internal = beat.link?.href.startsWith('#')
  return (
    <li
      className={`flex gap-4 rounded-md border-2 border-ink p-3 ${beat.highlight ? 'bg-butter' : 'bg-white'} ${wide ? 'md:col-span-2' : ''}`}
    >
      <BeatThumb beat={beat} />
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <DayTag text={beat.tag} onYellow={beat.highlight} />
        <h4 className="mt-2 text-[1.15rem] leading-[1.15] font-bold tracking-[-0.03em]">{beat.title}</h4>
        <p className="mt-1 text-[0.95rem] leading-snug text-ink/70">{beat.text}</p>
        {beat.update && (
          <p className="mt-2 w-fit rounded-[3px] border border-dashed border-ink px-2 py-1 text-[0.85rem] leading-snug font-medium">
            {beat.update}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-[0.85rem]">
          {beat.reel && reel && (
            <ExternalLink href={reelHref(beat.reel)} className="inline-flex items-center gap-1.5 font-bold no-underline hover:underline">
              <img src={socials.instagram.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
              {formatViews(reel.views)} views
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ExternalLink>
          )}
          {beat.link && (
            <a
              href={beat.link.href}
              target={internal ? undefined : '_blank'}
              rel={internal ? undefined : 'noreferrer'}
              className="group inline-flex items-center gap-1 font-bold no-underline hover:underline"
            >
              {beat.link.label}
              {internal ? (
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              ) : (
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              )}
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

function FinalVideo() {
  if (links.finalVideo) {
    return (
      <ExternalLink
        href={links.finalVideo}
        className="mt-3 flex flex-col items-center gap-3 rounded-md border-2 border-ink bg-signal px-6 py-10 text-center no-underline transition-colors hover:bg-ink hover:text-white"
      >
        <CirclePlay className="size-9" strokeWidth={1.6} aria-hidden="true" />
        <span className="text-[1.6rem] leading-none font-bold tracking-[-0.04em]">Watch the final video</span>
      </ExternalLink>
    )
  }
  return (
    <div className="mt-3 flex flex-col items-center justify-center gap-2.5 rounded-md border-2 border-dashed border-ink bg-white/60 px-6 py-10 text-center">
      <DayTag text="The end" />
      <p className="text-[1.6rem] leading-none font-bold tracking-[-0.04em]">The final video</p>
      <p className="max-w-md leading-snug text-ink/70">The last episode of the Shipaton series lands here. Coming soon.</p>
    </div>
  )
}

function AppsNow() {
  const [sted, shimpaku] = apps
  return (
    <div id="sted" className="mt-14 scroll-mt-6">
      <SubHeader id="sted-title" step="Where it is now" title="Try what I built" description="Both apps are live. Sted is the one I entered in the Shipaton." />
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
          <p className={`${monoLabel} text-[0.62rem] text-muted`}>Built while waiting on Apple</p>
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
    </div>
  )
}

export function StorySection() {
  return (
    <HomeSection id="story">
      <SectionHeader
        id="story-title"
        chapter="01"
        kicker="The story"
        title="From a notebook drawing to paying subscribers"
        description="Six weeks in three acts, posted as it happened. Tap any cover to watch the reel."
      />

      <div className="grid gap-12">
        {story.map(({ act, days, title, summary, beats }) => (
          <div key={act}>
            <div className="mb-4 grid gap-1 border-t-2 border-ink pt-4 md:grid-cols-[15rem_1fr] md:gap-8">
              <div>
                <p className={`${monoLabel} text-[0.64rem] text-muted`}>
                  <SansDigits text={`${act} · ${days}`} />
                </p>
                <h3 className="mt-1 text-[1.9rem] leading-none font-bold tracking-[-0.045em]">{title}</h3>
              </div>
              <p className="max-w-xl text-[1.05rem] leading-[1.5] text-ink/75 md:pt-5">{summary}</p>
            </div>
            <ol className="grid gap-3 md:grid-cols-2">
              {beats.map((beat, index) => (
                <StoryBeatCard key={beat.title} beat={beat} wide={index === beats.length - 1 && beats.length % 2 === 1} />
              ))}
            </ol>
          </div>
        ))}
      </div>

      <FinalVideo />
      <AppsNow />
    </HomeSection>
  )
}

// 02 — Building in public

const topReels = [...reelDays].sort((a, b) => reels[b].views - reels[a].views).slice(0, 6)

const channels = [
  {
    logo: socials.instagram.logo ?? '',
    name: 'Instagram',
    role: 'Daily reels',
    note: 'Where most people watched, commented and followed along.',
    href: socials.instagram.href,
  },
  {
    logo: socials.youtube.logo ?? '',
    name: 'YouTube',
    role: 'Long-form interviews',
    note: 'Fewer views, more depth: the full expert conversations.',
    href: shipatonPlaylist.href,
  },
]

export function InPublicSection() {
  const maxViews = reels[topReels[0]].views
  return (
    <HomeSection id="in-public">
      <SectionHeader
        id="in-public-title"
        chapter="02"
        kicker="Building in public"
        title="What sharing it changed"
        description="Where people watched, what they told me — and what changed in the app because of it."
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <div>
          <h3 id="watched-title" className={subTitle}>
            Instagram is where it landed
          </h3>
          <p className="mt-2 leading-[1.5] text-ink/70">
            I posted a reel almost every day. Short, honest milestones got the most views and comments; YouTube is where
            the full interviews live.
          </p>
          <ul className="mt-5 grid gap-2">
            {channels.map(({ logo, name, role, note, href }) => (
              <li key={name}>
                <ExternalLink href={href} className={`${card} group flex items-center gap-3 px-3.5 py-3 no-underline transition-colors hover:bg-butter`}>
                  <Logo src={logo} size="size-9" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold tracking-[-0.02em]">
                      {name} <span className="font-medium text-muted">· {role}</span>
                    </span>
                    <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink/65">{note}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 opacity-40 group-hover:opacity-100" aria-hidden="true" />
                </ExternalLink>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-md border-2 border-ink bg-butter px-4 py-3.5 leading-snug">
            <span className="font-bold">Milestones beat tips.</span> The 24-hour build, the approval and the launch got up to{' '}
            <span className="font-bold">4×</span> the views of my advice videos.
          </p>
        </div>

        <div>
          <p className={`${monoLabel} mb-2 text-[0.64rem] text-muted`}>Most-watched reels</p>
          <ol className="border-t-2 border-ink">
            {topReels.map((day) => (
              <li key={day} className="border-b border-ink/20">
                <ExternalLink href={reelHref(day)} className="group flex items-center gap-3.5 py-2.5 no-underline">
                  <img
                    src={reelCover(day)}
                    alt=""
                    width={42}
                    height={56}
                    loading="lazy"
                    className="aspect-[3/4] w-10.5 shrink-0 rounded-[4px] border-2 border-ink object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <DayTag text={`Day ${day}`} />
                      <span className="min-w-0 truncate font-bold tracking-[-0.015em] group-hover:underline">{reels[day].title}</span>
                    </span>
                    <span className="mt-2 block h-2.5 overflow-hidden rounded-full bg-ink/8">
                      <span className="block h-full rounded-full bg-signal" style={{ width: `${(reels[day].views / maxViews) * 100}%` }} />
                    </span>
                  </span>
                  <span className="w-14 shrink-0 text-right text-[1.05rem] font-bold tabular-nums">{formatViews(reels[day].views)}</span>
                </ExternalLink>
              </li>
            ))}
          </ol>
          <p className={`${monoLabel} mt-2 text-[0.58rem] text-muted`}>
            <SansDigits text={`Instagram views · ${reelViewsDate}`} />
          </p>
        </div>
      </div>

      <div id="feedback" className="mt-14 scroll-mt-6">
        <SubHeader
          id="feedback-title"
          title="Feedback that changed the app"
          description="What people told me in public, and what I changed because of it."
        />
        <ol className="grid gap-3 md:grid-cols-3">
          {feedbackLoops.map(({ tag, title, steps, reel, link, episode }) => {
            const interview = expertEpisodes.find(({ number }) => number === episode)
            return (
            <li key={tag} className={`${card} flex flex-col p-5`}>
              <p className={`${monoLabel} text-[0.6rem] text-muted`}>
                <SansDigits text={tag} />
              </p>
              <h4 className="mt-2 text-[1.2rem] leading-[1.15] font-bold tracking-[-0.03em]">{title}</h4>
              <ol className="mt-4 grid gap-2 border-l-2 border-ink/15 pl-3.5">
                {steps.map(([label, text], index) => (
                  <li key={label}>
                    <span className={`${monoLabel} block text-[0.56rem] ${index === steps.length - 1 ? 'text-ink' : 'text-muted'}`}>{label}</span>
                    <span className={`block leading-snug ${index === steps.length - 1 ? 'font-bold' : 'text-ink/75'}`}>{text}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex flex-col gap-2 pt-5">
                {interview && (
                  <ExternalLink href={interview.href} className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold no-underline hover:underline">
                    <img src={socials.youtube.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
                    Watch the interview (Ep. <span className="font-sans">{interview.number}</span>)
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                )}
                {reel ? (
                  <ExternalLink href={reelHref(reel)} className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold no-underline hover:underline">
                    <img src={socials.instagram.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
                    Watch the Day <span className="font-sans">{reel}</span> reel
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                ) : (
                  link && (
                    <a href={link.href} className="group inline-flex items-center gap-1 text-[0.9rem] font-bold no-underline hover:underline">
                      {link.label}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  )
                )}
              </div>
            </li>
            )
          })}
        </ol>
      </div>

      <div id="interviews" className="mt-14 scroll-mt-6">
        <SubHeader
          id="interviews-title"
          title="Building Sted With Experts"
          description="The founders and builders I asked for advice during the Shipaton — the full conversations."
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
              <ExternalLink
                href={href}
                className={`${card} group flex h-full overflow-hidden no-underline transition-colors hover:bg-butter sm:flex-col`}
              >
                {/* Phones get a compact row (thumbnail beside the title) so seven episodes don't become a long scroll. */}
                <span className="relative block w-36 shrink-0 border-r-2 border-ink sm:w-auto sm:border-r-0 sm:border-b-2">
                  <img src={youtubeThumbnail(id)} alt="" className="aspect-video h-full w-full object-cover sm:h-auto" loading="lazy" />
                  <span className="absolute right-1.5 bottom-1.5 rounded-sm bg-ink px-1.5 py-0.5 text-[0.68rem] font-medium text-white tabular-nums sm:right-2 sm:bottom-2 sm:text-[0.75rem]">
                    {duration}
                  </span>
                </span>
                <span className="flex flex-1 flex-col justify-center gap-1 p-3 sm:justify-start sm:gap-1.5 sm:p-4">
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

      <figure className="mt-14 rounded-lg border-2 border-ink bg-signal p-6 sm:p-9">
        <p className={monoLabel}>My biggest lesson</p>
        <blockquote className="mt-3 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-bold tracking-[-0.05em]">
          “{biggestLesson.quote}”
        </blockquote>
        <figcaption className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-[1.05rem] leading-[1.5]">{biggestLesson.text}</p>
          <ExternalLink href={biggestLesson.href} className={`${buttonClass} w-fit shrink-0 bg-white hover:bg-ink hover:text-white`}>
            Read the post
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ExternalLink>
        </figcaption>
      </figure>
    </HomeSection>
  )
}

// 03 — Build yours

export function BuildYoursSection() {
  return (
    <HomeSection id="build-yours">
      <SectionHeader
        id="build-yours-title"
        chapter="03"
        kicker="Build yours"
        title="Everything I learned, free"
        description="The whole journey, turned into steps you can follow — even if you can’t code."
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

      <div id="toolbox" className="mt-14 scroll-mt-6">
        <SubHeader
          id="toolbox-title"
          step="Toolbox"
          title="What I used"
          description="The tools behind Sted and this site, and the reading that helped me ship."
        />
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ group, items }, index) => (
            <div key={group} id={index === 0 ? 'tools' : undefined} className="scroll-mt-6">
              <p className={`${monoLabel} mb-2 text-[0.64rem] text-muted`}>{group}</p>
              <ul className="border-t-2 border-ink">
                {items.map(({ name, description, href, logo }) => (
                  <li key={name} className="border-b border-ink/20">
                    <ExternalLink href={href} className="group flex items-center gap-3 py-2.5 no-underline">
                      <Logo src={logo} size="size-7" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold tracking-[-0.02em] group-hover:underline">{name}</span>
                        <span className="mt-0.5 block text-[0.84rem] leading-snug text-ink/65">{description}</span>
                      </span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div id="resources" className="scroll-mt-6">
            <p className={`${monoLabel} mb-2 text-[0.64rem] text-muted`}>Reading</p>
            <ul className="border-t-2 border-ink">
              {resources.map(({ source, title, href, logo }) => (
                <li key={href} className="border-b border-ink/20">
                  <ExternalLink href={href} className="group flex items-center gap-3 py-2.5 no-underline">
                    <Logo src={logo} size="size-7" />
                    <span className="min-w-0 flex-1">
                      <span className={`${monoLabel} block text-[0.56rem] text-muted`}>{source}</span>
                      <span className="block text-[0.92rem] leading-snug font-bold tracking-[-0.015em] group-hover:underline">
                        <SansDigits text={title} />
                      </span>
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </HomeSection>
  )
}

export function NewsletterSoon() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'already'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setStatus('sending')
    const email = new FormData(event.currentTarget).get('notify-email')
    try {
      const result = await subscribeToNewsletter(String(email ?? ''))
      setStatus(result.alreadySubscribed ? 'already' : 'done')
    } catch (submissionError) {
      setStatus('idle')
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="scroll-mt-6 py-10 lg:py-14" aria-labelledby="newsletter-title">
      <div className="grid gap-6 rounded-lg border-2 border-ink bg-signal p-6 sm:p-9 lg:grid-cols-[3fr_2fr] lg:items-end">
        <div>
          <p className={`${monoLabel} flex items-center gap-2`}>
            <BellRing className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Newsletter · Coming soon
          </p>
          <h2 id="newsletter-title" className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] leading-[1] font-bold tracking-[-0.05em]">
            <SansDigits text="From Zero to 100 Newsletter" />
          </h2>
          <p className="mt-3 max-w-xl text-[1.05rem] leading-[1.5]">
            Lessons, prompts and build notes from the next apps. It isn’t live yet — leave your email and I’ll tell you
            when the first issue is out.
          </p>
        </div>
        <div>
          {status === 'done' || status === 'already' ? (
            <p className="rounded-md border-2 border-ink bg-white px-4 py-3.5 font-bold" role="status">
              {status === 'already' ? 'You’re already on the list.' : 'You’re on the list. I’ll let you know.'}
            </p>
          ) : (
            <form className="grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-0" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="notify-email">
                Email address
              </label>
              <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <input
                id="notify-email"
                name="notify-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="h-12 min-w-0 rounded-md border-2 border-ink bg-white px-4 outline-none focus:shadow-[inset_0_0_0_3px_#1e1e1e] sm:rounded-r-none sm:border-r-0"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-12 cursor-pointer rounded-md border-2 border-ink bg-ink px-5 font-bold text-white transition-colors hover:bg-white hover:text-ink sm:rounded-l-none"
              >
                {status === 'sending' ? 'Sending…' : 'Notify me'}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-2 font-mono text-[0.7rem] text-[#a33a2b]" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
