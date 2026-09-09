"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, UserCheck, ShieldCheck } from "lucide-react"

interface WorkflowStage {
  id: number
  stepNumber: string
  title: string
  candidateName: string
  candidateRole: string
  candidateAvatar: string
  statusLabel: string
  statMetric: string
  checks: string[]
  recruiterNote: string
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Sourcing & portfolio signal extraction",
    candidateName: "Aarav Mehta",
    candidateRole: "Senior Go & Distributed Systems",
    candidateAvatar: "AM",
    statusLabel: "Profile Calibrated",
    statMetric: "Stage 01 Cleared",
    checks: [
      "Verified GitHub repositories & commit history inspected",
      "Production concurrency & high-throughput experience validated",
      "Compensation expectations aligned within market band"
    ],
    recruiterNote: "Senior engineering lead reviews repository commit history and architectural records."
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Calibrated technical challenge",
    candidateName: "Priya Sharma",
    candidateRole: "Lead Full-Stack / Cloud Architecture",
    candidateAvatar: "PS",
    statusLabel: "Technical Round Cleared",
    statMetric: "Stage 02 Cleared",
    checks: [
      "Live coding challenge testing algorithmic rigor and error handling",
      "Fault-tolerant microservices architecture walkthrough completed",
      "Code quality and testing discipline approved"
    ],
    recruiterNote: "Completed a live technical round; reviewed and approved by a senior engineer."
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Behavioral & communication round",
    candidateName: "Alex Rivera",
    candidateRole: "Staff AI & MLOps Engineer",
    candidateAvatar: "AR",
    statusLabel: "Panel Consensus",
    statMetric: "Stage 03 Cleared",
    checks: [
      "Structured behavioral round with senior technical panel",
      "Communication clarity and cross-functional ownership evaluated",
      "Independent interviewer scorecards submitted without bias"
    ],
    recruiterNote: "Structured cross-functional behavioral evaluation conducted with calibrated rubrics."
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Offer & placement",
    candidateName: "Shreya Balan",
    candidateRole: "Cloud Platform Associate",
    candidateAvatar: "SB",
    statusLabel: "Offer Extended",
    statMetric: "Stage 04 Cleared",
    checks: [
      "Digital offer letter generated with verified compensation schedule",
      "Pre-placement stack calibration and toolchain training completed",
      "Direct reference checks and credential verification cleared"
    ],
    recruiterNote: "Mutual compensation alignment verified and digital offer terms finalized."
  }
]

