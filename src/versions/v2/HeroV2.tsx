import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { buildLog, links } from '../../content/site'
import { WindowFrame, monoLabel } from '../../components/guide/Visuals'
import { RichText, SansDigits } from '../../components/guide/text'
import { buttonClass } from '../../components/home/ui'

export function HeroV2() {
  const lastIndex = buildLog.findIndex((entry) => entry.when === 'Day 37')

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

      <div className="grid gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:px-14 lg:py-14">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/dante-profile.png"
              alt=""
              className="size-11 shrink-0 rounded-full border-2 border-ink object-cover object-top"
              width={44}
              height={44}
            />
            <div className="leading-tight">
              <p className="font-bold">Dante Galeazzi</p>
              <p className={`${monoLabel} text-[0.62rem] text-muted`}>
                <SansDigits text="RevenueCat Shipaton 2026 · Building in public" />
              </p>
            </div>
          </div>

          <h1 id="hero-title" className="mt-7 text-[clamp(2.7rem,6vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.055em]">
            <RichText text={'I can’t code.\nI just shipped\nmy [[first app]].'} keepBreaksOnMobile />
          </h1>

          <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.55] text-ink/75">
            I entered{' '}
            <a href={links.shipaton} target="_blank" rel="noreferrer" className="font-medium text-ink underline underline-offset-4">
              RevenueCat’s Shipaton
            </a>{' '}
            to find out if someone who can’t code could build and ship a real app with AI. The answer is{' '}
            <span className="font-bold text-ink">Sted</span> — and it’s live on the App Store.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href={links.stedAppStore}
              target="_blank"
              rel="noreferrer"
              className={`${buttonClass} bg-signal px-5 py-3.5 hover:bg-ink hover:text-white`}
            >
              Download Sted
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#process" className={`${buttonClass} bg-white px-5 py-3.5 hover:bg-butter`}>
              Watch how I built it
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <a href="#build-yours" className="group mt-6 inline-flex items-center gap-1.5 text-[0.95rem] text-ink/70 no-underline hover:text-ink">
            <span>Want to build yours? I turned everything into 13 free guides</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <WindowFrame title="STED_BUILD_LOG.DOC">
          <ol className="relative grid gap-0 p-4 sm:p-5">
            {buildLog.map(({ when, what }, index) => {
              const highlight = index === lastIndex
              return (
                <li key={when} className="relative flex gap-4 pb-4 last:pb-0">
                  {index < buildLog.length - 1 && (
                    <span className="absolute top-6 bottom-0 left-[0.6rem] w-0.5 bg-ink/15" aria-hidden="true" />
                  )}
                  <span
                    className={`relative mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink ${
                      highlight ? 'bg-signal' : 'bg-white'
                    }`}
                    aria-hidden="true"
                  />
                  <div className={`min-w-0 flex-1 rounded-md px-3 py-2 ${highlight ? 'border-2 border-ink bg-butter' : ''}`}>
                    <p className={`${monoLabel} text-[0.62rem] text-muted`}>
                      <SansDigits text={when} />
                    </p>
                    <p className={`mt-0.5 leading-snug ${highlight ? 'text-[1.1rem] font-bold' : 'font-medium'}`}>{what}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </WindowFrame>
      </div>
    </div>
  )
}
