"use client"

import { Clock, ShieldCheck, Mail, Phone, MapPin } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { Reveal } from "@/components/landing/scroll-reveal"

const nextSteps = [
  {
    step: "01",
    title: "Review within 2 business hours",
    desc: "A senior recruitment lead evaluates your role requirements against active candidate inventory."
  },
  {
    step: "02",
    title: "15-minute scoping call",
    desc: "We align on compensation bands, technical vetting criteria, and delivery timelines."
  },
  {
    step: "03",
    title: "Calibrated candidate shortlist",
    desc: "We commence sourcing and provide screened, scorecard-backed candidates directly to your team."
  }
]

export default function ContactPage() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#F7F2E4] text-[#141110] font-sans selection:bg-[#CD9534] selection:text-[#141110]">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute top-0 inset-x-0 h-[380px] bg-gradient-to-b from-[#CD9534]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#CD9534] font-semibold block mb-4">
              · HIRING CONSULTATION & INTAKE
            </span>
            
            <RollingHeadline
              line1="Tell us what you're hiring."
              accent="We respond directly."
              line2="No automated sales queues."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#141110]"
            />

            <p className="mt-4 text-base md:text-lg text-[#5C5449] max-w-xl mx-auto leading-relaxed">
              Submit your hiring requirements below. A dedicated consultant reviews the brief and gets back to you with timeline feasibility within two business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start max-w-5xl mx-auto">
          {/* Form Card */}
          <Reveal className="bg-[#F7F2E4] border-2 border-[#15120F]/15 rounded-3xl shadow-[4px_4px_0px_0px_rgba(21,18,15,0.06)] overflow-hidden">
            <EnquiryForm buttonLabel="Submit hiring requirements" />
          </Reveal>

          {/* Right Info Cards */}
          <Reveal delay={0.1} className="space-y-6">
            {/* What Happens Next */}
            <div className="bg-[#F7F2E4] border-2 border-[#15120F]/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_rgba(21,18,15,0.06)]">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#8A6420] font-bold block">
                What happens next
              </span>
              <div className="space-y-4">
                {nextSteps.map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <span className="font-mono text-xs font-bold text-[#141110] bg-[#F0E9D5] px-2 py-0.5 rounded-md flex-shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#141110]">
                        {s.title}
                      </h4>
                      <p className="text-xs text-[#5C5449] mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office & Direct Contact */}
            <div className="bg-[#F7F2E4] border-2 border-[#15120F]/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_rgba(21,18,15,0.06)]">
              <h2 className="text-lg font-serif font-bold text-[#141110]">
                Bengaluru Headquarters
              </h2>
              <p className="text-xs text-[#5C5449] leading-relaxed">
                BHIVE Platinum, Church Street, Bengaluru, Karnataka. Pan-India placement operations managed across major tech centers.
              </p>
              <div className="space-y-2.5 font-mono text-[11px] text-[#5C5449] border-t border-[#15120F]/10 pt-4">
                <div className="flex items-center justify-between">
                  <span>Direct Email:</span>
                  <b className="text-[#141110]">connect@talentyconsulting.in</b>
                </div>
                <div className="flex items-center justify-between">
                  <span>Consulting Desk:</span>
                  <b className="text-[#141110]">8431119696</b>
                </div>
                <div className="flex items-center justify-between">
                  <span>Operating Hours:</span>
                  <b className="text-[#141110]">Mon - Sat, 09:00 - 18:00 IST</b>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
