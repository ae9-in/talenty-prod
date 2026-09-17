"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, Building2, CheckCircle2 } from "lucide-react"
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
    quote: "Talenty completely transformed our tech hiring velocity. Instead of wading through hundreds of mismatched resumes, every single candidate we interviewed was already pre-vetted and production-ready.",
    name: "Rajesh Kulkarni",
    role: "VP of Engineering",
    company: "Northwind Fintech",
    location: "Bangalore",
    outcomeStatement: "Average time-to-offer reduced to under nine days with pre-screened, production-ready engineering pipelines.",
    rating: 5
  },
  {
    id: 2,
    quote: "The Trained Employee Placement program solved our hardest onboarding bottlenecks. The candidates hit the ground running on day one with zero ramp-up lag. It's night and day compared to traditional staffing agencies.",
    name: "Meera Nair",
    role: "Head of People & Culture",
    company: "Halcyon Systems",
    location: "Kochi & Chennai",
    outcomeStatement: "Maintained full six-month placement retention with zero onboarding lag across all technical cohorts.",
    rating: 5
  },
  {
    id: 3,
    quote: "The explainable vetting scores gave our hiring managers complete transparency. We closed specialized full-stack and DevOps roles within a single quarter without burning out our engineering team.",
    name: "Arjun Venkataraman",
    role: "Chief Technology Officer",
    company: "Ferrum Labs",
    location: "Hyderabad",
    outcomeStatement: "Successfully placed fourteen specialized engineers within a single quarter through transparent candidate scoring.",
    rating: 5
  },
  {
    id: 4,
    quote: "Zero fluff, zero generic resume forwarding. Every profile came with verified code evidence, compensation alignment, and a structured scorecard from a recruiter who actually understood systems engineering.",
    name: "Vikramaditya Roy",
    role: "Chief Technology Officer",
    company: "E-Commerce Infrastructure",
    location: "Bengaluru",
    outcomeStatement: "Replaced 3 non-performing recruitment agencies with Talenty as exclusive partner.",
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
                  "{current.quote}"
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
                    Verified Outcome
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FFFFFF] bg-[#1D3F91] px-2.5 py-0.5 rounded-full border border-[#1D3F91] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#FFFFFF]" />
                    {current.location}
                  </div>
                </div>

                <div>
                  <p className="text-base sm:text-lg font-serif text-[#141110] leading-snug font-medium">
                    "{current.outcomeStatement}"
                  </p>
                </div>

                <div className="font-mono text-[11px] text-[#5C5449] pt-3 border-t border-[#15120F]/10">
                  Talenty Placement & Consulting Cohort
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
