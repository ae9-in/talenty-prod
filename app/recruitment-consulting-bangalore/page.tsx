"use client"

import { Building2, ShieldCheck, Zap, CheckCircle2, Users, Rocket, Clock, Layers } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const qualitativePillars = [
  { label: "CONSULTING EXPERTISE", title: "Dedicated Lead Desk", desc: "One senior recruitment lead coordinates candidate sourcing, pipeline evaluations, and offer extension." },
  { label: "VETTING CALIBER", title: "Pre-Screened Codebases", desc: "Every technical candidate completes sandboxed problem-solving tasks before client interviews." },
  { label: "GEOGRAPHIC COVERAGE", title: "Hub-Anchored Sourcing", desc: "Church Street headquarters with active recruitment pipelines across Bangalore, Chennai, and Pune." },
  { label: "PLACEMENT ASSURANCE", title: "Replacement Guarantee", desc: "Full replacement assurance window standard on all permanent client placements." },
]

const servicePillars = [
  {
    icon: Rocket,
    title: "Hiring Strategy Consulting for Startups & Scaleups",
    desc: "We analyze your quarterly growth goals, design competency rubrics, calibrate market compensation benchmarks, and construct repeatable hiring funnels tailored to Bangalore's competitive tech talent market.",
  },
  {
    icon: Users,
    title: "RPO (Recruitment Process Outsourcing) Services",
    desc: "Embed dedicated talent acquisition specialists into your organization. We handle end-to-end sourcing, candidate engagement, screening workflows, panel coordination, and offer closing with full pipeline visibility.",
  },
  {
    icon: Layers,
    title: "Bulk & Volume Hiring Solutions",
    desc: "Rapidly scale engineering cohorts, sales development teams, or operational hubs. Structured batch assessments and calibrated screening ensure high volume without compromising candidate quality.",
  },
  {
    icon: Building2,
    title: "Recruitment for Startups & SMEs in Bangalore",
    desc: "Early-stage startups and mid-market SMEs require high-impact generalists and specialized engineers who deliver immediately. We identify talent aligned with fast-paced startup cultures.",
  },
]

export default function RecruitmentConsultingBangalore() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#CD9534] selection:text-[#141110]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-[#CD9534]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-[380px] h-[380px] bg-[#CD9534]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-4">
              · BENGALURU RECRUITMENT & STAFFING HEADQUARTERS
            </span>
            
            <h1 className="sr-only">Recruitment Consulting Services in Bangalore</h1>

            <RollingHeadline
              as="h2"
              line1="Recruitment Consulting Services"
              accent="in Bangalore."
              line2="End-to-End Talent Strategy."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#5C5449] max-w-2xl mx-auto leading-relaxed">
              Based at BHIVE Platinum on Church Street, Talenty Consulting partners with tech startups, scaleups, and SMEs across Bangalore to architect hiring strategy, deliver RPO support, and execute volume hiring sprints.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#CD9534] hover:bg-[#8A6420] text-[#141110] hover:text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#141110]/10 transition-all shadow-sm group"
            >
              Schedule hiring consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Qualitative Commitments — Dark Slab */}
      <section className="py-16 bg-[#0D2D42] text-[#F7F2E4] border-y-2 border-[#C18A18]/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {qualitativePillars.map((p) => (
              <div key={p.title} className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#F7E9A7] block font-bold">
                  {p.label}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F7F2E4]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Core Recruitment Consulting Pillars */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-2">
            · PRACTICE AREAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            Strategic Recruitment Consulting Capabilities
          </h2>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-2 gap-8">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-[#141110]/10 bg-[#F0E9D5]/40 rounded-3xl p-8 hover:border-[#141110]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center mb-6 shadow-xs">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#141110] mb-3">
                  {pillar.title}
                </h2>
                <p className="text-sm text-[#5C5449] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Cluster 6: Fast Hiring Solutions Section */}
      <section className="py-20 bg-[#F7F2E4] border-t border-[#141110]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-[#8A6420]/30 bg-[#F0E9D5]/70 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div className="space-y-4">
                <span className="font-mono text-[10.5px] uppercase tracking-widest px-3 py-1 rounded-md bg-[#CD9534]/20 text-[#8A6420] font-semibold inline-block">
                  · CLUSTER 6: FAST HIRING SPRINT
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141110]">
                  Fast Hiring Solutions: 3 to 10 Business Day Turnaround
                </h2>
                <p className="text-sm sm:text-base text-[#5C5449] leading-relaxed">
                  When scaling sprints or unexpected vacancies demand immediate engineering or operational capability, our pre-screened talent pools allow qualified candidate shortlists within 72 hours and offer closing in under 10 business days without shortcutting vetting rigor.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Pre-screened technical candidate pipelines ready for interviews",
                    "Rapid coordination with shared scorecards and direct feedback",
                    "Continuous candidate engagement to prevent counter-offer dropouts",
                    "Full placement replacement protection window standard"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#141110]">
                      <CheckCircle2 className="w-4 h-4 text-[#8A6420] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#141110]/10 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                <Clock className="w-10 h-10 text-[#8A6420] mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#141110]">Need urgent hiring in Bangalore?</h3>
                <p className="text-xs text-[#5C5449]">
                  Talk directly with our Church Street recruitment team to lock in a dedicated hiring sprint.
                </p>
                <Link
                  href="#contact"
                  className="inline-block w-full py-3 px-4 bg-[#141110] text-[#F7F2E4] hover:bg-[#8A6420] transition-colors rounded-xl text-xs font-mono font-medium"
                >
                  Initiate Fast Hiring Sprint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F0E9D5]/40 border-t border-[#141110]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Connect with our Church Street team
            </h2>
            <p className="text-sm text-[#5C5449] mt-2">
              Submit your hiring requirements below. We will coordinate a consultation call to review compensation benchmarks and candidate timelines.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#141110]/20 rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(21,18,15,0.06)]">
            <EnquiryForm buttonLabel="Schedule Bangalore consultation" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
