# Dark Industrial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition kapadiya.net from "PHP/Laravel freelancer" to "AI Engineer at Shopos AI" with new homepage sections (Now, Projects, Writing), an ASCII terrain shader hero, and restrained motion.

**Architecture:** The site is Astro 7 + Tailwind 4 + React 19, built with Bun. The dark industrial theme tokens ALREADY exist in `src/assets/styles/global.css` (`--bg-main: #141414`, `--ind-accent: #F25C05`, etc.) — this plan does NOT migrate any theme; it rewrites content, adds three section components, adds a zero-dependency 2D-canvas ASCII shader, and extends the existing IntersectionObserver pattern for scroll reveals.

**Tech Stack:** Astro 7, Tailwind CSS 4 (theme tokens via `@theme` in global.css), React 19 (Header only), Bun, 2D canvas (no WebGL, no new dependencies).

**Spec:** `docs/superpowers/specs/2026-07-07-dark-industrial-redesign-design.md`

**21st Dev sourcing note:** The 21st.dev catalog was searched for ASCII shader components; nothing matched (results were Three.js GLSL backgrounds, which violate the no-new-dependencies constraint). The ASCII shader in Task 2 is custom, complete code included.

## Global Constraints

- Build/run with Bun: `bun run build`, `bun run dev`. Build must exit 0 after every task.
- NO new dependencies. Do not edit `package.json` or `bun.lock`.
- Industrial design language: no border radius, mono uppercase labels (`font-mono` + `uppercase` + `tracking-widest`), hard 1px borders using `border-border-strong` / `border-border-soft` / `border-border-medium` tokens, orange accent `text-ind-accent` / `bg-ind-accent`.
- Never mention freelance availability or "Laravel Artisan" anywhere.
- Employer is named explicitly: "Shopos AI". Job title: "AI Engineer".
- All copy below is final-enough to ship; the user will refine copy later. Copy exactly as written — do not improvise different wording.
- Existing theme tokens in `global.css` are correct — do not change token values.
- Commit after every task with the exact message given. Append to every commit message:

```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QefjXHaDKpkkAzpBQeECEh
```

- There is no JS test framework in this repo. The test cycle for every task is: `bun run build` exits 0, plus the specific `grep`/manual checks listed in the task.

---

### Task 1: Content data in config.js

**Files:**
- Modify: `src/config.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `metaData` (updated `title`, `description`), `socialLinks` (unchanged), `skills` (KEPT temporarily — `SkillsSection.astro` still imports it until Task 6), and two new exports:
  - `skillGroups: Array<{ title: string; items: string[] }>`
  - `projects: Array<{ name: string; description: string; stars: string; url: string }>`

- [ ] **Step 1: Rewrite src/config.js**

Replace the entire file with:

```js
const metaData = {
  baseUrl: "https://kapadiya.net",
  title: "Vikas Kapadiya - AI Engineer",
  name: "Vikas Kapadiya",
  description:
    "AI Engineer at Shopos AI. A decade of shipping on the web — now building agents and the LLM tooling around them.",
};

const socialLinks = {
  twitter: "https://x.com/kapadiyavikas",
  github: "https://github.com/vikas5914/",
  instagram: "https://www.instagram.com/kapadiyavikas",
  linkedin: "https://www.linkedin.com/in/vikaskapadiya/",
  email: "mailto:vikas@kapadiya.net",
  bluesky: "https://bsky.app/profile/kapadiya.net",
};

// TEMPORARY: still imported by SkillsSection.astro; removed in the skills rebuild task.
const skills = [
  { name: "PHP/Laravel", level: 95 },
  { name: "Node.js", level: 88 },
  { name: "React/TypeScript", level: 90 },
  { name: "MySQL", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "AWS/DevOps", level: 78 },
];

const skillGroups = [
  {
    title: "AI / LLM",
    items: ["Claude API", "Agents", "RAG", "MCP"],
  },
  {
    title: "Languages",
    items: ["TypeScript", "Python", "PHP"],
  },
  {
    title: "Web",
    items: ["React", "Node.js", "Astro", "Laravel", "Tailwind"],
  },
  {
    title: "Infra",
    items: ["AWS", "Docker", "MySQL", "Postgres", "Redis"],
  },
];

const projects = [
  {
    name: "google-photos-backup",
    description: "Backup your Google Photos library using Playwright automation.",
    stars: "261",
    url: "https://github.com/vikas5914/google-photos-backup",
  },
  {
    name: "helium-drm-fixer",
    description: "TypeScript tooling that repairs DRM-broken media libraries.",
    stars: "78",
    url: "https://github.com/vikas5914/helium-drm-fixer",
  },
  {
    name: "astro-takumi",
    description: "Open Graph image generation for Astro — this site uses it.",
    stars: "30",
    url: "https://github.com/vikas5914/astro-takumi",
  },
  {
    name: "sumie",
    description: "Mobile-first manga reader for iOS, built with NativePHP Mobile.",
    stars: "2",
    url: "https://github.com/vikas5914/sumie",
  },
];

