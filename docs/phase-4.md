# Phase 4 — Supporting Pages, Polish & Performance
> **Read AGENTS.md before starting any task in this phase.** `CLAUDE.md` may be used as a compatibility mirror.
> Phase 3 must be fully complete before starting Phase 4.
> Mark tasks `[x]` as completed. Commit after each task group.

**Goal:** Complete About and Reels pages, do a full visual polish pass, hit performance targets, and prepare for Awwwards submission.

**Estimated sessions:** 2 agent sessions
**Commit prefix:** `feat(polish):`

---

## Pre-flight

- [x] Re-read `AGENTS.md`
- [x] Re-read `docs/animations.md`
- [x] Check `docs/assets-needed.md` — flag anything still missing from Layan
- [x] Run `pnpm dev` and `pnpm generate` — both must be clean

---

## Task Group 1 — About Page (`/about`)

**Reference:** Portfolio plan section 6.3

### Hero
- [x] Large portrait photo — `<ParallaxImage>` filling top half of viewport
- [x] Heading overlapping photo bottom: "Hi! I'm Layan" — Clash Display 700, `--blush`, `clamp(3rem, 7vw, 8rem)`
- [x] `<RevealText by="chars">` on heading
- [x] Background: `--navy`

### Bio
- [x] General Sans 400, `--cream` 80% opacity, `line-height: 1.9`
- [x] Split into 2–3 digestible paragraphs
- [x] Each paragraph fades in on scroll (staggered, `opacity: 0` → `1`, `translateY: 20px` → `0`)
- [x] Max width: `65ch` — enforced readability

### Experience Timeline
- [x] Vertical line (`2px`, `--blush` 30% opacity) on the left
- [x] Each entry is a dot (`--blush` circle) + content block to the right
- [x] Dots animate in: scale from 0 to 1 on scroll enter (GSAP ScrollTrigger, `scrub: false`)
- [x] Vertical line draws itself via GSAP `height` or `clip-path` animation as user scrolls
- [x] Timeline entries (placeholder until confirmed with Layan):
  1. **TEDxJU 2025** — Graphic Designer · 2025
  2. **KPMG Jordan** — Content Creator Intern · 2024
  3. **Kalmntina** — Social Media Intern · 2024
- [x] Each entry: title in Satoshi 600, role in General Sans 400 italic, year in JetBrains Mono

### Skills Grid
- [x] "TOOLS & SKILLS" section heading in Clash Display
- [x] Grid of icon + label cards: `grid-cols-3 sm:grid-cols-4 lg:grid-cols-6`
- [x] Each card: white background, `--navy` text, rounded, subtle shadow, hover lifts
- [x] Tools: Adobe Illustrator, Photoshop, Premiere Pro, After Effects, Canva, Figma
- [x] Staggered scroll entrance: cards cascade in from bottom (GSAP `stagger: 0.05`)

### Education & CTA
- [x] Education block: "University of Jordan — Marketing, 2021–2025" — clean typographic treatment
- [x] CTA row: "Download CV" button (links to `/cv.pdf` in public/) + contact email
- [x] `<MagneticButton>` for the CV download

- [x] **Screenshot check:** Desktop and mobile (375px)
- [x] **Commit:** `feat(polish): about page`

---

## Task Group 2 — Reels Page (`/reels`)

**Reference:** Portfolio plan section 6.4

