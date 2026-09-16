"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

const requirementOptions = ["Counseling", "Consulting", "Hiring Support", "Staffing", "Training"]
const industryOptions = ["IT & Software", "Banking & Finance", "Healthcare", "Manufacturing", "Retail", "Education", "Hospitality", "Other"]

export function EnquiryForm({ buttonLabel = "Request consultation call" }: { buttonLabel?: string }) {
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

    const messageLength = formData.message.trim().length
    if (messageLength < 10) {
      setErrorMessage(`Please share counseling or consulting details (still needs ${10 - messageLength} more characters).`)
      return
    }

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
      <div className="p-8 md:p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#F0E9D5] shadow-xs flex items-center justify-center mx-auto border border-[#CD9534]/30 mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#8A6420]" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#141110]">
          Enquiry <span className="text-[#CD9534] italic font-normal">received.</span>
        </h3>
        <p className="text-sm text-[#5C5449] leading-relaxed max-w-sm mx-auto">
          Your request is with our consulting team. Expect a response with feasibility details within one business day.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 inline-flex items-center justify-center border border-[#15120F]/15 hover:border-[#15120F]/30 bg-[#FFFFFF] rounded-2xl px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-[#141110] transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
      <div className="border-b border-[#15120F]/10 pb-4">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#CD9534] font-bold block mb-1">
          · Book Counseling / Consulting
        </span>
        <h3 className="text-xl font-serif font-bold text-[#141110]">
          Requirement Intake Form
        </h3>
        <p className="text-xs text-[#5C5449] leading-relaxed mt-1">
          Share your hiring or counseling requirements and our team will respond with structured next steps.
        </p>
      </div>

      {/* Row 1: Full name & Company name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Full name</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Company name</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Corp"
            required
          />
        </div>
      </div>

      {/* Row 2: Email & Phone number */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Email address</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Phone number</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
          />
        </div>
      </div>

      {/* Row 3: Requirement Type & Industry */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Requirement type</label>
          <select
            name="requirementType"
            value={formData.requirementType}
            onChange={handleChange}
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all cursor-pointer"
          >
            {requirementOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Industry vertical</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all cursor-pointer"
          >
            {industryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Roles Required & Headcount */}
      <div className="grid gap-4 sm:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Roles required</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="rolesRequired"
            value={formData.rolesRequired}
            onChange={handleChange}
            placeholder="e.g. Senior Backend Lead, ML Ops"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Headcount</label>
          <input
            className="w-full h-12 rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] px-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40"
            name="employeesNeeded"
            type="number"
            inputMode="numeric"
            min="1"
            value={formData.employeesNeeded}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Row 5: Message */}
      <div className="space-y-1.5">
        <label className="font-mono text-[11px] font-semibold text-[#5C5449] block">Requirement details & timeline</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border border-[#15120F]/15 bg-[#FFFFFF] p-3.5 text-base sm:text-sm text-[#141110] outline-none focus:border-[#CD9534] focus:ring-2 focus:ring-[#CD9534]/20 transition-all placeholder:text-[#5C5449]/40 resize-none"
          placeholder="Describe target technology stack, timeline constraints, and experience expectations..."
          required
        />
        {formData.message.trim().length > 0 && formData.message.trim().length < 10 && (
          <p className="text-xs font-mono text-[#8A6420]">
            Still needs {10 - formData.message.trim().length} more characters.
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="text-xs font-mono text-[#141110] bg-[#F0E9D5] border border-[#CD9534]/40 px-3.5 py-2.5 rounded-xl">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 min-h-[48px] bg-[#CD9534] hover:bg-[#B37F26] text-[#15120F] font-bold text-sm tracking-wide rounded-2xl shadow-[4px_4px_0px_0px_rgba(21,18,15,0.9)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(21,18,15,0.9)] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-[#15120F]/30 border-t-[#15120F] rounded-full animate-spin" />
            <span>Submitting request...</span>
          </>
        ) : (
          <span>{buttonLabel}</span>
        )}
      </button>
    </form>
  )
}
