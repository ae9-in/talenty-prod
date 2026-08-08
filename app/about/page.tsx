import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  Users,
  Target,
  Award,
  Heart,
  Briefcase,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FOUNDING_YEAR } from "@/lib/seo"
import { PageFAQSchema } from "@/components/landing/json-ld"

const teamValues = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We bridge the gap between talented professionals and companies seeking excellence.",
  },
  {
    icon: Heart,
    title: "People First",
    description: "We build lasting relationships with clients and candidates.",
  },
  {
    icon: Award,
    title: "Quality Focused",
    description: "Highest standards in candidate screening and placement.",
  },
  {
    icon: TrendingUp,
    title: "Growth Oriented",
    description: "We help businesses scale while nurturing career growth.",
  },
]

const milestones = [
  { year: "01", event: "Launched with a vision to transform how companies hire talent" },
  { year: "02", event: "Expanded recruitment coverage across Bengaluru and major Indian metros" },
  { year: "03", event: "Built multi-stage screening for job-ready shortlists" },
  { year: "04", event: "Launched specialized IT and tech recruitment practice" },
  { year: "05", event: "Scaled trained employee placement with post-hire support" },
]

const stats = [
  { value: "Pan-India", label: "Hiring Support" },
  { value: "Multi-stage", label: "Talent Vetting" },
  { value: "90-day", label: "Workforce Support" },
  { value: "Job-ready", label: "Trained Placement" },
]

const brandFaqs = [
  {
    question: 'Is "Talenty Consulting" the same as "Talenty Consultancy"?',
    answer:
      "Yes. Talenty Consulting is the official brand name. Searches for Talenty Consultancy, Talenty Consultancy Bangalore, or common misspellings refer to the same Bengaluru recruitment consulting and trained-placement firm.",
  },
  {
    question: "Where is Talenty Consulting based?",
    answer:
      "Our office is at Bhive Platinum, Church Street, Bengaluru, Karnataka 560001. We serve clients pan-India.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageFAQSchema faqs={brandFaqs} />
      <Navbar />

      <header className="relative overflow-hidden pb-20 pt-32">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">About Talenty Consulting</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold md:text-5xl lg:text-6xl">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Talent Acquisition
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Talenty Consulting is a Bengaluru-based recruitment consulting and staffing firm helping
              companies hire trained, job-ready employees across India
              {FOUNDING_YEAR ? `, established ${FOUNDING_YEAR}` : ""}.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="stats-heading" className="py-16">
        <h2 id="stats-heading" className="sr-only">
          Company signals
        </h2>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 id="story-heading" className="mb-6 text-3xl font-bold md:text-4xl">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Story
                </span>
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Talenty Consulting was founded by Rajesh Kumar and Anita Deshmukh
                  {FOUNDING_YEAR ? ` in ${FOUNDING_YEAR}` : ""} with a simple vision: make hiring
                  easier, faster, and more effective.
                </p>
                <p>
                  With backgrounds in HR and corporate recruitment, our founders built a consultancy that
                  understands both employer needs and candidate aspirations — culminating in trained
                  employee placement and multi-stage vetting.
                </p>
                <p>
                  Official brand spelling is <strong className="text-foreground">Talenty Consulting</strong>
                  . You may also see informal references to &quot;Talenty Consultancy&quot; or
                  &quot;Talenty Consultancy Bangalore&quot; — they refer to this same firm.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <Link href="/contact">
                    Work With Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Briefcase className="h-5 w-5 text-primary" />
                Our Journey
              </h3>
              <ol className="space-y-6">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4">
                    <div className="flex h-8 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-accent/20">
                      <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                    </div>
                    <p className="pt-1 text-sm text-muted-foreground">{milestone.event}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="brand-faq-heading" className="border-y border-border/30 py-20">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8">
          <h2 id="brand-faq-heading" className="mb-8 text-3xl font-bold">
            Brand &amp; naming FAQ
          </h2>
          {brandFaqs.map((faq) => (
            <div key={faq.question} className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-heading" className="relative py-20">
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 id="values-heading" className="mb-4 text-3xl font-bold md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamValues.map((value) => (
              <article key={value.title} className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="apart-heading" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="glass-card rounded-2xl p-8">
              <h2 id="apart-heading" className="mb-6 text-2xl font-bold">
                What Sets Us Apart
              </h2>
              <ul className="space-y-4">
                {[
                  "Deep understanding of Indian job market dynamics",
                  "Personalized approach for each client and candidate",
                  "Rigorous screening and verification process",
                  "Long-term partnership focus, not transactional hiring",
                  "Industry-specific expertise across multiple sectors",
                  "Transparent communication throughout the process",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Ready to Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Perfect Team?
                </span>
              </h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                Whether you need recruitment consulting, IT staffing, or trained placement, we are here to
                help.
              </p>
              <Button asChild size="lg" className="border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