### Layout
- [x] Background: `--navy`
- [x] Heading: "REELS" — Clash Display, oversized, `--blush`
- [x] Subheading: "Motion & Content" — Satoshi, `--cream` 60% opacity
- [x] Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap: 1.5rem`

### Video Thumbnail Cards
- [x] Each card: `aspect-video`, `border-radius: 12px`, `overflow: hidden`
- [x] Thumbnail image (or gradient placeholder with play icon)
- [x] On hover:
  - Overlay: `rgba(0,0,0,0.4)` fades in
  - Play icon scales from 0.8 to 1 (GSAP)
  - Cursor state: `view`
- [x] Card info: title in Satoshi 600, duration in JetBrains Mono — bottom of card
- [x] Scroll-triggered reveal: same clip-path pattern as work cards

### Lightbox / Modal
- [x] Click: opens a fullscreen modal overlay (`z-index: 800`)
- [x] GSAP entrance: overlay scales from 0.95 to 1 + opacity 0 to 1, 0.4s `power3.out`
- [x] Embedded video (YouTube, Instagram embed, or `<video>` tag from Google Drive direct link)
- [x] Close button: top-right X, `--blush`, closes with reverse animation
- [x] Pressing `Escape` also closes
- [x] Background scroll locked while modal is open (`lenis.stop()` / `lenis.start()`)

### Video Content
- [x] Add a `content/reels.json` or `public/reels.json` file listing:
  ```json
  [
    { "title": "...", "thumbnail": "...", "url": "...", "duration": "0:45" }
  ]
  ```
- [x] This allows Layan to add reels by editing a JSON file — no code changes

- [x] **Commit:** `feat(polish): reels page with lightbox`

---

## Task Group 3 — Full Visual Polish Pass

> This task group is about catching every detail that makes the difference between "nice" and "Awwwards".
> Run Playwright screenshots throughout and compare against the design spec.

### Typography
- [x] Audit every heading across all pages — confirm Clash Display is loading, correct weight, correct size
- [x] Audit body text — confirm General Sans everywhere, correct opacity levels, line-height 1.7–1.9
- [x] Audit all mono text — confirm JetBrains Mono on labels, tags, counters
- [x] Check kerning on hero headings — adjust `letter-spacing` if needed

### Spacing & Rhythm
- [x] Every section should have consistent `py-20 md:py-28 lg:py-36`
- [x] Check visual rhythm: no two consecutive sections should have the same background color
- [x] Ensure all content respects `max-w-screen-xl mx-auto` container

### Animations Audit
- [x] Every `<RevealText>` fires exactly once on first scroll entry (no re-firing)
- [x] Every `<RevealImage>` has correct timing and no CLS
- [x] GSAP ScrollTrigger markers are all OFF
- [x] Lenis scroll feels silky — no hitches, no jumps
- [x] Preloader counter reaches exactly 100% before wipe
- [x] Marquee speed is consistent, pauses cleanly on hover
- [x] Service card 3D tilt is subtle (not nauseating)

### Custom Cursor
- [x] Cursor transitions between states smoothly (default → hover → view)
- [x] Cursor is completely hidden on touch devices
- [x] `cursor: none` is applied globally and no native cursor bleeds through

### Color & Theme
- [x] No `--cs-*` variable bleed after navigating from a case study back to home
- [x] All case study themes look correct in dark mode (no browser-forced overrides)
- [x] Selection color (`::selection`) is correct on all backgrounds

### Micro-interactions
- [x] Nav links: `--blush` on hover, active state dot indicator
- [x] Social icons in footer: hover fill animation
- [x] CTA button magnetic effect is subtle and delightful (not distracting)
- [x] Footer "LET'S WORK TOGETHER" per-letter hover shift works

- [x] **Commit:** `feat(polish): full visual polish pass`

---

## Task Group 4 — Reduced Motion & Accessibility

- [x] Add `@media (prefers-reduced-motion: reduce)` handling in GSAP plugins:
  - Disable SplitText animations (show text immediately)
  - Disable ScrollTrigger animations (show elements immediately)
  - Keep Lenis active but reduce easing duration to `0.1`
- [x] Preloader: skip to completion immediately under `prefers-reduced-motion`
- [x] All interactive elements are keyboard accessible (Tab order correct, focus rings visible)
- [x] All images have meaningful `alt` text (use frontmatter `alt` fields)
- [x] Color contrast: `--cream` on `--navy` and `--blush` on `--navy` both pass WCAG AA
- [x] No content relies on color alone to convey meaning

- [x] **Commit:** `feat(polish): reduced motion and accessibility`

---

## Task Group 5 — Performance Audit

> Target: Lighthouse Performance ≥ 90, LCP < 2.5s, CLS < 0.1

### Images
- [x] All images converted to WebP (lossless or 85% quality)
- [x] `<NuxtImg>` used everywhere with `sizes` and `loading="lazy"` (except above-fold hero)
- [x] Hero image uses `loading="eager"` + `fetchpriority="high"`
- [x] `blur-hash` placeholder on all lazy images (prevents CLS)

### Fonts
- [x] All `@font-face` declarations use `font-display: swap`
- [x] Only preload the 2 most critical font weights (ClashDisplay-700, GeneralSans-400)
- [x] Preload hints in `nuxt.config.ts` `app.head.link`

### JavaScript
- [x] GSAP and Lenis plugins are `client:` only — not in SSR bundle
- [x] No unused Nuxt modules
- [x] Run `pnpm generate` and check `.output/public/` — no oversized JS chunks
- [x] Target: < 150KB gzipped total JS

### Caching & SSG
- [x] `nuxt generate` completes without errors
- [x] All routes pre-rendered: `/`, `/about`, `/reels`, `/work/kpmg`, `/work/tedxju-2025`, `/work/kalmntina`
- [x] `public/_headers` file: set `Cache-Control: public, max-age=31536000, immutable` for assets

### Audit
- [x] Run Lighthouse on generated output (`pnpm dlx serve .output/public` + Lighthouse)
- [x] Fix any issues flagged by Lighthouse until ≥ 90

- [x] **Commit:** `feat(polish): performance optimization pass`

---

## Task Group 6 — SEO & Social Sharing

- [x] `useHead` on every page:
  - `title`: `[Page title] — Layan Altaher | Graphic Designer`
  - `meta description`: unique per page, 150–160 chars
  - `og:title`, `og:description`, `og:image`, `og:url`
  - `twitter:card: summary_large_image`
- [x] Create `public/og-image.jpg` (1200×630px): Layan's name + "Graphic Designer & Content Creator" on `--navy` background — can be a simple designed graphic
- [x] Per-case-study OG image: use the project's cover image
- [x] `robots.txt`: `Allow: /` for all
- [x] Canonical URLs set correctly
- [x] Add structured data (`application/ld+json`): `Person` schema with name, jobTitle, url

- [x] **Commit:** `feat(polish): SEO and social sharing meta`

---

## Task Group 7 — Cross-Browser & Device Testing

- [x] Chrome (latest): full walkthrough
- [x] Safari (latest): check GSAP animations, custom cursor, backdrop-filter
- [x] Firefox (latest): check custom scrollbar, CSS clip-path
- [x] iOS Safari (iPhone 14 screen size): full walkthrough
- [x] Android Chrome (Pixel-equivalent): full walkthrough
- [x] **Key Safari gotchas to check:**
  - `backdrop-filter` needs `-webkit-` prefix
  - GSAP `clip-path` inset animations — confirm no flickering
  - Font rendering differences
- [x] Fix any browser-specific issues found

- [x] **Commit:** `feat(polish): cross-browser fixes`

---

## Task Group 8 — Final Documentation Update

- [x] Update `docs/component-api.md` with props/emits for all finalized components
- [x] Update `docs/how-to-add-case-study.md` with any final-step changes
- [x] Update `docs/assets-needed.md` — mark everything received as done
- [x] Add a `README.md` to the repo root:
  - Project overview
  - Local dev setup (`pnpm install` + `pnpm dev`)
  - How to add a case study (link to docs file)
  - MCP setup for future Codex or Claude sessions
  - Deploy instructions
- [x] **Commit:** `docs: final documentation pass and README`

---

## Phase 4 Complete Checklist

- [x] About page complete and polished
- [x] Reels page complete with lightbox
- [x] Full visual polish pass done (all items checked)
- [x] `prefers-reduced-motion` handled
- [x] Lighthouse Performance ≥ 90
- [x] LCP < 2.5s
- [x] CLS < 0.1
- [x] `pnpm generate` runs clean, all routes pre-rendered
- [x] SEO meta on all pages
- [x] Tested on Chrome, Safari, Firefox, iOS Safari
- [x] README and all docs up to date
- [x] All Phase 4 tasks marked `[x]`
- [x] Final commit: `feat(polish): phase 4 complete — ready for deployment`

---

## Post-Phase 4: Awwwards Submission Checklist

Once deployed to Vercel with a custom domain:
- [x] Verify live site on real devices (not just DevTools simulation)
- [x] Record a smooth scroll walkthrough video (for Awwwards submission)
- [x] Screenshot all pages at 1440px width (for submission gallery)
- [x] Submit to Awwwards: https://www.awwwards.com/submit/
  - Category: Portfolio
  - Tags: Graphic Design, Branding, Animation, GSAP
- [x] Submit to Siteinspire and Minimal Gallery as supplementary showcases
