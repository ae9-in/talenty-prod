"use client"

import { useEffect, useState } from "react"
import { Menu, Shield, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/contact" },
  { name: "Register", href: "/register" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-40 blur-xl group-hover:opacity-60 transition-opacity" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">Talenty Consulting</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Public + Admin Flow</div>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          ))}
          <Button asChild className="border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setIsMobileMenuOpen((current) => !current)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <motion.div initial={false} animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }} className="overflow-hidden lg:hidden">
        <div className="container mx-auto space-y-3 border-t border-border/40 px-4 py-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="block py-2 text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.header>
  )
}

