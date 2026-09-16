"use client"

import { Calendar, User, BookOpen } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { RollingHeadline } from "@/components/landing/rolling-headline"
import { Reveal, RevealGroup } from "@/components/landing/scroll-reveal"

const blogPosts = [
  {
    title: "How to Hire Trained Employees in India: The Complete Guide (2026)",
    slug: "how-to-hire-trained-employees-india",
    excerpt: "A practical guide to hiring, domain upskilling, and retaining technical talent across India. Why pre-trained placement models outperform traditional keyword matching.",
    date: "June 01, 2026",
    author: "Talenty Consulting",
    readTime: "8 min read"
  }
]

export default function BlogIndex() {
  return (
    <main className="min-h-screen min-h-dvh bg-[#F7F2E4] text-[#0D2D42] font-sans selection:bg-[#C18A18] selection:text-[#0D2D42]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[380px] bg-gradient-to-b from-[#C18A18]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C18A18] font-semibold block mb-4">
              · OPERATIONAL INSIGHTS & BENCHMARKS
            </span>
            
            <RollingHeadline
              line1="Recruitment &"
              accent="workforce field notes."
              line2="From the desks running them."
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-[1.02] text-[#0D2D42]"
            />

            <p className="mt-4 text-lg text-[#3A5570] leading-relaxed">
              Technical hiring playbooks, domain compensation analysis, and recruitment process breakdowns.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-32 max-w-5xl mx-auto px-6 lg:px-10">
        <RevealGroup className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="border border-[#0D2D42]/10 bg-[#F7F2E4] rounded-3xl p-8 hover:border-[#0D2D42]/30 transition-all flex flex-col md:flex-row gap-8 items-start shadow-xs"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-[#3A5570] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C18A18]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C18A18]" />
                    {post.author}
                  </span>
                  <span className="bg-[#C18A18]/20 text-[#0D2D42] px-2.5 py-0.5 rounded-full font-semibold border border-[#C18A18]/30">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0D2D42]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#C18A18] transition-colors">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-[#3A5570] leading-relaxed text-sm md:text-base max-w-2xl">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#0D2D42] font-bold text-sm hover:text-[#C18A18] transition-colors group pt-2"
                >
                  Read full article
                </Link>
              </div>
            </article>
          ))}
        </RevealGroup>
      </section>

      <Footer />
    </main>
  )
}
