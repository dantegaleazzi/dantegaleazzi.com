import { useCallback, useEffect, useLayoutEffect, useRef, useState, type Ref } from 'react'
import {
  adapters,
  checks,
  coverages,
  fields,
  objects,
  outputs,
  pageCopy,
  palette,
  sources,
  stageOrder,
  uses,
  type Example,
  type FlowNodeId,
  type StageId,
} from './content'
import { CategoryLegend, DiagramHeader, Footnote, H, W } from './DiagramChrome'
import { BrandIcon, Chip, curve, FieldMark, GlobeIcon, NodeButton, Panel, pendingLine, SparkIcon, T } from './svgKit'

const TOP = 356
const CARD_H = 440
const BOTTOM = TOP + CARD_H

const cols: Record<StageId, { x: number; w: number; color: string; label: string }> = {
  save: { x: 96, w: 188, color: palette.input, label: 'Save' },
  recognize: { x: 324, w: 190, color: palette.input, label: 'Recognize' },
  retrieve: { x: 554, w: 268, color: palette.retrieval, label: 'Retrieve' },
  evidence: { x: 862, w: 232, color: palette.evidence, label: 'Evidence' },
  understand: { x: 1134, w: 224, color: palette.ai, label: 'Understand' },
  validate: { x: 1398, w: 218, color: palette.storage, label: 'Validate & publish' },
  use: { x: 1656, w: 168, color: palette.storage, label: 'Saved knowledge' },
}

const saveRowY = (index: number) => 520 + index * 64
const objectRowY = (index: number) => 436 + index * 50
const chipBox = (index: number) => ({ x: cols.retrieve.x + 12 + (index % 2) * 126, y: 430 + Math.floor(index / 2) * 42, w: 118, h: 34 })
const fieldRowY = (index: number) => 446 + index * 35
const outputRowY = (index: number) => 570 + index * 33
const checkRowY = (index: number) => 440 + index * 44
const useRowY = (index: number) => 448 + index * 54
const recovery = { x: cols.retrieve.x + 12, y: 656, w: cols.retrieve.w - 24, h: 130 }

// Timing of the walkthrough: a short hold, then one segment per stage.
const LEAD_IN = 450
const SEGMENT = 1250
const TRAVEL = 0.68
const SEGMENTS = stageOrder.length - 1

function progressAt(elapsed: number) {
  const time = Math.max(0, elapsed - LEAD_IN)
  const segment = Math.floor(time / SEGMENT)
  if (segment >= SEGMENTS) return SEGMENTS
  const local = (time % SEGMENT) / SEGMENT
  return segment + Math.min(1, local / TRAVEL)
}

// Where the highlighted route leaves (and enters) each stage for a given example.
function anchors(example: Example): Record<StageId, number> {
  const chip = chipBox(adapters.findIndex(({ id }) => id === example.adapter))
  return {
    save: saveRowY(sources.findIndex(({ id }) => id === example.source)) + 27,
    recognize: objectRowY(objects.findIndex(({ id }) => id === example.object)) + 21,
    retrieve: chip.y + chip.h / 2,
    evidence: 544,
    understand: 520,
    validate: checkRowY(1) + 18,
    use: useRowY(0) + 22,
  }
}

function routeSegments(example: Example) {
  const y = anchors(example)
  return stageOrder.slice(0, -1).map((stage, index) => {
    const next = stageOrder[index + 1]
    return { d: curve(cols[stage].x + cols[stage].w, y[stage], cols[next].x, y[next]), color: cols[next].color }
  })
}

type FlowDiagramProps = {
  example: Example
  showRecovery: boolean
  playing: boolean
  runId: number
  frozen: boolean
  exporting: boolean
  selected: FlowNodeId | null
  onSelect: (id: FlowNodeId) => void
  onFinished: () => void
  svgRef: Ref<SVGSVGElement>
}

