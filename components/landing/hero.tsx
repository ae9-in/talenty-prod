"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Users, Building2, CheckCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function FloatingCard({ children, className, delay = 0, mouseX, mouseY }: { children: React.ReactNode; className?: string; delay?: number; mouseX: ReturnType<typeof useMotionValue>; mouseY: ReturnType<typeof useMotionValue> }) {
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 })
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 })
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20 })

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }} style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl opacity-50 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-40 animate-float-slow" />
      <div className="absolute inset-0 grid-bg opacity-50" />
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Counseling, Consulting, and Hiring Support</span>
            </motion.div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Premium counseling and hiring workflows for <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Talenty Consulting</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Submit consulting enquiries and connect with a team built to support hiring, training, and workforce growth across industries.
            </p>
            <div className="mb-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Consulting', 'Counseling', 'Hiring Support', 'Trained Employees'].map((badge) => (
                <span key={badge} className="rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 text-sm font-medium text-foreground">{badge}</span>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                <Link href="/contact">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {isMounted ? (
            <div className="relative hidden h-[420px] md:block lg:h-[520px]">
              <FloatingCard mouseX={mouseX} mouseY={mouseY} delay={0.3} className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2">
                <div className="glass-card rounded-3xl p-6 shadow-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                      <Building2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Talenty Consulting</div>
                      <div className="text-xs text-muted-foreground">Requirement capture and staffing support</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[{ label: 'Active Hiring Plans', value: '18' }, { label: 'Industry Coverage', value: 'All' }, { label: 'Training Batches', value: '12' }].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-2xl bg-secondary/30 p-3">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingCard>
              <FloatingCard mouseX={mouseX} mouseY={mouseY} delay={0.45} className="absolute right-0 top-8">
                <div className="glass-card rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500"><Users className="h-6 w-6 text-foreground" /></div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Live Enquiry</div>
                      <div className="text-xs text-muted-foreground">Counseling · IT & Software</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-green-400"><CheckCircle className="h-3 w-3" /> New request</div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
              <FloatingCard mouseX={mouseX} mouseY={mouseY} delay={0.6} className="absolute bottom-16 left-4">
                <div className="glass-card rounded-2xl p-4 shadow-xl animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"><Building2 className="h-6 w-6 text-foreground" /></div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Business Support</div>
                      <div className="text-xs text-muted-foreground">From consultation to staffing execution</div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
