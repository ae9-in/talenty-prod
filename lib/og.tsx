import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

export function createOgImage({
  title,
  subtitle = "Talenty Consulting · Bengaluru",
}: {
  title: string
  subtitle?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #0ea5e9 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Talenty Consulting
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 48 : 56,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, opacity: 0.88, lineHeight: 1.4 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", fontSize: 22, opacity: 0.75 }}>
          www.talentyconsulting.in
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
