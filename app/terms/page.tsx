import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Talenty Consulting website and recruitment consulting, staffing, and trained employee placement enquiries.",
  alternates: { canonical: "https://www.talentyconsulting.in/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto max-w-3xl px-4 pb-24 pt-32 lg:px-8">
        <p className="text-sm text-muted-foreground">Last updated: 7 August 2026</p>
        <h1 className="mt-4 text-4xl font-bold text-balance">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          These terms govern your use of https://www.talentyconsulting.in operated by Talenty Consulting.
          By using this website or submitting an enquiry, you agree to these terms.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Talenty Consulting provides recruitment consulting, talent screening, IT and business staffing,
            and trained employee placement support. Website content is informational. Formal engagements
            are subject to a separate written agreement between Talenty Consulting and the client.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Enquiries</h2>
          <p className="text-muted-foreground leading-relaxed">
            Information you submit through forms must be accurate to the best of your knowledge. Submitting
            an enquiry does not create a placement guarantee or employment relationship.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Intellectual property</h2>
          <p className="text-muted-foreground leading-relaxed">
            Website text, branding, design, and materials are owned by Talenty Consulting or its licensors.
            You may not copy or reuse them for commercial purposes without prior written permission.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            The website is provided on an &quot;as is&quot; basis. We do not warrant uninterrupted availability
            or that all content is complete or error-free. Hiring outcomes depend on role requirements,
            market conditions, and client decisions.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, Talenty Consulting is not liable for indirect or
            consequential losses arising from use of this website. Liability for contracted services is
            governed by the applicable client agreement.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Governing law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms are governed by the laws of India. Courts in Bengaluru, Karnataka shall have
            exclusive jurisdiction, subject to applicable law.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms:{" "}
            <a className="text-primary hover:underline" href="mailto:connect@talentyconsulting.in">
              connect@talentyconsulting.in
            </a>
            {" · "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </section>
      </article>
      <Footer />
    </main>
  )
}