// ─── Sloped connector SVG between two steps ─────────────────────────────────
function SlopedConnector({ fillProgress, stepIdx }: { fillProgress: number; stepIdx: number }) {
  const n = WORKFLOW_STAGES.length
  const segStart = stepIdx / (n - 1)
  const segEnd = (stepIdx + 1) / (n - 1)
  const localProgress = Math.max(0, Math.min(1, (fillProgress - segStart) / (segEnd - segStart)))

  return (
    <div className="relative flex-shrink-0 w-5 flex items-end" style={{ height: "20px" }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute bottom-0">
        <line x1="0" y1="18" x2="20" y2="2" stroke="rgba(21,18,15,0.12)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute bottom-0"
        style={{ clipPath: `inset(0 ${(1 - localProgress) * 100}% 0 0)` }}>
        <line x1="0" y1="18" x2="20" y2="2" stroke="#CD9534" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function InteractiveTimeline() {
  const [activeStageIdx, setActiveStageIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Auto-rotate every 4.5 seconds
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % WORKFLOW_STAGES.length)
    }, 4500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, activeStageIdx])

  const currentStage = WORKFLOW_STAGES[activeStageIdx]
  const n = WORKFLOW_STAGES.length
  const trackFillProgress = activeStageIdx / (n - 1)

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full space-y-4 pt-1"
    >
      {/* ─── 1. Pipeline Ribbon with Sloped Connector Track ─── */}
      <div className="relative">
        {/* Step cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIdx
            const isReached = idx <= activeStageIdx

            return (
              <motion.button
                key={stage.id}
                onClick={() => setActiveStageIdx(idx)}
                animate={prefersReducedMotion ? {} : isActive ? {
                  scale: 1.02,
                  translateY: -2,
                } : {
                  scale: 1,
                  translateY: 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-colors cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isActive
                    ? "bg-[#15120F] text-[#F7F2E4] border-[#15120F] shadow-[3px_3px_0px_0px_rgba(21,18,15,0.9)]"
                    : isReached
                    ? "bg-[#CD9534]/10 border-[#CD9534]/30 text-[#141110]"
                    : "bg-[#FFFFFF] border-[#15120F]/10 text-[#141110] hover:border-[#15120F]/30 hover:bg-[#F0E9D5]"
                }`}
              >
                {/* Auto-progress filling line for active tab */}
                {isActive && !isPaused && !prefersReducedMotion && (
                  <motion.div
                    key={`progress-${activeStageIdx}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-[3px] bg-[#CD9534]"
                  />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isActive ? "text-[#CD9534]" : "text-[#8A6420]"
                    }`}
                  >
                    {stage.stepNumber}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#CD9534]" : isReached ? "bg-[#CD9534]/60" : "bg-[#15120F]/20"
                    }`}
                  />
                </div>

                <div
                  className={`font-serif font-bold text-xs sm:text-[12px] leading-snug line-clamp-2 ${
                    isActive ? "text-[#F7F2E4]" : "text-[#141110]"
                  }`}
                >
                  {stage.title}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* ─── Continuous connector track beneath the grid ─── */}
        <div className="hidden sm:flex items-end mt-1.5 px-1 gap-0">
          {WORKFLOW_STAGES.map((_, idx) => {
            const isReached = idx <= activeStageIdx
            const fillFrac = Math.max(0, Math.min(1, trackFillProgress * (n - 1) - idx + 1))

            return (
              <div key={idx} className="flex items-center flex-1 min-w-0">
                <div className="relative h-[2px] flex-1 bg-[#15120F]/12 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#CD9534]"
                    animate={{ width: prefersReducedMotion ? (isReached ? "100%" : "0%") : `${fillFrac * 100}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>

                {idx < WORKFLOW_STAGES.length - 1 && (
                  <SlopedConnector fillProgress={trackFillProgress} stepIdx={idx} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── 2. Active Stage Execution Card (Compact, clean gap) ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="rounded-3xl border-2 border-[#15120F] bg-[#FFFFFF] p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(21,18,15,0.95)] relative overflow-hidden space-y-4"
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#15120F]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#15120F] text-[#CD9534] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                {currentStage.candidateAvatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-[#141110]">
                    {currentStage.candidateName}
                  </h4>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider bg-[#F0E9D5] border border-[#CD9534]/40 text-[#141110] px-2.5 py-0.5 rounded-full">
                    {currentStage.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-[#5C5449]">
                  {currentStage.candidateRole}
                </p>
              </div>
            </div>

            <div className="flex items-center self-start sm:self-auto bg-[#F0E9D5] px-3.5 py-1 rounded-full font-mono text-[10.5px] font-bold text-[#8A6420] border border-[#15120F]/10">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#8A6420]" />
              <span>{currentStage.statMetric}</span>
            </div>
          </div>

          {/* Verification Checks */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A6420] font-bold block">
              Stage Milestone Criteria:
            </span>
            {currentStage.checks.map((check, cIdx) => (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: cIdx * 0.06 }}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#141110] font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8A6420] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{check}</span>
              </motion.div>
            ))}
          </div>

          {/* Recruiter Evaluation Sentence */}
          <div className="rounded-2xl bg-[#F0E9D5]/60 text-[#141110] p-3.5 font-sans text-xs border border-[#15120F]/10 flex items-start gap-2.5">
            <UserCheck className="w-4 h-4 text-[#8A6420] flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 min-w-0">
              <span className="font-mono text-[9.5px] text-[#8A6420] uppercase tracking-wider font-bold block">
                Evaluator Verification Note:
              </span>
              <p className="text-xs text-[#141110] leading-relaxed">
                {currentStage.recruiterNote}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
