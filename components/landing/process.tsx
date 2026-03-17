"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FileSearch, Users, ClipboardList, CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Understand Requirements",
    description: "We begin by deeply understanding your business needs, culture, and the specific skills required for success.",
    color: "from-violet-500 to-purple-600"
  },
  {
    number: "02",
    icon: Users,
    title: "Source & Train Talent",
    description: "Our team sources candidates from diverse channels and provides targeted training to match your requirements.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Screen & Shortlist",
    description: "Rigorous multi-stage screening ensures only the most qualified candidates are presented to you.",
    color: "from-cyan-500 to-blue-600"
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Deliver the Right Hire",
    description: "We facilitate smooth onboarding and provide continued support to ensure long-term success.",
    color: "from-emerald-500 to-teal-600"
  }
]

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-6 text-balance">
            How{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              We Work
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            A proven four-step approach that ensures you get the right talent, every time.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector dot - Desktop */}
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2rem)]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    className="relative"
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${step.color}`} />
                    <div className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${step.color} animate-ping opacity-50`} />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/40">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Step Number */}
                    <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 absolute top-4 right-4`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.5 }}
                      className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-accent/50 origin-top"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
