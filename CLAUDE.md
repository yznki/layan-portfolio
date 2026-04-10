# CLAUDE.md — Layan Altaher Portfolio
> **This file is the agent's source of truth.** Read it at the start of every session and every task.
> Never rely on session memory. Always read this file and the relevant phase file before writing code.

---

## Project Identity

**Client:** Layan Altaher — Graphic Designer & Content Creator, Amman, Jordan
**Goal:** Awwwards nominee-worthy portfolio. Immersive, case-study-driven, buttery smooth.
**Stack:** Nuxt 4 · Tailwind CSS v4 · GSAP (ScrollTrigger + SplitText) · Lenis · Nuxt Content v3 · Nuxt Image
**Deployment:** Vercel SSG (`nuxt generate`) with Decap CMS editing content through GitHub commits.
**Repo:** Managed via GitHub MCP. Commit after completing every major task within a phase.

---

## Agent Operating Rules

1. **Always read before writing.** Before any task, re-read this file + the active phase file (`docs/phase-X.md`).
2. **Update, don't assume.** When you complete a task, mark it `[x]` in the phase file and commit. Never track state in your head.
3. **Use Context7 for docs.** Before using any Nuxt 4, GSAP, Lenis, or Tailwind v4 API, resolve its docs via Context7 MCP. These libraries change fast — do not use training data for API signatures.
4. **Screenshot and verify.** After any significant UI work, use Playwright MCP to take a screenshot of the running dev server (`http://localhost:3000`) and visually confirm it matches the design spec before moving on.
5. **Figma MCP for design tokens.** If a Figma file URL is provided, extract design tokens (colors, spacing, typography) via Figma MCP rather than hard-coding guesses.
6. **GitHub MCP for all commits.** Use GitHub MCP to commit. Never leave a phase partially done without committing progress.
7. **Mobile first, always.** Write Tailwind styles mobile-first. Desktop styles come via `md:` and `lg:` prefixes. Test mobile layout before desktop.
8. **Never hallucinate assets.** If an image, font, or file is not present in the repo, note it as `TODO: [asset name]` in a comment and use a styled placeholder. Do not invent paths.
9. **Animations serve the story.** Every animation must have a narrative purpose. Do not add motion for decoration. See the animations playbook in `docs/animations.md`.
10. **Case studies are data, not code.** All case study content lives in `content/work/*.md`. The page template (`pages/work/[slug].vue`) reads from these files. Never hard-code case study content into components.

---

## Design System

### Color Tokens (defined in `assets/css/tokens.css`)

```css
:root {
  --navy:  #0F1B4C;   /* Primary background */
  --blush: #F5A0C0;   /* Accent / headings / highlights */
  --cream: #FFF5F0;   /* Body text / light surfaces */
  --ink:   #1A1A2E;   /* Deep text variant / section bg */
}
```

Per-case-study palettes are injected at the page level via a `data-theme` attribute on `<body>` or `<main>`, which overrides CSS variables locally. See `docs/case-study-theming.md`.

### Typography

| Role | Font | Weight | Load method |
|------|------|--------|-------------|
| Display / Hero | Clash Display | 600, 700 | Self-hosted in `public/fonts/` |
| Section headings | Satoshi | 500, 700 | Self-hosted in `public/fonts/` |
| Body / UI | General Sans | 400, 500 | Self-hosted in `public/fonts/` |
| Mono labels/tags | JetBrains Mono | 400 | Google Fonts (preconnect) |

Fonts are declared in `assets/css/fonts.css` and loaded via `@nuxt/fonts` with `font-display: swap`.

### Spacing Scale
Follow Tailwind's default spacing. Key layout values:
- Page horizontal padding: `px-5 md:px-10 lg:px-16`
- Section vertical padding: `py-20 md:py-28 lg:py-36`
- Max content width: `max-w-screen-xl mx-auto`

---

## Architecture Decisions

### Why Nuxt Content (not Notion / Sanity)
Each case study markdown file carries frontmatter that defines:
- Its full color palette (`primary`, `secondary`, `accent`, `bg`)
- Which layout sections appear and in what order (`sections: [overview, gallery, process, results, next]`)
- Animation variants per section
- All text content

