/**
 * Offline SEO ops — Phase 1 entity + Phase 5 off-page execution checklist.
 * Exact NAP for every citation (copy/paste, never alter spelling).
 */
import { CITATION_DIRECTORIES, NAP_FOR_CITATIONS, SITE_HOURS_LABEL, SITE_NAME } from "@/lib/seo"

export const OFFPAGE_90_DAY_PLAN = [
  {
    weeks: "1–2",
    tasks: [
      `Claim/optimize Google Business Profile as exact name: ${SITE_NAME}`,
      `Set NAP to: ${NAP_FOR_CITATIONS.street}, ${NAP_FOR_CITATIONS.city}, ${NAP_FOR_CITATIONS.region} ${NAP_FOR_CITATIONS.postal}`,
      `Hours: ${SITE_HOURS_LABEL}`,
      "Categories: Employment Agency / Recruiter; services matching site pages",
      "Upload office/team photos; enable messaging",
      "Set NEXT_PUBLIC_GBP_URL in production env to the verified Maps/GBP URL",
      "Submit 10 citation listings with identical NAP (see CITATION_DIRECTORIES)",
    ],
  },
  {
    weeks: "3–4",
    tasks: [
      "Ask every placed client for a GBP review within 7 days of start",
      "Respond to all reviews within 48 hours",
      "Publish 2 GBP posts/week (hiring tip + service highlight)",
    ],
  },
  {
    weeks: "5–8",
    tasks: [
      "LinkedIn company + founder posts 2×/week",
      "2 outreach emails/week to HR blogs, startup communities, local chambers",
      "Ensure LinkedIn company URL matches schema sameAs",
    ],
  },
  {
    weeks: "9–12",
    tasks: [
      "Target 3 earned backlinks/month (directories, guest posts, partnerships)",
      "Re-audit NAP consistency across all citations",
      "Review GSC brand queries (talenty*, consultancy misspellings) and CTR",
    ],
  },
] as const

export const CITATION_NAP_CHECKLIST = {
  nap: NAP_FOR_CITATIONS,
  directories: CITATION_DIRECTORIES,
  rules: [
    "Never create misspelling doorway URLs (telendy, consultency, etc.)",
    "Official brand spelling is always Talenty Consulting",
    "foundingDate stays out of schema until NEXT_PUBLIC_FOUNDING_YEAR is set",
  ],
} as const

export const MONTHLY_SEO_SCORECARD = [
  "GSC: brand queries (talenty, talenty consulting, consultancy variants) — impressions/clicks/CTR",
  "GSC: commercial queries from PRIMARY_KEYWORDS — position + CTR",
  "GA4: organic → /contact generate_lead events",
  "GA4: phone_click and email_click counts",
  "Crawl check: one H1 per money page; no title/H1 cannibalization",
  "Sitemap lastmod freshness (dynamic sitemap already regenerates)",
  "Citation NAP spot-check (3 directories)",
] as const
