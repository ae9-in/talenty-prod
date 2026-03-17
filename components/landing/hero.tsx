"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Users, Building2, CheckCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function FloatingCard({ 
  children, 
  className, 
  delay = 0,
  mouseX,
  mouseY 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
  mouseX: ReturnType<typeof useMotionValue>
  mouseY: ReturnType<typeof useMotionValue>
}) {
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 })
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 })
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float-delayed opacity-50" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float-slow opacity-40" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Gradient lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,200 Q400,100 800,200 T1600,200"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M0,400 Q400,300 800,400 T1600,400"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </svg>
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
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Trusted by 100+ Companies</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-balance">
                Hire Smarter with{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Talenty Consulting
                </span>
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              We provide trained employees for all roles, across all industries, helping businesses hire faster and better.
            </p>
            
            {/* Key value pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              {["All Roles", "All Industries", "Trained Employees"].map((badge, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30 hover:border-primary/50 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-primary-foreground border-0 group animate-pulse-glow"
              >
                <Link href="/about">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-border/50 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300"
              >
                <Link href="/consultation">Book a Consultation</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/30"
            >
              {[
                { value: "500+", label: "Candidates Placed" },
                { value: "100+", label: "Partner Companies" },
                { value: "95%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right - 3D Visual */}
          {isMounted && (
            <div className="relative h-[400px] lg:h-[500px] hidden md:block">
              {/* Main dashboard card */}
              <FloatingCard
                mouseX={mouseX}
                mouseY={mouseY}
                delay={0.3}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 lg:w-80"
              >
                <div className="glass-card rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Hiring Dashboard</div>
                      <div className="text-xs text-muted-foreground">Real-time tracking</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Active Positions", value: "24" },
                      { label: "Candidates Screened", value: "156" },
                      { label: "Interviews Today", value: "8" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-secondary/30">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingCard>
              
              {/* Floating profile cards */}
              <FloatingCard
                mouseX={mouseX}
                mouseY={mouseY}
                delay={0.5}
                className="absolute top-10 right-0 lg:right-10"
              >
                <div className="glass-card rounded-xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">Priya Sharma</div>
                      <div className="text-xs text-muted-foreground">Senior Developer</div>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
              
              <FloatingCard
                mouseX={mouseX}
                mouseY={mouseY}
                delay={0.7}
                className="absolute bottom-20 left-0 lg:left-10"
              >
                <div className="glass-card rounded-xl p-4 shadow-xl animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">Rahul Patel</div>
                      <div className="text-xs text-muted-foreground">Product Manager</div>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Interviewed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.2)" />
                  </linearGradient>
                </defs>
                <motion.line
                  x1="60%"
                  y1="20%"
                  x2="50%"
                  y2="40%"
                  stroke="url(#connection-gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.line
                  x1="30%"
                  y1="70%"
                  x2="50%"
                  y2="55%"
                  stroke="url(#connection-gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
