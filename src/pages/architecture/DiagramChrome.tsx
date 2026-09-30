// Title, color key and footnotes shared by every diagram, drawn inside the SVG so exports keep them.
import { categoryLegend, palette } from './content'
import { T } from './svgKit'

export const W = 1920
export const H = 1080

export function DiagramHeader({ eyebrow, title, subtitle, tag }: { eyebrow: string; title: string; subtitle: string; tag: string }) {
  const tagWidth = tag.length * 9.6 + 44
  return (
    <g>
      <T x={96} y={92} size={14} mono color={palette.evidence} weight={500}>
        {eyebrow.toUpperCase()}
      </T>
      <T x={96} y={154} size={56} weight={700} spacing={-1.8}>
        {title}
      </T>
      <T x={96} y={200} size={22} color={palette.muted} weight={500}>
        {subtitle}
      </T>
      <rect x={1824 - tagWidth} y={74} width={tagWidth} height={30} rx={15} fill="none" stroke={palette.line} />
      <circle cx={1824 - tagWidth + 18} cy={89} r={3.5} fill={palette.evidence} />
      <T x={1806} y={93.5} size={12} mono anchor="end" color={palette.muted}>
        {tag.toUpperCase()}
      </T>
    </g>
  )
}

export function CategoryLegend({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <T x={x} y={y} size={12} mono color={palette.muted}>
        COLOR KEY
      </T>
      {categoryLegend.map(({ label, color }, index) => (
        <g key={label}>
          <rect x={x + (index % 2) * 190} y={y + 22 + Math.floor(index / 2) * 34} width={14} height={14} rx={4} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.4} />
          <T x={x + 24 + (index % 2) * 190} y={y + 34 + Math.floor(index / 2) * 34} size={14.5} color={palette.text}>
            {label}
          </T>
        </g>
      ))}
    </g>
  )
}

export function Footnote({ notes }: { notes: string[] }) {
  return (
    <T x={96} y={1050} size={13} mono color={palette.faint}>
      {notes.join('   ').toUpperCase()}
    </T>
  )
}

// Small status tag used for anything that is not live yet.
export function StatusTag({ x, y, label, color = palette.muted }: { x: number; y: number; label: string; color?: string }) {
  const width = label.length * 7.6 + 20
  return (
    <g>
      <rect x={x} y={y} width={width} height={20} rx={10} fill="none" stroke={color} strokeDasharray="3 3" />
      <T x={x + width / 2} y={y + 14} size={10.5} mono anchor="middle" color={color}>
        {label.toUpperCase()}
      </T>
    </g>
  )
}
