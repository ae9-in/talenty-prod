"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RotatingWord, RotatingItem } from "@/components/motion/RotatingWord"
import { EnquiryForm } from "@/components/public/enquiry-form"

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

// ─── Gold progress rule beneath the rotating word ─────────────────────────
function ProgressRule({ idx, paused }: { idx: number; paused: boolean }) {
  return (
    <div className="h-[2px] rounded-full bg-[#0D2D42]/10 overflow-hidden mt-1">
      <motion.div
        key={`rule-${idx}`}
        initial={{ scaleX: 0 }}
        animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: DWELL / 1000, ease: "linear" }}
        style={{ transformOrigin: "left" }}
        className="h-full bg-gradient-to-r from-[#7C601D] via-[#C18A18] to-[#F7E9A7] rounded-full"
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
    let max = 0
    children.forEach((el) => {
      max = Math.max(max, el.getBoundingClientRect().height)
    })
    setFixedHeight(max || null)
  }, [])

  return (
    <>
      {/* Off-screen sizer: fixed position, known width — measures all 4 variants reliably regardless of parent context */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: "-9999px",
          width: "min(42rem, 100vw)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {items.map((item, i) => (
          <p
            key={i}
            className="text-xl sm:text-2xl leading-relaxed text-[#3A5570] font-sans"
          >
            {item.copy}
          </p>
        ))}
      </div>

      {/* Visible paragraph container — height locked after measurement, zero reflow on swap */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={fixedHeight != null ? { height: fixedHeight } : {}}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 text-xl sm:text-2xl leading-relaxed text-[#3A5570] font-sans"
          >
            {items[idx].copy}
          </motion.p>
        </AnimatePresence>
      </div>
    </>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TrainedPlacementPage() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <main className="min-h-screen bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#C18A18] selection:text-[#141110] overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden min-h-[680px] flex items-center">
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
              "linear-gradient(to right, rgba(247,242,228,0.92) 0%, rgba(247,242,228,0.88) 40%, rgba(247,242,228,0.60) 70%, rgba(247,242,228,0.35) 100%)",
          }}
        />
        {/* Top/bottom fades */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#F7F2E4] to-transparent z-[1] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F7F2E4] to-transparent z-[1] pointer-events-none" />

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Badge — sentence case, no letter-spacing, sparkle kept */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-[#8A6420] bg-[#F0E9D5] border border-[#C18A18]/40 px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C18A18]" aria-hidden="true" />
                Trained placement
              </span>
            </div>

            {/* Headline — three-line frame */}
            {/* All three lines same colour (#141110 = --ink). Italic is a typeface axis choice, not a colour accent. */}
            <h1 className="font-serif font-semibold tracking-tight text-[#141110] leading-[0.92] text-5xl sm:text-6xl lg:text-7xl xl:text-[80px]">
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

            {/* Gold progress rule — scaleX 0→1 over 5s dwell, resets on each transition */}
            <div className="mt-2 max-w-[12rem]">
              <ProgressRule idx={wordIdx} paused={isPaused} />
            </div>

            {/* Support paragraph — cross-fade only, height fixed to tallest variant */}
            <div className="mt-8 max-w-2xl relative">
              <SupportParagraph idx={wordIdx} items={STATES} />
            </div>

            {/* CTA buttons — no arrow glyphs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-[#C18A18] hover:bg-[#7C601D] text-[#F7F2E4] font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-[#7C601D]/40 transition-all shadow-[0_4px_14px_rgba(193,138,24,0.3)] active:scale-95 cursor-pointer"
              >
                Request a consultation
              </Link>
              <Link
                href="/talent-screening-process"
                className="inline-flex items-center bg-transparent hover:bg-[#F0E9D5] text-[#141110] font-bold text-sm sm:text-base px-7 py-4 rounded-full border-2 border-[#0D2D42] transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                See the vetting process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison strip ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#F0E9D5]/40 border-y border-[#0D2D42]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
              · What changes
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Why traditional staffing causes onboarding lag
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-8 shadow-xs">
              <h3 className="text-2xl font-serif font-bold text-[#3A5570] mb-6">Traditional agency staffing</h3>
              <ul className="space-y-4 text-[#3A5570] text-sm">
                {[
                  "Weeks lost to basic onboarding and toolchain setup",
                  "Heavy drain on senior engineers' mentoring bandwidth",
                  "High risk of candidate mismatch on practical workflows",
                  "Delayed sprint velocity and productivity lag",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7C601D] font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-[#0D2D42] bg-[#F7F2E4] rounded-3xl p-8 relative shadow-[6px_6px_0px_0px_rgba(13,45,66,1)]">
              <span className="absolute -top-3 left-8 bg-[#C18A18] text-[#141110] border border-[#0D2D42]/10 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
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
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C18A18] font-bold">✓</span>
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
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
              · Get started
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Request trained candidates
            </h2>
            <p className="mt-3 text-sm text-[#3A5570] leading-relaxed">
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
