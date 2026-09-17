"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { CheckCircle2, FileText, UserCheck, ShieldCheck } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

gsap.registerPlugin(useGSAP)

const DWELL = 5000 // 5000ms = 5.0s total per candidate, reveal included

export interface EvidenceChip {
  id: string
  text: string
  detail: string
  startX: number
  startY: number
}

export interface CandidateScorecard {
  id: string
  name: string
  role: string
  isExample: boolean
  verdict: string
  recruiterNotes: string
  keywords: string[]
  documentExcerpt: {
    experience: string
    lines: { title: string; desc: string }[]
  }
  evidence: EvidenceChip[]
}

const CANDIDATES: CandidateScorecard[] = [
  {
    id: "cand-1",
    name: "Priya Sharma",
    role: "Senior Distributed Systems Engineer",
    isExample: true,
    verdict: "Recommended for Senior Backend",
    recruiterNotes: "Strong systems-design depth, confirmed via architecture walkthrough and direct reference call with her former engineering lead.",
    keywords: ["Go", "gRPC", "Kafka", "Kubernetes", "Distributed systems"],
    documentExcerpt: {
      experience: "6+ Yrs · Distributed Backend Systems",
      lines: [
        { title: "Distributed Services (Go / gRPC)", desc: "Production concurrency & service meshes" },
        { title: "Kafka Event Pipelines", desc: "Led cluster migration across core fintech loop" },
        { title: "Kubernetes & Cloud Reliability", desc: "Zero-downtime rolling deploys on multi-region" },
        { title: "Engineering Lead Reference", desc: "Confirmed technical ownership & clean handoffs" }
      ]
    },
    evidence: [
      { id: "e1", text: "6 yrs distributed systems & Go", detail: "Production microservices", startX: -16, startY: -10 },
      { id: "e2", text: "Led Kafka migration, prior fintech", detail: "High-throughput pipeline", startX: -20, startY: 0 },
      { id: "e3", text: "Multi-region Kubernetes rollouts", detail: "Fault-tolerant architecture", startX: -16, startY: 10 },
      { id: "e4", text: "Reference confirmed — former lead", detail: "Technical ownership verified", startX: -12, startY: 20 }
    ]
  },
  {
    id: "cand-2",
    name: "Alex Rivera",
    role: "Lead ML Platform & GPU Infra Engineer",
    isExample: true,
    verdict: "Recommended for ML Platform Lead",
    recruiterNotes: "Deep production ML serving expertise, demonstrated across model quantization benchmarks and multi-node GPU cluster orchestration.",
    keywords: ["Python", "Triton", "vLLM", "CUDA", "GPU Clusters"],
    documentExcerpt: {
      experience: "5+ Yrs · High-Scale AI Infrastructure",
      lines: [
        { title: "ML Serving (Triton / vLLM)", desc: "Low-latency inference serving on AWS / GCP" },
        { title: "Custom CUDA Profiling", desc: "Hands-on kernel memory bandwidth tuning" },
        { title: "Cluster Cost Optimization", desc: "Dynamic GPU allocation cutting cluster spend" },
        { title: "VP Engineering Reference", desc: "Confirmed execution velocity and team leadership" }
      ]
    },
    evidence: [
      { id: "e1", text: "5 yrs ML platform & GPU infra", detail: "Production Triton & vLLM", startX: -16, startY: -10 },
      { id: "e2", text: "Custom CUDA kernel optimization", detail: "Quantization & latency tuning", startX: -20, startY: 0 },
      { id: "e3", text: "Multi-node GPU cluster management", detail: "Dynamic autoscaling pipelines", startX: -16, startY: 10 },
      { id: "e4", text: "Reference confirmed — VP Engineering", detail: "Leadership & architecture verified", startX: -12, startY: 20 }
    ]
  },
  {
    id: "cand-3",
    name: "Karan Patel",
    role: "Staff Frontend Architect",
    isExample: true,
    verdict: "Recommended for Frontend Architect",
    recruiterNotes: "Proven design systems ownership and SSR performance tuning, verified through code sample walkthrough and reference check.",
    keywords: ["TypeScript", "React", "Next.js", "Design Systems", "SSR Caching"],
    documentExcerpt: {
      experience: "7+ Yrs · Web Architecture & Systems",
      lines: [
        { title: "Design Systems & Micro-frontends", desc: "Reusable component library across 4 product lines" },
        { title: "Modern Web (Next.js / TypeScript)", desc: "SSR Edge caching & sub-second LCP optimization" },
        { title: "Accessibility & Test Standards", desc: "Automated regression suites & WCAG 2.2 AA audit" },
        { title: "Principal Architect Reference", desc: "Confirmed architecture rigor and code quality" }
      ]
    },
    evidence: [
      { id: "e1", text: "7 yrs frontend architecture & React", detail: "Design systems leadership", startX: -16, startY: -10 },
      { id: "e2", text: "Led component library across 4 apps", detail: "High accessibility standard", startX: -20, startY: 0 },
      { id: "e3", text: "Core Web Vitals & edge caching", detail: "Sub-second LCP verified", startX: -16, startY: 10 },
      { id: "e4", text: "Reference confirmed — Principal Architect", detail: "Technical rigor confirmed", startX: -12, startY: 20 }
    ]
  }
]

