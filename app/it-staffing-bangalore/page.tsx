"use client"

import { Code, Terminal, Database, Cloud, Monitor, Layers, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const techRoles = [
  {
    icon: Code,
    title: "Frontend Engineers",
    techs: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "WebSockets"]
  },
  {
    icon: Terminal,
    title: "Backend & Systems",
    techs: ["Go", "Node.js", "Python", "Java / Spring", "gRPC", "Kafka"]
  },
  {
    icon: Database,
    title: "Data & Platform",
    techs: ["PostgreSQL", "Redis", "Apache Spark", "ClickHouse", "Data Pipelines"]
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud SRE",
    techs: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD Sprints"]
  },
  {
    icon: Monitor,
    title: "Mobile Engineers",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "High Performance"]
  },
  {
    icon: Layers,
    title: "AI & ML Engineers",
    techs: ["PyTorch", "vLLM", "CUDA", "Triton", "LangChain"]
  }
]

const screeningSteps = [
  "Hands-on coding challenges and algorithmic problem solving",
  "Sandboxed system design review covering concurrency and fault tolerance",
  "Communication and cross-functional collaboration vetting",
]

const qualitativeSignals = [
  { label: "Turnaround Sprints", value: "Rapid Shortlist Delivery" },
  { label: "Vetting Caliber", value: "Pre-Screened Codebase Tests" },
  { label: "Offer Security", value: "High Candidate Retention Window" },
]

export default function ItStaffingBangalore() {
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
              · BENGALURU IT STAFFING HUB
            </span>
            
            <RollingHeadline
              line1="Technical staffing &"
              accent="engineering recruitment."
              line2="Bengaluru & Pan-India."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#0D2D42]"
            />

            <p className="mt-5 text-lg md:text-xl text-[#3A5570] max-w-2xl mx-auto leading-relaxed">
              Scale your engineering organization with vetted software engineers, architects, and DevOps leads. Talenty Consulting sources from India's top tech hubs and delivers candidates ready for production reviews.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#C18A18] hover:bg-[#7C601D] text-[#0D2D42] hover:text-[#F7F2E4] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#0D2D42]/10 transition-all shadow-sm group"
            >
              Hire engineering talent
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Roles We Recruit For */}
      <section className="py-20 bg-[#F0E9D5]/40 border-y border-[#0D2D42]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-2">
              · ROLES & SPECIALIZATIONS
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#0D2D42]">
              Technical roles we place
            </h2>
          </div>

          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techRoles.map((role) => {
              const Icon = role.icon
              return (
                <div
                  key={role.title}
                  className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-7 hover:border-[#0D2D42]/30 transition-all space-y-4 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0D2D42] text-[#F7E9A7] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0D2D42]">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.techs.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] bg-[#F0E9D5] px-2.5 py-1 rounded-md text-[#3A5570]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Operating Commitments */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-4xl mx-auto border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-8 sm:p-12 shadow-sm">
          <h3 className="text-2xl font-serif font-bold text-[#0D2D42] mb-6">
            Our engineering vetting standards
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 pt-2 pb-6 border-b border-[#0D2D42]/10 mb-6">
            {qualitativeSignals.map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C18A18] font-bold block">
                  {item.label}
                </span>
                <span className="text-base font-serif font-bold text-[#0D2D42] block">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {screeningSteps.map((step) => (
              <div key={step} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C18A18] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#3A5570]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F0E9D5]/40 border-t border-[#0D2D42]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-[#0D2D42]">
              Request technical candidate profiles
            </h2>
            <p className="text-sm text-[#3A5570] mt-2">
              Share your role description and tech stack requirements. Our Bangalore engineering desk (BHIVE Church St) will review and provide available talent matches.
            </p>
          </div>
          <div className="bg-[#F7F2E4] border-2 border-[#0D2D42] rounded-3xl p-2 sm:p-4 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)]">
            <EnquiryForm buttonLabel="Submit technical hiring brief" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
