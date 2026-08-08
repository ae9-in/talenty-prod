import type { Metadata } from "next"
import Link from "next/link"
import { BlogArticle, blogMetadata } from "@/components/seo/blog-article"
import { VERIFIED_FACTS } from "@/lib/seo"

const slug = "how-long-to-hire-trained-employee-india"
const title = "How Long Does It Take to Hire a Trained Employee in India?"
const description =
  "Realistic timelines for trained employee placement in India: fast-path 3–10 business days vs custom pipelines. From Talenty Consulting."

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
        When companies ask how long{" "}
        <Link href="/trained-employee-placement" className="text-primary hover:underline">
          trained employee placement
        </Link>{" "}
        takes in India, the honest answer is: it depends on whether you need a pre-screened fast path or
        a custom train-and-vet cycle.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Fast-path timeline</h2>
      <p>
        For critical or pre-screened staffing requirements, Talenty Consulting can place candidates in as
        little as <strong className="text-foreground">{VERIFIED_FACTS.fastHireBusinessDays} business days</strong>{" "}
        without skipping multi-stage screening.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">Custom pipeline timeline</h2>
      <p>
        When the role needs bespoke upskilling against your tools and SOPs, expect a longer setup-to-placement
        cycle. The stages remain the same — source, train,{" "}
        <Link href="/talent-screening-process" className="text-primary hover:underline">
          vet
        </Link>
        , place — then {VERIFIED_FACTS.supportWindowDays}-day support.
      </p>
      <h2 className="mt-10 text-2xl font-bold text-foreground">What slows hiring down</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Unclear role definitions and shifting must-have skills</li>
        <li>Interview loops with no decision owner</li>
        <li>Starting from unfiltered job-portal volume instead of a shortlist</li>
      </ul>
      <p>
        Compare models in{" "}
        <Link href="/blog/job-ready-hires-vs-job-portal-resumes" className="text-primary hover:underline">
          job-ready vs job-portal
        </Link>{" "}
        and book a consult via{" "}
        <Link href="/contact" className="text-primary hover:underline">
          contact
        </Link>
        .
      </p>
    </BlogArticle>
  )
}
