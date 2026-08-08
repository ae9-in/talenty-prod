import type { Metadata } from "next"

const title = "Trained Employee Placement Services"
const description =
  "Hire pre-trained, job-ready employees tailored to your workflows. Talenty Consulting minimizes onboarding and upskilling delays with vetted staff solutions."
const url = "https://www.talentyconsulting.in/trained-employee-placement"

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

export default function TrainedPlacementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
