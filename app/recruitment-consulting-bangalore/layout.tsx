import type { Metadata } from "next"

const title = "Recruitment Consulting & Staffing Agency in Bengaluru"
const description =
  "Talenty Consulting is a premier B2B recruitment consulting and staffing agency in Bengaluru. We connect top companies with pre-vetted, job-ready talent."
const url = "https://www.talentyconsulting.in/recruitment-consulting-bangalore"

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

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
