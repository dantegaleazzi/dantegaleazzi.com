import { ArrowLeft, Download, Pause, Play, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChatDiagram } from './ChatDiagram'
import { allTools, chatExamples, chatInfo, type ChatExampleId, type ChatNodeId } from './chatContent'
import { coverages, examples, fields, flowInfo, pageCopy, palette, systemInfo, type ExampleId, type FlowNodeId, type NodeInfo, type SystemNodeId } from './content'
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

const control =
  'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.85rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd400] disabled:cursor-not-allowed disabled:opacity-40'
const quiet = `${control} border-[#2a2e35] bg-[#121418] text-[#f2efe6] hover:border-[#5d616a]`
const primary = `${control} border-[#ffd400] bg-[#ffd400] text-[#0b0c0e] hover:bg-[#ffe45c]`
const mono = 'font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]'
const card = 'rounded-2xl border border-[#1f2228] bg-[#101215] p-5 sm:p-6'

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
      className={`${control} ${active ? 'border-[#ffd400] bg-[#ffd400]/12 text-[#ffd400]' : 'border-[#2a2e35] bg-transparent text-[#c9c6bd] hover:border-[#5d616a]'}`}
    >
      {children}
    </button>
  )
}

function Detail({ info, empty }: { info: NodeInfo | null; empty: string }) {
  if (!info) {
    return (
      <>
        <p className={`${mono} text-[#8d919a]`}>Explore</p>
        <p className="mt-2 max-w-2xl leading-[1.55] text-[#c9c6bd]">{empty}</p>
      </>
    )
  }
  return (
    <>
      <p className={`${mono} text-[#ffd400]`}>{info.kicker}</p>
      <h2 className="mt-2 text-[1.5rem] leading-tight font-bold tracking-[-0.03em]">{info.title}</h2>
      <p className="mt-2 max-w-2xl leading-[1.55] text-[#c9c6bd]">{info.summary}</p>
      {info.technical && (
        <details className="mt-4 max-w-2xl">
          <summary className={`${mono} cursor-pointer text-[#8d919a] hover:text-[#f2efe6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd400]`}>
            Technical detail
          </summary>
          <p className="mt-2 leading-[1.55] text-[#8d919a]">{info.technical}</p>
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
    const previous = { title: document.title, background: document.body.style.background }
    document.title = pageCopy.title
    document.body.style.background = palette.bg
    return () => {
      document.title = previous.title
      document.body.style.background = previous.background
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
      return { kicker: 'Server tool', title: tool.name, summary: tool.rule, technical: `Technical name: ${tool.technical}. Our backend executes it; the AI Provider only requests it.` }
    }
    return chatInfo[chatSelected as ChatNodeId]
  }

  const info: NodeInfo | null =
    view === 'link' ? (flowSelected ? flowInfo[flowSelected] : null) : view === 'chat' ? chatDetail() : systemSelected ? systemInfo[systemSelected] : null

  const animated = view !== 'system'

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f2efe6]">
      <div className="mx-auto w-[min(100%-2rem,96rem)] py-5 sm:py-7">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center gap-2 text-[0.85rem] text-[#8d919a] no-underline hover:text-[#f2efe6]">
            <ArrowLeft className="size-4" aria-hidden="true" />
            dantegaleazzi.com
          </a>
          <p className={`${mono} text-[#8d919a]`}>STED · RevenueCat Shipaton 2026</p>
        </header>

        {/* Each diagram draws its own title (so exports keep it); this copy is for screen readers. */}
        <div className="sr-only">
          <h1>{pageCopy.title}</h1>
          <p>{pageCopy.subtitle}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex flex-wrap rounded-3xl border border-[#2a2e35] bg-[#121418] p-1" role="group" aria-label="Diagram">
            {views.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => switchView(id)}
                className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd400] ${
                  view === id ? 'bg-[#f2efe6] text-[#0b0c0e]' : 'text-[#8d919a] hover:text-[#f2efe6]'
                }`}
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
          <p className="mt-2 text-[0.85rem] text-[#ff6b6b]" role="alert">
            {exportError}
          </p>
        )}

        {animated && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-[#1f2228] bg-[#101215] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Example">
              <span className={`${mono} mr-1 text-[#8d919a]`}>Example</span>
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
                <label className="inline-flex cursor-pointer items-center gap-2.5 text-[0.85rem] text-[#c9c6bd]">
                  <input type="checkbox" className="peer sr-only" checked={showRecovery} onChange={(event) => setShowRecovery(event.target.checked)} />
                  <span
                    className="relative h-5 w-9 rounded-full border border-[#2a2e35] bg-[#121418] transition-colors peer-checked:border-[#7a7f89] peer-checked:bg-[#2a2e35] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffd400] after:absolute after:top-0.5 after:left-0.5 after:size-3.5 after:rounded-full after:bg-[#8d919a] after:transition-transform peer-checked:after:translate-x-4 peer-checked:after:bg-[#f2efe6]"
                    aria-hidden="true"
                  />
                  Show recovery providers
                </label>
              )}
            </div>
            {reducedMotion && <p className="text-[0.8rem] text-[#8d919a]">Reduced motion is on, so the walkthrough shows its final state.</p>}
          </div>
        )}

        {/* Diagrams scroll sideways on small screens instead of shrinking into illegibility */}
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#1f2228]">
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
        <p className="mt-2 text-[0.78rem] text-[#5d616a] lg:hidden">Scroll sideways to see the whole map.</p>

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
                <p className={`${mono} text-[#8d919a]`}>This walkthrough · {example.label}</p>
                <p className="mt-2 leading-[1.5] text-[#c9c6bd]">{example.note}</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[0.88rem]">
                  {fields.map(({ id, label }) => (
                    <li key={id} className="flex items-center justify-between gap-2 border-b border-[#1f2228] py-1">
                      <span className="text-[#8d919a]">{label}</span>
                      <span className={example.fields[id] === 'found' ? 'text-[#5fd6a0]' : example.fields[id] === 'missing' ? 'text-[#ff6b6b]' : 'text-[#5d616a]'}>
                        {example.fields[id] === 'found' ? 'Found' : example.fields[id] === 'missing' ? 'Missing' : 'n/a'}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.88rem] text-[#8d919a]">
                  Coverage: <span style={{ color: coverage.color }}>{coverage.label}</span> · {example.result}
                </p>
              </>
            )}
            {view === 'chat' && (
              <>
                <p className={`${mono} text-[#8d919a]`}>This walkthrough · {chatExample.label}</p>
                <p className="mt-2 font-medium">{chatExample.route === 'url' ? chatExample.message : `“${chatExample.message}”`}</p>
                <p className="mt-2 leading-[1.5] text-[#c9c6bd]">{chatExample.note}</p>
              </>
            )}
            {view === 'system' && (
              <>
                <p className={`${mono} text-[#8d919a]`}>About this map</p>
                <p className="mt-2 leading-[1.5] text-[#c9c6bd]">
                  A conceptual view of the V2 design behind the iOS app: one capture pipeline, Supabase for auth and saved knowledge, Ask Sted as a separate service,
                  and RevenueCat for subscriptions.
                </p>
                <p className="mt-3 text-[0.88rem] text-[#8d919a]">{pageCopy.integrationNote}</p>
              </>
            )}
          </section>
        </div>

        {view === 'chat' && (
          <section className="mt-10" aria-labelledby="roadmap-title">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={`${mono} text-[#8d919a]`}>Roadmap · not current features</p>
                <h2 id="roadmap-title" className="mt-1 text-[1.6rem] font-bold tracking-[-0.03em]">
                  What comes next
                </h2>
              </div>
              <button type="button" className={quiet} onClick={() => runExport('png', 'roadmap')} disabled={exporting}>
                <Download className="size-4" aria-hidden="true" />
                Export roadmap PNG
              </button>
            </div>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#1f2228]">
              <div className="min-w-[1080px]">
                <RoadmapDiagram svgRef={roadmapRef} />
              </div>
            </div>
          </section>
        )}

        <p className={`${mono} mt-6 text-[0.62rem] leading-relaxed text-[#5d616a]`}>
          {pageCopy.integrationNote} {pageCopy.walkthroughNote} Examples are fictional. Nothing on this page calls STED’s services or sends links anywhere.
        </p>
      </div>
    </div>
  )
}
