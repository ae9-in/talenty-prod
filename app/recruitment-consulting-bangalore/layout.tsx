import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

export const metadata: Metadata = {
  title: "Recruitment Consulting Services in Bangalore | Talenty Consulting",
  description: "End-to-end recruitment consulting for startups and SMEs in Bangalore — hiring strategy, RPO, and bulk hiring support from Talenty Consulting.",
  alternates: {
    canonical: "https://www.talentyconsulting.in/recruitment-consulting-bangalore",
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
