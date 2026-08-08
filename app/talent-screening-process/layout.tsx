import type { Metadata } from "next"

const title = "Candidate Screening & Talent Vetting Process"
const description =
  "Learn how Talenty Consulting screens candidates. Our rigorous vetting includes cognitive, coding, and behavioral evaluations for high retention staffing."
const url = "https://www.talentyconsulting.in/talent-screening-process"

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

export default function VettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
