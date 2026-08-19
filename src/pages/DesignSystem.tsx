import { ArrowRight, Code2, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { designSystemRegistry } from '../lib/design-system/registry'
import { ProjectsSection } from '../components/ProjectsSection'
import { WorkflowCards } from '../components/WorkflowCards'
import { FreeResources } from '../components/FreeResources'
import { NewsletterSection } from '../components/NewsletterSection'
import { StartHere } from '../components/StartHere'

const foundationTokens = [
  { name: 'Paper', value: '#f7f2e8', className: 'bg-paper text-ink' },
  { name: 'Ink', value: '#1e1e1e', className: 'bg-ink text-white' },
  { name: 'Signal Yellow', value: '#ffd400', className: 'bg-signal text-ink' },
  { name: 'Orange', value: '#ff5c1a', className: 'bg-orange text-white' },
]

const stedColorTokens = [
  { name: 'Blue', token: '--color-sted-blue', value: '#7894a8', use: 'research / links', className: 'bg-sted-blue' },
  { name: 'Green', token: '--color-sted-green', value: '#829a78', use: 'active / complete', className: 'bg-sted-green' },
  { name: 'Pink', token: '--color-sted-pink', value: '#c6929e', use: 'people / inspiration', className: 'bg-sted-pink' },
  { name: 'Purple', token: '--color-sted-purple', value: '#9586a7', use: 'AI / connections', className: 'bg-sted-purple' },
  { name: 'Orange', token: '--color-sted-orange', value: '#ff5c1a', use: 'attention / discovery', className: 'bg-orange' },
  { name: 'Red', token: '--color-sted-red', value: '#b7665d', use: 'warning / correction', className: 'bg-sted-red' },
  { name: 'Cyan', token: '--color-sted-cyan', value: '#80afb2', use: 'media / conversation', className: 'bg-sted-cyan' },
  { name: 'Neutral Gray', token: '--color-sted-gray', value: '#c7c0b4', use: 'archived / inactive', className: 'bg-sted-gray' },
]

const brightPalette = [
  { name: 'Blue', hex: '#3D8BFF', use: 'research / links', token: '--color-sted-bright-blue', text: '#1e1e1e' },
  { name: 'Green', hex: '#36B86A', use: 'active / complete', token: '--color-sted-bright-green', text: '#1e1e1e' },
  { name: 'Pink', hex: '#F25F9B', use: 'people / inspiration', token: '--color-sted-bright-pink', text: '#1e1e1e' },
  { name: 'Purple', hex: '#8B5CF6', use: 'AI / connections', token: '--color-sted-bright-purple', text: '#fff' },
  { name: 'Orange', hex: '#FF5C1A', use: 'attention / discovery', token: '--color-orange (existing)', text: '#1e1e1e' },
  { name: 'Red', hex: '#E94B3C', use: 'warning / correction', token: '--color-sted-bright-red', text: '#1e1e1e' },
  { name: 'Cyan', hex: '#25B8C5', use: 'media / conversation', token: '--color-sted-bright-cyan', text: '#1e1e1e' },
  { name: 'Yellow', hex: '#FFD400', use: 'signal / primary action', token: '--color-signal (existing)', text: '#1e1e1e' },
  { name: 'Lime', hex: '#9BD72F', use: 'progress / new', token: '--color-sted-bright-lime', text: '#1e1e1e', optional: true },
  { name: 'Sky', hex: '#54C7EC', use: 'information / external', token: '--color-sted-bright-sky', text: '#1e1e1e', optional: true },
]

const paletteComparison = [
  ['Blue', '#7894A8', '#3D8BFF'],
  ['Green', '#829A78', '#36B86A'],
  ['Pink', '#C6929E', '#F25F9B'],
  ['Purple', '#9586A7', '#8B5CF6'],
  ['Orange', '#FF5C1A', '#FF5C1A'],
  ['Red', '#B7665D', '#E94B3C'],
  ['Cyan', '#80AFB2', '#25B8C5'],
  ['Yellow', '#FFD400', '#FFD400'],
  ['Lime', '—', '#9BD72F'],
  ['Sky', '—', '#54C7EC'],
]

function SectionHeader({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className="mb-7 border-b-2 border-ink pb-4">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] opacity-60">{index} / Design system</p>
      <h2 className="mt-2 text-[clamp(2rem,4vw,4rem)] font-bold leading-none tracking-[-0.06em]">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-70">{description}</p>
    </div>
  )
}

