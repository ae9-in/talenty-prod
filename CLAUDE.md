# Talenty Consulting — Design System & Conventions

This file exists so every page on this site reads as one product, not a
collage of templates. Read it before touching anything under `app/` or
`components/landing`, `components/public`.

## Stack

- Next.js App Router, React, TypeScript, Tailwind v4 (CSS-first config in
  `app/globals.css`, no `tailwind.config`).
- `framer-motion` for mount transitions and interactive micro-motion (menus,
  hover states, marquees).
- `gsap` + `ScrollTrigger` for scroll-linked reveals — see
  `components/landing/scroll-reveal.tsx` (`<Reveal>` / `<RevealGroup>`).
  Use these instead of hand-rolling new `whileInView` blur logic.
- `lucide-react` for icons.

## The reference implementation

`app/page.tsx` (homepage), `components/landing/navbar.tsx`,
`components/landing/footer.tsx`, and `app/register/page.tsx` are the
canonical implementation of this design language. When a page or component
looks inconsistent with those four files, it is wrong — bring it in line,
don't invent a new direction.

The generic AI-template look this system replaced (and must not regress
to) was: `glass` / `glass-card` utility classes, `bg-gradient-to-r ...
bg-clip-text text-transparent` on every heading, icon-in-a-rounded-square +
one-line-platitude value-prop grids ("Mission-Driven", "People First"),
`bg-white/5 backdrop-blur-xl` cards, and generic CTA copy ("Ready to Find
Your Perfect Team?"). None of that belongs here anymore.

## Color system — 60/30/10

The brand palette is sampled directly from the physical business card artwork:

- **60% — Cream neutrals** (`--color-cream` `#F7F2E4`, `--color-cream-alt` `#F0E9D5`). This is the dominant surface of every page. Most sections sit on `#F7F2E4`; alternate sections use `#F0E9D5` at partial opacity to separate rhythm without introducing a new hue.
- **30% — Royal Navy** (`--color-navy` `#0D2D42` for headings, `--color-navy-muted` `#3A5570` for body copy). The footer and one structural section per page (e.g. the benchmarks band) invert to a full `#0D2D42` background — that's the sanctioned "dark slab" moment per page.
- **10% — Gold accent** (`--color-gold` `#C18A18` for CTA buttons, active pills, indicators, small highlight marks, and metallic gradient `--color-gold-gradient` `#7C601D` → `#F7E9A7` for the 3D logo monogram). Gold is strictly an accent, never a large background fill.

Gradients (`bg-gradient-to-r from-primary to-accent bg-clip-text`) are banned for headline text. If a word needs emphasis, make it `italic font-normal text-[#C18A18]` inside a `font-serif` heading — that's the house style.

## Typography

- **Fraunces** (`font-serif`) — all headlines. Semibold, tight tracking,
  large sizes (`text-4xl` mobile up to `text-7xl`/`text-8xl` for hero-level
  statements). One word per headline in italic + olive as the emphasis
  device.
- **Inter** (`font-sans`) — body copy, buttons, nav.
- **JetBrains Mono** (`font-mono`) — eyebrows/labels only, always
  `uppercase tracking-widest text-[10.5–11px]`, often prefixed with `· `.
  Also used for stat captions and eyebrow badges.

## Layout conventions

- Max width `max-w-[1440px]`, horizontal padding `px-6 lg:px-10`.
- Section rhythm: generous vertical padding (`py-20`–`py-28`), decorative
  blur orbs (`rounded-full blur-3xl`, low opacity, accent or ink tinted)
  plus `grid-bg` texture behind hero/CTA sections — never both at full
  opacity, keep it faint (`opacity-10` to `opacity-30`).
  scroll a full section into view without being invasive.
- Cards: `border border-foreground/10`, `bg-[#EEE9DC]/50` or
  `bg-[#FFFCF5]`, `rounded-2xl`/`rounded-3xl`, hover state is
  `hover:border-foreground/30 transition-all` — not a drop shadow bloom.
- Real, specific numbers beat vague claims: "41 enriched", "94% Match",
  "3.2× faster" — not "Lightning Fast" or "Best in Class".

## Animation & motion

- Every section below the fold should reveal with `<Reveal>` (fade + rise +
  blur-to-sharp via GSAP ScrollTrigger). Grids of cards use `<RevealGroup>`
  for a staggered version of the same effect.
- Reserve `framer-motion` for things GSAP shouldn't own: the navbar's
  slide-down on mount, the mobile menu's height animation, hover
  micro-interactions on individual elements.
- Respect `prefers-reduced-motion` — `<Reveal>` already checks this; don't
  bypass it with raw `gsap.to` calls elsewhere without the same guard.
- Marquees, count-up numbers, and typewriter placeholders (see footer
  newsletter input) are the site's signature "living" touches — reuse this
  vocabulary before inventing a new animation idiom.

## Copy voice

Confident, specific, editorial — not generic SaaS marketing. Say what
actually happens ("Two job offers are accepted. Onboarding sequences queue
up.") instead of value-prop platitudes ("We help you succeed"). Avoid: "Ready
to get started?", "What sets us apart", stock icon+adjective grids
("Mission-Driven", "People First", "Quality Focused"). Every page should
read like it was written by someone who has actually run this recruiting
desk, not generated from a template.

## Page inventory

- `/` — homepage, canonical reference.
- `/register` — canonical reference for form styling (floating labels,
  password strength meter, split-screen layout).
- `/about`, `/contact`, `/blog`, `/talent-screening-process`,
  `/trained-employee-placement`, `/it-staffing-bangalore`,
  `/recruitment-consulting-bangalore` — must match the reference
  implementation's language above.
- `/consultation` — intentionally a redirect to `/contact`, leave as is.
- `/admin` — internal tool, not held to the marketing-site design system.

## Things not to do

- Don't add `glass` / `glass-card` back.
- Don't gradient-fill headline text.
- Don't invent a new accent color for "just this one section."
- Don't write a new icon+platitude value-prop grid — if a page needs to
  list virtues, ground each one in a specific mechanism or number instead.