export { metaData, socialLinks, skills, skillGroups, projects };
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/config.js
git commit -m "feat: reposition site metadata, add skill groups and projects data"
```

---

### Task 2: ASCII terrain shader component

**Files:**
- Create: `src/components/AsciiShader.astro`

**Interfaces:**
- Consumes: CSS token `--ind-accent` (#F25C05) — hardcoded as rgb below to avoid per-frame getComputedStyle.
- Produces: `<AsciiShader />` — an absolutely-positioned, full-bleed, `aria-hidden` canvas layer. The PARENT must be `position: relative`. Task 3 mounts it inside the hero.

Behavior contract (from spec):
- Flowing value-noise heightfield rendered as ASCII chars ` .:-=+*#%@` in accent orange at low opacity.
- Cursor proximity raises the field (distortion).
- `prefers-reduced-motion: reduce` → renders ONE static frame, no animation, no pointer tracking.
- Paused via IntersectionObserver when off-screen and on `visibilitychange`.
- Frame rate capped at 30fps. Glyphs pre-rendered to an atlas canvas (no per-cell `fillText`).
- Any runtime failure removes the layer, leaving the plain dark background (whole init is try/catch-wrapped).
- No JS → nothing renders (canvas is empty), dark background shows.

- [ ] **Step 1: Create src/components/AsciiShader.astro**

```astro
---
// Full-bleed ASCII terrain canvas rendered behind hero content.
// Zero dependencies: 2D canvas + value noise. Parent must be position:relative.
---

<div class="absolute inset-0 overflow-hidden" aria-hidden="true" data-ascii-shader>
  <canvas class="block h-full w-full"></canvas>
</div>

<script>
  const CHARS = " .:-=+*#%@";
  const CELL = 14; // CSS px per grid cell
  const FONT_SIZE = 12;
  const ALPHA_LEVELS = 6;
  const MAX_ALPHA = 0.34;
  const FRAME_MS = 1000 / 30; // 30fps cap
  const ACCENT_RGB = "242, 92, 5"; // --ind-accent
  const POINTER_RADIUS = 12; // cells
  const POINTER_STRENGTH = 0.5;

  // --- value noise -----------------------------------------------------
  function hash(x: number, y: number): number {
    let h = (x * 374761393 + y * 668265263) | 0;
    h = (h ^ (h >> 13)) | 0;
    h = (h * 1274126177) | 0;
    return ((h ^ (h >> 16)) >>> 0) / 4294967295;
  }

  function smoothstep(t: number): number {
    return t * t * (3 - 2 * t);
  }

  function valueNoise(x: number, y: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = smoothstep(x - xi);
    const v = smoothstep(y - yi);
    const a = hash(xi, yi);
    const b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1);
    const d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

  function fbm(x: number, y: number): number {
    return (
      valueNoise(x, y) * 0.55 +
      valueNoise(x * 2.1, y * 2.1) * 0.3 +
      valueNoise(x * 4.3, y * 4.3) * 0.15
    );
  }

  // --- shader ----------------------------------------------------------
  function start(root: HTMLElement): void {
    const canvas = root.querySelector("canvas");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Glyph atlas: one column per char, one row per alpha level.
    const atlas = document.createElement("canvas");
    const atlasCell = CELL * dpr;
    atlas.width = atlasCell * CHARS.length;
    atlas.height = atlasCell * ALPHA_LEVELS;
    const actx = atlas.getContext("2d");
    if (!actx) return;
    actx.font = `${FONT_SIZE * dpr}px "Geist Mono", monospace`;
    actx.textAlign = "center";
    actx.textBaseline = "middle";
    for (let level = 0; level < ALPHA_LEVELS; level++) {
      const alpha = (MAX_ALPHA * (level + 1)) / ALPHA_LEVELS;
      actx.fillStyle = `rgba(${ACCENT_RGB}, ${alpha})`;
      for (let c = 0; c < CHARS.length; c++) {
        actx.fillText(
          CHARS[c],
          c * atlasCell + atlasCell / 2,
          level * atlasCell + atlasCell / 2
        );
      }
    }

    let cols = 0;
    let rows = 0;
    let rafId = 0;
    let visible = true;
    let lastFrame = 0;
    const pointer = { col: -1e4, row: -1e4 };

    function resize(): void {
      const rect = root.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / CELL);
      drawFrame(lastTime); // repaint immediately at new size
    }

    let lastTime = 0;
    function drawFrame(t: number): void {
      lastTime = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = t * 0.00005;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let n = fbm(col * 0.09 + time * 2, row * 0.16 + time);
          const dc = col - pointer.col;
          const dr = row - pointer.row;
          const dist = Math.sqrt(dc * dc + dr * dr);
          if (dist < POINTER_RADIUS) {
            n += (1 - dist / POINTER_RADIUS) * POINTER_STRENGTH;
          }
          n = Math.min(0.999, Math.max(0, n));
          const charIdx = Math.floor(n * CHARS.length);
          if (charIdx === 0) continue; // skip spaces entirely
          const level = Math.min(
            ALPHA_LEVELS - 1,
            Math.floor(n * ALPHA_LEVELS)
          );
          ctx.drawImage(
            atlas,
            charIdx * atlasCell,
            level * atlasCell,
            atlasCell,
            atlasCell,
            col * atlasCell,
            row * atlasCell,
            atlasCell,
            atlasCell
          );
        }
      }
    }

    function loop(t: number): void {
      rafId = requestAnimationFrame(loop);
      if (!visible) return;
      if (t - lastFrame < FRAME_MS) return;
      lastFrame = t;
      drawFrame(t);
    }

    new ResizeObserver(resize).observe(root);
    resize();

    if (reduceMotion) {
      drawFrame(0); // single static frame
      return;
    }

    window.addEventListener(
      "pointermove",
      (e) => {
        const rect = root.getBoundingClientRect();
        pointer.col = (e.clientX - rect.left) / CELL;
        pointer.row = (e.clientY - rect.top) / CELL;
      },
      { passive: true }
    );

    new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    }).observe(root);

    document.addEventListener("visibilitychange", () => {
      visible = document.visibilityState === "visible";
    });

    rafId = requestAnimationFrame(loop);
  }

  document.querySelectorAll<HTMLElement>("[data-ascii-shader]").forEach((el) => {
    try {
      start(el);
    } catch {
      el.remove(); // any failure -> clean dark hero
    }
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: exit 0. (Component is not mounted anywhere yet; Astro still type-checks/compiles it as part of the build graph once imported — the real render check happens in Task 3.)

- [ ] **Step 3: Commit**

```bash
git add src/components/AsciiShader.astro
git commit -m "feat: add ASCII terrain shader canvas component"
```

---

### Task 3: Hero rewrite — new copy + shader integration

**Files:**
- Modify: `src/components/HeroSection.astro`

**Interfaces:**
- Consumes: `<AsciiShader />` from Task 2.
- Produces: hero section with `id="home"` (Header scroll-spy depends on this id staying).

- [ ] **Step 1: Replace src/components/HeroSection.astro**

Replace the entire file with:

```astro
---
import { Image } from "astro:assets";
import profile from "@images/profile.jpg";
import AsciiShader from "./AsciiShader.astro";

