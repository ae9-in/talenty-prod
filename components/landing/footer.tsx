"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LogoBrand } from "@/components/landing/logo-brand"
import { MapPin, Mail, Phone, Globe } from "lucide-react"

const footerLinks = {
  solutions: [
    { name: 'Vetting Process', href: '/talent-screening-process' },
    { name: 'Trained Placement', href: '/trained-employee-placement' },
    { name: 'IT Staffing Bangalore', href: '/it-staffing-bangalore' },
    { name: 'Recruitment Consulting', href: '/recruitment-consulting-bangalore' },
  ],
  company: [
    { name: 'Home', href: '/' },
    { name: 'About Talenty Consulting', href: '/about' },
    { name: 'Field Notes & Blog', href: '/blog' },
    { name: 'Hiring Consultation', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/about' },
    { name: 'Terms of Engagement', href: '/about' },
    { name: 'Replacement Guarantee', href: '/about' },
    { name: 'Candidate Portal', href: '/register' },
  ]
}

export function Footer() {
  const [newsletterPlaceholder, setNewsletterPlaceholder] = useState("you@company.com")
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Typewriter effect for newsletter placeholder
  useEffect(() => {
    const phrases = ['you@company.com', 'priya@northwind.co', 'talent@kestrel.io']
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timer: NodeJS.Timeout

    const tick = () => {
      const currentPhrase = phrases[phraseIndex]
      
      if (!isDeleting) {
        charIndex++
        setNewsletterPlaceholder(currentPhrase.slice(0, charIndex))
        if (charIndex >= currentPhrase.length) {
          isDeleting = true
          timer = setTimeout(tick, 1400)
          return
        }
      } else {
        charIndex--
        setNewsletterPlaceholder(currentPhrase.slice(0, charIndex))
        if (charIndex <= 0) {
          isDeleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
        }
      }

      timer = setTimeout(tick, isDeleting ? 40 : 70)
    }

    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className="bg-[#0D2D42] text-[#F7F2E4] pt-24 pb-12 border-t-2 border-[#C18A18]/30 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-5 border-b border-white/10 pb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <LogoBrand lightMode={true} />
              <p className="text-sm text-[#94AEC6] max-w-sm leading-relaxed">
                Talenty Consulting delivers trained employee placement, recruitment consulting, and calibrated technical staffing across India.
              </p>
            </div>
            
            <div className="space-y-3 max-w-md">
              <h5 className="font-mono text-[11px] uppercase tracking-widest text-[#F7E9A7]">
                Get quarterly talent benchmarks
              </h5>
              <form 
                onSubmit={(e: React.FormEvent) => { e.preventDefault(); setIsSubscribed(true) }}
                className="flex border border-white/15 bg-[#143852] rounded-full overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-[#C18A18] focus-within:border-[#C18A18]"
              >
                <input 
                  type="email" 
                  placeholder={newsletterPlaceholder} 
                  required
                  className="flex-1 bg-transparent border-0 px-4 py-2.5 text-sm outline-none text-[#F7F2E4] placeholder-white/40"
                />
                <button 
                  type="submit" 
                  className="bg-[#C18A18] hover:bg-[#F7E9A7] text-[#0D2D42] font-bold text-xs uppercase px-5 py-2.5 tracking-wider transition-colors cursor-pointer"
                >
                  {isSubscribed ? "Sent ✓" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-[#F7E9A7] mb-5">
              Solutions
            </h5>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13.5px] text-[#94AEC6] hover:text-[#F7E9A7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-[#F7E9A7] mb-5">
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13.5px] text-[#94AEC6] hover:text-[#F7E9A7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Confirmed NAP / Contact Column */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-[#F7E9A7] mb-5">
              Bengaluru Hub
            </h5>
            <div className="space-y-3.5 text-xs text-[#94AEC6] font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C18A18] flex-shrink-0 mt-0.5" />
                <span>BHIVE Platinum, Church Street, Bengaluru, Karnataka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C18A18] flex-shrink-0" />
                <a href="mailto:connect@talentyconsulting.in" className="hover:text-[#F7E9A7] transition-colors">
                  connect@talentyconsulting.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C18A18] flex-shrink-0" />
                <a href="tel:8431119696" className="hover:text-[#F7E9A7] transition-colors font-mono">
                  8431119696
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C18A18] flex-shrink-0" />
                <span className="font-mono">talentyconsulting.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#94AEC6] font-mono">
          <div>
            © {new Date().getFullYear()} Talenty Consulting. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>BHIVE Platinum · Church Street</span>
            <span className="text-[#C18A18]">Bengaluru Hub · Pan-India Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
