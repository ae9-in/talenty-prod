import Link from "next/link"

/**
 * Trust strip using process proof only — swap in real quotes when clients authorize.
 */
const trustPoints = [
  {
    quote:
      "We don’t publish invented testimonials. Every engagement follows source → train → vet → place → 90-day support.",
    attribution: "Talenty Consulting methodology",
  },
  {
    quote:
      "Clients receive shortlists after multi-stage screening — cognitive, skill, and behavioral — not raw portal resumes.",
    attribution: "Talent screening standard",
  },
  {
    quote:
      "Fast-path placements target 3 to 10 business days for pre-screened roles, with custom pipelines scoped per brief.",
    attribution: "Verified timeline band",
  },
]

export function TestimonialsTrustStrip() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="border-y border-border/30 bg-secondary/10 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="trust-heading" className="text-3xl font-bold text-foreground">
            Proof before praise
          </h2>
          <p className="mt-4 text-muted-foreground">
            Named client quotes and logos appear here only when authorized. Until then, we publish
            verifiable process commitments.{" "}
            <Link href="/blog/trained-placement-process-case-notes" className="text-primary hover:underline">
              See the case framework
            </Link>
            .
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {trustPoints.map((item) => (
            <blockquote key={item.attribution} className="glass-card rounded-2xl border border-border/40 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
                {item.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
