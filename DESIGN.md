---
name: kapadiya.net
description: Dark industrial personal site — the Machine Shop design system
colors:
  shop-floor: "#141414"
  surface-panel: "#1e1e1e"
  surface-elevated: "#282828"
  safety-orange: "#f25c05"
  safety-orange-hover: "#ff7a2e"
  safety-orange-muted: "#f25c0533"
  ink-on-accent: "#000000"
  text-primary: "#e8e4df"
  text-secondary: "#a8a29e"
  text-muted: "#9c9590"
  border-soft: "#ffffff14"
  border-medium: "#ffffff1f"
  border-strong: "#ffffff33"
  status-green: "#52b788"
  tweet-blue: "#1d9bf0"
  syntax-error-red: "#f87171"
typography:
  display:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "clamp(2.25rem, 10vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  displayCompact:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  articleTitle:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  prose:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  subhead:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  small:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono Variable, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  micro:
    fontFamily: "Geist Mono Variable, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  embedTitle:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
  embedName:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
  embedMeta:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
  ogBrand:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "22px"
    fontWeight: 700
  ogMeta:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "20px"
    fontWeight: 700
  ogDisplay:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "62px"
    fontWeight: 700
    lineHeight: 1.03
  ogBody:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  avatar: "9999px"
spacing:
  gutter: "24px"
  gutter-wide: "48px"
  card: "28px"
  section: "clamp(56px, 8vw, 80px)"
  container-max: "1440px"
  ledger-rail-compact: "320px"
  ledger-rail-wide: "360px"
components:
  button-primary:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.ink-on-accent}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: "{colors.shop-floor}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.label}"
  chip-tag:
    backgroundColor: "{colors.shop-floor}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  card-project:
    backgroundColor: "{colors.shop-floor}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  card-project-hover:
    backgroundColor: "{colors.surface-panel}"
---

# Design System: kapadiya.net

## 1. Overview

**Creative North Star: "The Machine Shop"**