export function ResumeScanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainTl = useRef<gsap.core.Timeline | null>(null)
  const activeRevealTl = useRef<gsap.core.Timeline | null>(null)
  const userPaused = useRef(false)

  const [candidateIdx, setCandidateIdx] = useState(0)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // 1. Dedicated Reveal Timeline Hook: Executes whenever candidateIdx updates on committed DOM
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".doc-image", { clipPath: "inset(0 0 0% 0)" })
        gsap.set(".keyword-pill", { opacity: 1, scale: 1 })
        gsap.set(".keyword-pill .tick", { opacity: 1 })
        gsap.set(".check-icon", { scale: 1, opacity: 1 })
        gsap.set(".evidence-text", { opacity: 1, x: 0 })
        gsap.set(".recruiter-note", { opacity: 1, y: 0 })
        gsap.set(".verdict-badge", { opacity: 1, scale: 1 })
        return
      }

      // Kill previous active reveal if any
      activeRevealTl.current?.kill()

      // Clean initial states
      gsap.set(".doc-image", { clipPath: "inset(0 0 100% 0)" })
      gsap.set(".scan-line", { opacity: 0, top: "0%" })
      gsap.set(".keyword-pill", { opacity: 0, scale: 0.9 })
      gsap.set(".keyword-pill .tick", { opacity: 0 })
      gsap.set(".check-icon", { scale: 0.4, opacity: 0 })
      gsap.set(".evidence-text", { opacity: 0, x: -6 })
      gsap.set(".recruiter-note", { opacity: 0, y: 8 })
      gsap.set(".verdict-badge", { opacity: 0, scale: 0.9 })

      const tl = gsap.timeline()
      activeRevealTl.current = tl

      // Phase 1: Scan sweep across the document (~800ms)
      tl.to(".scan-line", { opacity: 1, top: "0%", duration: 0.05 })
        .to(".scan-line", { top: "100%", duration: 0.75, ease: "power1.inOut" })
        .to(".doc-image", { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power1.inOut" }, "<")
        .to(".scan-line", { opacity: 0, duration: 0.1 })

      // Phase 2: Keyword pills tick off (~140ms apart, tick commits right after)
      tl.addLabel("keywords", "-=0.1")
      const currentKeywords = CANDIDATES[candidateIdx].keywords
      currentKeywords.forEach((_, i) => {
        tl.fromTo(
          `.pill-${i}`,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" },
          `keywords+=${i * 0.14}`
        ).to(
          `.pill-${i} .tick`,
          { opacity: 1, duration: 0.12, ease: "power3.out" },
          ">-0.04"
        )
      })

      // Phase 3: Evidence cards sequential tick-off (~180ms apart)
      tl.addLabel("evidence", ">-0.05")
      const currentEvidence = CANDIDATES[candidateIdx].evidence
      currentEvidence.forEach((_, i) => {
        const chipTl = gsap.timeline()
        chipTl
          .fromTo(
            `.chip-item-${i} .check-icon`,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.16, ease: "power3.out" }
          )
          .fromTo(
            `.chip-item-${i} .evidence-text`,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            "-=0.04"
          )

        tl.add(chipTl, `evidence+=${i * 0.18}`)
      })

      // Phase 4: Recruiter note + verdict badge reveal (~500ms)
      tl.fromTo(
        ".recruiter-note",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "+=0.1"
      ).fromTo(
        ".verdict-badge",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
        "<0.08"
      )
    },
    { scope: containerRef, dependencies: [candidateIdx, prefersReducedMotion] }
  )

  // 2. Master Autoplay Engine: Single owned GSAP timeline (5000ms dwell)
  useGSAP(
    () => {
      if (prefersReducedMotion) return

      const timeline = gsap.timeline({ repeat: -1 })

      CANDIDATES.forEach((c, i) => {
        timeline
          .addLabel(c.id)
          .call(() => {
            setCandidateIdx(i)
          })
          .to({}, { duration: DWELL / 1000 })
      })

      mainTl.current = timeline

      const el = containerRef.current
      if (!el) return

      const pause = () => {
        if (!userPaused.current) {
          mainTl.current?.pause()
          activeRevealTl.current?.pause()
        }
      }

      const resume = () => {
        if (!userPaused.current) {
          mainTl.current?.play()
          activeRevealTl.current?.play()
        }
      }

      el.addEventListener("mouseenter", pause)
      el.addEventListener("mouseleave", resume)
      el.addEventListener("focusin", pause)
      el.addEventListener("focusout", resume)

      const onVisibility = () => {
        if (document.hidden) {
          mainTl.current?.pause()
          activeRevealTl.current?.pause()
        } else {
          if (!userPaused.current) {
            mainTl.current?.play()
            activeRevealTl.current?.play()
          }
        }
      }

      document.addEventListener("visibilitychange", onVisibility)

      return () => {
        el.removeEventListener("mouseenter", pause)
        el.removeEventListener("mouseleave", resume)
        el.removeEventListener("focusin", pause)
        el.removeEventListener("focusout", resume)
        document.removeEventListener("visibilitychange", onVisibility)
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  // Manual tab clicks seek the running timeline (never stops future autoplay)
  const selectCandidate = (nextIdx: number) => {
    if (prefersReducedMotion) {
      setCandidateIdx(nextIdx)
      return
    }

    if (mainTl.current) {
      mainTl.current.seek(CANDIDATES[nextIdx].id)
      if (!userPaused.current) {
        mainTl.current.play()
      }
    } else {
      setCandidateIdx(nextIdx)
    }
  }

  const togglePause = () => {
    userPaused.current = !userPaused.current
    setIsUserPaused(userPaused.current)
    if (userPaused.current) {
      mainTl.current?.pause()
      activeRevealTl.current?.pause()
    } else {
      mainTl.current?.play()
      activeRevealTl.current?.play()
    }
  }

  const activeCand = CANDIDATES[candidateIdx]

  return (
    <div ref={containerRef} className="w-full space-y-4 relative">
      
      {/* ─── Hidden Accessible Pause Control (WCAG 2.2.2 compliance) ─── */}
      <button
        onClick={togglePause}
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-3 focus:py-1.5 focus:bg-[#15120F] focus:text-[#F7F2E4] focus:rounded-xl focus:border focus:border-[#1D3F91] font-mono text-xs cursor-pointer"
        aria-label={isUserPaused ? "Resume candidate scorecard rotation" : "Pause candidate scorecard rotation"}
      >
        {isUserPaused ? "Play rotation" : "Pause rotation"}
      </button>

      {/* ─── Candidate Switcher Bar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F0E9D5]/60 p-2 rounded-2xl border border-[#15120F]/12">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none" role="tablist" aria-label="Candidate scorecard tabs">
          {CANDIDATES.map((cand, idx) => {
            const isSelected = idx === candidateIdx
            return (
              <button
                key={cand.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectCandidate(idx)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#1D3F91] text-[#FFFFFF] shadow-xs"
                    : "text-[#5C5449] hover:text-[#15120F] hover:bg-[#F7F2E4]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#FFFFFF]" : "bg-[#15120F]/30"
                  }`}
                />
                <span>{cand.name.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>

        <span className="font-mono text-[10px] text-[#1D3F91] font-semibold px-2">
          Illustrative Recruiter Review
        </span>
      </div>

      {/* ─── Cream Theme Scorecard Frame ─── */}
      <div
        className="scorecard-frame relative rounded-3xl bg-[#FFFFFF] text-[#141110] p-5 sm:p-6 border border-[#E7DFD0] shadow-[0_1px_2px_rgba(20,17,16,0.04),0_8px_24px_-12px_rgba(20,17,16,0.10)] overflow-hidden"
        aria-live="off"
      >
        <div className="scorecard-content space-y-4">
          
          {/* 1. Header: Candidate Info & Categorical Verdict */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#15120F]/10">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1D3F91]" />
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#141110]">
                  {activeCand.name}
                </h4>
                <span className="font-mono text-[9px] text-[#5C5449] bg-[#F0E9D5] border border-[#15120F]/10 px-2 py-0.5 rounded-md">
                  Example Case
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#1D3F91] font-medium mt-0.5">
                {activeCand.role}
              </p>
            </div>

            {/* Categorical Verdict Badge */}
            <div className="verdict-badge flex-shrink-0 self-start sm:self-auto">
              <div className="bg-[#1D3F91] text-[#FFFFFF] font-mono font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFFFFF]" />
                <span>{activeCand.verdict}</span>
              </div>
            </div>
          </div>

          {/* 2. Keyword-Pill Sequential Tick Tier */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <Eyebrow className="mr-1 text-[10px]">
              Verified Stack:
            </Eyebrow>
            {activeCand.keywords.map((word, kIdx) => (
              <span
                key={word}
                className={`keyword-pill pill-${kIdx} bg-[#101F45] text-[#FFFFFF] rounded-lg px-2.5 py-0.5 text-[11px] font-mono inline-flex items-center gap-1.5 border border-[#1D3F91]/30 opacity-0`}
              >
                <CheckCircle2 className="tick w-3 h-3 text-[#93B4F8] opacity-0 flex-shrink-0" />
                <span>{word}</span>
              </span>
            ))}
          </div>

          {/* 3. Middle Section: Document CV Excerpt + Sequential Tick-Off Evidence Cards */}
          <div className="grid md:grid-cols-2 gap-4 items-stretch pt-1">
            
            {/* Left: Document Panel with Scan Sweep */}
            <div className="doc-panel relative rounded-2xl bg-[#F0E9D5]/50 border border-[#15120F]/10 p-3.5 overflow-hidden flex flex-col justify-between min-h-[160px]">
              
              {/* Royal Blue Scan Line */}
              <div
                className="scan-line absolute left-0 right-0 h-[2px] bg-[#1D3F91] shadow-[0_0_8px_1px_rgba(29,63,145,0.4)] z-20 pointer-events-none opacity-0"
              />

              {/* Document Excerpt Content Revealed by Clip-Path */}
              <div
                className="doc-image space-y-2.5 h-full"
                style={{ clipPath: "inset(0 0 100% 0)" }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#15120F]/10">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5C5449] font-bold">
                    Primary Technical Records
                  </span>
                  <span className="font-mono text-[9px] text-[#1D3F91] font-semibold">
                    {activeCand.documentExcerpt.experience}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {activeCand.documentExcerpt.lines.map((line, lIdx) => (
                    <div key={lIdx} className="text-[10.5px] bg-[#FFFFFF] p-2 rounded-lg border border-[#15120F]/10 shadow-2xs">
                      <div className="font-medium text-[#141110] truncate">{line.title}</div>
                      <div className="text-[#5C5449] text-[9.5px] truncate">{line.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sequential Tick-Off Evidence Cards */}
            <div className="space-y-2 flex flex-col justify-center">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#1D3F91] font-bold block">
                Extracted & Verified Evidence:
              </span>

              {activeCand.evidence.map((chip, cIdx) => (
                <div
                  key={chip.id}
                  className={`chip-item chip-item-${cIdx} flex items-start gap-2 p-2 rounded-xl bg-[#F7F2E4] border border-[#15120F]/10`}
                >
                  <div className="check-icon flex-shrink-0 mt-0.5 opacity-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D3F91]" />
                  </div>
                  <div className="evidence-text min-w-0 opacity-0">
                    <p className="text-xs font-medium text-[#141110] truncate">
                      {chip.text}
                    </p>
                    <p className="text-[10px] text-[#5C5449] font-mono truncate">
                      {chip.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recruiter Notes Footer (Human-voiced assessment) */}
          <div
            className="recruiter-note pt-3.5 border-t border-[#15120F]/10 flex items-start gap-2.5 opacity-0 bg-[#F0E9D5]/40 p-3 rounded-2xl"
          >
            <UserCheck className="w-4 h-4 text-[#1D3F91] flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] text-[#1D3F91] uppercase tracking-wider font-bold block">
                Recruiter notes
              </span>
              <p className="text-xs text-[#141110] leading-relaxed font-sans">
                {activeCand.recruiterNotes}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Visually-hidden static transcript for screen readers */}
      <div className="sr-only">
        <h3>Candidate Evaluation Records</h3>
        {CANDIDATES.map((cand) => (
          <div key={cand.id}>
            <h4>{cand.name} — {cand.role} ({cand.verdict})</h4>
            <p>{cand.documentExcerpt.experience}</p>
            <p>Verified Skills: {cand.keywords.join(", ")}</p>
            <ul>
              {cand.evidence.map((e) => (
                <li key={e.id}>{e.text}: {e.detail}</li>
              ))}
            </ul>
            <p>Evaluator Notes: {cand.recruiterNotes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
