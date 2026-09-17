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

## Color system V4 — 65% Cream / 35% Royal Blue (Gold Retired Sitewide)

- **65% — Cream base** (`--cream` `#FBF8F2`, `--cream-deep` `#F4EFE5`, `--cream-line` `#E7DFD0`). The dominant surface of every page, all card backgrounds, and body text containers.
- **35% — Royal Blue family** (`--royal` `#1D3F91`, `--royal-bright` `#3358B8`, `--royal-deep` `#101F45`). The authoritative brand accent and structural layer. Used for all primary CTA button fills, eyebrow/kicker labels sitewide, verification checkmarks, active stage nodes, badges, dark section slabs (e.g. operational signals band and footer in `--royal-deep`), and interactive hover states.
- **Gold Retired Sitewide (0%)**: Gold has been completely retired from the persistent site UI on every page. All checkmarks, badges, borders, and buttons are royal blue or neutral line tones. (The original trademark bitmap assets `/images/talenty-logo-full.png` and `talenty-monogram.png` remain pristine).

Gradients and colored italic words inside headlines are strictly prohibited.

## Typography & Eyebrow Architecture

- **Fraunces** (`font-serif`) — all headlines. Semibold, tight tracking, large sizes (`text-4xl` up to `text-7xl`/`text-8xl`).
- **Inter** (`font-sans`) — body copy, buttons, nav.
- **JetBrains Mono** (`font-mono`) — eyebrows/labels only, always standardized using the shared `<Eyebrow>` component from `components/ui/eyebrow.tsx`.
  - On cream surfaces: renders in `--royal` (`#1D3F91`, 9.12:1 AAA).
  - On dark surfaces: `<Eyebrow variant="on-dark">` renders in light royal (`#93B4F8`).
  - Badge variant: `<Eyebrow variant="badge">` for pill kickers.

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
