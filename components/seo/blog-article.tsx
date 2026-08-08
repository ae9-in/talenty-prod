import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { SITE_URL } from "@/lib/seo"

export type BlogArticleProps = {
  slug: string
  title: string
  description: string
  datePublished: string
  dateLabel: string
  readTime: string
  clusterLabel: string
  hubHref: string
  hubLabel: string
  children: React.ReactNode
  faqs?: { question: string; answer: string }[]
}

export function BlogArticle({
  slug,
  title,
  description,
  datePublished,
  dateLabel,
  readTime,
  clusterLabel,
  hubHref,
  hubLabel,
  children,
  faqs,
}: BlogArticleProps) {
  const url = `${SITE_URL}/blog/${slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: "Talenty Consulting", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Talenty Consulting",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: url,
  }

  const faqSchema = faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      <article className="relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 lg:px-8">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-12 space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{clusterLabel}</p>
            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl">{title}</h1>
            <p className="text-lg text-muted-foreground">
              Part of our{" "}
              <Link href={hubHref} className="text-primary hover:underline">
                {hubLabel}
              </Link>{" "}
              cluster.
            </p>
            <div className="flex flex-wrap items-center gap-6 border-b border-border/20 pb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                {dateLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                Talenty Consulting
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                {readTime}
              </span>
            </div>
          </header>

          <div className="space-y-6 text-muted-foreground leading-relaxed">{children}</div>

          {faqs?.length ? (
            <section className="mt-12 space-y-6" aria-labelledby="article-faq">
              <h2 id="article-faq" className="text-2xl font-bold text-foreground">
                Frequently asked questions
              </h2>
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold text-foreground">{f.question}</h3>
                  <p className="mt-2">{f.answer}</p>
                </div>
              ))}
            </section>
          ) : null}

          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold text-foreground">Ready to hire with Talenty?</h2>
            <p className="mt-3">Book a consultation to map the right hiring model for your team.</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

export function blogMetadata({
  title,
  description,
  slug,
}: {
  title: string
  description: string
  slug: string
}) {
  const url = `${SITE_URL}/blog/${slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Talenty Consulting`,
      description,
      url,
      type: "article" as const,
      siteName: "Talenty Consulting",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | Talenty Consulting`,
      description,
    },
  }
}
