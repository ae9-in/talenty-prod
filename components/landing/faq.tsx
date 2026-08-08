import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is recruitment consulting and how does it benefit my business?",
    answer:
      "Recruitment consulting is a strategic service where specialists design and execute staffing workflows for your organization. Talenty Consulting provides guidance on workforce planning and access to pre-screened, job-ready talent.",
  },
  {
    question: "How does Talenty's hiring process and candidate screening work?",
    answer:
      "We align on your needs, source and train candidates, run multi-stage screening (aptitude, skill, and HR rounds), then deliver vetted shortlists with onboarding support.",
  },
  {
    question: "What industries and job roles do you recruit for in India?",
    answer:
      "We support IT & Software, BFSI, Healthcare, Manufacturing, Retail, Education, and Hospitality — junior through senior roles.",
  },
  {
    question: "How quickly can you fill open positions?",
    answer:
      "Through Fast Hiring Solutions, we can fill critical vacancies within 3 to 10 business days using a pre-screened pipeline. Custom roles typically receive a vetted shortlist within about 2 weeks.",
  },
  {
    question: "What is the difference between staffing services and recruitment consulting?",
    answer:
      "Staffing fills open roles with permanent or temporary talent. Recruitment consulting adds strategic support: pipelines, employer brand, and structured pre-deployment training.",
  },
  {
    question: "Do you provide trained employees or just standard recruitment?",
    answer:
      "Both. Our specialty is Trained Employee Placement: we train selected candidates for your workflows and deploy them ready to contribute from day one.",
  },
  {
    question: "What specific screening methods do you apply to candidates?",
    answer:
      "Cognitive aptitude tests, technical or domain assessments, behavioral HR profiling, and reference/background checks.",
  },
  {
    question: "Do you support hiring outside Bengaluru?",
    answer:
      "Yes. Our office is at Bhive Platinum, Church Street, Bengaluru, and we place candidates pan-India including Mumbai, Pune, Delhi NCR, and Hyderabad.",
  },
  {
    question: "How much do Talenty Consulting's services cost?",
    answer:
      "Fees depend on service model, experience level, and volume. Contact connect@talentyconsulting.in for a custom proposal.",
  },
  {
    question: "What makes Talenty different from large job portals?",
    answer:
      "Job portals deliver high volumes of unfiltered resumes. Talenty sources, filters, verifies, and trains so you interview job-ready shortlists.",
  },
  {
    question: "How can my company get started?",
    answer:
      "Book a session on our Contact page, email connect@talentyconsulting.in, or call +91-8431119696.",
  },
]

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Frequently Asked Questions</span>
          </div>
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Expert Insights:{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hiring & Staffing FAQ
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Recruitment consulting, staffing workflows, and trained placement solutions in India.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-3xl border border-border/40 bg-white/5 p-6 backdrop-blur-xl md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-item-${index}`} className="border-b border-border/30 pb-2 last:border-b-0">
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
