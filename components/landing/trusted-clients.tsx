"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CONVERTED_CLIENTS, CLIENT_CITY_COUNTS, ClientCity } from "@/data/convertedClients"

type CityFilter = 'All' | ClientCity

export function TrustedClients() {
  const [activeCity, setActiveCity] = useState<CityFilter>('All')

  const anchorClient = CONVERTED_CLIENTS.find(c => c.tier === 'anchor')
  const filteredClients = CONVERTED_CLIENTS.filter(c => {
    if (activeCity === 'All') return c.tier !== 'anchor'
    return c.city === activeCity && c.tier !== 'anchor'
  })

  // Show anchor client on "All" or when "Pune" is selected
  const showAnchor = activeCity === 'All' || activeCity === 'Pune'

  return (
    <section className="py-20 border-y border-[#15120F]/10 bg-[#F0E9D5]/50 relative overflow-hidden" id="clients">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#15120F]/10">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A6420] font-semibold block">
              · VERIFIED CONVERSIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#141110] leading-tight tracking-tight">
              30 businesses we&apos;ve placed talent with across{" "}
              <span className="italic font-normal text-[#8A6420]">Bengaluru, Chennai, and Pune</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5C5449] leading-relaxed pt-1">
              Direct recruitment conversions and hiring engagements across architecture studios, technology consultancies, digital agencies, and enterprise finance.
            </p>
          </div>

          {/* City Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
            {(['All', 'Bengaluru', 'Chennai', 'Pune'] as CityFilter[]).map((city) => {
              const count = city === 'All' ? CLIENT_CITY_COUNTS.total : CLIENT_CITY_COUNTS[city]
              const isActive = activeCity === city

              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#15120F] text-[#F7F2E4] border-[#15120F] shadow-sm'
                      : 'bg-[#F7F2E4] text-[#5C5449] border-[#15120F]/15 hover:border-[#15120F]/40 hover:text-[#141110]'
                  }`}
                >
                  <span className="font-medium">{city}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#CD9534] text-[#15120F] font-bold'
                        : 'bg-[#15120F]/5 text-[#5C5449]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Anchor Placement: Piramal Finance Limited */}
        {showAnchor && anchorClient && (
          <div className="pt-10 pb-6">
            <div className="border border-[#15120F]/20 bg-[#F7F2E4] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-[#8A6420]/40 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#CD9534]/20 text-[#8A6420] font-semibold border border-[#CD9534]/30">
                    Enterprise Anchor
                  </span>
                  <span className="font-mono text-[11px] text-[#5C5449]">
                    {anchorClient.city} Hub
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#141110] tracking-tight">
                  {anchorClient.name}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#5C5449] block">
                  Placement Category
                </span>
                <span className="font-sans text-xs text-[#141110] font-medium">
                  Finance & Operations Staffing
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 29 Standard Converted Businesses Grid */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-4">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#5C5449]">
              {activeCity === 'All' ? 'All Converted Clients' : `${activeCity} Cohort`} ({filteredClients.length + (showAnchor ? 1 : 0)})
            </span>
            <span className="font-mono text-[10px] text-[#8A6420] uppercase tracking-widest">
              Typeset Client Registry · Verified Data
            </span>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client) => (
                <motion.div
                  key={client.name}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="border border-[#15120F]/12 bg-[#F7F2E4] rounded-xl p-4.5 flex flex-col justify-between min-h-[92px] hover:border-[#15120F]/30 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-serif font-semibold text-base sm:text-[17px] text-[#141110] leading-snug group-hover:text-[#8A6420] transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#15120F]/5 mt-2">
                    <span className="font-mono text-[10.5px] text-[#5C5449] tracking-wide">
                      {client.city}
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#15120F]/5 text-[#5C5449]">
                      Converted
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom verification footnote */}
        <div className="mt-12 pt-6 border-t border-[#15120F]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#5C5449]">
          <div>
            Verified from 2026 hiring conversion logs across Karnataka, Tamil Nadu, and Maharashtra.
          </div>
          <div className="flex items-center gap-4">
            <span>Bengaluru: 13</span>
            <span>·</span>
            <span>Chennai: 11</span>
            <span>·</span>
            <span>Pune: 6</span>
          </div>
        </div>

      </div>
    </section>
  )
}
