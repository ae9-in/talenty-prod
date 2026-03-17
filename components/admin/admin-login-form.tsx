"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Invalid admin credentials.")
      }

      router.push(result.redirectTo || "/admin/dashboard")
      router.refresh()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl glass-card p-8 space-y-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
        <ShieldCheck className="h-7 w-7 text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Login</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage enquiries, counseling requests, registered users, and admin workflow updates.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Admin Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10 bg-secondary/40 border-border/50" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10 pr-12 bg-secondary/40 border-border/50" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90">
        {isSubmitting ? "Signing In..." : "Login to Dashboard"}
      </Button>
    </form>
  )
}

