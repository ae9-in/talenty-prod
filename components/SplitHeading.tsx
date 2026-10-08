"use client"

import React from "react"

type Props = {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "span"
  className?: string
}

export function SplitHeading({ text, as: Tag = "h2", className }: Props) {
  const words = text.split(" ")
  return (
    <Tag className={className}>
      {/* The ONLY copy crawlers and screen readers consume */}
      <span className="sr-only">{text}</span>

      {/* Visual animation layer — excluded from the a11y tree */}
      <span aria-hidden="true" className="split-visual inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="split-word inline-block">
            {word}
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </span>
    </Tag>
  )
}
