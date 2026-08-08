import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Recruitment Consulting & Staffing Agency in Bengaluru"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "Recruitment Consulting & Staffing in Bengaluru",
    subtitle: "Pre-vetted, job-ready talent for Bengaluru companies",
  })
}
