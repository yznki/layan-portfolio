# Case Study Theming
> How per-project color worlds work in this codebase.
> Read before implementing any case study page or component.

---

## The Problem

Each case study page needs to feel like a completely different brand universe:
- TEDxJU: near-black background, bold TED red
- KPMG: soft lavender-grey, corporate blue
- Kalmntina: warm cream, vibrant orange

But we have a single shared component tree (`WorkHero`, `WorkOverview`, etc.).

---

## The Solution: CSS Variable Override via `useCaseStudyTheme`

### How it works

1. Each case study markdown file defines a `palette` in frontmatter
2. `pages/work/[slug].vue` calls `useCaseStudyTheme(data.palette)` on mount
3. The composable sets `--cs-*` CSS variables on the `<main>` element
4. All case study components use `var(--cs-primary)`, `var(--cs-bg)` etc. — never raw colors
5. On unmount, the composable resets all `--cs-*` variables to their defaults

### CSS Variables Reference

```css
/* Default values (set in tokens.css) */
:root {
  --cs-primary:   var(--navy);
  --cs-secondary: var(--cream);
  --cs-accent:    var(--blush);
  --cs-bg:        var(--navy);
}
```

### `useCaseStudyTheme` Implementation

```ts
// composables/useCaseStudyTheme.ts
interface Palette {
  primary:   string
  secondary: string
  accent:    string
  bg:        string
}

export function useCaseStudyTheme(palette: Palette) {
  const applyTheme = () => {
    const main = document.querySelector('main')
    if (!main) return
    main.style.setProperty('--cs-primary',   palette.primary)
    main.style.setProperty('--cs-secondary', palette.secondary)
    main.style.setProperty('--cs-accent',    palette.accent)
    main.style.setProperty('--cs-bg',        palette.bg)
  }

  const resetTheme = () => {
    const main = document.querySelector('main')
    if (!main) return
    main.style.removeProperty('--cs-primary')
    main.style.removeProperty('--cs-secondary')
    main.style.removeProperty('--cs-accent')
    main.style.removeProperty('--cs-bg')
  }

  onMounted(applyTheme)
  onUnmounted(resetTheme)
}
```

---

## Component Rules

### ✅ DO: Use `--cs-*` variables in case study components
```css
.work-hero-title { color: var(--cs-secondary); }
.work-section    { background: var(--cs-bg); }
.accent-line     { background: var(--cs-primary); }
```

### ❌ DON'T: Use global palette colors in case study components
```css
/* Wrong — this won't change per project */
.work-hero-title { color: var(--cream); }
.work-section    { background: var(--navy); }
```

### ❌ DON'T: Hard-code colors in case study components
```css
/* Wrong */
.work-hero-title { color: #FFFFFF; }
```

---

## Per-Project Themes

### TEDxJU 2025
```
--cs-primary:   #EB0028  (TED Red)
--cs-secondary: #FFFFFF  (White)
--cs-accent:    #000000  (Black)
--cs-bg:        #0A0A0A  (Near-black)
```
**Visual feel:** Dark, dramatic, high-contrast. Red pops off the near-black.

### KPMG
```
--cs-primary:   #00338D  (KPMG Blue)
--cs-secondary: #FFFFFF  (White)
--cs-accent:    #483698  (KPMG Purple)
--cs-bg:        #E8EAF0  (Soft lavender-grey)
```
**Visual feel:** Light, professional, corporate. Blue and purple on a soft neutral.
**Special note:** This is the only case study with a LIGHT background. Ensure text colors work on light bg — use `--cs-accent` (#483698) or dark neutral for body text, not `--cs-secondary` (#FFFFFF).

### Kalmntina
```
--cs-primary:   #E8731A  (Kalmntina Orange)
--cs-secondary: #FFFFFF  (White)
--cs-accent:    #2B2B2B  (Near-black)
--cs-bg:        #FFF3E0  (Warm cream)
```
**Visual feel:** Warm, inviting, brand-forward. Like stepping into a café.
**Special note:** Also a light background. Same consideration as KPMG — use dark colors for body text.

---

## Light Background Handling

For KPMG and Kalmntina (light `--cs-bg`), components need to adapt text color.

The cleanest approach: add a `data-theme-light` attribute to `<main>` when `--cs-bg` luminance is high.

```ts
// In useCaseStudyTheme, after setting variables:
const isLight = isLightColor(palette.bg) // luminance check
main.setAttribute('data-theme-light', isLight ? 'true' : 'false')
```

```css
/* In component styles */
[data-theme-light="true"] .body-text {
  color: var(--ink);       /* dark text on light bg */
}
[data-theme-light="false"] .body-text {
  color: var(--cream);     /* light text on dark bg */
}
```

Simple luminance check:
```ts
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  // Relative luminance formula
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
}
```

---

## Adding a New Project Theme

When Layan adds a new case study in the future:

1. Define the `palette` in the markdown frontmatter
2. No code changes needed — `useCaseStudyTheme` handles the rest
3. If the new project has a very unusual palette, check contrast ratios manually
4. The light/dark background detection is automatic via luminance check
