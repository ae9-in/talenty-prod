"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface VettingStage {
  step: string
  title: string
  desc: string
  image: string
  criteria: string[]
}

export const VETTING_STAGES: VettingStage[] = [
  {
    step: "01",
    title: "Sourcing & Portfolio Signal Extraction",
    desc: "We parse candidates against verified GitHub repositories, production architectures, and professional records. We evaluate actual code quality and past technical contributions before any outreach occurs.",
    image: "/images/vetting-stage-1.jpg",
    criteria: [
      "Verified GitHub repositories & commit history",
      "Production concurrency & code quality inspection",
      "Compensation expectations calibrated within market band"
    ]
  },
  {
    step: "02",
    title: "Calibrated Technical Challenge & System Design",
    desc: "Candidates complete role-specific coding challenges testing algorithmic rigor, concurrency, error-handling, and edge caching. We inspect how they reason through real production constraints.",
    image: "/images/vetting-stage-2.jpg",
    criteria: [
      "Role-calibrated concurrency and system design review",
      "Production fault-tolerance & architectural tradeoff evaluation",
      "Direct peer review & code maintainability verification"
    ]
  },
  {
    step: "03",
    title: "Structured Behavioral & Communication Round",
    desc: "A structured interview conducted by senior evaluators assessing technical communication, cross-functional collaboration, ownership mentality, and problem-solving transparency.",
    image: "/images/vetting-stage-3.jpg",
    criteria: [
      "Structured behavioral evaluation using calibrated rubrics",
      "Cross-functional ownership & team alignment assessed",
      "Communication clarity and technical reasoning confirmed"
    ]
  },
  {
    step: "04",
    title: "Skills-Gap Calibration & Stack Training",
    desc: "When a strong candidate lacks familiarity with your exact toolchain (e.g., custom Kubernetes orchestrators or GraphQL schemas), we deliver targeted pre-placement upskilling to eliminate onboarding lag.",
    image: "/images/vetting-stage-4.jpg",
    criteria: [
      "Stack-specific toolchain upskilling and bootcamp modules",
      "Hands-on lab exercises tailored to your production stack",
      "Day-one readiness verification before start date"
    ]
  },
  {
    step: "05",
    title: "Verification & Offer Lock",
    desc: "Direct verification with former engineering leads, academic record authentication, and compensation alignment to ensure rapid offer acceptance with zero surprises.",
    image: "/images/vetting-stage-5.jpg",
    criteria: [
      "Direct reference checks with past engineering managers",
      "Identity, academic, and credential authentication",
      "Mutual compensation alignment and digital offer lock"
    ]
  }
]

