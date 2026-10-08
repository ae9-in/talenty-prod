"use client"

import Link from "next/link"
import { RegisterForm } from "@/components/public/register-form"
import { LogoBrand } from "@/components/landing/logo-brand"
import { Eyebrow } from "@/components/ui/eyebrow"

export default function RegisterPage() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#FBF8F2] text-[#141110] font-sans flex items-stretch">
      <div className="w-full grid lg:grid-cols-[1.1fr_0.9fr] items-stretch min-h-screen min-h-dvh">
        
        {/* Left Side: Testimonials & Stats Banner */}
        <section className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#F4EFE5] to-[#FBF8F2] border-r border-[#141110]/10 relative overflow-hidden">
          {/* Background overlay design */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#1D3F91]/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-bg opacity-10 pointer-events-none" />
          
          {/* Header brand link */}
          <div className="relative z-10 select-none">
            <LogoBrand />
          </div>

          {/* Testimonial & numbers block */}
          <div className="space-y-12 relative z-10">
            <div className="space-y-6 max-w-lg">
              <Eyebrow>
                ON THE RECORD
              </Eyebrow>
              <blockquote className="text-2xl font-serif italic font-normal leading-relaxed text-[#5C5449]">
                “The fastest talent pipeline we’ve integrated — from verified candidate cohorts to zero-ramp deployments in days.”
              </blockquote>
              <div className="font-mono text-xs text-[#5C5449]">
                <b className="text-[#141110] text-base font-serif block mb-0.5 font-bold">Sarah Klein</b>
                VP Talent · Northwind Systems
                <br />
                Bengaluru · 1,200 employees
              </div>
            </div>

            {/* Operational Commitments Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#141110]/10 pt-8 max-w-lg">
              <div className="space-y-1">
                <div className="text-2xl font-serif font-extrabold tracking-tight text-[#141110]">Verified</div>
                <div className="font-mono text-[10px] text-[#5C5449] uppercase tracking-wider">code vetting</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-extrabold tracking-tight text-[#141110]">Day-One</div>
                <div className="font-mono text-[10px] text-[#5C5449] uppercase tracking-wider">production ready</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-extrabold tracking-tight text-[#141110]">Pan-India</div>
                <div className="font-mono text-[10px] text-[#5C5449] uppercase tracking-wider">coverage</div>
              </div>
            </div>
          </div>

          {/* Footer copyright */}
          <div className="font-mono text-[11px] text-[#5C5449] relative z-10 select-none">
            © {new Date().getFullYear()} Talenty Consulting · BHIVE Platinum, Church St, Bengaluru
          </div>
        </section>

        {/* Right Side: Registration form */}
        <section className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 bg-[#FBF8F2] relative overflow-hidden">
          {/* Header navigation bar */}
          <div className="absolute top-8 left-6 right-6 md:left-12 md:right-12 lg:left-16 lg:right-16 flex justify-between items-center z-10 font-mono text-[10px] text-[#5C5449]">
            <span className="uppercase tracking-wider">Talenty Portal Registration</span>
            <Link href="/" className="hover:text-[#141110] transition-colors font-semibold flex items-center gap-1">
              ← Back to site
            </Link>
          </div>

          {/* Form wrapper */}
          <div className="max-w-[460px] mx-auto w-full space-y-6 mt-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-semibold tracking-tight text-[#141110]">
                Get started with <span className="text-[#1D3F91]">Talenty.</span>
              </h1>
              <p className="text-[14px] leading-relaxed text-[#5C5449]">
                Choose your registration profile below to connect with technical talent or discover top career opportunities.
              </p>
            </div>

            {/* Registration Form with Recruiter / Recruitee Tabs */}
            <RegisterForm />
          </div>
        </section>
        
      </div>
    </main>
  )
}
