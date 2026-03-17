import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Services } from "@/components/landing/services"
import { WhyUs } from "@/components/landing/why-us"
import { Process } from "@/components/landing/process"
import { Footer } from "@/components/landing/footer"
import { EnquiryForm } from "@/components/public/enquiry-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <section id="contact" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">Contact Talenty</p>
            <h2 className="mt-6 text-4xl font-bold text-balance">Counseling, Consulting, and Hiring Support in One Flow</h2>
            <p className="mt-4 text-lg text-muted-foreground">Use the main website to submit your requirement. Every detail is saved to the backend and appears in the protected admin dashboard.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <EnquiryForm buttonLabel="Book Consultation" />
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/40 bg-white/5 p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-foreground">Why Clients Choose Talenty</h3>
                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Premium counseling flow for staffing, recruitment consulting, and team scaling.</div>
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Every enquiry reaches the admin dashboard with status controls, notes, and search filters.</div>
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Professional support for all roles, industries, and workforce planning needs.</div>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/40 bg-white/5 backdrop-blur-xl">
                <iframe title="Talenty Consulting location" src="https://www.google.com/maps?q=Bhive%20Platinum%20Church%20Street%20Bengaluru&z=15&output=embed" className="h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

