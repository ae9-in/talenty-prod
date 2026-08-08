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

const pageUrl = `${SITE_URL}/it-staffing-bangalore`

const roles = [
  { title: "Frontend Developers", techs: "React.js, Next.js, Vue.js, TypeScript" },
  { title: "Backend Engineers", techs: "Node.js, Python, Go, Java, Spring Boot" },
  { title: "Data Engineers", techs: "PostgreSQL, MongoDB, Kafka, analytics stacks" },
  { title: "DevOps & Cloud", techs: "AWS, Azure, Docker, Kubernetes, CI/CD" },
  { title: "Mobile Developers", techs: "React Native, Flutter, iOS, Android" },
  { title: "Fullstack Engineers", techs: "MERN, MEAN, GraphQL, serverless" },
]

const faqs = [
  {
    question: "What is IT staffing in Bangalore?",
    answer:
      "IT staffing is specialized tech recruitment that sources, screens, and places engineers for permanent or flexible engagements. Talenty Consulting provides IT staffing in Bengaluru with multi-stage vetting so teams receive job-ready profiles.",
  },
  {
    question: "Which tech corridors do you cover?",
    answer:
      "We support hiring for teams across major Bengaluru tech corridors including Whitefield, Outer Ring Road, Koramangala, and Electronic City, plus pan-India remote-friendly roles.",
  },
  {
    question: "How fast can you staff developers?",
    answer: `For pre-screened pipelines, placement can take as little as ${VERIFIED_FACTS.fastHireBusinessDays} business days depending on role complexity.`,
  },
]

export default function ItStaffingBangalore() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbSchema
        paths={[
          { name: "Home", url: SITE_URL },
          { name: "IT Staffing Bengaluru", url: pageUrl },
        ]}
      />
      <PageServiceSchema
        name="IT Staffing & Tech Recruitment in Bengaluru"
        description="Specialized IT staffing and tech recruitment in Bengaluru for developers, QA, DevOps, data, and fullstack roles."
        url={pageUrl}
      />
      <PageFAQSchema faqs={faqs} />

      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              Tech & IT staffing hub · Bengaluru
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              IT Staffing & Tech{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Recruitment in Bengaluru
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
              Talenty Consulting provides IT staffing in Bengaluru for companies that need job-ready
              engineers — frontend, backend, data, DevOps, mobile, and fullstack — screened before they
              reach your interview loop.
            </p>
            <BookCtaLink href="#contact" label="Hire Developers in Bengaluru" />
            <InternalHubLinks
              links={[
                { href: "/talent-screening-process", label: "Tech Vetting" },
                { href: "/trained-employee-placement", label: "Trained Placement" },
                { href: "/recruitment-consulting-bangalore", label: "Recruitment Consulting" },
              ]}
            />
          </div>
        </div>
      </header>

      <ProofSignals />

      <section id="roles" aria-labelledby="roles-heading" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="roles-heading" className="mb-10 text-center text-3xl font-bold">
            IT roles we staff
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <article key={role.title} className="glass-card rounded-2xl border border-border/40 p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.techs}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" aria-labelledby="it-process-heading" className="bg-secondary/10 py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 id="it-process-heading" className="mb-6 text-3xl font-bold">
            How IT staffing works with Talenty
          </h2>
          <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
            <li>Align on stack, seniority, and delivery context</li>
            <li>Source from Bengaluru tech talent pools</li>
            <li>
              Run{" "}
              <Link href="/talent-screening-process" className="text-primary hover:underline">
                cognitive, skill, and behavioral screening
              </Link>
            </li>
            <li>Shortlist job-ready engineers for client interviews</li>
            <li>{VERIFIED_FACTS.supportWindowDays}-day post-placement support</li>
          </ol>
        </div>
      </section>

      <MoneyPageFaq faqs={faqs} />
      <MoneyPageCta
        heading="Scale your Bengaluru tech team"
        description="Tell us the roles and stacks you need. We will recommend IT staffing, trained placement, or full recruitment consulting."
      />
      <Footer />
    </main>
  )
}
