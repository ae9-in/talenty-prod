"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ChevronRight, Sparkles, UserCheck, ShieldCheck, Clock, ArrowUpRight, Cpu, Layers } from "lucide-react"

interface Candidate {
  id: string
  name: string
  role: string
  avatar: string
  matchScore: number
  stage: "Sourced" | "Screened" | "Interview Panel" | "Offer Ready"
  skills: string[]
  vettingMetric: string
  timeAgo: string
  details: {
    experience: string
    codeScore: string
    systemDesign: string
    cultureFit: string
    summary: string
  }
}

const ROLES = [
  { id: "backend", label: "Sr. Backend Architect", dept: "Engineering" },
  { id: "fullstack", label: "Full-Stack Lead", dept: "Product" },
  { id: "ml", label: "Staff ML Engineer", dept: "AI Platform" },
]

const CANDIDATES_BY_ROLE: Record<string, Candidate[]> = {
  backend: [
    {
      id: "c-1",
      name: "Aarav Mehta",
      role: "Distributed Systems & Go",
      avatar: "AM",
      matchScore: 96,
      stage: "Offer Ready",
      skills: ["Go", "Kubernetes", "Kafka", "gRPC"],
      vettingMetric: "Top 2% Vetting Score",
      timeAgo: "2h ago",
      details: {
        experience: "8+ Yrs at high-throughput Fintech",
        codeScore: "98/100 (Concurrency & Latency)",
        systemDesign: "Exemplary fault-tolerant design",
        cultureFit: "Excellent technical mentorship",
        summary: "Architected distributed queue processing 120k req/s. Zero false positives in automated background verification."
      }
    },
    {
      id: "c-2",
      name: "Siddharth Rao",
      role: "Cloud & Infrastructure Lead",
      avatar: "SR",
      matchScore: 92,
      stage: "Interview Panel",
      skills: ["AWS", "Terraform", "PostgreSQL", "Rust"],
      vettingMetric: "Panel 3/3 Approved",
      timeAgo: "4h ago",
      details: {
        experience: "7 Yrs scaling multitenant SaaS",
        codeScore: "94/100 (Infrastructure as Code)",
        systemDesign: "High availability across multi-region",
        cultureFit: "Clear async communicator",
        summary: "Led cloud migration cutting infra cost by 38%. Strong cross-functional alignment demonstrated in panel rounds."
      }
    },
    {
      id: "c-3",
      name: "Vikram Nambiar",
      role: "High-Scale Backend Dev",
      avatar: "VN",
      matchScore: 89,
      stage: "Screened",
      skills: ["Python", "FastAPI", "Redis", "Docker"],
      vettingMetric: "AI Screening: Fast-Track",
      timeAgo: "1d ago",
      details: {
        experience: "5 Yrs backend development",
        codeScore: "90/100 (Algorithms & API Design)",
        systemDesign: "Solid microservices architecture",
        cultureFit: "Self-driven and fast learner",
        summary: "Pre-screened through Talenty calibrated test. Strong async problem-solving speed."
      }
    }
  ],
  fullstack: [
    {
      id: "c-4",
      name: "Priya Sharma",
      role: "Lead Full-Stack Engineer",
      avatar: "PS",
      matchScore: 95,
      stage: "Offer Ready",
      skills: ["Next.js", "TypeScript", "Node.js", "GraphQL"],
      vettingMetric: "Tech Score 97/100",
      timeAgo: "1h ago",
      details: {
        experience: "6+ Yrs leading web applications",
        codeScore: "97/100 (Clean Architecture)",
        systemDesign: "Modern SSR & Edge caching mastery",
        cultureFit: "Product-minded collaborator",
        summary: "Built high-conversion B2B interfaces. Unanimously recommended by lead evaluators."
      }
    },
    {
      id: "c-5",
      name: "Rohan Varma",
      role: "Sr. React / Frontend Specialist",
      avatar: "RV",
      matchScore: 90,
      stage: "Interview Panel",
      skills: ["React 19", "Tailwind", "WebSockets", "Vite"],
      vettingMetric: "Panel Round 2 Scheduled",
      timeAgo: "3h ago",
      details: {
        experience: "5 Yrs frontend engineering",
        codeScore: "92/100 (State & Component Design)",
        systemDesign: "Micro-frontend and Design Systems",
        cultureFit: "High empathy and team player",
        summary: "Specialist in real-time UI dashboards. Verified portfolio and proven shipping record."
      }
    }
  ],
  ml: [
    {
      id: "c-6",
      name: "Dr. Ananya Sen",
      role: "Staff AI & LLM Systems",
      avatar: "AS",
      matchScore: 98,
      stage: "Offer Ready",
      skills: ["PyTorch", "vLLM", "CUDA", "LangChain"],
      vettingMetric: "PhD & 6+ Yrs ML Production",
      timeAgo: "Just now",
      details: {
        experience: "PhD + 6 Yrs scaling LLM inference",
        codeScore: "99/100 (Optimized CUDA Kernels)",
        systemDesign: "Ultra-low latency GPU pipelines",
        cultureFit: "Thought leader & mentor",
        summary: "Implemented custom quantization pipeline reducing model memory by 45% while preserving accuracy."
      }
    },
    {
      id: "c-7",
      name: "Karan Johar",
      role: "MLOps & Data Infra Lead",
      avatar: "KJ",
      matchScore: 91,
      stage: "Screened",
      skills: ["Ray", "Kubeflow", "Spark", "Triton"],
      vettingMetric: "AI Screening: Verified",
      timeAgo: "5h ago",
      details: {
        experience: "6 Yrs building data pipelines",
        codeScore: "91/100 (Data Engineering)",
        systemDesign: "Scalable automated model retraining",
        cultureFit: "Highly analytical and rigorous",
        summary: "Pre-screened against strict production ML criteria with verified hands-on evaluation."
      }
    }
  ]
}

