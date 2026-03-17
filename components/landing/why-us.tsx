"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  HeadphonesIcon 
} from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Pre-trained Candidates",
    description: "Our candidates come equipped with industry-relevant skills and certifications."
  },
  {
    icon: Clock,
    title: "Faster Hiring Process",
    description: "Reduce time-to-hire by 60% with our streamlined recruitment pipeline."
  },
  {
    icon: Users,
    title: "Reliable Talent Pipeline",
    description: "Access to a curated pool of vetted professionals across industries."
  },
  {
    icon: Briefcase,
    title: "Business-focused Staffing",
    description: "Solutions aligned with your business objectives and growth plans."
  },
  {
    icon: ShieldCheck,
    title: "Quality Screening",
    description: "Multi-stage evaluation ensures only the best candidates reach you."
  },
  {
    icon: HeadphonesIcon,
    title: "End-to-end Support",
    description: "Dedicated support from initial consultation to post-placement follow-up."
  }
]

const stats = [
  { value: 500, suffix: "+", label: "Candidates Placed" },
  { value: 100, suffix: "+", label: "Partner Companies" },
  { value: 95, suffix: "%", label: "Client Satisfaction" }
]

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function WhyUs() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" })

  return (
    <section id="why-us" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-6 text-balance">
            The{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Talenty Advantage
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            We go beyond traditional recruiting to deliver measurable results and lasting partnerships.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 lg:p-12 mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={statsInView} />
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="flex gap-4 p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
