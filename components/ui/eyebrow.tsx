import React from "react"
import { cn } from "@/lib/utils"

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: "default" | "on-dark" | "badge"
  as?: "span" | "div" | "p" | "h4" | "h5" | "h6"
  className?: string
  prefixDot?: boolean
}

export function Eyebrow({
  children,
  variant = "default",
  as: Component = "span",
  className,
  prefixDot = false,
  ...props
}: EyebrowProps) {
  const variantStyles = {
    default: "text-[#1D3F91] font-mono text-[11px] uppercase tracking-widest font-semibold",
    "on-dark": "text-[#93B4F8] font-mono text-[10.5px] uppercase tracking-widest font-bold",
    badge:
      "inline-flex items-center rounded-full border border-[#1D3F91]/25 bg-[#1D3F91]/10 px-4 py-1.5 text-[10.5px] uppercase font-mono tracking-widest text-[#1D3F91] font-semibold",
  }

  return (
    <Component
      className={cn(
        "select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {prefixDot && <span className="opacity-70 mr-1.5">·</span>}
      {children}
    </Component>
  )
}
