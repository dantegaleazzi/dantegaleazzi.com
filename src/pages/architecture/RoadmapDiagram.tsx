import type { Ref } from 'react'
import { roadmap } from './chatContent'
import { palette } from './content'
import { DiagramHeader, Footnote, H, StatusTag, W } from './DiagramChrome'
import { DiagramBackdrop } from './FlowDiagram'
import { T } from './svgKit'

// "What comes next" for Ask Sted: kept apart from the current tools so nothing future reads as live.
export function RoadmapDiagram({ svgRef }: { svgRef: Ref<SVGSVGElement> }) {
  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="What comes next for Ask Sted" className="block h-auto w-full">
      <rect width={W} height={H} fill={palette.bg} />
      <DiagramBackdrop />
      <DiagramHeader
        eyebrow="02 — Ask Sted · What comes next"
        title="What comes next"
        highlight="next"
        subtitle="Proposals and pending work. None of this is part of the current Ask Sted."
        tag="Roadmap"
      />

      <T x={96} y={292} size={12} mono color={palette.muted}>
        CLOSEST TO SHIPPING
      </T>
      {roadmap.soon.map(({ status, title, lines, examples }, index) => {
        const x = 96 + index * 587
        return (
          <g key={title}>
            <rect x={x} y={310} width={554} height={330} rx={14} fill={palette.surface} stroke={palette.pending} strokeDasharray="4 5" />
            <StatusTag x={x + 22} y={332} label={status} color={status === 'Future' ? palette.muted : palette.evidence} />
            <T x={x + 22} y={396} size={26} weight={700} spacing={-0.6}>
              {title}
            </T>
            {lines.map((line, lineIndex) => (
              <T key={line} x={x + 22} y={432 + lineIndex * 24} size={16} color={palette.muted}>
                {line}
              </T>
            ))}
            {examples && (
              <>
                <T x={x + 22} y={530} size={11} mono color={palette.faint}>
                  WOULD ENABLE
                </T>
                {examples.map((example, exampleIndex) => (
                  <g key={example}>
                    <rect x={x + 22} y={542 + exampleIndex * 30} width={example.length * 8.4 + 24} height={24} rx={12} fill={palette.ai} fillOpacity={0.1} stroke={palette.ai} strokeOpacity={0.5} />
                    <T x={x + 34} y={559 + exampleIndex * 30} size={13.5} color={palette.text}>
                      {example}
                    </T>
                  </g>
                ))}
              </>
            )}
          </g>
        )
      })}

      <T x={96} y={696} size={12} mono color={palette.muted}>
        LATER · PROPOSALS
      </T>
      {roadmap.later.map(({ title, lines }, index) => {
        const x = 96 + index * 350
        return (
          <g key={title}>
            <rect x={x} y={714} width={326} height={270} rx={14} fill={palette.surface} stroke={palette.pending} strokeDasharray="4 5" />
            <StatusTag x={x + 20} y={736} label="Future" color={palette.muted} />
            <T x={x + 20} y={800} size={22} weight={700} spacing={-0.4}>
              {title}
            </T>
            {lines.map((line, lineIndex) => (
              <T key={line} x={x + 20} y={836 + lineIndex * 22} size={15} color={palette.muted}>
                {line}
              </T>
            ))}
          </g>
        )
      })}

      <Footnote notes={['Roadmap: proposals and pending work, not current features.']} />
    </svg>
  )
}
