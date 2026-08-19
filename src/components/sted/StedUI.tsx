import { Bell, File, FileText, Folder, Link2, MessageCircle, Search, SlidersHorizontal, Sparkles, StickyNote, Sun, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export type StedColor = 'blue' | 'green' | 'pink' | 'purple' | 'orange' | 'red' | 'cyan' | 'gray'
export type StedContentType = 'image' | 'link' | 'article' | 'note' | 'conversation' | 'file'
export type StedTab = 'Today' | 'Projects' | 'Library' | 'Ask'

const colorClass: Record<StedColor, string> = {
  blue: 'bg-sted-blue',
  green: 'bg-sted-green',
  pink: 'bg-sted-pink',
  purple: 'bg-sted-purple',
  orange: 'bg-orange',
  red: 'bg-sted-red',
  cyan: 'bg-sted-cyan',
  gray: 'bg-sted-gray',
}

export const contentTypeColor: Record<StedContentType, StedColor> = {
  image: 'pink',
  link: 'blue',
  article: 'purple',
  note: 'green',
  conversation: 'cyan',
  file: 'gray',
}

export function StedColorDot({ color, label, className = '' }: { color: StedColor; label?: string; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 ${className}`}><span className={`size-2.5 rounded-full border border-sted-border ${colorClass[color]}`} aria-hidden="true" />{label && <span>{label}</span>}</span>
}

export function StedTag({ color, children }: { color: StedColor; children: ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-sted-border/30 bg-sted-surface px-2 py-1 font-mono text-[0.55rem] font-medium uppercase tracking-[0.06em]"><StedColorDot color={color} />{children}</span>
}

export function StedMetadata({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[0.58rem] uppercase tracking-[0.07em] text-sted-muted">{children}</p>
}

export function StedHeader({ title, action }: { title: string; action?: 'bell' | 'plus' | 'tools' }) {
  return <div className="flex items-start justify-between gap-3"><div>{title === 'Today' ? <h2 className="text-[2.3rem] font-bold leading-none tracking-[-0.08em]">sted<span className="text-signal">.</span></h2> : <h2 className="font-mono text-[1.55rem] font-medium uppercase tracking-[-0.04em]">{title}</h2>}</div>{action === 'bell' && <button className="relative grid size-10 place-items-center rounded-md border-2 border-sted-border bg-sted-surface" aria-label="Notifications"><Bell size={18} /><span className="absolute -right-1 -top-1 grid size-4 place-items-center border border-sted-border bg-signal font-mono text-[0.52rem]">3</span></button>}{action === 'plus' && <button className="grid size-10 place-items-center rounded-md border-2 border-sted-border bg-signal" aria-label="Add project"><span className="text-2xl leading-none">+</span></button>}{action === 'tools' && <div className="flex gap-2"><button className="grid size-10 place-items-center rounded-md border-2 border-sted-border bg-sted-surface" aria-label="Filter"><SlidersHorizontal size={17} /></button><button className="grid size-10 place-items-center rounded-md border-2 border-sted-border bg-sted-surface" aria-label="Search"><Search size={18} /></button></div>}</div>
}

export function StedSearch({ placeholder }: { placeholder: string }) {
  return <div className="mt-4 flex items-center gap-2 rounded-md border-2 border-sted-border bg-sted-surface px-3 py-2.5"><Search size={15} className="shrink-0 text-sted-muted" /><span className="font-mono text-[0.65rem] text-sted-muted">{placeholder}</span></div>
}

const tabs: { label: StedTab; Icon: LucideIcon }[] = [{ label: 'Today', Icon: Sun }, { label: 'Projects', Icon: Folder }, { label: 'Library', Icon: FileText }, { label: 'Ask', Icon: Sparkles }]

export function StedBottomNav({ active }: { active: StedTab }) {
  return <nav className="grid grid-cols-4 border-t-2 border-sted-border bg-sted-surface px-2 pt-2 pb-1" aria-label="Sted navigation">{tabs.map(({ label, Icon }) => { const selected = active === label; return <button key={label} className={`flex min-w-0 flex-col items-center gap-1 py-1 font-mono text-[0.48rem] uppercase ${selected ? 'text-ink' : 'text-sted-muted'}`} type="button"><span className={`grid size-8 place-items-center rounded-md border-2 border-sted-border ${selected ? 'bg-signal' : 'bg-transparent'}`}><Icon size={15} strokeWidth={1.8} /></span>{label}</button> })}</nav>
}

export function StedPhoneFrame({ children, label }: { children: ReactNode; label: string }) {
  return <article className="flex flex-col overflow-hidden rounded-[1.15rem] border-2 border-sted-border bg-paper shadow-[5px_6px_0_#252525]"><div className="flex items-center justify-between border-b-2 border-sted-border px-4 py-2 font-mono text-[0.54rem] uppercase text-sted-muted"><span>9:41</span><span>{label}</span><span>●●●</span></div>{children}</article>
}

export function StedSectionLabel({ children, color = 'gray' }: { children: ReactNode; color?: StedColor }) {
  return <p className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.07em]"><StedColorDot color={color} />{children}</p>
}

export function StedContentIcon({ type }: { type: StedContentType }) {
  const icons: Record<StedContentType, LucideIcon | undefined> = {
    image: undefined,
    link: Link2,
    article: FileText,
    note: StickyNote,
    conversation: MessageCircle,
    file: File,
  }
  const Icon = icons[type]
  return Icon ? <Icon size={17} strokeWidth={1.7} /> : <span className="block h-full w-full bg-[linear-gradient(135deg,transparent_39%,rgba(0,0,0,.22)_40%_59%,transparent_60%)]" />
}
