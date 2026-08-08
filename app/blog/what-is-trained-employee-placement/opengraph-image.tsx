import { createOgImage, ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "What Is Trained Employee Placement? — Talenty Consulting"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return createOgImage({
    title: "What Is Trained Employee Placement?",
    subtitle: "Source → train → vet → place · job-ready hiring explained",
  })
}
