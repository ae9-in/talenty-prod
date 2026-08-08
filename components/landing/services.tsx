import {
  UserCheck,
  Search,
  ClipboardCheck,
  HeartHandshake,
  Zap,
  Building,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: UserCheck,
    title: "Trained Employee Placement",
    description:
      "Trained employee placement provides companies with pre-vetted, job-ready professionals who have completed industry-standard training — reducing onboarding lag.",
    gradient: "from-violet-500 to-purple-600",
    href: "/trained-employee-placement",
  },
  {
    icon: Search,
    title: "Recruitment Consulting",
    description:
      "Strategic recruitment consulting for employer branding, talent pipelines, and hiring workflows that attract job-ready talent in Bengaluru.",
    gradient: "from-blue-500 to-indigo-600",
    href: "/recruitment-consulting-bangalore",
  },
  {
    icon: ClipboardCheck,
    title: "Talent Screening",
    description:
      "Multi-stage talent screening across cognitive, skill, and behavioral dimensions before any shortlist is shared.",
    gradient: "from-cyan-500 to-blue-600",
    href: "/talent-screening-process",
  },
  {
    icon: HeartHandshake,
    title: "Workforce Support",
    description:
      "Structured onboarding and post-placement counseling for employers and new hires during the critical first 90 days.",
    gradient: "from-pink-500 to-rose-600",
    href: "/trained-employee-placement",
  },
  {
    icon: Zap,
    title: "Fast Hiring Solutions",
    description:
      "Accelerated sourcing and placement for urgent vacancies using a pre-screened pipeline — typically 3 to 10 business days for fast-path roles.",
    gradient: "from-amber-500 to-orange-600",
    href: "/recruitment-consulting-bangalore",
  },
  {
    icon: Building,
    title: "Business & IT Staffing",
    description:
      "End-to-end staffing for tech and business roles, including specialized IT staffing across Bengaluru corridors.",
    gradient: "from-emerald-500 to-teal-600",
    href: "/it-staffing-bangalore",
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Services</span>
          <h2 id="services-heading" className="mt-4 mb-6 text-balance text-2xl font-bold sm:text-3xl lg:text-4xl">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Staffing Solutions
            </span>
          </h2>
          <p className="text-pretty text-muted-foreground">
            From talent sourcing to placement support, we offer recruitment consulting, IT staffing, and trained
            employee placement designed for Bengaluru companies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="group">
              <Link href={service.href} className="block h-full">
                <div className="glass-card relative h-full overflow-hidden rounded-2xl border border-border/40 p-8 transition-all group-hover:border-primary/40">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient}`}
                  >
                    <service.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary">Learn more →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
