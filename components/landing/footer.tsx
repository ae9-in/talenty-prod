"use client"

import { Sparkles, Mail, Phone, MapPin, Linkedin } from "lucide-react"
import Link from "next/link"
import { LINKEDIN_URL, SITE_EMAIL, SITE_HOURS_LABEL, SITE_PHONE } from "@/lib/seo"
import { TrackedMailtoLink, TrackedTelLink } from "@/components/seo/tracked-links"

const footerLinks = {
  services: [
    { name: "Trained Employee Placement", href: "/trained-employee-placement" },
    { name: "Recruitment Consulting", href: "/recruitment-consulting-bangalore" },
    { name: "IT Staffing Bengaluru", href: "/it-staffing-bangalore" },
    { name: "Talent Screening Process", href: "/talent-screening-process" },
  ],
  company: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog & Insights", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 pb-8 pt-20">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mb-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Talenty Consulting</div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Counseling and Consulting
                </div>
              </div>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-muted-foreground">
              Bengaluru recruitment consulting, IT staffing, and trained employee placement for companies
              that need job-ready talent.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <TrackedMailtoLink email={SITE_EMAIL} />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <TrackedTelLink phone={SITE_PHONE} />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Bhive Platinum, Church Street
              </div>
              <div className="pl-7 text-sm text-muted-foreground">{SITE_HOURS_LABEL}</div>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Talenty Consulting. All rights reserved.
          </p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Talenty Consulting on LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
