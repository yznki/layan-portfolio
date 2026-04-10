# Phase 2 — Home Page
> **Read AGENTS.md before starting any task in this phase.** `CLAUDE.md` may be used as a compatibility mirror.
> Phase 1 must be fully complete before starting Phase 2.
> Mark tasks `[x]` as completed. Commit after each task group.

**Goal:** A complete, Awwwards-worthy home page with all sections, animations, and interactions fully implemented. This is the portfolio's first impression — it must be flawless.

**Estimated sessions:** 2–3 agent sessions
**Commit prefix:** `feat(home):`

---

## Pre-flight

- [ ] Re-read `AGENTS.md`
- [ ] Re-read `docs/animations.md`
- [ ] Verify Phase 1 is fully complete (all tasks `[x]`)
- [ ] Run `pnpm dev` — confirm clean start
- [ ] Check `docs/assets-needed.md` — note which assets are available vs. placeholder

---

## Task Group 1 — Hero Section (`HomeHero.vue`)

**Reference:** `AGENTS.md` design system + portfolio plan section 6.1.2

### Layout
- [ ] Full viewport height (`min-h-screen`), asymmetric grid: `grid-cols-[60%_40%]` on `lg:`, single column on mobile
- [ ] Left column stacks: eyebrow label → heading → tagline → scroll indicator
- [ ] Right column: blob-masked image (or placeholder)
- [ ] `--navy` background with `.grain` texture overlay

### Eyebrow
- [ ] JetBrains Mono, 0.72rem, `--blush`, `letter-spacing: 0.3em`, uppercase
- [ ] Text: `— Portfolio 2025`
- [ ] Fades up after preloader exits (`delay` prop from parent `preloaderDone` state)

### Heading
- [ ] Clash Display 700, `clamp(4.5rem, 9vw, 10rem)`, `--blush`, `line-height: 0.9`
- [ ] Two lines: "CREATIVE" / "DESIGNER"
- [ ] Each line wrapped in overflow-hidden container — inner span starts at `translateY(105%)`, GSAP animates to `translateY(0)` with stagger 0.15s between lines
- [ ] Duration: 1s, ease: `power4.out`

### Tagline
- [ ] General Sans 400 italic, 1.1rem, `--cream` 70% opacity
- [ ] Fades up 0.3s after heading completes
- [ ] Content: "Turning brands into experiences — through design, storytelling, and visual identity."

### Scroll Indicator
- [ ] Bottom-left of hero (absolute positioned)
- [ ] Thin animated line (40px, `--blush`) + "SCROLL" in JetBrains Mono 0.7rem
- [ ] Line has a scanning highlight animation (CSS `::after`, `translateX(-100%)` → `translateX(100%)`, 1.8s loop)

### Right Column — Image
- [ ] Custom SVG blob/arch clip-path shape (use `clip-path: url(#blob)` with inline SVG definition)
- [ ] `NuxtImg` inside blob — if real photo exists use it, else use styled placeholder (aspect ratio preserved)
- [ ] Subtle Ken Burns on image: GSAP `scale: 1.08` tween over 8s, `ease: none`, `yoyo: true`, `repeat: -1`
- [ ] Floating location pill: "📍 Based in Amman, Jordan" — absolute bottom-left of image, `--blush` border, `--navy` bg, JetBrains Mono 0.7rem, floating CSS animation (translateY ±8px, 4s infinite)

- [ ] **Screenshot check:** Mobile (375px) and desktop (1440px)
- [ ] **Commit:** `feat(home): hero section`

---

## Task Group 2 — Marquee Ribbon (`AppMarquee.vue` usage)

- [ ] Place `<AppMarquee>` between hero and work grid
- [ ] Wrap in a `<section>` with `overflow: hidden`, `py-0`, negative margin to break out of page padding
- [ ] `transform: rotate(-2deg) scaleX(1.05)` on wrapper
- [ ] Background: `--ink`
- [ ] Top and bottom border: `1px solid rgba(245,160,192,0.15)`
- [ ] **Commit:** `feat(home): marquee ribbon`

---

## Task Group 3 — Selected Work Grid (`HomeWorkGrid.vue` + `HomeWorkCard.vue`)

