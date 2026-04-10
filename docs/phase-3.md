# Phase 3 — Case Study Pages
> **Read AGENTS.md before starting any task in this phase.** `CLAUDE.md` may be used as a compatibility mirror.
> Phase 2 must be fully complete before starting Phase 3.
> Mark tasks `[x]` as completed. Commit after each task group.

**Goal:** A fully themeable, content-driven case study template that makes each project feel like its own brand universe — while being maintainable purely through markdown files.

**Estimated sessions:** 2–3 agent sessions
**Commit prefix:** `feat(work):`

---

## Pre-flight

- [ ] Re-read `AGENTS.md`
- [ ] Re-read `docs/content-schema.md` — understand the full frontmatter spec
- [ ] Re-read `docs/case-study-theming.md` — understand how CSS variable overrides work
- [ ] Re-read `docs/animations.md`
- [ ] Check `docs/assets-needed.md` — confirm which project images are available
- [ ] Run `pnpm dev` — clean start

---

## Task Group 1 — Content Schema & Markdown Files

> Read `docs/content-schema.md` before writing any markdown.

### Finalize content schema
- [ ] Confirm `docs/content-schema.md` covers all fields (refer to the schema file)
- [ ] Ensure Nuxt Content is configured to validate frontmatter schema (use `defineCollection` in `content.config.ts` with Zod schema)

### Write content files

#### `content/work/tedxju-2025.md`
- [ ] Frontmatter:
  ```yaml
  title: TEDxJU 2025
  slug: tedxju-2025
  category: Brand Identity
  year: 2025
  client: University of Jordan TEDx Chapter
  role: Graphic Designer
  tools: [Adobe Illustrator, Photoshop, Premiere Pro]
  palette:
    primary: "#EB0028"
    secondary: "#FFFFFF"
    accent: "#000000"
    bg: "#0A0A0A"
  cover: /images/tedxju/cover.jpg   # placeholder path
  heroImage: /images/tedxju/hero.jpg
  stats:
    - label: Identity Assets
      value: 40
      suffix: "+"
    - label: Event Attendees
      value: 300
      suffix: "+"
  sections: [overview, gallery, process, results, next]
  nextProject: kpmg
  ```
- [ ] Body: placeholder prose for overview and process sections (Layan to fill in)

#### `content/work/kpmg.md`
- [ ] Frontmatter:
  ```yaml
  title: KPMG
  slug: kpmg
  category: Social Media Design
  year: 2024
  client: KPMG Jordan
  role: Content Creator Intern
  tools: [Adobe Photoshop, Illustrator, Canva]
  palette:
    primary: "#00338D"
    secondary: "#FFFFFF"
    accent: "#483698"
    bg: "#E8EAF0"
  cover: /images/kpmg/cover.jpg
  heroImage: /images/kpmg/hero.jpg
  stats:
    - label: Posts Designed
      value: 60
      suffix: "+"
    - label: Campaigns
      value: 3
      suffix: ""
  sections: [overview, gallery, process, results, next]
  nextProject: kalmntina
  ```

#### `content/work/kalmntina.md`
- [ ] Frontmatter:
  ```yaml
  title: Kalmntina
  slug: kalmntina
  category: Content Creation
  year: 2024
  client: Kalmntina
  role: Social Media Intern
  tools: [Adobe Photoshop, Canva, Premiere Pro]
  palette:
    primary: "#E8731A"
    secondary: "#FFFFFF"
    accent: "#2B2B2B"
    bg: "#FFF3E0"
  cover: /images/kalmntina/cover.jpg
  heroImage: /images/kalmntina/hero.jpg
  stats:
    - label: Posts Redesigned
      value: 80
      suffix: "+"
  sections: [overview, gallery, process, results, next]
  nextProject: tedxju-2025
  ```

- [ ] **Commit:** `feat(work): case study markdown content files`

---

## Task Group 2 — Dynamic Route & Theme Setup

