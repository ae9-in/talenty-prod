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

const pageUrl = `${SITE_URL}/trained-employee-placement`

const faqs = [
  {
    question: "What is trained employee placement?",
    answer:
      "Trained employee placement is a hiring model where candidates are sourced, trained on role-specific skills, multi-stage vetted, and placed as job-ready employees — with post-placement support.",
  },
  {
    question: "How long is post-placement support?",
    answer: `Talenty Consulting provides ${VERIFIED_FACTS.supportWindowDays}-day workforce support after placement.`,
  },
  {
    question: "Is this the same as hire-train-deploy?",
    answer:
      "Yes — hire-train-deploy (HTD) describes the same underlying model. Talenty applies it at a scale suited to startups and SMEs. Read our definition guide for details.",
  },
]

export default function TrainedEmployeePlacement() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: SITE_URL },
          { name: "Trained Employee Placement", url: pageUrl },
        ]}
      />
      <PageServiceSchema
        name="Trained Employee Placement"
        description="Hire pre-trained, job-ready employees in India with sourcing, training, multi-stage vetting, placement, and 90-day support."
        url={pageUrl}
      />
      <PageFAQSchema faqs={faqs} />

      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              Pre-trained staffing model
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Hire Pre-Trained,{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Job-Ready Employees
              </span>
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Stop wasting weeks on onboarding. Talenty Consulting sources, trains, and vets candidates to
              match your workflows before they join — then supports the placement for{" "}
              {VERIFIED_FACTS.supportWindowDays} days.
            </p>
            <p className="mb-8 text-sm text-muted-foreground">
              New to the model? Read{" "}
              <Link href="/blog/what-is-trained-employee-placement" className="text-primary hover:underline">
                what trained employee placement is
              </Link>{" "}
              or compare{" "}
              <Link
                href="/blog/job-ready-hires-vs-job-portal-resumes"
                className="text-primary hover:underline"
              >
                job-ready hires vs job-portal resumes
              </Link>
              .
            </p>
            <BookCtaLink href="#contact" label="Discuss Trained Placement" />
            <InternalHubLinks
              links={[
                { href: "/talent-screening-process", label: "Vetting Process" },
                { href: "/recruitment-consulting-bangalore", label: "Recruitment Consulting" },
                { href: "/it-staffing-bangalore", label: "IT Staffing" },
              ]}
            />
          </div>
        </div>
      </header>

      <ProofSignals />

      <section id="process" aria-labelledby="tep-process" className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="tep-process" className="mb-6 text-3xl font-bold">
            Source → Train → Vet → Place → Support
          </h2>
          <ol className="list-decimal space-y-4 pl-6 text-muted-foreground">
            {VERIFIED_FACTS.processSteps.map((step) => (
              <li key={step}>
                <strong className="text-foreground">{step}.</strong>{" "}
                {step === "Vet" ? (
                  <>
                    Multi-stage screening — see the{" "}
                    <Link href="/talent-screening-process" className="text-primary hover:underline">
                      talent screening process
                    </Link>
                    .
                  </>
                ) : step === "Support" ? (
                  <>{VERIFIED_FACTS.supportWindowDays}-day post-placement workforce support.</>
                ) : (
                  <>Role-aligned {step.toLowerCase()} for job-ready outcomes.</>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="who" aria-labelledby="tep-who" className="bg-secondary/10 py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="tep-who" className="mb-6 text-3xl font-bold">
            Best fit for
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Startups and SMEs in Bengaluru that need faster time-to-productivity</li>
            <li>Teams hiring for a specific skill gap or stack</li>
            <li>Companies replacing low-signal job-portal pipelines</li>
          </ul>
        </div>
      </section>

      <MoneyPageFaq faqs={faqs} />
      <MoneyPageCta
        heading="Hire job-ready talent"
        description="Book a consultation to see whether trained placement or traditional recruitment consulting fits your role."
      />
      <Footer />
    </main>
  )
}
