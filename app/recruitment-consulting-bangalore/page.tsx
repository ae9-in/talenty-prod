"use client"

import { Building2, ShieldCheck, Zap, CheckCircle2, MapPin } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const qualitativePillars = [
  { label: "CONSULTING EXPERTISE", title: "Dedicated Lead Desk", desc: "One recruiter coordinates candidate sourcing, evaluations, and offer extension." },
  { label: "VETTING CALIBER", title: "Pre-Screened Codebases", desc: "Every engineering candidate completes sandboxed problem-solving tasks." },
  { label: "GEOGRAPHIC COVERAGE", title: "Hub-Anchored Sourcing", desc: "Church Street headquarters with active recruitment pipelines nationwide." },
  { label: "PLACEMENT ASSURANCE", title: "Replacement Guarantee", desc: "Full replacement assurance window standard on all permanent hires." },
]

const capabilities = [
  {
    icon: Building2,
    title: "Bengaluru Tech Ecosystem Insights",
    desc: "Our Church Street team operates at the heart of India's Silicon Valley, leveraging real-time compensation benchmarks and engineering talent trends.",
  },
  {
    icon: ShieldCheck,
    title: "Calibrated Technical & Cultural Vetting",
    desc: "Candidates clear hands-on programming assessments, cognitive problem solving, and in-depth behavioral rounds before reaching your calendar.",
  },
  {
    icon: Zap,
    title: "Scalable Hiring Sprints",
    desc: "Whether building out a 15-person engineering squad or hiring an executive Director of Technology, we provide structured, high-velocity sourcing.",
  },
]

export default function RecruitmentConsultingBangalore() {
  return (
    <main className="min-h-screen bg-[#F7F2E4] text-[#0D2D42] font-sans selection:bg-[#C18A18] selection:text-[#0D2D42]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-[#C18A18]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-[380px] h-[380px] bg-[#C18A18]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-4">
              · BENGALURU RECRUITMENT & STAFFING HEADQUARTERS
            </span>
            
            <RollingHeadline
              line1="Recruitment consulting &"
              accent="talent placement."
              line2="Church Street, Bengaluru."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#0D2D42]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#3A5570] max-w-2xl mx-auto leading-relaxed">
              Based at BHIVE Platinum on Church Street, Talenty Consulting partners with technology scaleups and enterprises across India to hire verified, production-ready engineering and executive talent.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#C18A18] hover:bg-[#7C601D] text-[#0D2D42] hover:text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#0D2D42]/10 transition-all shadow-sm group"
            >
              Start hiring in Bengaluru
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

      {/* Key Sourcing Capabilities */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
            · WHY TALENTY BENGALURU
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0D2D42]">
            Strategic recruitment for growing teams
          </h2>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-8 hover:border-[#0D2D42]/30 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center mb-6 shadow-xs">
                  <cap.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0D2D42] mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#3A5570] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F0E9D5]/40 border-t border-[#0D2D42]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#0D2D42]">
              Connect with our Church Street team
            </h2>
            <p className="text-sm text-[#3A3F4B] mt-2">
              Submit your hiring requirements below. We will coordinate a consultation call to review compensation benchmarks and candidate timelines.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#0D2D42] rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)]">
            <EnquiryForm buttonLabel="Schedule Bangalore consultation" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
