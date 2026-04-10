# Phase 5 — CMS & Editor Workflow
> **Read AGENTS.md before starting any task in this phase.**
> Phase 4 must be complete before starting Phase 5.
> Mark tasks `[x]` as completed. Commit after each task group.

**Goal:** Move portfolio content management to a non-technical editing workflow so Layan can add projects, images, reels, and portfolio details without touching code.

**Estimated sessions:** 2–3 agent sessions
**Commit prefix:** `feat(cms):`

---

## Pre-flight

- [x] Re-read `AGENTS.md`
- [x] Confirm current content model and identify repo areas still hard-coded
- [x] Fetch current Decap + Vercel integration docs through Context7

---

## Task Group 1 — CMS Architecture

- [x] Choose a non-technical editing workflow
- [x] Create a new Phase 5 plan
- [x] Add Decap CMS admin scaffolding
- [x] Add GitHub-backed Decap config
- [x] Keep the site on local Markdown and JSON content

- [ ] **Commit:** `feat(cms): scaffold decap cms`

---

## Task Group 2 — CMS Collections

- [x] Add Decap collection for work case studies
- [x] Add Decap file collection for reels JSON
- [x] Support uploaded images in a public media folder
- [x] Support cover, hero, gallery, stats, and section ordering fields

- [ ] **Commit:** `feat(cms): add decap collections`

---

## Task Group 3 — Nuxt Data Layer

- [x] Add a normalized portfolio content composable
- [x] Read projects from local Nuxt Content data
- [x] Read reels from `public/reels.json`
- [x] Update home work grid to render dynamic project data
- [x] Update work pages to render normalized project content

- [ ] **Commit:** `feat(cms): wire portfolio data layer`

---

## Task Group 4 — Editor Entry Point

- [x] Add `/admin` Decap CMS entry point
- [x] Load Decap from a static admin page
- [x] Add placeholder GitHub repo/auth settings for final cutover

- [ ] **Commit:** `feat(cms): add admin access page`

---

## Task Group 5 — Documentation & Handoff

- [x] Update `README.md` with CMS setup
- [x] Add a setup guide for GitHub auth proxy and Vercel deployment
- [x] Document Layan's editing flow
- [x] Add a final cutover checklist

- [ ] **Commit:** `docs: add cms setup workflow`

---

## Phase 5 Completion Notes

- The codebase now supports a fully free Git-backed CMS workflow.
- Final cutover still needs the GitHub repo name and GitHub OAuth proxy URL.
