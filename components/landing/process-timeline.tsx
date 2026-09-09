"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface TimelineStep {
  id: string
  title: string
  desc: string
  stat: string
  details: string[]
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "step-1",
    title: "Sourcing & Portfolio Signal Extraction",
    desc: "Targeted candidates matching your exact technical criteria are parsed against verified GitHub repositories, production architectures, and professional records. Vetted, structured data ready for your review.",
    stat: "Stage 01 Cleared",
    details: ["Verified GitHub repos & code quality", "Salary expectation calibrated", "Work authorization checked"]
  },
  {
    id: "step-2",
    title: "Calibrated Technical Challenge",
    desc: "Candidates complete role-specific coding challenges testing algorithmic rigor, concurrency, error-handling, and edge caching. We inspect how they reason through real production constraints.",
    stat: "Stage 02 Cleared",
    details: ["Custom technical test results", "Multi-vector fit breakdown", "Role-specific benchmarks"]
  },
  {
    id: "step-3",
    title: "Behavioral & Communication Round",
    desc: "A structured interview conducted by senior evaluators assessing technical communication, cross-functional collaboration, ownership mentality, and problem-solving transparency.",
    stat: "Stage 03 Cleared",
    details: ["Multi-interviewer scorecards", "Zero-bias evaluation rubric", "Calibrated interview rubrics"]
  },
  {
    id: "step-4",
    title: "Offer & Placement Lock",
    desc: "Direct verification with former engineering leads, academic record authentication, and compensation alignment to ensure rapid offer acceptance with zero surprises.",
    stat: "Stage 04 Cleared",
    details: ["Digital offer letter dispatch", "Document sequence queued", "Candidate onboarding kickoff"]
  }
]

// Thresholds: each stage dot activates when scrub progress passes this value
const DOT_THRESHOLDS = [0, 0.3, 0.6, 0.85]

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackBaseRef = useRef<HTMLDivElement>(null)
  const trackFillRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeDots, setActiveDots] = useState<boolean[]>([false, false, false, false])
  const progressRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    if (mq.matches) {
      setActiveDots([true, true, true, true])
    }
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches) setActiveDots([true, true, true, true])
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useGSAP(() => {
    if (prefersReducedMotion) return
    if (!sectionRef.current || !trackFillRef.current || !markerRef.current || !trackBaseRef.current) return

    const fill = trackFillRef.current
    const marker = markerRef.current

    // Set initial state
    gsap.set(fill, { scaleY: 0, transformOrigin: "top center" })
    gsap.set(marker, { opacity: 0, y: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress
          progressRef.current = progress

          // Update active states for each dot based on thresholds
          setActiveDots(DOT_THRESHOLDS.map((t) => progress >= t))

          // Calculate travel distance
          if (trackBaseRef.current) {
            const trackHeight = trackBaseRef.current.clientHeight
            const targetY = progress * trackHeight
            gsap.set(marker, {
              y: targetY,
              opacity: progress > 0.02 && progress < 0.98 ? 1 : 0.4,
            })
          }
        },
      },
    })

    tl.to(fill, {
      scaleY: 1,
      ease: "none",
      duration: 1,
    })

    return () => {
      tl.kill()
    }
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: idx * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div ref={sectionRef} className="relative w-full py-6">
      {/* ─── Center Vertical Timeline Track (Desktop) ─── */}
      <div
        ref={trackBaseRef}
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-[#15120F]/10 rounded-full overflow-hidden"
      >
        {/* Active gold fill — scaleY animated by GSAP */}
        <div
          ref={trackFillRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #8A6420, #CD9534, #F0E9D5, #CD9534)",
            transformOrigin: "top center",
            scaleY: prefersReducedMotion ? 1 : 0,
          } as React.CSSProperties}
        />

        {/* Traveling dot marker */}
        {!prefersReducedMotion && (
          <div
            ref={markerRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3 flex items-center justify-center z-10"
            style={{ opacity: 0 }}
          >
            <div className="absolute w-3 h-3 rounded-full border-2 border-[#CD9534] bg-[#CD9534]/30 shadow-[0_0_8px_rgba(205,149,52,0.6)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#CD9534]" />
          </div>
        )}
      </div>

      {/* ─── Stage Cards ─── */}
      <div className="space-y-10 sm:space-y-14">
        {TIMELINE_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0
          const isActive = activeDots[idx]

          return (
            <div
              key={step.id}
              className={`relative grid gap-6 lg:grid-cols-2 items-center ${
                isEven ? "lg:text-left" : "lg:grid-flow-dense"
              }`}
            >
              {/* ─── Stage Dot (Desktop) — flips gold when active ─── */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full z-10"
                style={{
                  border: isActive ? "2px solid #CD9534" : "2px solid rgba(21,18,15,0.2)",
                  background: isActive ? "#CD9534" : "#F7F2E4",
                  boxShadow: isActive ? "0 0 12px rgba(205,149,52,0.5)" : "none",
                  transition: "all 0.35s ease"
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: isActive ? "#15120F" : "rgba(21,18,15,0.35)",
                    transition: "background 0.35s ease"
                  }}
                />
              </div>

              {/* ─── Stage Card Content ─── */}
              <motion.div
                className={`w-full ${isEven ? "lg:pr-14" : "lg:col-start-2 lg:pl-14"}`}
                custom={idx}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
              >
                <div
                  className={`rounded-3xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                    isActive
                      ? "border-[#15120F] bg-[#FFFFFF] shadow-[6px_6px_0px_0px_rgba(21,18,15,0.95)]"
                      : "border-[#15120F]/12 bg-[#F0E9D5]/60 hover:border-[#15120F]/40"
                  }`}
                >
                  {/* Top Bar with clean right-aligned stat pill */}
                  <div className="flex items-center justify-end pb-3.5 border-b border-[#15120F]/10 mb-4">
                    <div className="font-mono text-xs font-bold text-[#141110] bg-[#F0E9D5] px-3 py-1 rounded-xl border border-[#15120F]/10">
                      {step.stat}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#141110] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#5C5449] leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-[#15120F]/10">
                    {step.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 text-xs font-medium text-[#141110]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6420] flex-shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ─── Decorative Stage Label (opposite side, desktop) ─── */}
              <div
                className={`hidden lg:flex items-center ${
                  isEven ? "justify-start pl-14" : "justify-end pr-14"
                }`}
              >
                <span
                  className="font-serif italic text-4xl font-bold select-none transition-all duration-500"
                  style={{
                    color: isActive ? "rgba(21,18,15,0.18)" : "rgba(21,18,15,0.08)"
                  }}
                >
                  Stage 0{idx + 1}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
