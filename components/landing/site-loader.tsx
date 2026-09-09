"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // 1. Session check: only show once per browsing session
    const hasSeenLoader = sessionStorage.getItem("talenty_loader_shown")
    if (hasSeenLoader) {
      setIsLoading(false)
      return
    }

    // 2. Reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    // 3. Lock scroll during load
    document.body.style.overflow = "hidden"

    const startTime = performance.now()
    const MIN_DURATION = 850 // Enforce minimum perceivable display time

    const finishLoading = () => {
      const elapsed = performance.now() - startTime
      const remainingTime = Math.max(0, MIN_DURATION - elapsed)
      
      setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem("talenty_loader_shown", "true")
        document.body.style.overflow = ""
      }, remainingTime)
    }

    // 4. Check readiness (fonts + window load)
    if (document.readyState === "complete") {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(finishLoading).catch(finishLoading)
      } else {
        finishLoading()
      }
    } else {
      window.addEventListener("load", finishLoading, { once: true })
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="site-loader"
          role="status"
          aria-label="Loading Talenty Consulting"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F7F2E4] select-none"
        >
          {/* Subtle ambient luxury gold radiance in background */}
          <div className="absolute w-80 h-80 rounded-full bg-[#C18A18]/12 blur-3xl pointer-events-none" />

          {/* Centered 3D Gold Monogram / Lockup */}
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0.92, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { scale: 1, opacity: 1 }
                : {
                    scale: [1, 1.03, 1],
                    opacity: 1,
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.35 }
                : {
                    scale: {
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.45, ease: "easeOut" },
                  }
            }
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* Real 3D Gold Lockup Image */}
            <div className="relative w-44 sm:w-56 h-auto drop-shadow-[0_8px_20px_rgba(124,96,29,0.25)]">
              <Image
                src="/images/talenty-logo-full.png"
                alt="Talenty Consulting"
                width={320}
                height={260}
                priority
                className="w-full h-auto object-contain"
              />

              {/* Shimmer Sheen Sweep Across the Gold Metallic Surface */}
              {!prefersReducedMotion && (
                <motion.div
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "220%", opacity: [0, 0.7, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    duration: 1.3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7E9A7]/45 to-transparent pointer-events-none transform -skew-x-12"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
