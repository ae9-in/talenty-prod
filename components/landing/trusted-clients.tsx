"use client"

import LogoLoop from "@/components/LogoLoop"

const clientNode = (name: string) => (
  <span className="client-wordmark">{name}</span>
)

const bengaluru = [
  "AKAR Design Studio",
  "Cubic Associates",
  "GIS Realty and Infra",
  "Growthians Marketing",
  "Mayukam Tech Services",
  "PANDAeCe",
  "Preethi Architects",
  "Wright Inspires India",
  "Z Axis Design Studio",
  "iOceane Branding",
].map((name) => ({ node: clientNode(name), title: name }))

// Tailwind px-6 = 24px, lg:px-10 = 40px. The LogoLoop fade mask width
// aligns with the padded container edge so readable text starts cleanly.
const FADE_COLOR = "#FBF8F2"
const FADE_COLOR_TRANSPARENT = "rgba(251, 248, 242, 0)"

export function TrustedClients() {
  return (
    <section
      className="clients-section py-20 border-y border-[#15120F]/10 bg-[#FBF8F2] relative"
      id="clients"
    >
      {/* ── Anchor + heading — inside padded container ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">

        {/* Anchor — Piramal Finance Limited, fixed, not looping */}
        <div className="client-anchor p-6 sm:p-8 rounded-2xl border border-[#15120F]/15 bg-[#F4EFE5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="client-anchor__tag text-xs font-mono text-[#1D3F91] uppercase tracking-wider block mb-1 font-semibold">
              Enterprise Client
            </span>
            <h3 className="client-anchor__name font-serif text-2xl sm:text-3xl font-bold text-[#141110]">
              Piramal Finance Limited
            </h3>
          </div>
          <div>
            <span className="client-anchor__category text-xs sm:text-sm font-mono text-[#5C5449]">
              Finance &amp; Operations Staffing
            </span>
          </div>
        </div>

        {/* Framing headline */}
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#141110] leading-tight">
            Companies we&apos;re collaborating with
          </h2>
          <p className="clients-heading text-sm sm:text-base text-[#5C5449] leading-relaxed">
            Direct recruitment engagements across engineering, architecture studios, technology consultancies, digital agencies, and enterprise finance.
          </p>
        </div>
      </div>

      {/* ── Single elevated marquee row — spacious, unhurried, full-bleed ── */}
      <div className="pt-12 w-full overflow-hidden">
        <LogoLoop
          logos={bengaluru}
          speed={24}
          direction="left"
          logoHeight={26}
          gap={88}
          pauseOnHover
          fadeOut
          fadeOutColor={FADE_COLOR}
          ariaLabel="Companies we're collaborating with"
          style={{
            '--logoloop-fade-width': 'clamp(24px, 2.8vw, 40px)',
            '--logoloop-fadeColorTransparent': FADE_COLOR_TRANSPARENT,
          } as React.CSSProperties}
        />
      </div>

    </section>
  )
}

