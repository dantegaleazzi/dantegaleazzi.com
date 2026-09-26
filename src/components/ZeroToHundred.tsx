export const zeroToHundredGuides = [
  'Start With a Problem',
  'Find Your Target Market',
  'Validate the Idea',
  'Define Your MVP',
  'Name Your Startup',
  'Build It With AI',
  'Get It to Real Users',
  'Set Up Your Company',
  'Figure Out How You Make Money',
  'Build Distribution',
  'Prepare to Launch',
  'Ship, Learn & Iterate',
  'Zero to a Hundred — What I Learned Building From 0 → 100 With AI',
]

export const zeroToHundredIndexPath = '/zero-to-100-guide'
export const zeroToHundredPath = (number: number) => `${zeroToHundredIndexPath}-${number}`

export function ZeroToHundredIndex() {
  return (
    <section className="px-6 py-12 lg:px-[75px]" aria-labelledby="zero-to-hundred-title">
      <p className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-ink/60">Guide / 13 parts</p>
      <h1 id="zero-to-hundred-title" className="text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] font-bold tracking-[-0.05em]">
        Zero to a Hundred
      </h1>
      <ol className="mt-8 grid max-w-2xl gap-2">
        {zeroToHundredGuides.map((title, index) => (
          <li key={title}>
            <a
              href={zeroToHundredPath(index + 1)}
              className="flex gap-4 border border-ink px-4 py-3 no-underline transition-colors hover:bg-signal focus-visible:bg-signal focus-visible:outline-none"
            >
              <span className="font-mono text-[0.75rem] text-ink/60">{String(index + 1).padStart(2, '0')}</span>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function ZeroToHundredGuide({ number }: { number: number }) {
  return (
    <section className="px-6 py-12 lg:px-[75px]" aria-labelledby="guide-title">
      <a href={zeroToHundredIndexPath} className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink/60 hover:text-ink">
        ← Zero to a Hundred
      </a>
      <p className="mt-8 mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-ink/60">
        Part {number} of {zeroToHundredGuides.length}
      </p>
      <h1 id="guide-title" className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.05em]">
        {zeroToHundredGuides[number - 1]}
      </h1>
      <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink/50">Coming soon</p>
    </section>
  )
}
