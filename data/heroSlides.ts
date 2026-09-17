export interface CandidateMiniCard {
  initials: string
  avatarBg: string
  avatarText: string
  name: string
  role: string
  city: string
  timeInStage: string
  tag?: string
  tagType?: "training" | "match" | "standard"
}

export interface ReqColumn {
  label: string
  count: number
  candidates: CandidateMiniCard[]
}

export interface HeroSlide {
  id: string
  pillar: string
  headlineLine1: string
  headlineAccent: string
  headlineLine2: string
  subcopy: string
  backgroundImage: string
  req: {
    seniority: string
    role: string
    reqNumber: string
    candidateCount: number
    columns: ReqColumn[]
  }
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-speed",
    pillar: "Speed & Velocity",
    headlineLine1: "Hire the",
    headlineAccent: "impossible.",
    headlineLine2: "Faster than ever.",
    subcopy:
      "The recruitment consulting and placement system built for business teams that move. Calibrated technical vetting, production-ready talent screening, and direct candidate evaluation.",
    backgroundImage: "/images/hero-slide-1.jpg",
    req: {
      seniority: "SR.",
      role: "DISTRIBUTED SYSTEMS LEAD",
      reqNumber: "4089",
      candidateCount: 14,
      columns: [
        {
          label: "SOURCED",
          count: 5,
          candidates: [
            {
              initials: "AM",
              avatarBg: "bg-[#101F45]",
              avatarText: "text-[#FFFFFF]",
              name: "Aarav Mehta",
              role: "Go / Kubernetes",
              city: "Bengaluru",
              timeInStage: "2h ago",
            },
            {
              initials: "VN",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Vikram Nambiar",
              role: "Kafka / Redis",
              city: "Hyderabad",
              timeInStage: "4h ago",
            },
          ],
        },
        {
          label: "SCREENING",
          count: 4,
          candidates: [
            {
              initials: "SR",
              avatarBg: "bg-[#3358B8]",
              avatarText: "text-[#FFFFFF]",
              name: "Siddharth Rao",
              role: "Postgres / AWS",
              city: "Pune",
              timeInStage: "1d ago",
            },
            {
              initials: "TK",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Tarun Kapoor",
              role: "Rust / Microservices",
              city: "Chennai",
              timeInStage: "2d ago",
            },
          ],
        },
        {
          label: "INTERVIEW",
          count: 3,
          candidates: [
            {
              initials: "NM",
              avatarBg: "bg-[#101F45]",
              avatarText: "text-[#FFFFFF]",
              name: "Nikhil Menon",
              role: "System Architecture",
              city: "Kochi",
              timeInStage: "3d ago",
            },
          ],
        },
        {
          label: "OFFER",
          count: 2,
          candidates: [
            {
              initials: "PS",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Priya Sharma",
              role: "Lead Concurrency",
              city: "Bengaluru",
              timeInStage: "Just now",
            },
          ],
        },
      ],
    },
  },
  {
    id: "slide-training",
    pillar: "Trained Placement",
    headlineLine1: "Not just sourced.",
    headlineAccent: "Trained.",
    headlineLine2: "Ready on day one.",
    subcopy:
      "Deploy pre-screened engineers and domain specialists upskilled directly for your production stack. Hands-on practical bootcamps eliminate ramp-up lag and ensure immediate output.",
    backgroundImage: "/images/hero-slide-2.jpg",
    req: {
      seniority: "MID-SR.",
      role: "FULL-STACK CLOUD ASSOCIATE",
      reqNumber: "4092",
      candidateCount: 9,
      columns: [
        {
          label: "SOURCED",
          count: 3,
          candidates: [
            {
              initials: "RD",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Rohan Deshmukh",
              role: "Next.js / Node",
              city: "Pune",
              timeInStage: "In training",
              tag: "In training",
              tagType: "training",
            },
            {
              initials: "AG",
              avatarBg: "bg-[#101F45]",
              avatarText: "text-[#FFFFFF]",
              name: "Ananya Gupta",
              role: "TypeScript / Cloud",
              city: "Noida",
              timeInStage: "In training",
              tag: "In training",
              tagType: "training",
            },
          ],
        },
        {
          label: "SCREENING",
          count: 3,
          candidates: [
            {
              initials: "KM",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Karan Mathur",
              role: "AWS Serverless",
              city: "Bengaluru",
              timeInStage: "Lab Certified",
              tag: "Calibrated",
              tagType: "training",
            },
          ],
        },
        {
          label: "INTERVIEW",
          count: 2,
          candidates: [
            {
              initials: "VJ",
              avatarBg: "bg-[#3358B8]",
              avatarText: "text-[#FFFFFF]",
              name: "Varun Joshi",
              role: "React & Microservices",
              city: "Hyderabad",
              timeInStage: "Passed 4/4",
            },
          ],
        },
        {
          label: "OFFER",
          count: 1,
          candidates: [
            {
              initials: "SB",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Shreya Balan",
              role: "Full-Stack Engineer",
              city: "Kochi",
              timeInStage: "Day 1 Ready",
            },
          ],
        },
      ],
    },
  },
  {
    id: "slide-pan-india",
    pillar: "Pan-India Reach",
    headlineLine1: "One team.",
    headlineAccent: "Every city.",
    headlineLine2: "All of India.",
    subcopy:
      "Anchored by our Bengaluru headquarters and Kochi operations with high-velocity sourcing across Hyderabad, Chennai, Pune, Mumbai, Gurugram, and Noida. We discover top 1% talent nationwide.",
    backgroundImage: "/images/hero-slide-3.jpg",
    req: {
      seniority: "LEAD",
      role: "DEVOPS & INFRA ARCHITECT",
      reqNumber: "4105",
      candidateCount: 12,
      columns: [
        {
          label: "SOURCED",
          count: 4,
          candidates: [
            {
              initials: "AK",
              avatarBg: "bg-[#101F45]",
              avatarText: "text-[#FFFFFF]",
              name: "Aditya Kumar",
              role: "Terraform / AWS",
              city: "Gurugram",
              timeInStage: "3h ago",
            },
            {
              initials: "DS",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Deepak Somani",
              role: "Kubernetes / CI/CD",
              city: "Jaipur",
              timeInStage: "5h ago",
            },
          ],
        },
        {
          label: "SCREENING",
          count: 3,
          candidates: [
            {
              initials: "RN",
              avatarBg: "bg-[#3358B8]",
              avatarText: "text-[#FFFFFF]",
              name: "Ritu Nair",
              role: "Observability / GCP",
              city: "Kochi",
              timeInStage: "1d ago",
            },
          ],
        },
        {
          label: "INTERVIEW",
          count: 3,
          candidates: [
            {
              initials: "MP",
              avatarBg: "bg-[#3358B8]",
              avatarText: "text-[#FFFFFF]",
              name: "Manish Pillai",
              role: "Multi-Cloud SRE",
              city: "Chennai",
              timeInStage: "2d ago",
            },
          ],
        },
        {
          label: "OFFER",
          count: 2,
          candidates: [
            {
              initials: "SB",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Sameer Bhat",
              role: "Lead Platform Engineer",
              city: "Bengaluru",
              timeInStage: "Accepted",
            },
          ],
        },
      ],
    },
  },
  {
    id: "slide-matching",
    pillar: "Explainable Matching",
    headlineLine1: "Know exactly",
    headlineAccent: "why",
    headlineLine2: "they're the right fit.",
    subcopy:
      "Talenty Consulting evaluates every candidate against role-calibrated benchmarks — multi-signal, transparent, and reviewed by people. No black boxes, no guesswork.",
    backgroundImage: "/images/hero-slide-4.jpg",
    req: {
      seniority: "STAFF",
      role: "AI & ML RESEARCHER",
      reqNumber: "4118",
      candidateCount: 8,
      columns: [
        {
          label: "SOURCED",
          count: 3,
          candidates: [
            {
              initials: "AS",
              avatarBg: "bg-[#101F45]",
              avatarText: "text-[#FFFFFF]",
              name: "Dr. Ananya Sen",
              role: "PyTorch / CUDA",
              city: "Bengaluru",
              timeInStage: "98% Match",
              tag: "98% Match",
              tagType: "match",
            },
          ],
        },
        {
          label: "SCREENING",
          count: 2,
          candidates: [
            {
              initials: "KJ",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Karan Johar",
              role: "LLM Serving & Triton",
              city: "Hyderabad",
              timeInStage: "95% Match",
              tag: "95% Match",
              tagType: "match",
            },
          ],
        },
        {
          label: "INTERVIEW",
          count: 2,
          candidates: [
            {
              initials: "RP",
              avatarBg: "bg-[#3358B8]",
              avatarText: "text-[#FFFFFF]",
              name: "Rishi Parikh",
              role: "Quantization / Ray",
              city: "Mumbai",
              timeInStage: "94% Match",
              tag: "94% Match",
              tagType: "match",
            },
          ],
        },
        {
          label: "OFFER",
          count: 1,
          candidates: [
            {
              initials: "VL",
              avatarBg: "bg-[#1D3F91]",
              avatarText: "text-[#FFFFFF]",
              name: "Vidya Lakshmi",
              role: "Staff AI Systems",
              city: "Bengaluru",
              timeInStage: "99% Match",
              tag: "99% Match",
              tagType: "match",
            },
          ],
        },
      ],
    },
  },
]
