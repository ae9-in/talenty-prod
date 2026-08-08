import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Talenty Consulting — Recruitment Consulting & Staffing in Bengaluru"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "Recruitment Consulting & Staffing in Bengaluru",
    subtitle: "Hire trained, job-ready employees fast · Talenty Consulting",
  })
}
