"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RotatingWord, RotatingItem } from "@/components/motion/RotatingWord"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Eyebrow } from "@/components/ui/eyebrow"

// ─── Data — one source of truth for word + copy per state ─────────────────
const STATES: RotatingItem[] = [
  {
    word: "Trained.",
    copy: "Deployed pre-screened engineers and domain specialists, upskilled directly for your production stack. Hands-on bootcamps remove ramp-up lag.",
  },
  {
    word: "Certified.",
    copy: "Every candidate clears a validated skills assessment before you see a CV — not a self-reported checklist, a measured result.",
  },
  {
    word: "Deployed.",
    copy: "Onboarded on your timeline, not the market's. Candidates arrive briefed on your stack, your tools, and your way of working.",
  },
  {
    word: "Supported.",
    copy: "Ninety days of onboarding support after placement, so a slow start never becomes a bad hire.",
  },
]

const DWELL = 5000
const TRANSITION = 620

// ─── Royal Blue progress rule beneath the rotating word ───────────────────
function ProgressRule({ idx, paused }: { idx: number; paused: boolean }) {
  return (
    <div className="h-[2px] rounded-full bg-[#15120F]/10 overflow-hidden mt-1">
      <motion.div
        key={`rule-${idx}`}
        initial={{ scaleX: 0 }}
        animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: DWELL / 1000, ease: "linear" }}
        style={{ transformOrigin: "left" }}
        className="h-full bg-gradient-to-r from-[#101F45] via-[#1D3F91] to-[#3358B8] rounded-full"
      />
    </div>
  )
}

// ─── Support paragraph — cross-fade only, synced via shared idx ───────────
function SupportParagraph({ idx, items }: { idx: number; items: RotatingItem[] }) {
  // Fixed height: measured on mount to the tallest variant
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [fixedHeight, setFixedHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!measureRef.current) return
    // Measure all hidden children and take the tallest
    const children = Array.from(measureRef.current.children) as HTMLElement[]
    const max = children.reduce((acc, el) => Math.max(acc, el.offsetHeight), 0)
    if (max > 0) setFixedHeight(max)
  }, [items])

  return (
    <div
      ref={containerRef}
      style={{ height: fixedHeight ? `${fixedHeight}px` : "auto" }}
      className="relative overflow-visible"
    >
      {/* Hidden container for layout measurement */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 pointer-events-none opacity-0 select-none"
        style={{ visibility: "hidden" }}
      >
        {items.map((it, i) => (
          <p key={i} className="text-base sm:text-lg lg:text-xl text-[#5C5449] leading-relaxed font-sans">
            {it.copy}
          </p>
        ))}
      </div>

      {/* Visible paragraph with smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`copy-${idx}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: TRANSITION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg lg:text-xl text-[#5C5449] leading-relaxed font-sans absolute inset-0"
        >
          {items[idx].copy}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TrainedPlacementPage() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <main className="min-h-screen bg-[#FBF8F2] text-[#141110] font-sans selection:bg-[#1D3F91] selection:text-[#FFFFFF] overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden flex items-center">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-slide-2.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Legibility scrim: left cream heavy (text zone), right lighter (photo shows) */}
        {/* Corrected from near-whiteout: 85% left → 55% right */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(251,248,242,0.92) 0%, rgba(251,248,242,0.88) 40%, rgba(251,248,242,0.60) 70%, rgba(251,248,242,0.35) 100%)",
          }}
        />
        {/* Top/bottom fades */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FBF8F2] to-transparent z-[1] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#FBF8F2] to-transparent z-[1] pointer-events-none" />

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="max-w-4xl lg:max-w-5xl">
            {/* Badge — sentence case, no letter-spacing, sparkle kept */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-[#1D3F91] bg-[#F4EFE5] border border-[#1D3F91]/30 px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#1D3F91]" aria-hidden="true" />
                Trained placement
              </span>
            </div>

            {/* Headline — three-line frame */}
            {/* All three lines same colour (#141110 = --ink). Italic is a typeface axis choice, not a colour accent. */}
            <h1 className="font-serif font-semibold tracking-tight text-[#141110] leading-[0.94] text-4xl sm:text-5xl lg:text-6xl xl:text-[68px]">
              {/* Line 1 — static */}
              <span className="block">Not just sourced.</span>

              {/* Line 2 — rotating word, same ink colour, italic via Fraunces axis */}
              <span className="block mt-1">
                <RotatingWord
                  items={STATES}
                  dwellMs={DWELL}
                  transitionMs={TRANSITION}
                  onIndexChange={setWordIdx}
                  paused={isPaused}
                  wordClassName="italic"
                />
              </span>

              {/* Line 3 — static */}
              <span className="block mt-1">Ready on day one.</span>
            </h1>

            {/* Royal Blue progress rule */}
            <div className="mt-2 max-w-[12rem]">
              <ProgressRule idx={wordIdx} paused={isPaused} />
            </div>

            {/* Support paragraph */}
            <div className="mt-5 max-w-2xl relative">
              <SupportParagraph idx={wordIdx} items={STATES} />
            </div>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full border border-[#1D3F91] transition-all shadow-[4px_4px_0px_0px_rgba(16,31,69,0.9)] active:scale-95 cursor-pointer"
              >
                Request a consultation
              </Link>
              <Link
                href="/talent-screening-process"
                className="inline-flex items-center bg-transparent hover:bg-[#F4EFE5] text-[#141110] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full border-2 border-[#141110] transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                See the vetting process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison strip ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#F4EFE5]/40 border-y border-[#141110]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow prefixDot className="block mb-2">
              WHAT CHANGES
            </Eyebrow>
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Why traditional staffing causes onboarding lag
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#141110]/10 bg-[#FFFFFF] rounded-3xl p-8 shadow-xs">
              <h3 className="text-2xl font-serif font-bold text-[#5C5449] mb-6">Traditional agency staffing</h3>
              <ul className="space-y-4 text-[#5C5449] text-sm">
                {[
                  "Weeks lost to basic onboarding and toolchain setup",
                  "Heavy drain on senior engineers' mentoring bandwidth",
                  "High risk of candidate mismatch on practical workflows",
                  "Delayed sprint velocity and productivity lag",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5C5449] font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-[#15120F] bg-[#FFFFFF] rounded-3xl p-8 relative shadow-[6px_6px_0px_0px_rgba(21,18,15,1)]">
              <span className="absolute -top-3 left-8 bg-[#1D3F91] text-[#FFFFFF] border border-[#1D3F91] px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
                Talenty trained model
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#141110] mb-6">Calibrated placement</h3>
              <ul className="space-y-4 text-[#141110] text-sm font-medium">
                {[
                  "Day-one productive output on your specific tech stack",
                  "Tailored pre-deployment training on internal frameworks",
                  "Comprehensive technical vetting pre-completed",
                  "Full placement replacement protection standard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1D3F91] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact form ──────────────────────────────────────────────── */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow prefixDot className="block mb-2">
              GET STARTED
            </Eyebrow>
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Request trained candidates
            </h2>
            <p className="mt-3 text-sm text-[#5C5449] leading-relaxed">
              Tell us your stack and role requirements — we'll match, train, and deploy the right engineers.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#0D2D42] rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)]">
            <EnquiryForm buttonLabel="Request trained candidate cohort" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
