import { ArrowRight, AtSign, BriefcaseBusiness, Check, FolderGit2, GitBranch } from 'lucide-react'
import { useState } from 'react'
import { subscribeToNewsletter } from '../lib/subscribe'

const perks = [
  'Real prompts you can copy',
  'AI workflows, tools & costs',
  'Every decision, mistake & build log',
]

const socials = [
  { label: 'X / Twitter', href: 'https://x.com/dantegaleazzi', Icon: AtSign },
  { label: 'GitHub', href: 'https://github.com/dantegaleazzi', Icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dantesgaleazzi/', Icon: BriefcaseBusiness },
  { label: 'Sted', href: 'https://www.sted.ai', Icon: FolderGit2 },
]

export function Hero() {
  const [submitted, setSubmitted] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    const email = new FormData(event.currentTarget).get('email')
    try {
      const result = await subscribeToNewsletter(String(email ?? ''))
      setAlreadySubscribed(result.alreadySubscribed)
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        {/* LEFT — who I am + socials */}
        <div className="flex flex-col gap-5 lg:w-72 lg:shrink-0">
          <img
            src="/dante-profile.png"
            alt="Dante Galeazzi"
            className="size-24 shrink-0 rounded-full border-2 border-ink object-cover object-top"
            width={96}
            height={96}
          />

          <div className="space-y-5 text-[0.95rem] leading-relaxed text-ink/75">
            <p className="font-mono text-[0.78rem] font-medium tracking-[0.08em] text-ink uppercase">Build log / Shipathon 2026</p>
            <p className="text-2xl font-bold leading-tight tracking-[-0.04em] text-ink">Hi, I’m Dante.</p>
            <p>
              I entered{' '}
              <a
                href="https://www.shipaton.com"
                target="_blank"
                rel="noreferrer"
                className="pixel-underline relative z-0 font-medium text-ink no-underline transition-colors hover:text-ink"
              >
                RevenueCat’s Shipathon
              </a>{' '}
              2026 without knowing how to code. I want to see if I can build and ship a mobile app before September 30.
            </p>
            <p>The app is called <span className="pixel-underline relative z-0 font-medium text-ink">Sted</span>.</p>
            <p>I’m building the whole thing in public.</p>
          </div>

          <a
            href="/about"
            className="w-fit border-b-2 border-ink pb-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-signal hover:text-signal focus-visible:outline-none"
          >
            Read my story →
          </a>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-2 px-2 py-1 -mx-2 text-[0.85rem] text-ink/65 transition-colors hover:text-ink hover:bg-signal focus-visible:bg-signal focus-visible:outline-none"
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — message + subscribe, centered in remaining space */}
        <div className="lg:flex lg:flex-1 lg:justify-center">
        <div className="flex flex-col lg:max-w-[640px]">
          <p className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-ink/60">
            Shipaton 2026 / Launching before September 30
          </p>
<h1 className="hero-title text-[clamp(2.8rem,7vw,5rem)] leading-[0.9] font-bold tracking-[-0.05em]" id="hero-title">
            <span className="block w-fit">Building an App</span>
            <span className="pixel-underline relative z-0 mt-[0.08em] block w-fit">100% With AI</span>
          </h1>

          <p className="mt-6 max-w-150 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-normal text-ink/75">
            I’m building Sted from idea to App Store and I&apos;m sharing everything I learn so you can build your own.
          </p>

          <div className="mt-7 w-full max-w-150 scroll-mt-5" id="subscribe">
            <form className="subscribe-form grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-0" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <input
                className="subscribe-input h-14 min-w-0 rounded-none border-2 border-ink bg-[#fffef8] px-5 text-base outline-none focus:shadow-[inset_0_0_0_3px_#ffd400] sm:border-r-0 lg:h-13"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Follow the build'}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </form>

            <ul className="mt-5 grid gap-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-[0.92rem] text-ink/80">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal">
                    <Check className="size-3 text-ink" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink/50">
              [ IDEA → APP STORE / FOLLOW THE JOURNEY ]
            </p>
            {submitted && (
              <p className="mt-2.5 font-mono text-[0.7rem]" role="status">
                {alreadySubscribed ? 'You’re already subscribed.' : 'Thanks — your signup was sent.'}
              </p>
            )}
            {error && <p className="mt-2.5 font-mono text-[0.7rem] text-[#a33a2b]" role="alert">{error}</p>}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
