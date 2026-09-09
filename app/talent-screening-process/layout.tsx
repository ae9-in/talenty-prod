import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

export const metadata: Metadata = {
  title: "Candidate Screening & Vetting Services in Bangalore | Talenty",
  description: "Multi-stage candidate screening and assessment — technical, cognitive and behavioural — before any candidate reaches your inbox.",
  alternates: {
    canonical: "https://www.talentyconsulting.in/talent-screening-process",
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
