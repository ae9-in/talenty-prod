import type { Metadata } from "next"

import { PersonSchema, BreadcrumbSchema } from "@/components/landing/json-ld"

const title = "About Talenty Consulting — Bengaluru's Staffing & Recruitment Partner"
const description =
  "Learn how Talenty Consulting bridges the gap between exceptional talent and forward-thinking companies. Bengaluru-based recruitment experts serving all industries across India."
const url = "https://www.talentyconsulting.in/about"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    siteName: "Talenty Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbPaths = [
    { name: "Home", url: "https://www.talentyconsulting.in" },
    { name: "About Us", url: "https://www.talentyconsulting.in/about" }
  ]

  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema paths={breadcrumbPaths} />
      {children}
    </>
  )
}