const tags = ["AI Agents", "LLM Tooling", "Full-Stack Roots"];
---

<section id="home" class="relative pt-24 sm:pt-32 pb-12 sm:pb-18">
  <AsciiShader />
  <!-- Scrim: keeps hero text readable over the shader -->
  <div
    class="absolute inset-0 bg-linear-to-r from-bg-main/85 via-bg-main/60 to-bg-main/30 pointer-events-none"
    aria-hidden="true"
  >
  </div>
  <div class="relative mx-auto max-w-[1440px] px-6 sm:px-12">
    <!-- Main Layout -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 items-center">
      <!-- Left Content -->
      <div>
        <!-- Top Label -->
        <div class="flex items-center gap-3 text-xs font-mono font-medium tracking-widest uppercase text-ind-accent mb-6">
          <div class="w-8 h-px bg-ind-accent"></div>
          Vikas Kapadiya&nbsp;—&nbsp;AI Engineer
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight uppercase text-text-primary mb-8">
          I build with
          <span class="block text-ind-accent">AI.</span>
        </h1>

        <p class="text-base leading-relaxed text-text-secondary max-w-[560px] mb-12">
          Hey, I'm Vikas Kapadiya — AI Engineer at Shopos AI. A decade of
          shipping on the web, now building agents and the LLM tooling
          around them.
        </p>

        <!-- Role Tags -->
        <div class="flex flex-col sm:flex-row flex-wrap border border-border-strong bg-bg-main/60">
          {tags.map((tag, i, arr) => (
            <div
              class:list={[
                "flex items-center gap-2.5 px-5 py-3.5 text-xs font-mono font-medium tracking-wider uppercase text-text-primary",
                i < arr.length - 1 && "sm:border-r border-b sm:border-b-0 border-border-strong",
              ]}
            >
              <div class="w-2 h-2 bg-ind-accent shrink-0"></div>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <!-- Right Content — Profile Card -->
      <div class="bg-surface shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden order-first md:order-none">
        <!-- Profile Image -->
        <div class="relative flex items-center justify-center overflow-hidden w-full h-[360px] bg-ind-accent">
          <Image
            src={profile}
            alt="Vikas Kapadiya"
            class="w-full h-full object-cover"
            width={400}
            height={360}
            loading="eager"
            fetchpriority="high"
          />
          <!-- Overlay -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-between items-center px-5 py-4 bg-black/60">
            <span class="text-xs font-mono tracking-wider uppercase text-white/70">
              Currently
            </span>
            <span class="text-xs font-mono tracking-wider uppercase text-white font-semibold">
              Shopos AI
            </span>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="p-6">
          <div class="text-lg font-bold tracking-tight uppercase text-text-primary mb-2">
            Vikas Kapadiya
          </div>
          <div class="text-xs tracking-wider uppercase text-ind-accent mb-4">
            AI Engineer — Shopos AI
          </div>
          <div class="text-sm leading-relaxed text-text-muted">
            Building AI products at Shopos AI. Before that: a decade of
            full-stack — PHP to Node to TypeScript.
          </div>
        </div>

        <!-- Status Row -->
        <div class="flex justify-between items-center border-t border-border-soft px-6 py-3.5">
          <span class="flex items-center text-xs tracking-wider uppercase text-success font-medium">
            <span class="w-2 h-2 rounded-full bg-success inline-block mr-2"></span>
            AI Engineer @ Shopos AI
          </span>
          <span class="text-xs text-text-muted">
            REV 2026.07
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build and check output HTML**

Run: `bun run build && grep -o "data-ascii-shader" dist/index.html | head -1`
Expected: build exits 0, grep prints `data-ascii-shader`.

Run: `grep -ci "noobs\|PHP 8" dist/index.html`
Expected: `0` (grep exits 1 when count is 0 — that is the pass condition). Do NOT check "freelance" here — it still exists in AboutSection until Task 7; Task 9's final scan covers it.

- [ ] **Step 3: Manual check in dev**

Run: `bun run dev` and open http://localhost:4321
Expected: flowing orange ASCII terrain behind hero text; text readable; field bulges near cursor; with macOS "Reduce motion" enabled the field is static.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.astro
git commit -m "feat: hero repositioned as AI Engineer with ASCII shader background"
```

---

### Task 4: Now section

**Files:**
- Create: `src/components/NowSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: nothing.
- Produces: section with `id="now"`, mounted directly after `<HeroSection />`.

- [ ] **Step 1: Create src/components/NowSection.astro**

```astro
---
const items = [
  { label: "Role", value: "AI Engineer @ Shopos AI" },
  { label: "Focus", value: "Agents & LLM tooling" },
  { label: "Stack", value: "TypeScript · Python · Claude" },
];
---

<section id="now" class="border-t border-border-medium">
  <div class="mx-auto max-w-[1440px] px-6 sm:px-12">
    <div class="grid grid-cols-1 md:grid-cols-[160px_1fr] border-x border-border-strong">
      <div class="flex items-center px-6 py-5 md:border-r border-b md:border-b-0 border-border-strong">
        <span class="flex items-center gap-2.5 text-xs font-mono font-medium tracking-widest uppercase text-ind-accent">
          <span class="w-2 h-2 bg-ind-accent inline-block animate-pulse motion-reduce:animate-none"></span>
          Now
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3">
        {items.map((item, i, arr) => (
          <div
            class:list={[
              "px-6 py-5",
              i < arr.length - 1 && "sm:border-r border-b sm:border-b-0 border-border-strong",
            ]}
          >
            <div class="text-xs font-mono font-medium tracking-widest uppercase text-text-muted mb-1.5">
              {item.label}
            </div>
            <div class="text-sm font-semibold text-text-primary">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Mount in src/pages/index.astro**

In `src/pages/index.astro`, add the import after the `HeroSection` import:

```astro
import NowSection from "../components/NowSection.astro";
```

and change the body to:

```astro
  <HeroSection />
  <NowSection />
  <AboutSection />
  <SkillsSection />
```

- [ ] **Step 3: Verify build**

Run: `bun run build && grep -c 'id="now"' dist/index.html`
Expected: build exits 0, grep prints `1`.

- [ ] **Step 4: Commit**

```bash
git add src/components/NowSection.astro src/pages/index.astro
git commit -m "feat: add Now strip with current role and focus"
```

---

### Task 5: Projects section

**Files:**
- Create: `src/components/ProjectsSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `projects` from `src/config.js` (Task 1): `Array<{ name, description, stars, url }>`.
- Produces: section with `id="projects"` (Header nav in Task 9 links to `/#projects`), mounted after `<NowSection />`.

- [ ] **Step 1: Create src/components/ProjectsSection.astro**

```astro
---
import { projects } from "../config";
---

<section id="projects" class="py-18 border-t border-border-medium">
  <div class="mx-auto max-w-[1440px] px-6 sm:px-12">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12 pb-6 border-b border-border-soft">
      <div>
        <div class="text-xs font-mono font-medium tracking-widest uppercase text-ind-accent mb-3">
          Open Source
        </div>
        <h2 class="text-4xl font-bold tracking-tight uppercase text-text-primary leading-none">
          Projects
        </h2>
      </div>
      <a
        href="https://github.com/vikas5914/"
        target="_blank"
        rel="noopener noreferrer"
        class="no-underline text-xs font-mono font-medium tracking-widest uppercase text-ind-accent hover:text-ind-accent-hover transition-colors duration-[240ms]"
      >
        All repos on GitHub →
      </a>
    </div>

    <!-- Project Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border-strong">
      {projects.map((project, i) => (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          class="group block no-underline p-7 border-r border-b border-border-strong transition-colors duration-[240ms] hover:bg-surface focus-visible:outline-2 focus-visible:outline-ind-accent focus-visible:-outline-offset-2"
        >
          <div class="flex justify-between items-start mb-5">
            <span class="text-sm italic font-mono text-text-muted">
              0{i + 1}
            </span>
            <span class="text-xs font-mono tracking-wider uppercase text-text-muted">
              ★ {project.stars}
            </span>
          </div>
          <div class="text-base font-bold tracking-tight uppercase text-text-primary mb-2 group-hover:text-ind-accent transition-colors duration-[240ms]">
            {project.name}
          </div>
          <div class="text-sm leading-relaxed text-text-muted max-w-[420px]">
            {project.description}
          </div>
          <div class="text-sm text-ind-accent mt-4">→</div>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Mount in src/pages/index.astro**

Add the import after `NowSection`:

```astro
import ProjectsSection from "../components/ProjectsSection.astro";
```

and change the body to:

```astro
  <HeroSection />
  <NowSection />
  <ProjectsSection />
  <AboutSection />
  <SkillsSection />
```

- [ ] **Step 3: Verify build**

Run: `bun run build && grep -c 'id="projects"' dist/index.html && grep -c "google-photos-backup" dist/index.html`
Expected: build exits 0, both greps print ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSection.astro src/pages/index.astro
git commit -m "feat: add open-source projects section"
```

---

### Task 6: Skills section rebuild — grouped tech, no ratings

**Files:**
- Modify: `src/components/SkillsSection.astro` (full replacement)
- Modify: `src/config.js` (remove the `skills` export)

**Interfaces:**
- Consumes: `skillGroups` from `src/config.js` (Task 1).
- Produces: section keeps `id="skills"`. After this task `skills` no longer exists — nothing else imports it (BlogSection/Button do not; verify with grep in Step 3).

- [ ] **Step 1: Replace src/components/SkillsSection.astro**

Replace the entire file with:

```astro
---
import { skillGroups } from "../config";
---

<section id="skills" class="bg-ind-accent text-text-on-accent">
  <div class="mx-auto max-w-[1440px] px-6 sm:px-12">
    <div class="grid grid-cols-1 md:grid-cols-2 border border-text-on-accent/30">
      <!-- Left Pane -->
      <div class="flex flex-col justify-between md:border-r border-b md:border-b-0 border-text-on-accent/30 px-6 py-12 sm:px-12 sm:py-18 md:min-h-[600px]">
        <div>
          <div class="text-xs font-mono font-medium tracking-widest uppercase text-text-on-accent mb-4">
            Technical Data
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-text-on-accent leading-none mb-6">
            What I Work With
          </h2>
          <p class="text-base leading-relaxed text-text-on-accent max-w-[400px]">
            The current toolkit — AI systems up front, a decade of web
            infrastructure underneath. No percentage bars; either I ship
            with it or I don't.
          </p>
        </div>
        <div class="flex flex-wrap justify-between items-end gap-6 mt-10 md:mt-0">
          <div class="flex flex-col gap-1.5">
            <div class="text-4xl font-bold tracking-tight text-text-on-accent leading-none tabular-nums">
              10+
            </div>
            <div class="text-xs font-mono tracking-wider uppercase text-text-on-accent">
              Years Shipping
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <div class="text-4xl font-bold tracking-tight text-text-on-accent leading-none tabular-nums">
              30+
            </div>
            <div class="text-xs font-mono tracking-wider uppercase text-text-on-accent">
              Open-Source Repos
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <div class="text-4xl font-bold tracking-tight text-text-on-accent leading-none tabular-nums">
              600+
            </div>
            <div class="text-xs font-mono tracking-wider uppercase text-text-on-accent">
              GitHub Stars
            </div>
          </div>
        </div>
      </div>

      <!-- Right Pane — Skill Groups -->
      <div class="flex flex-col">
        {skillGroups.map((group, i) => (
          <div
            class:list={[
              "grid grid-cols-[60px_1fr]",
              i < skillGroups.length - 1 && "border-b border-text-on-accent/40",
            ]}
          >
            <div class="flex items-center text-sm italic font-mono text-text-on-accent/90 px-4 py-6 border-r border-text-on-accent/40">
              0{i + 1}
            </div>
            <div class="px-6 py-6">
              <div class="text-sm font-semibold uppercase tracking-wider text-text-on-accent mb-3">
                {group.title}
              </div>
              <div class="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span class="text-xs font-mono tracking-wider uppercase border border-text-on-accent/40 px-3 py-1.5 text-text-on-accent/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <!-- Tagline Row -->
        <div class="flex items-end flex-1 border-t border-text-on-accent/40 p-6">
          <div class="text-2xl font-bold tracking-tight uppercase text-text-on-accent leading-tight">
            Clean code. Reliable systems. Scalable architecture.
          </div>
        </div>

        <!-- Footer Row -->
        <div class="flex justify-between items-center px-6 py-4 border-t border-text-on-accent/40">
          <span class="text-xs text-text-on-accent/80">
            Vikas Kapadiya
          </span>
          <span class="text-xs text-text-on-accent font-medium">
            2026
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
```

Note: the old file's `<script>` block (skill-bar IntersectionObserver) is deleted along with the percentage bars.

- [ ] **Step 2: Remove the `skills` export from src/config.js**

Delete the `skills` const (including its `// TEMPORARY` comment) and change the export line to:

```js
export { metaData, socialLinks, skillGroups, projects };
```

- [ ] **Step 3: Verify nothing still imports `skills`**

Run: `grep -rn "skills" src --include="*.astro" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v skillGroups | grep import`
Expected: no output.

- [ ] **Step 4: Verify build**

Run: `bun run build && grep -c "skill-bar-fill" dist/index.html`
Expected: build exits 0; grep prints `0` and exits 1 (no percentage bars remain).

- [ ] **Step 5: Commit**

```bash
git add src/components/SkillsSection.astro src/config.js
git commit -m "feat: rebuild skills as grouped tech without ratings"
```

---

### Task 7: About section rewrite — trajectory arc

**Files:**
- Modify: `src/components/AboutSection.astro` (full replacement)

**Interfaces:**
- Consumes: `socialLinks` from `src/config.js`.
- Produces: section keeps `id="about"`. Laravel Artisan community block and freelance CTA are GONE.

- [ ] **Step 1: Replace src/components/AboutSection.astro**

Replace the entire file with:

```astro
---
import { socialLinks } from "../config";

const socials = [
  { label: "GitHub", value: "@vikas5914", href: socialLinks.github },
  { label: "LinkedIn", value: "vikaskapadiya", href: socialLinks.linkedin },
  { label: "Twitter / X", value: "@kapadiyavikas", href: socialLinks.twitter },
  { label: "Bluesky", value: "kapadiya.net", href: socialLinks.bluesky },
  { label: "Instagram", value: "@kapadiyavikas", href: socialLinks.instagram },
  { label: "Email", value: "vikas@kapadiya.net", href: socialLinks.email },
];
---

<section id="about" class="py-18 border-t border-border-medium">
  <div class="mx-auto max-w-[1440px] px-6 sm:px-12">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12 pb-6 border-b border-border-soft">
      <div>
        <div class="text-xs font-mono font-medium tracking-widest uppercase text-ind-accent mb-3">
          Background
        </div>
        <h2 class="text-4xl font-bold tracking-tight uppercase text-text-primary leading-none">
          About Me
        </h2>
      </div>
      <div class="hidden md:block text-sm text-text-muted max-w-[380px] leading-relaxed text-right">
        AI engineer with a decade of full-stack work underneath — PHP to
        TypeScript to LLMs.
      </div>
    </div>

    <!-- Two Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Left Column — About Text -->
      <div class="flex flex-col gap-6">
        <p class="text-base leading-relaxed text-text-secondary">
          I started with PHP and spent a decade shipping full-stack —
          Laravel, Node.js, React, and everything it takes to keep
          production systems running. That foundation still shapes how I
          build: clean code, reliable systems, scalable architecture.
        </p>
        <p class="text-base leading-relaxed text-text-secondary">
          These days I'm an AI Engineer at Shopos AI, building agents and
          the LLM tooling around them — the layer where models meet real
          products and have to actually work.
        </p>
        <p class="text-base leading-relaxed text-text-secondary">
          Outside of work you'll find me maintaining open-source projects
          and writing about what I learn along the way.
        </p>

        <!-- CTA Block -->
        <div class="bg-surface p-7 mt-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <div class="text-xs font-mono font-medium tracking-wider uppercase text-ind-accent mb-2">
            Contact
          </div>
          <div class="text-sm leading-relaxed text-text-secondary mb-5">
            Always up for talking agents, tooling, or the web.
          </div>
          <a
            href="mailto:vikas@kapadiya.net"
            class="inline-flex items-center gap-2 no-underline text-xs font-semibold tracking-widest uppercase bg-ind-accent text-text-on-accent border-none px-6 py-3 transition-opacity duration-[240ms] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <!-- Right Column — Social Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 border border-border-strong self-start">
        {socials.map((s, i) => {
          const isRight = i % 2 === 1;
          const isLastRow = i >= socials.length - 2;
          return (
            <a
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              class:list={[
                "block no-underline p-5 transition-colors duration-[240ms]",
                "hover:bg-surface focus-visible:outline-2 focus-visible:outline-ind-accent focus-visible:-outline-offset-2",
                !isRight && "sm:border-r border-border-strong",
                !isLastRow && "border-b border-border-strong",
              ]}
            >
              <div class="text-xs font-mono font-medium tracking-widest uppercase text-text-muted mb-2">
                {s.label}
              </div>
              <div class="text-sm font-semibold text-text-primary">
                {s.value}
              </div>
              <div class="text-sm text-ind-accent mt-2">
                →
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `bun run build && grep -ci "laravel artisan\|freelance" dist/index.html`
Expected: build exits 0; grep prints `0` and exits 1.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.astro
git commit -m "feat: rewrite about section as career trajectory, drop freelance CTA"
```

---

### Task 8: Writing section + delete dead BlogSection

**Files:**
- Create: `src/components/WritingSection.astro`
- Delete: `src/components/BlogSection.astro` (unused, light-themed, hardcoded `bg-white`)
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `posts` content collection (`getCollection("posts")`; frontmatter: `title`, `excerpt`, `date`, `readTime`, `category`, `slug`).
- Produces: section with `id="writing"`, mounted after `<AboutSection />` (page order after this task: Hero → Now → Projects → Skills → About → Writing — Skills/About order is fixed in Task 9's final assembly check, see note below).

Note on order: `index.astro` currently renders `AboutSection` before `SkillsSection`. The spec order is Hero → Now → Projects → Skills → About → Writing. Fix the order NOW as part of Step 2.

- [ ] **Step 1: Create src/components/WritingSection.astro**

```astro
---
import { getCollection } from "astro:content";

const allPosts = await getCollection("posts");
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

const recentPosts = allPosts
  .sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )
  .slice(0, 3)
  .map((post) => {
    const dateObj = new Date(post.data.date);
    return {
      ...post.data,
      formattedDate: dateFormatter.format(dateObj),
      isoDate: dateObj.toISOString().slice(0, 10),
    };
  });
---

<section id="writing" class="py-18 border-t border-border-medium">
  <div class="mx-auto max-w-[1440px] px-6 sm:px-12">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12 pb-6 border-b border-border-soft">
      <div>
        <div class="text-xs font-mono font-medium tracking-widest uppercase text-ind-accent mb-3">
          Writing
        </div>
        <h2 class="text-4xl font-bold tracking-tight uppercase text-text-primary leading-none">
          Recent Posts
        </h2>
      </div>
      <a
        href="/blog/"
        class="no-underline text-xs font-mono font-medium tracking-widest uppercase text-ind-accent hover:text-ind-accent-hover transition-colors duration-[240ms]"
      >
        View all posts →
      </a>
    </div>

    {recentPosts.length > 0 ? (
      <div class="flex flex-col border border-border-strong">
        {recentPosts.map((post, i) => (
          <a
            href={`/blog/${post.slug}/`}
            class:list={[
              "block no-underline grid grid-cols-1 sm:grid-cols-[60px_1fr_auto] transition-colors duration-[240ms] hover:bg-surface focus-visible:outline-2 focus-visible:outline-ind-accent focus-visible:-outline-offset-2",
              i < recentPosts.length - 1 && "border-b border-border-strong",
            ]}
          >
            <div class="hidden sm:flex items-center text-sm italic font-mono text-text-muted px-4 py-6 border-r border-border-strong">
              0{i + 1}
            </div>
            <div class="p-6">
              <div class="text-xs font-semibold tracking-widest uppercase text-ind-accent mb-2">
                {post.category}
              </div>
              <div class="text-base font-semibold text-text-primary mb-1.5">
                {post.title}
              </div>
              <div class="text-sm leading-relaxed text-text-muted max-w-[600px]">
                {post.excerpt}
              </div>
            </div>
            <div class="flex sm:flex-col flex-row items-center sm:items-end sm:justify-center gap-2 px-6 py-3 sm:p-6 border-t sm:border-t-0 sm:border-l border-border-soft sm:border-border-strong">
              <time datetime={post.isoDate} class="text-xs text-text-secondary">
                {post.formattedDate}
              </time>
              <span class="text-xs text-text-secondary">{post.readTime}</span>
              <span class="text-sm text-ind-accent">→</span>
            </div>
          </a>
        ))}
      </div>
    ) : null}
  </div>
</section>
```

- [ ] **Step 2: Update src/pages/index.astro to final section order**

Replace the imports and body so the full file reads:

```astro
---
import Base from "../layouts/Base.astro";
import HeroSection from "../components/HeroSection.astro";
import NowSection from "../components/NowSection.astro";
import ProjectsSection from "../components/ProjectsSection.astro";
import SkillsSection from "../components/SkillsSection.astro";
import AboutSection from "../components/AboutSection.astro";
import WritingSection from "../components/WritingSection.astro";
import { metaData, socialLinks } from "../config";
---

<Base title={metaData.title} description={metaData.description}>
  <script
    is:inline
    type="application/ld+json"
    set:html={JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: metaData.title,
        url: metaData.baseUrl,
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: metaData.name,
        url: metaData.baseUrl,
        jobTitle: "AI Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Shopos AI",
        },
        sameAs: [
          socialLinks.github,
          socialLinks.linkedin,
          socialLinks.twitter,
          socialLinks.bluesky,
          socialLinks.instagram,
        ],
      },
    ])}
  />
  <HeroSection />
  <NowSection />
  <ProjectsSection />
  <SkillsSection />
  <AboutSection />
  <WritingSection />
</Base>
```

(This also updates the JSON-LD `jobTitle` to "AI Engineer" and adds `worksFor` — Task 9 then only handles Header/Footer/blog-index.)

- [ ] **Step 3: Delete the dead component**

Run: `git rm src/components/BlogSection.astro`

(Verify first it is unused: `grep -rn "BlogSection" src` must show no imports outside the file itself.)

- [ ] **Step 4: Verify build**

Run: `bun run build && grep -c 'id="writing"' dist/index.html`
Expected: build exits 0, grep prints `1`.

- [ ] **Step 5: Commit**

```bash
git add -A src/components src/pages/index.astro
git commit -m "feat: add writing section, final homepage order, drop dead BlogSection"
```

---

### Task 9: Header nav, Footer, blog index copy

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/blog/index.astro` (description only)

**Interfaces:**
- Consumes: section ids `home`, `projects`, `about` (Tasks 3, 5, 7).
- Produces: nav = Home / Projects / About / Blog.

- [ ] **Step 1: Update nav items and scroll-spy in src/components/Header.tsx**

Replace the `navItems` array with:

```tsx
  const navItems = [
    { name: "Home", id: "home", href: "/#home" },
    { name: "Projects", id: "projects", href: "/#projects" },
    { name: "About", id: "about", href: "/#about" },
    { name: "Blog", href: "/blog/" },
  ];
```

Replace the scroll-spy section list inside `handleScroll` (currently `const sections = ["skills", "about", "home"];`) with:

```tsx
      const sections = ["about", "projects", "home"];
```

- [ ] **Step 2: Update src/components/Footer.astro**

Replace the `cols` array with:

```js
const cols = [
  {
    title: "Navigate",
    links: [
      { name: "Home", href: "/#home" },
      { name: "Projects", href: "/#projects" },
      { name: "About", href: "/#about" },
      { name: "Blog", href: "/blog/" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "GitHub", href: socialLinks.github },
      { name: "LinkedIn", href: socialLinks.linkedin },
      { name: "Twitter / X", href: socialLinks.twitter },
      { name: "Bluesky", href: socialLinks.bluesky },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "vikas@kapadiya.net", href: socialLinks.email },
      { name: "Instagram", href: socialLinks.instagram },
    ],
  },
];
```

Replace the brand-column bio text (`Full-stack developer passionate about creating amazing web experiences. Clean code, reliable systems, scalable architecture.`) with:

```
AI Engineer at Shopos AI. A decade of full-stack underneath — clean code, reliable systems, scalable architecture.
```

- [ ] **Step 3: Update blog index description in src/pages/blog/index.astro**

Change the `<Base>` props to:

```astro
<Base
  title="Blog - Vikas Kapadiya"
  description="Blog posts about AI engineering, agents, and modern web development."
>
```

- [ ] **Step 4: Verify build and dead-copy scan**

Run: `bun run build && grep -rci "laravel artisan\|freelance\|noobs" dist/ | grep -v ":0" | head`
Expected: build exits 0; grep chain prints nothing (no file contains the dead copy).

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.astro src/pages/blog/index.astro
git commit -m "feat: update nav, footer, and blog copy for AI engineer positioning"
```

---

### Task 10: Scroll reveals + final verification

**Files:**
- Modify: `src/assets/styles/global.css` (reveal CSS)
- Modify: `src/layouts/Base.astro` (reveal script)
- Modify: `src/components/NowSection.astro`, `src/components/ProjectsSection.astro`, `src/components/SkillsSection.astro`, `src/components/AboutSection.astro`, `src/components/WritingSection.astro` (add `data-reveal`)

**Interfaces:**
- Consumes: nothing.
- Produces: `data-reveal` attribute contract — any element with it fades/slides in on first viewport entry; visible immediately under reduced-motion or no-JS.

- [ ] **Step 1: Add reveal CSS to src/assets/styles/global.css**

Append at the end of the file:

```css
/* ============================================================
   SCROLL REVEALS
   ============================================================ */
@media (prefers-reduced-motion: no-preference) {
  html.js [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 600ms ease,
      transform 600ms ease;
  }
  html.js [data-reveal].is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
}
```

(The `html.js` guard means no-JS visitors always see content — the class is added by the script below.)

- [ ] **Step 2: Add reveal script to src/layouts/Base.astro**

Add just before the closing `</body>`, after the existing `<script is:inline>` block:

```astro
    <script>
      document.documentElement.classList.add("js");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1 }
      );
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => revealObserver.observe(el));
    </script>
```

- [ ] **Step 3: Tag sections**

In each of `NowSection.astro`, `ProjectsSection.astro`, `SkillsSection.astro`, `AboutSection.astro`, `WritingSection.astro`, add `data-reveal` to the root `<section>` element. Example for NowSection:

```astro
<section id="now" class="border-t border-border-medium" data-reveal>
```

Do NOT add it to `HeroSection.astro` — the hero is above the fold and must render instantly.

- [ ] **Step 4: Verify build**

Run: `bun run build && grep -c "data-reveal" dist/index.html`
Expected: build exits 0, grep prints `5`.

- [ ] **Step 5: Full manual pass**

Run `bun run dev` and verify:
- Homepage: shader flows and reacts to cursor; sections reveal on scroll; nav highlights Home/Projects/About as you scroll.
- macOS Reduce Motion on: shader static, sections visible without animation.
- JS disabled (DevTools): all content visible, plain dark hero.
- Mobile viewport (responsive mode, 375px): shader legible, sections stack, mobile menu works.
- `/blog/` and the one post render dark and readable.
- Lighthouse (DevTools, mobile): Performance ≥ 90.

- [ ] **Step 6: Commit**

```bash
git add src/assets/styles/global.css src/layouts/Base.astro src/components
git commit -m "feat: add scroll reveals for homepage sections"
```
