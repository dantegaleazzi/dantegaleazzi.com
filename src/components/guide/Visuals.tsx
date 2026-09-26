import { Check, Square } from 'lucide-react'
import type { Tone, Visual } from '../../guides/types'
import { RichText, SansDigits } from './text'

export const toneClass: Record<Tone, string> = {
  signal: 'bg-signal',
  butter: 'bg-butter',
  peach: 'bg-peach',
  mint: 'bg-mint',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
  white: 'bg-white',
  paper: 'bg-paper',
}

export const monoLabel = 'font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em]'
const box = 'rounded-md border-2 border-ink'
const statement = 'text-[clamp(1.15rem,2.4vw,1.45rem)] leading-[1.2] font-bold tracking-[-0.03em]'

export function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`${box} overflow-hidden bg-white`}>
      <div className="relative flex h-10 items-center border-b-2 border-ink bg-chrome px-4">
        <div className="desktop-window-controls" aria-hidden="true">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <p className={`${monoLabel} absolute inset-x-16 truncate text-center text-muted`}>
          <SansDigits text={title} />
        </p>
      </div>
      {children}
    </div>
  )
}

export function GuideVisual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'banner':
      return (
        <p className={`${box} ${toneClass[visual.tone ?? 'signal']} px-5 py-4 ${statement}`}>
          <RichText text={visual.text} />
        </p>
      )

    case 'callout':
      return (
        <div className={`${box} ${toneClass[visual.tone ?? 'signal']} px-5 py-4`}>
          <p className={`${monoLabel} mb-2`}>{visual.label}</p>
          <p className={statement}>
            <RichText text={visual.text} />
          </p>
        </div>
      )

    case 'note':
      return (
        <p className={`${monoLabel} leading-relaxed text-muted`}>
          <SansDigits text={visual.text} />
        </p>
      )

    case 'window':
      return (
        <WindowFrame title={visual.title}>
          <ol className="grid gap-2 p-3 sm:p-4">
            {visual.rows.map(({ text, icon: Icon }, index) => (
              <li
                key={text}
                className={`flex items-center gap-4 rounded-md border-2 border-ink px-4 py-3 text-[1.02rem] font-medium ${
                  index === 0 ? 'bg-sky' : 'bg-paper'
                }`}
              >
                {Icon ? (
                  <Icon className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <span className="w-6 shrink-0 font-sans tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                )}
                {text}
              </li>
            ))}
          </ol>
        </WindowFrame>
      )

    case 'chips': {
      const detailed = visual.items.some((item) => item.text)
      return (
        <ul className={`grid gap-2 ${detailed ? 'sm:grid-cols-2' : 'grid-cols-2'}`}>
          {visual.items.map(({ label, tone, text }) => (
            <li key={label} className={`${box} ${toneClass[tone]} ${detailed ? 'px-4 py-3' : 'px-3 py-4 text-center'}`}>
              <p className={monoLabel}>{label}</p>
              {text && <p className="mt-1.5 text-[0.95rem] leading-snug text-ink/80">{text}</p>}
            </li>
          ))}
        </ul>
      )
    }

    case 'process':
      return (
        <ol className="grid justify-items-stretch">
          {visual.steps.map(({ text, tone }, index) => (
            <li key={text} className="grid">
              {index > 0 && (
                <span className="py-1 text-center text-xl leading-none font-bold" aria-hidden="true">
                  {visual.joiner}
                </span>
              )}
              <span className={`${box} ${toneClass[tone]} px-5 py-3.5 text-center text-[1.1rem] font-bold tracking-[-0.02em]`}>
                {text}
              </span>
            </li>
          ))}
        </ol>
      )

    case 'cards':
      return (
        <ul className="grid gap-2.5">
          {visual.items.map(({ label, text, tone }, index) => (
            <li key={index} className={`${box} ${toneClass[tone]} px-5 py-4`}>
              <p className={`${monoLabel} mb-1.5`}>{label}</p>
              <p className={statement}>{text}</p>
            </li>
          ))}
        </ul>
      )

    case 'checklist':
      return (
        <ul className="grid gap-2">
          {visual.items.map((item) => (
            <li key={item} className={`${box} flex items-center gap-3.5 bg-white px-4 py-3 text-[1.02rem] font-medium`}>
              <Square className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'questions':
      return (
        <ul className="border-t border-ink/20">
          {visual.items.map((item) => {
            const [first, ...rest] = item.split(' ')
            return (
              <li key={item} className="border-b border-ink/20 py-3 text-[1.15rem] leading-snug">
                <span className="font-bold">{first}</span> <span className="text-muted">{rest.join(' ')}</span>
              </li>
            )
          })}
        </ul>
      )

    case 'panels':
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {visual.panels.map(({ label, tone, items }) => (
            <div key={label} className={`${box} ${toneClass[tone]} px-5 py-4`}>
              <p className={`${monoLabel} mb-2.5`}>
                <SansDigits text={label} />
              </p>
              <ul className="grid gap-1.5">
                {items.map((item) => (
                  <li key={item} className="text-[1.02rem] leading-snug font-bold tracking-[-0.01em]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

    case 'evidence':
      return (
        <div className="grid gap-2.5 sm:grid-cols-[2fr_3fr]">
          <div className={`${box} bg-paper px-5 py-4`}>
            <p className={`${monoLabel} mb-2.5`}>Weak signals</p>
            <ul className="grid gap-2">
              {visual.weak.map((item) => (
                <li key={item} className="text-[1.02rem] leading-snug text-muted line-through">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${box} bg-mint px-5 py-4`}>
            <p className={`${monoLabel} mb-2.5`}>Stronger signals</p>
            <ul className="grid gap-2">
              {visual.strong.map((item) => (
                <li key={item} className="flex gap-2.5 text-[1.02rem] leading-snug font-medium">
                  <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
  }
}