**This is the most important section visually — take care with every detail.**

### Section Header
- [ ] "SELECTED WORK" in Clash Display, large, `--cream`
- [ ] Section label above in JetBrains Mono: `— Selected Work`
- [ ] Animated horizontal rule: `<div>` starts at `width: 0`, animates to full width on scroll enter via GSAP ScrollTrigger

### Grid Layout
- [ ] Desktop: 2-column CSS grid, `gap: 1.5rem`
- [ ] Column 2 starts at `margin-top: 4rem` (stagger offset)
- [ ] Mobile: single column, no offset
- [ ] Cards render in order: TEDxJU → KPMG → Kalmntina (KPMG and Kalmntina in column 2 and 1 respectively, or adjust to best visual balance)

### HomeWorkCard.vue — Props
```ts
interface Props {
  slug: string         // e.g. 'tedxju-2025'
  title: string
  category: string
  palette: {
    primary: string
    accent: string
    bg: string
  }
  coverImage: string   // path or placeholder
  index: number        // for stagger delay
}
```

### HomeWorkCard.vue — Implementation
- [ ] Aspect ratio: `aspect-video` on mobile, `aspect-[4/3]` on `lg:`
- [ ] `overflow: hidden`, `border-radius: 12px`
- [ ] Background: project's `palette.bg` color
- [ ] Cover image via `<ParallaxImage>` (inner image moves at 0.8× scroll speed, creating depth)
- [ ] **Scroll enter:** Clip-path reveal: `inset(100% 0 0 0)` → `inset(0% 0 0 0)` — duration 1.2s, `power4.out`, stagger by `index * 0.15s`
- [ ] **Hover — image:** `scale(1.04)`, transition 0.6s `power2.out`
- [ ] **Hover — overlay:** Project `palette.accent` color at 20% opacity fades in
- [ ] **Hover — cursor:** Sets cursor state to `view`
- [ ] **Card info bar** (absolute bottom, gradient overlay):
  - Project name: Satoshi 600, white, bottom-left
  - Category tag: JetBrains Mono pill, `--blush` text + border
- [ ] **Click:** GSAP page transition — card image expands via clip-path to fill viewport, then `navigateTo('/work/' + slug)`. Use a `<Transition>` or manual GSAP approach.
- [ ] **Commit:** `feat(home): work grid and work cards`

---

## Task Group 4 — About Teaser (`HomeAboutTeaser.vue`)

- [ ] Background: `--ink`
- [ ] Desktop: 2-column `grid-cols-[55%_45%]`, `gap: 6rem`, items centered
- [ ] Mobile: single column, image hidden on mobile (`hidden lg:block`)

### Left — Text
- [ ] Section label: JetBrains Mono eyebrow
- [ ] Heading: "GET TO KNOW ME" — Clash Display, `clamp(2.5rem, 5vw, 5rem)`, `--blush`
- [ ] Use `<RevealText by="lines">` for scroll-triggered reveal
- [ ] Body: 2–3 sentences about Layan (placeholder until she provides bio)
  - Placeholder: "I'm Layan — a marketing student at the University of Jordan with a passion for turning ideas into bold visual identities. I work across graphic design, branding, and content creation."
- [ ] CTA: `<MagneticButton>` → "More about me →", navigates to `/about`

### Right — Image
- [ ] `<NuxtImg>` or placeholder in a `<div>` with:
  - `border-radius: 20px`
  - `border: 2px solid var(--blush)`
  - `transform: rotate(-3deg)` — CSS, not GSAP
- [ ] Wrap in `<ParallaxImage speed="0.1">` for subtle parallax
- [ ] On hover: slight straighten `rotate(-1deg)` + `scale(1.02)`, transition 0.4s

- [ ] **Commit:** `feat(home): about teaser section`

---

## Task Group 5 — Services Horizontal Scroll (`HomeServicesScroll.vue`)

> Use Context7 MCP to verify GSAP ScrollTrigger pin + horizontal scroll API.

- [ ] Section heading: "WHAT I DO" — Clash Display, `--cream`
- [ ] **Desktop (lg+):** GSAP ScrollTrigger horizontal scroll
  - Pin the `<section>` container
  - Translate the inner cards wrapper: `x: -(totalWidth - viewportWidth)`
  - Scrub: `true` (scroll-linked, not time-based)
  - Cards enter and exit smoothly from right
