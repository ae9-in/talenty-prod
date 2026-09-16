"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { LogoBrand } from "@/components/landing/logo-brand"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Vetting Process", href: "/talent-screening-process" },
  { name: "Trained Placement", href: "/trained-employee-placement" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "border-b border-[#0D2D42]/10 bg-[#F7F2E4]/90 backdrop-blur-xl shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto flex h-18 items-center justify-between px-6 lg:px-10">
        {/* Brand Lockup */}
        <LogoBrand />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13.5px] font-medium text-[#3A5570] transition-all hover:text-[#0D2D42] relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C18A18] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/register"
            className="bg-[#C18A18] hover:bg-[#F7E9A7] text-[#0D2D42] font-bold text-xs px-5 py-2.5 rounded-full border border-[#7C601D]/40 transition-all shadow-xs hover:shadow-md active:scale-95"
          >
            Registration
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden text-[#0D2D42] focus:outline-none cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl hover:bg-[#F0E9D5] transition-colors"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden border-t border-[#0D2D42]/10 bg-[#F7F2E4] shadow-inner"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center min-h-[44px] px-3 py-2.5 rounded-xl text-base font-semibold text-[#3A5570] hover:text-[#0D2D42] hover:bg-[#F0E9D5] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-[#0D2D42]/10 flex flex-col gap-3">
                <Link
                  href="/register"
                  className="text-center bg-[#C18A18] hover:bg-[#F7E9A7] text-[#0D2D42] py-3.5 min-h-[48px] flex items-center justify-center rounded-full font-bold text-sm border border-[#7C601D]/40 shadow-xs"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Registration
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
