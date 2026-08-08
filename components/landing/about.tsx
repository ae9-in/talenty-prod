import { Target, Lightbulb, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Target,
    title: "Precision Matching",
    description: "We connect the right talent with the right opportunities through structured recruitment.",
  },
  {
    icon: Lightbulb,
    title: "Industry Expertise",
    description: "Deep understanding of Bengaluru market dynamics and sector-specific hiring needs.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Multi-stage screening so only vetted, job-ready candidates reach your desk.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "From startups to enterprises, our hiring models grow with your team.",
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">About Us</span>
            <h2 id="about-heading" className="mt-4 mb-6 text-balance text-2xl font-bold sm:text-3xl lg:text-4xl">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Talenty Consulting
              </span>
            </h2>
            <p className="mb-4 text-pretty leading-relaxed text-muted-foreground">
              Talenty Consulting is a recruitment and staffing partner that helps companies hire trained,
              job-ready employees. We specialize in B2B recruitment consulting, candidate screening, and
              workforce support tailored to business growth.
            </p>
            <p className="mb-4 text-pretty leading-relaxed text-muted-foreground">
              We achieve this by aligning on candidate requirements, sourcing and upskilling talent, and
              conducting multi-stage screening for day-one productivity.
            </p>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Unlike standard job boards, we offer end-to-end consulting and custom training plans across India.
            </p>
            <nav aria-label="Service hubs" className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/recruitment-consulting-bangalore"
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 hover:bg-primary/20"
              >
                Recruitment Consulting
              </Link>
              <Link
                href="/it-staffing-bangalore"
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 hover:bg-primary/20"
              >
                IT Staffing Bengaluru
              </Link>
              <Link
                href="/trained-employee-placement"
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 hover:bg-primary/20"
              >
                Trained Placement
              </Link>
              <Link
                href="/talent-screening-process"
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 hover:bg-primary/20"
              >
                Vetting Process
              </Link>
            </nav>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
