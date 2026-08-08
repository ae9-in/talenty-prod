import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"

const slug = "cognitive-skill-behavioral-screening-explained"
const title = "Cognitive, Skill & Behavioral Screening: How It Works"
const description =
  "How Talenty Consulting’s multi-stage candidate screening works: cognitive, skill, and behavioral evaluation before shortlist."

export const metadata: Metadata = blogMetadata({ title, description, slug })

export default function Page() {
  return (
    <BlogArticle
      slug={slug}
      title={title}
      description={description}
      datePublished="2026-08-08"
      dateLabel="August 08, 2026"
      readTime="6 min read"
      clusterLabel="Talent Screening"
      hubHref="/talent-screening-process"
      hubLabel="talent screening process"
    >
      <p className="text-lg font-medium text-foreground">
        Multi-stage{" "}
        <Link href="/talent-screening-process" className="text-primary hover:underline">
          talent screening
        </Link>{" "}
        is how Talenty Consulting turns applicants into shortlists — cognitive ability, role skill, and
        behavioral fit before a client interview.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Three evaluation layers</h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          <strong className="text-foreground">Cognitive:</strong> reasoning and problem-solving under
          structured tests
        </li>
        <li>
          <strong className="text-foreground">Skill:</strong> coding or domain tasks that mirror the job
        </li>
        <li>
          <strong className="text-foreground">Behavioral:</strong> communication, adaptability, and
          collaboration
        </li>
      </ol>
      <p>
        This gate sits behind{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained placement
        </Link>{" "}
        and{" "}
        <Link href="/it-staffing-bangalore" className="text-primary hover:underline">
          IT staffing
        </Link>
        . See the full stage list on the hub page.
      </p>
    </BlogArticle>
  )
}
