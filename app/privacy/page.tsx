import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Talenty Consulting. How we collect, use, and protect personal information submitted through our Bengaluru recruitment consulting website.",
  alternates: { canonical: "https://www.talentyconsulting.in/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto max-w-3xl px-4 pb-24 pt-32 lg:px-8">
        <p className="text-sm text-muted-foreground">Last updated: 7 August 2026</p>
        <h1 className="mt-4 text-4xl font-bold text-balance">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Talenty Consulting (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates https://www.talentyconsulting.in.
          This policy explains how we handle information when you use our website or contact us about
          recruitment consulting, staffing, or trained employee placement services.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Information we collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you submit an enquiry or consultation request, we may collect your name, email address,
            phone number, company name, role, and hiring requirements. We also receive standard technical
            data such as IP address, browser type, and pages visited when analytics tools are enabled.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How we use information</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Respond to consultation and hiring enquiries</li>
            <li>Provide recruitment, screening, and staffing services you request</li>
            <li>Improve our website and client experience</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell personal information. We may share details with service providers who help us
            operate the website or deliver services (for example hosting or email), under appropriate
            confidentiality obligations, or when required by law.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Data retention &amp; security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain enquiry information for as long as needed to respond to your request and maintain
            legitimate business records. We apply reasonable technical and organisational measures to
            protect information against unauthorised access or loss.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Your choices</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may request access, correction, or deletion of personal information we hold about you by
            emailing{" "}
            <a className="text-primary hover:underline" href="mailto:connect@talentyconsulting.in">
              connect@talentyconsulting.in
            </a>
            .
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Talenty Consulting<br />
            Bhive Platinum, Church Street, Bengaluru, Karnataka 560001<br />
            Phone: +91-8431119696<br />
            Email: connect@talentyconsulting.in
          </p>
          <p className="text-muted-foreground">
            See also our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </p>
        </section>
      </article>
      <Footer />
    </main>
  )
}
