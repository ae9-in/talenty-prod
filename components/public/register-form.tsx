"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { CheckCircle2, Briefcase, UserCheck, UploadCloud, FileText, X } from "lucide-react"

type UserType = "recruiter" | "recruitee"

const RECRUITING_TYPES = [
  "Trained Employee Placement (Zero Ramp-up)",
  "Pre-Vetted Technical Staffing",
  "Contract & Project-Based Hiring",
  "Leadership & Executive Search",
  "Bulk Graduate & Campus Hiring",
  "Other Recruiting Requirement",
]

const TARGET_ROLES = [
  "Full Stack Developer",
  "Frontend Engineer (React / Next.js)",
  "Backend Engineer (Node / Python / Java)",
  "Data Scientist / AI & ML Engineer",
  "DevOps / Cloud & SRE Engineer",
  "Mobile App Developer (iOS / Android / Flutter)",
  "QA & Automation Engineer",
  "Product Manager / UI-UX Designer",
  "Other Engineering Role",
]

export function RegisterForm() {
  const [userType, setUserType] = useState<UserType>("recruiter")
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    recruitingType: RECRUITING_TYPES[0],
    interestedRole: TARGET_ROLES[0],
    description: "",
    companyName: "",
    resumeUrl: "",
    resumeName: "",
  })

  const [tosChecked, setTosChecked] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Resume file size should be less than 10MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        resumeUrl: reader.result as string,
        resumeName: file.name,
      }))
      setErrorMessage("")
    }
    reader.onerror = () => {
      setErrorMessage("Failed to read file. Please try again.")
    }
    reader.readAsDataURL(file)
  }

  const removeResume = () => {
    setFormData((prev) => ({
      ...prev,
      resumeUrl: "",
      resumeName: "",
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!tosChecked) {
      setErrorMessage("You must agree to the Terms of Service & Privacy Policy.")
      return
    }

    if (userType === "recruitee" && !formData.resumeUrl) {
      setErrorMessage("Please attach your resume to complete candidate registration.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        userType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        recruitingType: userType === "recruiter" ? formData.recruitingType : undefined,
        interestedRole: userType === "recruitee" ? formData.interestedRole : undefined,
        description: formData.description,
        companyName: userType === "recruiter" ? formData.companyName : undefined,
        resumeUrl: userType === "recruitee" ? formData.resumeUrl : undefined,
        resumeName: userType === "recruitee" ? formData.resumeName : undefined,
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Unable to complete registration.")
      }

      setIsSubmitted(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center max-w-[420px] mx-auto py-8 space-y-6 animate-fade-in">
        <div className="w-24 h-24 rounded-3xl bg-[#F4EFE5] shadow-lg flex items-center justify-center mx-auto border border-[#15120F]/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1D3F91]/10 to-[#101F45]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CheckCircle2 className="w-12 h-12 text-[#1D3F91] relative z-10" />
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[10px] text-[#1D3F91] uppercase tracking-widest font-semibold">
            · Registration Confirmed
          </div>
          <h2 className="text-3xl font-serif font-semibold tracking-tight text-[#141110]">
            {userType === "recruiter" ? "We're on it." : "Profile Received."}
          </h2>
          <p className="text-[14.5px] leading-relaxed text-[#5C5449]">
            {userType === "recruiter" ? (
              <>
                Thank you, <b className="text-[#141110]">{formData.fullName}</b>. Our technical talent leads are reviewing your hiring requirements for <b className="text-[#141110]">{formData.recruitingType}</b> and will reach out to <b className="text-[#141110]">{formData.email}</b> within 2 business hours.
              </>
            ) : (
              <>
                Thank you, <b className="text-[#141110]">{formData.fullName}</b>. Your resume and candidate profile for <b className="text-[#141110]">{formData.interestedRole}</b> have been submitted to our talent curation team.
              </>
            )}
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex justify-center items-center gap-2 w-full py-3.5 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm tracking-wide rounded-2xl border border-[#1D3F91] transition-all shadow-sm"
          >
            Return to Home
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                recruitingType: RECRUITING_TYPES[0],
                interestedRole: TARGET_ROLES[0],
                description: "",
                companyName: "",
                resumeUrl: "",
                resumeName: "",
              })
            }}
            className="text-xs font-mono text-[#5C5449] hover:text-[#141110] underline"
          >
            Submit another registration
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recruiter / Recruitee Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-[#EFE9DC] p-1.5 rounded-2xl border border-[#141110]/10">
        <button
          type="button"
          onClick={() => setUserType("recruiter")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
            userType === "recruiter"
              ? "bg-[#1D3F91] text-[#FFFFFF] shadow-md"
              : "text-[#5C5449] hover:text-[#141110] hover:bg-[#FBF8F2]/60"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>I'm a Recruiter</span>
        </button>
        <button
          type="button"
          onClick={() => setUserType("recruitee")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
            userType === "recruitee"
              ? "bg-[#1D3F91] text-[#FFFFFF] shadow-md"
              : "text-[#5C5449] hover:text-[#141110] hover:bg-[#FBF8F2]/60"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>I'm a Candidate</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="fullName" className="block text-xs font-mono font-medium text-[#5C5449]">
            Full Name <span className="text-[#1D3F91]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder={userType === "recruiter" ? "e.g. Rahul Sharma" : "e.g. Priya Nair"}
            className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50"
          />
        </div>

        {/* Email & Phone in 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-mono font-medium text-[#5C5449]">
              {userType === "recruiter" ? "Work Email" : "Email Address"} <span className="text-[#1D3F91]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={userType === "recruiter" ? "name@company.com" : "name@gmail.com"}
              className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block text-xs font-mono font-medium text-[#5C5449]">
              Phone Number <span className="text-[#1D3F91]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50"
            />
          </div>
        </div>

        {/* Dynamic Section: Recruiter Fields vs Candidate Fields */}
        {userType === "recruiter" ? (
          <>
            {/* Recruiting Requirement Type */}
            <div className="space-y-1">
              <label htmlFor="recruitingType" className="block text-xs font-mono font-medium text-[#5C5449]">
                Type of Recruiting Needed <span className="text-[#1D3F91]">*</span>
              </label>
              <select
                id="recruitingType"
                name="recruitingType"
                value={formData.recruitingType}
                onChange={handleChange}
                className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all"
              >
                {RECRUITING_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Name (Optional) */}
            <div className="space-y-1">
              <label htmlFor="companyName" className="block text-xs font-mono font-medium text-[#5C5449]">
                Company / Organization Name <span className="text-xs text-[#5C5449]/70">(Optional)</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Acme Tech Labs Pvt Ltd"
                className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50"
              />
            </div>

            {/* Description of Hiring Needs */}
            <div className="space-y-1">
              <label htmlFor="description" className="block text-xs font-mono font-medium text-[#5C5449]">
                Hiring Requirements & Description <span className="text-[#1D3F91]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe roles needed, key skills (e.g. Python, React), seniority level, headcount, and hiring timeline..."
                className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50 resize-none"
              />
            </div>
          </>
        ) : (
          <>
            {/* Interested Domain / Role */}
            <div className="space-y-1">
              <label htmlFor="interestedRole" className="block text-xs font-mono font-medium text-[#5C5449]">
                Target Role / Domain <span className="text-[#1D3F91]">*</span>
              </label>
              <select
                id="interestedRole"
                name="interestedRole"
                value={formData.interestedRole}
                onChange={handleChange}
                className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Description / Summary of Skills */}
            <div className="space-y-1">
              <label htmlFor="description" className="block text-xs font-mono font-medium text-[#5C5449]">
                Professional Summary & Skills <span className="text-[#1D3F91]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly state your years of experience, core tech stack, recent projects, and availability..."
                className="w-full bg-[#F4EFE5] border border-[#141110]/15 focus:border-[#1D3F91] focus:ring-1 focus:ring-[#1D3F91] rounded-xl px-4 py-3 text-base sm:text-sm text-[#141110] outline-none transition-all placeholder:text-[#5C5449]/50 resize-none"
              />
            </div>

            {/* Resume Upload Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-[#5C5449]">
                Resume / CV <span className="text-[#1D3F91]">*</span> <span className="text-[11px] text-[#5C5449]/70">(PDF, DOC, DOCX up to 10MB)</span>
              </label>

              {formData.resumeName ? (
                <div className="flex items-center justify-between p-3.5 bg-[#EFE9DC] border border-[#1D3F91]/30 rounded-xl">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="w-5 h-5 text-[#1D3F91] shrink-0" />
                    <span className="text-xs font-mono font-medium text-[#141110] truncate max-w-[240px]">
                      {formData.resumeName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="p-1 text-[#5C5449] hover:text-red-600 transition-colors"
                    title="Remove resume"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#141110]/20 hover:border-[#1D3F91] bg-[#F4EFE5] rounded-xl p-4 text-center cursor-pointer transition-colors group"
                >
                  <UploadCloud className="w-6 h-6 text-[#5C5449] group-hover:text-[#1D3F91] mx-auto mb-1.5 transition-colors" />
                  <p className="text-xs font-mono text-[#141110] font-medium">
                    Click to upload your resume
                  </p>
                  <p className="text-[10px] text-[#5C5449]">
                    Supports PDF, DOC, DOCX
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Terms agreement */}
        <label className="flex items-start gap-2.5 font-mono text-[11px] text-[#5C5449] leading-relaxed cursor-pointer py-1 select-none">
          <input
            type="checkbox"
            checked={tosChecked}
            onChange={(e) => setTosChecked(e.target.checked)}
            className="mt-0.5 border border-[#141110]/20 rounded bg-[#FFFFFF] text-[#1D3F91] focus:ring-0 focus:outline-none"
          />
          <span>
            I agree to Talenty's{" "}
            <Link href="/terms" className="underline underline-offset-2 text-[#141110] font-semibold hover:text-[#1D3F91]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2 text-[#141110] font-semibold hover:text-[#1D3F91]">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {errorMessage && (
          <div className="text-xs font-mono text-[#1D3F91] bg-[#1D3F91]/10 border border-[#1D3F91]/30 px-3.5 py-2.5 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm tracking-wide rounded-2xl border border-[#1D3F91] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin" />
              <span>Submitting Registration...</span>
            </>
          ) : (
            <span>
              {userType === "recruiter" ? "Submit Hiring Requirement" : "Submit Candidate Profile"}
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
