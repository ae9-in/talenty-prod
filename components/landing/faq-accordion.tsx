"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface QAItem {
  id: number
  q: string
  a: string
  ctx: string
}

const FAQS: QAItem[] = [
  {
    id: 1,
    q: "What is recruitment consulting and how does Talenty help?",
    a: "Recruitment consulting is a strategic partnership where experts guide organizations in talent acquisition, employer branding, and optimization of hiring processes. Talenty Consulting helps businesses structure their staffing workflows to attract and hire the best fits.",
    ctx: "CONSULTING & STRATEGY"
  },
  {
    id: 2,
    q: "Do you provide trained employees or only recruitment?",
    a: "We offer both! Our core differentiator is Trained Employee Placement, where we source candidates and upskill them in specific tech, domain, or operational skills prior to deployment, ensuring day-one productivity.",
    ctx: "TRAINED PLACEMENT"
  },
  {
    id: 3,
    q: "How quickly can you fill an urgent role?",
    a: "For critical or pre-screened staffing requirements, we offer Fast Hiring Solutions that can place candidates in as little as 3 to 10 business days without compromising on candidate quality or cultural fit.",
    ctx: "FAST HIRING TIMELINES"
  },
  {
    id: 4,
    q: "What screening process do you use?",
    a: "We execute a rigorous multi-stage vetting process comprising cognitive aptitude tests, technical coding or domain assessments, HR behavioral rounds, and detailed background checks.",
    ctx: "TALENT VETTING PROCESS"
  },
  {
    id: 5,
    q: "What industries and locations do you serve?",
    a: "Our primary office is located on Church Street in Bengaluru (Bhive Platinum), but we provide recruitment consulting and trained employee placement services pan-India across IT & Software, BFSI, Healthcare, Retail, and Manufacturing.",
    ctx: "DOMAINS & PAN-INDIA"
  }
]

export function FAQAccordion() {
  const [activeId, setActiveId] = useState<number | null>(1)

  const activeCtx = FAQS.find(item => item.id === activeId)?.ctx ?? ""

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] items-start max-w-5xl mx-auto py-8">
      {/* Left side context (sticky on desktop) */}
      <div className="lg:sticky lg:top-24 space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#0D2D42]">
          Questions, <span className="text-[#C18A18] italic font-normal">answered.</span>
        </h2>
        <div className="hidden lg:block font-mono text-[11px] uppercase tracking-widest text-[#3A5570]">
          Active Category:
          <AnimatePresence mode="wait">
            <motion.span
              key={activeCtx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="block mt-2 text-[#0D2D42] font-bold text-xs"
            >
              · {activeCtx}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Right side accordion */}
      <div className="border-t border-[#0D2D42]/10 divide-y divide-[#0D2D42]/10">
        {FAQS.map((item) => {
          const isOpen = activeId === item.id
          return (
            <div key={item.id} className="py-5">
              <button
                onClick={() => setActiveId(isOpen ? null : item.id)}
                className="w-full text-left flex items-start justify-between gap-6 group cursor-pointer"
              >
                <div className="flex gap-4 items-baseline">
                  <span className="font-mono text-[11px] text-[#3A5570] tracking-wider">
                    0{item.id}
                  </span>
                  <span className="text-base md:text-lg font-serif font-bold text-[#0D2D42] group-hover:text-[#C18A18] transition-colors leading-snug">
                    {item.q}
                  </span>
                </div>
                <span 
                  className={`text-xl font-serif font-normal text-[#C18A18] transition-transform duration-300 select-none ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 pl-8 pr-12 text-[14px] leading-relaxed text-[#3A5570]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
