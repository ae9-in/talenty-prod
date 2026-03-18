"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

const footerLinks = {
  services: [
    { name: 'Recruitment Consulting', href: '/#services' },
    { name: 'Counseling Support', href: '/contact' },
    { name: 'Hiring Workflows', href: '/#process' },
    { name: 'Talent Screening', href: '/#services' },
  ],
  company: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 pt-20 pb-8">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mb-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <motion.a href="/" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group mb-6 inline-flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground"><Sparkles className="h-5 w-5" /></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-40 blur-lg" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Talenty Consulting</div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Counseling and Consulting</div>
              </div>
            </motion.a>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-6 max-w-sm leading-relaxed text-muted-foreground">
              A premium consulting and recruitment website for companies that need counseling support, hiring guidance, and trained employee solutions.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-3">
              <a href="mailto:connect@talentyconsulting.in" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4 text-primary" />connect@talentyconsulting.in</a>
              <a href="tel:+918431119696" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"><Phone className="h-4 w-4 text-primary" />8431119696</a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />Bhive Platinum, Church Street</div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="mb-4 font-semibold text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}><a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</a></li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="mb-4 font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}><a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</a></li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <h4 className="mb-4 font-semibold text-foreground">What We Offer</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Counseling and consultation</li>
              <li>Business hiring support</li>
              <li>Requirement collection</li>
              <li>Trained employee solutions</li>
            </ul>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Talenty Consulting. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-foreground">
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
