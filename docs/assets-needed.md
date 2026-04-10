# Assets Needed from Layan
> Updated by the agent whenever an asset is received or a placeholder is created.
> The agent must check this file at the start of every phase and use placeholders for anything not yet received.

---

## Status Key
- ⬜ Not received — use placeholder
- 🟡 Partially received — some items available
- ✅ Received and placed in repo

---

## Fonts (Agent responsibility — download from Fontshare)

| Font | Weights Needed | Status | Path |
|------|---------------|--------|------|
| Clash Display | 600, 700 | ⬜ | `public/fonts/ClashDisplay-Semibold.woff2`, `ClashDisplay-Bold.woff2` |
| Satoshi | 500, 700 | ⬜ | `public/fonts/Satoshi-Medium.woff2`, `Satoshi-Bold.woff2` |
| General Sans | 400, 500 | ⬜ | `public/fonts/GeneralSans-Regular.woff2`, `GeneralSans-Medium.woff2` |

**Download URLs:**
- Clash Display: https://api.fontshare.com/v2/fonts/download/clash-display
- Satoshi: https://api.fontshare.com/v2/fonts/download/satoshi
- General Sans: https://api.fontshare.com/v2/fonts/download/general-sans

---

## Photos — Layan (Personal)

| Asset | Dimensions | Usage | Status |
|-------|-----------|-------|--------|
| Portrait 1 (main) | 2000px+ wide | Hero right column on Home | ⬜ |
| Portrait 2 (secondary) | 2000px+ wide | About Teaser on Home | ⬜ |
| Portrait 3 (about page) | 2000px+ wide | About page hero | ⬜ |

**Placeholder:** `<div>` with `--blush` border, SVG person silhouette, correct aspect ratio.

---

## KPMG Project

| Asset | Format | Usage | Status |
|-------|--------|-------|--------|
| Cover image (grid) | JPG/PNG, 4:3 | HomeWorkCard | ⬜ |
| Hero image | JPG/PNG, 16:9 | WorkHero full-bleed | ⬜ |
| Workshop poster 1 | PNG, high-res | Gallery grid | ⬜ |
| Workshop poster 2 | PNG, high-res | Gallery grid | ⬜ |
| Workshop poster 3 | PNG, high-res | Gallery grid | ⬜ |
| Workshop poster 4 | PNG, high-res | Gallery grid | ⬜ |
| "My KPMG Journey" campaign posts | PNG, high-res | Gallery / process | ⬜ |
| Brand guideline reference | Any | Process section | ⬜ |

**Target path:** `public/images/kpmg/`

---

## TEDxJU 2025 Project

| Asset | Format | Usage | Status |
|-------|--------|-------|--------|
| Cover image (grid) | JPG/PNG, 4:3 | HomeWorkCard | ⬜ |
| Hero image | JPG/PNG, 16:9 or wider | WorkHero | ⬜ |
| Logo (primary) | SVG preferred, PNG 2x min | Gallery featured | ⬜ |
| Logo (dark variant) | SVG/PNG | Gallery | ⬜ |
| Brochure spreads | PNG, high-res | Gallery | ⬜ |
| Event badge / lanyard design | PNG | Gallery | ⬜ |
| Sticker sheet | PNG | Gallery | ⬜ |
| Booth / roll-up design | PNG | Gallery | ⬜ |
| Social media post designs (set) | PNG | Gallery | ⬜ |

**Target path:** `public/images/tedxju/`

---

## Kalmntina Project

| Asset | Format | Usage | Status |
|-------|--------|-------|--------|
| Cover image (grid) | JPG/PNG, 4:3 | HomeWorkCard | ⬜ |
| Hero image | JPG/PNG, 16:9 | WorkHero | ⬜ |
| Individual post designs (min. 6) | PNG, high-res | Gallery | ⬜ |
| Before screenshot (Instagram grid) | PNG | Before/After gallery | ⬜ |
| After screenshot (Instagram grid) | PNG | Before/After gallery | ⬜ |

**Target path:** `public/images/kalmntina/`

---

## Reels / Videos

| Asset | Format | Usage | Status |
|-------|--------|-------|--------|
| Reel 1 — thumbnail | JPG/PNG | Reels grid card | ⬜ |
| Reel 1 — video URL | YouTube/Google Drive/MP4 | Lightbox player | ⬜ |
| Reel 2 — thumbnail | JPG/PNG | Reels grid card | ⬜ |
| Reel 2 — video URL | YouTube/Google Drive/MP4 | Lightbox player | ⬜ |
| (more reels as available) | | | ⬜ |

---

## Text Content

| Content | Status | Notes |
|---------|--------|-------|
| Bio text (2–3 paragraphs) | ⬜ | For About teaser + About page |
| KPMG project overview (2–4 sentences) | ⬜ | For WorkOverview left column |
| KPMG process narrative (3–5 paragraphs) | ⬜ | For WorkProcess |
| TEDxJU project overview | ⬜ | For WorkOverview |
| TEDxJU process narrative | ⬜ | For WorkProcess |
| Kalmntina project overview | ⬜ | For WorkOverview |
| Kalmntina process narrative | ⬜ | For WorkProcess |
| Skills list (confirm tools) | ⬜ | For About page skills grid |
| Education details (confirm) | ⬜ | University, degree, years |

---

## Other

| Asset | Status | Notes |
|-------|--------|-------|
| CV / Resume PDF | ⬜ | `public/cv.pdf` — linked from About page |
| Social links (IG, LI, Behance) | ⬜ | For Footer social icons |
| Contact email (confirm) | ⬜ | Layan04ibrahim@gmail.com (assumed) |
| Phone number | ⬜ | For contact section |
| Custom domain | ⬜ | For Vercel deployment |
| OG image (1200×630px) | ⬜ | Agent creates this in Phase 4 |

---

## Placeholder Strategy

Until assets are received, the agent should:
1. Create `public/images/[project]/placeholder-[name].jpg` — a solid color image matching the project palette
2. Add a `// TODO: replace with real image from Layan` comment in the component
3. Use correct dimensions so no layout shift occurs when real images arrive
4. Never hard-code image dimensions that differ from the final spec
