import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"
import { VERIFIED_FACTS } from "@/lib/seo"

const slug = "90-day-workforce-support-explained"
const title = "90-Day Workforce Support: What It Actually Covers"
const description =
  "What Talenty Consulting’s 90-day post-placement workforce support includes for employers and new hires."

export const metadata: Metadata = blogMetadata({ title, description, slug })

export default function Page() {
  return (
    <BlogArticle
      slug={slug}
      title={title}
      description={description}
      datePublished="2026-08-08"
      dateLabel="August 08, 2026"
      readTime="5 min read"
      clusterLabel="Trained Employee Placement"
      hubHref="/trained-employee-placement"
      hubLabel="trained employee placement"
    >
      <p className="text-lg font-medium text-foreground">
        Every{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained employee placement
        </Link>{" "}
        at Talenty Consulting includes a defined{" "}
        <strong className="text-foreground">{VERIFIED_FACTS.supportWindowDays}-day workforce support</strong>{" "}
        window after the hire starts — so early friction is resolved before it becomes attrition.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">What the window is for</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Check-ins with the new hire and hiring manager</li>
        <li>Clarifying role expectations and early performance signals</li>
        <li>Replacement support if the placement underperforms or exits early under engagement terms</li>
      </ul>
      <h2 className="mt-10 text-2xl font-bold text-foreground">What it is not</h2>
      <p>
        It is not a substitute for your managers, and it does not invent guaranteed retention percentages.
        It is structured follow-through after{" "}
        <Link href="/talent-screening-process" className="text-primary hover:underline">
          screening
        </Link>{" "}
        and placement.
      </p>
      <p>
        See how support sits at the end of the{" "}
        <Link href="/blog/what-is-trained-employee-placement" className="text-primary hover:underline">
          trained placement process
        </Link>{" "}
        and{" "}
        <Link href="/contact" className="text-primary hover:underline">
          book a consultation
        </Link>{" "}
        to discuss your role.
      </p>
    </BlogArticle>
  )
}
