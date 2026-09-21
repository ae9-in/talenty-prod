import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

const title = "Recruitment Consulting Services in Bangalore | Talenty Consulting"
const description =
  "End-to-end recruitment consulting for startups and SMEs in Bangalore — hiring strategy, RPO, and bulk hiring support from Talenty Consulting."
const url = "https://www.talentyconsulting.in/recruitment-consulting-bangalore"

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
        alt: "Recruitment Consulting Bangalore — Talenty Consulting",
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

export default function RecruitmentConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: "https://www.talentyconsulting.in" },
          { name: "Recruitment Consulting", url: "https://www.talentyconsulting.in/recruitment-consulting-bangalore" },
        ]}
      />
      <PageServiceSchema
        name="Recruitment Consulting Services in Bangalore"
        description="End-to-end recruitment consulting for startups and SMEs in Bangalore — hiring strategy, RPO, and bulk hiring support from Talenty Consulting."
        url="https://www.talentyconsulting.in/recruitment-consulting-bangalore"
      />
      {children}
    </>
  )
}
