import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Candidate Vetting & Talent Screening Process"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "Candidate Vetting & Screening Process",
    subtitle: "Cognitive, skill & behavioral evaluation before shortlist",
  })
}