A dark shop floor where work is logged and proof is easy to inspect. The system is precise, understated, and technical: near-black surfaces (#141414), hard 1px hairline borders in place of shadows, monospaced uppercase labels, zero border radius anywhere, and one Safety Orange accent (#f25c05) that marks interaction the way caution paint marks a machine edge. Craft is implied by the evidence, never announced.

The system explicitly rejects the corporate/resume site (stiff LinkedIn-in-website-form, headshot-and-timeline energy) and the overdesigned showpiece (Awwwards-style scroll-jacking that buries content under effects). Motion exists — a cursor-reactive dot-grid canvas behind the hero, a rotating headline, scroll reveals, blinking status dots — but it is restrained, 30fps-capped, and always degrades cleanly under `prefers-reduced-motion`.

**Key Characteristics:**
- Dark, flat, grid-partitioned surfaces separated by 1px borders, not gaps or shadows
- A shared evidence rail: 320px at compact desktop and 360px at wide desktop, aligned across navigation, hero, work, writing, and footer
- One accent color; its rarity is its authority
- Monospace uppercase micro-labels as the system's navigational voice
- Square corners everywhere — radius is 0, globally and deliberately
- Motion as ambient machinery: the hero dot field plus direct interaction feedback, capped and reduced-motion-safe
- Varied evidence layouts: one featured project, compact project rows, a working-profile split, and a writing ledger instead of repeated card grids

## 2. Colors

A near-monochrome dark ramp with a single industrial accent; color means something is interactive, active, or alive.

### Primary
- **Safety Orange** (#f25c05): The one voice of the system. Marks CTAs, active nav states, links, the logo block, section kickers, and the cursor-glow in the hero canvas. Text set directly on it is pure black (#000000) for maximum contrast.
- **Safety Orange Hover** (#ff7a2e): Hover shift for links and accented text; primary buttons prefer a slight opacity drop (0.85–0.9) over a hue change.
- **Safety Orange Muted** (#f25c0533): 20%-alpha wash for glows and selection-adjacent tints; never for text.

### Neutral
- **Shop Floor** (#141414): The page background. Everything sits on this.
- **Surface Panel** (#1e1e1e): First tonal step up — cards at rest-hover, the profile card, reading surfaces.
- **Surface Elevated** (#282828): Second step — inline code, elevated panels.
- **Text Primary** (#e8e4df): Warm off-white for headings and primary copy.
- **Text Secondary** (#a8a29e): Body copy, nav links at rest.
- **Text Muted** (#9c9590): Metadata, indices, star counts, timestamps.
- **Border Soft / Medium / Strong** (#ffffff14 / #ffffff1f / #ffffff33): White-alpha hairlines. Soft divides within a panel, medium divides sections and the header, strong partitions the load-bearing grids (project cards, hero tag strip).

### Tertiary
- **Status Green** (#52b788): Availability dots and "at work" status only. Never decorative.
- **Tweet Blue** (#1d9bf0): Verified badge color inside the faithful tweet embed only; never part of the site chrome.
- **Syntax Error Red** (#f87171): Error/keyword role inside syntax-highlighted code only.

### Named Rules
**The Safety Orange Rule.** The accent marks interaction, state, and identity. Most screens keep it below 10%; the homepage allows one large orange "inspection tag" in the working-profile section as the sole committed-color moment. Tweet Blue and syntax colors are domain-scoped exceptions, not additions to the site palette. If color is used as filler decoration elsewhere, it is wrong.

**The Hairline Rule.** Separation is drawn, not floated. Adjacent cells share 1px borders (border-collapse thinking); never use gaps plus shadows where a shared hairline grid will do.

## 3. Typography

**Display Font:** Geist Variable (with sans-serif fallback)
**Body Font:** Geist Variable (same family, lighter weights)
**Label/Mono Font:** Geist Mono Variable (with monospace fallback)

**Character:** One geometric-modern family carrying everything through weight and case, with its mono sibling as the technical voice. Headings are bold, uppercase, and tight (-0.025em, never tighter); labels are small, tracked-out mono. The contrast axis is proportional-vs-mono, not font-vs-font.

### Hierarchy
- **Display** (700, clamp(2.25rem, 10vw, 6rem), line-height 0.92): The hero headline only. Uppercase, tracking no tighter than -0.035em, one per page.
- **Display Compact** (700, 4.5rem, line-height 0.94): The hero headline between 1024px and 1279px, where the 320px evidence rail reduces the main text track.
- **Headline** (700, 2.25rem, line-height 1): Section headings. Uppercase, tracking-tight.
- **Subhead** (700, 1.5rem, line-height 1.2): Article subsections and compact feature headings.
- **Title** (700, 1rem–1.125rem): Project rows and article titles.
- **Body** (400, 1rem, line-height 1.625): Paragraphs in Text Secondary, capped at ~560px (roughly 65ch) on marketing surfaces.
- **Prose** (400, 1.0625rem, line-height 1.75): Long-form article copy, capped near 700px.
- **Small** (400, 0.875rem, line-height 1.5): Metadata descriptions and supporting copy.
- **Label** (500, 0.75rem, letter-spacing 0.1em, UPPERCASE, mono): Kickers, nav links, buttons, tags, metadata. The system's most-used voice.
- **Micro** (500, 0.6875rem, letter-spacing 0.1em, UPPERCASE, mono): Code-block controls only.
- **Embed** (400–700, 0.8125rem–0.95rem): Faithful tweet metadata and author/title details only.
- **Open Graph** (20px / 22px / 24px / 62px): Fixed-size social-image output on a 1200×630 canvas; it is separate from the responsive page ramp.

### Named Rules
**The Stamped Label Rule.** Mono + uppercase + 0.1em tracking is this brand's committed labeling system — used for functional labels (nav, kickers, tags, status), applied consistently, and never mixed with a second label style.

## 4. Elevation

The system is flat by doctrine. Depth is conveyed by three tonal steps (#141414 → #1e1e1e → #282828) and the hairline border scale; surfaces sit next to each other, not on top of each other. The redesigned hero integrates the portrait into the page grid, so no component uses a decorative drop shadow.

### Named Rules
**The Flat Floor Rule.** Surfaces are flat. Depth comes from tone and hairlines. A new shadow requires a functional reason, not decoration.

## 5. Components

Machined and exact: square corners, hard borders, uppercase mono labels — parts milled to spec. State changes are tonal or chromatic, never dimensional.

### Buttons
- **Shape:** Perfectly square corners (0 radius)
- **Primary:** Safety Orange (#f25c05) block, black text, mono-style uppercase label at 0.75rem/600 with 0.1em tracking, 12px 24px padding
- **Hover / Focus:** Primary dims to ~85–90% opacity over 240ms; focus is a 2px Safety Orange outline offset 2px. No transforms, no glow.
- **Ghost (secondary):** Transparent with 1px Border Strong; hover swaps border and text to Safety Orange.

### Chips (tags)
- **Style:** 1px Border Medium outline, transparent fill, mono uppercase at 11px with wide tracking, Text Secondary
- **State:** Static metadata; no selected state exists.

### Project Ledger / Containers
- **Corner Style:** 0 radius, always
- **Background:** Transparent or Shop Floor at rest; hover fills with Surface Panel (#1e1e1e)
- **Shadow Strategy:** None (see The Flat Floor Rule)
- **Border:** Shared 1px Border Strong grid. The featured project gets an asymmetric evidence panel; remaining projects render as full-width rows rather than identical cards.
- **Alignment:** The featured evidence panel and every section-level evidence rail use the shared 320px/360px ledger track; near-match percentages are not allowed.
- **Internal Padding:** 28px (p-7)

### Inputs / Fields
The site currently has no form inputs. If one is added: 1px Border Medium on Surface Panel, 0 radius, mono label above, focus ring per the button treatment.

### Navigation
- Fixed header on Shop Floor with a 1px Border Medium bottom rule; 64px tall.
- The primary destinations are Work, About, Notes, and Blog. Links use the Label voice in Text Secondary; hover turns Text Primary and active turns Safety Orange; active links carry `aria-current`.
- GitHub is the persistent primary action at desktop sizes and closes the mobile menu panel.
- The desktop navigation group occupies the same shared ledger track as the content below it, including the outer 1px border in its width calculation.
- A 2px Safety Orange scroll-progress bar grows along the header's bottom edge (scroll-driven animation, reduced-motion-safe).
- Mobile: hamburger toggles a stacked panel under the header; same link treatment.

### Dot-Grid Hero Canvas (signature)
A zero-dependency 2D-canvas dot field behind the hero: 26px-spaced 1.5px dots in Text Primary at 14% alpha, shimmering via value noise, glowing Safety Orange and displacing within 180px of the cursor. Capped at 30fps, paused off-screen, static under `prefers-reduced-motion`, absent without JS. A strong left-to-right Shop Floor scrim keeps the headline readable. This remains the one piece of ambient theater the system allows.

## 6. Do's and Don'ts

### Do:
- **Do** keep every structural corner square. `border-radius: 0` is a brand decision; status dots and identity/avatar media are the only circles.
- **Do** draw separation with shared 1px hairlines (#ffffff14/#ffffff1f/#ffffff33) and tonal steps; adjacent grid cells share borders.
- **Do** reserve Safety Orange (#f25c05) for interaction, state, and the single working-profile identity panel.
- **Do** ship a `prefers-reduced-motion` alternative for every animation, as the dot grid, rotating headline, and scroll reveals already do.
- **Do** back claims with artifacts in the UI itself — current star counts, fork counts, "this site runs on it", and direct repository links. Proof over talk.

### Don't:
- **Don't** drift toward the corporate/resume site: no formal timeline sections, no stiff headshot-and-title layouts, no LinkedIn-in-website-form.
- **Don't** build the overdesigned showpiece: no scroll-jacking, no parallax, no effects that bury content. The dot grid is the theater budget, already spent.
- **Don't** add shadows to cards, buttons, or panels (The Flat Floor Rule).
- **Don't** introduce a second accent hue, gradient text, or glassmorphism; the palette is one orange on a dark neutral ramp.
- **Don't** round corners, soften borders to gray fills, or swap the mono labels for sentence-case — each undoes the machined character.
- **Don't** set gray text below #9c9590 on Shop Floor; muted is the floor of the text ramp, not a starting point for "elegance".
