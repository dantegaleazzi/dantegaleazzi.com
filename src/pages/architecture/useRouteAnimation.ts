import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Draws a route segment by segment and moves a pulse along it.
// `reached` is how many segments are complete, so nodes can light up as the pulse arrives.
export function useRouteAnimation({
  segments,
  playing,
  frozen,
  runKey,
  onFinished,
  segmentMs = 820,
  travel = 0.72,
  leadIn = 400,
}: {
  segments: number
  playing: boolean
  frozen: boolean
  runKey: string
  onFinished: () => void
  segmentMs?: number
  travel?: number
  leadIn?: number
}) {
  const [reached, setReached] = useState(frozen ? segments : 0)
  const elapsed = useRef(0)
  const segmentRefs = useRef<(SVGPathElement | null)[]>([])
  const pulseRef = useRef<SVGGElement | null>(null)

  const progressAt = useCallback(
    (time: number) => {
      const t = Math.max(0, time - leadIn)
      const segment = Math.floor(t / segmentMs)
      if (segment >= segments) return segments
      return segment + Math.min(1, (t % segmentMs) / segmentMs / travel)
    },
    [leadIn, segmentMs, segments, travel],
  )

  const paint = useCallback(
    (progress: number) => {
      segmentRefs.current.slice(0, segments).forEach((path, index) => {
        if (!path) return
        const length = path.getTotalLength()
        const drawn = Math.min(1, Math.max(0, progress - index))
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length * (1 - drawn)}`
      })
      setReached(Math.floor(progress))
      const pulse = pulseRef.current
      if (!pulse) return
      const index = Math.min(Math.floor(progress), segments - 1)
      const path = segmentRefs.current[index]
      if (!path || progress >= segments) {
        pulse.style.opacity = '0'
        return
      }
      const point = path.getPointAtLength(path.getTotalLength() * (progress - index))
      pulse.style.opacity = '1'
      pulse.setAttribute('transform', `translate(${point.x} ${point.y})`)
    },
    [segments],
  )

  useLayoutEffect(() => {
    elapsed.current = 0
  }, [runKey])

  useLayoutEffect(() => {
    paint(frozen ? segments : progressAt(elapsed.current))
  }, [frozen, paint, progressAt, runKey, segments])

  useEffect(() => {
    if (!playing || frozen) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      elapsed.current += now - last
      last = now
      const progress = progressAt(elapsed.current)
      paint(progress)
      if (progress >= segments) {
        onFinished()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, frozen, paint, progressAt, onFinished, runKey, segments])

  return { reached, segmentRefs, pulseRef }
}
