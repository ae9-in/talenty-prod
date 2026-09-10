"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { motion, AnimatePresence } from "framer-motion"
import { HERO_SLIDES, HeroSlide } from "@/data/heroSlides"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { RollingHeadline } from "@/components/landing/rolling-headline"

const DWELL_MS = 4000      // 4000ms = 4.0s per slide
const TEXT_TRANSITION_MS = 620   // 620ms text transition token
const PHOTO_TRANSITION_MS = 700  // 700ms photo crossfade token (deliberate polish mismatch)

export function HeroCarousel() {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const userPaused = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0) // The ONLY state this component owns
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Single GSAP Timeline Autoplay Engine
  useGSAP(
    () => {
      if (prefersReducedMotion) return

      const timeline = gsap.timeline({ repeat: -1 })

      HERO_SLIDES.forEach((slide, i) => {
        timeline
          .addLabel(slide.id)
          .call(() => setActiveIndex(i)) // The ONLY writer to state
          .fromTo(
            ".hero-progress-fill",
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: DWELL_MS / 1000, ease: "none" },
            "<"
          )
      })

      tl.current = timeline

      const onVisibility = () => {
        if (document.hidden) {
          timeline.pause()
        } else {
          if (!userPaused.current) timeline.play()
        }
      }
      document.addEventListener("visibilitychange", onVisibility)

      return () => {
        document.removeEventListener("visibilitychange", onVisibility)
      }
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  )

  // Manual navigation handlers SEEK the timeline — they NEVER call setActiveIndex directly.
  const selectTab = (i: number) => {
    if (tl.current) {
      tl.current.seek(HERO_SLIDES[i].id)
      if (!userPaused.current) tl.current.play()
    } else {
      setActiveIndex(i)
    }
  }

  const nextSlide = () => {
    const next = (activeIndex + 1) % HERO_SLIDES.length
    selectTab(next)
  }

  const prevSlide = () => {
    const prev = (activeIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    selectTab(prev)
  }

  const togglePause = () => {
    userPaused.current = !userPaused.current
    setIsUserPaused(userPaused.current)
    if (userPaused.current) {
      tl.current?.pause()
    } else {
      tl.current?.play()
    }
  }

  // Keyboard navigation ('k' key pause/play + arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prevSlide()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      nextSlide()
    } else if (e.key === "k" || e.key === "K") {
      e.preventDefault()
      togglePause()
    }
  }

  // Touch swipe handling
  const minSwipeDistance = 50
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Everything derived from single activeIndex
  const currentSlide: HeroSlide = HERO_SLIDES[activeIndex]

  return (
    <section
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Talenty Consulting Core Pillars"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden min-h-[660px] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CD9534] z-0"
    >
      {/* 1. TOP SINGLE CONTINUOUS GOLD PROGRESS RAIL */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#15120F]/10 z-30 overflow-hidden">
        <div className="hero-progress-fill h-full bg-gradient-to-r from-[#8A6420] via-[#E0A83F] to-[#CD9534] shadow-[0_0_10px_rgba(205,149,52,0.6)] origin-left scale-x-0" />
      </div>

      {/* 2. BACKGROUND PHOTO LAYER WITH SMOOTH CROSSFADE & KEN BURNS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hero-photo-stack">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive && !prefersReducedMotion ? 1 : 1.03,
              }}
              transition={{
                opacity: { duration: PHOTO_TRANSITION_MS / 1000, ease: [0.45, 0, 0.55, 1] },
                scale: { duration: DWELL_MS / 1000 + 0.5, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slide.backgroundImage}
                alt=""
                fill
                priority={true}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          )
        })}
      </div>

      {/* 3. CREAM/BLACK LEGIBILITY SCRIM */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#F7F2E4] via-[#F7F2E4]/85 to-[#F7F2E4]/25 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#F7F2E4] to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F7F2E4] to-transparent pointer-events-none z-[1]" />

      {/* 4. HERO CONTENT WRAPPER */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-3xl min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: TEXT_TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Sentence-case kicker label in --gold-text (#8A6420, 5.05:1 contrast, no pill/border) */}
              <div className="font-sans text-sm font-medium text-[#8A6420] tracking-normal">
                {currentSlide.pillar}
              </div>

              {/* Semantic H1 for SEO */}
              <h1 className="sr-only">Talenty Consulting — HR & Recruitment Consultancy, Bengaluru</h1>

              {/* Rolling Headline */}
              <RollingHeadline
                as="h2"
                line1={currentSlide.headlineLine1}
                accent={currentSlide.headlineAccent}
                line2={currentSlide.headlineLine2}
                accentClassName="italic font-normal"
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-[88px] font-serif font-semibold tracking-tight text-[#141110] leading-[0.92]"
              />

              {/* Subcopy */}
              <p className="text-xl sm:text-2xl leading-relaxed text-[#5C5449] max-w-2xl font-sans">
                {currentSlide.subcopy}
              </p>

              {/* Action Buttons — Primary: Gold Fill with Black Text (7.06:1), Secondary: Black Outline */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#CD9534] hover:bg-[#E0A83F] text-[#15120F] font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-[#8A6420]/40 transition-all shadow-[0_4px_14px_rgba(205,149,52,0.35)] group cursor-pointer active:scale-95"
                >
                  Request a consultation
                </Link>
                <Link
                  href="/talent-screening-process"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F0E9D5] text-[#15120F] font-bold text-sm sm:text-base px-7 py-4 rounded-full border-2 border-[#15120F] transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Explore Vetting Process
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5. CAROUSEL CONTROLS & ACTIVE PILLAR PILLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-[#15120F]/10">
          
          {/* Left: Interactive Pillar Pills with Single Gold Line Indicator */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => selectTab(idx)}
                  className={`px-4 py-2.5 rounded-full font-mono text-[11px] font-medium transition-all flex items-center gap-2.5 min-h-[40px] cursor-pointer relative overflow-hidden ${
                    isActive
                      ? "bg-[#15120F] text-[#F7EEDC] shadow-sm"
                      : "bg-[#FFFFFF] border border-[#15120F]/10 text-[#5C5449] hover:text-[#15120F] hover:bg-[#F0E9D5]"
                  }`}
                  aria-label={`Select ${slide.pillar} tab`}
                  aria-current={isActive ? "true" : "false"}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? "bg-[#CD9534]" : "bg-[#15120F]/30"
                    }`}
                  />
                  <span>{slide.pillar}</span>
                </button>
              )
            })}
          </div>

          {/* Right: Prev/Next Arrows & Low-Profile WCAG Pause Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#15120F]/20 bg-[#FFFFFF] hover:bg-[#F0E9D5] text-[#15120F] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[#8A6420] bg-[#15120F] hover:bg-[#2A2521] text-[#F7EEDC] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Low-profile WCAG 2.2.2 Pause/Play button */}
            <button
              onClick={togglePause}
              className="w-10 h-10 rounded-full border border-[#15120F]/20 bg-[#FFFFFF] hover:bg-[#F0E9D5] text-[#15120F] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
              aria-label={isUserPaused ? "Resume autoplay (or press K)" : "Pause autoplay (or press K)"}
              title={isUserPaused ? "Resume autoplay (K)" : "Pause autoplay (K)"}
            >
              {isUserPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
