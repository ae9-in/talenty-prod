"use client"

import LogoLoop from "@/components/LogoLoop"

const clientNode = (name: string) => (
  <span className="client-wordmark">{name}</span>
)

const bengaluru = [
  "AKAR Design Studio",
  "Anantapadmam Builders",
  "Cubic Associates",
  "GIS Realty and Infra",
  "Growthians Marketing",
  "IYLA Constructions and Structural Consultants",
  "Mayukam Tech Services",
  "PANDAeCe",
  "Preethi Architects",
  "Sixth Realm Architecture & Interior Design",
  "Wright Inspires India",
  "Z Axis Design Studio",
  "iOceane Branding",
].map((name) => ({ node: clientNode(name), title: name }))

const chennai = [
  "BS Createch",
  "Beyond Digital Marketing Agency",
  "Creative Design",
  "Creative Style Homes",
  "Kite Media",
  "MALARCHI",
  "Next Space Architects",
  "OneHub Digital Marketing & IT Services",
  "P & P Marketing",
  "Upshift Graphics",
  "Vortex Engineering",
].map((name) => ({ node: clientNode(name), title: name }))

const pune = [
  "Comprehensive Cloud Technologies",
  "Interior Elevation",
  "Lonar Technologies",
  "Ramchandra Sabhagruha",
  "SME Cargo",
].map((name) => ({ node: clientNode(name), title: name }))

// Tailwind px-6 = 24px, lg:px-10 = 40px. The LogoLoop fade mask width
// should match these exactly so the fade edge aligns with the padded
// container edge where the city label sits.
// We pass this as a CSS custom property via style, which the CSS uses
// as --logoloop-fade-width.
const FADE_COLOR = "#F7F2E4"
const FADE_COLOR_TRANSPARENT = "rgba(247, 242, 228, 0)"

export function TrustedClients() {
  return (
    <section
      className="clients-section py-20 border-y border-[#15120F]/10 bg-[#F7F2E4] relative"
      id="clients"
    >
      {/* ── Anchor + heading — inside padded container ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">

        {/* Anchor — Piramal Finance Limited, fixed, not looping */}
        <div className="client-anchor p-6 sm:p-8 rounded-2xl border border-[#15120F]/15 bg-[#F0E9D5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="client-anchor__tag text-xs font-mono text-[#8A6420] uppercase tracking-wider block mb-1">
              Pune
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
            30 businesses we&apos;ve placed talent with across Bengaluru, Chennai and Pune
          </h2>
          <p className="clients-heading text-sm sm:text-base text-[#5C5449] leading-relaxed">
            Direct recruitment engagements across engineering, architecture studios, technology consultancies, digital agencies, and enterprise finance.
          </p>
        </div>
      </div>

      {/* ── Marquee rows — full-bleed so the scrolling content runs edge-to-edge.
           Each row has:
           1. A city label INSIDE the padded container — left edge = container padding.
           2. A LogoLoop that breaks out to full viewport width — left edge = 0.
              The LogoLoop's fade mask width matches the container's horizontal
              padding so that readable text starts at the same x-position as the
              city label above it, making them visually aligned.
      ── */}
      <div className="pt-12 space-y-10">

        {/* ── Bengaluru row ── */}
        <div>
          {/* Label is inside padded container — left edge matches px-6/lg:px-10 */}
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Bengaluru
            </span>
          </div>
          {/* Loop is full-bleed — but fade mask width = px-6 (24px) / lg:px-10 (40px)
              so the first readable character aligns with the label above */}
          <LogoLoop
            logos={bengaluru}
            speed={40}
            direction="left"
            logoHeight={22}
            gap={56}
            pauseOnHover
            fadeOut
            fadeOutColor={FADE_COLOR}
            ariaLabel="Bengaluru clients"
            style={{
              '--logoloop-fade-width': 'clamp(24px, 2.8vw, 40px)',
              '--logoloop-fadeColorTransparent': FADE_COLOR_TRANSPARENT,
            } as React.CSSProperties}
          />
        </div>

        {/* ── Chennai row ── */}
        <div>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Chennai
            </span>
          </div>
          <LogoLoop
            logos={chennai}
            speed={40}
            direction="right"
            logoHeight={22}
            gap={56}
            pauseOnHover
            fadeOut
            fadeOutColor={FADE_COLOR}
            ariaLabel="Chennai clients"
            style={{
              '--logoloop-fade-width': 'clamp(24px, 2.8vw, 40px)',
              '--logoloop-fadeColorTransparent': FADE_COLOR_TRANSPARENT,
            } as React.CSSProperties}
          />
        </div>

        {/* ── Pune row ── */}
        <div>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Pune
            </span>
          </div>
          <LogoLoop
            logos={pune}
            speed={40}
            direction="left"
            logoHeight={22}
            gap={56}
            pauseOnHover
            fadeOut
            fadeOutColor={FADE_COLOR}
            ariaLabel="Pune clients"
            style={{
              '--logoloop-fade-width': 'clamp(24px, 2.8vw, 40px)',
              '--logoloop-fadeColorTransparent': FADE_COLOR_TRANSPARENT,
            } as React.CSSProperties}
          />
        </div>
      </div>

    </section>
  )
}
