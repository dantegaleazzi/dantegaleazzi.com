import type { ReactNode, Ref } from 'react'
import { chatInfo, toolGroups, type ChatExample, type ChatNodeId } from './chatContent'
import { pageCopy, palette } from './content'
import { DiagramHeader, Footnote, H, StatusTag, W } from './DiagramChrome'
import { DiagramBackdrop } from './FlowDiagram'
import { BrandIcon, curve, NodeButton, Panel, SparkIcon, T } from './svgKit'
import { useRouteAnimation } from './useRouteAnimation'

type Box = { x: number; y: number; w: number; h: number }

const box: Record<ChatNodeId, Box> = {
  message: { x: 96, y: 330, w: 260, h: 92 },
  auth: { x: 96, y: 446, w: 260, h: 72 },
  router: { x: 96, y: 542, w: 260, h: 126 },
  capture: { x: 96, y: 700, w: 260, h: 62 },
  confirmation: { x: 96, y: 786, w: 260, h: 62 },
  deterministicNext: { x: 96, y: 872, w: 260, h: 138 },
  context: { x: 400, y: 330, w: 320, h: 350 },
  provider: { x: 830, y: 330, w: 330, h: 78 },
  sdk: { x: 830, y: 464, w: 330, h: 96 },
  tools: { x: 830, y: 616, w: 330, h: 76 },
  knowledge: { x: 830, y: 748, w: 330, h: 76 },
  answer: { x: 400, y: 868, w: 300, h: 122 },
  citations: { x: 740, y: 868, w: 220, h: 122 },
  persist: { x: 1000, y: 868, w: 220, h: 122 },
  response: { x: 1260, y: 868, w: 260, h: 122 },
  recapCandidate: { x: 1556, y: 868, w: 268, h: 122 },
}

const color: Partial<Record<ChatNodeId, string>> = {
  message: palette.input,
  auth: palette.input,
  router: palette.input,
  capture: palette.retrieval,
  confirmation: palette.storage,
  context: palette.storage,
  provider: palette.ai,
  sdk: palette.input,
  tools: palette.retrieval,
  knowledge: palette.storage,
  answer: palette.ai,
  citations: palette.evidence,
  persist: palette.storage,
  response: palette.input,
}

const TOOL_PANEL = { x: 1270, y: 322, w: 554, h: 396 }
const toolChip = (column: number, top: number, index: number) => ({ x: TOOL_PANEL.x + 16 + column * 269, y: top + index * 40, w: 253, h: 32 })
const toolLayout: { group: number; column: number; top: number }[] = [
  { group: 0, column: 0, top: 396 },
  { group: 1, column: 1, top: 396 },
  { group: 2, column: 0, top: 510 },
  { group: 3, column: 1, top: 510 },
  { group: 4, column: 0, top: 596 },
  { group: 5, column: 0, top: 670 },
]

type Segment = { d: string; to: ChatNodeId }

// The two routes a message can take. Node order follows the pulse.
function route(example: ChatExample): Segment[] {
  const start: Segment[] = [
    { d: 'M 226 422 V 446', to: 'auth' },
    { d: 'M 226 518 V 542', to: 'router' },
  ]
  if (example.route === 'url') {
    return [
      ...start,
      { d: 'M 160 668 V 700', to: 'capture' },
      { d: 'M 226 762 V 786', to: 'confirmation' },
      { d: 'M 356 817 H 370 Q 378 817 378 825 V 1008 Q 378 1016 386 1016 H 1382 Q 1390 1016 1390 1008 V 990', to: 'response' },
    ]
  }
  const library: Segment[] = example.readsLibrary
    ? [
        { d: 'M 985 692 V 748', to: 'knowledge' },
        { d: 'M 1005 748 V 692', to: 'tools' },
      ]
    : []
  return [
    ...start,
    { d: curve(356, 640, 400, 600), to: 'context' },
    { d: curve(720, 512, 830, 512), to: 'sdk' },
    { d: 'M 985 464 V 408', to: 'provider' },
    { d: 'M 1160 369 C 1222 369, 1222 654, 1160 654', to: 'tools' },
    ...library,
    { d: 'M 830 654 C 768 654, 768 369, 830 369', to: 'provider' },
    { d: 'M 1005 408 V 464', to: 'sdk' },
    { d: 'M 830 548 H 745 Q 737 548 737 556 V 836 Q 737 846 727 846 H 560 Q 550 846 550 856 V 868', to: 'answer' },
    { d: 'M 700 929 H 740', to: 'citations' },
    { d: 'M 960 929 H 1000', to: 'persist' },
    { d: 'M 1220 929 H 1260', to: 'response' },
  ]
}

