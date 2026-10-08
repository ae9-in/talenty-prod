import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/landing/json-ld"

const title = "Talenty Consulting Blog — Sourcing, Training & Staffing Insights"
const description =
  "Stay ahead of recruitment trends in India. Read expert guides on hiring workflows, pre-trained employee placements, and tech staffing in Bengaluru."
const url = "https://www.talentyconsulting.in/blog"

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
        alt: "Talenty Consulting Blog — HR & Recruitment Insights",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: "https://www.talentyconsulting.in" },
          { name: "Blog", url: "https://www.talentyconsulting.in/blog" },
        ]}
      />
      {children}
    </>
  )
}
