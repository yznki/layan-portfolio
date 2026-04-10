# Animations Playbook
> The agent must read this file before implementing any animation.
> Every animation in this project must have a narrative purpose.
> Motion serves storytelling — never decoration.

---

## Core Philosophy

1. **Restraint over spectacle.** One well-executed reveal is worth ten mediocre ones.
2. **Scroll reveals unveil content.** The act of scrolling feels like pulling back a curtain — content is always "ready" below, waiting to be revealed.
3. **60fps everywhere.** Animate only `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `margin`, or `padding`.
4. **Ease language:** Use `power3.out` or `power4.out` for entrances. Use `power2.inOut` for transitions. Never use `ease-linear` for UI motion.
5. **Duration budgets:** Headlines: 0.8–1.0s. Images: 1.0–1.2s. UI elements: 0.3–0.5s. Page transitions: 0.6–0.8s.

---

## GSAP Setup

### Plugin Registration (`plugins/gsap.client.ts`)
```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Only show markers in dev
if (import.meta.dev) {
  // ScrollTrigger.defaults({ markers: true }) // uncomment when debugging
}

export default defineNuxtPlugin(() => {
  return { provide: { gsap } }
})
```

### Lenis Sync (`plugins/lenis.client.ts`)
```ts
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return { provide: { lenis } }
})
```

---

## Animation Patterns

### 1. Text Reveal — Characters (Hero Headings)

```ts
// composables/useSplitText.ts
const split = new SplitText(el, { type: 'chars' })

gsap.from(split.chars, {
  y: '110%',
  opacity: 0,
  duration: 0.8,
  ease: 'power4.out',
  stagger: 0.04,
  delay: props.delay ?? 0,
  onComplete: () => split.revert(), // clean up DOM after animation
})
```

**When to use:** Hero headings, preloader name, large display text.

---

### 2. Text Reveal — Lines (Section Headings on Scroll)

```ts
const split = new SplitText(el, { type: 'lines', linesClass: 'line-wrapper' })
// wrap each line in overflow:hidden via CSS: .line-wrapper { overflow: hidden }

gsap.from(split.lines, {
  y: '105%',
  duration: 0.9,
  ease: 'power3.out',
  stagger: 0.1,
  scrollTrigger: {
    trigger: el,
    start: 'top 85%',
    once: true,
  },
})
```

**When to use:** Section headings, case study titles.

---

### 3. Text Reveal — Words (Process Body Text)

```ts
const split = new SplitText(el, { type: 'words' })

gsap.from(split.words, {
  opacity: 0,
  y: 10,
  duration: 0.4,
  ease: 'power2.out',
  stagger: 0.015,
  scrollTrigger: {
    trigger: el,
    start: 'top 80%',
    once: true,
  },
})
```

**When to use:** Case study process/narrative paragraphs (desktop only — skip on mobile for performance).

---

### 4. Image Reveal — Clip Path (Work Cards, Gallery Images)

```ts
gsap.fromTo(img.parentElement, 
  { clipPath: 'inset(100% 0 0 0)' },
  {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
    delay: props.index * 0.15, // stagger for grid
  }
)
```

**When to use:** Work cards on home, gallery images in case studies, about page portrait.

---

### 5. Parallax Image (Hero Images, About Portrait)

```ts
gsap.to(img, {
  y: `${speed * 15}%`,   // e.g. speed=1 → moves 15% downward
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,         // scroll-linked
  },
})
```

**When to use:** Hero images on home and case study pages. Portrait on About page. Speed: 0.1–0.3 (subtle). Never use on mobile.

---

### 6. Horizontal Scroll — Services / Gallery

```ts
const totalWidth = track.scrollWidth - window.innerWidth

