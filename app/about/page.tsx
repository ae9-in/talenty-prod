"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ShieldCheck, MapPin, Award, Layers } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const pillars = [
  {
    title: "Hub-Anchored, Pan-India Sourcing",
    tag: "GEOGRAPHIC REACH",
    description: "Physical recruitment headquarters in Bengaluru and operational teams in Kochi, with active placement networks spanning Hyderabad, Chennai, Pune, Mumbai, and Delhi NCR.",
  },
  {
    title: "Skills-Gap Trained Placement",
    tag: "ZERO RAMP-UP",
    description: "When the market has a shortage of production-ready talent, we run targeted technical upskilling before placement so candidates deliver output on day one.",
  },
  {
    title: "Explainable Candidate Signals",
    tag: "CALIBRATED VETTING",
    description: "Every submission includes verifiable code evaluations, architecture assessments, and direct reference checks—no opaque keyword matching.",
  },
  {
    title: "Dedicated Single-Desk Accountability",
    tag: "NO HANDOFFS",
    description: "The consultant who understands your technical brief is the same person evaluating candidates and closing the offer with them.",
  },
]

const operationalModels = [
  {
    step: "01",
    title: "Why our Hub + Pan-India model works",
    desc: "Recruiting technical talent across India requires local market familiarity combined with nationwide coverage. By anchoring our core evaluation teams in India's top tech hubs while maintaining active candidate pipelines across tier-1 and tier-2 cities, we tap into high-caliber engineering and business talent that traditional single-city agencies miss entirely.",
  },
  {
    step: "02",
    title: "Why we built the Train-Then-Place loop",
    desc: "Most recruitment failures occur because candidates look qualified on paper but lack specific familiarity with modern production architectures or workflows. Our trained placement track bridges this gap: we pre-screen strong fundamentals, provide intensive stack-specific training, and place candidates who are productive immediately without weeks of internal handholding.",
  },
  {
    step: "03",
    title: "How we protect your hiring bandwidth",
    desc: "We do not forward unvetted resumes. Every candidate profile you receive has passed calibrated technical evaluations, domain problem-solving assessments, and verified background checks. You spend engineering hours only on candidates already cleared as strong hire contenders.",
  },
]

const practices = [
  "Direct technical and reference checks, not automated resume filtering",
  "Function-specialized recruiters across IT, engineering, operations, and leadership",
  "Transparent candidate evaluation scorecards shared directly with hiring teams",
  "Comprehensive replacement protection window on all permanent placements",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#CD9534] selection:text-[#141110]">
      <Navbar />

      {/* Hero with Editorial Photo Background & Seamless Overlays */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#F7F2E4] border-b border-[#15120F]/10">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Talenty Consulting Bangalore office and candidate evaluation team"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Multi-layer editorial gradient overlay for AAA contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2E4] via-[#F7F2E4]/90 to-[#F7F2E4]/40 sm:from-[#F7F2E4] sm:via-[#F7F2E4]/92 sm:to-[#F7F2E4]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2E4] via-transparent to-[#F7F2E4]/40" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-bold block mb-4">
              · TALENTY CONSULTING · PAN-INDIA RECRUITMENT & PLACEMENT
            </span>
            
            <RollingHeadline
              line1="We build the hiring pipeline"
              accent="so your team can ship."
              line2="From sourcing to day-one output."
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold tracking-tight leading-[0.98] text-[#141110]"
              accentClassName="italic font-normal text-[#141110]"
            />

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#5C5449] max-w-2xl font-medium">
              Talenty Consulting operates recruitment consulting and trained employee placement across India. We replace resume-spamming agencies with calibrated technical vetting, hub-office sourcing, and pre-placement upskilling.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#15120F] px-7 py-3.5 text-sm font-semibold text-[#F7F2E4] shadow-[4px_4px_0px_0px_rgba(21,18,15,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(21,18,15,0.9)] transition-all"
              >
                Schedule hiring consultation
              </Link>
              <Link
                href="/trained-employee-placement"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#15120F] bg-[#FFFFFF]/80 backdrop-blur-xs px-7 py-3.5 text-sm font-semibold text-[#141110] hover:bg-[#F0E9D5] transition-all"
              >
                Explore trained placement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qualitative Operational Commitments — Dark Slab */}
      <section className="py-16 bg-[#15120F] text-[#F7F2E4] border-b border-[#15120F]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F7F2E4]/10">
            {pillars.map((p) => (
              <div key={p.title} className="pt-6 sm:pt-0 sm:pl-6 space-y-2">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#CD9534] block font-bold">
                  {p.tag}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#F7F2E4]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#F7F2E4]/70 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Grounded Story & Operating Model */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-bold">
              · OUR OPERATING MODEL
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-semibold tracking-tight leading-[1.05] text-[#141110]">
              Recruitment built for production standards.
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#5C5449]">
              <p>
                Most recruitment agencies optimize for sheer submission volume. They forward hundreds of keyword-matched resumes, leaving hiring managers to filter out unsuitable candidates during expensive technical rounds.
              </p>
              <p>
                Talenty Consulting was founded to solve that operational breakdown. We run recruitment like an internal talent engineering team: we calibrate directly with your hiring managers, verify code and domain problem-solving before submission, and provide pre-placement training when specific stack capabilities are scarce.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-[#15120F] text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#15120F]/20 hover:bg-[#2A2521] transition-all shadow-sm group"
            >
              Start a hiring discussion
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              {operationalModels.map((m) => (
                <div
                  key={m.step}
                  className="border border-[#15120F]/12 bg-[#F0E9D5]/40 rounded-3xl p-6 sm:p-8 hover:border-[#15120F]/30 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#8A6420]">
                    <span>STAGE {m.step}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#141110] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5C5449]">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* In Practice + CTA */}
      <section className="py-24 bg-[#F0E9D5]/40 border-t border-[#15120F]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal className="border border-[#15120F]/12 bg-[#FFFFFF] rounded-3xl p-8 lg:p-10 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-[#141110] mb-6">Our standard operating commitments</h3>
              <div className="space-y-4">
                {practices.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8A6420] flex-shrink-0 mt-0.5" />
                    <span className="text-[14.5px] text-[#5C5449] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight leading-tight text-[#141110]">
                Have a critical role to fill?
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#5C5449] max-w-md">
                Share your requirements and target timeline. We will evaluate our candidate inventory and give you a direct, transparent feasibility assessment before commencing work.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-[#15120F] text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-[#2A2521] transition-all shadow-sm group"
              >
                Schedule hiring consultation
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
