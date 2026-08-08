import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Book a Recruitment Consultation with Talenty"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "Book a Recruitment Consultation",
    subtitle: "Bengaluru HQ · Mon–Sat, 9 AM–6 PM · Pan-India support",
  })
}
