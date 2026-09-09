"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, Building2, CheckCircle2 } from "lucide-react"

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
    quote: "Talenty's consultation and tailored screening gave us top-tier engineering talent with calibrated compensation benchmarks. They truly understand modern engineering standards.",
    name: "Sneha Roy",
    role: "Director of Talent Acquisition",
    company: "Merid Cloud",
    location: "Mumbai",
    outcomeStatement: "More than tripled engineering hiring velocity with role-calibrated standards and verified matching signals.",
    rating: 5
  }
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1))
  }

  const next = () => {
    setCurrentIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1))
  }

  const current = TESTIMONIALS[currentIndex]

  return (
    <div className="w-full">
      {/* Top Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#0D2D42]/10">
        <div className="space-y-4 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold">
            · PROVEN TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-[#0D2D42]">
            Trusted by teams that <br />
            <span className="text-[#C18A18] italic font-normal">refuse to compromise.</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-2xl border-2 border-[#0D2D42] bg-[#F7F2E4] hover:bg-[#F0E9D5] text-[#0D2D42] flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(13,45,66,1)] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-2xl border-2 border-[#0D2D42] bg-[#0D2D42] hover:bg-[#153e5b] text-[#F7E9A7] flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(193,138,24,0.8)] active:translate-x-0.5 active:translate-y-0.5"
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
            className="rounded-3xl border-2 border-[#0D2D42] bg-[#F7F2E4] p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)] relative overflow-hidden"
          >
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
              {/* Quote & Author */}
              <div className="space-y-6">
                <div className="flex items-center gap-1 text-[#C18A18]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C18A18]" />
                  ))}
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-[#0D2D42] leading-snug">
                  "{current.quote}"
                </blockquote>

                <div className="pt-4 border-t border-[#0D2D42]/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-xs">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#0D2D42]">
                      {current.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3A5570]">
                      {current.role} · <span className="text-[#0D2D42] font-semibold">{current.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome Statement Card */}
              <div className="rounded-2xl border-2 border-[#0D2D42] bg-[#F0E9D5]/70 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#3A5570] font-semibold">
                    Verified Outcome
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0D2D42] bg-[#C18A18] px-2.5 py-0.5 rounded-full border border-[#0D2D42] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#0D2D42]" />
                    {current.location}
                  </div>
                </div>

                <div>
                  <p className="text-base sm:text-lg font-serif text-[#0D2D42] leading-snug font-medium">
                    "{current.outcomeStatement}"
                  </p>
                </div>

                <div className="font-mono text-[11px] text-[#3A5570] pt-3 border-t border-[#0D2D42]/10">
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
                  ? "w-8 bg-[#0D2D42]"
                  : "w-2.5 bg-[#0D2D42]/20 hover:bg-[#0D2D42]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
