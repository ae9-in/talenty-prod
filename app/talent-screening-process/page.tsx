"use client"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"
import { ProcessTimeline } from "@/components/landing/process-timeline"
import { CheckCircle2, Terminal, Brain, MessageSquare, ShieldCheck } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

const screeningStages = [
  {
    icon: Terminal,
    title: "Multi-Stage Technical Assessment",
    desc: "Every engineering candidate completes sandboxed programming challenges, algorithmic problem-solving tests, and practical system design evaluations calibrated to role seniority."
  },
  {
    icon: Brain,
    title: "Cognitive Aptitude & Problem Solving",
    desc: "We assess analytical reasoning, numerical problem solving, and logical structure to ensure candidates learn quickly and adapt to changing codebase requirements."
  },
  {
    icon: MessageSquare,
    title: "Behavioral & Cross-Functional Screening",
    desc: "In-depth structured interviews evaluate stakeholder communication, agile team collaboration, engineering ownership, and professional alignment."
  }
]

const operatingStandards = [
  "Zero resume forwarding without verified technical scorecard",
  "Engineering panel time reduced by eliminating uncalibrated first-round interviews",
  "Transparent evaluation summaries explaining candidate strengths and signal weights",
  "Full placement replacement assurance window standard across all completed hires"
]

export default function TalentScreeningProcess() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#1D3F91] selection:text-[#FFFFFF]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-[#1D3F91]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-[380px] h-[380px] bg-[#1D3F91]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow prefixDot as="span" className="block mb-4">
              CALIBRATED VETTING INFRASTRUCTURE
            </Eyebrow>
            
            <h1 className="sr-only">How Talenty Screens and Vets Every Candidate</h1>

            <RollingHeadline
              as="h2"
              line1="How Talenty Screens and"
              accent="vets every candidate."
              line2="Structured, Multi-Stage Evaluation."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#5C5449] max-w-2xl mx-auto leading-relaxed font-sans">
              We do not forward unvetted resumes. Every candidate profile you receive from Talenty Consulting has cleared rigorous technical assessments, cognitive problem solving, and behavioral interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Stage Assessment Pillars */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow prefixDot as="span" className="block mb-2">
            VETTING GATES
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            Three-Dimensional Candidate Assessment
          </h2>
          <p className="text-sm sm:text-base text-[#5C5449] mt-3">
            Multi-stage screening and assessment—technical, cognitive, and behavioural—before any candidate reaches your inbox.
          </p>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-3 gap-8">
          {screeningStages.map((stage) => (
            <div
              key={stage.title}
              className="border border-[#141110]/10 bg-[#F0E9D5]/40 rounded-3xl p-8 hover:border-[#1D3F91]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1D3F91] text-[#FFFFFF] flex items-center justify-center mb-6 shadow-xs">
                  <stage.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#141110] mb-3">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#5C5449] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Chronological Screening Flow — Vertical Timeline */}
      <section className="py-24 bg-[#F0E9D5]/40 border-y border-[#15120F]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl space-y-4 mb-16">
            <Eyebrow prefixDot as="span" className="block">
              CHRONOLOGICAL FLOW
            </Eyebrow>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#141110]">
              A day in <span className="text-[#1D3F91] italic font-normal">Talenty.</span>
            </h2>
            <p className="text-sm text-[#5C5449] leading-relaxed">
              How our integrated automation and consulting loop transforms daily recruiting overhead into structured candidate outcomes.
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* Operating Commitments */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="max-w-3xl mx-auto bg-[#F0E9D5]/60 border border-[#141110]/10 rounded-3xl p-8 md:p-12">
          <Eyebrow prefixDot as="span" className="block mb-2">
            OPERATING COMMITMENTS
          </Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141110] mb-6">
            Our Quality Assurances to Hiring Managers
          </h2>
          <div className="space-y-4">
            {operatingStandards.map((std, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1D3F91] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-[#141110] font-medium">{std}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F0E9D5]/40 border-t border-[#141110]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Set up a candidate screening pipeline
            </h2>
            <p className="text-sm text-[#5C5449] mt-2">
              Tell us your open roles and technical benchmark criteria. We will construct a customized evaluation sieve.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#141110]/20 rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(21,18,15,0.06)]">
            <EnquiryForm buttonLabel="Inquire about candidate screening" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
