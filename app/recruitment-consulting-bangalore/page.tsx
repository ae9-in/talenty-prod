"use client"

import { Building2, ShieldCheck, Zap, CheckCircle2, Users, Rocket, Clock, Layers, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"

const qualitativePillars = [
  { label: "HEADQUARTERS", title: "Church Street, Bengaluru", desc: "Physical offices at BHIVE Platinum, providing local network access across Koramangala, Indiranagar, and Whitefield." },
  { label: "VETTING RIGOR", title: "Calibrated Code Checks", desc: "Zero automated resume forwarding. Every profile includes production-grade code evaluation." },
  { label: "DAY-ONE OUTPUT", title: "Trained Placement Track", desc: "Pre-placement stack upskilling ensures engineers commit code to production in their first week." },
  { label: "ACCOUNTABILITY", title: "Full Replacement Guarantee", desc: "Comprehensive placement protection on all permanent engineering and business appointments." },
]

const servicePillars = [
  {
    icon: Building2,
    title: "1. Talent Acquisition & Hiring Strategy",
    desc: "We analyze talent supply dynamics across Bangalore, calibrate market-rate compensation benchmarks, and design end-to-end sourcing pipelines for engineering, product, data, and go-to-market teams.",
  },
  {
    icon: Users,
    title: "2. Recruitment Process Outsourcing (RPO)",
    desc: "Seamlessly embed specialized recruiters within your internal talent team. We manage applicant screening, interviewer coordination, and candidate nurture while preserving your brand identity.",
  },
  {
    icon: Zap,
    title: "3. Fast Hiring Solutions (3-10 Day Sprints)",
    desc: "For urgent technical backfills or rapid scaleup expansion, our pre-screened talent inventory allows 72-hour candidate shortlists and offer closure in 3 to 10 business days.",
  },
  {
    icon: TrendingUp,
    title: "4. Executive & Leadership Search",
    desc: "High-touch, confidential executive recruitment for VP, Director, and C-Suite engineering and operational appointments across Bangalore tech ecosystems.",
  },
]

export default function RecruitmentConsultingBangalore() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#FBF8F2] text-[#141110] font-sans selection:bg-[#1D3F91] selection:text-[#FFFFFF]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-[#1D3F91]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-[380px] h-[380px] bg-[#1D3F91]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow prefixDot className="block mb-4">
              BENGALURU RECRUITMENT & STAFFING HEADQUARTERS
            </Eyebrow>
            
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
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#1D3F91] transition-all shadow-[4px_4px_0px_0px_rgba(16,31,69,0.9)] group cursor-pointer"
            >
              Schedule hiring consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Qualitative Commitments — Dark Slab */}
      <section className="py-16 bg-[#101F45] text-[#FBF8F2] border-y-2 border-[#1D3F91]/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {qualitativePillars.map((p) => (
              <div key={p.title} className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
                <Eyebrow variant="on-dark" className="block">
                  {p.label}
                </Eyebrow>
                <h3 className="text-xl font-serif font-bold text-[#FBF8F2]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#FBF8F2]/70 leading-relaxed">
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
          <Eyebrow prefixDot className="block mb-2">
            PRACTICE AREAS
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            Strategic Recruitment Consulting Capabilities
          </h2>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-2 gap-8">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-[#141110]/10 bg-[#F4EFE5]/40 rounded-3xl p-8 hover:border-[#141110]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1D3F91] text-[#FFFFFF] flex items-center justify-center mb-6 shadow-xs">
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
      <section className="py-20 bg-[#FBF8F2] border-t border-[#141110]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-[#1D3F91]/25 bg-[#F4EFE5]/70 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div className="space-y-4">
                <Eyebrow variant="badge" className="inline-block">
                  CLUSTER 6: FAST HIRING SPRINT
                </Eyebrow>
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
                      <CheckCircle2 className="w-4 h-4 text-[#1D3F91] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#141110]/10 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                <Clock className="w-10 h-10 text-[#1D3F91] mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#141110]">Need urgent hiring in Bangalore?</h3>
                <p className="text-xs text-[#5C5449]">
                  Talk directly with our Church Street recruitment team to lock in a dedicated hiring sprint.
                </p>
                <Link
                  href="#contact"
                  className="inline-block w-full py-3 px-4 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] transition-colors rounded-xl text-xs font-mono font-medium"
                >
                  Initiate Fast Hiring Sprint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F4EFE5]/40 border-t border-[#141110]/10">
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
