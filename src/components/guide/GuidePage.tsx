import { ArrowLeft, ArrowRight, ListChecks, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Guide, GuideLink, GuideMeta, GuideSection, GuideTest } from '../../guides/types'
import { GuidePrompts } from './GuidePrompts'
import { GuideVisual, WindowFrame, monoLabel } from './Visuals'
import { RichText, SansDigits } from './text'

const sectionTitle = 'text-[clamp(1.75rem,3.4vw,2.35rem)] leading-[1.05] font-bold tracking-[-0.045em]'
const bodyText = 'text-[1.06rem] leading-[1.7] text-ink/80'

type TocItem = { id: string; label: string; number?: number }

function readMinutes(guide: Guide) {
  const text = [
    ...guide.intro,
    ...guide.sections.flatMap((section) => [...section.body, section.doThis ?? '']),
    guide.takeaway.body,
    ...guide.questions,
  ].join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const elements = key.split('|').flatMap((id) => document.getElementById(id) ?? [])
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const current = atBottom
        ? elements.at(-1)
        : (elements.filter((element) => element.getBoundingClientRect().top <= line).at(-1) ?? elements[0])
      if (current) setActive(current.id)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key])

  return active
}

function Header({ guide, meta }: { guide: Guide; meta: GuideMeta }) {
  return (
    <WindowFrame title={meta.file}>
      <div className="px-5 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <a href={meta.crumb.href} className={`${monoLabel} text-muted no-underline hover:text-ink`}>
            <SansDigits text={meta.crumb.label} />
          </a>
          <span className="text-muted max-sm:hidden" aria-hidden="true">/</span>
          <p
            className={`${monoLabel} rounded-sm px-2 py-1 ${
              guide.hook.includes('[[') ? 'border-2 border-ink bg-butter' : 'bg-signal'
            }`}
          >
            {guide.chip ?? meta.title}
          </p>
        </div>
        <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.4rem)] leading-[0.98] font-bold tracking-[-0.055em]">
          <RichText text={guide.hook} />
        </h1>
        <p className="mt-4 text-[clamp(1.08rem,1.8vw,1.25rem)] leading-[1.4] font-medium text-ink/70">
          {guide.subtitle.replace(/\n/g, ' ')}
        </p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-md border-2 border-ink bg-butter px-3.5 py-2.5">
            <span className={`${monoLabel} text-[0.66rem]`}>Start here</span>
            <span className="font-bold tracking-[-0.02em]">{guide.startHere}</span>
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-md border-2 border-ink bg-paper px-3.5 py-2.5 text-muted">
            <span className={`${monoLabel} text-[0.66rem]`}>Not here</span>
            <span className="font-bold tracking-[-0.02em] line-through">{guide.notHere}</span>
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/15 pt-5">
          <img
            src="/dante-profile.png"
            alt=""
            className="size-8 rounded-full border-2 border-ink object-cover object-top"
            width={32}
            height={32}
          />
          <span className="text-[0.95rem] font-bold">Dante Galeazzi</span>
          <span className={`${monoLabel} text-[0.66rem] text-muted`}>
            <SansDigits text={`${meta.part} · ${readMinutes(guide)} min read`} />
          </span>
        </div>
      </div>
    </WindowFrame>
  )
}

