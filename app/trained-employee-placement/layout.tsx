import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

export const metadata: Metadata = {
  title: "Trained, Job-Ready Employee Placement in Bangalore | Talenty",
  description: "Talenty places pre-trained, job-ready candidates who need less onboarding time — trained employee placement for companies across India.",
  alternates: {
    canonical: "https://www.talentyconsulting.in/trained-employee-placement",
  },
}

export default function TrainedEmployeePlacementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: "https://www.talentyconsulting.in" },
          { name: "Trained Employee Placement", url: "https://www.talentyconsulting.in/trained-employee-placement" },
        ]}
      />
      <PageServiceSchema
        name="Trained, Job-Ready Employee Placement in Bangalore"
        description="Talenty places pre-trained, job-ready candidates who need less onboarding time — trained employee placement for companies across India."
        url="https://www.talentyconsulting.in/trained-employee-placement"
      />
      {children}
    </>
  )
}
