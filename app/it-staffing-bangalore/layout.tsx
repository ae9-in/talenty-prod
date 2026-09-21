import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

const title = "IT Staffing & Tech Recruitment Agency in Bangalore | Talenty"
const description =
  "Hire Java, Python, React, DevOps and full-stack developers in Bangalore through Talenty's contract and permanent IT staffing services."
const url = "https://www.talentyconsulting.in/it-staffing-bangalore"

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Talenty Consulting",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IT Staffing Bangalore — Talenty Consulting",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
}

export default function ItStaffingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: "https://www.talentyconsulting.in" },
          { name: "IT Staffing", url: "https://www.talentyconsulting.in/it-staffing-bangalore" },
        ]}
      />
      <PageServiceSchema
        name="IT Staffing & Tech Recruitment Agency in Bangalore"
        description="Hire Java, Python, React, DevOps and full-stack developers in Bangalore through Talenty's contract and permanent IT staffing services."
        url="https://www.talentyconsulting.in/it-staffing-bangalore"
      />
      {children}
    </>
  )
}
