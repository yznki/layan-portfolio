# Phase 1 — Foundation & Design System
> **Read AGENTS.md before starting any task in this phase.** `CLAUDE.md` may be used as a compatibility mirror.
> Mark tasks `[x]` as you complete them. Commit after each task group.

**Goal:** A running Nuxt 4 project with the full design system in place, all global components built, and the dev environment wired up so every subsequent phase builds on a rock-solid base.

**Estimated sessions:** 1–2 agent sessions
**Commit prefix:** `feat(foundation):`

---

## Pre-flight Checklist

- [x] Verify Node.js ≥ 20 is installed
- [x] Verify `pnpm` is installed (use pnpm throughout — not npm or yarn)
- [x] Verify Context7 MCP is active — resolve Nuxt 4 docs before scaffolding
- [ ] Verify GitHub MCP is active — repo should be created before first commit

---

## Task Group 1 — Project Scaffold

- [x] Scaffold Nuxt 4 project: `pnpm dlx nuxi@latest init layan-portfolio`
- [x] Install all dependencies in one pass:
  ```bash
  pnpm add gsap @studio-freight/lenis @nuxt/content @nuxt/image @vueuse/nuxt @vueuse/core nuxt-icon
  pnpm add -D @nuxtjs/tailwindcss
  ```
- [x] Configure `nuxt.config.ts`:
  - Enable modules: `@nuxtjs/tailwindcss`, `@nuxt/content`, `@nuxt/image`, `nuxt-icon`, `@vueuse/nuxt`
  - Set `ssr: false` for client-only pages is NOT correct — use `routeRules` for SSG: `{ '/**': { prerender: true } }`
  - Set `app.head` with preconnect for Google Fonts (JetBrains Mono only)
  - Set `content.highlight` for any code blocks in case studies
- [x] Create `tailwind.config.ts` extending the default theme with custom font families:
  - `display: ['Clash Display', 'serif']`
  - `heading: ['Satoshi', 'sans-serif']`
  - `body: ['General Sans', 'sans-serif']`
  - `mono: ['JetBrains Mono', 'monospace']`
- [ ] **Commit:** `feat(foundation): scaffold Nuxt 4 project and install dependencies`

---

## Task Group 2 — Fonts & CSS Tokens

- [x] Download Clash Display, Satoshi, General Sans from Fontshare and place `.woff2` files in `public/fonts/`
  - Weights needed: ClashDisplay 600, 700 | Satoshi 500, 700 | GeneralSans 400, 500
- [x] Create `assets/css/fonts.css` with `@font-face` declarations for all 7 font files
  - Use `font-display: swap` on all
  - Use `unicode-range` to limit to Latin for performance
- [x] Create `assets/css/tokens.css`:
  ```css
  :root {
    --navy:  #0F1B4C;
    --blush: #F5A0C0;
    --cream: #FFF5F0;
    --ink:   #1A1A2E;

    /* Case study theme overrides (set via useCaseStudyTheme composable) */
    --cs-primary:    var(--navy);
    --cs-secondary:  var(--cream);
    --cs-accent:     var(--blush);
    --cs-bg:         var(--navy);
  }
  ```
- [x] Create `assets/css/main.css`:
  - Import Tailwind directives
  - Import `tokens.css` and `fonts.css`
  - Global resets: `cursor: none` on body, `scroll-behavior: smooth`, custom scrollbar (`4px`, `--blush`)
  - Grain texture utility class `.grain` (SVG noise filter, `opacity: 0.035`)
  - Selection styles: `::selection { background: var(--blush); color: var(--navy); }`
- [x] Import `main.css` in `nuxt.config.ts` via `css: ['~/assets/css/main.css']`
- [ ] **Screenshot check:** Run `pnpm dev`, Playwright screenshot to confirm fonts and background color loading correctly
- [ ] **Commit:** `feat(foundation): fonts, CSS tokens, and global styles`

---

## Task Group 3 — GSAP & Lenis Plugins

> Use Context7 MCP to verify current GSAP 3 / Lenis API before writing plugins.

- [x] Create `plugins/gsap.client.ts`:
  - Import `gsap`, `ScrollTrigger`, `SplitText` from `gsap`
  - Register `ScrollTrigger` and `SplitText` as plugins
  - Set `ScrollTrigger.defaults({ markers: false })` — markers only in dev via `import.meta.dev`
  - Export `gsap` as a Nuxt plugin via `provide: { gsap }`
