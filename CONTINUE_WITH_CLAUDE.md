# CONTINUE_WITH_CLAUDE.md
## Instructions for Continuing This Project in a New Claude Session

---

## What This Project Is

You are working on a **17-tutorial interactive web course** that teaches **Claude Code** (Anthropic's agentic coding tool) from beginner to expert. This is being built for **Lumenalta** (a tech company formerly known as Clevertech). 

The tutorials are rendered as a **Next.js 15 app** with:
- A dark GitHub-inspired theme (dark backgrounds, green/blue/yellow/red accents)
- A collapsible left sidebar for navigating between all 17 tutorials
- Sticky top navigation for scrolling within a tutorial
- Rich interactive content: code blocks with copy buttons, tabbed content, callouts (info/warning/tip/danger), accordions, styled bullet lists

There is also a companion project called **TaskForge** — a simplified Jira/Linear project management app that serves as the hands-on sample app students work with during tutorials 2-17. TaskForge has two independent tracks:
- **Next.js 15** + Prisma + SQLite
- **FastAPI** + SQLAlchemy 2.0 + SQLite

---

## What Has Been Completed

### ✅ 1. Tutorial Roadmap — 17 Tutorials, Beginner → Expert
Fully designed and approved. Stored in `TUTORIALS_PLAN.md`. Four levels:
- **Level 1 — Foundations (T1-T3):** Getting Started, CLAUDE.md, Project Onboarding
- **Level 2 — Core Workflows (T4-T8):** Define→Plan→Iterate, Rules/Commands/Skills/Hooks, Prompt Engineering, Refactoring, Documentation
- **Level 3 — Advanced (T9-T13):** Token Optimization, AI-Native Mindset, Delivery Pipelines, MCP Servers, Subagents
- **Level 4 — Expert (T14-T17):** Supervisor Architectures, Agent Teams, Ralph (Autonomous Loops), Plugins & Marketplace

### ✅ 2. TaskForge Sample Project — DESIGNED (Not Yet Built)
A complete design document was created and approved, covering:
- Feature set: Projects, Tasks, Comments, Users, Labels, Dashboard
- Intentional imperfections for teaching (inconsistent error handling, missing tests, inline SQL, duplicated fetch, sparse comments, no .claude/ config)
- Repo structure for both Next.js and FastAPI tracks
- Progressive enhancement plan (which tutorial adds which feature to TaskForge)
- Tech stack: Next.js 15 + Prisma + SQLite, FastAPI + SQLAlchemy + SQLite
- Seed data script design

**The actual TaskForge code has NOT been built yet.** Only the design exists.

### ✅ 3. Tutorial 1: Getting Started — FULLY WRITTEN
A complete, comprehensive, interactive React component was built and approved as a Claude artifact. It includes ALL of the following (30-45 min read):
- **Overview:** 4 info cards (What you'll learn, Prerequisites, Tools, Series project)
- **What Is Claude Code?:** Mental model shift comparison, 6 capabilities, 3 interface cards
- **Installation:** TabGroup with macOS (native + Homebrew), Linux (native), Windows (WinGet + native + Git prerequisite), VS Code/Cursor extension, authentication
- **Your First Session:** mkdir + claude, 4 numbered starter prompts with descriptions
- **Core Concepts:** Sessions (5 bullets), 6 built-in tools in 2-col grid, checkpoints + /rewind
- **Essential Slash Commands:** 9-command table + 5 keyboard shortcuts
- **The Permission Model:** 3 color-coded permission level cards, response options, pro tip
- **Choosing Your Interface:** 3 accordions (Terminal CLI, VS Code, Web)
- **Hands-On Exercises:** 3 exercise boxes with code blocks
- **Troubleshooting:** 5 collapsible accordions
- **What's Next:** Gradient card linking to Tutorial 2

### ✅ 4. Downloadable Project Scaffold — 15+ Files
A file browser artifact was created containing all project files. Users download a `setup.sh` bash script that creates the entire directory structure. Files include:

| File | Purpose |
|---|---|
| `package.json` | Next.js 15 + React 19 + TypeScript |
| `tsconfig.json` | TypeScript strict config |
| `next.config.js` | Next.js config |
| `src/app/layout.tsx` | Root layout with metadata |
| `src/app/page.tsx` | Entry point → TutorialApp |
| `src/components/icons.tsx` | All SVG icon components |
| `src/components/ui.tsx` | Shared UI: CodeBlock, Callout, Accordion, TabGroup, Bullet, styles |
| `src/components/tutorialData.ts` | Central registry of all 17 tutorials with metadata |
| `src/components/Sidebar.tsx` | Left nav with tutorials grouped by level |
| `src/components/SectionNav.tsx` | Sticky top section navigation |
| `src/components/TutorialApp.tsx` | Main app: sidebar + tutorial routing + AVAILABLE array |
| `src/components/tutorials/Tutorial1.tsx` | Tutorial 1 (⚠️ abbreviated — needs full content) |
| `CLAUDE.md` | Project documentation for Claude Code |
| `TUTORIALS_PLAN.md` | Master build plan with specs for all 17 tutorials |
| `CONTINUE_WITH_CLAUDE.md` | This file |
| `README.md` | Quick start + how to build tutorials |

### ✅ 5. Key Design Decisions Made and Approved
- **No checkboxes/progress tracking** — removed per user request
- **Interactive React component format** — not markdown, rendered as interactive web pages
- **Comprehensive depth** — 30-45 min per tutorial (up to 55 min for expert tutorials)
- **Inline styles only** — NO Tailwind, NO external CSS frameworks
- **Dark theme** matching GitHub's dark mode
- **Shared UI components** in `ui.tsx` — never duplicated
- **Each tutorial = standalone React component** plugged into TutorialApp.tsx
- **IntersectionObserver scroll tracking** on every tutorial for section navigation

---

## What Needs to Be Done Next (Priority Order)

### 🔴 Priority 1: Populate Tutorial 1 Full Content
The `Tutorial1.tsx` in the scaffold has **abbreviated placeholder sections**. The full content exists in the original artifact created during our conversation. All 11 sections need to be populated with complete text, code blocks, callouts, tabs, accordions — matching the approved artifact exactly.

### 🟡 Priority 2: Build TaskForge Starter Code
Before Tutorial 2 can be fully hands-on, the TaskForge repo needs actual code. Both tracks need:
- Working CRUD for Projects, Tasks, Comments, Users, Labels
- Seed data script with sample content
- Intentional imperfections (as documented in the design)
- A skeleton CLAUDE.md (that students improve in Tutorial 2)
- Basic dashboard page

### 🟢 Priority 3: Build Tutorials 2-17
Each tutorial should be created as `src/components/tutorials/TutorialN.tsx` following the exact patterns from Tutorial 1. Detailed section-by-section specs are in `TUTORIALS_PLAN.md`. Build order:
1. Tutorial 2: CLAUDE.md (first tutorial using TaskForge)
2. Tutorial 3: Project Onboarding
3. Tutorials 4-8 in order (each builds on the previous)
4. Tutorials 9-13 in order
5. Tutorials 14-17 in order (most advanced, require the most research)

---

## Copy-Paste Prompts for Continuing

### Prompt A: Populate Tutorial 1 Full Content
Use this in Claude Code with the project open:

```
Populate Tutorial1.tsx with complete content for all 11 sections. The current file has abbreviated placeholders. Each section needs the full content:

1. Overview — 4 info cards (What you'll learn, Prerequisites, Tools, Series project)
2. What Is Claude Code? — mental model shift comparison (chat vs agentic side by side), 6 capabilities with bold labels, 3 interface cards (Terminal, VS Code, Web)
3. Installation — TabGroup with 3 tabs: macOS (native install + Homebrew + Apple Silicon callout), Linux (native + distros callout), Windows (Git prerequisite warning + WinGet + native installer). Then VS Code extension section. Then authentication section.
4. First Session — mkdir + cd + claude commands, then 4 numbered starter prompts each with prompt text and description, then permissions tip callout
5. Core Concepts — Sessions (5 bullet points), Built-in Tools (6-item 2-col grid: Read, Write, Edit, Bash, Glob, Grep), Checkpoints + /rewind code block + "Checkpoints vs Git" info callout
6. Commands — 9 slash commands table (/help, /status, /model, /resume, /rewind, /init, /compact, /exit, /bug) + 5 keyboard shortcuts (Esc×2, Ctrl+C, Ctrl+R, Ctrl+T, Shift+↓) with kbd styling
7. Permissions — 3 permission level cards (green read-only, yellow file mods, red shell commands), response options code block (y/n/a/e/!), "Always Allow" tip callout
8. Interfaces — 3 Accordions: Terminal CLI (default open, with code examples), VS Code/Cursor, Web (claude.ai/code)
9. Exercises — 3 exercise boxes: (1) Clone + explore open-source project with 4 prompts, (2) Build from scratch in empty dir with follow-ups, (3) Session management lifecycle with 7 steps
10. Troubleshooting — 5 Accordions: command not found, auth issues, macOS permissions, slow/unresponsive, Windows-specific
11. What's Next — gradient card linking to Tutorial 2 (CLAUDE.md)

Use shared components from ui.tsx: CodeBlock, Callout, Accordion, TabGroup, Bullet, styles. Follow the patterns documented in CLAUDE.md.
```

### Prompt B: Build a New Tutorial
Use this in Claude Code or a new Claude.ai session:

```
I'm continuing work on the Lumenalta Claude Code tutorial series. Here's the context:

- This is a 17-tutorial interactive web course teaching Claude Code beginner → expert
- Built as a Next.js 15 app with dark GitHub theme, sidebar navigation, and rich interactive content
- Tutorial 1 (Getting Started) is the reference implementation — all tutorials must match its patterns
- Shared UI components: CodeBlock, Callout, Accordion, TabGroup, Bullet, styles (from ui.tsx)
- Each tutorial is a standalone React component at src/components/tutorials/TutorialN.tsx
- Tutorials receive onMenuOpen prop, define a sections array, use IntersectionObserver for scroll tracking
- TaskForge (a simplified Jira clone) is the hands-on sample project used from Tutorial 2 onward

Please build Tutorial [N] following the detailed spec in TUTORIALS_PLAN.md. Create the component file, add the import to TutorialApp.tsx, and add the ID to the AVAILABLE array. Match the exact visual style, component patterns, and comprehensive depth of Tutorial 1.
```

### Prompt C: Build TaskForge Starter Code
```
I'm building the TaskForge sample project for the Lumenalta Claude Code tutorial series. Here's the context:

TaskForge is a simplified project management app (like Jira/Linear) used as the hands-on companion across 17 Claude Code tutorials. I need you to build the starter code.

Requirements:
- Two independent tracks: Next.js 15 (Prisma + SQLite) and FastAPI (SQLAlchemy + SQLite)
- Core features: Projects CRUD, Tasks CRUD (with status todo/in-progress/done, priority, assignee), Comments (threaded on tasks), Users (basic auth with email/password, roles: admin/member/viewer), Labels (colored tags on tasks), Dashboard (task counts, recent activity)
- Both tracks share identical data models and API contracts (same JSON response shapes)
- SQLite for zero-config setup (no Docker, no external DB)
- Seed data script with sample projects, tasks, users, and comments
- INTENTIONAL imperfections (these are teaching opportunities for the tutorials):
  - Inconsistent error handling across routes
  - Missing tests for some endpoints
  - Inline SQL in some routes (FastAPI track)
  - Duplicated fetch logic (Next.js track)
  - Sparse/missing inline comments
  - No .claude/ configuration directory (students create this in Tutorial 5)
  - Skeleton CLAUDE.md only (students improve it in Tutorial 2)

Please build the [Next.js / FastAPI] track. Include package.json/pyproject.toml, database schema, all routes, seed script, and a basic test setup.
```

### Prompt D: General Continuation (for Claude.ai chat)
```
I'm continuing work on a project. Here are the key files for context:

1. CLAUDE.md — Contains the project architecture, design system, rules, and patterns
2. TUTORIALS_PLAN.md — Contains detailed specs for all 17 tutorials
3. CONTINUE_WITH_CLAUDE.md — Contains current project status and what's been done

The project is a 17-tutorial interactive web course teaching Claude Code, built as a Next.js 15 app for Lumenalta. Tutorial 1 is complete. I need to [describe what you want to do next].

I'll paste the relevant file contents below.
```

---

## Key Architecture Decisions to Preserve

### Tutorial Component Pattern (MUST follow for every tutorial)
```
1. Define sections array: { id: string, short: string }[]
2. useEffect with IntersectionObserver tracking active section
3. Render SectionNav with sections, active, onMenuOpen
4. Header: level badge + tag badge + duration + "Tutorial N of 17" + h1 + description
5. Sections: each in <section id="xxx"> with h2 from styles.h2
6. ONLY use shared UI: CodeBlock, Callout, Accordion, TabGroup, Bullet, styles
7. "What's Next" section: gradient card linking to next tutorial
8. Footer: "Claude Code Tutorial Series — Lumenalta" + count + Next button
```

### Design System Quick Reference
```
Backgrounds:  #010409 (page)  #0d1117 (cards)  #161b22 (surfaces)
Text:         #e6edf3 (h1-h3) #c9d1d9 (body)   #8b949e (muted)
Borders:      #21262d
Level 1:      #3fb950 (green)   — Foundations
Level 2:      #58a6ff (blue)    — Core Workflows  
Level 3:      #d29922 (yellow)  — Advanced
Level 4:      #f85149 (red)     — Expert
Code:         #d2a8ff (purple)  — command/code highlights
Buttons:      #238636 (green)   — primary actions
Active nav:   #1f6feb (bright blue)
```

### File Responsibilities
```
ui.tsx          → ALL shared components (CodeBlock, Callout, Accordion, TabGroup, Bullet, styles)
tutorialData.ts → ALL tutorial metadata (id, title, level, tag, description, duration)
TutorialApp.tsx → Tutorial routing: imports, component map, AVAILABLE array
Sidebar.tsx     → Left navigation (reads from tutorialData.ts, renders by level)
SectionNav.tsx  → Top section navigation (receives sections array from each tutorial)
Tutorial*.tsx   → Individual tutorial content (self-contained, follows template)
```

### Rules (from CLAUDE.md)
- NEVER use external CSS or Tailwind — all inline styles
- NEVER duplicate UI components — always use ui.tsx
- ALWAYS match Tutorial 1's visual style
- ALWAYS include IntersectionObserver scroll tracking
- ALWAYS include "What's Next" section
- ALWAYS update TutorialApp.tsx (import + component map + AVAILABLE) when adding a tutorial

---

## Recommended Build Order

```
1. ✅ Tutorial 1 — Getting Started (DONE, needs full content population in .tsx file)
2. 🔲 Populate Tutorial1.tsx with complete content
3. 🔲 Build TaskForge starter code — Next.js track
4. 🔲 Build TaskForge starter code — FastAPI track  
5. 🔲 Tutorial 2 — CLAUDE.md (first tutorial using TaskForge)
6. 🔲 Tutorial 3 — Project Onboarding
7. 🔲 Tutorial 4 — Define → Plan → Iterate
8. 🔲 Tutorial 5 — Rules, Commands, Skills & Hooks
9. 🔲 Tutorial 6 — Prompt Engineering
10. 🔲 Tutorial 7 — Code Refactoring
11. 🔲 Tutorial 8 — Handling Documentation
12. 🔲 Tutorial 9 — Token Optimization
13. 🔲 Tutorial 10 — AI-Native Development
14. 🔲 Tutorial 11 — Safe Delivery Pipelines
15. 🔲 Tutorial 12 — MCP Servers
16. 🔲 Tutorial 13 — Subagents & AGENTS.md
17. 🔲 Tutorial 14 — Supervisor Architectures
18. 🔲 Tutorial 15 — Agent Teams
19. 🔲 Tutorial 16 — Ralph — Autonomous Dev Loops
20. 🔲 Tutorial 17 — Plugins & Marketplace
```