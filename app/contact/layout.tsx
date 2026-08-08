import type { Metadata } from "next"

import { BreadcrumbSchema } from "@/components/landing/json-ld"

const title = "Book a Recruitment Consultation"
const description =
  "Share your hiring requirements with Talenty Consulting. Get expert recruitment consulting, staffing support, and trained employee solutions. Based in Bengaluru, serving India."
const url = "https://www.talentyconsulting.in/contact"

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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbPaths = [
    { name: "Home", url: "https://www.talentyconsulting.in" },
    { name: "Contact Us", url: "https://www.talentyconsulting.in/contact" }
  ]

  return (
    <>
      <BreadcrumbSchema paths={breadcrumbPaths} />
      {children}
    </>
  )
}
