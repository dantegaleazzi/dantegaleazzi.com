// Title, color key and footnotes shared by every diagram, drawn inside the SVG so exports keep them.
import { useLayoutEffect, useRef, useState } from 'react'
import { categoryLegend, palette } from './content'
import { T } from './svgKit'

export const W = 1920
export const H = 1080

// The website's window chrome around every diagram.
function WindowFrame() {
  return (
    <g>
      <rect x={16} y={16} width={1888} height={1048} rx={14} fill="#fffdf8" stroke={palette.cardStroke} strokeWidth={2} />
      <path d="M 17 56 H 1903" stroke={palette.cardStroke} strokeWidth={2} />
      <path d="M 30 17 H 1890 Q 1903 17 1903 30 V 55 H 17 V 30 Q 17 17 30 17 Z" fill="#f3f0e8" />
      {['#ff5f56', '#ffbd2e', '#27c93f'].map((color, index) => (
        <circle key={color} cx={44 + index * 20} cy={36} r={6} fill={color} stroke={palette.cardStroke} strokeWidth={1.5} />
      ))}
      <T x={960} y={40.5} size={12} mono anchor="middle" color={palette.muted}>
        STED_V2_ARCHITECTURE.DOC
      </T>
    </g>
  )
}

export function DiagramHeader({ eyebrow, title, highlight, subtitle, tag }: { eyebrow: string; title: string; highlight?: string; subtitle: string; tag: string }) {
  const tagWidth = tag.length * 9.6 + 44
  const markRef = useRef<SVGTSpanElement>(null)
  const [mark, setMark] = useState<{ x: number; w: number } | null>(null)
  const marked = Boolean(highlight && title.includes(highlight))
  const [before, after] = marked ? title.split(highlight!) : [title, '']

  // The yellow marker sits behind the highlighted words, measured once the font has loaded.
  useLayoutEffect(() => {
    if (!marked) return
    const measure = () => {
      const box = markRef.current?.getBBox()
      if (box) setMark({ x: box.x, w: box.width })
    }
    // Re-measure whenever web fonts finish loading: a fallback font has different widths.
    measure()
    document.fonts?.ready.then(measure)
    document.fonts?.addEventListener('loadingdone', measure)
    const late = window.setTimeout(measure, 1200)
    return () => {
      document.fonts?.removeEventListener('loadingdone', measure)
      window.clearTimeout(late)
    }
  }, [marked, title, highlight])

  return (
    <g>
      <WindowFrame />
      <T x={96} y={92} size={14} mono color={palette.evidence} weight={500}>
        {eyebrow.toUpperCase()}
      </T>
      {marked && mark && <rect x={mark.x - 3} y={127} width={mark.w + 8} height={22} fill={palette.marker} transform={`rotate(-0.6 ${mark.x} 138)`} />}
      <T x={96} y={154} size={56} weight={700} spacing={-1.8}>
        {marked ? (
          <>
            {before}
            <tspan ref={markRef}>{highlight}</tspan>
            {after}
          </>
        ) : (
          title
        )}
      </T>
      <T x={96} y={200} size={22} color={palette.muted} weight={500}>
        {subtitle}
      </T>
      <rect x={1824 - tagWidth} y={74} width={tagWidth} height={30} rx={15} fill={palette.surface} stroke={palette.cardStroke} />
      <circle cx={1824 - tagWidth + 18} cy={89} r={3.5} fill={palette.marker} stroke={palette.cardStroke} />
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