const STAGES = ["Sourced", "Screened", "Interview Panel", "Offer Ready"] as const

export function PipelineWidget() {
  const [activeRole, setActiveRole] = useState("backend")
  const candidates = CANDIDATES_BY_ROLE[activeRole] || CANDIDATES_BY_ROLE["backend"]
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[0])

  // Change selected candidate when role changes
  const handleRoleChange = (roleId: string) => {
    setActiveRole(roleId)
    const list = CANDIDATES_BY_ROLE[roleId]
    if (list && list.length > 0) {
      setSelectedCandidate(list[0])
    }
  }

  return (
    <div className="relative w-full rounded-3xl border-2 border-[#0D2D42] bg-[#F7F2E4] p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(13,45,66,1)] overflow-hidden flex flex-col justify-between">
      {/* Background subtle noise & accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C18A18]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#0D2D42]/10">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C18A18] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C18A18]" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-[#0D2D42]">
                Talenty Live ATS
              </span>
              <span className="bg-[#C18A18] border border-[#0D2D42] px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider text-[#0D2D42]">
                Active Loop
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#3A5570]">
              Real-time sourcing & calibrated vetting
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-[#F0E9D5] p-1 rounded-2xl border border-[#0D2D42]/10 gap-1 overflow-x-auto scrollbar-none">
          {ROLES.map((role) => {
            const isActive = activeRole === role.id
            return (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[10.5px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#0D2D42] text-[#F7F2E4] shadow-xs"
                    : "text-[#3A5570] hover:text-[#0D2D42] hover:bg-[#F7F2E4]"
                }`}
              >
                {role.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Pipeline Stage Pills Bar */}
      <div className="grid grid-cols-4 gap-2 my-4">
        {STAGES.map((stage, idx) => {
          const count = idx === 0 ? 14 : idx === 1 ? 6 : idx === 2 ? 3 : 2
          const isLatest = idx === 3
          return (
            <div
              key={stage}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isLatest
                  ? "bg-[#C18A18]/15 border-[#C18A18]/40"
                  : "bg-[#F0E9D5]/60 border-[#0D2D42]/5"
              }`}
            >
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#3A5570] truncate">
                {stage}
              </div>
              <div className="font-serif font-bold text-sm sm:text-base text-[#0D2D42] mt-0.5">
                {count}
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Candidate Cards Section */}
      <div className="grid gap-3 my-2">
        {candidates.map((c) => {
          const isSelected = selectedCandidate.id === c.id
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCandidate(c)}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSelected
                  ? "border-[#0D2D42] bg-[#F7F2E4] shadow-[4px_4px_0px_0px_rgba(13,45,66,0.9)]"
                  : "border-[#0D2D42]/10 bg-[#F0E9D5]/40 hover:border-[#0D2D42]/30 hover:bg-[#F0E9D5]/80"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0D2D42] text-[#F7E9A7] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                  {c.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#0D2D42] truncate">
                      {c.name}
                    </h4>
                    <span className="bg-[#C18A18]/15 text-[#0D2D42] font-mono text-[9.5px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0">
                      {c.stage}
                    </span>
                  </div>
                  <p className="text-xs text-[#3A5570] truncate mt-0.5">
                    {c.role}
                  </p>
                </div>
              </div>

              {/* Badges & Metrics */}
              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                <div className="flex gap-1.5 flex-wrap">
                  {c.skills.slice(0, 2).map((sk) => (
                    <span
                      key={sk}
                      className="font-mono text-[9px] bg-[#F0E9D5] border border-[#0D2D42]/10 px-2 py-0.5 rounded-md text-[#3A5570]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center bg-[#C18A18] text-[#0D2D42] font-mono font-bold text-xs px-2.5 py-1 rounded-xl border border-[#0D2D42]">
                  <span>{c.matchScore}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Candidate Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCandidate.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-3 p-4 rounded-2xl bg-[#0D2D42] text-[#F7F2E4] border border-[#C18A18]/30 shadow-md"
        >
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C18A18]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#F7E9A7] font-bold">
                Calibrated Vetting Breakdown
              </span>
            </div>
            <span className="font-mono text-[9.5px] text-[#F7F2E4]/60 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {selectedCandidate.timeAgo}
            </span>
          </div>

          <p className="text-xs text-[#F7F2E4]/90 leading-relaxed mb-3">
            {selectedCandidate.details.summary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-[10px]">
            <div>
              <span className="text-[#F7F2E4]/50 block">Code / Tech:</span>
              <span className="text-[#F7F2E4] font-medium">{selectedCandidate.details.codeScore}</span>
            </div>
            <div>
              <span className="text-[#F7F2E4]/50 block">Experience:</span>
              <span className="text-[#F7F2E4] font-medium">{selectedCandidate.details.experience}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center sm:justify-end">
              <span className="inline-flex items-center gap-1 text-[#F7E9A7] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C18A18]" />
                Verified Fit
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