- [x] Create `plugins/lenis.client.ts`:
  - Initialize Lenis with `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - Sync with GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
  - Set `gsap.ticker.lagSmoothing(0)`
  - Provide Lenis instance: `provide: { lenis }`
- [ ] **Commit:** `feat(foundation): GSAP ScrollTrigger + Lenis plugins`

---

## Task Group 4 — Composables

- [x] Create `composables/useGsap.ts`:
  - Wrapper that uses `useNuxtApp().$gsap` safely (only on client)
  - Returns `{ gsap, ScrollTrigger, SplitText }`
- [x] Create `composables/useSplitText.ts`:
  - Accepts a `Ref<HTMLElement>` and animation config
  - Splits by chars or lines, creates ScrollTrigger on scroll enter
  - Cleans up on `onUnmounted`
- [x] Create `composables/useParallax.ts`:
  - Accepts element ref + `speed` factor (default `0.15`)
  - Uses GSAP ScrollTrigger to translate Y from `-15%` to `15%` over scroll range
- [x] Create `composables/useMagnetic.ts`:
  - Accepts element ref + `strength` (default `0.4`)
  - On `mousemove`, translates element toward cursor within bounding box
  - Resets on `mouseleave` with spring ease
- [x] Create `composables/useCaseStudyTheme.ts`:
  - Accepts a `palette` object `{ primary, secondary, accent, bg }`
  - On mount, sets `--cs-*` CSS variables on the page `<main>` element
  - On unmount, resets to defaults
  - Used in `pages/work/[slug].vue`
- [ ] **Commit:** `feat(foundation): composables (GSAP, SplitText, parallax, magnetic, theme)`

---

## Task Group 5 — Global Components

### AppCursor.vue
- [ ] Fixed position, `pointer-events: none`, `z-index: 9999`
- [ ] Outer ring: 36×36px, `border: 2px solid var(--blush)`, circle, `mix-blend-mode: difference`
- [ ] Inner dot: 6×6px, `background: var(--blush)`
- [ ] Both follow mouse with `gsap.to` and `ease: 'power3.out'` — outer lags slightly (duration 0.6), inner snaps (duration 0.15)
- [ ] Expose a global `cursor` state (`default` | `hover` | `view` | `drag`) — components emit hover intent via `provide/inject` or `useEventBus`
- [ ] On `hover`: outer ring scales to 64px, reduces opacity of inner dot
- [ ] On `view`: outer ring shows "VIEW" text label in JetBrains Mono 10px, centered
- [ ] Hidden on touch devices (`@media (pointer: coarse)`)

### AppPreloader.vue
- [ ] Full-screen `--navy` bg, `position: fixed`, `z-index: 9000`
- [ ] "LAYAN" in Clash Display 700, `clamp(3rem, 10vw, 8rem)`, letter-by-letter GSAP stagger reveal (0.05s per char) from `translateY(110%)`
- [ ] Subtitle: "Graphic Design · Branding · Content" — General Sans italic, fades up at 0.3s delay
- [ ] Counter: bottom-right, JetBrains Mono, `0%` → `100%` — tween synced with `Promise.all` of image preloads (or a simple 2.2s tween if assets not yet present)
- [ ] Exit: `clip-path: inset(0 0 0 0)` → `inset(0 0 100% 0)` (wipe upward) at end of counter, 0.8s `power4.inOut`
- [x] Emits `done` event — parent (`app.vue`) listens and sets `preloaderDone: true` to unlock scroll and show nav

### AppNav.vue
- [ ] Fixed top, full width, `z-index: 100`
- [ ] Logo left: "LA" monogram in Clash Display, `--blush`, links to `/`
- [ ] Links right: Work · About · Reels · Contact — General Sans, 0.75rem, JetBrains Mono labels, uppercase, spaced
- [ ] Starts invisible, fades in after preloader emits `done`
- [ ] On scroll down > 80px: nav background becomes `rgba(15,27,76,0.8)` with `backdrop-filter: blur(16px)`
- [ ] Mobile: hamburger icon (3 lines → X), fullscreen overlay menu with large Clash Display links, staggered GSAP entrance
- [ ] Active link: `--blush` color with small dot indicator below

### AppFooter.vue
- [ ] Background: `linear-gradient(to bottom, var(--ink), var(--navy))`
- [ ] Large CTA: "LET'S WORK TOGETHER" — Clash Display, `clamp(2.5rem, 6vw, 7rem)`, `--blush`
- [ ] SplitText per-letter hover: each letter shifts `translateY(-8px)` on hover with GSAP stagger
- [ ] Email + phone as clickable links in JetBrains Mono
- [ ] Social icons row: IG · LI · Behance — 44px circles, `--blush` border, hover fill
- [ ] Copyright: JetBrains Mono 0.7rem, `--cream` 30% opacity
- [ ] Radial gradient glow behind CTA heading (`--blush` 8% opacity)

### AppMarquee.vue
- [ ] Props: `items: string[]`, `speed: number = 60`, `direction: 'left' | 'right' = 'left'`
- [ ] CSS animation (`translateX(-50%)`) on duplicated content array for seamless loop
- [ ] `animation-play-state: paused` on hover
- [ ] Wrapper: `transform: rotate(-2deg) scaleX(1.05)` for tilted energy
- [ ] Default items: `['GRAPHIC DESIGN', 'BRANDING', 'CONTENT CREATION', 'SOCIAL MEDIA', 'LOGO DESIGN', 'VISUAL IDENTITY']`

- [ ] **Screenshot check:** Playwright screenshot of all global components in isolation (use a test page)
- [ ] **Commit:** `feat(foundation): global components (Cursor, Preloader, Nav, Footer, Marquee)`

---

## Task Group 6 — UI Primitives

- [x] **RevealText.vue** — Wraps any heading. On mount + scroll enter, runs SplitText reveal (chars for display, lines for body). Props: `by: 'chars' | 'lines' | 'words'`, `stagger: number`, `delay: number`
- [x] **RevealImage.vue** — Wraps `<NuxtImg>`. Clip-path reveal on scroll enter: `inset(100% 0 0 0)` → `inset(0% 0 0 0)`. Props: `duration: number`, `delay: number`
- [x] **ParallaxImage.vue** — Wraps `<NuxtImg>`. GSAP ScrollTrigger parallax. Props: `speed: number`
- [x] **MagneticButton.vue** — Wraps any button/link. Uses `useMagnetic`. Props: `strength: number`. Pill shape, `--blush` bg, `--navy` text by default. Slot-based.
- [x] **CountUp.vue** — Animates a number from 0 to `target` on scroll enter. Props: `target: number`, `suffix: string`, `duration: number`. Uses GSAP tween.
- [ ] **Commit:** `feat(foundation): UI primitive components`

---

## Task Group 7 — Default Layout & App Shell

- [x] `layouts/default.vue`: Renders `<AppNav>` + `<slot>` + `<AppFooter>`
- [x] `app.vue`:
  - Renders `<AppPreloader>` + `<AppCursor>` + `<NuxtLayout>` + `<NuxtPage>`
  - Manages `preloaderDone` state — on `done`, unlocks Lenis scroll and shows nav
  - Sets `lenis.stop()` during preloader, `lenis.start()` after
- [x] `pages/index.vue`: Empty shell with `<NuxtLayout>` — populated in Phase 2
- [ ] Verify `pnpm dev` runs cleanly with no console errors
- [ ] **Screenshot check:** Playwright screenshot confirming preloader → nav transition
- [ ] **Commit:** `feat(foundation): app shell, default layout, page transition setup`

---

## Task Group 8 — Content Schema & Docs

- [x] Create `docs/content-schema.md` (see separate file)
- [x] Create `docs/case-study-theming.md` (see separate file)
- [x] Create `docs/animations.md` (see separate file)
- [x] Create `docs/assets-needed.md` (see separate file)
- [x] Create `docs/component-api.md` — start populating as components are built
- [x] Create placeholder content files:
  - `content/work/kpmg.md` — frontmatter only, placeholder body
  - `content/work/tedxju-2025.md` — frontmatter only, placeholder body
  - `content/work/kalmntina.md` — frontmatter only, placeholder body
- [ ] **Commit:** `docs: content schema, animation playbook, assets checklist, component API`

---

## Phase 1 Complete Checklist

Before marking Phase 1 done and moving to Phase 2:

- [ ] `pnpm dev` runs with no errors or warnings
- [ ] All 5 global components render correctly
- [ ] Preloader → nav transition works
- [ ] Custom cursor tracks mouse and scales on hover targets
- [ ] Fonts load correctly (Clash Display, Satoshi, General Sans, JetBrains Mono)
- [ ] CSS tokens are accessible and correct in browser devtools
- [ ] Mobile layout of Nav (hamburger) works on 375px viewport
- [ ] Playwright screenshots confirm visual correctness
- [ ] All Phase 1 tasks marked `[x]`
- [ ] Final commit: `feat(foundation): phase 1 complete`
- [ ] Update `AGENTS.md` — set Active Phase to "Phase 2"
