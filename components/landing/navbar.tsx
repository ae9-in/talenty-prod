"use client"

import { useEffect, useState, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { LogoBrand } from "@/components/landing/logo-brand"

interface NavLink {
  name: string
  href: string
}

interface NavGroup {
  name: string
  children: NavLink[]
}

type NavItem = NavLink | NavGroup

function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    children: [
      { name: "Vetting Process", href: "/talent-screening-process" },
      { name: "Trained Placement", href: "/trained-employee-placement" },
      { name: "IT Staffing Bangalore", href: "/it-staffing-bangalore" },
      { name: "Recruitment Consulting", href: "/recruitment-consulting-bangalore" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

// Flat list for mobile (Services children inlined)
const mobileNavLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Vetting Process", href: "/talent-screening-process" },
  { name: "Trained Placement", href: "/trained-employee-placement" },
  { name: "IT Staffing Bangalore", href: "/it-staffing-bangalore" },
  { name: "Recruitment Consulting", href: "/recruitment-consulting-bangalore" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

function ServicesDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-[13.5px] font-medium text-[#5C5449] transition-all hover:text-[#1D3F91] py-1 group cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {group.name}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1D3F91] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseLeave={() => setOpen(false)}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#FBF8F2] border border-[#15120F]/10 rounded-2xl shadow-lg overflow-hidden z-50 p-1.5"
          >
            {group.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#5C5449] hover:text-[#1D3F91] hover:bg-[#F0E9D5] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D3F91]/40 mr-2.5 flex-shrink-0" />
                {child.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

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
          ? "border-b border-[#141110]/10 bg-[#FBF8F2]/90 backdrop-blur-xl shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto flex h-18 items-center justify-between px-6 lg:px-10">
        {/* Brand Lockup */}
        <LogoBrand />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) =>
            isNavGroup(item) ? (
              <ServicesDropdown key={item.name} group={item} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13.5px] font-medium text-[#5C5449] transition-all hover:text-[#1D3F91] relative py-1 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1D3F91] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/register"
            className="bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-xs px-5 py-2.5 rounded-full border border-[#1D3F91] transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            Registration
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden text-[#141110] focus:outline-none cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl hover:bg-[#F4EFE5] transition-colors"
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
            className="overflow-hidden lg:hidden border-t border-[#141110]/10 bg-[#FBF8F2] shadow-inner"
          >
            <div className="px-6 py-6 space-y-1">
              {/* Home & About */}
              {[mobileNavLinks[0], mobileNavLinks[1]].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center min-h-[44px] px-3 py-2.5 rounded-xl text-base font-semibold text-[#5C5449] hover:text-[#1D3F91] hover:bg-[#F4EFE5] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services group */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="w-full flex items-center justify-between min-h-[44px] px-3 py-2.5 rounded-xl text-base font-semibold text-[#5C5449] hover:text-[#1D3F91] hover:bg-[#F4EFE5] transition-colors cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden ml-3 border-l-2 border-[#1D3F91]/20 pl-3 space-y-0.5"
                    >
                      {mobileNavLinks.slice(2, 6).map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center min-h-[44px] px-3 py-2 rounded-xl text-sm font-medium text-[#5C5449] hover:text-[#1D3F91] hover:bg-[#F4EFE5] transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setMobileServicesOpen(false)
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1D3F91]/40 mr-2.5 flex-shrink-0" />
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog & Contact */}
              {mobileNavLinks.slice(6).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center min-h-[44px] px-3 py-2.5 rounded-xl text-base font-semibold text-[#5C5449] hover:text-[#1D3F91] hover:bg-[#F4EFE5] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#141110]/10 flex flex-col gap-3">
                <Link
                  href="/register"
                  className="text-center bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] py-3.5 min-h-[48px] flex items-center justify-center rounded-full font-bold text-sm shadow-xs"
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
