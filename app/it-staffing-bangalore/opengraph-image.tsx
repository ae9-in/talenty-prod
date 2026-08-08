import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "IT Staffing & Tech Recruitment in Bengaluru"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "IT Staffing & Tech Recruitment in Bengaluru",
    subtitle: "Developers, QA, DevOps & data talent — job-ready",
  })
}
