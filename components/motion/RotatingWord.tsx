"use client"

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react"

export interface RotatingItem {
  word: string
  copy: string
}

export interface RotatingWordProps {
  items: RotatingItem[]
  dwellMs?: number
  transitionMs?: number
  onIndexChange?: (i: number) => void
  paused?: boolean
  /** className applied to the word span itself */
  wordClassName?: string
}

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const

/**
 * RotatingWord
 * Shared masked-line-swap primitive.
 * — Word container width fixed to the widest of all words: no reflow.
 * — Out: y: -100%, opacity: 0 in 0.32s inside overflow:hidden mask.
 * — In:  y: 100% → 0, opacity: 0 → 1 in 0.42s, overlapping the out by ~0.18s.
 * — prefers-reduced-motion: renders item[0] static, no auto-advance.
 * — Pauses on: prop, hover, focus-within, document.hidden.
 * — Accessible: hidden static block listing all words + copy; aria-live="off" on rotating region.
 * — Visible labelled pause control per WCAG 2.2.2 (content running >= 5s).
 */
export function RotatingWord({
  items,
  dwellMs = 5000,
  transitionMs = 620,
  onIndexChange,
  paused: pausedProp = false,
  wordClassName = "",
}: RotatingWordProps) {
  const [idx, setIdx] = useState(0)
  const [isVisible, setIsVisible] = useState(true)      // word currently showing
  const [manualPause, setManualPause] = useState(false)
  const [hoverPause, setHoverPause] = useState(false)
  const [focusPause, setFocusPause] = useState(false)
  const [hiddenTabPause, setHiddenTabPause] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Track widest word width for fixed container
  const measuredWidths = useRef<Record<number, number>>({})
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const sizerRefs = useRef<(HTMLSpanElement | null)[]>([])

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inTransition = useRef(false)

  const effectivePaused =
    pausedProp ||
    manualPause ||
    hoverPause ||
    focusPause ||
    hiddenTabPause ||
    prefersReducedMotion

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Tab visibility
  useEffect(() => {
    const handler = () => setHiddenTabPause(document.hidden)
    document.addEventListener("visibilitychange", handler)
    return () => document.removeEventListener("visibilitychange", handler)
  }, [])

  // Measure all words after mount to get fixed container width
  useEffect(() => {
    if (sizerRefs.current.length === 0) return
    let maxW = 0
    sizerRefs.current.forEach((el) => {
      if (el) maxW = Math.max(maxW, el.getBoundingClientRect().width)
    })
    setContainerWidth(maxW)
  }, [items])

  const idxRef = useRef(idx)
  useEffect(() => {
    idxRef.current = idx
  }, [idx])

  const advance = useCallback(
    (direction: 1 | -1 = 1) => {
      if (inTransition.current) return
      inTransition.current = true

      const outDuration = transitionMs * 0.52   // ~322ms
      const overlap    = transitionMs * 0.29   // ~180ms

      // 1. Animate current word OUT
      setIsVisible(false)

      // 2. After out - overlap, swap the word and animate IN
      setTimeout(() => {
        const next = (idxRef.current + direction + items.length) % items.length
        setIdx(next)
        onIndexChange?.(next)

        // tiny frame to let React render the new word offscreen
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsVisible(true)
            setTimeout(() => {
              inTransition.current = false
            }, transitionMs * 0.68)
          })
        })
      }, outDuration - overlap)
    },
    [items.length, transitionMs, onIndexChange]
  )

  // Auto-advance loop — driven by a single timer; paragraph sync via onIndexChange
  useEffect(() => {
    if (effectivePaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      advance(1)
    }, dwellMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [effectivePaused, dwellMs, advance])

  const currentItem = items[idx]

  // CSS transition values
  const wordStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        transform: isVisible ? "translateY(0%)" : "translateY(-110%)",
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `transform ${transitionMs * 0.68}ms cubic-bezier(${EASE_OUT_EXPO.join(",")}), opacity ${transitionMs * 0.45}ms ease`
          : `transform ${transitionMs * 0.52}ms cubic-bezier(0.4,0,0.2,1), opacity ${transitionMs * 0.35}ms ease`,
      }

  return (
    <span
      className="relative inline-block"
      aria-live="off"
    >
      {/* Hidden sizer elements to measure the widest word */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            ref={(el) => { sizerRefs.current[i] = el }}
            className={`block ${wordClassName}`}
          >
            {item.word}
          </span>
        ))}
      </span>

      {/* Fixed-width overflow:hidden mask — the key to no-reflow */}
      <span
        className="inline-block overflow-hidden align-bottom"
        style={containerWidth != null ? { width: containerWidth } : {}}
      >
        <span
          className={`inline-block will-change-transform ${wordClassName}`}
          style={wordStyle}
          aria-hidden={prefersReducedMotion ? undefined : "true"}
        >
          {currentItem.word}
        </span>
      </span>

      {/* Accessible static list — always in DOM, screen-reader only */}
      <span className="sr-only">
        {items.map((item, i) => (
          <span key={i}>
            {item.word}: {item.copy}
            {i < items.length - 1 ? ". " : ""}
          </span>
        ))}
      </span>

      {/* Visible pause control (WCAG 2.2.2) */}
      <button
        type="button"
        aria-label={manualPause ? "Resume rotating text" : "Pause rotating text"}
        onClick={() => setManualPause((p) => !p)}
        className="absolute -bottom-5 right-0 text-[10px] font-mono text-current/40 hover:text-current/70 transition-colors focus-visible:outline focus-visible:outline-2 outline-offset-2 focus-visible:outline-current whitespace-nowrap"
      >
        {manualPause ? "▶ resume" : "⏸ pause"}
      </button>
    </span>
  )
}
