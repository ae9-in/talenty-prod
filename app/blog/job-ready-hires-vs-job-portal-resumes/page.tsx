import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"

const slug = "job-ready-hires-vs-job-portal-resumes"
const title = "Job-Ready Hires vs Job-Portal Resumes: What's the Real Difference"
const description =
  "Compare job-ready trained hires with job-portal resume volume. Why Talenty Consulting optimizes for demonstrated skill before shortlist."

export const metadata: Metadata = blogMetadata({ title, description, slug })

const faqs = [
  {
    question: "Is a job portal ever the right starting point?",
    answer:
      "Portals can help with volume awareness, but they rarely deliver job-ready shortlists alone. Most teams still need structured screening or a trained-placement partner.",
  },
]

export default function Page() {
  return (
    <BlogArticle
      slug={slug}
      title={title}
      description={description}
      datePublished="2026-08-08"
      dateLabel="August 08, 2026"
      readTime="6 min read"
      clusterLabel="Trained Employee Placement"
      hubHref="/trained-employee-placement"
      hubLabel="trained employee placement"
      faqs={faqs}
    >
      <p className="text-lg font-medium text-foreground">
        If you are evaluating{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained employee placement
        </Link>
        , the real comparison is not “agency vs portal” — it is{" "}
        <strong className="text-foreground">job-ready signal</strong> versus{" "}
        <strong className="text-foreground">resume volume</strong>.
      </p>
      <p>
        Job portals optimize for applicant count. A hiring manager receives dozens of CVs that look
        similar on paper. Screening then happens inside your company — after you have already spent
        calendar time on interviews that should have been filtered earlier.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">What “job-ready” actually means</h2>
      <p>
        Job-ready means the candidate has been sourced for the role, trained on relevant skills where
        needed, and passed multi-stage{" "}
        <Link href="/talent-screening-process" className="text-primary hover:underline">
          talent screening
        </Link>{" "}
        before you see the profile. That is the opposite of “qualified on LinkedIn.”
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Side-by-side</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-foreground">Portal:</strong> high volume, low prior verification,
          employer owns almost all risk.
        </li>
        <li>
          <strong className="text-foreground">Job-ready placement:</strong> shortlist after source →
          train → vet → place → 90-day support.
        </li>
      </ul>
      <p>
        For Bengaluru startups and SMEs that cannot absorb long onboarding runways, job-ready hiring
        usually wins on time-to-productivity — even when traditional{" "}
        <Link href="/recruitment-consulting-bangalore" className="text-primary hover:underline">
          recruitment consulting
        </Link>{" "}
        remains better for senior judgment-heavy searches.
      </p>
      <p>
        Continue with{" "}
        <Link href="/blog/what-is-trained-employee-placement" className="text-primary hover:underline">
          what trained employee placement is
        </Link>{" "}
        or{" "}
        <Link href="/blog/how-long-to-hire-trained-employee-india" className="text-primary hover:underline">
          how long hiring trained employees takes in India
        </Link>
        .
      </p>
    </BlogArticle>
  )
}
