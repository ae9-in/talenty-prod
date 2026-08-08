"use client"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Calendar, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { BLOG_POSTS } from "@/lib/blog-posts"

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Talenty Blog & Resources</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold md:text-5xl">
              Recruitment &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Workforce Insights
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Guides on trained placement, hiring agencies, IT staffing, and screening — built to rank
              for real commercial intent.
            </p>
          </div>
        </div>
      </header>

      <section className="pb-32" aria-label="Blog articles">
        <div className="container mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col gap-4 rounded-3xl border border-border/40 glass-card p-8 transition-all hover:border-primary/30"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
                >
                  Read Full Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
