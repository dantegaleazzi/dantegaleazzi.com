import { ArrowRight, ArrowUpRight, BellRing, CirclePlay, Play, X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import {
  apps,
  buildLessons,
  expertEpisodes,
  expertsPlaylist,
  feedbackLoops,
  finalVideo,
  links,
  reelCover,
  reelHref,
  resources,
  socials,
  story,
  tools,
  youtubeThumbnail,
  type SocialKey,
  type StoryBeat,
  type StoryThumb,
} from '../../content/site'
import { guidePath, guides, guideTitles } from '../../guides'
import { subscribeToNewsletter } from '../../lib/subscribe'
import { monoLabel } from '../guide/Visuals'
import { SansDigits } from '../guide/text'
import { GuideSeriesActions, SectionHeader, buttonClass } from './ui'

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
  workflow: {
    className: 'bg-white',
    content: (
      <>
        <span className="text-[2.2rem] leading-none font-bold tracking-[-0.05em]">AI</span>
        <span className={`${monoLabel} mt-1.5 text-center text-[0.48rem] leading-tight`}>
          as my
          <br />
          CTO
        </span>
      </>
    ),
  },
  sted: {
    className: 'bg-white',
    content: <img src={apps[0].icon} alt="" width={64} height={64} className="w-[78%] rounded-[0.7rem] border-2 border-ink" />,
  },
  rejected: {
    className: 'bg-white',
    content: (
      <>
        <X className="size-10" strokeWidth={3} aria-hidden="true" />
        <span className={`${monoLabel} mt-1 text-[0.5rem]`}>Rejected</span>
      </>
    ),
  },
  feedback: {
    className: 'bg-signal',
    content: (
      <>
        <span className="text-[2.6rem] leading-none font-bold">?</span>
        <span className={`${monoLabel} mt-1 text-[0.5rem]`}>Feedback</span>
      </>
    ),
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
  const internal = beat.link?.href.startsWith('#')
  const posts = [
    { label: 'Instagram', logo: socials.instagram.logo, href: beat.reel ? reelHref(beat.reel) : beat.posts?.instagram },
    { label: 'LinkedIn', logo: socials.linkedin.logo, href: beat.posts?.linkedin },
    { label: 'X', logo: socials.x.logo, href: beat.posts?.x },
  ].filter((post): post is { label: string; logo: string | undefined; href: string } => Boolean(post.href))
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
          {posts.map(({ label, logo, href }) => (
            <ExternalLink key={label} href={href} className="inline-flex items-center gap-1.5 font-bold no-underline hover:underline">
              <img src={logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
              {label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ExternalLink>
          ))}
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

// The YouTube player only loads once someone presses play, so the page stays light.
function FinalVideo() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="mt-3 rounded-md border-2 border-ink bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <DayTag text="The end" />
          <p className="mt-2.5 text-[1.6rem] leading-none font-bold tracking-[-0.04em]">The final video</p>
          <p className="mt-1.5 leading-snug text-ink/70">{finalVideo.title}</p>
        </div>
        <ExternalLink href={finalVideo.href} className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold no-underline hover:underline">
          <img src={socials.youtube.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
          Watch on YouTube
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </ExternalLink>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md border-2 border-ink bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${finalVideo.id}?autoplay=1&rel=0`}
            title={finalVideo.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 cursor-pointer" aria-label={`Play the final video: ${finalVideo.title}`}>
            <img src={youtubeThumbnail(finalVideo.id, 'maxresdefault')} alt="" className="size-full object-cover" loading="lazy" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full border-2 border-ink bg-signal transition-transform group-hover:scale-110 group-focus-visible:scale-110">
                <Play className="ml-1 size-7 fill-ink" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
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

const storySocials: { key: SocialKey; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'x', label: 'X' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'tiktok', label: 'TikTok' },
]

export function StorySection() {
  return (
    <HomeSection id="story">
      <SectionHeader
        id="story-title"
        chapter="01"
        kicker="The story"
        title="From a notebook drawing to paying subscribers"
        description="Six weeks in three chapters, posted as it happened. Tap any cover to watch the reel."
      />

      <div className="-mt-2 mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className={`${monoLabel} text-[0.6rem] text-muted`}>Follow along</p>
        <ul className="flex flex-wrap gap-1.5">
          {storySocials.map(({ key, label }) => (
            <li key={key}>
              <ExternalLink
                href={socials[key].href}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 bg-white py-1 pr-3 pl-1.5 text-[0.85rem] font-bold no-underline transition-colors hover:border-ink hover:bg-butter"
              >
                <img src={socials[key].logo} alt="" width={18} height={18} className="size-4.5 rounded-full" />
                {label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-12">
        {story.map(({ chapter, days, title, summary, beats }) => (
          <div key={chapter}>
            <div className="mb-4 grid gap-1 border-t-2 border-ink pt-4 md:grid-cols-[15rem_1fr] md:gap-8">
              <div>
                <p className={`${monoLabel} text-[0.64rem] text-muted`}>
                  <SansDigits text={`${chapter} · ${days}`} />
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
    </HomeSection>
  )
}

// 02 — Building in public

// The people it connected me with come first; the feedback cards below show what changed in Sted.
export function InPublicSection() {
  return (
    <HomeSection id="in-public">
      <SectionHeader
        id="in-public-title"
        chapter="02"
        kicker="Building in public"
        title="What came from sharing Sted"
        description="The conversations it started, and what changed in the app because of them."
      />

      <div className="grid gap-3 md:grid-cols-2">
        <article className={`${card} flex flex-col p-5 sm:p-6`}>
          <h3 id="conversations-title" className={subTitle}>
            I spoke with more people than I could interview
          </h3>
          <p className="mt-3 leading-[1.5] text-ink/75">
            I published <span className="font-sans">8</span> interviews, but I spoke with many more people who had already
            built apps or started their own businesses. Some conversations were just messages. Others became calls where I
            could ask about something I was stuck on. Sharing what I was building made it much easier to reach out.
          </p>
          <ExternalLink href={expertsPlaylist.href} className={`${buttonClass} mt-5 w-fit bg-white hover:bg-butter`}>
            Watch the interviews
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ExternalLink>
        </article>
        <article className="flex flex-col rounded-md border-2 border-ink bg-butter p-5 sm:p-6">
          <h3 id="cousin-title" className={subTitle}>
            My cousin built his first app
          </h3>
          <p className="mt-3 leading-[1.5] text-ink/80">
            A couple of days ago, my younger cousin Santiago sent me a voice message. He had built his first app and needed
            help to “take it out of Claude.” 😂
          </p>
          <p className="mt-3 leading-[1.5] text-ink/80">
            I shared this whole journey hoping it would push someone to try. I just didn’t expect it to be my own family. 🤣
            It made me really happy.
          </p>
          <p className="mt-3 leading-[1.5] text-ink/80">
            So now I have a new challenge: helping Santiago deploy his app. 😅
          </p>
        </article>
      </div>

      <div id="feedback" className="mt-14 scroll-mt-6">
        <SubHeader
          id="feedback-title"
          title="Feedback that changed the app"
          description="Real feedback I got while building in public, and what I changed because of it."
        />
        <ol className="grid gap-3 md:grid-cols-2">
          {feedbackLoops.map(({ tag, title, steps, reel, episode, x }, index) => {
            const interview = expertEpisodes.find(({ number }) => number === episode)
            // An odd card out spans the full row instead of leaving a gap.
            const wide = index === feedbackLoops.length - 1 && feedbackLoops.length % 2 === 1
            return (
            <li key={tag} className={`${card} flex flex-col p-5 ${wide ? 'md:col-span-2' : ''}`}>
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
                    <span>Watch the interview (Ep. {interview.number})</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                )}
                {reel && (
                  <ExternalLink href={reelHref(reel)} className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold no-underline hover:underline">
                    <img src={socials.instagram.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
                    <span>Watch the Day {reel} reel</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                )}
                {x?.map(({ label, href }) => (
                  <ExternalLink key={href} href={href} className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold no-underline hover:underline">
                    <img src={socials.x.logo} alt="" width={16} height={16} className="size-4 rounded-[4px]" />
                    <span>{label} on X</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                ))}
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
            <ExternalLink href={expertsPlaylist.href} className={`${buttonClass} bg-white hover:bg-butter`}>
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

      <div id="lessons" className="mt-14 scroll-mt-6">
        <SubHeader
          id="lessons-title"
          step="Then"
          title="Lessons from the build"
          description="What building Sted taught me — the mistakes, the store rules and how I work with AI."
        />
        <ol className="grid gap-3 md:grid-cols-2">
          {buildLessons.map(({ title, text }, index) => (
            <li key={title} className={`${card} flex flex-col gap-3 p-5`}>
              <span className={`${monoLabel} w-fit rounded-sm bg-ink px-2 py-1 text-[0.6rem] text-signal`}>
                Lesson <span className="font-sans">{index + 1}</span>
              </span>
              <h4 className="text-[1.3rem] leading-[1.15] font-bold tracking-[-0.03em]">{title}</h4>
              <p className="leading-snug text-ink/70">{text}</p>
            </li>
          ))}
        </ol>
      </div>

      <AppsNow />

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
