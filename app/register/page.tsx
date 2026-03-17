import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RegisterForm } from "@/components/public/register-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">Public Registration</p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-balance">Create Your Talenty Profile</h1>
            <p className="mt-4 text-lg text-muted-foreground">Create a profile so our consulting team can understand your interest areas and connect you with the right opportunities.</p>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <RegisterForm />
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/40 bg-white/5 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-foreground">Why Register</h2>
                <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Create a profile that captures your role and industry interests.</div>
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Stay available for counseling, consulting, and hiring-related follow-up.</div>
                  <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">Keep your business or role preferences ready for future discussions.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
