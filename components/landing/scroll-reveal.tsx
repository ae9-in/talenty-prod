"use client"

import { motion } from "framer-motion"

type RevealProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section"
  delay?: number
  y?: number
  blur?: number
  duration?: number
}

/** Fades and lifts a section as it scrolls into view using Framer Motion. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.8,
}: RevealProps) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </Component>
  )
}

type RevealGroupProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
}

/** Container that stagger-animates its children as they scroll into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
