import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { EnquiryForm } from "@/components/public/enquiry-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">Contact / Consultation</p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-balance">Book a Premium Counseling or Consulting Session</h1>
            <p className="mt-4 text-lg text-muted-foreground">Tell us what you need to hire, train, or scale. Our team will review the requirement and respond with the best next step.</p>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <EnquiryForm buttonLabel="Submit Enquiry" />
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/40 bg-white/5 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-foreground">Talenty Consulting Office</h2>
                <p className="mt-3 text-muted-foreground">Bhive Platinum, Church Street, Bengaluru. Meet in person or start online with the same form flow.</p>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <div>Phone: 8431119696</div>
                  <div>Email: connect@talentyconsulting.in</div>
                  <div>Hours: Mon - Sat, 9:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/40 bg-white/5 backdrop-blur-xl">
                <iframe title="Bhive Platinum MPS View" src="https://www.google.com/maps?q=Bhive%20Platinum%20Church%20Street%20Bengaluru&z=15&output=embed" className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