- [ ] **Mobile:** Vertical stack — no GSAP, standard scroll, `gap: 1.5rem`

### Service Cards (4 total)
Each card is a `<div>` with:
- [ ] Background: `--ink`
- [ ] `border-top: 3px solid var(--blush)`
- [ ] `border-radius: 16px`, `padding: 2.5rem 2rem`
- [ ] Width: `clamp(280px, 30vw, 380px)` on desktop, `100%` on mobile
- [ ] Icon (large emoji or Iconify icon) — `2rem`, `margin-bottom: 1.25rem`
- [ ] Title: Satoshi 700, `--cream`
- [ ] Body: General Sans 400, `--cream` 55% opacity, `line-height: 1.7`
- [ ] **Hover:** CSS `perspective(800px) rotateX(-4deg) rotateY(4deg)` 3D tilt — CSS custom properties via `useMouse` composable if time permits, else fixed tilt on hover
- [ ] **Scroll enter (mobile):** `<RevealText>` on title + fade-in on card

Services content:
1. **Graphic Design** — "From posters to print — crafting visuals that communicate with purpose and precision."
2. **Brand Identity** — "Logos, color systems, and guidelines that build a cohesive brand world from the ground up."
3. **Content Creation** — "Scroll-stopping content tailored to each platform — visually consistent and strategically driven."
4. **Social Media** — "Feed planning, templates, and campaign design that build a brand's online presence."

- [ ] **Screenshot check:** Desktop horizontal scroll behavior, mobile vertical stack
- [ ] **Commit:** `feat(home): services horizontal scroll section`

---

## Task Group 6 — Page Transitions

> This is critical for the Awwwards feel. The transition between Home and Work pages must feel like the card expanding.

- [ ] Create `middleware/transition.global.ts`:
  - On navigation start: overlay fades in from `opacity: 0` to `opacity: 1`
  - Page content fades out
  - On navigation end: new page fades in, overlay fades out
- [ ] `app.vue`: Add a full-screen overlay `<div>` for transitions, `z-index: 500`, `--navy` bg, `pointer-events: none`
- [ ] For work card click specifically: the card's cover image expands via GSAP `clip-path` or position interpolation to fill the viewport before navigating (use `<Teleport>` to move the image to document root during animation)
- [ ] `<NuxtPage>` uses Vue `<Transition>` with `name="page"` for fallback fade
- [ ] Test: click a work card → transition → work page → browser back → transition back
- [ ] **Commit:** `feat(home): page transitions`

---

## Task Group 7 — Home Page Assembly

- [ ] Assemble `pages/index.vue` with all sections in order:
  1. `<HomeHero>`
  2. `<AppMarquee>`
  3. `<HomeWorkGrid>`
  4. `<HomeAboutTeaser>`
  5. `<HomeServicesScroll>`
  6. (Footer renders from layout)
- [ ] Ensure Lenis smooth scroll works end-to-end through all sections
- [ ] Verify ScrollTrigger markers are OFF in production, ON only when `import.meta.dev`
- [ ] Verify all scroll-triggered animations fire correctly on first load
- [ ] Test: scroll to bottom and back to top — no animation glitches
- [ ] **Screenshot check (Playwright):**
  - Mobile 375px — full page scroll screenshots
  - Tablet 768px
  - Desktop 1440px
- [ ] **Commit:** `feat(home): home page assembly and integration`

---

## Phase 2 Complete Checklist

- [ ] All 5 home sections render and animate correctly
- [ ] Custom cursor changes state (`view`) on work card hover
- [ ] Page transition between home and (placeholder) work page works
- [ ] No console errors or GSAP warnings
- [ ] Lighthouse Performance ≥ 85 (run `pnpm dlx lighthouse-ci`)
- [ ] Mobile layout is clean and readable at 375px
- [ ] All Phase 2 tasks marked `[x]`
- [ ] Final commit: `feat(home): phase 2 complete`
- [ ] Update `AGENTS.md` — set Active Phase to "Phase 3"