### `pages/work/[slug].vue`
- [ ] Use `useRoute()` to get slug
- [ ] Fetch content: `const { data } = await useAsyncData(slug, () => queryContent('work').where({ slug }).findOne())`
- [ ] If not found: `throw createError({ statusCode: 404 })`
- [ ] Call `useCaseStudyTheme(data.value.palette)` — sets `--cs-*` CSS variables on `<main>`
- [ ] Set page meta: `useHead({ title: data.value.title + ' — Layan Altaher' })`
- [ ] Render sections dynamically based on `data.value.sections` array:
  ```vue
  <template v-for="section in data.sections" :key="section">
    <WorkOverview v-if="section === 'overview'" :data="data" />
    <WorkGallery  v-if="section === 'gallery'"  :data="data" />
    <WorkProcess  v-if="section === 'process'"  :data="data" />
    <WorkResults  v-if="section === 'results'"  :data="data" />
    <WorkNextProject v-if="section === 'next'"  :slug="data.nextProject" />
  </template>
  ```
- [ ] This means adding/removing sections for any project requires only editing the markdown — zero code changes.

- [ ] **Commit:** `feat(work): dynamic slug page with theme injection and section routing`

---

## Task Group 3 — WorkHero.vue

- [ ] Full-bleed hero image (16:9 or cover fill) — `<ParallaxImage speed="0.2">` — image moves at 0.8× scroll speed
- [ ] Project name overlay: Clash Display, very large (`clamp(4rem, 10vw, 12rem)`), `--cs-secondary` color
  - Text overlaps the bottom edge of the image (negative margin-top on the text container)
  - `<RevealText by="chars">` on scroll entry
- [ ] Metadata row below image:
  - `Client · Role · Year · Category` — JetBrains Mono, 0.8rem, `--cs-primary` color, spaced with `·` dividers
  - Fades in 0.3s after heading reveals
- [ ] Background: `var(--cs-bg)`
- [ ] On mobile: image is `aspect-video`, heading font size reduced, metadata stacks vertically
- [ ] **Commit:** `feat(work): WorkHero component`

---

## Task Group 4 — WorkOverview.vue

- [ ] Background: `var(--cs-bg)`
- [ ] Two-column on desktop (`grid-cols-[55%_45%]`), single column on mobile
- [ ] **Left column:**
  - "Overview" heading in Satoshi 700, `var(--cs-primary)` color
  - Accent line: `4px` tall, `var(--cs-accent)` color, full width, below heading
  - Body text from `data.body` (rendered via `<ContentRenderer>`) — General Sans, `var(--cs-accent)` or neutral dark
- [ ] **Right column — Key facts grid:**
  - 2×N grid of fact cards (Duration, Role, Year, Tools)
  - Each card: small JetBrains Mono label in `var(--cs-primary)`, value in Satoshi 600
  - Card border: `1px solid var(--cs-primary)` 20% opacity
  - Tools rendered as small pill tags
- [ ] Scroll-triggered fade-in on both columns (staggered — left first, then right 0.2s later)
- [ ] **Commit:** `feat(work): WorkOverview component`

---

## Task Group 5 — WorkGallery.vue

> This is the showpiece section. Every project gets a different gallery layout driven by frontmatter.

- [ ] Props: `images: string[]`, `layout: 'grid-2x2' | 'horizontal-scroll' | 'before-after' | 'large-first'`
  - `layout` comes from frontmatter (add `galleryLayout` field to schema)
  - Default: `'grid-2x2'`

### Layout: `grid-2x2` (KPMG — 4 workshop posters)
- [ ] 2×2 CSS grid, `gap: 1rem`
- [ ] Each image: `<RevealImage>` with stagger (0.15s per image)
- [ ] Images have `box-shadow: 0 20px 60px rgba(0,0,0,0.2)` and slight `rotate(var(--r))` CSS custom property (random ±2deg per card, set inline)

### Layout: `horizontal-scroll` (TEDxJU — identity system spread)
- [ ] GSAP ScrollTrigger pin + horizontal scroll (same pattern as Services section)
- [ ] Each image is full-height, variable width
- [ ] Images have "spread on table" shadow + slight rotation

### Layout: `before-after` (Kalmntina — Instagram grid comparison)
- [ ] Side-by-side: "Before" left, "After" right
- [ ] Divider line in center with draggable handle (CSS `position: absolute`, JS `mousedown` + `mousemove`)
- [ ] Labels: "BEFORE" / "AFTER" in JetBrains Mono, top corners
- [ ] Mobile: stacked vertically (before on top, after below)

- [ ] Add `galleryLayout` field to content schema and all 3 markdown files
- [ ] **Screenshot check:** All 3 gallery layouts at desktop and mobile
- [ ] **Commit:** `feat(work): WorkGallery with 3 layout variants`

---

## Task Group 6 — WorkProcess.vue

