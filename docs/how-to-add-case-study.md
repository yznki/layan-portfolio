# How to Add a New Case Study

> You don't need to know Vue, Nuxt, or CSS. Just follow these steps.

---

## Step 1 — Create the content file

Duplicate any existing file in `content/work/` and rename it to your project slug:

```
content/work/my-project.md
```

The slug becomes the URL: `layan.design/work/my-project`

---

## Step 2 — Fill in the frontmatter

Open the file and update the values between the `---` lines at the top:

```yaml
---
title: My Project Name
slug: my-project          # must match the filename (without .md)
category: Brand Identity  # e.g. Brand Identity / Social Media / Content Creation
year: 2025
client: Client Name
role: Your Role
tools: [Adobe Illustrator, Photoshop]

# Color palette — pick colors that match the project's visual world
palette:
  primary:   "#000000"   # main brand color (used for headings, borders)
  secondary: "#FFFFFF"   # contrast color (used for text on primary bg)
  accent:    "#FF0000"   # highlight color
  bg:        "#F5F5F5"   # page background

# Image paths (add images to public/images/my-project/)
cover:     /images/my-project/cover.jpg
heroImage: /images/my-project/hero.jpg

# Impact stats (optional — remove the whole block if not needed)
stats:
  - label: Posts Designed
    value: 50
    suffix: "+"

# Gallery layout — choose one:
#   grid-2x2          → 2×2 grid of images (KPMG style)
#   horizontal-scroll → side-scrolling strip (TEDxJU style)
#   before-after      → draggable before/after comparison (Kalmntina style)
#   large-first       → one large hero image then smaller ones below
galleryLayout: grid-2x2

# Which sections to show, in order
sections: [overview, gallery, process, results, next]

# Slug of the next case study to show at the bottom
nextProject: tedxju-2025
---
```

---

## Step 3 — Write the body text

Below the second `---`, write your project description in plain text:

```markdown
Brief overview of the project — 2 to 4 sentences explaining what it was and why it mattered.

## The Challenge

What problem needed solving?

## The Process

How did you approach it? What decisions did you make?
```

---

## Step 4 — Add images

Place your images in `public/images/my-project/`:

| File | Where it appears |
|------|-----------------|
| `cover.jpg` | Home page work card |
| `hero.jpg` | Full-bleed top of case study |
| `gallery-1.jpg` through `gallery-4.jpg` | Gallery section |
| `before.jpg` / `after.jpg` | Before-After layout only |

Image tips:
- Use JPG or PNG, 2× resolution preferred
- `cover.jpg` → 4:3 ratio (e.g. 1200×900px)
- `hero.jpg` → 16:9 or wider (e.g. 1920×1080px)
- Gallery images → any ratio, consistent within a project

---

## Step 5 — That's it

Push the changes to GitHub. Vercel deploys automatically within 1–2 minutes.

Your new case study will appear on the home work grid and have its own page with the correct color theme, gallery, stats, and next-project navigation — all driven by what you typed in the file.