This means the KPMG page and TEDxJU page can have completely different visual structures, color worlds, and section flows — all without touching Vue components. Layan edits text; the design system handles the rest.

### Content Schema
See `docs/content-schema.md` for the full frontmatter spec. Every case study `.md` file must conform to this schema.

### SSG + Nuxt Content
`nuxt generate` pre-renders all routes including `/work/[slug]` via local content files. Decap CMS edits those files through GitHub.

---

## Repository Structure

```
layan-portfolio/
├── CLAUDE.md                        ← YOU ARE HERE — read every session
├── docs/
│   ├── phase-1.md                   ← Phase 1 tasks and checklist
│   ├── phase-2.md                   ← Phase 2 tasks and checklist
│   ├── phase-3.md                   ← Phase 3 tasks and checklist
│   ├── phase-4.md                   ← Phase 4 tasks and checklist
│   ├── content-schema.md            ← Case study markdown frontmatter spec
│   ├── case-study-theming.md        ← How per-project color themes work
│   ├── animations.md                ← Animation playbook and GSAP patterns
│   ├── component-api.md             ← Props/emits for every component
│   └── assets-needed.md             ← Checklist of assets still pending from Layan
├── assets/
│   ├── css/
│   │   ├── tokens.css               ← CSS custom properties (colors, etc.)
│   │   ├── fonts.css                ← @font-face declarations
│   │   └── main.css                 ← Tailwind base + global styles
│   └── images/
│       ├── hero/
│       ├── kpmg/
│       ├── tedxju/
│       ├── kalmntina/
│       └── about/
├── components/
│   ├── global/
│   │   ├── AppCursor.vue
│   │   ├── AppNav.vue
│   │   ├── AppFooter.vue
│   │   ├── AppPreloader.vue
│   │   └── AppMarquee.vue
│   ├── ui/
│   │   ├── MagneticButton.vue
│   │   ├── RevealText.vue           ← GSAP SplitText wrapper
│   │   ├── RevealImage.vue          ← Clip-path scroll reveal wrapper
│   │   ├── ParallaxImage.vue        ← GSAP parallax wrapper
│   │   └── CountUp.vue              ← Animated stat counter
│   ├── home/
│   │   ├── HomeHero.vue
│   │   ├── HomeWorkGrid.vue
│   │   ├── HomeWorkCard.vue
│   │   ├── HomeAboutTeaser.vue
│   │   └── HomeServicesScroll.vue
│   └── work/
│       ├── WorkHero.vue
│       ├── WorkOverview.vue
│       ├── WorkGallery.vue
│       ├── WorkProcess.vue
│       ├── WorkResults.vue
│       └── WorkNextProject.vue
├── composables/
│   ├── useGsap.ts
│   ├── useSplitText.ts
│   ├── useParallax.ts
│   ├── useMagnetic.ts
│   └── useCaseStudyTheme.ts
├── content/
│   └── work/
│       ├── kpmg.md
│       ├── tedxju-2025.md
│       └── kalmntina.md
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── about.vue
│   ├── reels.vue
│   └── work/
│       └── [slug].vue
├── plugins/
│   ├── gsap.client.ts
│   └── lenis.client.ts
├── public/
│   └── fonts/
│       ├── ClashDisplay-*.woff2
│       ├── Satoshi-*.woff2
│       └── GeneralSans-*.woff2
└── nuxt.config.ts
```

---

## MCP Configuration (Claude Code)

The following MCPs must be active in your Claude Code session:

| MCP | Purpose | When to use |
|-----|---------|-------------|
| **Figma** | Extract design tokens, inspect components | When design spec or Figma URL is provided |
| **GitHub** | Commit, branch, PR management | After every completed task group |
| **Context7** | Live Nuxt 4 / GSAP / Tailwind v4 docs | Before any framework API usage |
| **Playwright** | Screenshot localhost:3000, visual QA | After any significant UI work |
| **Filesystem** | Read/write project files | All file operations |

---

## Current Phase

> **Update this line when starting a new phase.**

**Active:** Phase 5 — CMS & Editor Workflow
**File:** `docs/phase-5.md`

---

## Assets Status

See `docs/assets-needed.md` for what's still pending from Layan.
Use placeholder components with correct dimensions and `--blush` color until real assets arrive.
