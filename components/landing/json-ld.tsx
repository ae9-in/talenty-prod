import React from "react"
import {
  FOUNDING_YEAR,
  organizationSameAs,
  SITE_EMAIL,
  SITE_HOURS_SCHEMA,
  SITE_PHONE,
  SITE_POSTAL,
  SITE_REGION,
  SITE_STREET,
  SITE_URL,
} from "@/lib/seo"

export function OrganizationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Talenty Consulting",
    alternateName: ["Talenty", "Talenty Consultancy"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      "Talenty Consulting is a recruitment and staffing partner helping companies hire trained, job-ready employees through talent sourcing, screening, and consulting support tailored to modern business needs.",
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_STREET,
      addressLocality: "Bengaluru",
      addressRegion: SITE_REGION,
      postalCode: SITE_POSTAL,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.6099,
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      ...SITE_HOURS_SCHEMA,
    },
    sameAs: organizationSameAs(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"],
    },
  }

  // foundingDate only when NEXT_PUBLIC_FOUNDING_YEAR is set [HOLD gate]
  if (FOUNDING_YEAR) {
    schema.foundingDate = FOUNDING_YEAR
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  // SearchAction removed — no /search route exists
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Talenty Consulting",
    url: SITE_URL,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const services = [
    {
      name: "Trained Employee Placement",
      description:
        "Access pre-trained professionals ready to contribute from day one. Our candidates undergo rigorous training programs tailored to industry standards.",
      url: `${SITE_URL}/trained-employee-placement`,
    },
    {
      name: "Recruitment Consulting",
      description:
        "Strategic guidance on talent acquisition, employer branding, and building effective hiring processes that attract top talent.",
      url: `${SITE_URL}/recruitment-consulting-bangalore`,
    },
    {
      name: "Talent Screening",
      description:
        "Comprehensive candidate evaluation including skills assessment, background verification, and cultural fit analysis.",
      url: `${SITE_URL}/talent-screening-process`,
    },
    {
      name: "Workforce Support",
      description:
        "Ongoing support for placed employees and employers to ensure smooth onboarding and long-term retention success.",
      url: `${SITE_URL}/trained-employee-placement`,
    },
    {
      name: "Fast Hiring Solutions",
      description:
        "Accelerated recruitment processes for urgent hiring needs without compromising on candidate quality or fit.",
      url: `${SITE_URL}/recruitment-consulting-bangalore`,
    },
    {
      name: "Business Staffing Assistance",
      description:
        "End-to-end staffing solutions for scaling teams, managing seasonal demands, and building specialized departments.",
      url: `${SITE_URL}/it-staffing-bangalore`,
    },
  ]

  const schemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Talenty Consulting",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bhive Platinum, Church Street",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560001",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    serviceType: "Recruitment and Staffing",
    url: s.url,
  }))

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is recruitment consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recruitment consulting is a strategic partnership where experts guide organizations in talent acquisition, employer branding, and optimization of hiring processes. Talenty Consulting helps businesses structure their staffing workflows to attract and hire the best fits.",
        },
      },
      {
        "@type": "Question",
        name: "How does Talenty's hiring process work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our process is structured in four quick phases: understanding your specific business needs, sourcing and training candidates to match those criteria, conducting multi-stage screening, and delivering job-ready hires with onboarding support.",
        },
      },
      {
        "@type": "Question",
        name: "What industries do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Talenty Consulting supports hiring across multiple high-demand domains, including IT & Software, BFSI (Banking, Financial Services, and Insurance), Healthcare, Manufacturing, Retail, Education, and Hospitality.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can you fill a role?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For critical or pre-screened staffing requirements, we offer Fast Hiring Solutions that can place candidates in as little as 3 to 10 business days without compromising on quality.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between staffing and consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Staffing focuses on filling immediate open roles with temporary or permanent talent, while recruitment consulting involves strategic layout design, team planning, training solutions, and process optimization for long-term growth.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide trained employees or only recruitment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer both. Our core differentiator is Trained Employee Placement, where we source candidates and train them in specific tech, domain, or operational skills prior to deployment, ensuring day-one productivity.",
        },
      },
      {
        "@type": "Question",
        name: "What screening process do you use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We execute a rigorous multi-stage vetting process comprising cognitive aptitude tests, technical coding or domain assessments, HR behavioral rounds, and detailed background checks.",
        },
      },
      {
        "@type": "Question",
        name: "Do you serve companies outside Bengaluru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, while our primary physical office is located in Bengaluru (Bhive Platinum, Church Street), we provide recruitment consulting and trained employee placement services pan-India.",
        },
      },
      {
        "@type": "Question",
        name: "What roles/levels can you hire for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We cater to junior, mid-level, and senior management roles across software engineering, business operations, sales, customer support, and financial analysts.",
        },
      },
      {
        "@type": "Question",
        name: "How much does your service cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our pricing is structured based on the service model, candidate level, and volume of hires. Contact our advisory team directly at connect@talentyconsulting.in for a custom proposal.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Talenty different from large job portals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike standard job boards that deliver thousands of unfiltered resumes, Talenty works as an extension of your HR team. We vet, interview, train, and deliver only a shortlist of highly qualified, job-ready candidates.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply book a consultation session on our website contact page, email your requirements to connect@talentyconsulting.in, or call our Church Street office in Bengaluru at +91-8431119696.",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ paths }: { paths: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      item: p.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PageFAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PageServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "Talenty Consulting",
      url: SITE_URL,
      telephone: SITE_PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_STREET,
        addressLocality: "Bengaluru",
        addressRegion: SITE_REGION,
        postalCode: SITE_POSTAL,
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    serviceType: "Recruitment and Staffing",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PersonSchema() {
  const founders = [
    {
      name: "Rajesh Kumar",
      jobTitle: "Co-Founder & Managing Director",
      worksFor: "Talenty Consulting",
      url: `${SITE_URL}/about`,
    },
    {
      name: "Anita Deshmukh",
      jobTitle: "Co-Founder & Head of Talent Acquisition",
      worksFor: "Talenty Consulting",
      url: `${SITE_URL}/about`,
    },
  ]

  const schemas = founders.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.name,
    jobTitle: f.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: f.worksFor,
      url: SITE_URL,
    },
    url: f.url,
  }))

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
