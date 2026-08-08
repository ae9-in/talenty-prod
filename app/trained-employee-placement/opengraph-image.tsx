import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Hire Pre-Trained, Job-Ready Employees"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "Hire Pre-Trained, Job-Ready Employees",
    subtitle: "Source → train → vet → place · with 90-day support",
  })
}
