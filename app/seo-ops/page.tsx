import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  CITATION_NAP_CHECKLIST,
  MONTHLY_SEO_SCORECARD,
  OFFPAGE_90_DAY_PLAN,
} from "@/lib/seo-ops"
import { PRIMARY_KEYWORDS } from "@/lib/seo"

export const metadata: Metadata = {
  title: "SEO Operations Checklist",
  description: "Internal SEO ops: citation NAP, 90-day off-page plan, and monthly scorecard.",
  robots: { index: false, follow: false },
}

export default function SeoOpsPage() {
  const nap = CITATION_NAP_CHECKLIST.nap

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto max-w-3xl px-4 pb-24 pt-32 lg:px-8">
        <p className="text-sm text-amber-600">Internal ops page — noindex</p>
        <h1 className="mt-2 text-4xl font-bold">SEO Operations Checklist</h1>
        <p className="mt-4 text-muted-foreground">
          Execute Phase 1 entity + Phase 5 off-page offline. Keep NAP identical everywhere.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Exact NAP for citations</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-border/40 bg-secondary/30 p-4 text-sm">
            {`${nap.name}
${nap.street}
${nap.city}, ${nap.region} ${nap.postal}
${nap.country}
Phone: ${nap.phone}
Email: ${nap.email}
Web: ${nap.website}
Hours: ${nap.hours}`}
          </pre>
          <h3 className="mt-6 text-lg font-semibold">Directories</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {CITATION_NAP_CHECKLIST.directories.map((d) => (
              <li key={d.name}>
                <a href={d.url} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-lg font-semibold">Rules</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {CITATION_NAP_CHECKLIST.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">90-day off-page plan</h2>
          {OFFPAGE_90_DAY_PLAN.map((block) => (
            <div key={block.weeks} className="mt-6">
              <h3 className="text-lg font-semibold">Weeks {block.weeks}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                {block.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Primary keyword scorecard</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="p-2">Keyword</th>
                  <th className="p-2">URL</th>
                  <th className="p-2">Intent</th>
                </tr>
              </thead>
              <tbody>
                {PRIMARY_KEYWORDS.map((row) => (
                  <tr key={row.keyword} className="border-b border-border/20">
                    <td className="p-2">{row.keyword}</td>
                    <td className="p-2">{row.url}</td>
                    <td className="p-2">{row.intent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Monthly measurement checklist</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {MONTHLY_SEO_SCORECARD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>
      <Footer />
    </main>
  )
}
