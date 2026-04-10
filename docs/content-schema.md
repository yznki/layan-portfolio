# Case Study Content Schema
> This file defines the frontmatter spec for all `content/work/*.md` files.
> Every field listed here must be present in every case study markdown file.
> The agent must read this file before creating or modifying any content file.

---

## Full Frontmatter Spec

```yaml
---
# ─── Identity ─────────────────────────────────────────────
title: string          # Display title, e.g. "TEDxJU 2025"
slug: string           # URL-safe, matches filename, e.g. "tedxju-2025"
category: string       # e.g. "Brand Identity", "Social Media Design", "Content Creation"
year: number           # e.g. 2025
client: string         # Full client name
role: string           # Layan's role on the project
tools: string[]        # Tools used, e.g. ["Adobe Illustrator", "Photoshop"]
draft: boolean         # Set to true to hide from grid while WIP (default: false)

# ─── Palette ──────────────────────────────────────────────
# These override --cs-* CSS variables for the entire case study page
palette:
  primary: string      # Hex — main brand color, used for headings and accents
  secondary: string    # Hex — contrasting color (usually white or cream)
  accent: string       # Hex — secondary accent
  bg: string           # Hex — page background color

# ─── Images ───────────────────────────────────────────────
cover: string          # Path to grid cover image, e.g. "/images/kpmg/cover.jpg"
                       # Aspect ratio: 4:3 — used in HomeWorkCard
heroImage: string      # Path to full-bleed hero image — 16:9 or wider
                       # Used in WorkHero

# ─── Gallery ──────────────────────────────────────────────
galleryLayout: string  # One of: "grid-2x2" | "horizontal-scroll" | "before-after" | "large-first"
gallery:               # Array of image objects
  - src: string        # Path to image file
    alt: string        # Alt text (required for accessibility)
    caption: string    # Optional caption shown below image
    width: number      # Optional: intrinsic width for NuxtImg sizing hints
    height: number     # Optional: intrinsic height

# ─── Stats / Impact ───────────────────────────────────────
# Optional — if present, WorkResults section renders
stats:
  - label: string      # e.g. "Posts Designed"
    value: number      # The number CountUp animates to
    suffix: string     # e.g. "+" or "%" or "" (empty string if none)

# ─── Sections ─────────────────────────────────────────────
# Controls which sections appear and in what order on the case study page
# Valid values: overview | gallery | process | results | next
sections:
  - overview
  - gallery
  - process
  - results
  - next

# ─── Navigation ───────────────────────────────────────────
nextProject: string    # slug of the next project for WorkNextProject component
---
```

---

## Body (Below Frontmatter)

The markdown body is split into named sections using `## Heading` markers.
The `<WorkProcess>` component renders the entire body via `<ContentRenderer>`.

Write the body in two parts:

```markdown
## Overview

Short project summary (2–4 sentences). This populates the left column of WorkOverview.
Keep it focused: what was the brief, what was the challenge.

## Process

The narrative of how the work came together. This is the immersive storytelling section.
Write in a natural, first-person voice. Can include inline images using standard markdown
syntax — these will be automatically wrapped in ParallaxImage components.

Example inline image:
![Workshop poster design process](/images/kpmg/process-sketch.jpg)

You can use **bold** for emphasis, and structure with short paragraphs (2–3 sentences max).
Long blocks of text are broken by scroll-triggered word reveals, so pacing matters.
```

---

## Validation

In `content.config.ts`, define a Zod schema for this collection:

```ts
import { defineCollection, z } from '@nuxt/content'

const palette = z.object({
  primary:   z.string(),
  secondary: z.string(),
  accent:    z.string(),
  bg:        z.string(),
})

const stat = z.object({
  label:  z.string(),
  value:  z.number(),
  suffix: z.string(),
})

const galleryImage = z.object({
  src:     z.string(),
  alt:     z.string(),
  caption: z.string().optional(),
  width:   z.number().optional(),
  height:  z.number().optional(),
})

export const collections = {
  work: defineCollection({
    type: 'page',
    source: 'work/*.md',
    schema: z.object({
      title:         z.string(),
      slug:          z.string(),
      category:      z.string(),
      year:          z.number(),
      client:        z.string(),
      role:          z.string(),
      tools:         z.array(z.string()),
      draft:         z.boolean().default(false),
      palette,
      cover:         z.string(),
      heroImage:     z.string(),
      galleryLayout: z.enum(['grid-2x2', 'horizontal-scroll', 'before-after', 'large-first']),
      gallery:       z.array(galleryImage),
      stats:         z.array(stat).optional(),
      sections:      z.array(z.enum(['overview', 'gallery', 'process', 'results', 'next'])),
      nextProject:   z.string(),
    }),
  }),
}
```

---

## Adding a New Case Study (for the agent)

1. Create `content/work/[slug].md` — copy an existing file as a template
2. Fill in all required frontmatter fields
3. Add images to `public/images/[slug]/`
4. The page at `/work/[slug]` will be auto-generated by SSG
5. To add it to the home grid: update `pages/index.vue` `HomeWorkGrid` data source
   (or better: query all non-draft work items via `queryContent` and render dynamically)
