export type AnalyticsEvent =
  | { name: "generate_lead"; params?: Record<string, string | number | boolean> }
  | { name: "phone_click"; params?: Record<string, string | number | boolean> }
  | { name: "email_click"; params?: Record<string, string | number | boolean> }
  | { name: "book_consultation_click"; params?: Record<string, string | number | boolean> }

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return
  if (typeof window.gtag === "function") {
    window.gtag("event", event.name, event.params ?? {})
  }
}