gsap.to(track, {
  x: -totalWidth,
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: `+=${totalWidth}`,
    pin: true,
    scrub: 1,           // 1 = slight lag/smoothing
    anticipatePin: 1,
  },
})
```

**When to use:** Services section on home, `horizontal-scroll` gallery layout in case studies.
**Important:** Disable completely on mobile. Use `ScrollTrigger.matchMedia` or check `window.innerWidth` before initializing.

---

### 7. Staggered Grid Reveal (Work Cards, Skill Cards)

```ts
ScrollTrigger.batch(cards, {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    })
  },
  start: 'top 88%',
  once: true,
})
```

**When to use:** Work card grid on home, skills grid on About page, reels grid.

---

### 8. Animated Horizontal Rule

```ts
gsap.from(rule, {
  scaleX: 0,
  transformOrigin: 'left center',
  duration: 1.0,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: rule,
    start: 'top 85%',
    once: true,
  },
})
```

**When to use:** Below section headings in work grid and case study overview.

---

### 9. Timeline Line Draw (About Page)

```ts
gsap.from(line, {
  scaleY: 0,
  transformOrigin: 'top center',
  duration: 1.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: timeline,
    start: 'top 75%',
    once: true,
  },
})

// Dots: staggered scale-in after line starts
gsap.from(dots, {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  ease: 'back.out(2)',
  stagger: 0.2,
  delay: 0.3,
  scrollTrigger: {
    trigger: timeline,
    start: 'top 75%',
    once: true,
  },
})
```

---

### 10. Page Transition

```ts
// On navigate-away:
gsap.to(overlay, {
  scaleY: 1,
  transformOrigin: 'bottom center',
  duration: 0.5,
  ease: 'power4.inOut',
  onComplete: () => router.push(target),
})

// On new page mount:
gsap.from(overlay, {
  scaleY: 1,
  transformOrigin: 'top center',
  duration: 0.5,
  ease: 'power4.inOut',
  onComplete: () => { overlay.style.display = 'none' },
})
```

---

### 11. Preloader Exit

```ts
// Counter tween
gsap.to(counterObj, {
  val: 100,
  duration: 2.2,
  ease: 'power1.inOut',
  onUpdate: () => { counter.textContent = Math.round(counterObj.val) + '%' },
  onComplete: exitPreloader,
})

// Exit: curtain wipe upward
function exitPreloader() {
  gsap.to(preloader, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 0.8,
    ease: 'power4.inOut',
    onComplete: () => {
      preloader.style.display = 'none'
      emit('done')
    },
  })
}
```

---

### 12. Magnetic Button

```ts
// composables/useMagnetic.ts
const handleMouseMove = (e: MouseEvent) => {
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (e.clientX - centerX) * strength
  const deltaY = (e.clientY - centerY) * strength

  gsap.to(el, {
    x: deltaX,
    y: deltaY,
    duration: 0.4,
    ease: 'power2.out',
  })
}

const handleMouseLeave = () => {
  gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
}
```

---

## Reduced Motion

Wrap all GSAP animations in this check:

```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReduced) {
  // Show elements immediately, skip animation
  gsap.set(el, { opacity: 1, y: 0, clipPath: 'inset(0)' })
} else {
  // Run full animation
}
```

Or use the GSAP global approach in the plugin:
```ts
gsap.defaults({ duration: prefersReduced ? 0 : undefined })
```

---

## Cleanup

Always clean up GSAP animations and ScrollTriggers in `onUnmounted`:

```ts
onUnmounted(() => {
  scrollTriggerInstance?.kill()
  splitTextInstance?.revert()
  gsapTween?.kill()
})
```

This prevents memory leaks during Nuxt page navigation.

---

## Mobile Strategy

| Animation | Desktop | Mobile |
|-----------|---------|--------|
| SplitText chars | ✅ Full | ✅ Full |
| SplitText words | ✅ Full | ❌ Skip (fade-in only) |
| Parallax images | ✅ Full | ❌ Skip (static) |
| Horizontal scroll | ✅ Full | ❌ Skip (vertical stack) |
| Clip-path reveals | ✅ Full | ✅ Full |
| Staggered grids | ✅ Full | ✅ Reduced stagger (0.06s) |
| Magnetic button | ✅ Full | ❌ Skip (pointer:coarse) |
| Custom cursor | ✅ Full | ❌ Hidden |
| Preloader | ✅ Full | ✅ Full |
| Page transitions | ✅ Full | ✅ Simplified (opacity only) |

Use `ScrollTrigger.matchMedia` or check `window.matchMedia('(pointer: coarse)')` to conditionally apply mobile-specific animation config.
