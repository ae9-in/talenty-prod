"use client"

import { Code, Terminal, Database, Cloud, Monitor, Layers, CheckCircle2, Cpu } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const roleLongTails = [
  {
    icon: Terminal,
    roleTitle: "Hire Java Developers in Bangalore",
    techs: ["Java 17/21", "Spring Boot", "Microservices", "Hibernate", "Kafka"],
    description: "Source vetted Java developers with deep experience in enterprise microservices, event-driven architectures, and high-throughput APIs. Our Java candidates clear hands-on concurrency and data persistence assessments before recommendation."
  },
  {
    icon: Code,
    roleTitle: "Hire React & Frontend Developers in Bangalore",
    techs: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux/Zustand"],
    description: "Hire production-ready frontend engineers proficient in modern React, Next.js App Router, state management, and accessible UI engineering. Every candidate submits clean, componentized code that meets production design system standards."
  },
  {
    icon: Cpu,
    roleTitle: "Hire Python & AI Engineers in Bangalore",
    techs: ["Python", "FastAPI", "Django", "PyTorch", "LangChain", "LLMs"],
    description: "Access specialized Python developers and Applied AI engineers skilled in scalable backend architectures, asynchronous workflows, machine learning model integration, and vector database retrieval pipelines."
  },
  {
    icon: Cloud,
    roleTitle: "Hire DevOps & Cloud SRE Specialists in Bangalore",
    techs: ["AWS / GCP", "Kubernetes", "Docker", "Terraform", "CI/CD Sprints"],
    description: "Deploy seasoned DevOps and Site Reliability Engineers capable of architecting resilient infrastructure as code, automated zero-downtime deployment pipelines, and proactive observability stacks."
  },
  {
    icon: Layers,
    roleTitle: "Hire Full-Stack Developers in Bangalore",
    techs: ["TypeScript", "Node.js", "React", "PostgreSQL", "REST & GraphQL"],
    description: "Bridge frontend dynamism and backend stability with versatile full-stack engineers tested on database design, secure authentication patterns, and performant user interfaces."
  },
  {
    icon: Monitor,
    roleTitle: "Hire Mobile Engineers in Bangalore",
    techs: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)"],
    description: "Build seamless cross-platform or native mobile applications with mobile developers experienced in offline-first state synchronization, hardware integration, and app store deployment lifecycles."
  }
]

const screeningSteps = [
  "Hands-on coding challenges and algorithmic problem solving in sandboxed environments",
  "System design interview reviewing concurrency, caching strategies, and fault tolerance",
  "Technical communication, code review comprehension, and engineering ownership vetting",
]

const qualitativeSignals = [
  { label: "Contract & Permanent", value: "Flexible Staffing Models" },
  { label: "Vetting Caliber", value: "Pre-Screened Codebase Tests" },
  { label: "Turnaround Velocity", value: "Shortlists in 72 Hours" },
]

export default function ItStaffingBangalore() {
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
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-4">
              · TECHNICAL STAFFING & CONTRACT HIRING
            </span>
            
            <h1 className="sr-only">IT Staffing Services in Bangalore</h1>

            <RollingHeadline
              as="h2"
              line1="IT Staffing Services"
              accent="in Bangalore."
              line2="Contract & Permanent Tech Talent."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#5C5449] max-w-2xl mx-auto leading-relaxed">
              Hire Java, Python, React, DevOps, and full-stack developers in Bangalore through Talenty&apos;s contract and permanent IT staffing services. Every engineer is pre-screened on live codebases before entering your hiring loop.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#CD9534] hover:bg-[#8A6420] text-[#141110] hover:text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#141110]/10 transition-all shadow-sm group"
            >
              Request tech staffing shortlist
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Signals — Dark Slab */}
      <section className="py-16 bg-[#0D2D42] text-[#F7F2E4] border-y-2 border-[#C18A18]/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealGroup className="grid gap-8 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {qualitativeSignals.map((sig) => (
              <div key={sig.label} className="pt-6 sm:pt-0 sm:pl-6 space-y-2 text-center sm:text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#F7E9A7] block font-bold">
                  {sig.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F2E4]">
                  {sig.value}
                </h3>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Role Long-Tail Categories Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-2">
            · ROLE-CALIBRATED STAFFING
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#141110]">
            Full-Lifecycle IT Staffing for High-Growth Tech Teams
          </h2>
          <p className="text-sm sm:text-base text-[#5C5449] mt-3">
            Targeted technical staffing across core engineering disciplines. Each cohort undergoes sandboxed problem solving, framework calibration, and architecture review.
          </p>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleLongTails.map((item) => (
            <div
              key={item.roleTitle}
              className="border border-[#141110]/10 bg-[#F0E9D5]/40 rounded-3xl p-7 hover:border-[#141110]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center mb-5 shadow-xs">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#141110] mb-2.5">
                  {item.roleTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5449] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#141110]/10">
                <div className="flex flex-wrap gap-1.5">
                  {item.techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#141110]/5 text-[#141110] border border-[#141110]/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* 3-Step Vetting Sieve */}
      <section className="py-20 bg-[#F0E9D5]/40 border-t border-[#141110]/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block mb-2">
            · TECHNICAL SCREENING GATE
          </span>
          <h2 className="text-3xl font-serif font-semibold text-[#141110] mb-8">
            How Every IT Staffing Candidate is Evaluated
          </h2>
          <div className="space-y-4 text-left">
            {screeningSteps.map((step, idx) => (
              <div
                key={idx}
                className="border border-[#141110]/10 bg-[#F7F2E4] rounded-2xl p-5 flex items-start gap-4 shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#CD9534] text-[#141110] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <p className="text-sm sm:text-base text-[#141110] font-medium leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F7F2E4] border-t border-[#141110]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#141110]">
              Hire Bangalore IT Engineers on Demand
            </h2>
            <p className="text-sm text-[#5C5449] mt-2">
              Share your technical stack and seniority requirements. We will provide pre-screened developer profiles within 72 hours.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#141110]/20 rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(21,18,15,0.06)]">
            <EnquiryForm buttonLabel="Request developer profiles" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
