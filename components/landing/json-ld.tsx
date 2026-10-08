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
    "@type": "EmploymentAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "Talenty Consulting",
    alternateName: "Talenty Consulting Bengaluru",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/talenty-logo-full.png`,
    },
    image: `${SITE_URL}/images/talenty-logo-full.png`,
    description:
      "Talenty Consulting is a Bengaluru-based HR and recruitment consultancy providing recruitment consulting, IT staffing, trained employee placement and talent screening for companies across India.",
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
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
      latitude: 12.9749,
      longitude: 77.6083,
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Pune" },
    ],
    knowsAbout: [
      "Recruitment consulting",
      "IT staffing",
      "Trained employee placement",
      "Hire-train-deploy",
      "Candidate screening",
      "Technical vetting",
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Talenty Consulting",
    publisher: { "@id": `${SITE_URL}/#organization` },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is recruitment consulting and how does Talenty help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recruitment consulting is a strategic partnership where experts guide organizations in talent acquisition, employer branding, and optimization of hiring processes. Talenty Consulting helps businesses structure their staffing workflows to attract and hire the best fits.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide trained employees or only recruitment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer both! Our core differentiator is Trained Employee Placement, where we source candidates and upskill them in specific tech, domain, or operational skills prior to deployment, ensuring day-one productivity.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can you fill an urgent role?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For critical or pre-screened staffing requirements, we offer Fast Hiring Solutions that can place candidates in as little as 3 to 10 business days without compromising on candidate quality or cultural fit.",
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
        name: "What industries and locations do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our primary office is located on Church Street in Bengaluru (Bhive Platinum), but we provide recruitment consulting and trained employee placement services pan-India across IT & Software, BFSI, Healthcare, Retail, and Manufacturing.",
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
    itemListElement: paths.map((p, i) => {
      const item: { "@type": string; position: number; name: string; item?: string } = {
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
      }
      if (i < paths.length - 1 || p.url) {
        item.item = p.url
      }
      return item
    }),
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
  serviceType,
}: {
  name: string
  description: string
  url: string
  serviceType?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: serviceType || name,
    description,
    url,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Pune" },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