type ChatDiagramProps = {
  example: ChatExample
  playing: boolean
  runId: number
  frozen: boolean
  exporting: boolean
  selected: string | null
  onSelect: (id: string) => void
  onFinished: () => void
  svgRef: Ref<SVGSVGElement>
}

export function ChatDiagram({ example, playing, runId, frozen, exporting, selected, onSelect, onFinished, svgRef }: ChatDiagramProps) {
  const segments = route(example)
  const { reached, segmentRefs, pulseRef } = useRouteAnimation({
    segments: segments.length,
    playing,
    frozen,
    runKey: `${example.id}-${runId}`,
    onFinished,
  })

  // A node lights up once the pulse first reaches it; nodes off the route stay dim.
  const firstReach = new Map<ChatNodeId, number>([['message', 0]])
  segments.forEach(({ to }, index) => {
    if (!firstReach.has(to)) firstReach.set(to, index + 1)
  })
  const lit = (id: ChatNodeId) => (firstReach.get(id) ?? Infinity) <= reached
  const onRoute = (id: ChatNodeId) => firstReach.has(id)
  const pick = (id: string) => (exporting ? undefined : () => onSelect(id))
  const isSelected = (id: string) => !exporting && selected === id
  const activeTool = example.tool

  const node = (id: ChatNodeId, title: string, lines: string[], extra?: ReactNode) => {
    const { x, y, w, h } = box[id]
    const on = lit(id)
    return (
      <NodeButton key={id} label={`${chatInfo[id].title}: ${chatInfo[id].summary}`} onSelect={pick(id)} selected={isSelected(id)} ring={box[id]}>
        <Panel x={x} y={y} w={w} h={h} color={color[id] ?? palette.line} lit={on} fill={onRoute(id) ? palette.surface : '#0f1114'} />
        <T x={x + 18} y={y + 32} size={17} weight={700} spacing={-0.3} color={on ? palette.text : palette.muted}>
          {title}
        </T>
        {lines.map((line, index) => (
          <T key={line} x={x + 18} y={y + 54 + index * 19} size={13} color={palette.muted}>
            {line}
          </T>
        ))}
        {extra}
      </NodeButton>
    )
  }

  const context = box.context
  const panel = TOOL_PANEL
  const routeLabel = example.route === 'url' ? 'Route: Capture · no AI Provider' : `Tool: ${toolGroups.flatMap((group) => group.tools).find((tool) => tool.id === activeTool)?.name}`
  const messageWidth = Math.min(560, example.message.length * 9.4 + 34)

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${pageCopy.chatTitle} Walkthrough example: ${example.message}`}
      className="block h-auto w-full"
    >
      <defs>
        <filter id="chat-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="chat-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={palette.muted} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect width={W} height={H} fill={palette.bg} />
      <DiagramBackdrop />
      <DiagramHeader eyebrow={pageCopy.chatStep} title={pageCopy.chatTitle} subtitle={pageCopy.chatSubtitle} tag={pageCopy.walkthroughNote.replace('.', '')} />

      {/* Current example */}
      <T x={96} y={288} size={12.5} mono color={palette.muted}>
        EXAMPLE
      </T>
      <rect x={178} y={266} width={messageWidth} height={32} rx={16} fill={palette.surfaceRaised} stroke={palette.line} />
      <T x={194} y={287} size={15} color={palette.input}>
        {example.route === 'url' ? example.message : `“${example.message}”`}
      </T>
      <T x={178 + messageWidth + 16} y={287} size={12.5} mono color={example.route === 'url' ? palette.retrieval : palette.ai}>
        {routeLabel.toUpperCase()}
      </T>

      {/* Faint structure: every connection, so a still frame reads without the animation */}
      {[...route({ ...example, route: 'question', readsLibrary: true }), ...route({ ...example, route: 'url' }).slice(2)].map(({ d }, index) => (
        <path key={`base-${index}`} d={d} fill="none" stroke={palette.line} strokeWidth={1.8} />
      ))}
      <path d={`M 1160 676 H ${panel.x}`} fill="none" stroke={palette.line} strokeWidth={1.6} strokeDasharray="3 5" />

      {/* Entry: iOS message, auth, router */}
      {node('message', 'User message', ['iOS app · JSON request'], <BrandIcon brand="apple" x={box.message.x + box.message.w - 34} y={box.message.y + 18} size={16} color={palette.muted} />)}
      {node('auth', 'Authentication', ['& usage limits'])}
      {node(
        'router',
        'Request router',
        [],
        <>
          {[
            { label: 'Exact URL', target: 'Capture', active: example.route === 'url', tint: palette.retrieval },
            { label: 'Question', target: 'AI Provider + tools', active: example.route === 'question', tint: palette.ai },
          ].map(({ label, target, active, tint }, index) => {
            const y = box.router.y + 48 + index * 36
            const on = active && lit('router')
            return (
              <g key={label}>
                <rect x={box.router.x + 14} y={y} width={box.router.w - 28} height={28} rx={7} fill={on ? tint : palette.surfaceRaised} fillOpacity={on ? 0.14 : 1} stroke={on ? tint : palette.lineSoft} />
                <T x={box.router.x + 26} y={y + 19} size={13} weight={700} color={on ? palette.text : palette.muted}>
                  {label}
                </T>
                <T x={box.router.x + box.router.w - 26} y={y + 19} size={12} anchor="end" color={palette.muted}>
                  {target}
                </T>
              </g>
            )
          })}
        </>,
      )}
      {node('capture', 'Capture', ['Step 01 pipeline · no AI Provider'])}
      {node('confirmation', 'Save confirmation', ['Saved · Processing'])}

      {/* Next: broader deterministic routing */}
      <NodeButton label="Next: broader deterministic routing" onSelect={pick('deterministicNext')} selected={isSelected('deterministicNext')} ring={box.deterministicNext}>
        <rect x={box.deterministicNext.x} y={box.deterministicNext.y} width={box.deterministicNext.w} height={box.deterministicNext.h} rx={12} fill="none" stroke={palette.pending} strokeDasharray="4 5" />
        <StatusTag x={box.deterministicNext.x + 14} y={box.deterministicNext.y + 14} label="Next" color={palette.evidence} />
        <T x={box.deterministicNext.x + 14} y={box.deterministicNext.y + 58} size={14.5} weight={700}>
          Broader deterministic routing
        </T>
        {['Greetings, help, counts, periods:', 'safe handler when unambiguous.', 'Synthesis still uses the', 'AI Provider + tools.'].map((line, index) => (
          <T key={line} x={box.deterministicNext.x + 14} y={box.deterministicNext.y + 80 + index * 16} size={12} color={palette.muted}>
            {line}
          </T>
        ))}
      </NodeButton>

      {/* Conversation context: what is stored vs what the provider sees */}
      <NodeButton label={`${chatInfo.context.title}: ${chatInfo.context.summary}`} onSelect={pick('context')} selected={isSelected('context')} ring={context}>
        <Panel x={context.x} y={context.y} w={context.w} h={context.h} color={palette.storage} lit={lit('context')} fill={onRoute('context') ? palette.surface : '#0f1114'} />
        <T x={context.x + 18} y={context.y + 34} size={17} weight={700} color={lit('context') ? palette.text : palette.muted}>
          Conversation context
        </T>
        {[
          { title: 'PERSISTED IN SUPABASE', items: ['Conversations', 'Messages', 'Sources + response metadata'], tint: palette.storage, y: context.y + 54, h: 124 },
          { title: 'SENT TO THE AI PROVIDER', items: ['Current question', 'Up to 8 previous messages', 'Bounded evidence from tools'], tint: palette.ai, y: context.y + 192, h: 142 },
        ].map(({ title, items, tint, y, h }) => (
          <g key={title}>
            <rect x={context.x + 14} y={y} width={context.w - 28} height={h} rx={9} fill={tint} fillOpacity={0.06} stroke={tint} strokeOpacity={0.5} />
            <T x={context.x + 28} y={y + 24} size={11} mono color={tint}>
              {title}
            </T>
            {items.map((item, index) => (
              <g key={item}>
                <circle cx={context.x + 32} cy={y + 46 + index * 24} r={3} fill={tint} />
                <T x={context.x + 44} y={y + 51 + index * 24} size={14} color={palette.text}>
                  {item}
                </T>
              </g>
            ))}
          </g>
        ))}
        <T x={context.x + 28} y={context.y + 318} size={10.5} mono color={palette.muted}>
          MAX 4,000 CHARACTERS PER MESSAGE
        </T>
      </NodeButton>

      {/* The loop: provider requests, our server runs, results come back */}
      {node('provider', 'AI Provider', ['Interprets · requests tools · writes'], <SparkIcon x={box.provider.x + box.provider.w - 34} y={box.provider.y + 18} size={16} color={lit('provider') ? palette.ai : palette.muted} />)}
      {node(
        'sdk',
        'Vercel AI SDK',
        ['ToolLoopAgent · coordinates the loop'],
        <T x={box.sdk.x + 18} y={box.sdk.y + 80} size={11} mono color={palette.muted}>
          UP TO 4 STEPS · 3 TOOL CALLS
        </T>,
      )}
      {node('tools', 'Server tools', ['Our backend runs them + permissions'])}
      {node('knowledge', 'Saved knowledge', ['Supabase · owner-scoped queries'])}
      {[
        { x: 1240, y: 505, lines: ['TOOL', 'CALL'] },
        { x: 758, y: 440, lines: ['TOOL', 'RESULT'] },
      ].map(({ x, y, lines }) => (
        <g key={lines.join()}>
          {lines.map((line, index) => (
            <T key={line} x={x} y={y + index * 13} size={10} mono anchor="middle" color={palette.muted}>
              {line}
            </T>
          ))}
        </g>
      ))}

      {/* Current server tools */}
      <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx={12} fill={palette.surface} stroke={palette.line} />
      <T x={panel.x + 16} y={panel.y + 30} size={12} mono color={palette.muted}>
        SERVER TOOLS · RUN BY OUR BACKEND
      </T>
      {toolLayout.map(({ group, column, top }) => {
        const { group: name, tools } = toolGroups[group]
        return (
          <g key={name}>
            <T x={panel.x + 16 + column * 269} y={top - 10} size={10.5} mono color={palette.faint}>
              {name.toUpperCase()}
            </T>
            {tools.map((tool, index) => {
              const chip = toolChip(column, top, index)
              const on = tool.id === activeTool && lit('tools')
              return (
                <NodeButton key={tool.id} label={`${tool.name} (${tool.technical}): ${tool.rule}`} onSelect={pick(`tool:${tool.id}`)} selected={isSelected(`tool:${tool.id}`)} ring={chip}>
                  <title>{tool.technical}</title>
                  <rect x={chip.x} y={chip.y} width={chip.w} height={chip.h} rx={8} fill={on ? palette.retrieval : palette.surfaceRaised} fillOpacity={on ? 0.16 : 1} stroke={on ? palette.retrieval : palette.lineSoft} strokeWidth={on ? 1.4 : 1} />
                  <T x={chip.x + 14} y={chip.y + 21} size={13.5} color={on ? palette.text : palette.muted} weight={on ? 700 : 500}>
                    {tool.name}
                  </T>
                </NodeButton>
              )
            })}
          </g>
        )
      })}
      <T x={panel.x} y={748} size={11} mono color={palette.muted}>
        THE LOOP
      </T>
      {['1  Provider requests a tool', '2  Our backend executes it', '3  The result returns to the provider', '4  It answers, or requests another'].map((line, index) => (
        <T key={line} x={panel.x} y={770 + index * 18} size={12.5} color={palette.muted}>
          {line}
        </T>
      ))}
      <T x={panel.x + 285} y={748} size={11} mono color={palette.muted}>
        TOOL RULES
      </T>
      {['Save a link: the one link in the message', 'New schedule: explicit day and time', 'Delete: an identified schedule', 'Owner-scoped, bounded sources'].map((line, index) => (
        <T key={line} x={panel.x + 285} y={770 + index * 18} size={12.5} color={palette.muted}>
          {line}
        </T>
      ))}

      {/* Exit: answer, citation checks, persistence, JSON to iOS */}
      {node(
        'answer',
        'Answer / action result',
        example.sources.length || example.route === 'url' ? [] : example.result,
        <>
          {example.route === 'url' && (
            <T x={box.answer.x + 18} y={box.answer.y + 54} size={13} color={palette.faint}>
              Not used: the URL route replies directly.
            </T>
          )}
          {example.sources.length > 0 && (
            <>
              <T x={box.answer.x + 18} y={box.answer.y + 54} size={13} color={palette.muted}>
                {example.result[0]}
              </T>
              {example.sources.map((source, index) => (
                <g key={source}>
                  <rect x={box.answer.x + 14} y={box.answer.y + 66 + index * 26} width={box.answer.w - 28} height={22} rx={6} fill={palette.storage} fillOpacity={lit('answer') ? 0.12 : 0.04} stroke={palette.storage} strokeOpacity={lit('answer') ? 0.8 : 0.3} />
                  <T x={box.answer.x + 24} y={box.answer.y + 81 + index * 26} size={10} mono color={lit('answer') ? palette.storage : palette.faint}>
                    SOURCE
                  </T>
                  <T x={box.answer.x + 76} y={box.answer.y + 81 + index * 26} size={11.5} color={lit('answer') ? palette.text : palette.faint}>
                    {source}
                  </T>
                </g>
              ))}
            </>
          )}
        </>,
      )}
      {node('citations', 'Citation checks', ['Cited sources must come', 'from retrieved evidence'])}
      {node('persist', 'Persist conversation', ['Message, answer and', 'sources in Supabase'])}
      {node('response', 'JSON response to iOS', example.route === 'url' ? ['Save confirmation'] : ['Answer + source cards'], <T x={box.response.x + 18} y={box.response.y + 104} size={11} mono color={palette.muted}>NO STREAMING TODAY</T>)}

      <NodeButton label="Deterministic recap buttons: candidate implemented, deployment pending" onSelect={pick('recapCandidate')} selected={isSelected('recapCandidate')} ring={box.recapCandidate}>
        <rect x={box.recapCandidate.x} y={box.recapCandidate.y} width={box.recapCandidate.w} height={box.recapCandidate.h} rx={12} fill="none" stroke={palette.pending} strokeDasharray="4 5" />
        <StatusTag x={box.recapCandidate.x + 12} y={box.recapCandidate.y + 14} label="Candidate" color={palette.evidence} />
        <T x={box.recapCandidate.x + 14} y={box.recapCandidate.y + 60} size={14.5} weight={700}>
          Deterministic recap buttons
        </T>
        <T x={box.recapCandidate.x + 14} y={box.recapCandidate.y + 82} size={12} color={palette.muted}>
          Two exact recaps, no AI Provider.
        </T>
        <T x={box.recapCandidate.x + 14} y={box.recapCandidate.y + 104} size={11} mono color={palette.evidence}>
          IMPLEMENTED · DEPLOY PENDING
        </T>
      </NodeButton>

      <Footnote notes={['Illustrative walkthrough. Example messages are fictional; no real requests are made.']} />

      {/* Highlighted route for the current example */}
      <g filter="url(#chat-glow)">
        {segments.map(({ d, to }, index) => (
          <path
            key={`route-${example.id}-${index}`}
            ref={(element) => {
              segmentRefs.current[index] = element
            }}
            d={d}
            fill="none"
            stroke={color[to] ?? palette.text}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        ))}
      </g>

      <g ref={pulseRef} data-export="hide" style={{ opacity: 0 }} pointerEvents="none">
        <circle r={15} fill={palette.evidence} fillOpacity={0.18} />
        <circle r={6} fill={palette.text} />
      </g>
    </svg>
  )
}
