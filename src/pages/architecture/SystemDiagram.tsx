import type { Ref } from 'react'
import type { Brand } from './brandPaths'
import { pageCopy, palette, systemInfo, type SystemNodeId } from './content'
import { CategoryLegend, DiagramHeader, Footnote, H, W } from './DiagramChrome'
import { DiagramBackdrop } from './FlowDiagram'
import { BrandIcon, curve, NodeButton, Panel, T } from './svgKit'

type Box = { x: number; y: number; w: number; h: number }

// Conceptual map of the V2 design for the iOS submission: one main path, the Ask Sted branch and payments.
const nodes: Record<SystemNodeId, Box & { lines: string[]; brands: Brand[]; color: string }> = {
  clients: { x: 96, y: 360, w: 250, h: 200, lines: ['Swift · SwiftUI'], brands: ['apple', 'swift'], color: palette.input },
  captureApi: { x: 400, y: 330, w: 720, h: 260, lines: ['TypeScript · Node.js · Google Cloud Run'], brands: ['googlecloud', 'nodedotjs', 'typescript'], color: palette.retrieval },
  supabase: { x: 1170, y: 360, w: 280, h: 200, lines: ['Auth · PostgreSQL', 'Saved knowledge'], brands: ['supabase'], color: palette.storage },
  surfaces: { x: 1500, y: 360, w: 324, h: 200, lines: [], brands: [], color: palette.storage },
  askStedService: { x: 400, y: 690, w: 300, h: 120, lines: ['Vercel AI SDK · tool loop'], brands: ['vercel'], color: palette.ai },
  askTools: { x: 760, y: 690, w: 300, h: 120, lines: ['Server tools over the user’s library'], brands: [], color: palette.ai },
  answer: { x: 1120, y: 690, w: 280, h: 120, lines: ['Links the sources it used'], brands: [], color: palette.storage },
  revenuecat: { x: 1460, y: 690, w: 364, h: 100, lines: ['Subscriptions + entitlements'], brands: ['revenuecat'], color: palette.input },
  checkout: { x: 1460, y: 820, w: 364, h: 110, lines: ['RevenueCat hosted funnels', '+ Stripe'], brands: ['revenuecat', 'stripe'], color: palette.input },
  website: { x: 96, y: 880, w: 250, h: 60, lines: [], brands: ['cloudflare'], color: palette.line },
}

const steps = [
  { label: 'Retrieval', detail: 'Adapters', color: palette.retrieval },
  { label: 'Evidence', detail: 'Evidence checks', color: palette.evidence },
  { label: 'Understanding', detail: 'Deterministic · AI', color: palette.ai },
  { label: 'Validation', detail: 'Checks + publish', color: palette.storage },
]

const mid = (id: SystemNodeId) => nodes[id].y + nodes[id].h / 2
const rightOf = (id: SystemNodeId) => nodes[id].x + nodes[id].w

const edges: { d: string; color: string; dim?: boolean }[] = [
  { d: curve(rightOf('clients'), 460, nodes.captureApi.x, 460), color: palette.retrieval },
  { d: curve(rightOf('captureApi'), 460, nodes.supabase.x, 460), color: palette.storage },
  { d: curve(rightOf('supabase'), 460, nodes.surfaces.x, 460), color: palette.storage },
  { d: `M 221 ${nodes.clients.y + nodes.clients.h} V ${mid('askStedService') - 10} Q 221 ${mid('askStedService')} 231 ${mid('askStedService')} H ${nodes.askStedService.x}`, color: palette.ai },
  { d: curve(rightOf('askStedService'), mid('askStedService'), nodes.askTools.x, mid('askTools')), color: palette.ai },
  { d: curve(rightOf('askTools'), mid('askTools'), nodes.answer.x, mid('answer')), color: palette.storage },
  // Ask Sted persists conversations in Supabase.
  { d: `M 668 ${nodes.askStedService.y} C 668 632, 1310 650, 1310 ${nodes.supabase.y + nodes.supabase.h}`, color: palette.storage },
  { d: `M ${nodes.checkout.x + 182} ${nodes.checkout.y} V ${nodes.revenuecat.y + nodes.revenuecat.h}`, color: palette.input },
  { d: curve(rightOf('website'), 910, nodes.checkout.x, 875), color: palette.faint, dim: true },
]

