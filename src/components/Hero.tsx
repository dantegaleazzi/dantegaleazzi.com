import { ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function Hero() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="hero-panel px-0 py-12 lg:px-[clamp(1.75rem,4.5vw,4.75rem)] lg:py-8">
      <div className="desktop-window-bar" aria-hidden="true">
        <div className="desktop-window-controls">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <div className="text-[0.62rem] font-mono uppercase tracking-widest opacity-40">make_ai_do_the_work.doc</div>
        <div className="w-12" />
      </div>

      <div className="hero-content-wrapper lg:px-0">
        <div className="gamer-hud" aria-hidden="true">
          <span>PLAYER: DANTE</span>
          <span>MODE: BUILD</span>
          <span className="hud-online">AI CORE: ONLINE</span>
        </div>

        <div className="hero-eyebrow mb-4 inline-flex items-center border border-ink pr-2.5 font-mono text-[0.66rem] uppercase lg:mb-4">
          <span className="mr-2.5 bg-ink px-2.5 py-1.5 text-signal">New signal</span>
          For people who ship
        </div>

        <h1
          className="hero-title max-w-225 text-[clamp(3.8rem,19vw,6rem)] leading-[0.88] font-bold tracking-[-0.075em] lg:text-[clamp(4.2rem,6vw,6.2rem)] lg:leading-[0.87]"
          id="hero-title"
        >
          <span className="block w-fit">Make AI</span>
          <span className="pixel-underline relative z-0 mt-[0.12em] block w-fit">Do The Work</span>
        </h1>

        <p className="hero-copy mt-6 max-w-180 text-[clamp(1.08rem,1.7vw,1.42rem)] leading-normal lg:mt-5 lg:text-[clamp(1rem,1.2vw,1.15rem)]">
          Workflows that make AI do real work for you—build apps, orchestrate agents, automate repeat tasks and test
          tools. I share the build logs, costs and failures behind turning AI into your personal execution layer.
        </p>

        <div className="subscribe-block mt-4 max-w-190 lg:mt-4">
          <p className="mb-2.5 font-mono text-[0.7rem] leading-normal">
            You can subscribe below to get access to Make AI Do The Work
          </p>
          <form className="subscribe-form grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-0" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input
              className="subscribe-input h-14 min-w-0 rounded-none border-2 border-ink bg-[#fffef8] px-5 text-base outline-none focus:shadow-[inset_0_0_0_3px_#b7ff27] sm:border-r-0 lg:h-13"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
            <button
              className="subscribe-button group flex h-14 cursor-pointer items-center justify-center gap-3 rounded-none border-2 border-ink bg-ink px-6 font-mono text-xs font-medium text-white uppercase transition-colors hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink focus-visible:outline-none sm:min-w-41.5 lg:h-13"
              type="submit"
            >
              Subscribe
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>
          {submitted && (
            <p className="mt-2.5 font-mono text-[0.7rem]" role="status">
              You’re on the launch list. Integration coming next.
            </p>
          )}
        </div>

        <p className="progress-line mt-3 flex items-start gap-2 font-mono text-[0.68rem] leading-normal uppercase">
          <span aria-hidden="true">[</span>
          0 → 1,000 builders learning to make AI useful.
          <span aria-hidden="true">]</span>
        </p>
        <div className="xp-bar" aria-hidden="true">
          <span>COMMUNITY XP</span>
          <div><i /></div>
          <span>000 / 1000</span>
        </div>
      </div>
    </div>
  )
}
