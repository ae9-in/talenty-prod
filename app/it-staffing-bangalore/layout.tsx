import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

export const metadata: Metadata = {
  title: "IT Staffing & Tech Recruitment Agency in Bangalore | Talenty",
  description: "Hire Java, Python, React, DevOps and full-stack developers in Bangalore through Talenty's contract and permanent IT staffing services.",
  alternates: {
    canonical: "https://www.talentyconsulting.in/it-staffing-bangalore",
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
