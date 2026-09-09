"use client"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal } from "@/components/landing/scroll-reveal"
import { ProcessTimeline } from "@/components/landing/process-timeline"
import { CheckCircle2 } from "lucide-react"

const operatingStandards = [
  "Zero resume forwarding without verified technical scorecard",
  "Engineering panel time reduced by eliminating uncalibrated interviews",
  "Detailed explanation of candidate strengths and signal weights",
  "Full replacement assurance on all completed placements"
]

export default function TalentScreeningProcess() {
  return (
    <main className="min-h-screen bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#CD9534] selection:text-[#141110]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-[#CD9534]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-[380px] h-[380px] bg-[#CD9534]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#CD9534] font-semibold block mb-4">
              · CALIBRATED VETTING INFRASTRUCTURE
            </span>
            
            <RollingHeadline
              line1="How we screen talent"
              accent="before you interview."
              line2="Structured, explainable evaluation."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#5C5449] max-w-2xl mx-auto leading-relaxed font-sans">
              We do not forward unvetted resumes. Every candidate profile you receive from Talenty Consulting has been benchmarked on production code, architecture fundamentals, and verified employment history.
            </p>
          </div>
        </div>
      </section>

      {/* Chronological Screening Flow — Vertical Timeline */}
      <section className="py-24 bg-[#F0E9D5]/40 border-y border-[#15120F]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl space-y-4 mb-16">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#CD9534] font-semibold block">
              · CHRONOLOGICAL FLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#141110]">
              A day in <span className="text-[#CD9534] italic font-normal">Talenty.</span>
            </h2>
            <p className="text-sm text-[#5C5449] leading-relaxed">
              How our integrated automation and consulting loop transforms daily recruiting overhead into structured outcomes.
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* Core Vetting Standards & Consultation Form */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start max-w-5xl mx-auto">
          <Reveal className="space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#CD9534] font-semibold block">
              · OPERATIONAL STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110] leading-tight">
              A hiring loop engineered to protect your time.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5449] leading-relaxed">
              Your engineering and hiring panels should evaluate finalists, not filter out basic mismatches. Our screening pipeline ensures that every candidate who reaches your calendar is already verified as a production-level match.
            </p>

            <div className="space-y-3.5 pt-4">
              {operatingStandards.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#CD9534] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#141110] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#F7F2E4] border-2 border-[#15120F] rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(21,18,15,1)]">
              <EnquiryForm buttonLabel="Request screened candidate shortlist" />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
