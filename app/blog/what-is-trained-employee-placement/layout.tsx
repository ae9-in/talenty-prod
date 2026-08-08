import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/seo"

const title = "What Is Trained Employee Placement?"
const description =
  "Skip months of onboarding. Talenty Consulting places pre-trained, job-ready employees in Bengaluru & across India — vetted, trained, and supported for 90 days."
const url = `${SITE_URL}/blog/what-is-trained-employee-placement`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url,
    type: "article",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
