"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import {
  Navbar,
  Footer,
  HeroCarousel,
  TrustedClients,
  ResumeScanner,
  InteractiveTimeline,
  VettingStages,
  TestimonialSlider,
  FAQAccordion,
} from "@/components/landing"
import { EnquiryForm } from "@/components/public/enquiry-form"

// Day in Talenty Steps
const DAY_STEPS = [
  {
    time: "08:30 GMT",
    title: "AI Sourcing & Enrichment",
    desc: "41 passive candidates matching your 'Sr. iOS Engineer' role are auto-enriched from GitHub and LinkedIn. Vetted, clean data ready for review.",
    stat: "41 enriched"
  },
  {
    time: "12:00 GMT",
    title: "Explainable Match Scores",
    desc: "Talenty screens candidates based on your specific team requirements. Review exact calibrated weights for Priya's score—no black boxes.",
    stat: "94% Match"
  },
  {
    time: "15:00 GMT",
    title: "Collaborative Vetting Panel",
    desc: "Live interview coordination. Shared scorecards, notes, and direct feedback sync with Slack and your calendar automatically.",
    stat: "Panel of 4"
  },
  {
    time: "18:00 GMT",
    title: "Offer & Auto-Close",
    desc: "Two job offers are accepted. The candidate status updates in real-time on the ATS, and onboarding document sequences queue up.",
    stat: "2 Hires"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#CD9534] selection:text-[#141110] overflow-x-hidden">
      <Navbar />

      {/* 1. HERO CAROUSEL SECTION */}
      <HeroCarousel />

      {/* 2. VERIFIED CLIENT CONVERSIONS SECTION */}
      <TrustedClients />

      {/* 3. OPERATIONAL SIGNALS & BENCHMARKS (High-Impact Navy Band) */}
      <section className="py-16 bg-[#0D2D42] text-[#F7F2E4] relative overflow-hidden border-b-2 border-[#C18A18]/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#F7F2E4]/60">
              · TALENT EXECUTION & RELIABILITY
            </div>
            <h3 className="font-serif font-bold text-lg text-[#F7F2E4] mt-2 sm:mt-0">
              CALIBRATED RECRUITMENT BENCHMARKS
            </h3>
            <div className="font-mono text-[11px] text-[#F7E9A7] uppercase tracking-widest mt-2 sm:mt-0 font-bold">
              Active Pan-India Operations
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
              <div className="font-mono text-[10px] text-[#F7E9A7] uppercase tracking-widest font-bold">
                CONTINUOUS SOURCING
              </div>
              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F7F2E4]">
                Live Signal Indexing
              </h4>
              <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                Passive engineering candidates indexed across verified code repositories and professional registries.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
              <div className="font-mono text-[10px] text-[#F7E9A7] uppercase tracking-widest font-bold">
                CALIBRATED VETTING
              </div>
              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F7F2E4]">
                Zero Black Boxes
              </h4>
              <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                Role-specific technical benchmarks and system design rubrics with transparent signal weighting.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
              <div className="font-mono text-[10px] text-[#F7E9A7] uppercase tracking-widest font-bold">
                TURNAROUND VELOCITY
              </div>
              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F7F2E4]">
                Structured Sprints
              </h4>
              <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                Coordinated candidate screening, panel feedback synchronization, and offer extension workflows.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
              <div className="font-mono text-[10px] text-[#F7E9A7] uppercase tracking-widest font-bold">
                GEOGRAPHIC REACH
              </div>
              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F7F2E4]">
                Pan-India Network
              </h4>
              <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                Hub offices in Bengaluru (BHIVE Church St) and Kochi with active sourcing coverage across all major hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE BENTO GRID */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10" id="product">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] border-b border-[#15120F]/10 pb-16 items-end">
          <div className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#CD9534] font-semibold">
              · HIRING LOOP ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-[#141110] leading-[1.05]">
              Everything you need. <br />
              <span className="text-[#CD9534] italic font-normal">Nothing</span> you don't.
            </h2>
          </div>
          <p className="text-[15.5px] leading-relaxed text-[#5C5449] max-w-2xl">
            Talenty Consulting provides one synchronized workflow for the entire hiring loop—sourcing, screening, panel evaluations, offer, close. No spreadsheets. No unvetted resume spam.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12 mt-12 items-stretch">
          
          {/* Card A: Pipeline stages */}
          <div className="border border-[#15120F]/15 bg-[#F0E9D5]/60 rounded-3xl p-8 md:p-10 md:col-span-7 flex flex-col gap-6 sm:gap-8 hover:border-[#15120F]/30 transition-all group">
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#CD9534] font-semibold">· Pipeline Execution</span>
              <h3 className="text-3xl font-serif font-bold text-[#141110]">How a candidate moves through the process</h3>
              <p className="text-sm text-[#5C5449] max-w-lg leading-relaxed">
                Candidate progression across sourcing, calibrated technical tests, panel rounds, and offer locks with structured milestones.
              </p>
            </div>
            
            <InteractiveTimeline />
          </div>

          {/* Card B: Candidate Scorecard */}
          <div className="border-2 border-[#15120F]/15 bg-[#F0E9D5]/60 rounded-3xl p-8 md:p-10 md:col-span-5 flex flex-col gap-6 hover:border-[#15120F]/30 transition-all">
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#CD9534] font-semibold">· Candidate Evaluation</span>
              <h3 className="text-3xl font-serif font-bold text-[#141110]">Verified evidence, not scores</h3>
              <p className="text-sm text-[#5C5449] leading-relaxed">
                Role requirement matched against verified technical artifacts, architecture walkthroughs, and reference checks.
              </p>
            </div>
            <ResumeScanner />
          </div>
        </div>
      </section>

      {/* 5. THE FIVE GATES: VETTING STAGES */}
      <section className="py-24 bg-[#F0E9D5]/40 border-t border-[#15120F]/10" id="vetting">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="mb-12 max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#CD9534] font-semibold block">
              · THE FIVE GATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110] leading-tight">
              Every candidate clears these stages before you see a CV.
            </h2>
            <p className="text-sm text-[#5C5449] leading-relaxed">
              We replace resume spam with calibrated technical challenges, production architecture walkthroughs, and verified background signals.
            </p>
          </div>

          <VettingStages />
        </div>
      </section>

      {/* 6. TESTIMONIAL SLIDER */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-10" id="customers">
        <TestimonialSlider />
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-24 bg-[#F7F2E4] max-w-[1440px] mx-auto px-6 lg:px-10" id="faq">
        <FAQAccordion />
      </section>

      {/* 9. LEAD-GEN CONSULTATION SECTION */}
      <section id="contact" className="relative py-24 overflow-hidden bg-[#F0E9D5]/30 border-t border-[#15120F]/10">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#CD9534]/10 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-15" />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="mx-auto mb-14 max-w-3xl text-center space-y-3">
            <span className="inline-flex rounded-full border border-[#CD9534]/30 bg-[#CD9534]/15 px-4 py-1.5 text-[10.5px] uppercase font-mono tracking-widest text-[#141110] font-semibold">
              Contact / Booking
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#141110]">
              Counseling, Consulting, and Hiring Support
            </h2>
            <p className="text-sm text-[#5C5449] max-w-xl mx-auto leading-relaxed">
              Use the request form below to submit your business hiring details. Our team will review your requirements and coordinate a tailored consulting session.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch max-w-5xl mx-auto">
            {/* Form Card */}
            <div className="bg-[#F7F2E4] border-2 border-[#15120F]/15 rounded-3xl shadow-[4px_4px_0px_0px_rgba(21,18,15,0.06)] overflow-hidden flex flex-col justify-between">
              <EnquiryForm buttonLabel="Request consultation call" />
            </div>

            {/* Places We Operate Card */}
            <div className="bg-[#F7F2E4] border-2 border-[#15120F]/15 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(21,18,15,0.06)] flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#8A6420] font-semibold block mb-1">Pan-India Presence</span>
                <h3 className="text-2xl font-serif font-bold text-[#141110] mb-2">
                  Places We Operate
                </h3>
                <p className="text-xs text-[#5C5449] leading-relaxed mb-6">
                  Talenty Consulting delivers trained employee placement, recruitment consulting, and staffing solutions across major business hubs in India.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Bangalore", label: "BHIVE Platinum, Church St" },
                    { name: "Kochi", label: "Tech & Operations" },
                    { name: "Chennai", label: "Enterprise Staffing" },
                    { name: "Hyderabad", label: "IT & Software Hub" },
                    { name: "Mumbai", label: "BFSI & Corporate" },
                  ].map((loc) => (
                    <div key={loc.name} className="border border-[#15120F]/10 bg-[#FFFFFF] rounded-2xl p-3 flex flex-col justify-between hover:border-[#CD9534] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#141110]">{loc.name}</span>
                        <span className="w-2 h-2 rounded-full bg-[#CD9534]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#5C5449] mt-1">{loc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-[11px] text-[#5C5449] border-t border-[#15120F]/10 pt-5 mt-6">
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <b className="text-[#141110]">connect@talentyconsulting.in</b>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone:</span>
                  <b className="text-[#141110]">8431119696</b>
                </div>
                <div className="flex items-center justify-between">
                  <span>Address:</span>
                  <b className="text-[#141110]">BHIVE Platinum, Church St, Bengaluru</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