- [ ] Background: slightly different shade from `var(--cs-bg)` (darken 5% via `color-mix`)
- [ ] Heading: "The Process" in Clash Display, `var(--cs-primary)`
- [ ] Body: `<ContentRenderer :value="data">` — renders the markdown body paragraphs
  - Each paragraph appears line-by-line on scroll via GSAP SplitText ScrollTrigger
  - This is the most immersive text animation — words appear as the user reads
- [ ] Inline images (from markdown `![alt](path)`) are automatically wrapped in `<ParallaxImage>` via a custom Nuxt Content component override
- [ ] On mobile: standard fade-in (no SplitText word-by-word — too heavy on mobile)
- [ ] **Commit:** `feat(work): WorkProcess component`

---

## Task Group 7 — WorkResults.vue

- [ ] Only renders if `data.stats` array exists in frontmatter
- [ ] Background: `var(--cs-primary)` — makes this section feel like an interstitial brand moment
- [ ] Text color: `var(--cs-secondary)` (white on dark primaries, navy on light)
- [ ] Heading: "Impact" in Clash Display
- [ ] Stats grid: each stat uses `<CountUp>` component
  - Number animates from 0 to target on scroll enter
  - Large Clash Display for the number (`clamp(3rem, 6vw, 6rem)`)
  - Small JetBrains Mono label below
- [ ] If no stats: component renders nothing (`v-if="data.stats?.length"`)
- [ ] **Commit:** `feat(work): WorkResults with CountUp stats`

---

## Task Group 8 — WorkNextProject.vue

- [ ] Fetches next project data: `await queryContent('work').where({ slug: props.slug }).findOne()`
- [ ] Full-width strip, background: `var(--navy)`
- [ ] "NEXT PROJECT" label — JetBrains Mono, `--blush`, top
- [ ] Next project name — Clash Display, `clamp(3rem, 8vw, 9rem)`, `--cream`, massive
- [ ] Hero image revealed via clip-path on hover: `clip-path: inset(0 100% 0 0)` → `clip-path: inset(0 0% 0 0)` — image sweeps in from right on hover
- [ ] Click: same GSAP page transition as work card on home
- [ ] Mobile: always shows image (no hover reveal), smaller type
- [ ] **Commit:** `feat(work): WorkNextProject component`

---

## Task Group 9 — Wire Up All 3 Case Studies

- [ ] Confirm all 3 routes render: `/work/tedxju-2025`, `/work/kpmg`, `/work/kalmntina`
- [ ] Verify theming: each page body has correct `--cs-*` CSS variables
  - TEDxJU: near-black background, TED red accents
  - KPMG: lavender-grey background, KPMG blue accents
  - Kalmntina: warm cream background, orange accents
- [ ] Test circular navigation: TEDxJU → next → KPMG → next → Kalmntina → next → TEDxJU
- [ ] Verify `useCaseStudyTheme` resets correctly when navigating back to home (no color bleed)
- [ ] **Screenshot check (Playwright):** All 3 case study pages at desktop and mobile
- [ ] **Commit:** `feat(work): all 3 case studies wired and themed`

---

## Task Group 10 — How Layan Adds a New Case Study

> This is the payoff of the content-driven architecture. Document it for Layan.

- [ ] Create `docs/how-to-add-case-study.md` with step-by-step instructions:
  1. Duplicate any existing `.md` file in `content/work/`
  2. Update all frontmatter fields (title, slug, palette, images, stats)
  3. Write body text in markdown below the frontmatter
  4. Add images to the correct folder in `public/images/[slug]/`
  5. Commit and Vercel auto-deploys

- This requires zero knowledge of Vue, Nuxt, or CSS. The design system handles all styling automatically.
- [ ] **Commit:** `docs: how-to-add-case-study guide for Layan`

---

## Phase 3 Complete Checklist

- [ ] All 3 case study pages render with correct color worlds
- [ ] All gallery layout variants work (grid, horizontal scroll, before-after)
- [ ] WorkProcess word-by-word animation works on desktop
- [ ] WorkNextProject hover reveal works
- [ ] Page transitions between case studies work
- [ ] No CSS variable bleed between pages
- [ ] `pnpm generate` runs without errors (SSG check)
- [ ] Mobile layouts clean on all 3 case study pages
- [ ] All Phase 3 tasks marked `[x]`
- [ ] Final commit: `feat(work): phase 3 complete`
- [ ] Update `AGENTS.md` — set Active Phase to "Phase 4"
