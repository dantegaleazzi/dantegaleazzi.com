import type { ReactNode } from 'react'
import { SansDigits } from '../guide/text'
import { monoLabel } from '../guide/Visuals'

// Chapter headers carry the page's story (01 → 04); plain section headers sit inside a chapter.
export function SectionHeader({
  id,
  chapter,
  kicker,
  title,
  description,
  action,
}: {
  id: string
  chapter?: string
  kicker: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-2xl">
        <p className={`${monoLabel} flex items-center gap-2.5 text-muted`}>
          {chapter && (
            <span className="rounded-sm bg-ink px-1.5 py-0.5 font-sans text-[0.75rem] font-bold text-signal tabular-nums">
              {chapter}
            </span>
          )}
          <SansDigits text={kicker} />
        </p>
        <h2 id={id} className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] leading-[1] font-bold tracking-[-0.05em]">
          <SansDigits text={title} />
        </h2>
        <p className="mt-3 text-[1.05rem] leading-[1.5] text-ink/70">{description}</p>
      </div>
      {action}
    </div>
  )
}

// Renders a real link when there is an href, otherwise a visibly pending placeholder.
export function MaybeLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  if (!href) {
    return (
      <span className={`${className} cursor-default opacity-60`} aria-disabled="true" title="Link coming soon">
        {children}
        <span className={`${monoLabel} ml-auto shrink-0 rounded-sm border border-dashed border-ink px-1.5 py-0.5 text-[0.56rem]`}>
          Soon
        </span>
      </span>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} className={className} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      {children}
    </a>
  )
}

export const buttonClass =
  'inline-flex items-center gap-2 rounded-md border-2 border-ink px-4 py-2.5 text-[0.95rem] font-bold tracking-[-0.01em] no-underline transition-colors'
