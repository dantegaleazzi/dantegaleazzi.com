import { Download, Pause, Play, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChatDiagram } from './ChatDiagram'
import { allTools, chatExamples, chatInfo, type ChatExampleId, type ChatNodeId } from './chatContent'
import { coverages, examples, fields, flowInfo, pageCopy, systemInfo, type ExampleId, type FlowNodeId, type NodeInfo, type SystemNodeId } from './content'
import { exportPng, exportSvg } from './exportImage'
import { FlowDiagram } from './FlowDiagram'
import { RoadmapDiagram } from './RoadmapDiagram'
import { SystemDiagram } from './SystemDiagram'

type View = 'link' | 'chat' | 'system'

const views: { id: View; label: string }[] = [
  { id: 'link', label: '01 · How STED reads a link' },
  { id: 'chat', label: '02 · How Ask Sted uses it' },
  { id: 'system', label: 'System map' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2'

// The website's styles, so the page sits naturally inside the site frame.
const ui = {
  root: 'text-ink',
  container: 'py-6',
  muted: 'text-muted',
  faint: 'text-ink/45',
  body: 'text-ink/80',
  accent: 'inline-block bg-signal px-1.5 py-0.5 text-ink',
  card: 'rounded-lg border-2 border-ink bg-white p-5 sm:p-6',
  frame: 'overflow-x-auto',
  bar: 'rounded-lg border-2 border-ink bg-white px-4 py-3',
  control: `inline-flex items-center gap-2 rounded-md border-2 border-ink px-3.5 py-2 text-[0.88rem] font-bold transition-colors ${focusRing} focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40`,
  quiet: 'bg-white text-ink hover:bg-butter',
  primary: 'bg-signal text-ink hover:bg-ink hover:text-white',
  exampleOn: 'bg-signal text-ink',
  exampleOff: 'bg-white text-ink/80 hover:bg-butter',
  tabs: 'inline-flex flex-wrap gap-1 rounded-lg border-2 border-ink bg-white p-1',
  tab: `rounded-md px-4 py-2 text-[0.88rem] font-bold transition-colors ${focusRing} focus-visible:outline-ink`,
  tabOn: 'bg-ink text-white',
  tabOff: 'text-ink/70 hover:bg-butter hover:text-ink',
  toggle: `relative h-5 w-9 rounded-full border-2 border-ink bg-white transition-colors peer-checked:bg-signal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink after:absolute after:top-0.5 after:left-0.5 after:size-3 after:rounded-full after:bg-ink after:transition-transform peer-checked:after:translate-x-4`,
  label: 'text-ink/80',
  found: 'text-[#23865a]',
  missing: 'text-[#c23b2c]',
  na: 'text-ink/40',
  rule: 'border-ink/15',
  error: 'text-[#c23b2c]',
  summaryHover: 'hover:text-ink',
}

const quiet = `${ui.control} ${ui.quiet}`
const primary = `${ui.control} ${ui.primary}`
const mono = 'font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]'
const card = ui.card

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

function ExampleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`${ui.control} ${active ? ui.exampleOn : ui.exampleOff}`}
    >
      {children}
    </button>
  )
}

function Detail({ info, empty }: { info: NodeInfo | null; empty: string }) {
  if (!info) {
    return (
      <>
        <p className={`${mono} ${ui.muted}`}>Explore</p>
        <p className={`mt-2 max-w-2xl leading-[1.55] ${ui.body}`}>{empty}</p>
      </>
    )
  }
  return (
    <>
      <p className={`${mono} ${ui.accent}`}>{info.kicker}</p>
      <h2 className="mt-2 text-[1.5rem] leading-tight font-bold tracking-[-0.03em]">{info.title}</h2>
      <p className={`mt-2 max-w-2xl leading-[1.55] ${ui.body}`}>{info.summary}</p>
      {info.technical && (
        <details className="mt-4 max-w-2xl">
          <summary className={`${mono} cursor-pointer ${ui.muted} ${ui.summaryHover} ${focusRing}`}>
            Technical detail
          </summary>
          <p className={`mt-2 leading-[1.55] ${ui.muted}`}>{info.technical}</p>
        </details>
      )}
    </>
  )
}

