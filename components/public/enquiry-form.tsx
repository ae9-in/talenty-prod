"use client"

import { useState } from "react"
import { Briefcase, Building2, CheckCircle, Mail, MessageSquare, Phone, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const requirementOptions = ["Counseling", "Consulting", "Hiring Support", "Staffing", "Training"]
const industryOptions = ["IT & Software", "Banking & Finance", "Healthcare", "Manufacturing", "Retail", "Education", "Hospitality", "Other"]

export function EnquiryForm({ buttonLabel = "Submit Enquiry" }: { buttonLabel?: string }) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    requirementType: requirementOptions[0],
    industry: industryOptions[0],
    rolesRequired: "",
    employeesNeeded: "1",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          employeesNeeded: Number(formData.employeesNeeded),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit enquiry.")
      }

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        requirementType: requirementOptions[0],
        industry: industryOptions[0],
        rolesRequired: "",
        employeesNeeded: "1",
        message: "",
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-3xl glass-card p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-foreground">Enquiry Submitted</h3>
        <p className="mb-6 text-muted-foreground">
          Your counseling or consulting request has been saved successfully. Our Talenty team will reach out soon.
        </p>
        <Button variant="outline" className="border-border/50" onClick={() => setIsSubmitted(false)}>
          Submit Another Enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl glass-card p-6 md:p-8 space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Book Counseling / Consulting</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your hiring or counseling requirements and our team will respond with the right next steps.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Requirement Type</label>
          <select name="requirementType" value={formData.requirementType} onChange={handleChange} className="flex h-11 w-full rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground outline-none focus:border-primary/50">
            {requirementOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Industry</label>
          <select name="industry" value={formData.industry} onChange={handleChange} className="flex h-11 w-full rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground outline-none focus:border-primary/50">
            {industryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Roles Required</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="rolesRequired" value={formData.rolesRequired} onChange={handleChange} placeholder="Sales Executive, Recruiter, Java Developer" required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Employees Needed</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="employeesNeeded" type="number" min="1" value={formData.employeesNeeded} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Message / Counseling Details</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="min-h-[136px] w-full rounded-md border border-border/50 bg-secondary/40 pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary/50" placeholder="Describe your counseling, consulting, staffing, or hiring requirement in detail." required />
        </div>
      </div>

      {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90">
        {isSubmitting ? "Submitting..." : buttonLabel}
      </Button>
    </form>
  )
}

