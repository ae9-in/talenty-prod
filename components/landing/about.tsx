"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Lightbulb, Shield, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Precision Matching",
    description: "We connect the right talent with the right opportunities through data-driven recruitment."
  },
  {
    icon: Lightbulb,
    title: "Industry Expertise",
    description: "Deep understanding of market trends and sector-specific hiring requirements."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous screening processes ensure only top-tier candidates reach your desk."
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "From startups to enterprises, our solutions grow with your business needs."
  }
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              About Us
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold mt-4 mb-6 text-balance"
            >
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Talenty Consulting
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-6 text-pretty"
            >
              Talenty Consulting is a recruitment and staffing partner focused on helping companies hire trained, job-ready employees. We simplify the hiring process through talent sourcing, screening, and consulting support tailored to modern business needs.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground leading-relaxed text-pretty"
            >
              Our mission is to bridge the gap between exceptional talent and forward-thinking companies, creating lasting partnerships that drive mutual growth and success.
            </motion.p>
          </motion.div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 5,
                  transition: { duration: 0.3 } 
                }}
                className="group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
