import { FileSearch, Users, ClipboardList, CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Audit Hiring Requirements",
    description:
      "Align with stakeholders to define role parameters, target profile, and skills needed.",
    time: "1-2 Days",
    color: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    icon: Users,
    title: "Source & Upskill Candidates",
    description:
      "Source high-potential talent and run customized pre-employment upskilling where needed.",
    time: "5-7 Days",
    color: "from-blue-500 to-indigo-600",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Screen & Verify Profiles",
    description:
      "Cognitive, skill, and behavioral assessments to select job-ready talent.",
    time: "2-3 Days",
    color: "from-cyan-500 to-blue-600",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Deploy & Onboard Hires",
    description:
      "Deliver the shortlist, finalize placement, and provide active 90-day integration support.",
    time: "2-4 Days",
    color: "from-emerald-500 to-teal-600",
  },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Process</span>
          <h2 id="process-heading" className="mt-4 mb-6 text-balance text-3xl font-bold lg:text-4xl">
            How{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">We Work</span>
          </h2>
          <p className="text-pretty text-muted-foreground">
            A structured four-step approach from requirements to job-ready placement.
          </p>
        </div>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <article className="glass-card relative h-full overflow-hidden rounded-2xl p-8">
                <div
                  className={`absolute right-4 top-4 text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}
                >
                  {step.number}
                </div>
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color}`}
                >
                  <step.icon className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                <p className="w-fit rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary/80">
                  Timeline: <span className="text-foreground">{step.time}</span>
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Hire Trained Employees with Talenty Consulting",
            description:
              "A structured four-step process to source, screen, train, and deploy candidate matches.",
            totalTime: "P14D",
            step: steps.map((s, idx) => ({
              "@type": "HowToStep",
              position: idx + 1,
              name: s.title,
              text: s.description,
              url: `https://www.talentyconsulting.in/#process`,
            })),
          }),
        }}
      />
    </section>
  )
}
