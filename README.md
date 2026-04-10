# Layan Altaher — Portfolio

Awwwards nominee-worthy portfolio for Layan Altaher, Graphic Designer & Content Creator based in Amman, Jordan.

**Live site:** https://layanaltaher.com

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 (SSG via `nuxt generate`) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | GSAP 3.12 (ScrollTrigger + SplitText) |
| Smooth scroll | Lenis |
| Content | Nuxt Content v3 + Decap CMS |
| Images | Nuxt Image (WebP + lazy loading) |
| Icons | Nuxt Icon (Iconify / mdi collection) |
| Deployment | Vercel (static output) |

---

## Local Development

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
# Install dependencies (builds better-sqlite3 for Nuxt Content)
pnpm install
pnpm rebuild better-sqlite3

# Start dev server at http://localhost:3000
pnpm dev
```

### Generate static output

```bash
pnpm generate
# Output lands in .output/public/
# Preview: npx serve .output/public
```

### Lint & type-check

```bash
pnpm typecheck
```

---

## Project Structure

```
layan-portfolio/
├── assets/css/          # Tailwind v4 CSS, design tokens, fonts
├── components/
│   ├── global/          # AppCursor, AppNav, AppFooter, AppPreloader, AppMarquee
│   ├── ui/              # RevealText, MagneticButton, CountUp, RevealImage, ParallaxImage
│   ├── home/            # HomeHero, HomeWorkGrid, HomeWorkCard, HomeServicesScroll, HomeAboutTeaser
│   └── work/            # WorkHero, WorkOverview, WorkGallery, WorkProcess, WorkResults, WorkNextProject
├── composables/         # useGsap, useSplitText, useMagnetic, useParallax, useCaseStudyTheme
├── content/work/        # Case study Markdown files (kpmg.md, tedxju-2025.md, kalmntina.md)
├── docs/                # Architecture docs, phase checklists, content schema, animation playbook
├── pages/               # index.vue, about.vue, reels.vue, work/[slug].vue
├── plugins/             # gsap.client.ts, lenis.client.ts
├── public/              # Fonts, static assets, reels.json, robots.txt, _headers
└── nuxt.config.ts
```

---

## Content Workflow

The intended editor workflow is now:

1. Layan opens `/admin`
2. Decap CMS opens a GitHub login
3. She edits projects and reels through forms
4. Decap commits the changed content files to GitHub
5. Vercel rebuilds the site automatically

Setup details: [`docs/cms-setup.md`](docs/cms-setup.md)

---

## Adding Reels

The CMS edits `public/reels.json`. Manual format:

```json
{
  "reels": [
    {
      "title": "Brand Identity Reel",
      "thumbnail": "/images/reels/brand-reel.jpg",
      "thumbnailAlt": "Brand Identity Reel thumbnail",
      "url": "https://www.youtube.com/embed/VIDEO_ID",
      "duration": "1:30",
      "description": "Brand identity work for various clients.",
      "featuredOrder": 10,
      "draft": false
    }
  ]
}
```

Supported embed URLs: YouTube (`/embed/ID`), Vimeo (`/video/ID`), direct MP4.

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0F1B4C` | Primary background |
| `--blush` | `#F5A0C0` | Accents, headings, highlights |
| `--cream` | `#FFF5F0` | Body text, light surfaces |
| `--ink` | `#1A1A2E` | Deep text, section backgrounds |

Per-project colors are injected as `--cs-primary/secondary/accent/bg` via `useCaseStudyTheme`.

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display / Hero | Clash Display | 600, 700 |
| Headings | Satoshi | 500, 700 |
| Body | General Sans | 400, 500 |
| Labels / mono | JetBrains Mono | 400 |

---

## Agent Setup

For AI-assisted development, the following MCPs should be active:

```json
{
  "mcpServers": {
    "figma": "...",
    "github": "...",
    "context7": "...",
    "playwright": "...",
    "filesystem": "..."
  }
}
```

Codex should use [`AGENTS.md`](/Users/yznki/development/layan-portfolio/AGENTS.md) as the repo source of truth.

Useful docs:
- [`AGENTS.md`](/Users/yznki/development/layan-portfolio/AGENTS.md) for repo rules and architecture
- [`docs/codex-setup.md`](/Users/yznki/development/layan-portfolio/docs/codex-setup.md) for Codex session workflow
- [`docs/mcp-setup.md`](/Users/yznki/development/layan-portfolio/docs/mcp-setup.md) for MCP wiring examples
- [`CLAUDE.md`](/Users/yznki/development/layan-portfolio/CLAUDE.md) as the legacy mirror for Claude-specific sessions

---

## Deployment

The site deploys as a static site to Vercel. Content changes come from GitHub commits created by Decap CMS.

```bash
# Generate static output
pnpm generate

# Deploy (Vercel handles this automatically on push to main)
vercel --prod
```

`public/_headers` configures cache headers (1-year immutable for assets, no-cache for HTML).
