export const SITE_URL = "https://www.talentyconsulting.in"
export const SITE_NAME = "Talenty Consulting"
export const SITE_PHONE = "+91-8431119696"
export const SITE_EMAIL = "connect@talentyconsulting.in"
export const SITE_STREET = "Bhive Platinum, Church Street"
export const SITE_CITY = "Bengaluru"
export const SITE_REGION = "Karnataka"
export const SITE_POSTAL = "560001"
export const SITE_COUNTRY = "IN"
export const SITE_ADDRESS = `${SITE_STREET}, ${SITE_CITY}, ${SITE_REGION} ${SITE_POSTAL}`
export const LINKEDIN_URL = "https://www.linkedin.com/company/talenty-consulting"
export const SITE_HOURS_LABEL = "Mon – Sat, 9:00 AM – 6:00 PM"
export const SITE_HOURS_SCHEMA = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "18:00",
} as const

/** Set NEXT_PUBLIC_FOUNDING_YEAR only when verified — omitted from schema while unset [HOLD] */
export const FOUNDING_YEAR = process.env.NEXT_PUBLIC_FOUNDING_YEAR?.trim() || ""

/** Set NEXT_PUBLIC_GBP_URL to the verified Google Business Profile / Maps place URL */
export const GBP_URL = process.env.NEXT_PUBLIC_GBP_URL?.trim() || ""

export const DEFAULT_DESCRIPTION =
  "Talenty Consulting helps Bengaluru companies hire trained, job-ready employees fast. Recruitment consulting, talent screening & staffing — book your free consultation today."

/** Facts already published on-site — safe for content & schema */
export const VERIFIED_FACTS = {
  supportWindowDays: 90,
  fastHireBusinessDays: "3 to 10",
  industries: [
    "IT & Software",
    "BFSI",
    "Healthcare",
    "Manufacturing",
    "Retail",
    "Education",
    "Hospitality",
  ] as const,
  processSteps: ["Source", "Train", "Vet", "Place", "Support"] as const,
}

export const CITATION_DIRECTORIES = [
  { name: "Justdial", url: "https://www.justdial.com/" },
  { name: "Sulekha", url: "https://www.sulekha.com/" },
  { name: "IndiaMART", url: "https://www.indiamart.com/" },
  { name: "Clutch", url: "https://clutch.co/" },
  { name: "GoodFirms", url: "https://www.goodfirms.co/" },
  { name: "LinkedIn Company", url: LINKEDIN_URL },
] as const

export const NAP_FOR_CITATIONS = {
  name: SITE_NAME,
  street: SITE_STREET,
  city: SITE_CITY,
  region: SITE_REGION,
  postal: SITE_POSTAL,
  country: "India",
  phone: SITE_PHONE,
  email: SITE_EMAIL,
  website: SITE_URL,
  hours: SITE_HOURS_LABEL,
} as const

export const PRIMARY_KEYWORDS = [
  { keyword: "talenty consulting", url: "/", intent: "brand" },
  { keyword: "talenty consulting bangalore", url: "/about", intent: "brand-local" },
  { keyword: "recruitment consulting bangalore", url: "/recruitment-consulting-bangalore", intent: "commercial" },
  { keyword: "staffing agency bangalore", url: "/recruitment-consulting-bangalore", intent: "commercial" },
  { keyword: "hiring agency bangalore", url: "/recruitment-consulting-bangalore", intent: "commercial" },
  { keyword: "IT staffing bangalore", url: "/it-staffing-bangalore", intent: "commercial" },
  { keyword: "trained employee placement", url: "/trained-employee-placement", intent: "differentiator" },
  { keyword: "hire trained employees india", url: "/trained-employee-placement", intent: "differentiator" },
  { keyword: "talent screening process", url: "/talent-screening-process", intent: "process" },
  { keyword: "best hiring agency bangalore", url: "/blog/how-to-choose-hiring-agency-bangalore", intent: "comparison" },
] as const

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function organizationSameAs(): string[] {
  const links = [LINKEDIN_URL]
  if (GBP_URL) links.push(GBP_URL)
  return links
}
