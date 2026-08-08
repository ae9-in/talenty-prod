"use client"

import { trackEvent } from "@/lib/analytics"

export function TrackedTelLink({
  phone,
  className = "hover:text-foreground",
}: {
  phone: string
  className?: string
}) {
  const href = `tel:${phone.replace(/[^\d+]/g, "")}`
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent({ name: "phone_click", params: { phone } })}
    >
      {phone}
    </a>
  )
}

export function TrackedMailtoLink({
  email,
  className = "hover:text-foreground",
}: {
  email: string
  className?: string
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={() => trackEvent({ name: "email_click", params: { email } })}
    >
      {email}
    </a>
  )
}
