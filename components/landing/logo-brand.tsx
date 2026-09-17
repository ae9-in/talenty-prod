"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export type LogoVariant = "gold" | "navy" | "cream"

interface LogoMonogramProps {
  variant?: LogoVariant
  className?: string
  animated?: boolean
  size?: number | string
}

export function LogoMonogram({
  variant = "gold",
  className = "w-10 h-10",
  animated = true,
}: LogoMonogramProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <motion.div
      initial={prefersReducedMotion || !animated ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex-shrink-0 flex items-center justify-center ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/talenty-monogram.png"
          alt="Talenty Monogram"
          width={100}
          height={100}
          priority
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(16,31,69,0.2)]"
        />
        {animated && !prefersReducedMotion && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "180%", opacity: [0, 0.75, 0] }}
            transition={{
              duration: 1.1,
              delay: 0.35,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFFFF]/50 to-transparent pointer-events-none transform -skew-x-12"
          />
        )}
      </div>
    </motion.div>
  )
}

interface LogoBrandProps {
  lightMode?: boolean // true for dark background sections (e.g. footer)
  variant?: LogoVariant
  monogramOnly?: boolean
  mobileMonogramOnly?: boolean
  className?: string
  href?: string
}

export function LogoBrand({
  lightMode = false,
  variant = "gold",
  monogramOnly = false,
  mobileMonogramOnly = false,
  className = "",
  href = "/",
}: LogoBrandProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const Content = (
    <div className={`group flex items-center gap-3 cursor-pointer select-none py-1 ${className}`}>
      {monogramOnly ? (
        <LogoMonogram variant={variant} className="w-10 h-10" />
      ) : (
        <div className="relative flex items-center">
          {/* Mobile view if mobileMonogramOnly */}
          {mobileMonogramOnly && (
            <div className="block sm:hidden">
              <LogoMonogram variant={variant} className="w-9 h-9" />
            </div>
          )}

          {/* Full 3D Gold Lockup Image */}
          <div
            className={`relative transition-transform duration-300 group-hover:scale-[1.02] ${
              mobileMonogramOnly ? "hidden sm:block" : "block"
            }`}
          >
            <Image
              src="/images/talenty-logo-full.png"
              alt="Talenty Consulting"
              width={160}
              height={55}
              priority
              className="h-11 sm:h-12 w-auto object-contain drop-shadow-[0_2px_5px_rgba(124,96,29,0.2)]"
            />
          </div>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} aria-label="Talenty Consulting Home">
        {Content}
      </Link>
    )
  }

  return Content
}