export function DesignSystem() {
  useEffect(() => {
    const existingRobots = document.head.querySelector('meta[name="robots"]')
    const robots = existingRobots ?? document.createElement('meta')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'noindex, nofollow')
    if (!existingRobots) document.head.appendChild(robots)

    return () => {
      if (!existingRobots) robots.remove()
    }
  }, [])

  return (
    <div className="site-frame mx-auto w-[min(100%-1.5rem,90rem)] sm:w-[min(100%-2.5rem,90rem)]">
      <header className="site-header flex min-h-18 items-center justify-between gap-4">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em]">DANTE / PRIVATE SYSTEM</span>
        <span className="border border-ink bg-signal px-2 py-1 font-mono text-[0.6rem] uppercase">Internal only</span>
      </header>

      <main className="py-10 lg:py-16" id="design-system">
        <div className="mb-14 max-w-4xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] opacity-60">Visual language / component reference</p>
          <h1 className="mt-4 text-[clamp(3.4rem,8vw,8rem)] font-bold leading-[0.86] tracking-[-0.08em]">
            Dante design system
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75">
            A private reference for the reusable visual patterns already used by dantegaleazzi.com. This page is not part of the public navigation.
          </p>
        </div>

        <section aria-labelledby="foundations-title" className="mb-16">
          <SectionHeader index="01" title="Foundations" description="Core tokens and typography conventions that hold the interface together." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {foundationTokens.map((token) => (
              <div className="border-2 border-ink bg-white p-3" key={token.name}>
                <div className={`grid h-24 place-items-center border-2 border-ink font-mono text-xs uppercase ${token.className}`}>
                  {token.name}
                </div>
                <p className="mt-3 font-mono text-[0.68rem] uppercase">Color / {token.name}</p>
                <p className="mt-1 font-mono text-[0.68rem] opacity-60">{token.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 border-2 border-ink bg-white p-5 sm:grid-cols-3">
            <div><p className="font-mono text-[0.62rem] uppercase opacity-60">Display</p><p className="mt-2 text-3xl font-bold tracking-[-0.05em]">Space Grotesk</p></div>
            <div><p className="font-mono text-[0.62rem] uppercase opacity-60">Mono labels</p><p className="mt-2 font-mono text-xl uppercase">DM Mono</p></div>
            <div><p className="font-mono text-[0.62rem] uppercase opacity-60">Geometry</p><p className="mt-2 text-xl font-bold">2px borders / sharp blocks</p></div>
          </div>
          <div className="mt-5 border-2 border-ink bg-white p-5">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-60">Foundations / Color System</p><h3 className="mt-1 text-2xl font-bold tracking-[-0.04em]">Sted semantic palette</h3></div><span className="font-mono text-[0.58rem] uppercase opacity-50">muted / printed</span></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stedColorTokens.map((token) => <div className="border border-ink/30 p-2.5" key={token.name}><div className={`h-14 border border-ink/40 ${token.className}`} /><p className="mt-2 font-mono text-[0.64rem] font-bold uppercase">{token.name}</p><p className="mt-1 font-mono text-[0.56rem] opacity-60">{token.token}</p><p className="mt-1 text-xs opacity-65">{token.use}</p><p className="mt-2 font-mono text-[0.56rem] opacity-60">{token.value}</p></div>)}</div>
          </div>
          <section className="mt-8 border-2 border-ink bg-[#fffef8] p-5 sm:p-7" aria-labelledby="bright-palette-title">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
              <div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-60">Foundations / Exploration</p><h3 className="mt-1 text-3xl font-bold tracking-[-0.05em]" id="bright-palette-title">Sted Bright Palette — Exploration</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-70">A brighter comparison palette that keeps the warm-paper context while matching Signal Yellow and Orange. These are proposals only; current Sted tokens remain unchanged.</p></div><span className="border border-ink bg-signal px-2 py-1 font-mono text-[0.58rem] uppercase">Not shipped</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{brightPalette.map((color) => <article className="overflow-hidden border-2 border-ink bg-white" key={color.name}><div className="grid h-28 place-items-center font-mono text-sm font-bold uppercase" style={{ backgroundColor: color.hex, color: color.text }}>{color.name}</div><div className="p-3"><div className="flex items-center justify-between gap-2"><h4 className="font-mono text-[0.67rem] font-bold uppercase">{color.name}</h4>{color.optional && <span className="font-mono text-[0.52rem] uppercase opacity-55">Optional</span>}</div><p className="mt-1 font-mono text-[0.62rem]">{color.hex}</p><p className="mt-2 text-xs leading-snug opacity-70">{color.use}</p><p className="mt-3 break-words font-mono text-[0.55rem] opacity-60">{color.token}</p></div></article>)}</div>
            <div className="mt-8 border-t-2 border-ink pt-6"><div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-60">Muted → bright</p><h4 className="mt-1 text-2xl font-bold tracking-[-0.04em]">Palette Comparison</h4></div><span className="font-mono text-[0.56rem] uppercase opacity-55">current tokens stay active</span></div><div className="grid gap-2 sm:grid-cols-2">{paletteComparison.map(([name, muted, bright]) => <div className="grid grid-cols-[minmax(5rem,.7fr)_1fr_auto_1fr] items-center gap-2 border-b border-ink/20 py-2 font-mono text-[0.6rem] uppercase" key={name}><span className="font-bold">{name}</span><span className="flex items-center gap-2"><span className="size-4 border border-ink/30" style={{ backgroundColor: muted === '—' ? '#eeeae2' : muted }} />{muted}</span><span className="opacity-45">→</span><span className="flex items-center gap-2"><span className="size-4 border border-ink/30" style={{ backgroundColor: bright }} />{bright}</span></div>)}</div></div>
            <div className="mt-8 border-t-2 border-ink pt-6"><div className="mb-4"><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-60">Context demo / Sted UI</p><h4 className="mt-1 text-2xl font-bold tracking-[-0.04em]">Bright colors in context</h4></div><div className="grid gap-6 lg:grid-cols-2"><div className="border-2 border-ink bg-paper p-4"><p className="font-mono text-[0.6rem] uppercase opacity-60">Project tags</p><div className="mt-3 flex flex-wrap gap-2">{brightPalette.slice(0, 5).map((color) => <span className="inline-flex items-center gap-1.5 rounded-full border border-ink px-2.5 py-1.5 font-mono text-[0.58rem] font-bold uppercase" key={color.name}><span className="size-2.5 rounded-full border border-ink" style={{ backgroundColor: color.hex }} />{color.name === 'Blue' ? 'Research' : color.name === 'Green' ? 'Sted' : color.name === 'Pink' ? 'People' : color.name === 'Purple' ? 'AI' : 'Attention'}</span>)}</div><p className="mt-5 font-mono text-[0.6rem] uppercase opacity-60">Topic tags</p><div className="mt-3 flex flex-wrap gap-2">{brightPalette.slice(5).map((color) => <span className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-white px-2.5 py-1.5 font-mono text-[0.58rem] uppercase" key={color.name}><span className="size-2.5 rounded-full" style={{ backgroundColor: color.hex }} />{color.use.split(' / ')[0]}</span>)}</div></div><div className="border-2 border-ink bg-paper p-4"><p className="font-mono text-[0.6rem] uppercase opacity-60">Status dots / project color selector</p><div className="mt-3 flex flex-wrap gap-3">{brightPalette.map((color) => <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase" key={color.name}><span className="size-3 rounded-full border border-ink" style={{ backgroundColor: color.hex }} />{color.name}</span>)}</div><div className="mt-5 grid grid-cols-5 gap-2">{brightPalette.map((color) => <button className="grid aspect-square place-items-center border-2 border-ink" style={{ backgroundColor: color.hex }} aria-label={`Select ${color.name}`} type="button" key={color.name}><span className="size-2 border border-ink bg-white/70" /></button>)}</div><div className="mt-5 flex flex-wrap gap-2"><span className="border-2 border-ink bg-signal px-2 py-1 font-mono text-[0.58rem] font-bold uppercase">New</span><span className="border-2 border-ink px-2 py-1 font-mono text-[0.58rem] font-bold uppercase" style={{ backgroundColor: '#36B86A' }}>Complete</span><span className="border-2 border-ink px-2 py-1 font-mono text-[0.58rem] font-bold uppercase text-white" style={{ backgroundColor: '#8B5CF6' }}>AI insight</span><span className="border-2 border-ink px-2 py-1 font-mono text-[0.58rem] font-bold uppercase" style={{ backgroundColor: '#54C7EC' }}>External</span></div></div></div></div>
          </section>
        </section>

        <section aria-labelledby="primitives-title" className="mb-16">
          <SectionHeader index="02" title="Primitives" description="Small interface parts rendered in the same visual language as production components." />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="border-2 border-ink bg-white p-5">
              <p className="font-mono text-[0.62rem] uppercase opacity-60">Button / Primary Yellow</p>
              <button className="mt-5 flex items-center gap-2 border-2 border-ink bg-signal px-4 py-3 font-mono text-xs font-bold uppercase" type="button">Start free course <ArrowRight size={15} /></button>
              <p className="mt-4 text-xs opacity-60">default · hover · focus</p>
            </div>
            <div className="border-2 border-ink bg-white p-5">
              <p className="font-mono text-[0.62rem] uppercase opacity-60">Badge / Status</p>
              <div className="mt-5 flex flex-wrap gap-2"><span className="border border-ink bg-paper px-2 py-1 font-mono text-[0.62rem] uppercase">Coming soon</span><span className="border border-ink bg-orange px-2 py-1 font-mono text-[0.62rem] text-white uppercase">Affiliate</span></div>
              <p className="mt-4 text-xs opacity-60">coming-soon · category · affiliate</p>
            </div>
            <div className="border-2 border-ink bg-white p-5">
              <p className="font-mono text-[0.62rem] uppercase opacity-60">Input / Email</p>
              <div className="mt-5 flex border-2 border-ink"><Mail className="m-3" size={16} /><input className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none" placeholder="Enter your email" aria-label="Example email input" /></div>
              <p className="mt-4 text-xs opacity-60">default · focus signal inset</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="cards-title" className="mb-16">
          <SectionHeader index="03" title="Cards" description="Production card families shown with their real data and behavior." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designSystemRegistry.filter((entry) => entry.category === 'Cards').map((entry) => (
              <article className="border-2 border-ink bg-white p-5" key={entry.id}>
                <div className="flex items-start justify-between gap-3"><span className="grid size-11 place-items-center border-2 border-ink bg-signal"><Code2 size={18} /></span><span className="font-mono text-[0.58rem] uppercase opacity-55">{entry.id}</span></div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em]">{entry.name}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{entry.description}</p>
                <p className="mt-4 font-mono text-[0.62rem] uppercase opacity-55">{entry.variants.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sections-title" className="mb-16">
          <SectionHeader index="04" title="Sections" description="Live production sections below, rendered from the existing homepage components." />
          <div className="space-y-10">
            <div>
              <div className="mb-4 flex items-end justify-between border-b border-ink/25 pb-3">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-60">Section / Start Here</p>
                  <p className="mt-1 text-sm opacity-65">Four-card orientation grid · desktop 4-up · mobile 2-up</p>
                </div>
                <span className="hidden font-mono text-[0.58rem] uppercase opacity-50 sm:block">live component</span>
              </div>
              <StartHere />
            </div>
            <WorkflowCards />
            <FreeResources />
            <ProjectsSection />
            <NewsletterSection />
          </div>
        </section>

        <section aria-labelledby="registry-title" className="mb-16">
          <SectionHeader index="05" title="Registry" description="Stable names for future requests to coding agents and collaborators." />
          <div className="overflow-x-auto border-2 border-ink bg-white">
            <table className="w-full min-w-170 border-collapse text-left text-sm">
              <thead><tr className="border-b-2 border-ink bg-signal font-mono text-[0.62rem] uppercase"><th className="p-3">Name</th><th className="p-3">Component</th><th className="p-3">Category</th><th className="p-3">Variants</th></tr></thead>
              <tbody>{designSystemRegistry.map((entry) => <tr className="border-b border-ink/20 last:border-b-0" key={entry.id}><td className="p-3 font-medium">{entry.name}</td><td className="p-3 font-mono text-xs">{entry.component}</td><td className="p-3 font-mono text-xs uppercase opacity-65">{entry.category}</td><td className="p-3 text-xs opacity-65">{entry.variants.join(' · ')}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>
      <footer className="border-t-2 border-ink py-6 font-mono text-[0.68rem] uppercase opacity-65">Private design system · no public navigation</footer>
    </div>
  )
}