type SystemDiagramProps = {
  exporting: boolean
  selected: SystemNodeId | null
  onSelect: (id: SystemNodeId) => void
  svgRef: Ref<SVGSVGElement>
}

export function SystemDiagram({ exporting, selected, onSelect, svgRef }: SystemDiagramProps) {
  const pick = (id: SystemNodeId) => (exporting ? undefined : () => onSelect(id))
  const ring = (id: SystemNodeId) => ({ x: nodes[id].x, y: nodes[id].y, w: nodes[id].w, h: nodes[id].h })
  const isSelected = (id: SystemNodeId) => !exporting && selected === id
  const label = (id: SystemNodeId) => `${systemInfo[id].title}: ${systemInfo[id].summary}`

  const standard = (id: SystemNodeId) => {
    const { x, y, w, h, lines, brands, color } = nodes[id]
    return (
      <NodeButton key={id} label={label(id)} onSelect={pick(id)} selected={isSelected(id)} ring={ring(id)}>
        <Panel x={x} y={y} w={w} h={h} color={color} />
        {brands.map((brand, index) => (
          <BrandIcon key={brand} brand={brand} x={x + w - 32 - index * 26} y={y + 18} size={18} color={palette.muted} />
        ))}
        <T x={x + 18} y={y + 40} size={19} weight={700} spacing={-0.3}>
          {systemInfo[id].title}
        </T>
        {lines.map((line, index) => (
          <T key={line} x={x + 18} y={y + 66 + index * 21} size={14} color={palette.muted}>
            {line}
          </T>
        ))}
      </NodeButton>
    )
  }

  const { captureApi, clients, surfaces, website } = nodes

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${pageCopy.title}: the system map`} className="block h-auto w-full">
      <defs>
        <marker id="system-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={palette.muted} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect width={W} height={H} fill={palette.bg} />
      <DiagramBackdrop />
      <DiagramHeader eyebrow="System map" title={pageCopy.title} highlight="V2 architecture" subtitle={pageCopy.subtitle} tag="Conceptual map" />
      <CategoryLegend x={1440} y={150} />

      {[
        { x: 96, y: 310, text: 'SAVE' },
        { x: 400, y: 310, text: 'UNDERSTAND' },
        { x: 1170, y: 310, text: 'STORE' },
        { x: 1500, y: 310, text: 'USE' },
        { x: 400, y: 672, text: 'ASK STED · SEPARATE SERVICE' },
        { x: 1460, y: 672, text: 'PAYMENTS' },
      ].map(({ x, y, text }) => (
        <T key={text} x={x} y={y} size={12} mono color={palette.muted}>
          {text}
        </T>
      ))}

      {edges.map(({ d, color, dim }, index) => (
        <path key={index} d={d} fill="none" stroke={color} strokeWidth={1.8} strokeOpacity={dim ? 0.6 : 0.8} markerEnd="url(#system-arrow)" />
      ))}
      <T x={990} y={628} size={11} mono anchor="middle" color={palette.muted}>
        CONVERSATIONS
      </T>

      {/* iOS app + Share Extension */}
      <NodeButton label={label('clients')} onSelect={pick('clients')} selected={isSelected('clients')} ring={ring('clients')}>
        <Panel x={clients.x} y={clients.y} w={clients.w} h={clients.h} color={clients.color} />
        {clients.brands.map((brand, index) => (
          <BrandIcon key={brand} brand={brand} x={clients.x + clients.w - 32 - index * 26} y={clients.y + 18} size={18} color={palette.muted} />
        ))}
        <T x={clients.x + 18} y={clients.y + 40} size={19} weight={700} spacing={-0.3}>
          iOS app
        </T>
        <T x={clients.x + 18} y={clients.y + 66} size={14} color={palette.muted}>
          {clients.lines[0]}
        </T>
        <rect x={clients.x + 14} y={clients.y + 110} width={clients.w - 28} height={70} rx={9} fill={palette.surfaceRaised} stroke={palette.lineSoft} />
        <T x={clients.x + 30} y={clients.y + 140} size={15.5} weight={700}>
          Share Extension
        </T>
        <T x={clients.x + 30} y={clients.y + 162} size={13} color={palette.muted}>
          Save from any app
        </T>
      </NodeButton>

      {/* Capture API with the four V2 steps */}
      <NodeButton label={label('captureApi')} onSelect={pick('captureApi')} selected={isSelected('captureApi')} ring={ring('captureApi')}>
        <Panel x={captureApi.x} y={captureApi.y} w={captureApi.w} h={captureApi.h} color={captureApi.color} />
        {captureApi.brands.map((brand, index) => (
          <BrandIcon key={brand} brand={brand} x={captureApi.x + captureApi.w - 32 - index * 26} y={captureApi.y + 18} size={18} color={palette.muted} />
        ))}
        <T x={captureApi.x + 18} y={captureApi.y + 40} size={19} weight={700} spacing={-0.3}>
          Capture API · V2 pipeline
        </T>
        <T x={captureApi.x + 18} y={captureApi.y + 66} size={14} color={palette.muted}>
          {captureApi.lines[0]}
        </T>
        {steps.map((step, index) => {
          const x = captureApi.x + 18 + index * 174
          return (
            <g key={step.label}>
              <rect x={x} y={captureApi.y + 110} width={160} height={74} rx={10} fill={step.color} fillOpacity={0.12} stroke={step.color} strokeWidth={1.3} />
              <T x={x + 14} y={captureApi.y + 141} size={14.5} weight={700}>
                {step.label}
              </T>
              <T x={x + 14} y={captureApi.y + 164} size={10.5} mono color={palette.muted}>
                {step.detail.toUpperCase()}
              </T>
              {index < steps.length - 1 && <path d={`M ${x + 161} ${captureApi.y + 147} h 10`} stroke={palette.muted} strokeWidth={1.4} markerEnd="url(#system-arrow)" />}
            </g>
          )
        })}
        <T x={captureApi.x + 18} y={captureApi.y + 230} size={13} color={palette.muted}>
          Recovery providers (Apify, Firecrawl): integration in progress.
        </T>
      </NodeButton>

      {standard('supabase')}

      {/* Library · Search · Recap */}
      <NodeButton label={label('surfaces')} onSelect={pick('surfaces')} selected={isSelected('surfaces')} ring={ring('surfaces')}>
        <Panel x={surfaces.x} y={surfaces.y} w={surfaces.w} h={surfaces.h} color={surfaces.color} />
        <T x={surfaces.x + 18} y={surfaces.y + 40} size={19} weight={700} spacing={-0.3}>
          In the app
        </T>
        {['Library', 'Search', 'Recap'].map((item, index) => (
          <g key={item}>
            <rect x={surfaces.x + 14} y={surfaces.y + 62 + index * 44} width={surfaces.w - 28} height={36} rx={8} fill={palette.storage} fillOpacity={0.1} stroke={palette.storage} strokeOpacity={0.7} />
            <T x={surfaces.x + 30} y={surfaces.y + 85 + index * 44} size={14.5}>
              {item}
            </T>
          </g>
        ))}
      </NodeButton>

      {standard('askStedService')}
      {standard('askTools')}
      {standard('answer')}
      {standard('revenuecat')}
      {standard('checkout')}

      {/* Website: secondary support */}
      <NodeButton label={label('website')} onSelect={pick('website')} selected={isSelected('website')} ring={ring('website')}>
        <Panel x={website.x} y={website.y} w={website.w} h={website.h} color={website.color} lit={false} />
        <BrandIcon brand="cloudflare" x={website.x + 16} y={website.y + 21} size={18} color={palette.muted} />
        <T x={website.x + 44} y={website.y + 35} size={14.5} weight={700} color={palette.muted}>
          Website · Cloudflare
        </T>
      </NodeButton>

      <Footnote notes={[pageCopy.integrationNote, 'Conceptual map.']} />
    </svg>
  )
}
