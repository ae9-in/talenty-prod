"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface RollingHeadlineProps {
  line1?: string
  accent?: string
  line2?: string
  text?: string
  as?: "h1" | "h2" | "h3"
  className?: string
  accentClassName?: string
  delay?: number
}

export function RollingHeadline({
  line1,
  accent,
  line2,
  text,
  as = "h1",
  className = "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-semibold tracking-tight text-[#0D2D42] leading-[0.95]",
  accentClassName = "italic font-normal",
  delay = 0.2,
}: RollingHeadlineProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // If simple text is passed without lines
  if (text) {
    const words = text.split(" ")
    return (
      <h1 className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.05em]">
          {words.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden py-1">
              <motion.span
                initial={prefersReducedMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : delay + idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </h1>
    )
  }

  // Multi-line signature headline (Line 1, Accent Line, Line 2)
  const fullAccessibleText = `${line1 || ""} ${accent || ""} ${line2 || ""}`.trim()
  const Tag = as

  return (
    <Tag className={className}>
      <span className="sr-only">{fullAccessibleText}</span>
      <span aria-hidden="true" className="block">
        {line1 && (
          <span className="block overflow-hidden py-0.5">
            <motion.span
              initial={prefersReducedMotion ? false : { y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-[#141110]"
            >
              {line1}
            </motion.span>
          </span>
        )}

        {accent && (
          <span className="block overflow-hidden py-0.5 relative">
            <motion.span
              initial={prefersReducedMotion ? false : { y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                delay: prefersReducedMotion ? 0 : delay + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block text-[#141110] relative ${accentClassName}`}
            >
              {accent}
              {/* Thin gold rule revealed beneath the italic word */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 bottom-0.5 right-0 h-[2.5px] bg-gradient-to-r from-[#8A6420] via-[#E0A83F] to-[#CD9534] origin-left rounded-full"
              />
            </motion.span>
          </span>
        )}

        {line2 && (
          <span className="block overflow-hidden py-0.5">
            <motion.span
              initial={prefersReducedMotion ? false : { y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                delay: prefersReducedMotion ? 0 : delay + 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-[#141110]"
            >
              {line2}
            </motion.span>
          </span>
        )}
      </span>
    </Tag>
  )
}
