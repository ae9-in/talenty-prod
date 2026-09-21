import type { Metadata } from "next"
import { BreadcrumbSchema, PageServiceSchema } from "@/components/landing/json-ld"

const title = "Trained, Job-Ready Employee Placement in Bangalore | Talenty"
const description =
  "Talenty places pre-trained, job-ready candidates who need less onboarding time — trained employee placement for companies across India."
const url = "https://www.talentyconsulting.in/trained-employee-placement"

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
        alt: "Trained Employee Placement — Talenty Consulting",
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
