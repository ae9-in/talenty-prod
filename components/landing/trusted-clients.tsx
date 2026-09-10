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

export function TrustedClients() {
  return (
    <section className="clients-section py-20 border-y border-[#15120F]/10 bg-[#F7F2E4] relative overflow-hidden" id="clients">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
        
        {/* Anchor — fixed, not looping */}
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

        {/* Honest framing line — no internal-status language */}
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#141110] leading-tight">
            30 businesses we&apos;ve placed talent with across Bengaluru, Chennai and Pune
          </h2>
          <p className="clients-heading text-sm sm:text-base text-[#5C5449] leading-relaxed">
            Direct recruitment engagements across engineering, architecture studios, technology consultancies, digital agencies, and enterprise finance.
          </p>
        </div>

        {/* Wordmark LogoLoop marquee rows */}
        <div className="space-y-10 pt-4">
          <div className="client-row space-y-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Bengaluru
            </span>
            <LogoLoop
              logos={bengaluru}
              speed={40}
              direction="left"
              logoHeight={22}
              gap={56}
              pauseOnHover
              fadeOut
              fadeOutColor="#F7F2E4"
              ariaLabel="Bengaluru clients"
            />
          </div>

          <div className="client-row space-y-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Chennai
            </span>
            <LogoLoop
              logos={chennai}
              speed={40}
              direction="right"
              logoHeight={22}
              gap={56}
              pauseOnHover
              fadeOut
              fadeOutColor="#F7F2E4"
              ariaLabel="Chennai clients"
            />
          </div>

          <div className="client-row space-y-3">
            <span className="client-row__city text-xs font-mono font-semibold uppercase tracking-widest text-[#8A6420]">
              Pune
            </span>
            <LogoLoop
              logos={pune}
              speed={40}
              direction="left"
              logoHeight={22}
              gap={56}
              pauseOnHover
              fadeOut
              fadeOutColor="#F7F2E4"
              ariaLabel="Pune clients"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
