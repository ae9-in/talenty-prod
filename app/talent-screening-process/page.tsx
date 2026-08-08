import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { BreadcrumbSchema, PageFAQSchema, PageServiceSchema } from "@/components/landing/json-ld"
import {
  BookCtaLink,
  InternalHubLinks,
  MoneyPageCta,
  MoneyPageFaq,
  ProofSignals,
} from "@/components/seo/money-page-sections"
import { SITE_URL, VERIFIED_FACTS } from "@/lib/seo"

const pageUrl = `${SITE_URL}/talent-screening-process`

const stages = [
  {
    title: "Resume verification & sourcing",
    desc: "Applications screened against role criteria with reference checks to verify experience claims.",
  },
  {
    title: "Aptitude & cognitive testing",
    desc: "Logical reasoning, analytical skills, and problem-solving assessments.",
  },
  {
    title: "Technical & skill challenges",
    desc: "Hands-on coding or domain tasks measuring real capability, not resume keywords.",
  },
  {
    title: "Behavioral & culture-fit rounds",
    desc: "Structured interviews on communication, adaptability, and collaboration.",
  },
  {
    title: "Background verification",
    desc: "Identity, education, and employment checks before onboarding recommendations.",
  },
]

const faqs = [
  {
    question: "What is multi-stage talent screening?",
    answer:
      "Multi-stage talent screening evaluates candidates across cognitive ability, role-specific skills, and behavioral fit before a shortlist is shared with the client.",
  },
  {
    question: "Does screening include a replacement window?",
    answer: `Yes. Talenty backs placements with a ${VERIFIED_FACTS.supportWindowDays}-day support and replacement policy for underperformance or early exits as described in our placement engagements.`,
  },
]

export default function TalentScreeningProcess() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: SITE_URL },
          { name: "Talent Screening Process", url: pageUrl },
        ]}
      />
      <PageServiceSchema
        name="Candidate Screening & Talent Vetting"
        description="Multi-stage talent screening: cognitive, skill, and behavioral evaluation before shortlist."
        url={pageUrl}
      />
      <PageFAQSchema faqs={faqs} />

      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              Rigorous candidate vetting
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Our Candidate Vetting &{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Screening Process
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
              Talenty Consulting screens candidates across cognitive ability, role-specific skills, and
              behavioral fit before any profile is shortlisted — the quality gate behind{" "}
              <Link href="/trained-employee-placement" className="text-primary hover:underline">
                trained employee placement
              </Link>{" "}
              and{" "}
              <Link href="/it-staffing-bangalore" className="text-primary hover:underline">
                IT staffing
              </Link>
              .
            </p>
            <BookCtaLink href="#contact" label="Discuss Screening Needs" />
            <InternalHubLinks
              links={[
                { href: "/trained-employee-placement", label: "Trained Placement" },
                { href: "/recruitment-consulting-bangalore", label: "Recruitment Consulting" },
                { href: "/blog/cognitive-skill-behavioral-screening-explained", label: "Screening Guide" },
              ]}
            />
          </div>
        </div>
      </header>

      <ProofSignals />

      <section id="stages" aria-labelledby="stages-heading" className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="stages-heading" className="mb-10 text-3xl font-bold">
            Screening stages
          </h2>
          <ol className="space-y-6">
            {stages.map((stage, index) => (
              <li key={stage.title} className="glass-card rounded-2xl border border-border/40 p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {index + 1}. {stage.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{stage.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MoneyPageFaq faqs={faqs} />
      <MoneyPageCta
        heading="Put screening behind your next hire"
        description="Book a consultation to align vetting criteria with your role and industry."
      />
      <Footer />
    </main>
  )
}