export function FlowDiagram({ example, showRecovery, playing, runId, frozen, exporting, selected, onSelect, onFinished, svgRef }: FlowDiagramProps) {
  const [reached, setReached] = useState(frozen ? SEGMENTS : 0)
  const elapsed = useRef(0)
  const segmentRefs = useRef<(SVGPathElement | null)[]>([])
  const pulseRef = useRef<SVGGElement | null>(null)
  const segments = routeSegments(example)

  // Draws the route up to `progress` and moves the pulse; called every frame while playing.
  const paint = useCallback((progress: number) => {
    segmentRefs.current.forEach((path, index) => {
      if (!path) return
      const length = path.getTotalLength()
      const drawn = Math.min(1, Math.max(0, progress - index))
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length * (1 - drawn)}`
    })
    const pulse = pulseRef.current
    if (!pulse) return
    const index = Math.min(Math.floor(progress), SEGMENTS - 1)
    const path = segmentRefs.current[index]
    if (!path || progress >= SEGMENTS) {
      pulse.style.opacity = '0'
      return
    }
    const point = path.getPointAtLength(path.getTotalLength() * (progress - index))
    pulse.style.opacity = '1'
    pulse.setAttribute('transform', `translate(${point.x} ${point.y})`)
    setReached((current) => (Math.floor(progress) === current ? current : Math.floor(progress)))
  }, [])

  // A new example or a replay restarts the walkthrough from the first stage.
  useLayoutEffect(() => {
    elapsed.current = 0
    setReached(0)
  }, [runId, example.id])

  useLayoutEffect(() => {
    if (frozen) {
      setReached(SEGMENTS)
      paint(SEGMENTS)
    } else {
      const progress = progressAt(elapsed.current)
      setReached(Math.floor(progress))
      paint(progress)
    }
  }, [frozen, paint, runId, example.id])

  useEffect(() => {
    if (!playing || frozen) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      elapsed.current += now - last
      last = now
      const progress = progressAt(elapsed.current)
      paint(progress)
      if (progress >= SEGMENTS) {
        setReached(SEGMENTS)
        onFinished()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, frozen, paint, onFinished, runId, example.id])

  const lit = (stage: StageId) => stageOrder.indexOf(stage) <= reached
  const pick = (id: FlowNodeId) => (exporting ? undefined : () => onSelect(id))
  const isSelected = (id: FlowNodeId) => !exporting && selected === id
  const coverage = coverages.find(({ id }) => id === example.coverage)!
  const adapter = adapters.find(({ id }) => id === example.adapter)!
  const urlWidth = example.url.length * 8.2 + 30
  const ring = (stage: StageId) => ({ x: cols[stage].x, y: TOP, w: cols[stage].w, h: CARD_H })

  const stageCard = (stage: StageId) => <Panel x={cols[stage].x} y={TOP} w={cols[stage].w} h={CARD_H} color={cols[stage].color} lit={lit(stage)} />

  const cardTitle = (stage: StageId, caption: string[]) => {
    const { x, label } = cols[stage]
    return (
      <>
        <T x={x + 18} y={TOP + 38} size={label.length > 14 ? 17 : 20} weight={700} spacing={-0.4} color={lit(stage) ? palette.text : palette.muted}>
          {label}
        </T>
        {caption.map((line, index) => (
          <T key={line} x={x + 18} y={TOP + 62 + index * 18} size={13.5} color={palette.muted}>
            {line}
          </T>
        ))}
      </>
    )
  }

  const row = (stage: StageId, box: { x: number; y: number; w: number; h: number }, active: boolean) => {
    const on = active && lit(stage)
    const { color } = cols[stage]
    return (
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={8}
        fill={on ? color : palette.surfaceRaised}
        fillOpacity={on ? 0.14 : 1}
        stroke={on ? color : palette.lineSoft}
        strokeWidth={on ? 1.4 : 1}
      />
    )
  }

  const fullRow = (stage: StageId, y: number, h: number, active: boolean) => row(stage, { x: cols[stage].x + 12, y, w: cols[stage].w - 24, h }, active)

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${pageCopy.title}: how STED understands a link. Walkthrough example: ${example.label}.`}
      className="block h-auto w-full"
    >
      <defs>
        <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={palette.muted} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect width={W} height={H} fill={palette.bg} />
      <DiagramBackdrop />
      <DiagramHeader eyebrow={pageCopy.linkStep} title={pageCopy.title} highlight="V2 architecture" subtitle={pageCopy.subtitle} tag={pageCopy.walkthroughNote.replace('.', '')} />

      {/* Current example */}
      <T x={96} y={288} size={12.5} mono color={palette.muted}>
        EXAMPLE
      </T>
      <T x={178} y={289} size={19} weight={700} spacing={-0.3}>
        {example.label}
      </T>
      <rect x={380} y={266} width={urlWidth} height={32} rx={16} fill={palette.surfaceRaised} stroke={palette.line} />
      <T x={395} y={287} size={13.5} mono color={palette.input} spacing={0.2}>
        {example.url}
      </T>
      <Chip x={380 + urlWidth + 12} y={269} w={coverage.label.length * 9 + 40} h={26} label={coverage.label} color={coverage.color} />

      {/* Stage numbers */}
      {stageOrder.map((stage, index) => (
        <g key={stage}>
          <T x={cols[stage].x + 2} y={336} size={13} mono weight={500} color={lit(stage) ? cols[stage].color : palette.faint}>
            {`0${index + 1}`}
          </T>
          <T x={cols[stage].x + 30} y={336} size={13} mono color={lit(stage) ? palette.text : palette.faint}>
            {cols[stage].label.toUpperCase()}
          </T>
        </g>
      ))}

      {/* Faint full route, always readable in a still frame */}
      {segments.map(({ d }, index) => (
        <path key={`base-${index}`} d={d} fill="none" stroke={palette.line} strokeWidth={2} />
      ))}

      {/* 01 SAVE */}
      <NodeButton label="Save: where links come from" onSelect={pick('save')} selected={isSelected('save')} ring={ring('save')}>
        {stageCard('save')}
        {cardTitle('save', ['Share or paste a URL'])}
        {sources.map(({ id, label, detail, brand }, index) => {
          const y = saveRowY(index)
          const active = id === example.source
          return (
            <g key={id}>
              {fullRow('save', y, 54, active)}
              <BrandIcon brand={brand} x={cols.save.x + 26} y={y + 18} size={18} color={active && lit('save') ? palette.text : palette.muted} />
              <T x={cols.save.x + 54} y={y + 24} size={14} color={palette.text}>
                {label}
              </T>
              <T x={cols.save.x + 54} y={y + 42} size={12} color={palette.muted}>
                {detail}
              </T>
            </g>
          )
        })}
      </NodeButton>

      {/* 02 RECOGNIZE */}
      <NodeButton label="Recognize: platform and content type" onSelect={pick('recognize')} selected={isSelected('recognize')} ring={ring('recognize')}>
        {stageCard('recognize')}
        {cardTitle('recognize', ['Platform + content type'])}
        {objects.map(({ id, label }, index) => {
          const y = objectRowY(index)
          const active = id === example.object
          return (
            <g key={id}>
              {fullRow('recognize', y, 42, active)}
              <T x={cols.recognize.x + 28} y={y + 26} size={14.5} color={active && lit('recognize') ? palette.text : palette.muted}>
                {label}
              </T>
            </g>
          )
        })}
        <T x={cols.recognize.x + 18} y={762} size={12.5} color={palette.muted}>
          The type picks how
        </T>
        <T x={cols.recognize.x + 18} y={779} size={12.5} color={palette.muted}>
          the link is read.
        </T>
      </NodeButton>

      {/* 03 RETRIEVE, with recovery inside the same module */}
      <NodeButton label="Retrieve: source adapters" onSelect={pick('retrieve')} selected={isSelected('retrieve')} ring={ring('retrieve')}>
        {stageCard('retrieve')}
        {cardTitle('retrieve', ['One adapter per source'])}
        {adapters.map(({ id, label, brand }, index) => {
          const box = chipBox(index)
          const active = id === example.adapter
          const iconColor = active && lit('retrieve') ? palette.retrieval : palette.muted
          return (
            <g key={id}>
              {row('retrieve', box, active)}
              {brand ? (
                <BrandIcon brand={brand} x={box.x + 12} y={box.y + 9} size={16} color={iconColor} />
              ) : (
                <GlobeIcon x={box.x + 12} y={box.y + 9} size={16} color={iconColor} />
              )}
              <T x={box.x + 36} y={box.y + 22} size={13.5} color={active && lit('retrieve') ? palette.text : palette.muted}>
                {label}
              </T>
            </g>
          )
        })}
        <T x={cols.retrieve.x + 18} y={620} size={11} mono color={palette.muted}>
          {`${adapter.label.toUpperCase()} ADAPTER`}
        </T>
        <T x={cols.retrieve.x + 18} y={640} size={13.5} color={lit('retrieve') ? palette.text : palette.muted}>
          {adapter.detail}
        </T>
      </NodeButton>
      {showRecovery && (
        <NodeButton label="Recovery providers: integration in progress" onSelect={pick('recovery')} selected={isSelected('recovery')} ring={recovery}>
          <rect x={recovery.x} y={recovery.y} width={recovery.w} height={recovery.h} rx={9} fill={palette.bg} strokeWidth={1.3} {...pendingLine} />
          <T x={recovery.x + 14} y={recovery.y + 22} size={11} mono color={palette.muted}>
            RECOVERY
          </T>
          {[
            { name: 'Apify', detail: 'Social extraction' },
            { name: 'Firecrawl', detail: 'Web + dynamic pages' },
          ].map(({ name, detail }, index) => (
            <g key={name}>
              <T x={recovery.x + 14} y={recovery.y + 48 + index * 22} size={14} weight={700} color={palette.text}>
                {name}
              </T>
              <T x={recovery.x + 94} y={recovery.y + 48 + index * 22} size={12.5} color={palette.muted}>
                {detail}
              </T>
            </g>
          ))}
          <T x={recovery.x + 14} y={recovery.y + 96} size={12} color={palette.muted}>
            Used when evidence is insufficient.
          </T>
          <T x={recovery.x + 14} y={recovery.y + 116} size={12} color={palette.faint}>
            Provider integration in progress.
          </T>
        </NodeButton>
      )}
      {showRecovery && (
        <path
          d={`M ${recovery.x + recovery.w} ${recovery.y + 60} H ${cols.evidence.x - 4}`}
          fill="none"
          strokeWidth={1.6}
          markerEnd="url(#flow-arrow)"
          {...pendingLine}
        />
      )}

      {/* 04 EVIDENCE */}
      <NodeButton label="Evidence: the EvidenceBundle" onSelect={pick('evidence')} selected={isSelected('evidence')} ring={ring('evidence')}>
        {stageCard('evidence')}
        {cardTitle('evidence', ['Normalized into one'])}
        <T x={cols.evidence.x + 18} y={TOP + 80} size={13} mono color={lit('evidence') ? palette.evidence : palette.muted}>
          EVIDENCEBUNDLE
        </T>
        {fields.map(({ id, label }, index) => {
          const y = fieldRowY(index)
          const state = example.fields[id]
          return (
            <g key={id}>
              <rect x={cols.evidence.x + 12} y={y} width={cols.evidence.w - 24} height={32} rx={7} fill={palette.surfaceRaised} stroke={palette.lineSoft} />
              <T x={cols.evidence.x + 26} y={y + 21} size={14} color={state === 'na' ? palette.faint : palette.text}>
                {label}
              </T>
              {lit('evidence') ? (
                <FieldMark x={cols.evidence.x + cols.evidence.w - 32} y={y + 16} state={state} />
              ) : (
                <circle cx={cols.evidence.x + cols.evidence.w - 32} cy={y + 16} r={3} fill={palette.faint} />
              )}
            </g>
          )
        })}
        <T x={cols.evidence.x + 18} y={680} size={11.5} mono color={palette.muted}>
          COVERAGE
        </T>
        {coverages.map(({ id, label, color }, index) => (
          <Chip
            key={id}
            x={cols.evidence.x + 12 + (index % 2) * 108}
            y={692 + Math.floor(index / 2) * 34}
            w={100}
            h={26}
            fontSize={10}
            label={label}
            color={color}
            active={lit('evidence') && id === example.coverage}
          />
        ))}
        <T x={cols.evidence.x + 18} y={782} size={12} color={palette.muted}>
          HTTP 200 is not proof of evidence.
        </T>
      </NodeButton>

      {/* 05 UNDERSTAND: evidence checks decide between a deterministic result and AI understanding */}
      <NodeButton
        label="Understand: evidence checks choose a deterministic result or AI understanding"
        onSelect={pick('understand')}
        selected={isSelected('understand')}
        ring={ring('understand')}
      >
        {stageCard('understand')}
        {cardTitle('understand', ['Evidence checks pick', 'the path for each link.'])}
        <T x={cols.understand.x + 18} y={462} size={11} mono color={palette.muted}>
          EVIDENCE CHECK
        </T>
        {[
          { id: 'deterministic', label: 'Deterministic result' },
          { id: 'ai', label: 'AI understanding' },
        ].map(({ id, label }, index) => {
          const y = 472 + index * 34
          const active = id === example.understanding
          return (
            <g key={id}>
              {fullRow('understand', y, 28, active)}
              {id === 'ai' && <SparkIcon x={cols.understand.x + 26} y={y + 7} size={14} color={active && lit('understand') ? palette.ai : palette.muted} />}
              <T x={cols.understand.x + (id === 'ai' ? 48 : 28)} y={y + 19} size={13.5} weight={active ? 700 : 500} color={active && lit('understand') ? palette.text : palette.muted}>
                {label}
              </T>
            </g>
          )
        })}
        <T x={cols.understand.x + 18} y={560} size={11} mono color={palette.muted}>
          AI PROVIDER OUTPUT
        </T>
        {outputs.map((output, index) => {
          const y = outputRowY(index)
          return (
            <g key={output}>
              {fullRow('understand', y, 27, example.understanding === 'ai')}
              <T x={cols.understand.x + 28} y={y + 18.5} size={13.5} color={lit('understand') ? palette.text : palette.muted}>
                {output}
              </T>
            </g>
          )
        })}
        <T x={cols.understand.x + 18} y={758} size={11} mono color={palette.muted}>
          CHECK RESULT
        </T>
        <T x={cols.understand.x + 18} y={778} size={13.5} weight={700} color={lit('understand') ? coverage.color : palette.faint}>
          {lit('understand') ? example.check : 'Waiting for evidence'}
        </T>
      </NodeButton>

      {/* 06 VALIDATE & PUBLISH */}
      <NodeButton label="Validate and publish" onSelect={pick('validate')} selected={isSelected('validate')} ring={ring('validate')}>
        {stageCard('validate')}
        {cardTitle('validate', ['Checks, then persists'])}
        {checks.map((check, index) => {
          const y = checkRowY(index)
          return (
            <g key={check}>
              {fullRow('validate', y, 36, true)}
              <T x={cols.validate.x + 28} y={y + 23} size={14} color={lit('validate') ? palette.text : palette.muted}>
                {check}
              </T>
            </g>
          )
        })}
        <Chip
          x={cols.validate.x + 12}
          y={636}
          w={cols.validate.w - 24}
          h={28}
          label={example.result}
          color={example.result === 'Full result' ? palette.full : palette.partial}
          active={lit('validate')}
        />
        <T x={cols.validate.x + 18} y={700} size={12.5} color={palette.muted}>
          Thin evidence keeps
        </T>
        <T x={cols.validate.x + 18} y={717} size={12.5} color={palette.muted}>
          a limited result.
        </T>
      </NodeButton>

      {/* 07 USE */}
      <NodeButton label="Saved knowledge: library, search, Ask Sted and recap" onSelect={pick('use')} selected={isSelected('use')} ring={ring('use')}>
        {stageCard('use')}
        {cardTitle('use', ['Ready to use'])}
        {uses.map((use, index) => {
          const y = useRowY(index)
          return (
            <g key={use}>
              {fullRow('use', y, 44, true)}
              <T x={cols.use.x + 28} y={y + 27} size={14.5} color={lit('use') ? palette.text : palette.muted}>
                {use}
              </T>
            </g>
          )
        })}
      </NodeButton>

      {/* Bridge to step 02: saved knowledge is what Ask Sted works with */}
      <path d={`M ${cols.use.x + cols.use.w / 2} ${BOTTOM} V 856`} stroke={palette.storage} strokeWidth={1.6} strokeOpacity={0.7} markerEnd="url(#flow-arrow)" />
      <NodeButton label="Continues in step 02: how Ask Sted uses your saved knowledge" onSelect={pick('next')} selected={isSelected('next')} ring={{ x: 1134, y: 862, w: 690, h: 138 }}>
        <Panel x={1134} y={862} w={690} h={138} color={palette.storage} />
        <T x={1154} y={892} size={12} mono color={palette.storage}>
          CONTINUES IN STEP 02
        </T>
        <T x={1154} y={930} size={24} weight={700} spacing={-0.5}>
          How Ask Sted uses your saved knowledge
        </T>
        <path d="M 1776 922 h 22 m -8 -8 l 8 8 l -8 8" fill="none" stroke={palette.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <T x={1154} y={968} size={14} color={palette.muted}>
          It searches, reads and cites what this pipeline saved, through server tools.
        </T>
      </NodeButton>

      <CategoryLegend x={96} y={886} />
      <Footnote notes={[pageCopy.integrationNote, 'Illustrative walkthrough. Example URLs are fictional.']} />

      {/* Highlighted route for the current example */}
      <g filter="url(#route-glow)">
        {segments.map(({ d, color }, index) => (
          <path
            key={`route-${example.id}-${index}`}
            ref={(element) => {
              segmentRefs.current[index] = element
            }}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* The travelling link: hidden in exports and in static mode */}
      <g ref={pulseRef} data-export="hide" style={{ opacity: 0 }} pointerEvents="none">
        <circle r={16} fill={palette.evidence} fillOpacity={0.18} />
        <circle r={6} fill={palette.text} />
        <rect x={-74} y={-44} width={148} height={24} rx={12} fill={palette.surfaceRaised} stroke={palette.evidence} strokeWidth={1.2} />
        <T x={0} y={-27.5} size={11.5} mono anchor="middle" color={palette.evidence}>
          {shortUrl(example.url)}
        </T>
      </g>
    </svg>
  )
}

function shortUrl(url: string) {
  const bare = url.replace(/^https?:\/\//, '')
  return bare.length > 20 ? `${bare.slice(0, 19)}…` : bare
}

export function DiagramBackdrop() {
  return (
    <>
      <defs>
        <pattern id="arch-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.1" fill={palette.dot} />
        </pattern>
        <radialGradient id="arch-glow" cx="55%" cy="35%" r="80%">
          <stop offset="0%" stopColor={palette.glow} />
          <stop offset="100%" stopColor={palette.bg} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#arch-glow)" />
      <rect width={W} height={H} fill="url(#arch-dots)" />
    </>
  )
}
