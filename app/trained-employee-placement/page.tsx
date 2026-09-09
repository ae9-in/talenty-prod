"use client"

import { BookOpen, Settings, Sparkles, X, Check, Terminal, Shield, Layers, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const trainingModules = [
  {
    icon: Terminal,
    title: "Stack-Specific Engineering Upskilling",
    desc: "We calibrate candidates directly on your production environment—framework versions, API paradigms, containerization, and automated test fixtures."
  },
  {
    icon: Settings,
    title: "Custom Workflow Alignment",
    desc: "Candidates train on your exact standard operating procedures, CI/CD pipelines, Git conventions, and documentation standards before deployment."
  },
  {
    icon: Shield,
    title: "Domain & Compliance Readiness",
    desc: "Rigorous domain preparation covering data privacy, financial security standards, healthcare workflows, or enterprise compliance requirements."
  }
]

const stepsToRequest = [
  {
    step: "01",
    title: "Define your technical stack & role brief",
    desc: "Specify your exact framework requirements, architectural patterns, and internal tooling during our initial alignment call."
  },
  {
    step: "02",
    title: "Candidate selection & skill calibration",
    desc: "We source candidates with strong computer science fundamentals and run targeted pre-placement technical training tailored to your specifications."
  },
  {
    step: "03",
    title: "Day-one deployment & ongoing check-in",
    desc: "Candidates join your team with zero onboarding lag, ready to contribute to active codebases and sprint tickets immediately."
  }
]

const traditional = [
  "Weeks lost to basic onboarding and toolchain setup",
  "Heavy drain on senior engineers' mentoring bandwidth",
  "High risk of candidate mismatch on practical workflows",
  "Delayed sprint velocity and productivity lag"
]

const trained = [
  "Day-one productive output on your specific tech stack",
  "Tailored pre-deployment training on internal frameworks",
  "Comprehensive technical vetting pre-completed",
  "Full placement replacement protection standard"
]

export default function TrainedEmployeePlacement() {
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
            <span className="font-mono text-[11px] text-[#8A6420] font-semibold block mb-4">
              Trained placement
            </span>
            
            <RollingHeadline
              line1="Not just sourced."
              accent="Trained."
              line2="Ready on day one."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
              accentClassName="italic font-normal text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#3A5570] max-w-2xl mx-auto leading-relaxed">
              We eliminate the onboarding bottleneck. Talenty Consulting sources high-aptitude talent, trains them on your exact tech stack and operational workflows, and deploys engineers who ship code from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing vs Trained Placement Comparison */}
      <section className="py-20 bg-[#F0E9D5]/40 border-y border-[#0D2D42]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
              · OPERATIONAL COMPARISON
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#0D2D42]">
              Why traditional staffing causes onboarding lag
            </h2>
          </div>

          <RevealGroup className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-8 shadow-xs">
              <h3 className="text-2xl font-serif font-bold text-[#3A5570] mb-6">Traditional Agency Staffing</h3>
              <ul className="space-y-4 text-[#3A5570] text-sm">
                {traditional.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-[#7C601D] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-[#0D2D42] bg-[#F7F2E4] rounded-3xl p-8 relative shadow-[6px_6px_0px_0px_rgba(13,45,66,1)]">
              <span className="absolute -top-3 left-8 bg-[#C18A18] text-[#0D2D42] border border-[#0D2D42]/10 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
                Talenty Trained Model
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#0D2D42] mb-6">Calibrated Placement</h3>
              <ul className="space-y-4 text-[#0D2D42] text-sm font-medium">
                {trained.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C18A18] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Practical Curriculum & Pre-Training Modules */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
              · WHAT TRAINING MEANS IN PRACTICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0D2D42]">
              Pre-deployment upskilling built for your stack
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#3A5570]">
              We do not teach generic theory. Candidates work on simulated production tickets, resolving real-world issues using your specific architectural patterns.
            </p>
          </div>

          <RevealGroup className="grid md:grid-cols-3 gap-6">
            {trainingModules.map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.title}
                  className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-7 hover:border-[#0D2D42]/30 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0D2D42] mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-[#3A5570] leading-relaxed">
                    {module.desc}
                  </p>
                </div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* How To Request Trained Placement + Form */}
      <section className="py-24 bg-[#F0E9D5]/40 border-t border-[#0D2D42]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start max-w-5xl mx-auto">
            <div className="space-y-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
                  · HOW IT WORKS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0D2D42]">
                  How to request trained talent
                </h2>
              </div>

              <div className="space-y-6">
                {stepsToRequest.map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <span className="font-mono text-sm font-bold text-[#0D2D42] bg-[#C18A18]/20 border border-[#C18A18]/30 px-2.5 py-1 rounded-lg flex-shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#0D2D42]">
                        {s.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3A5570] mt-1 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F7F2E4] border-2 border-[#0D2D42] rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)]">
              <EnquiryForm buttonLabel="Request trained candidate cohort" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
