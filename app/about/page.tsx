"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Briefcase, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const teamValues = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We are committed to bridging the gap between talented professionals and companies seeking excellence."
  },
  {
    icon: Heart,
    title: "People First",
    description: "We believe in building lasting relationships with both our clients and candidates."
  },
  {
    icon: Award,
    title: "Quality Focused",
    description: "We maintain the highest standards in candidate screening and placement processes."
  },
  {
    icon: TrendingUp,
    title: "Growth Oriented",
    description: "We help businesses scale efficiently while nurturing career growth for professionals."
  }
]

const milestones = [
  { year: "2018", event: "Founded in Mumbai with a vision to transform hiring" },
  { year: "2019", event: "Expanded to Bangalore and Delhi NCR regions" },
  { year: "2021", event: "Crossed 250+ successful placements milestone" },
  { year: "2023", event: "Launched specialized IT and tech recruitment division" },
  { year: "2024", event: "Partnered with 100+ companies across India" },
]

const stats = [
  { value: "500+", label: "Placements" },
  { value: "100+", label: "Partner Companies" },
  { value: "6+", label: "Years Experience" },
  { value: "95%", label: "Client Retention" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">About Talenty Consulting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Talent Acquisition
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Founded with a mission to transform how companies find and hire talent, Talenty Consulting has become a leading name in recruitment and staffing solutions across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Story</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Talenty Consulting was founded by Rajesh Kumar and Anita Deshmukh in 2018 with a simple yet powerful vision: to make hiring easier, faster, and more effective for businesses of all sizes.
                </p>
                <p>
                  With backgrounds in HR and corporate recruitment, our founders recognized the challenges companies face in finding the right talent. They set out to create a consultancy that truly understands both employer needs and candidate aspirations.
                </p>
                <p>
                  Today, we have grown into a full-service recruitment firm with a team of dedicated professionals who share our passion for connecting great talent with great opportunities.
                </p>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0 group">
                  <Link href="/consultation">
                    Work With Us
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Our Journey
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-16 h-8 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pt-1">{milestone.event}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Talenty Consulting.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">What Sets Us Apart</h3>
              <div className="space-y-4">
                {[
                  "Deep understanding of Indian job market dynamics",
                  "Personalized approach for each client and candidate",
                  "Rigorous screening and verification process",
                  "Long-term partnership focus, not transactional hiring",
                  "Industry-specific expertise across multiple sectors",
                  "Transparent communication throughout the process"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Perfect Team?
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you are looking to hire skilled professionals or seeking your next career opportunity, we are here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0 group">
                  <Link href="/consultation">
                    Book a Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
