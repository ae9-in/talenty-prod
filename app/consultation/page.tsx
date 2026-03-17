"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle,
  Send,
  Building2,
  User,
  MessageSquare,
  Navigation,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const benefits = [
  "Understand your specific hiring needs",
  "Review our tailored recruitment solutions",
  "Discuss timeline and budget expectations",
  "Get expert advice on talent market trends",
  "No obligation - completely free consultation"
]

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "8431119696",
    href: "tel:+918431119696"
  },
  {
    icon: Mail,
    label: "Email",
    value: "connect@talentyconsulting.in",
    href: "mailto:connect@talentyconsulting.in"
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Bhive Platinum, Church Street",
    href: "#"
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sat: 9:00 AM - 6:00 PM",
    href: "#"
  }
]

const officeHighlights = [
  "Bhive Platinum, MPS / Church Street business district",
  "Quick access for in-person consultation meetings",
  "Ideal for staffing discussions, role planning, and hiring reviews",
]

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your request.")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Book Your Free Consultation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Let&apos;s Discuss Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Hiring Needs
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Schedule a free consultation with our recruitment experts. We will help you find the perfect talent for your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card rounded-2xl p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Request a Consultation</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              name="name"
                              placeholder="Amit Sharma"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              name="email"
                              type="email"
                              placeholder="amit@company.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              name="phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Company Name</label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              name="company"
                              placeholder="Your Company"
                              value={formData.company}
                              onChange={handleChange}
                              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">How can we help you?</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <textarea
                            name="message"
                            placeholder="Tell us about your hiring needs, the roles you are looking to fill, and any specific requirements..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground resize-none"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0 group"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      {errorMessage ? (
                        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                      ) : null}
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-border/50"
                    >
                      Submit Another Request
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Benefits */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">What to Expect</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{info.label}</div>
                        <div className="text-sm font-medium text-foreground">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Note */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Quick Response Guaranteed:</span> Our team typically responds to consultation requests within 24 hours. For urgent hiring needs, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="bhive-platinum" className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="glass-card rounded-3xl overflow-hidden border border-border/40">
            <div className="grid lg:grid-cols-[1.05fr_1.2fr]">
              <div className="p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Bhive Platinum MPS View</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  Visit Us at{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Bhive Platinum
                  </span>
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you would rather meet in person, you can book your consultation and visit our Bhive Platinum location.
                  This map view makes it easy to find the office before your appointment.
                </p>

                <div className="space-y-4 mb-8">
                  {officeHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-secondary/30 border border-border/40 p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Office Address</div>
                      <div className="text-sm text-muted-foreground">Bhive Platinum, Church Street, Bengaluru</div>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bhive+Platinum+Church+Street+Bengaluru"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="min-h-[380px] lg:min-h-full bg-secondary/20">
                <iframe
                  title="Bhive Platinum map view"
                  src="https://www.google.com/maps?q=Bhive%20Platinum%20Church%20Street%20Bengaluru&z=15&output=embed"
                  className="h-full w-full min-h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
