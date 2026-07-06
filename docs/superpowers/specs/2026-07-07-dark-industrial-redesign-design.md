# kapadiya.net Dark Industrial Redesign — Design Spec

**Date:** 2026-07-07
**Status:** Approved

## Goal

Reposition kapadiya.net from "PHP/Laravel freelancer" to "AI Engineer at Shopos AI," and evolve the visual design from light industrial to a dark, motion-rich industrial system with an ASCII terrain shader hero.

## Decisions Made

| Question | Decision |
|---|---|
| Professional identity | AI-focused engineer; PHP/Laravel is history, not headline |
| Employer | Name Shopos AI explicitly |
| Freelance mentions | Remove entirely (also remove Laravel Artisan community block) |
| Skills format | Grouped tech, no percentage ratings |
| Visual direction | Industrial design language, flipped dark, with motion |
| Hero live element | ASCII terrain shader (canvas) |
| Redesign scope | Whole site: homepage + blog index + blog posts |
| Homepage structure | Work-centric (Now strip + Projects section) |
| Featured projects | google-photos-backup, helium-drm-fixer, astro-takumi, sumie |

## Content & Positioning

### Hero
- ASCII terrain shader canvas behind hero content.
- Label: `Vikas Kapadiya — AI Engineer`
- Headline: punchy two-line format (direction: "I build with AI." — final copy at implementation).
- Subline: one sentence — a decade of shipping on the web, now building AI products at Shopos AI.
- Profile card stays (photo, name, role); status row becomes `AI Engineer @ Shopos AI` (no freelance status).

### Now strip (new)
Short section: current role at Shopos AI and current focus (agents, LLM tooling). One line each.

### Projects (new)
Four cards: google-photos-backup (261★), helium-drm-fixer (78★), astro-takumi (30★ — used by this site itself), sumie (NativePHP iOS manga reader). Each: name, one-line description, stars, GitHub link. sumie is swappable for takumi-playground/Astrofolio if preferred later.

### Skills (rebuilt)
Grouped tech, no ratings:
- **AI/LLM:** Claude API, agents, RAG, MCP
- **Languages:** TypeScript, Python, PHP
- **Web:** React, Node.js, Astro, Laravel, Tailwind
- **Infra:** AWS, Docker, MySQL, Postgres, Redis

Groups are a draft; user refines specifics at content review.

### About (rewritten)
Trajectory arc in 2–3 paragraphs: started with PHP, decade of full-stack (Laravel/Node/React), now AI products at Shopos AI. Social grid stays (GitHub, LinkedIn, X, Bluesky, Instagram, Email). Laravel Artisan community block removed.

### Writing (new on homepage)
Recent posts from the content collection, linking to /blog. Replaces the unused light-themed BlogSection component.

### Homepage order
Hero → Now → Projects → Skills → About (+ socials) → Writing → Footer.
Header nav: Home / Projects / About / Blog.

## Visual System

- Dark industrial: background ~`#111113`, slightly lighter surface panels, off-white text `#f2f0ec`, muted gray secondary.
- Orange accent retained (`#ff6b2c` family).
- Same design bones: mono uppercase labels, hard 1px borders, grid-partitioned panels, numbered rows, no border radius.
- Existing Tailwind 4 theme tokens (`ind-accent`, `text-primary`, `border-strong`, …) remapped to dark values in `global.css`; components mostly keep class names. Hardcoded light colors fixed per-component.

### ASCII terrain shader (hero)
- `<canvas>` behind hero content: simplex/Perlin-noise heightfield rendered as ASCII characters (` .:-=+*#%@` density ramp), slowly flowing; cursor proximity distorts the field.
- Rendered in accent orange at low opacity; gradient scrim keeps hero text readable.
- Implementation: 2D canvas with precomputed glyph atlas (drawImage per cell); no WebGL needed. ~40–60 columns, scales with viewport. Capped at 30fps; paused via IntersectionObserver when off-screen.
- Degradation: `prefers-reduced-motion` → static frame; no-JS → plain dark background; any canvas failure → clean dark hero (wrapped in try/catch).
- 21st Dev MCP used to source/generate a starting component, adapted to Astro + palette.

### Motion elsewhere (restrained)
- Scroll-reveal on section entries (extend existing IntersectionObserver pattern).
- Blinking status dots, subtle hover states on grid cells.
- No parallax, no scroll-jacking.

## Blog

- `BlogLayout`, blog index, and MDX components (CodeBlock, ProTip, etc.) restyled to dark palette — mostly via central token remap, plus per-component fixes for hardcoded colors.
- Reading surfaces slightly elevated/lighter than page background for long-form comfort.

## Unchanged

- Astro 7 / Tailwind 4 / React 19 / Bun stack.
- SEO setup (astro-seo, sitemap, JSON-LD) — Person jobTitle updates to "AI Engineer".
- OG image generation via astro-takumi.
- Content collections and MDX pipeline.
- No new client-side data fetching.

## Testing

- `bun run build` clean.
- Lighthouse: performance ≥ 90 with shader running.
- Manual: reduced-motion behavior, mobile (shader density scales down), no-JS render, blog post readability in dark.
