import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"

const slug = "startup-hiring-playbook-trained-vs-inhouse"
const title = "Startup Hiring Playbook: Trained Placement vs In-House Recruiting"
const description =
  "When Bengaluru startups should use trained employee placement versus building in-house recruiting — a practical playbook from Talenty Consulting."

export const metadata: Metadata = blogMetadata({ title, description, slug })

export default function Page() {
  return (
    <BlogArticle
      slug={slug}
      title={title}
      description={description}
      datePublished="2026-08-08"
      dateLabel="August 08, 2026"
      readTime="7 min read"
      clusterLabel="Trained Employee Placement"
      hubHref="/trained-employee-placement"
      hubLabel="trained employee placement"
    >
      <p className="text-lg font-medium text-foreground">
        Bengaluru startups often choose between hiring themselves, posting on job portals, engaging a{" "}
        <Link href="/recruitment-consulting-bangalore" className="text-primary hover:underline">
          recruitment consulting
        </Link>{" "}
        partner, or using{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained employee placement
        </Link>
        . This playbook clarifies when each path fits.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Use in-house recruiting when</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>You already have an experienced recruiter and strong employer brand</li>
        <li>Roles are highly specialized and judgment-heavy</li>
        <li>Volume is low and interview capacity is high</li>
      </ul>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Use trained placement when</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>You need job-ready contributors faster than you can train internally</li>
        <li>Portal volume is high but signal is low</li>
        <li>You want multi-stage{" "}
          <Link href="/talent-screening-process" className="text-primary hover:underline">
            screening
          </Link>{" "}
          plus 90-day support baked in</li>
      </ul>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Use traditional consulting / IT staffing when</h2>
      <p>
        You need market mapping, senior search, or{" "}
        <Link href="/it-staffing-bangalore" className="text-primary hover:underline">
          IT staffing
        </Link>{" "}
        without a full train-before-place cycle — see also our{" "}
        <Link href="/blog/how-to-choose-hiring-agency-bangalore" className="text-primary hover:underline">
          hiring agency checklist
        </Link>
        .
      </p>
    </BlogArticle>
  )
}
