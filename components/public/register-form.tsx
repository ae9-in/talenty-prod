"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

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
  const [tosChecked, setTosChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [pwStrength, setPwStrength] = useState({ score: 0, label: "—", colorClass: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Password strength check
  useEffect(() => {
    const pw = formData.password
    if (!pw) {
      setPwStrength({ score: 0, label: "—", colorClass: "" })
      return
    }

    let score = 0
    if (pw.length >= 6) score += 1
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1
    if (/\d/.test(pw)) score += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pw)) score += 1

    let label = "Weak"
    let colorClass = "bg-[#1D3F91]/40"

    if (score === 2) {
      label = "Fair"
      colorClass = "bg-[#1D3F91]/70"
    } else if (score === 3) {
      label = "Good"
      colorClass = "bg-[#1D3F91]"
    } else if (score >= 4) {
      label = "Strong"
      colorClass = "bg-[#101F45]"
    }

    setPwStrength({ score, label, colorClass })
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    if (!tosChecked) {
      setErrorMessage("You must agree to the Terms of Service.")
      return
    }

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
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center max-w-[420px] mx-auto py-8 space-y-8 animate-fade-in">
        {/* Success Icon */}
        <div className="w-28 h-28 rounded-3xl bg-[#F4EFE5] shadow-lg flex items-center justify-center mx-auto border border-[#15120F]/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1D3F91]/10 to-[#101F45]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CheckCircle2 className="w-14 h-14 text-[#1D3F91] relative z-10" />
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[10px] text-[#1D3F91] uppercase tracking-widest font-semibold">
            · Account Created
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#141110]">
            You're <span className="text-[#1D3F91]">in.</span>
          </h1>
          <p className="text-[14.5px] leading-relaxed text-[#5C5449] max-w-[36ch] mx-auto">
            We sent a verification link to <b className="text-[#141110]">{formData.email}</b>. Open it and we'll take you into your fresh workspace.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex justify-center items-center gap-2 w-full max-w-[280px] py-3.5 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm tracking-wide rounded-2xl border border-[#1D3F91] transition-all shadow-sm"
        >
          Go to dashboard
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="fullName"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.fullName ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Full name
        </label>
      </div>

      {/* Email */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="email"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.email ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Work email
        </label>
      </div>

      {/* Phone */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="phone"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.phone ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Work phone number
        </label>
      </div>

      {/* Role Interest */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="text"
          id="interestedRole"
          name="interestedRole"
          required
          value={formData.interestedRole}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="interestedRole"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.interestedRole ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Interested role / Hiring domain
        </label>
      </div>

      {/* Company Name */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="companyName"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.companyName ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Company name (optional)
        </label>
      </div>

      {/* Password */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="password"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.password ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Password
        </label>
      </div>

      {/* Password Strength Meter */}
      {formData.password && (
        <div className="space-y-1.5 px-1">
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4].map((barIndex) => (
              <div
                key={barIndex}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  barIndex <= pwStrength.score
                    ? pwStrength.colorClass
                    : "bg-[#0D2D42]/10"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center font-mono text-[10px] text-[#3A5570]">
            <span>Password strength</span>
            <span className="font-bold text-[#0D2D42] uppercase tracking-wider">{pwStrength.label}</span>
          </div>
        </div>
      )}

      {/* Confirm Password */}
      <div className="relative border border-[#0D2D42]/18 bg-[#F7F2E4] rounded-xl px-3.5 pt-5 pb-1.5 focus-within:ring-2 focus-within:ring-[#0D2D42] transition-all">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-transparent border-0 outline-none text-base sm:text-sm text-[#0D2D42]"
        />
        <label
          htmlFor="confirmPassword"
          className={`absolute left-3.5 top-3.5 text-xs text-[#3A5570] font-sans transition-all pointer-events-none origin-left ${
            formData.confirmPassword ? "-translate-y-2 scale-75" : ""
          } focus-within:-translate-y-2 focus-within:scale-75`}
        >
          Confirm password
        </label>
      </div>

      {/* TOS Checklist */}
      <label className="flex items-start gap-2.5 font-mono text-[11px] text-[#5C5449] leading-relaxed cursor-pointer py-1 select-none">
        <input
          type="checkbox"
          checked={tosChecked}
          onChange={(e) => setTosChecked(e.target.checked)}
          className="mt-0.5 border-2 border-[#15120F]/18 rounded-md bg-[#FFFFFF] text-[#1D3F91] focus:ring-0 focus:ring-offset-0 focus:outline-none"
        />
        <span>
          I agree to Talenty's{" "}
          <a href="#" className="underline underline-offset-2 text-[#141110] font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 text-[#141110] font-semibold">
            Privacy Policy
          </a>
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
        className="w-full py-4 bg-[#1D3F91] hover:bg-[#3358B8] text-[#FFFFFF] font-bold text-sm tracking-wide rounded-2xl border border-[#1D3F91] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create account</span>
          </>
        )}
      </button>
    </form>
  )
}
