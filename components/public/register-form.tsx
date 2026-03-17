"use client"

import { useState } from "react"
import { Briefcase, Building2, CheckCircle, Lock, Mail, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interestedRole: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Unable to complete registration.")
      }

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        interestedRole: "",
        companyName: "",
        password: "",
        confirmPassword: "",
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
        <h3 className="mb-3 text-2xl font-bold text-foreground">Registration Complete</h3>
        <p className="mb-6 text-muted-foreground">
          Your details have been saved. The Talenty team can now review your profile from the admin panel.
        </p>
        <Button variant="outline" className="border-border/50" onClick={() => setIsSubmitted(false)}>
          Register Another User
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl glass-card p-6 md:p-8 space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Register with Talenty Consulting</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a profile so our consulting team can track your role interests and connect you with the right opportunities.
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
          <label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Role / Industry Interested</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="interestedRole" value={formData.interestedRole} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Company Name</label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10 bg-secondary/40 border-border/50" name="companyName" value={formData.companyName} onChange={handleChange} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 bg-secondary/40 border-border/50" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </div>
      </div>

      {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90">
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  )
}