export function VettingStages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const [activeStageIdx, setActiveStageIdx] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Desktop ScrollTrigger pinning & measured scroll detection (>= 1024px)
  useGSAP(() => {
    if (prefersReducedMotion) return
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const gates = gsap.utils.toArray<HTMLElement>(".vetting-stage-card")
      const rightColumn = rightColumnRef.current
      let currentIdx = -1

      const getScrollDistance = () => {
        if (!rightColumn) return 1000
        return Math.max(0, rightColumn.offsetHeight - 380)
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=112",
        end: () => `+=${getScrollDistance()}`,
        pin: ".gates-left-sticky",
        pinSpacing: false,
        onUpdate: (self) => {
          const idx = Math.min(gates.length - 1, Math.max(0, Math.round(self.progress * (gates.length - 1))))
          if (idx !== currentIdx) {
            currentIdx = idx
            setActiveStageIdx(idx)
          }
        },
      })

      // Layout stability listeners & ResizeObserver
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }
      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener("resize", onResize)
      window.addEventListener("load", onResize)

      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== "undefined" && rightColumn) {
        resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh()
        })
        resizeObserver.observe(rightColumn)
      }

      return () => {
        window.removeEventListener("resize", onResize)
        window.removeEventListener("load", onResize)
        if (resizeObserver) resizeObserver.disconnect()
        st.kill()
      }
    })

    return () => mm.revert()
  }, { scope: containerRef, dependencies: [prefersReducedMotion] })

  const currentStage = VETTING_STAGES[activeStageIdx]

  return (
    <div ref={containerRef} className="five-gates-section w-full">
      {/* ─── Desktop Pinned Side-by-Side (>= 1024px) ─── */}
      <div className="hidden lg:grid lg:grid-cols-[400px_1fr] gap-12 items-start relative">
        
        {/* Sticky Left Column — Modest photo panel + small gold numeral */}
        <div className="gates-left-sticky space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#15120F]/15 bg-[#15120F] shadow-[6px_6px_0px_0px_rgba(21,18,15,0.9)]">
            {VETTING_STAGES.map((s, idx) => {
              const isActive = idx === activeStageIdx
              return (
                <motion.div
                  key={s.step}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : idx < activeStageIdx ? -10 : 10,
                    scale: isActive && !prefersReducedMotion ? 1 : 1.03,
                  }}
                  transition={{
                    opacity: { duration: 0.45, ease: [0.45, 0, 0.55, 1] },
                    y: { duration: 0.45, ease: "easeOut" },
                    scale: { duration: 0.5, ease: "easeOut" },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={idx === 0}
                    sizes="400px"
                    className="object-cover object-center"
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Small Gold Stage Numeral & Title underneath photo */}
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="font-mono text-xs font-bold text-[#CD9534] tracking-widest uppercase">
              STAGE {currentStage.step} OF 05
            </span>
            <span className="font-mono text-[11px] text-[#5C5449] font-medium">
              Verified Milestone
            </span>
          </div>
        </div>

        {/* Scrolling Right Column — Stage Cards */}
        <div ref={rightColumnRef} className="gates-right-column space-y-8 pb-16">
          {VETTING_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIdx
            return (
              <div
                key={stage.step}
                className={`vetting-stage-card rounded-3xl border-2 p-8 transition-all duration-300 ${
                  isActive
                    ? "border-[#15120F] bg-[#F7F2E4] shadow-[6px_6px_0px_0px_rgba(21,18,15,1)]"
                    : "border-[#15120F]/10 bg-[#F0E9D5]/50 hover:border-[#15120F]/30"
                }`}
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-[#15120F]/10 mb-4">
                  <span className="font-mono text-xs font-bold text-[#CD9534] tracking-widest uppercase">
                    STAGE {stage.step}
                  </span>
                  <div className="font-mono text-[10.5px] font-bold text-[#15120F] bg-[#F0E9D5] px-3 py-0.5 rounded-full border border-[#15120F]/10">
                    Gate 0{idx + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#141110] mb-3">
                  {stage.title}
                </h3>

                <p className="text-sm sm:text-[14.5px] text-[#5C5449] leading-relaxed mb-6 font-sans">
                  {stage.desc}
                </p>

                {/* Criteria checks */}
                <div className="space-y-2.5 pt-4 border-t border-[#15120F]/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#5C5449] font-bold block">
                    Verification Criteria:
                  </span>
                  {stage.criteria.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#CD9534] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#141110] font-medium font-sans">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── Mobile Stacked Layout (< 1024px) ─── */}
      <div className="lg:hidden space-y-6">
        {VETTING_STAGES.map((stage) => (
          <div
            key={stage.step}
            className="rounded-3xl border-2 border-[#15120F]/15 bg-[#F7F2E4] p-6 shadow-sm space-y-5"
          >
            {/* Mobile Photo (4:3 modest size) */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#15120F]/10">
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#15120F]/10">
              <span className="font-mono text-xs font-bold text-[#CD9534] tracking-widest uppercase">
                STAGE {stage.step}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#15120F] bg-[#F0E9D5] px-2.5 py-0.5 rounded-full border border-[#15120F]/10">
                Gate 0{parseInt(stage.step)}
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#141110]">
              {stage.title}
            </h3>

            <p className="text-sm text-[#5C5449] leading-relaxed font-sans">
              {stage.desc}
            </p>

            <div className="space-y-2 pt-3 border-t border-[#15120F]/10">
              {stage.criteria.map((c, cIdx) => (
                <div key={cIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#CD9534] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#141110] font-medium font-sans">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
