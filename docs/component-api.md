# Component API Reference

> Auto-generated from finalized component implementations. Last updated: Phase 4 complete.

---

## Global Components

### `AppCursor`

Custom mouse cursor overlay. Client-only. Injects `cursorState` from `app.vue`.

**Props:** none (state via injection)

**Cursor states** (injected as `cursorState: Ref<string>`):

| State | Visual |
|-------|--------|
| `default` | Small dot + ring at normal size |
| `hover` | Ring expands slightly, dot grows |
| `view` | Ring expands to 80px, dot hidden, "VIEW" label visible |
| `drag` | Ring expands to 70px, "DRAG" label visible |

**Usage:** Rendered once in `app.vue` inside `<ClientOnly>`. Do not render manually.

---

### `AppNav`

Fixed navigation bar. Scroll-blurs background after 80px.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `true` | Controls opacity/pointer-events (used with preloader) |

**Emits:** none

**Provides:** nothing (listens to `navVisible` from `app.vue` via prop binding)

---

### `AppPreloader`

Full-screen loading animation. Letters stagger in, counter tweens to 100, wipes upward.

**Props:** none

**Emits:**

| Event | Payload | Description |
|-------|---------|-------------|
| `done` | — | Fired when exit animation completes |

---

### `AppFooter`

Site footer with "LET'S WORK TOGETHER" per-letter hover effect, social links, and copyright.

**Props:** none

---

### `AppMarquee`

Horizontally scrolling marquee strip.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | required | Text items to display (auto-doubled for seamless loop) |
| `duration` | `number` | `20` | Animation duration in seconds |
| `direction` | `'left' \| 'right'` | `'left'` | Scroll direction |

---

## UI Components

### `RevealText`

Wraps slot text with a GSAP SplitText scroll-triggered reveal.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `by` | `'chars' \| 'words' \| 'lines'` | `'lines'` | SplitText split type |
| `stagger` | `number` | `0.05` | Stagger delay between units (seconds) |
| `duration` | `number` | `1.0` | Animation duration per unit |
| `delay` | `number` | `0` | Delay before animation starts |
| `immediate` | `boolean` | `false` | Play immediately on mount (skip ScrollTrigger) |

**Usage:**
```vue
<RevealText by="chars">ABOUT</RevealText>
<RevealText by="words" :stagger="0.08">Some longer heading text</RevealText>
```

---

### `MagneticButton`

Button/link with magnetic hover effect that follows the cursor.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `string` | `undefined` | Renders as `<NuxtLink>` when provided |
| `href` | `string` | `undefined` | Renders as `<a>` when provided (use for external) |
| `strength` | `number` | `0.4` | Magnetic pull strength (0 = none, 1 = full cursor tracking) |
| `tag` | `string` | `'button'` | Fallback element tag when no `to`/`href` |

**Emits:**

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Forwarded from inner element |

**Sets cursor state to `'hover'`** on mouseenter.

---

### `CountUp`

Animated number counter that tweens from 0 to the target value on scroll entry.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Target number |
| `suffix` | `string` | `''` | Text appended after number (e.g. `'%'`, `'+'`) |
| `duration` | `number` | `2` | Tween duration in seconds |
| `prefix` | `string` | `''` | Text prepended before number |

**Usage:**
```vue
<CountUp :value="47" suffix="+" />
<CountUp :value="100" suffix="%" prefix="~" />
```

---

### `RevealImage`

Clip-path scroll reveal wrapper for images.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source path |
| `alt` | `string` | required | Alt text |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Reveal direction |
| `duration` | `number` | `1.2` | Animation duration |

---

### `ParallaxImage`

Image with GSAP ScrollTrigger parallax offset.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source path |
| `alt` | `string` | required | Alt text |
| `speed` | `number` | `0.3` | Parallax intensity (0 = no parallax, 1 = full scroll speed) |
| `imgClass` | `string` | `''` | Extra classes on inner `<NuxtImg>` |

---

## Home Components

### `HomeHero`

Full-viewport hero section with animated heading, Ken Burns image, location pill.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preloaderDone` | `boolean` | `false` | Triggers entrance animation when `true` |

---

### `HomeWorkCard`

Case study preview card in the work grid.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slug` | `string` | required | Case study slug (links to `/work/[slug]`) |
| `title` | `string` | required | Project title |
| `category` | `string` | required | Category label |
| `year` | `string \| number` | required | Year |
| `coverImage` | `string` | required | Cover image path |
| `palette` | `object` | required | `{ bg: string, primary: string }` — used for card tint |

---

### `HomeServicesScroll`

Horizontal scroll (desktop) or vertical stack (mobile) of service cards with 3D tilt.

**Props:** none (services are hardcoded — edit component to update)

---

### `HomeAboutTeaser`

Teaser section linking to the About page.

**Props:** none

---

## Work Components

### `WorkHero`

Case study hero — always first in the section order.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Project title |
| `category` | `string` | required | Category label |
| `year` | `string \| number` | required | Year |
| `coverImage` | `string` | required | Hero image path |
| `palette` | `object` | required | `{ primary, secondary, accent, bg }` |

---

### `WorkOverview`

Two-column overview: description left, meta/stats right.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | required | Project description (supports basic Markdown) |
| `client` | `string` | required | Client name |
| `role` | `string` | required | Designer's role on project |
| `year` | `string \| number` | required | Year |
| `stats` | `Array<{label: string, value: number, suffix?: string}>` | `[]` | Animated stat counters |

---

### `WorkGallery`

Flexible gallery section. Supports three layout variants.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `Array<{src: string, alt: string, caption?: string}>` | required | Gallery images |
| `layout` | `'grid-2x2' \| 'horizontal-scroll' \| 'before-after'` | `'grid-2x2'` | Layout variant |

**Layout notes:**
- `grid-2x2` — 2×2 CSS grid, each image has 3D tilt + clip-path reveal on scroll
- `horizontal-scroll` — GSAP pinned horizontal scroll (desktop only; falls back to vertical on mobile)
- `before-after` — Drag divider; `images[0]` = before, `images[1]` = after

---

### `WorkProcess`

Process steps section with SplitText word reveal (desktop) or fade (mobile).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Array<{heading: string, body: string}>` | required | Process steps |

---

### `WorkResults`

Results/outcomes section with `<CountUp>` stats and summary text.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `summary` | `string` | required | Outcome summary paragraph |
| `stats` | `Array<{label: string, value: number, suffix?: string}>` | `[]` | Animated stat counters |

---

### `WorkNextProject`

"Next project" teaser at the bottom of each case study — fetches the next project from Content.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slug` | `string` | required | Slug of the next project to display |

---

## Composables

### `useGsap()`

Returns GSAP instances (server-safe — returns `null` on SSR).

```ts
const { gsap, ScrollTrigger, SplitText } = useGsap()
// Always guard: if (!gsap) return
```

### `useCaseStudyTheme(palette)`

Sets `--cs-primary/secondary/accent/bg` CSS variables on `<main>`. Removes on unmount.

```ts
// In pages/work/[slug].vue
useCaseStudyTheme(data.value.palette)
```

### `useSplitText(el, options)`

Wraps GSAP SplitText with scroll-triggered entrance. Used internally by `RevealText`.

### `useMagnetic(el, options)`

Adds magnetic hover effect to an element. Used internally by `MagneticButton`.

### `useParallax(el, speed)`

Attaches GSAP ScrollTrigger parallax to an element. Used internally by `ParallaxImage`.
