"use client"

import { Settings, Sparkles, X, Check, Terminal, Shield, Layers, CheckCircle2, Zap, Award } from "lucide-react"
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
    title: "Domain & Operational Readiness",
    desc: "Rigorous domain preparation covering data privacy, financial systems, architecture workflows, and enterprise compliance requirements."
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
    desc: "We source candidates with strong fundamental capability and execute targeted pre-placement training tailored to your specifications."
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
              · REDUCED ONBOARDING LAG · DAY-ONE PRODUCTIVITY
            </span>
            
            <h1 className="sr-only">Trained Employee Placement — Job-Ready From Day One</h1>

            <RollingHeadline
              as="h2"
              line1="Trained Employee Placement"
              accent="job-ready from day one."
              line2="Zero Ramp-Up Friction."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#5C5449] max-w-2xl mx-auto leading-relaxed">
              Talenty places pre-trained, job-ready candidates who need less onboarding time. We calibrate talent on your specific tech stack, architecture standards, and workflow tools before day one.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#CD9534] hover:bg-[#8A6420] text-[#141110] hover:text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#141110]/10 transition-all shadow-sm group"
            >
              Request trained candidates
            </Link>
          </div>
        </div>
      </section>

      {/* What 'Trained' Means Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-2">
            · TRAINING ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            What &ldquo;Trained&rdquo; Means in Talenty&apos;s Process
          </h2>
          <p className="text-sm sm:text-base text-[#5C5449] mt-3">
            We don&apos;t just deliver resumes—we train candidates on the exact frameworks, internal tooling, and operational paradigms your business uses.
          </p>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-3 gap-8">
          {trainingModules.map((item) => (
            <div
              key={item.title}
              className="border border-[#141110]/10 bg-[#F0E9D5]/40 rounded-3xl p-8 hover:border-[#141110]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center mb-6 shadow-xs">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#141110] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5C5449] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Comparison: Day-One Productivity & Reduced Onboarding Time */}
      <section className="py-24 bg-[#0D2D42] text-[#F7F2E4] border-y-2 border-[#C18A18]/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F7E9A7] block font-bold mb-2">
              · ONBOARDING COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F2E4]">
              Day-One Productivity & Reduced Onboarding Time
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F2E4]/70 mt-3">
              Traditional staffing pushes the training burden onto your senior engineers. Talenty pre-calibrates candidates before deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Hiring */}
            <div className="bg-[#143852] border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F7F2E4]">Traditional Sourcing</h3>
              </div>
              <ul className="space-y-3.5 text-xs text-[#F7F2E4]/70">
                {traditional.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talenty Trained Placement */}
            <div className="bg-[#143852] border-2 border-[#C18A18] rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#C18A18] text-[#0D2D42] font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                Talenty Model
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C18A18]/20 text-[#F7E9A7] flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F7F2E4]">Trained Placement</h3>
              </div>
              <ul className="space-y-3.5 text-xs text-[#F7F2E4]/90">
                {trained.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-medium">
                    <Check className="w-4 h-4 text-[#F7E9A7] mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Vetted Candidate Pipeline Across India */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-2">
            · DEPLOYMENT PROTOCOL
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            Pre-Vetted Candidate Pipeline Across India
          </h2>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-3 gap-8">
          {stepsToRequest.map((step) => (
            <div
              key={step.step}
              className="border border-[#141110]/10 bg-[#F0E9D5]/40 rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#8A6420] block mb-4">
                  STAGE {step.step}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#141110] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5C5449] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F0E9D5]/40 border-t border-[#141110]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Deploy trained employees to your team
            </h2>
            <p className="text-sm text-[#5C5449] mt-2">
              Share your tech stack and required team size. We will outline our training cohort schedule and candidate availability.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#141110]/20 rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(21,18,15,0.06)]">
            <EnquiryForm buttonLabel="Inquire about trained placement" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
