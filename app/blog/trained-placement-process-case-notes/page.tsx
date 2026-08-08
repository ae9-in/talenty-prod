import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"
import { VERIFIED_FACTS } from "@/lib/seo"

const slug = "trained-placement-process-case-notes"
const title = "Trained Placement Process Notes: A Proof Framework"
const description =
  "How Talenty Consulting documents trained placement outcomes using a verified process framework. Client-specific metrics added only when authorized."

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
      clusterLabel="Proof & Trust"
      hubHref="/trained-employee-placement"
      hubLabel="trained employee placement"
    >
      <p className="text-lg font-medium text-foreground">
        Ranking and conversion both need proof. Until a client authorizes named metrics, Talenty publishes
        a <strong className="text-foreground">process case framework</strong> — not invented percentages.
        This page is the template for anonymized case studies tied to{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained employee placement
        </Link>
        .
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Verified process used on every engagement</h2>
      <ol className="list-decimal space-y-2 pl-6">
        {VERIFIED_FACTS.processSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Fields we fill when a client approves</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Industry / company stage (anonymized)</li>
        <li>Role family (e.g. backend engineer, operations associate)</li>
        <li>Time from brief to shortlist (business days)</li>
        <li>Time from offer to start</li>
        <li>Notes from the {VERIFIED_FACTS.supportWindowDays}-day support window</li>
      </ul>
      <p>
        Screening detail lives on the{" "}
        <Link href="/talent-screening-process" className="text-primary hover:underline">
          talent screening process
        </Link>{" "}
        page. To contribute a real anonymized case,{" "}
        <Link href="/contact" className="text-primary hover:underline">
          contact us
        </Link>
        .
      </p>
      <aside className="mt-8 rounded-xl border border-border/40 bg-secondary/20 p-6 text-sm">
        <p className="font-semibold text-foreground">No fabricated outcomes</p>
        <p className="mt-2">
          This article intentionally omits fake logos, invented retention rates, and unnamed “Fortune”
          claims. When real metrics exist, they will replace this framework block.
        </p>
      </aside>
    </BlogArticle>
  )
}
