import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

const title = "Candidate Screening & Vetting Services in Bangalore | Talenty"
const description =
  "Multi-stage candidate screening and assessment — technical, cognitive and behavioural — before any candidate reaches your inbox."
const url = "https://www.talentyconsulting.in/talent-screening-process"

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
        alt: "Candidate Screening & Vetting — Talenty Consulting",
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

export default function TalentScreeningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: "https://www.talentyconsulting.in" },
          { name: "Talent Screening Process", url: "https://www.talentyconsulting.in/talent-screening-process" },
        ]}
      />
      <PageServiceSchema
        name="Candidate Screening & Vetting Services in Bangalore"
        description="Multi-stage candidate screening and assessment — technical, cognitive and behavioural — before any candidate reaches your inbox."
        url="https://www.talentyconsulting.in/talent-screening-process"
      />
      {children}
    </>
  )
}
