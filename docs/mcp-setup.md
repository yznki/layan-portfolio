# MCP Setup for Codex and Claude Code
> Configure these MCPs before starting any development session.
> This file is for the developer (Yazan) — not consumed by the agent.
> `AGENTS.md` is the primary repo memory file. `CLAUDE.md` is a compatibility mirror.

---

## Required MCPs

### 1. Figma MCP
Already configured. Used for extracting design tokens when a Figma URL is available.

**Usage in session:** Provide Figma file URL and ask the agent to extract colors, spacing, or component specs.

---

### 2. GitHub MCP
Already configured. Used for all commits throughout development.

**Convention:** Agent commits after every task group using the prefix format in each phase file.

---

### 3. Context7 MCP (`upstash/context7`)
**Purpose:** Gives the coding agent live, up-to-date documentation for Nuxt 4, GSAP, Tailwind CSS v4, Lenis, and @nuxt/content. Critical because these libraries change frequently and model training data may reference outdated APIs.

**Install:**
```bash
# In your MCP settings, add:
{
  "context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp@latest"]
  }
}
```

**How it's used:** The agent is instructed to call Context7 before any framework API usage to resolve current docs. This prevents subtle bugs from outdated API signatures.

---

### 4. Playwright MCP (`@playwright/mcp`)
**Purpose:** Lets the agent take screenshots of `localhost:3000` and visually verify its own output against the design spec. Without this, the agent is coding blind.

**Install:**
```bash
# In your MCP settings, add:
{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  }
}
```

**How it's used:** After any significant UI task, the agent opens `localhost:3000` (with `pnpm dev` running), screenshots the relevant page at 375px and 1440px width, and visually confirms it matches the spec before committing.

---

### 5. Filesystem MCP
Built into most local coding-agent environments by default. Scope it to the project directory. The agent should read `AGENTS.md` and the active phase file at the start of every session.

---

## Example MCP Config (`claude_desktop_config.json` or `.mcp.json`)

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "<your-figma-token>"
      }
    }
  }
}
```

---

## Starting a Codex or Claude Session

At the start of every session, tell the agent:

> "Read AGENTS.md and the active phase file, then tell me where we left off and what the next task is."

This forces the agent to re-orient from the markdown files rather than assuming state from conversation history. The agent will:
1. Read `AGENTS.md` → understand the full project context
2. Read the active phase file → find the first unchecked `[ ]` task
3. Report back its plan before writing any code

This is the core "agent learning from its work" pattern — the markdown files are the agent's memory, not the session.
