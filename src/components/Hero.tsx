import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { apps, links, socials, type SocialKey } from '../content/site'
import { monoLabel } from './guide/Visuals'
import { SansDigits } from './guide/text'
import { socialIcons } from './home/socialIcons'
import { buttonClass } from './home/ui'

const heroSocials: SocialKey[] = ['instagram', 'youtube', 'tiktok', 'linkedin', 'x', 'github']

const proof: { text: string; href?: string }[] = [
  { text: '56 users in the first 24 hours' },
  { text: 'First paying subscribers, monthly and yearly' },
  { text: 'A second app, Shimpaku, on iOS and Android' },
  { text: '13 free guides so you can build yours', href: '#guides' },
]

export function Hero() {
  const sted = apps[0]

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

      {/* The title comes first in the DOM so phones lead with it; on desktop the short story sits to its left. */}
      <div className="flex flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:gap-16 lg:px-14 lg:py-14">
        <div className="lg:order-2 lg:flex-1">
          <p className={`${monoLabel} mb-4 text-[0.68rem] text-ink/60`}>
            <SansDigits text="Shipaton 2026 / Sted is live on the App Store" />
          </p>
          <h1 id="hero-title" className="hero-title text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.9] font-bold tracking-[-0.05em]">
            <span className="block w-fit">Building an App</span>
            <span className="pixel-underline relative z-0 mt-[0.08em] block w-fit">100% With AI</span>
          </h1>
          <p className="mt-6 max-w-150 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-normal text-ink/75">
            From a drawing in a notebook to paying subscribers. Here’s the whole story — what I built, what broke, who I
            asked and what their feedback changed.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href={links.stedAppStore}
              target="_blank"
              rel="noreferrer"
              className={`${buttonClass} bg-signal py-3 pr-5 pl-3 hover:bg-ink hover:text-white`}
            >
              <img src={sted.icon} alt="" width={28} height={28} className="size-7 rounded-[7px] border border-ink" />
              Download Sted
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#story" className={`${buttonClass} bg-white px-5 py-3 hover:bg-butter`}>
              Read the story
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-7 grid gap-2">
            {proof.map(({ text, href }) => (
              <li key={text} className="flex items-center gap-2.5 text-[0.95rem] text-ink/80">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal">
                  <Check className="size-3 text-ink" strokeWidth={3} aria-hidden="true" />
                </span>
                {href ? (
                  <a href={href} className="group inline-flex items-center gap-1 font-medium text-ink no-underline hover:underline">
                    {text}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                ) : (
                  text
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 border-t-2 border-ink/10 pt-8 lg:order-1 lg:w-72 lg:shrink-0 lg:border-t-0 lg:pt-0">
          <img
            src="/dante-profile.png"
            alt="Dante Galeazzi"
            className="size-20 shrink-0 rounded-full border-2 border-ink object-cover object-top"
            width={80}
            height={80}
          />
          <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink/75">
            <p className={`${monoLabel} text-[0.7rem] text-ink`}>
              <SansDigits text="Build log / Shipaton 2026" />
            </p>
            <p className="text-2xl leading-tight font-bold tracking-[-0.04em] text-ink">Hi, I’m Dante.</p>
            <p>
              I don’t know how to code. So I entered{' '}
              <a href={links.shipaton} target="_blank" rel="noreferrer" className="pixel-underline relative z-0 font-medium text-ink no-underline">
                RevenueCat’s Shipaton
              </a>{' '}
              to see how far one person could go with AI.
            </p>
            <p>
              Six weeks later, <span className="font-bold text-ink">Sted</span> is live on the App Store, with real users and paying
              subscribers.
            </p>
            <p className="font-medium text-ink">Every prompt, cost and mistake — posted daily.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {heroSocials.map((key) => {
              const Icon = socialIcons[key]
              return (
                <a
                  key={key}
                  href={socials[key].href}
                  target="_blank"
                  rel="noreferrer"
                  className="-mx-2 flex items-center gap-2 px-2 py-1 text-[0.88rem] text-ink/65 no-underline transition-colors hover:bg-signal hover:text-ink"
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  {socials[key].label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
