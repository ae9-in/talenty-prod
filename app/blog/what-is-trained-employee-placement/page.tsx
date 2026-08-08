import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Calendar, User, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SITE_URL } from "@/lib/seo"

const articleUrl = `${SITE_URL}/blog/what-is-trained-employee-placement`
const datePublished = "2026-08-07"

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "What Is Trained Employee Placement?",
  description:
    "Trained employee placement explained: how Talenty Consulting sources, trains, vets, and places job-ready employees in Bengaluru and across India.",
  datePublished,
  dateModified: datePublished,
  author: {
    "@type": "Organization",
    name: "Talenty Consulting",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Talenty Consulting",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: articleUrl,
  image: `${SITE_URL}/blog/what-is-trained-employee-placement/opengraph-image`,
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'Is "Talenty Consulting" the same as "Talenty Consultancy"?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Talenty Consulting is the correct and official brand name. You may see it searched or referred to informally as Talenty Consultancy or Talenty Consultancy Bangalore; all of these refer to the same Bengaluru-based recruitment consulting and trained-placement firm.",
      },
    },
    {
      "@type": "Question",
      name: "How is trained employee placement different from hire-train-deploy (HTD)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They describe the same underlying model. Hire-train-deploy is more common in large enterprise and IT services contexts; Talenty Consulting applies the same source-train-vet-place-support structure at a scale that works for startups and SMEs.",
      },
    },
    {
      "@type": "Question",
      name: "Does trained placement cost more than traditional recruitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing depends on the service model, role level, and hiring volume. Talenty Consulting provides a custom proposal after reviewing your requirements — contact connect@talentyconsulting.in or book a consultation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the trained employee placement process typically take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For critical or pre-screened staffing requirements, Talenty Consulting can place candidates in as little as 3 to 10 business days. Custom role pipelines may take longer depending on training and vetting needs.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries does Talenty Consulting work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Talenty Consulting supports hiring across IT and Software, BFSI, Healthcare, Manufacturing, Retail, Education, and Hospitality.",
      },
    },
  ],
}

export default function WhatIsTrainedEmployeePlacementPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0">
          <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute left-1/4 top-1/2 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-15" />
        </div>

        <div className="container relative z-10 mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          <header className="mb-12 space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Trained Employee Placement
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl">
              What Is Trained Employee Placement?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A clear definition of the hiring model Talenty Consulting uses to place{" "}
              <Link href="/trained-employee-placement" className="text-primary hover:underline">
                pre-trained, job-ready employees
              </Link>{" "}
              in Bengaluru and across India.
            </p>
            <div className="flex flex-wrap items-center gap-6 border-b border-border/20 pb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                August 07, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                Talenty Consulting
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                7 min read
              </span>
            </div>
          </header>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p className="text-lg font-medium leading-relaxed text-foreground">
              Trained employee placement is a hiring model where candidates are sourced, trained on
              role-specific skills, evaluated through multi-stage vetting, and placed as job-ready
              employees — reducing the time and risk a company normally spends turning a fresh hire
              into a productive one. It&apos;s sometimes called &quot;hire-train-deploy&quot; (HTD) in
              enterprise contexts, but the same idea scales down cleanly for startups and SMEs, which
              is where{" "}
              <strong className="text-foreground">Talenty Consulting</strong> focuses.
            </p>

            <p>
              If you&apos;ve hired through a job portal before, you already know the gap this closes: a
              resume tells you what someone <em>claims</em> they can do. Trained placement is built
              around what they&apos;ve actually <em>demonstrated</em> they can do, before you ever see
              the profile.
            </p>

            <h2 className="mt-12 text-2xl font-bold text-foreground">
              Why &quot;job-ready&quot; is different from &quot;qualified&quot;
            </h2>
            <p>
              A candidate can be qualified on paper — right degree, right years of experience — and
              still take two or three months to become genuinely productive in a new role. Trained
              placement compresses that runway by front-loading the parts that usually happen{" "}
              <em>after</em> someone joins:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Role-specific upskilling before placement, not on-the-job trial and error</li>
              <li>
                Multi-stage evaluation (cognitive, skill, and behavioral) before a profile is ever
                shared with a client
              </li>
              <li>
                A defined support window after placement, so the employer isn&apos;t alone if something
                needs adjusting
              </li>
            </ul>
            <p>
              This is the core difference between trained placement and traditional recruitment:
              traditional recruitment optimizes for <em>who&apos;s available</em>; trained placement
              optimizes for <em>who&apos;s ready</em>.
            </p>

            <h2 className="mt-12 text-2xl font-bold text-foreground">How the process works</h2>
            <ol className="list-decimal space-y-4 pl-6">
              <li>
                <strong className="text-foreground">Source.</strong> Candidates are identified against
                the specific role and industry context a client needs — not pulled generically from a
                resume database.
              </li>
              <li>
                <strong className="text-foreground">Train.</strong> Candidates go through role-specific
                upskilling so they arrive with working knowledge of the tools, workflows, or technical
                skills the position actually requires.
              </li>
              <li>
                <strong className="text-foreground">Vet.</strong> Every candidate goes through
                multi-stage screening — cognitive ability, hands-on skill evaluation, and behavioral
                fit — before being shortlisted. See{" "}
                <Link href="/talent-screening-process" className="text-primary hover:underline">
                  Talenty&apos;s talent screening process
                </Link>{" "}
                for the full breakdown of each stage.
              </li>
              <li>
                <strong className="text-foreground">Place.</strong> The employer receives a shortlist
                of candidates who&apos;ve already cleared training and vetting, not raw applications.
              </li>
              <li>
                <strong className="text-foreground">Support.</strong> Talenty Consulting provides
                post-placement support for <strong className="text-foreground">90 days</strong> after
                the hire starts, so early friction gets resolved quickly rather than becoming a
                resignation.
              </li>
            </ol>

            <h2 className="mt-12 text-2xl font-bold text-foreground">Who this model fits best</h2>
            <p>Trained placement tends to make the most sense for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Startups and SMEs in Bengaluru</strong> that
                can&apos;t absorb a slow, uncertain onboarding runway the way a large enterprise can
              </li>
              <li>
                <strong className="text-foreground">Teams hiring for a specific skill gap</strong> (a
                particular tool, workflow, or technical stack) rather than a generalist role
              </li>
              <li>
                <strong className="text-foreground">Companies that have been burned by job-portal hiring</strong>{" "}
                — high volume, low signal, and a lot of manual filtering with no guarantee of fit
              </li>
            </ul>
            <p>
              It&apos;s less suited to highly specialized senior or executive search, where the value
              is judgment and network rather than trainable skill — that&apos;s a different service
              entirely (traditional recruitment consulting).
            </p>

            <h2 className="mt-12 text-2xl font-bold text-foreground">
              Trained placement vs. traditional recruitment consulting
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border/40">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="p-4 font-semibold" />
                    <th className="p-4 font-semibold">Traditional recruitment</th>
                    <th className="p-4 font-semibold">Trained placement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/30">
                    <td className="p-4 font-medium text-foreground">What you receive</td>
                    <td className="p-4">Sourced &amp; screened resumes</td>
                    <td className="p-4">Sourced, trained, and vetted job-ready candidates</td>
                  </tr>
                  <tr className="border-t border-border/30">
                    <td className="p-4 font-medium text-foreground">Time to productivity</td>
                    <td className="p-4">Employer manages onboarding/training</td>
                    <td className="p-4">Front-loaded before placement</td>
                  </tr>
                  <tr className="border-t border-border/30">
                    <td className="p-4 font-medium text-foreground">Best for</td>
                    <td className="p-4">Senior, specialized, or judgment-heavy roles</td>
                    <td className="p-4">Role-specific skill gaps, faster ramp-up needs</td>
                  </tr>
                  <tr className="border-t border-border/30">
                    <td className="p-4 font-medium text-foreground">Post-placement support</td>
                    <td className="p-4">Typically none</td>
                    <td className="p-4">90-day support window</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Talenty Consulting offers both models — see{" "}
              <Link href="/recruitment-consulting-bangalore" className="text-primary hover:underline">
                recruitment consulting in Bengaluru
              </Link>{" "}
              if traditional sourcing is the better fit for your role. For the full trained-placement
              service overview, visit{" "}
              <Link href="/trained-employee-placement" className="text-primary hover:underline">
                trained employee placement
              </Link>
              .
            </p>

            <h2 className="mt-12 text-2xl font-bold text-foreground">Frequently asked questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Is &quot;Talenty Consulting&quot; the same as &quot;Talenty Consultancy&quot;?
                </h3>
                <p className="mt-2">
                  Yes — Talenty Consulting is the correct and official brand name. You may see it
                  searched or referred to informally as &quot;Talenty Consultancy&quot; or &quot;Talenty
                  Consultancy Bangalore&quot;; all of these refer to the same Bengaluru-based
                  recruitment consulting and trained-placement firm.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  How is trained employee placement different from hire-train-deploy (HTD)?
                </h3>
                <p className="mt-2">
                  They describe the same underlying model. &quot;Hire-train-deploy&quot; is more common
                  in large enterprise and IT services contexts; Talenty applies the same
                  source-train-vet-place-support structure at a scale that works for startups and SMEs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Does trained placement cost more than traditional recruitment?
                </h3>
                <p className="mt-2">
                  Pricing depends on the service model, role level, and hiring volume. We provide a
                  custom proposal after reviewing your requirements —{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    book a consultation
                  </Link>{" "}
                  or email connect@talentyconsulting.in.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  How long does the process typically take?
                </h3>
                <p className="mt-2">
                  For critical or pre-screened staffing requirements, we can place candidates in as
                  little as <strong className="text-foreground">3 to 10 business days</strong>. Custom
                  role pipelines may take longer depending on training and vetting needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Which industries does Talenty Consulting work with?
                </h3>
                <p className="mt-2">
                  We support hiring across IT &amp; Software, BFSI, Healthcare, Manufacturing, Retail,
                  Education, and Hospitality.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <h2 className="text-2xl font-bold text-foreground">Ready to hire job-ready talent?</h2>
              <p className="mt-3">
                Book a consultation with Talenty Consulting to discuss whether trained placement or
                traditional recruitment consulting fits your hiring need.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
