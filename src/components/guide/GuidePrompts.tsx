import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'
import type { GuidePrompt } from '../../guides/types'
import { monoLabel } from './Visuals'

function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]\n]+\])/).map((part, index) =>
        part.startsWith('[') ? (
          <mark key={index} className="rounded-sm bg-butter px-0.5 text-ink">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

function PromptCard({ prompt, number }: { prompt: GuidePrompt; number: number }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'selected'>('idle')
  const textRef = useRef<HTMLPreElement>(null)
  const copied = status === 'copied'

  const showStatus = (next: 'copied' | 'selected') => {
    setStatus(next)
    window.setTimeout(() => setStatus('idle'), next === 'copied' ? 2000 : 4000)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.text)
      showStatus('copied')
    } catch {
      // The async clipboard is blocked in some in-app browsers (Instagram, LinkedIn): select the text and
      // fall back to execCommand, or leave it selected so it can be copied by hand.
      const selection = window.getSelection()
      if (!textRef.current || !selection) return
      selection.selectAllChildren(textRef.current)
      if (document.execCommand('copy')) {
        selection.removeAllRanges()
        showStatus('copied')
      } else {
        showStatus('selected')
      }
    }
  }

  const label = { idle: 'Copy prompt', copied: 'Copied', selected: 'Selected — press Copy' }[status]

  return (
    <li id={`prompt-${prompt.id}`} className="scroll-mt-6 overflow-hidden rounded-md border-2 border-ink bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-ink bg-chrome px-4 py-3 sm:px-5">
        <div>
          <p className={`${monoLabel} text-muted`}>
            Prompt <span className="font-sans tabular-nums">{String(number).padStart(2, '0')}</span>
          </p>
          <h3 className="mt-1 text-[1.15rem] leading-tight font-bold tracking-[-0.02em]">{prompt.title}</h3>
        </div>
        <button
          type="button"
          onClick={copy}
          className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-md border-2 border-ink px-3 py-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
            copied ? 'bg-mint' : 'bg-signal hover:bg-ink hover:text-white'
          }`}
        >
          {copied ? <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          <span aria-live="polite">{label}</span>
        </button>
      </div>
      <pre
        ref={textRef}
        className="max-h-[28rem] overflow-auto px-4 py-4 font-mono text-[0.82rem] leading-relaxed whitespace-pre-wrap text-ink/85 sm:px-5"
      >
        <PromptText text={prompt.text} />
      </pre>
    </li>
  )
}

export function GuidePrompts({ prompts }: { prompts: GuidePrompt[] }) {
  return (
    <>
      <ul className="grid gap-2 sm:grid-cols-2">
        {prompts.map((prompt, index) => (
          <li key={prompt.id}>
            <a
              href={`#prompt-${prompt.id}`}
              className="flex h-full gap-3 rounded-md border-2 border-ink bg-white px-4 py-3 no-underline transition-colors hover:bg-butter focus-visible:bg-butter focus-visible:outline-none"
            >
              <span className="font-sans text-[0.8rem] tabular-nums text-muted">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-bold leading-tight">{prompt.title}</span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-muted">{prompt.description}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.95rem] text-muted">
        Replace the <mark className="rounded-sm bg-butter px-0.5 text-ink">[highlighted parts]</mark> with your own details before you paste.
      </p>
      <ol className="mt-8 grid gap-5">
        {prompts.map((prompt, index) => (
          <PromptCard key={prompt.id} prompt={prompt} number={index + 1} />
        ))}
      </ol>
    </>
  )
}