function Summary({ guide }: { guide: Guide }) {
  return (
    <section className="rounded-md border-2 border-ink border-l-[6px] bg-white px-5 py-4" aria-label="Summary">
      <p className={`${monoLabel} text-[0.66rem] text-muted`}>Summary</p>
      <div className="mt-2 grid gap-2">
        {guide.intro.map((paragraph) => (
          <p key={paragraph} className="text-[1.02rem] leading-[1.6]">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

function MobileJump({ toc }: { toc: TocItem[] }) {
  return (
    <label className="block lg:hidden">
      <span className="sr-only">Jump to a section</span>
      <select
        className="w-full cursor-pointer appearance-none rounded-md border-2 border-ink bg-white bg-[length:14px] bg-[right_1rem_center] bg-no-repeat px-4 py-3 pr-10 text-[0.95rem] font-medium"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e1e1e' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        defaultValue=""
        onChange={(event) => {
          document.getElementById(event.target.value)?.scrollIntoView()
          event.target.value = ''
        }}
      >
        <option value="" disabled>
          Jump to a section…
        </option>
        {toc.map(({ id, label, number }) => (
          <option key={id} value={id}>
            {number ? `${String(number).padStart(2, '0')} · ` : ''}
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Section({ section, number }: { section: GuideSection; number: number }) {
  return (
    <section id={`step-${number}`} className="scroll-mt-6 border-t-2 border-ink pt-9" aria-labelledby={`step-${number}-title`}>
      <div className="flex flex-wrap items-center gap-3">
        <p className={monoLabel}>
          <span className="font-sans tabular-nums">{String(number).padStart(2, '0')}</span> · {section.kicker}
        </p>
        {section.fromSted && (
          <p className={`${monoLabel} rounded-sm border-2 border-ink bg-butter px-2 py-0.5 text-[0.64rem]`}>Building Sted</p>
        )}
      </div>
      <h2 id={`step-${number}-title`} className={`${sectionTitle} mt-3`}>
        <RichText text={section.title} />
      </h2>
      <div className="mt-5 grid gap-4">
        {section.body.map((paragraph) => (
          <p key={paragraph} className={bodyText}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6 grid gap-3">
        {section.visuals.map((visual, index) => (
          <GuideVisual key={index} visual={visual} />
        ))}
      </div>
      {section.doThis && (
        <div className="mt-6 rounded-md border-2 border-dashed border-ink bg-white px-5 py-4">
          <p className={`${monoLabel} flex items-center gap-2`}>
            <ListChecks className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Do this
          </p>
          <p className="mt-2 text-[1.02rem] leading-[1.55]">{section.doThis}</p>
        </div>
      )}
    </section>
  )
}

function TwoMinuteTest({ test }: { test: GuideTest }) {
  return (
    <section id="test" className="scroll-mt-6" aria-labelledby="test-title">
      <p className={`${monoLabel} flex items-center gap-2`}>
        <Timer className="size-4" strokeWidth={1.8} aria-hidden="true" />
        <SansDigits text="Try it now · 2 minutes" />
      </p>
      <h2 id="test-title" className={`${sectionTitle} mt-3`}>
        {test.name}
      </h2>
      <p className={`${bodyText} mt-4`}>{test.intro}</p>
      <div className="mt-6">
        <WindowFrame title={test.name}>
          <ol className="grid gap-2 p-3 sm:p-4">
            {test.steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-md border-2 border-ink bg-paper px-4 py-3 text-[1.02rem] leading-snug font-medium">
                <span className="w-6 shrink-0 font-sans font-bold tabular-nums">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="border-t-2 border-ink bg-butter px-4 py-3.5 sm:px-5">
            <p className={`${monoLabel} text-[0.66rem]`}>What it tells you</p>
            <p className="mt-1 text-[1.02rem] leading-snug font-bold tracking-[-0.01em]">{test.result}</p>
          </div>
        </WindowFrame>
      </div>
    </section>
  )
}

function Questions({ questions }: { questions: string[] }) {
  return (
    <ul className="grid gap-2">
      {questions.map((question) => (
        <li key={question}>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border-2 border-ink bg-white px-4 py-3 text-[1.02rem] leading-snug transition-colors has-[:checked]:bg-mint">
            <input type="checkbox" className="mt-0.5 size-4.5 shrink-0 cursor-pointer accent-ink" />
            <span>{question}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

function GuideNav({ prev, next }: { prev?: GuideLink; next?: GuideLink }) {
  const links = [
    prev && { ...prev, direction: 'Previous' as const, Icon: ArrowLeft },
    next && { ...next, direction: 'Next' as const, Icon: ArrowRight },
  ].filter((link) => link !== undefined)

  return (
    <nav className="grid gap-3 sm:grid-cols-2" aria-label="Guide navigation">
      {links.map(({ href, label, title, direction, Icon }) => (
        <a
          key={direction}
          href={href}
          className={`rounded-md border-2 border-ink bg-white px-5 py-4 no-underline transition-colors hover:bg-butter focus-visible:bg-butter focus-visible:outline-none ${
            direction === 'Next' ? 'sm:col-start-2 sm:text-right' : ''
          }`}
        >
          <span className={`${monoLabel} flex items-center gap-2 text-muted ${direction === 'Next' ? 'sm:justify-end' : ''}`}>
            {direction === 'Previous' && <Icon className="size-3.5" aria-hidden="true" />}
            {direction} · <SansDigits text={label} />
            {direction === 'Next' && <Icon className="size-3.5" aria-hidden="true" />}
          </span>
          <span className="mt-1 block text-[1.1rem] leading-tight font-bold tracking-[-0.02em]">{title}</span>
        </a>
      ))}
    </nav>
  )
}

function TableOfContents({ toc, active, back }: { toc: TocItem[]; active: string; back: GuideMeta['back'] }) {
  return (
    <nav className="sticky top-6" aria-label="In this guide">
      <a href={back.href} className={`${monoLabel} text-[0.66rem] text-muted no-underline hover:text-ink`}>
        ← {back.label}
      </a>
      <p className={`${monoLabel} mt-7 mb-3 text-[0.66rem]`}>In this guide</p>
      <ol className="grid gap-0.5 border-l-2 border-ink/15">
        {toc.map(({ id, label, number }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`-ml-0.5 block border-l-2 py-1 pl-3.5 text-[0.9rem] leading-snug no-underline transition-colors ${
                active === id ? 'border-ink font-bold text-ink' : 'border-transparent text-ink/60 hover:text-ink'
              }`}
            >
              {number && <span className="mr-1.5 font-normal tabular-nums text-muted">{String(number).padStart(2, '0')}</span>}
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function SideRail({ guide, next }: { guide: Guide; next?: GuideLink }) {
  return (
    <div className="sticky top-6 grid gap-8">
      <div>
        <p className={`${monoLabel} mb-3 text-[0.66rem]`}>Prompts in this guide</p>
        <ul className="grid gap-1.5">
          {guide.prompts.map((prompt) => (
            <li key={prompt.id}>
              <a
                href={`#prompt-${prompt.id}`}
                className="block rounded-md border-2 border-ink bg-white px-3 py-2 text-[0.88rem] leading-snug font-medium no-underline transition-colors hover:bg-butter"
              >
                {prompt.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {next && (
        <a href={next.href} className="block no-underline">
          <p className={`${monoLabel} mb-2 text-[0.66rem] text-muted`}>
            <SansDigits text={`Next · ${next.label}`} />
          </p>
          <p className="text-[1rem] leading-tight font-bold tracking-[-0.02em] hover:underline">{next.title} →</p>
        </a>
      )}
    </div>
  )
}

export function GuidePage({ guide, meta }: { guide: Guide; meta: GuideMeta }) {
  useEffect(() => {
    document.title = `${meta.title} — ${meta.crumb.label} · Dante Galeazzi`
  }, [meta.title, meta.crumb.label])

  const toc: TocItem[] = [
    ...guide.sections.map((section, index) => ({ id: `step-${index + 1}`, label: section.kicker, number: index + 1 })),
    { id: 'test', label: guide.test.name },
    { id: 'takeaway', label: 'The takeaway' },
    { id: 'questions', label: 'Ask yourself' },
    { id: 'prompts', label: 'Prompts' },
  ]
  const active = useActiveSection(toc.map((item) => item.id))

  return (
    <article className="mt-6 grid gap-10 px-1 pb-16 lg:grid-cols-[12rem_minmax(0,44rem)] lg:justify-center lg:gap-12 xl:grid-cols-[12rem_minmax(0,44rem)_13rem]">
      <aside className="hidden lg:block">
        <TableOfContents toc={toc} active={active} back={meta.back} />
      </aside>

      <div className="grid min-w-0 gap-12">
        <div className="grid gap-4">
          <Header guide={guide} meta={meta} />
          <Summary guide={guide} />
          <MobileJump toc={toc} />
        </div>

        {guide.sections.map((section, index) => (
          <Section key={section.kicker} section={section} number={index + 1} />
        ))}

        <TwoMinuteTest test={guide.test} />

        <section id="takeaway" className="scroll-mt-6 rounded-lg border-2 border-ink bg-white px-6 py-8 sm:px-9" aria-labelledby="takeaway-title">
          <p className={monoLabel}>The takeaway</p>
          <h2 id="takeaway-title" className={`${sectionTitle} mt-3`}>
            <RichText text={guide.takeaway.title} />
          </h2>
          <p className="mt-4 max-w-xl text-[1.1rem] leading-normal font-medium text-muted">{guide.takeaway.body}</p>
        </section>

        <section id="questions" className="scroll-mt-6" aria-labelledby="questions-title">
          <p className={monoLabel}>Before you move on</p>
          <h2 id="questions-title" className={`${sectionTitle} mt-3`}>
            Ask yourself these questions.
          </h2>
          <p className={`${bodyText} mt-3 mb-5`}>
            If you can’t answer one honestly yet, that’s your next task — not the next guide.
          </p>
          <Questions questions={guide.questions} />
        </section>

        <section id="prompts" className="scroll-mt-6" aria-labelledby="prompts-title">
          <p className={monoLabel}>Prompts</p>
          <h2 id="prompts-title" className={`${sectionTitle} mt-3 mb-5`}>
            Use AI for this step.
          </h2>
          <GuidePrompts prompts={guide.prompts} />
        </section>

        <GuideNav prev={meta.prev} next={meta.next} />
      </div>

      <aside className="hidden xl:block">
        <SideRail guide={guide} next={meta.next} />
      </aside>
    </article>
  )
}
