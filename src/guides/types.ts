import type { LucideIcon } from 'lucide-react'

export type Tone = 'signal' | 'butter' | 'peach' | 'mint' | 'sky' | 'lilac' | 'white' | 'paper'

// Text fields accept "\n" for the designed line breaks (desktop only) and [[words]] for the yellow marker.
export type Visual =
  | { kind: 'banner'; text: string; tone?: Tone }
  | { kind: 'callout'; label: string; text: string; tone?: Tone }
  | { kind: 'note'; text: string }
  | { kind: 'window'; title: string; rows: { text: string; icon?: LucideIcon }[] }
  | { kind: 'chips'; items: { label: string; tone: Tone; text?: string }[] }
  | { kind: 'process'; joiner: '+' | '↓'; steps: { text: string; tone: Tone }[] }
  | { kind: 'cards'; items: { label: string; text: string; tone: Tone }[] }
  | { kind: 'checklist'; items: string[] }
  | { kind: 'questions'; items: string[] }
  | { kind: 'panels'; panels: { label: string; tone: Tone; items: string[] }[] }
  | { kind: 'evidence'; weak: string[]; strong: string[] }

export type GuideSection = {
  kicker: string
  title: string
  body: string[]
  visuals: Visual[]
  doThis?: string
  fromSted?: boolean
}

export type GuidePrompt = {
  id: string
  title: string
  description: string
  text: string
}

export type GuideTest = {
  name: string
  intro: string
  steps: string[]
  result: string
}

export type GuideLink = { href: string; label: string; title: string }

// Where a guide sits: its series breadcrumb, window file name and prev/next links.
export type GuideMeta = {
  title: string
  file: string
  crumb: { href: string; label: string }
  back: { href: string; label: string }
  part: string
  prev?: GuideLink
  next?: GuideLink
}

export type Guide = {
  number?: number
  chip?: string
  hook: string
  subtitle: string
  startHere: string
  notHere: string
  intro: string[]
  sections: GuideSection[]
  test: GuideTest
  takeaway: { title: string; body: string }
  questions: string[]
  prompts: GuidePrompt[]
}
