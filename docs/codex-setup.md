# Codex Setup
> Repo-specific guide for productive Codex sessions.
> `AGENTS.md` is the source of truth. This file explains how to use it well.

---

## Read Order

At the start of every session:

1. Read [`AGENTS.md`](/Users/yznki/development/layan-portfolio/AGENTS.md)
2. Read the active phase file listed there
3. Read any referenced support docs for the task:
   `docs/animations.md`, `docs/content-schema.md`, `docs/case-study-theming.md`, `docs/component-api.md`

Do not rely on conversation memory when resuming work.

---

## Repo Mental Model

- Framework: Nuxt 4 with SSG output via `pnpm generate`
- Styling: Tailwind CSS v4 through the Vite plugin
- Motion: GSAP and Lenis are client-only and provided through Nuxt plugins
- Content model: case studies live in `content/work/*.md`, not in Vue components
- Route model:
  - `/` uses home components under `components/home/`
  - `/about` and `/reels` are standalone pages
  - `/work/[slug]` is a dynamic content-driven template

High-value files:
- [`nuxt.config.ts`](/Users/yznki/development/layan-portfolio/nuxt.config.ts)
- [`app.vue`](/Users/yznki/development/layan-portfolio/app.vue)
- [`pages/work/[slug].vue`](/Users/yznki/development/layan-portfolio/pages/work/[slug].vue)
- [`plugins/gsap.client.ts`](/Users/yznki/development/layan-portfolio/plugins/gsap.client.ts)
- [`plugins/lenis.client.ts`](/Users/yznki/development/layan-portfolio/plugins/lenis.client.ts)

---

## Required Workflow

- Use Context7 before relying on Nuxt, GSAP, Lenis, Tailwind, or Nuxt Content APIs
- After meaningful UI changes, verify with Playwright against `http://localhost:3000`
- Keep styling mobile-first and add desktop behavior with `md:` and `lg:`
- Never invent missing assets; use placeholders and leave a `TODO` comment when needed
- Keep case-study content in markdown and keep components generic

---

## Commands

Core commands for this repo:

```bash
pnpm dev
pnpm generate
pnpm preview
```

Notes:
- `pnpm install` may require `pnpm rebuild better-sqlite3`
- `nuxt generate` should finish cleanly because deployment is static
- There is no lint script currently; use `pnpm generate` as the main integration check

---

## Recommended Session Prompts

Resume work:

```text
Read AGENTS.md and the active phase file, tell me where the project stands, then complete the next unchecked task end-to-end.
```

Implement a feature:

```text
Read AGENTS.md and the relevant docs first. Implement this change fully, verify it locally, and update any affected docs.
```

Review work:

```text
Read AGENTS.md, inspect the affected files, and do a code review focused on regressions, accessibility, animation risks, and content-schema violations.
```

---

## Practical Notes

- This workspace may be a plain folder instead of a live Git checkout. If `git status` fails, still complete the work but report that commits are not possible from the current workspace.
- `CLAUDE.md` exists as a mirror for Claude-oriented tooling. Prefer `AGENTS.md` in Codex.
- Keep answers and edits concrete. This repo already has strong direction; Codex should preserve it, not redesign it casually.
