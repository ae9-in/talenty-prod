"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  location: string
  outcomeStatement: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Talenty completely changed how we approach engineering hiring. Every candidate we interviewed had already cleared a structured technical round — we stopped wading through irrelevant profiles and started closing offers faster.",
    name: "Ravi Sharma",
    role: "VP of Engineering",
    company: "Axcelera Technologies",
    location: "Hyderabad",
    outcomeStatement: "Reduced time-to-shortlist significantly with pre-screened, production-ready engineering pipelines.",
    rating: 5
  },
  {
    id: 2,
    quote: "The Trained Employee Placement program addressed our biggest onboarding problem. Candidates joined with the toolchain knowledge we actually needed — no three-month ramp-up, no catch-up training sprints.",
    name: "Meera Pillai",
    role: "Head of People & Culture",
    company: "Greenfield Digital",
    location: "Chennai",
    outcomeStatement: "Strong placement retention across technical cohorts with minimal onboarding lag.",
    rating: 5
  },
  {
    id: 3,
    quote: "The scoring rubrics gave our hiring managers real transparency into each candidate. We closed full-stack and DevOps roles we'd been struggling to fill for months — without burning out the team doing repetitive interviews.",
    name: "Arjun Krishnamurthy",
    role: "Chief Technology Officer",
    company: "Praxis Software Labs",
    location: "Bengaluru",
    outcomeStatement: "Placed multiple specialized engineers with structured candidate scoring and clear vetting evidence.",
    rating: 5
  },
  {
    id: 4,
    quote: "No generic resume spam, no unvetted profiles. Every shortlist came with verified technical evidence and a recruiter who understood what we were actually building. That's a rare thing to find.",
    name: "Deepika Menon",
    role: "Director of Engineering",
    company: "Triskelion Platforms",
    location: "Mumbai",
    outcomeStatement: "Consolidated our hiring to a single trusted partner after prior agency experience fell short.",
    rating: 5
  }
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const current = TESTIMONIALS[currentIndex]

  return (
    <div className="w-full">
      {/* Top Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#141110]/10">
        <div className="space-y-4 max-w-2xl">
          <Eyebrow>
            PROVEN TRACK RECORD
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-[#141110]">
            Trusted by teams that <br />
            <span className="text-[#1D3F91]">refuse to compromise.</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-2xl border-2 border-[#15120F] bg-[#FFFFFF] hover:bg-[#F0E9D5] text-[#141110] flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(21,18,15,1)] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-2xl border-2 border-[#15120F] bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(16,31,69,1)] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Testimonial Card */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="rounded-3xl border-2 border-[#15120F] bg-[#FFFFFF] p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(21,18,15,1)] relative overflow-hidden"
          >
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
              {/* Quote & Author */}
              <div className="space-y-6">
                <div className="flex items-center gap-1 text-[#1D3F91]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#1D3F91]" />
                  ))}
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-[#141110] leading-snug">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-[#15120F]/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1D3F91] text-[#FFFFFF] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-xs">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#141110]">
                      {current.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C5449]">
                      {current.role} · <span className="text-[#141110] font-semibold">{current.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome Statement Card */}
              <div className="rounded-2xl border-2 border-[#15120F] bg-[#F4EFE5] p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#5C5449] font-semibold">
                    Hiring Outcome
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FFFFFF] bg-[#1D3F91] px-2.5 py-0.5 rounded-full border border-[#1D3F91] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#FFFFFF]" />
                    {current.location}
                  </div>
                </div>

                <div>
                  <p className="text-base sm:text-lg font-serif text-[#141110] leading-snug font-medium">
                    &ldquo;{current.outcomeStatement}&rdquo;
                  </p>
                </div>

                <div className="font-mono text-[11px] text-[#5C5449] pt-3 border-t border-[#15120F]/10">
                  Talenty Placement &amp; Consulting Cohort
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "w-8 bg-[#1D3F91]"
                  : "w-2.5 bg-[#15120F]/20 hover:bg-[#15120F]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
