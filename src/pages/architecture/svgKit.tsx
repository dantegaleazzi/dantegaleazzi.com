// SVG building blocks for the architecture diagrams. Styles are inline attributes (not CSS classes)
// so an exported SVG/PNG looks exactly like the page.
import type { KeyboardEvent, ReactNode } from 'react'
import { brandPaths, type Brand } from './brandPaths'
import { fonts, palette } from './content'

type TextProps = {
  x: number
  y: number
  children: ReactNode
  size?: number
  weight?: number
  color?: string
  mono?: boolean
  anchor?: 'start' | 'middle' | 'end'
  spacing?: number
  opacity?: number
}

export function T({ x, y, children, size = 15, weight = 500, color = palette.text, mono = false, anchor = 'start', spacing, opacity }: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontFamily={mono ? fonts.mono : fonts.sans}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      letterSpacing={spacing ?? (mono ? size * 0.08 : undefined)}
      opacity={opacity}
    >
      {children}
    </text>
  )
}

export function BrandIcon({ brand, x, y, size = 16, color = palette.muted }: { brand: Brand; x: number; y: number; size?: number; color?: string }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={brandPaths[brand]} fill={color} />
    </svg>
  )
}

export function GlobeIcon({ x, y, size = 16, color = palette.muted }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
      <path d="M2.5 12h19M4.5 7h15M4.5 17h15" />
    </svg>
  )
}

// Dotted gray marks anything whose integration is still in progress.
export const pendingLine = { stroke: palette.pending, strokeDasharray: '1.5 7', strokeLinecap: 'round' as const }

export function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(24, (x2 - x1) * 0.55)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

// A focusable, clickable group. The focus ring only shows through the page CSS, so exports never include it.
export function NodeButton({
  label,
  onSelect,
  selected,
  ring,
  children,
}: {
  label: string
  onSelect?: () => void
  selected?: boolean
  ring: { x: number; y: number; w: number; h: number; r?: number }
  children: ReactNode
}) {
  const interactive = Boolean(onSelect)
  const handleKey = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect?.()
    }
  }
  return (
    <g
      className={interactive ? 'arch-node' : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? label : undefined}
      aria-pressed={interactive ? Boolean(selected) : undefined}
      onClick={onSelect}
      onKeyDown={interactive ? handleKey : undefined}
      style={interactive ? { cursor: 'pointer', outline: 'none' } : undefined}
    >
      {children}
      <rect
        className="arch-focus"
        x={ring.x - 6}
        y={ring.y - 6}
        width={ring.w + 12}
        height={ring.h + 12}
        rx={(ring.r ?? 12) + 5}
        fill="none"
        stroke={palette.text}
        strokeWidth={2}
        opacity={selected ? 0.9 : 0}
        pointerEvents="none"
      />
    </g>
  )
}

export function Panel({
  x,
  y,
  w,
  h,
  color = palette.line,
  lit = true,
  pending = false,
  fill = palette.surface,
  r = 12,
}: {
  x: number
  y: number
  w: number
  h: number
  color?: string
  lit?: boolean
  pending?: boolean
  fill?: string
  r?: number
}) {
  if (pending) {
    return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} strokeWidth={1.2} {...pendingLine} />
  }
  // Ink border when active, a colored tab on top, quiet border otherwise.
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={lit ? palette.cardStroke : palette.line} strokeWidth={lit ? 2 : 1.4} />
      {lit && <rect x={x + 16} y={y - 3} width={40} height={6} rx={3} fill={color} stroke={palette.cardStroke} strokeWidth={1.2} />}
    </>
  )
}

export function Chip({
  x,
  y,
  w,
  label,
  color,
  active = true,
  h = 26,
  fontSize = 11.5,
}: {
  x: number
  y: number
  w: number
  label: string
  color: string
  active?: boolean
  h?: number
  fontSize?: number
}) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={active ? color : 'none'} fillOpacity={active ? 0.16 : 0} stroke={active ? color : palette.line} strokeWidth={1.2} />
      <T x={x + w / 2} y={y + h / 2 + fontSize * 0.38} size={fontSize} mono anchor="middle" color={active ? color : palette.faint} weight={500}>
        {label.toUpperCase()}
      </T>
    </>
  )
}

// found = check, missing = cross, na = dash
export function FieldMark({ x, y, state }: { x: number; y: number; state: 'found' | 'missing' | 'na' }) {
  if (state === 'found') {
    return (
      <g>
        <circle cx={x} cy={y} r={8} fill={palette.full} fillOpacity={0.18} stroke={palette.full} strokeWidth={1.2} />
        <path d={`M ${x - 3.5} ${y} l 2.4 2.6 l 4.8 -5.2`} fill="none" stroke={palette.full} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
  if (state === 'missing') {
    return (
      <g>
        <circle cx={x} cy={y} r={8} fill={palette.failed} fillOpacity={0.14} stroke={palette.failed} strokeWidth={1.2} />
        <path d={`M ${x - 3} ${y - 3} l 6 6 M ${x + 3} ${y - 3} l -6 6`} stroke={palette.failed} strokeWidth={1.7} strokeLinecap="round" />
      </g>
    )
  }
  return <path d={`M ${x - 4} ${y} h 8`} stroke={palette.faint} strokeWidth={1.6} strokeLinecap="round" />
}

// Generic mark for the AI Provider: deliberately not any vendor's logo.
export function SparkIcon({ x, y, size = 16, color = palette.ai }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5 L14.2 9.8 L21.5 12 L14.2 14.2 L12 21.5 L9.8 14.2 L2.5 12 L9.8 9.8 Z" fill={color} />
    </svg>
  )
}
