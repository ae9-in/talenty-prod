import type { Metadata } from "next"

const title = "IT Staffing & Tech Recruitment Agency in Bengaluru"
const description =
  "Accelerate your tech team scaling. Talenty Consulting provides specialized IT staffing and tech recruitment in Bengaluru for developers, QA, and PMs."
const url = "https://www.talentyconsulting.in/it-staffing-bangalore"

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

export default function ItStaffingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