export function ArchitecturePage() {
  const reducedMotion = usePrefersReducedMotion()
  const [view, setView] = useState<View>('link')
  const [exampleId, setExampleId] = useState<ExampleId>('article')
  const [chatExampleId, setChatExampleId] = useState<ChatExampleId>('search')
  const [playing, setPlaying] = useState(!reducedMotion)
  const [runId, setRunId] = useState(0)
  const [showRecovery, setShowRecovery] = useState(true)
  const [flowSelected, setFlowSelected] = useState<FlowNodeId | null>(null)
  const [chatSelected, setChatSelected] = useState<string | null>(null)
  const [systemSelected, setSystemSelected] = useState<SystemNodeId | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  const svgRef = useRef<SVGSVGElement>(null)
  const roadmapRef = useRef<SVGSVGElement>(null)

  const example = examples.find(({ id }) => id === exampleId)!
  const chatExample = chatExamples.find(({ id }) => id === chatExampleId)!
  const coverage = coverages.find(({ id }) => id === example.coverage)!
  const frozen = reducedMotion || exporting

  useEffect(() => {
    const previous = document.title
    document.title = pageCopy.title
    return () => {
      document.title = previous
    }
  }, [])

  const restart = () => {
    setRunId((run) => run + 1)
    setPlaying(!reducedMotion)
  }

  const switchView = (next: View) => {
    setView(next)
    restart()
  }

  const handleFinished = useCallback(() => setPlaying(false), [])

  const selectFlow = (id: FlowNodeId) => {
    // The bridge card at the end of step 01 opens step 02.
    if (id === 'next') switchView('chat')
    else setFlowSelected(id)
  }

  const runExport = async (format: 'png' | 'svg', target: 'main' | 'roadmap' = 'main') => {
    setExportError('')
    setExporting(true)
    try {
      await nextFrame()
      const svg = target === 'roadmap' ? roadmapRef.current : svgRef.current
      if (!svg) throw new Error('Nothing to export yet.')
      const base =
        target === 'roadmap'
          ? 'sted-02-ask-sted-roadmap'
          : view === 'link'
            ? `sted-01-link-pipeline-${example.id}`
            : view === 'chat'
              ? `sted-02-ask-sted-${chatExample.id}`
              : 'sted-system-map'
      const name = `${base}-1920x1080.${format}`
      await (format === 'png' ? exportPng(svg, name) : exportSvg(svg, name))
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Export failed.')
    } finally {
      setExporting(false)
    }
  }

  const chatDetail = (): NodeInfo | null => {
    if (!chatSelected) return null
    if (chatSelected.startsWith('tool:')) {
      const tool = allTools.find(({ id }) => `tool:${id}` === chatSelected)!
      return { kicker: 'Server tool', title: tool.name, summary: tool.rule, technical: [`Technical name: ${tool.technical}.`, tool.note, 'Our backend executes it; the AI Provider only requests it.'].filter(Boolean).join(' ') }
    }
    return chatInfo[chatSelected as ChatNodeId]
  }

  const info: NodeInfo | null =
    view === 'link' ? (flowSelected ? flowInfo[flowSelected] : null) : view === 'chat' ? chatDetail() : systemSelected ? systemInfo[systemSelected] : null

  const animated = view !== 'system'

  return (
    <div className={ui.root}>
      <div className={ui.container}>
        <p className={`${mono} ${ui.muted}`}>STED · RevenueCat Shipaton 2026 · Architecture</p>

        {/* Each diagram draws its own title (so exports keep it); this copy is for screen readers. */}
        <div className="sr-only">
          <h1>{pageCopy.title}</h1>
          <p>{pageCopy.subtitle}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className={ui.tabs} role="group" aria-label="Diagram">
            {views.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => switchView(id)}
                className={`${ui.tab} ${view === id ? ui.tabOn : ui.tabOff}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={primary} onClick={() => runExport('png')} disabled={exporting}>
              <Download className="size-4" aria-hidden="true" />
              {exporting ? 'Exporting…' : 'Export PNG'}
            </button>
            <button type="button" className={quiet} onClick={() => runExport('svg')} disabled={exporting}>
              <Download className="size-4" aria-hidden="true" />
              Export SVG
            </button>
          </div>
        </div>
        {exportError && (
          <p className={`mt-2 text-[0.85rem] ${ui.error}`} role="alert">
            {exportError}
          </p>
        )}

        {animated && (
          <div className={`mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 ${ui.bar}`}>
            <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Example">
              <span className={`${mono} mr-1 ${ui.muted}`}>Example</span>
              {view === 'link'
                ? examples.map(({ id, label, coverage: level }) => (
                    <ExampleButton
                      key={id}
                      active={exampleId === id}
                      onClick={() => {
                        setExampleId(id)
                        restart()
                      }}
                    >
                      {label}
                      <span className={`${mono} text-[0.6rem] opacity-70`}>{coverages.find((item) => item.id === level)!.label}</span>
                    </ExampleButton>
                  ))
                : chatExamples.map(({ id, label }) => (
                    <ExampleButton
                      key={id}
                      active={chatExampleId === id}
                      onClick={() => {
                        setChatExampleId(id)
                        restart()
                      }}
                    >
                      {label}
                    </ExampleButton>
                  ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={quiet} onClick={() => setPlaying((current) => !current)} disabled={reducedMotion}>
                {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                {playing ? 'Pause' : 'Play'}
              </button>
              <button type="button" className={quiet} onClick={restart} disabled={reducedMotion}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Replay
              </button>
              {view === 'link' && (
                <label className={`inline-flex cursor-pointer items-center gap-2.5 text-[0.85rem] ${ui.label}`}>
                  <input type="checkbox" className="peer sr-only" checked={showRecovery} onChange={(event) => setShowRecovery(event.target.checked)} />
                  <span className={ui.toggle} aria-hidden="true" />
                  Show recovery providers
                </label>
              )}
            </div>
            {reducedMotion && <p className={`text-[0.8rem] ${ui.muted}`}>Reduced motion is on, so the walkthrough shows its final state.</p>}
          </div>
        )}

        {/* Diagrams scroll sideways on small screens instead of shrinking into illegibility */}
        <div className={`mt-4 ${ui.frame}`}>
          <div className="min-w-[1080px]">
            {view === 'link' && (
              <FlowDiagram
                example={example}
                showRecovery={showRecovery}
                playing={playing}
                runId={runId}
                frozen={frozen}
                exporting={exporting}
                selected={flowSelected}
                onSelect={selectFlow}
                onFinished={handleFinished}
                svgRef={svgRef}
              />
            )}
            {view === 'chat' && (
              <ChatDiagram
                example={chatExample}
                playing={playing}
                runId={runId}
                frozen={frozen}
                exporting={exporting}
                selected={chatSelected}
                onSelect={setChatSelected}
                onFinished={handleFinished}
                svgRef={svgRef}
              />
            )}
            {view === 'system' && <SystemDiagram exporting={exporting} selected={systemSelected} onSelect={setSystemSelected} svgRef={svgRef} />}
          </div>
        </div>
        <p className={`mt-2 text-[0.78rem] lg:hidden ${ui.faint}`}>Scroll sideways to see the whole map.</p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[3fr_2fr]">
          <section className={card} aria-live="polite" aria-label="Selected part">
            <Detail
              info={info}
              empty={
                view === 'chat'
                  ? 'Click or tab to any step or tool. Tools show their technical name here and on hover.'
                  : 'Click or tab to any part of the diagram for a short explanation and the technical detail.'
              }
            />
          </section>

          <section className={card} aria-label="About this example">
            {view === 'link' && (
              <>
                <p className={`${mono} ${ui.muted}`}>This walkthrough · {example.label}</p>
                <p className={`mt-2 leading-[1.5] ${ui.body}`}>{example.note}</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[0.88rem]">
                  {fields.map(({ id, label }) => (
                    <li key={id} className={`flex items-center justify-between gap-2 border-b py-1 ${ui.rule}`}>
                      <span className={ui.muted}>{label}</span>
                      <span className={example.fields[id] === 'found' ? ui.found : example.fields[id] === 'missing' ? ui.missing : ui.na}>
                        {example.fields[id] === 'found' ? 'Found' : example.fields[id] === 'missing' ? 'Missing' : 'n/a'}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-3 text-[0.88rem] ${ui.muted}`}>
                  Coverage: <span style={{ color: coverage.color }}>{coverage.label}</span> · {example.result}
                </p>
              </>
            )}
            {view === 'chat' && (
              <>
                <p className={`${mono} ${ui.muted}`}>This walkthrough · {chatExample.label}</p>
                <p className="mt-2 font-medium">{chatExample.route === 'url' ? chatExample.message : `“${chatExample.message}”`}</p>
                <p className={`mt-2 leading-[1.5] ${ui.body}`}>{chatExample.note}</p>
              </>
            )}
            {view === 'system' && (
              <>
                <p className={`${mono} ${ui.muted}`}>About this map</p>
                <p className={`mt-2 leading-[1.5] ${ui.body}`}>
                  A conceptual view of the V2 design behind the iOS app: one capture pipeline, Supabase for auth and saved knowledge, Ask Sted as a separate service,
                  and RevenueCat for subscriptions.
                </p>
                <p className={`mt-3 text-[0.88rem] ${ui.muted}`}>{pageCopy.integrationNote}</p>
              </>
            )}
          </section>
        </div>

        {view === 'chat' && (
          <section className="mt-10" aria-labelledby="roadmap-title">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={`${mono} ${ui.muted}`}>Roadmap · not current features</p>
                <h2 id="roadmap-title" className="mt-1 text-[1.6rem] font-bold tracking-[-0.03em]">
                  What comes next
                </h2>
              </div>
              <button type="button" className={quiet} onClick={() => runExport('png', 'roadmap')} disabled={exporting}>
                <Download className="size-4" aria-hidden="true" />
                Export roadmap PNG
              </button>
            </div>
            <div className={`mt-4 ${ui.frame}`}>
              <div className="min-w-[1080px]">
                <RoadmapDiagram svgRef={roadmapRef} />
              </div>
            </div>
          </section>
        )}

        <p className={`${mono} mt-6 text-[0.62rem] leading-relaxed ${ui.faint}`}>
          {pageCopy.integrationNote} {pageCopy.walkthroughNote} Examples are fictional. Nothing on this page calls STED’s services or sends links anywhere.
        </p>
      </div>
    </div>
  )
}
