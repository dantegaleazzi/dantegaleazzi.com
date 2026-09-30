import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { guidePath, guideTitles, guides, seriesMeta } from '../guides'
import { GuidePage } from './guide/GuidePage'
import { WindowFrame, monoLabel } from './guide/Visuals'
import { SansDigits } from './guide/text'

export function ZeroToHundredIndex() {
  useEffect(() => {
    document.title = 'Zero to 100 — A 13-part guide · Dante Galeazzi'
  }, [])

  return (
    <article className="mt-3 pb-16" aria-labelledby="zero-to-hundred-title">
      <WindowFrame title="ZERO_TO_100.DOC">
        <div className="px-5 py-7 sm:px-10 sm:py-9">
          <p className={`${monoLabel} text-muted`}>
            <SansDigits text="The series · 13 parts" />
          </p>
          <h1 id="zero-to-hundred-title" className="mt-3 text-[clamp(2.6rem,6vw,4.2rem)] leading-[0.94] font-bold tracking-[-0.06em]">
            Zero to <span className="pixel-underline relative z-0">100</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1.08rem,1.8vw,1.25rem)] leading-[1.4] font-medium text-ink/75">
            I don’t know how to code. This is how I’m building Sted from zero to a real product with AI — turned into a
            practical guide you can follow for your own app.
          </p>
        </div>
      </WindowFrame>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guideTitles.map((title, index) => {
          const number = index + 1
          return (
            <li key={title}>
              <a
                href={guidePath(number)}
                className="group flex h-full flex-col gap-5 rounded-md border-2 border-ink bg-white px-5 py-5 no-underline transition-colors hover:bg-butter focus-visible:bg-butter focus-visible:outline-none"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-ink font-sans text-[0.95rem] font-bold text-signal tabular-nums">
                  {number}
                </span>
                <span className="flex flex-1 items-end justify-between gap-3">
                  <span>
                    <span className="block text-[1.2rem] leading-tight font-bold tracking-[-0.03em]">{title}</span>
                    <span className="mt-1.5 block text-[0.92rem] leading-snug text-muted">
                      {guides[number].subtitle.replace(/\n/g, ' ')}
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export function ZeroToHundredGuide({ number }: { number: number }) {
  return <GuidePage guide={guides[number]} meta={seriesMeta(number)} />
}
