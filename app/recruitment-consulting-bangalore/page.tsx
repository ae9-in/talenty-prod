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

const pageUrl = `${SITE_URL}/recruitment-consulting-bangalore`

const faqs = [
  {
    question: "Looking for a hiring agency in Bangalore?",
    answer:
      "Talenty Consulting operates as a Bengaluru hiring agency and recruitment consulting partner — combining staffing, multi-stage vetting, and trained employee placement so you receive job-ready shortlists rather than unfiltered job-portal resumes.",
  },
  {
    question: "What is the best way to choose a recruitment consultant in Bengaluru?",
    answer:
      "Evaluate process clarity (sourcing, screening, placement support), local market understanding, and whether they optimize for job-ready fit versus resume volume. Compare models on our hiring-agency guides and book a consultation to map your role.",
  },
  {
    question: "How quickly can Talenty fill a role?",
    answer: `For critical or pre-screened staffing requirements, we can place candidates in as little as ${VERIFIED_FACTS.fastHireBusinessDays} business days.`,
  },
  {
    question: "Do you only hire for IT?",
    answer: `No. We support ${VERIFIED_FACTS.industries.join(", ")}.`,
  },
]

export default function RecruitmentConsultingBangalore() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: SITE_URL },
          { name: "Recruitment Consulting Bengaluru", url: pageUrl },
        ]}
      />
      <PageServiceSchema
        name="Recruitment Consulting & Staffing Agency in Bengaluru"
        description="Talenty Consulting helps Bengaluru companies hire through recruitment consulting, staffing, and pre-vetted talent shortlists."
        url={pageUrl}
      />
      <PageFAQSchema faqs={faqs} />

      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-primary/20 opacity-60 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              Bengaluru recruitment consulting & hiring agency
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Recruitment Consulting & Staffing Agency in{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Bengaluru
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
              Talenty Consulting is a Bengaluru-based recruitment consulting and hiring agency that helps
              startups, SMEs, and enterprises hire trained, job-ready talent through sourcing, multi-stage
              screening, and placement support — not raw resume dumps from job portals.
            </p>
            <BookCtaLink href="#contact" label="Start Hiring in Bengaluru" />
            <InternalHubLinks
              links={[
                { href: "/trained-employee-placement", label: "Trained Placement" },
                { href: "/it-staffing-bangalore", label: "IT Staffing" },
                { href: "/talent-screening-process", label: "Vetting Process" },
                { href: "/blog/how-to-choose-hiring-agency-bangalore", label: "Hiring Agency Guide" },
              ]}
            />
          </div>
        </div>
      </header>

      <ProofSignals />

      <section id="who" aria-labelledby="who-heading" className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="who-heading" className="mb-6 text-3xl font-bold">
            Who we help in Bengaluru
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Founders, CHROs, and hiring managers who need a reliable staffing and recruitment partner in
            Bangalore — including companies comparing a traditional hiring agency, an in-house HR team, or{" "}
            <Link href="/trained-employee-placement" className="text-primary hover:underline">
              trained employee placement
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="process" aria-labelledby="process-heading" className="bg-secondary/10 py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="process-heading" className="mb-6 text-3xl font-bold">
            Our recruitment consulting process
          </h2>
          <ol className="list-decimal space-y-4 pl-6 text-muted-foreground">
            <li>
              <strong className="text-foreground">Understand the role</strong> — business context, skills,
              and culture fit.
            </li>
            <li>
              <strong className="text-foreground">Source</strong> — targeted outreach beyond job boards.
            </li>
            <li>
              <strong className="text-foreground">Vet</strong> —{" "}
              <Link href="/talent-screening-process" className="text-primary hover:underline">
                multi-stage talent screening
              </Link>
              .
            </li>
            <li>
              <strong className="text-foreground">Place</strong> — shortlist of job-ready candidates.
            </li>
            <li>
              <strong className="text-foreground">Support</strong> — {VERIFIED_FACTS.supportWindowDays}-day
              post-placement workforce support.
            </li>
          </ol>
        </div>
      </section>

      <section id="why" aria-labelledby="why-heading" className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="why-heading" className="mb-6 text-3xl font-bold">
            Why partner with Talenty as your Bengaluru hiring agency
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
            <li>Local Church Street presence with pan-India hiring support</li>
            <li>Pre-screened shortlists instead of high-volume, low-signal portals</li>
            <li>
              Optional{" "}
              <Link href="/it-staffing-bangalore" className="text-primary hover:underline">
                IT staffing
              </Link>{" "}
              for tech teams in Whitefield, ORR, Koramangala, and Electronic City corridors
            </li>
            <li>Transparent next steps via consultation — custom proposals, no invented fee claims</li>
          </ul>
        </div>
      </section>

      <MoneyPageFaq faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <MoneyPageCta
        heading="Book a Bengaluru hiring consultation"
        description="Share your requirements. Our team will recommend recruitment consulting, IT staffing, or trained placement based on the role."
      />
      <Footer />
    </main>
  )
}
