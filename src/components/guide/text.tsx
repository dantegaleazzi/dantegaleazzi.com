import { Fragment } from 'react'

// DM Mono's slashed zero makes "100" read as "1ØØ", so digits inside mono labels use Space Grotesk.
export function SansDigits({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d+)/).map((part, index) =>
        /^\d+$/.test(part) ? (
          <span key={index} className="font-sans tabular-nums">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}

// "\n" keeps the carousel's hand-set line breaks on wider screens; [[words]] get the yellow marker.
export function RichText({ text, keepBreaksOnMobile = false }: { text: string; keepBreaksOnMobile?: boolean }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && (
            <>
              {' '}
              <br className={keepBreaksOnMobile ? undefined : 'max-sm:hidden'} />
            </>
          )}
          {line.split(/(\[\[.+?\]\])/).map((part, partIndex) =>
            part.startsWith('[[') ? (
              <span key={partIndex} className="pixel-underline relative z-0">
                {part.slice(2, -2)}
              </span>
            ) : (
              <Fragment key={partIndex}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  )
}