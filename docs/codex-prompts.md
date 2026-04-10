# Codex Prompts
> Reusable prompts for this repository.

## Resume Progress

```text
Read AGENTS.md and the active phase file. Summarize current project status, identify the next unfinished task, then complete it end-to-end and update the phase checklist.
```

## UI Change

```text
Read AGENTS.md, docs/animations.md, and any related component docs first. Implement the UI change mobile-first, use Context7 for framework APIs, then verify the result with Playwright on localhost:3000.
```

## New Case Study

```text
Read AGENTS.md, docs/content-schema.md, and docs/how-to-add-case-study.md. Add the new case study through content/work, update prerender routes if needed, use placeholders for missing assets, and keep the page template generic.
```

## Performance Pass

```text
Read AGENTS.md and inspect nuxt.config.ts, image usage, and client-only animation code. Improve performance without changing the visual system, then verify with pnpm generate and report the impact.
```

## Code Review

```text
Read AGENTS.md and review the requested diff with a code-review mindset. Prioritize bugs, regressions, accessibility issues, motion issues, and violations of the content-driven architecture.
```
