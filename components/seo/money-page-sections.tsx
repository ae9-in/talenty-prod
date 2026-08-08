import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EnquiryForm } from "@/components/public/enquiry-form"
import { SITE_ADDRESS, SITE_EMAIL, SITE_HOURS_LABEL, SITE_PHONE } from "@/lib/seo"

export function MoneyPageFaq({
  id = "faq",
  title = "Frequently asked questions",
  faqs,
}: {
  id?: string
  title?: string
  faqs: { question: string; answer: React.ReactNode }[]
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-border/30 py-20">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <h2 id={`${id}-heading`} className="mb-10 text-3xl font-bold text-foreground">
          {title}
        </h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <div className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MoneyPageCta({
  id = "contact",
  heading,
  description,
}: {
  id?: string
  heading: string
  description: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative border-t border-border/30 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 id={`${id}-heading`} className="mb-4 text-3xl font-bold">
              {heading}
            </h2>
            <p className="mb-8 text-muted-foreground">{description}</p>
            <EnquiryForm buttonLabel="Book Consultation" />
          </div>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border/40 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-4 text-2xl font-bold">Talenty Bengaluru Office</h3>
              <p className="mb-6 text-muted-foreground">{SITE_ADDRESS}</p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  <a href={`tel:${SITE_PHONE.replace(/-/g, "")}`} className="hover:text-foreground">
                    {SITE_PHONE}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  <a href={`mailto:${SITE_EMAIL}`} className="hover:text-foreground">
                    {SITE_EMAIL}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Office Hours:</span> {SITE_HOURS_LABEL}
                </p>
              </div>
            </div>
            <div className="h-[280px] overflow-hidden rounded-3xl border border-border/40">
              <iframe
                title="Talenty Consulting Bengaluru office map"
                src="https://www.google.com/maps?q=Bhive%20Platinum%20Church%20Street%20Bengaluru&z=15&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function ProofSignals() {
  const items = [
    { value: "Source → Train → Vet → Place", label: "Named hiring methodology" },
    { value: "3–10 business days", label: "Fast-path placement window" },
    { value: "90-day", label: "Post-placement support" },
    { value: "Multi-stage", label: "Cognitive, skill & behavioral vetting" },
  ]
  return (
    <section aria-labelledby="proof-heading" className="border-y border-border/30 bg-secondary/10 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 id="proof-heading" className="sr-only">
          Verified process signals
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="p-4 text-center">
              <div className="mb-1 text-xl font-bold text-foreground md:text-2xl">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function InternalHubLinks({
  links,
}: {
  links: { href: string; label: string }[]
}) {
  return (
    <nav aria-label="Related services" className="mt-8 flex flex-wrap justify-center gap-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-foreground hover:bg-primary/20"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function BookCtaLink({ href = "/contact", label = "Book a Consultation" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
