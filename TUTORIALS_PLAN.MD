# Claude Code Tutorials — Complete Build Plan

## How to Use This Document

This is the master plan for building all 17 tutorials. It contains:
1. The overall roadmap and learning progression
2. The tutorial component template
3. Detailed section-by-section specifications for each tutorial
4. References to Lumenalta and external resources

### Workflow for Creating a New Tutorial

```
1. Open this project in Claude Code:
   cd claude-code-tutorials && claude

2. Tell Claude which tutorial to build:
   "Build Tutorial N following the spec in TUTORIALS_PLAN.md"

3. Claude will:
   - Read this plan and CLAUDE.md
   - Create src/components/tutorials/TutorialN.tsx
   - Add the import to TutorialApp.tsx
   - Add the ID to the AVAILABLE array
   - Populate the full content per the spec below

4. Review and iterate:
   "The installation section needs more detail on Windows"
   "Add a diagram showing the pipeline architecture"
```

---

## Sample Project: TaskForge

Tutorials 2+ reference TaskForge, a project management app (simplified Jira/Linear). The starter repo should be built before starting Tutorial 2.

**TaskForge Repo:** `github.com/lumenalta/taskforge-tutorial` (to be created)

### Two Tracks
- **Next.js 15** + Prisma + SQLite + Tailwind + shadcn/ui + NextAuth.js + Jest
- **FastAPI** + SQLAlchemy 2.0 + Alembic + SQLite + Pydantic v2 + python-jose + pytest

Both tracks share identical data models (Projects, Tasks, Comments, Users, Labels) and API contracts (same JSON shapes). SQLite for zero-config — no Docker needed.

### Core Features (Starter Code)
- Projects: Create/list/archive with name, description, status
- Tasks: CRUD with title, description, status (todo/in-progress/done), priority, assignee
- Comments: Threaded comments on tasks
- Users: Basic auth (email/password), roles (admin, member, viewer)
- Labels/Tags: Categorize tasks with colored labels
- Dashboard: Simple overview with task counts and recent activity

### Features Added During Tutorials
| Tutorial | Feature | Why |
|---|---|---|
| T4 | Task filtering & search | Real feature via Define→Plan→Iterate |
| T5 | Custom slash commands, rules, skills, hooks | Building Claude Code extensions |
| T6 | Task dependencies (blocked-by) | Multi-file changes with acceptance criteria |
| T7 | Extract shared API client / repository pattern | Real cross-file refactor |
| T8 | API docs, README, ADRs, changelog | Documentation generation |
| T9 | Notifications system | Large feature requiring context strategy |
| T10 | Activity feed / audit log | Designed agent-first |
| T11 | All features via Git workflow | Commits, PRs, branch strategy |
| T12 | GitHub integration (tasks↔PRs) | MCP server usage |
| T13 | Code-reviewer, test-writer, doc-gen subagents | Specialized for TaskForge |
| T14 | Time tracking (via supervisor pipeline) | Multi-stage agent pipeline |
| T15 | Sprint planning (via agent teams) | Parallel multi-agent build |
| T16 | Autonomous bug-fix loop | Ralph works through bug backlog |
| T17 | Package subagents as plugin | Distributable Claude Code plugin |

### Intentional Imperfections (Teaching Opportunities)
| Imperfection | Fixed In | Learning Goal |
|---|---|---|
| No/skeleton CLAUDE.md | T2 | Learner writes and improves it |
| Inconsistent error handling | T7 | Real refactoring target |
| Missing tests for some endpoints | T7, T14 | Test-writing with subagents |
| Inline SQL in some routes (FastAPI) | T7 | Extract to repository pattern |
| Duplicated fetch logic (Next.js) | T7 | Extract shared API client |
| Sparse/missing comments and docs | T8 | Auto-generate with Claude |
| Missing input validation on some endpoints | T16 | Seeded bugs for Ralph loop |
| No .tasks/ folder | T4 | Learner creates workflow structure |
| No .claude/ config | T5 | Learner builds from scratch |

---

## Tutorial Component Template

Every tutorial MUST follow this exact structure. Copy this when creating a new one:

```tsx
'use client'
import { useState, useEffect } from 'react'
import SectionNav, { Section } from '../SectionNav'
import { CodeBlock, Callout, Accordion, TabGroup, Bullet, styles } from '../ui'
import { tutorials, levelColors, levelLabels, levelTags } from '../tutorialData'

const { h2, h3, p, strong, code } = styles
const meta = tutorials[N - 1] // ← Change N to tutorial number (0-indexed array)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  // ... add sections specific to this tutorial
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

export default function TutorialN({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { rootMargin: '-20% 0px -70% 0px' })
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <SectionNav sections={sections} active={activeSection} onMenuOpen={onMenuOpen} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Header (same pattern for ALL tutorials) ── */}
        <div style={{ padding: '44px 0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ background: levelColors[meta.level], color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 12, letterSpacing: 0.5 }}>{levelLabels[meta.level]}</span>
            <span style={{ background: '#1f6feb20', color: '#58a6ff', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 12 }}>{levelTags[meta.level]}</span>
            <span style={{ color: '#8b949e', fontSize: 12 }}>{meta.duration}</span>
            <span style={{ color: '#484f58', fontSize: 12 }}>·</span>
            <span style={{ color: '#8b949e', fontSize: 12 }}>Tutorial {meta.id} of {tutorials.length}</span>
          </div>
          <h1 style={{ color: '#e6edf3', fontSize: 34, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>TUTORIAL TITLE HERE</h1>
          <p style={{ color: '#8b949e', fontSize: 17, lineHeight: 1.5, margin: 0 }}>{meta.description}</p>
        </div>

        {/* ── Sections ── */}
        <section id="overview">
          <h2 style={h2}>Overview</h2>
          {/* Content here */}
        </section>

        {/* ... more sections ... */}

        {/* ── What's Next (ALWAYS present) ── */}
        <section id="next">
          <h2 style={h2}>What's Next</h2>
          <div style={{ background: 'linear-gradient(135deg, #161b22, #0e291780)', border: '1px solid #23863650', borderRadius: 12, padding: '26px', margin: '24px 0' }}>
            <h3 style={{ color: '#3fb950', fontSize: 17, fontWeight: 700, margin: '0 0 10px' }}>Up Next: Tutorial {N+1} — NEXT TITLE</h3>
            <p style={{ color: '#c9d1d9', fontSize: 15, lineHeight: 1.7, margin: 0 }}>NEXT DESCRIPTION</p>
          </div>
        </section>

        {/* ── Footer (same pattern for ALL tutorials) ── */}
        <div style={{ marginTop: 56, padding: '20px 0', borderTop: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ color: '#8b949e', fontSize: 13 }}><strong style={{ color: '#e6edf3' }}>Claude Code Tutorial Series</strong> — Lumenalta Learning Path</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ color: '#484f58', fontSize: 12 }}>Tutorial {meta.id} of {tutorials.length}</span>
            <button style={{ background: '#238636', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Next: TITLE →</button>
          </div>
        </div>
      </div>
    </>
  )
}
```

### After Creating the Component
1. In `TutorialApp.tsx`, add: `import TutorialN from './tutorials/TutorialN'`
2. Add to `tutorialComponents` map: `N: TutorialN,`
3. Add ID to `AVAILABLE` array: `const AVAILABLE = [1, ..., N]`

---

## Detailed Tutorial Specifications

---

### Tutorial 1: Getting Started — Intro to Claude Code
**Status:** ✅ COMPLETE (written as interactive artifact, but Tutorial1.tsx needs full content population)
**Level:** 1 — Foundations
**Duration:** 30-45 min

**Sections:**
1. **Overview** — 4 info cards: What you'll learn, Prerequisites, Tools needed, Series project (TaskForge)
2. **What Is Claude Code?** — Definition as agentic coding tool. Mental model shift: side-by-side comparison of chat-based AI (copy-paste loop) vs agentic AI (Claude reads/edits/runs directly). 6 key capabilities with bold labels and descriptions (read codebase, edit files, run commands, fix errors, multi-file work, manage Git). 3 interface cards (Terminal CLI, VS Code/Cursor, Web).
3. **Installation** — TabGroup with 3 tabs:
   - macOS: Native install (curl, auto-updates) + Homebrew (manual updates) + Apple Silicon callout
   - Linux: Native install + supported distros callout
   - Windows: Git for Windows prerequisite warning + WinGet + Native PowerShell installer
   - Then: VS Code/Cursor extension install + authentication flow
4. **Your First Session** — mkdir + cd + claude commands. 4 numbered starter prompts each with a prompt string and description of what it demonstrates (file creation, file editing, command execution, Git operations). Permission model tip callout.
5. **Core Concepts** — Sessions (5 bullet points about persistence, context, compaction, resume). Built-in Tools: 6-item 2-column grid (Read, Write, Edit, Bash, Glob, Grep with descriptions). Checkpoints and /rewind: code block showing options, callout comparing checkpoints vs Git.
6. **Essential Slash Commands** — Table of 9 commands (/help, /status, /model, /resume, /rewind, /init, /compact, /exit, /bug). Keyboard shortcuts: 5 items (Esc×2, Ctrl+C, Ctrl+R, Ctrl+T, Shift+↓) with kbd styling.
7. **The Permission Model** — 3 permission level cards (green=read-only always allowed, yellow=file mods ask permission, red=shell commands ask permission). Response options code block (y/n/a/e/!). Pro tip callout about "always allow."
8. **Choosing Your Interface** — 3 Accordions: Terminal CLI (default open, code examples for starting/resuming), VS Code/Cursor (when to use), Web Interface (claude.ai/code, use cases).
9. **Hands-On Exercises** — 3 exercise boxes:
   - Exercise 1: Clone open-source project, explore with Claude (4 prompts)
   - Exercise 2: Build from scratch in empty dir (CLI tool + follow-ups)
   - Exercise 3: Session management lifecycle (7 steps)
10. **Troubleshooting** — 5 Accordions: command not found, auth issues, macOS permissions, slow/unresponsive, Windows-specific
11. **What's Next** — Gradient card linking to Tutorial 2 (CLAUDE.md)

---

### Tutorial 2: CLAUDE.md — Teaching Claude About Your Project
**Status:** 🔲 TO BUILD
**Level:** 1 — Foundations
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Why CLAUDE.md is the single most impactful thing you can do for Claude Code productivity. It's Claude's project reference, loaded automatically at session start. Before/after comparison of Claude's behavior with and without CLAUDE.md.
2. **What Is CLAUDE.md?** — A markdown file in your project root that Claude Code reads at the start of every session. Contains project documentation: what the app does, how it's built, how to run it, what conventions to follow. Analogy: it's like the onboarding doc you'd give a new team member on day one.
3. **Using /init** — The `/init` command auto-generates a starter CLAUDE.md by scanning your codebase. Walk through running it, what it produces, and why you should always review and improve the output. Code examples showing /init usage and sample output.
4. **Anatomy of a Great CLAUDE.md** — Structured breakdown of what to include:
   - **Project Overview** — What the app does, who it's for (2-3 sentences)
   - **Tech Stack** — Framework, language, database, key libraries
   - **Architecture** — Directory structure as a code block, key architectural patterns
   - **Build/Test/Lint Commands** — Every command Claude might need to run
   - **Coding Conventions** — Naming patterns, file organization rules, import ordering
   - **Common Patterns** — How things are typically done in this codebase (e.g., "all API routes follow this pattern")
   - **Rules** — Explicit constraints ("never use any," "always use strict TypeScript")
   - Show a complete CLAUDE.md example for TaskForge (both Next.js and FastAPI versions)
5. **Hands-On: Write TaskForge's CLAUDE.md** — Step-by-step guided walkthrough. Clone TaskForge, run /init, review output, then iteratively improve each section. Show before/after of each section.
6. **Subdirectory CLAUDE.md Files** — You can place additional CLAUDE.md files in subdirectories (e.g., `frontend/CLAUDE.md`, `api/CLAUDE.md`). They append to (don't override) the root file. Useful for monorepos or projects with distinct areas. Example: separate CLAUDE.md for TaskForge's API routes vs frontend components.
7. **Iterating Over Time** — CLAUDE.md is a living document, not a one-time setup. Update it when: you add new patterns, change architecture, discover Claude making repeated mistakes, onboard new tools. Tip: add "update CLAUDE.md" to your PR checklist.
8. **Anti-Patterns** — Common mistakes:
   - Too much context (dumping entire docs → wastes tokens)
   - Too vague ("use good practices" → meaningless)
   - Outdated information (commands that no longer work)
   - Missing commands (Claude can't build/test if it doesn't know how)
   - Duplicating what's obvious from code (don't describe every file)
9. **Exercises** — Write CLAUDE.md for a personal project. Take an existing CLAUDE.md and improve it. Compare Claude's behavior before and after on the same task.
10. **Troubleshooting** — Claude ignores instructions (check if CLAUDE.md is in the right location, check for conflicting rules). Context too large (CLAUDE.md is too long, trim it). Claude still makes mistakes (rules need to be more explicit and specific).
11. **What's Next** — Tutorial 3: Project Onboarding

**Key code examples to include:**
- Complete CLAUDE.md for TaskForge (Next.js track)
- Complete CLAUDE.md for TaskForge (FastAPI track)
- /init output and how to improve it
- Before/after comparison of Claude behavior

---

### Tutorial 3: Project Onboarding — Learning a Codebase
**Status:** 🔲 TO BUILD
**Level:** 1 — Foundations
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Claude as your onboarding partner when joining a new project or inheriting legacy code
2. **The Exploration Phase** — Prompts for understanding: architecture, entry points, key modules, patterns. Show 8-10 exploration prompts that work on any codebase.
3. **Mapping the Codebase** — Have Claude generate architecture documentation: component diagrams, module relationships, dependency maps. Show generated output examples.
4. **Tracing Data Flows** — Follow a request from route to database and back. Prompt Claude to trace specific user actions through the code. Show example: "trace what happens when a user creates a task."
5. **Understanding Dependencies** — Package analysis with Claude: what's installed, what's unused, what's outdated. Security audit prompts.
6. **Generating Initial Documentation** — Have Claude create README, architecture.md, module docs. These become the foundation for CLAUDE.md (connecting back to Tutorial 2).
7. **Hands-On: Onboard TaskForge** — Clone TaskForge, use Claude Code to explore it from scratch, generate architecture docs, trace a data flow, create initial documentation.
8. **The .tasks/ Folder Pattern** — Introduction to structured task management: create `.tasks/` with `todo/`, `in-progress/`, `done/` subdirectories. Exclude from git via `.gitignore`. This pattern is used extensively from Tutorial 4 onward. Reference: Lumenalta forum post on coding agents workflow.
9. **Exercises** — Onboard an open-source project you've never seen. Generate an architecture diagram description. Create a .tasks/ folder for your current project.
10. **What's Next** — Tutorial 4: The Define → Plan → Iterate Workflow

---

### Tutorial 4: The Define → Plan → Iterate Workflow
**Status:** 🔲 TO BUILD
**Level:** 2 — Core Workflows
**Duration:** 30-45 min
**Reference:** Based on Lumenalta forum post "Get Started Quickly with Coding Agents"

**Sections:**
1. **Overview** — The foundational workflow pattern that makes AI-assisted development productive and low-risk. Works with any agent tool. Makes you a better developer regardless of AI tooling.
2. **Phase 1: Define** — Creating task files from tickets. Task file anatomy: Overview (why/what), Assumptions/Notes (context/history), Acceptance Criteria (how to validate). Store in `.tasks/todo/`. Show example task file for a TaskForge feature.
3. **Phase 2: Plan** — Ask Claude to review the task file and propose solutions. Key: save the plan back to the task file, not just in chat. This avoids long threads and lets you step back later. Use clean contexts for peer review. Optional: ask another agent session for a second opinion on the plan. Ensure the plan includes verification steps (tests pass, lint clean, build succeeds).
4. **Phase 3: Implement** — Ask Claude to implement from the plan file. Claude works from the saved plan, not from memory. Review results before committing. Move task file from `todo/` to `in-progress/`.
5. **Phase 4: Summarize** — Have Claude generate a concise change summary: what changed, why, any side effects. Perfect for PR descriptions. Often surfaces improvements you'd forgotten. Move task file to `done/`.
6. **Hands-On: Add Task Filtering to TaskForge** — Full walkthrough: create task file from a ticket, plan with Claude, implement, summarize. Real feature that adds search/filter to the task list.
7. **Clean Contexts** — Why and when to start fresh sessions. Understanding how context accumulates. Using task files as persistent memory across sessions.
8. **Why This Works** — Builds trust in AI tooling. Personal growth alongside productivity. Reduces risk of misunderstanding. Steps can be taken over by humans at any point. Deliverables (task files) are useful even without AI.
9. **Exercises** — Apply the workflow to a real ticket on your current project. Practice the full cycle: define → plan → implement → summarize. Try the second-opinion pattern with a clean context.
10. **What's Next** — Tutorial 5: Rules, Commands, Skills & Hooks

---

### Tutorial 5: Rules, Commands, Skills & Hooks — The Building Blocks
**Status:** 🔲 TO BUILD
**Level:** 2 — Core Workflows
**Duration:** 35-50 min

**Sections:**
1. **Overview** — Claude Code's extensibility is built on four building blocks, all following consistent patterns of markdown files and configuration. Understanding when to use which is key to productive Claude Code usage.
2. **Rules** — Persistent behavioral constraints Claude always follows.
   - Project rules: `.claude/rules/*.md` files
   - User rules: `~/.claude/rules/*.md` (global, all projects)
   - Inline rules in CLAUDE.md (the "Rules" section from Tutorial 2)
   - When to use standalone rule files vs CLAUDE.md inline rules
   - Examples: "always use TypeScript strict mode," "never commit to main," "always run tests before suggesting a task is complete"
3. **Slash Commands** — Saved reusable prompts invoked with `/`.
   - Creating `.claude/commands/command-name.md` files
   - Project scope vs global scope (`~/.claude/commands/`)
   - Parameterized commands with `$ARGUMENTS`
   - Examples: `/review-pr`, `/run-tests`, `/create-component`, `/today`
   - Naming conventions and organization
4. **Skills** — Knowledge packages Claude auto-detects and loads.
   - SKILL.md anatomy: YAML frontmatter (name, description, allowed-tools) + instructions + code
   - Location: `.claude/skills/<skill-name>/SKILL.md`
   - Key difference: Skills also work on claude.ai and Claude Desktop (not just Claude Code)
   - Claude is supposed to auto-detect when to use them (based on description)
   - Examples: PDF processing skill, database migration skill, testing skill
5. **Hooks** — Deterministic code that fires at lifecycle events.
   - Hook events: PreToolUse, PostToolUse, Stop, SubagentStop, Notification, PreCompact
   - Configuring via `/hooks` command or in `settings.json`
   - Exit codes: 0 = pass through, 1 = error (retry), 2 = block operation
   - Hooks execute shell commands and can read JSON from stdin
   - Examples: desktop notifications, auto-lint on save, date injection, transcript backup
   - When LLM variance is unacceptable, hooks provide deterministic guarantees
6. **The Decision Framework** — When to use which:
   - **Rules** → "always/never" behavioral constraints
   - **Commands** → repeatable prompt shortcuts you invoke manually
   - **Skills** → knowledge + code bundles Claude loads automatically
   - **Hooks** → deterministic automation at specific lifecycle moments
   - Decision tree / flowchart for choosing the right tool
7. **Hands-On: Build All Four for TaskForge** — Create rules (coding standards), commands (/review, /test), a skill (task management), and a hook (notification on completion).
8. **Exercises** — Build a custom command for your most common workflow. Create a rule that prevents a mistake you keep making. Set up a notification hook.
9. **What's Next** — Tutorial 6: Prompt Engineering for Claude Code

---

### Tutorial 6: Prompt Engineering for Claude Code
**Status:** 🔲 TO BUILD
**Level:** 2 — Core Workflows
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Writing prompts for an agentic tool is fundamentally different from chatting with an LLM. Claude Code has access to your files and can run commands — your prompts should leverage this.
2. **The @ File Reference System** — Using `@filename` and `@directory/` to target specific files. When to use it vs letting Claude find files itself. Performance considerations.
3. **Prompt Structure** — The three-part formula: Goal (what you want) + Constraints (how to do it) + Acceptance Criteria (how to verify). Show before/after of vague vs structured prompts.
4. **Exploratory vs Implementation Prompts** — When to be open-ended ("how is auth handled?") vs prescriptive ("add JWT refresh token rotation following this pattern"). Different prompt styles for different phases.
5. **Using Types as Guardrails** — TypeScript strict mode and Pydantic models as safety nets. When Claude generates code that doesn't type-check, it knows immediately. Strong types = fewer bugs from AI.
6. **Building Safety Nets** — Lint, tests, and types as auto-fixers. Configure Claude to always run `npm run lint` and `npm test` after changes. The tighter your safety net, the more autonomy you can give Claude.
7. **Iterating on Prompts** — When Claude misunderstands: don't repeat yourself, reframe. Common reframing techniques. When to break a prompt into smaller steps.
8. **Prompt Libraries** — Saving effective prompts as slash commands (connecting to Tutorial 5). Building a team-wide library of proven prompts.
9. **Hands-On: Add Task Dependencies to TaskForge** — A feature that requires multi-file changes. Craft prompts with clear acceptance criteria. Show the difference good prompting makes.
10. **Anti-Patterns** — Over-specifying (dictating every line), under-specifying (too vague), missing acceptance criteria, not leveraging @ references, writing prompts like chat messages instead of task descriptions.
11. **Exercises** — Rewrite 3 bad prompts into good ones. Add a feature using only well-structured prompts. Build a prompt command for your most common task type.
12. **What's Next** — Tutorial 7: Code Refactoring

---

### Tutorial 7: Code Refactoring with Claude Code
**Status:** 🔲 TO BUILD
**Level:** 2 — Core Workflows
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Refactoring is one of Claude Code's strongest use cases because it requires deep codebase understanding and coordinated multi-file changes — exactly what an agent excels at.
2. **Scoping Refactors** — Start small → go bigger. Small: rename variable, extract function. Medium: extract module, change pattern in one area. Large: architectural change across many files. Risk increases with scope.
3. **The Checkpoint Safety Net** — Use checkpoints and `/rewind` aggressively during refactors. Create a Git branch before starting. The combination of checkpoints + Git branch = near-zero risk.
4. **Test-Driven Refactoring** — Red/green/refactor with Claude: write tests first (or have Claude write them), then refactor with confidence. If tests break, rewind. Show the workflow step by step.
5. **Hands-On: Refactor TaskForge** — Two track-specific refactors:
   - **Next.js track:** Extract duplicated fetch logic into a shared API client
   - **FastAPI track:** Extract inline SQL queries into a repository pattern
   - Walk through the full process: scope, test, refactor, verify
6. **Migration Patterns** — Updating dependencies, framework version upgrades, changing libraries. How to prompt Claude for safe incremental migrations.
7. **Reviewing AI-Generated Refactors** — What to look for: semantic correctness (not just syntax), edge cases, performance implications, breaking changes at boundaries. Checklist for reviewing refactors.
8. **Exercises** — Refactor error handling to be consistent across all routes. Extract a reusable component/module. Upgrade a dependency and fix breaking changes.
9. **What's Next** — Tutorial 8: Handling Documentation

---

### Tutorial 8: Handling Documentation
**Status:** 🔲 TO BUILD
**Level:** 2 — Core Workflows
**Duration:** 25-35 min

**Sections:**
1. **Overview** — Documentation as a first-class development artifact. Claude Code can generate, update, and maintain docs as part of your workflow — not as an afterthought.
2. **Auto-Generating READMEs** — Have Claude analyze the codebase and generate a comprehensive README. Show the prompts and the quality of output. Iterate to improve.
3. **API Documentation** — Generate docs from route definitions and schemas. For FastAPI: leverage OpenAPI/Swagger docstrings (reference Lumenalta forum post on API docs). For Next.js: document API route handlers.
4. **Architecture Decision Records (ADRs)** — Documenting "why" not just "what." Have Claude generate ADRs for architectural choices in the codebase. Template and examples.
5. **Changelog Generation** — Generate changelogs from Git history. Structured format with categories (features, fixes, breaking changes).
6. **Inline Comments** — When and how to add them. Claude can add explanatory comments to complex logic. Be careful: over-commenting is as bad as under-commenting.
7. **Keeping Docs in Sync** — Make documentation part of the "Summarize" phase from Tutorial 4. Add "update docs" to acceptance criteria. Rule: if code changes, docs must be reviewed.
8. **Hands-On: Generate Full Docs for TaskForge** — README, API reference, architecture doc, and an ADR for the SQLite choice.
9. **Exercises** — Generate documentation for your current project. Create an ADR for a recent decision. Set up a docs-update command.
10. **What's Next** — Tutorial 9: Token Optimization

---

### Tutorial 9: Token Optimization & Context Management
**Status:** 🔲 TO BUILD
**Level:** 3 — Advanced
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Claude Code's effectiveness degrades as context fills up. Strategic context management is the difference between productive all-day sessions and frustrating ones.
2. **Understanding the Context Window** — What it is, what fills it (conversation, file reads, command outputs). How to think about context as a budget.
3. **Context Rot** — The phenomenon where Claude gets worse the longer you chat. Why it happens (conflicting information, outdated context, instruction dilution). How to recognize it.
4. **Model Selection Strategy** — When to use each model:
   - **Opus 4.6**: Complex architecture decisions, multi-file reasoning, agent teams (most expensive, smartest)
   - **Sonnet 4.5**: Daily coding, best balance of speed/quality/cost (default recommended)
   - **Haiku 4.5**: Simple tasks, fast iteration, cost-efficient (quick questions, formatting)
   - The `/model` command and when to switch mid-session
5. **Compaction** — What happens when context is full: Claude auto-summarizes. What's preserved, what's lost. The `/compact` command for manual compaction. How to prep for compaction (save important state to files first).
6. **Clean Context Patterns** — When and why to start fresh sessions. The principle: one task per session for complex work. Using `/resume` for continuity.
7. **Session Handoff** — Continuing plans across chat windows via .tasks/ files. The file-based memory pattern: write state to disk before ending a session, read it in the next.
8. **The .tasks/ Pattern as Persistent Memory** — Connecting back to Tutorial 4. Task files survive context resets, compaction, and new sessions. They're the persistent layer.
9. **Hands-On: Build Notifications for TaskForge** — A large feature that requires context management strategy. Plan across multiple sessions. Demonstrate context handoff.
10. **Token Cost Awareness** — Understanding usage and budgets. How different models cost differently. Strategies for cost-effective development.
11. **Exercises** — Practice context handoff across sessions. Build a feature that requires 2+ sessions with state preservation. Compare output quality at different context fill levels.
12. **What's Next** — Tutorial 10: AI-Native Development

---

### Tutorial 10: AI-Native Development — Adopting an Agent-First Mindset
**Status:** 🔲 TO BUILD
**Level:** 3 — Advanced
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Moving beyond "AI-assisted" (Claude helps me code) to "AI-native" (I design my workflow around what agents do best).
2. **Task Decomposition for Agents** — Breaking work into delegatable units. What makes a good AI task vs a bad one. Size, specificity, verifiability.
3. **Designing AI-Friendly Codebases** — Strong types, clear abstractions, good test coverage, explicit patterns. The more structured your code, the better AI works with it.
4. **The 50+ Task Categories** — Categorized list of tasks suitable for AI automation: bug fixes, test writing, refactoring, migrations, docs, boilerplate, code review, data transformation, config management, etc. Reference for which tasks to try first.
5. **When NOT to Use Claude Code** — Security-critical logic, novel algorithm design, highly ambiguous product decisions, tasks requiring real-time human judgment. Knowing the limits.
6. **Building Trust Incrementally** — The confidence ladder: start with low-risk tasks, verify everything, gradually increase autonomy as you learn Claude's patterns. Don't go from zero to full autonomous mode.
7. **Measuring AI-Assisted Productivity** — What to track: tasks completed, time saved, quality of output, context switches saved. Avoiding vanity metrics.
8. **Hands-On: Design Activity Feed for TaskForge** — Design and build a feature entirely with an agent-first mindset from scratch. Start with types, then tests, then implementation.
9. **Exercises** — Audit your last week: which tasks could Claude have done? Redesign a workflow to be agent-first. Measure time on a task with and without Claude.
10. **What's Next** — Tutorial 11: Safe Delivery Pipelines

---

### Tutorial 11: Safe Delivery Pipelines
**Status:** 🔲 TO BUILD
**Level:** 3 — Advanced
**Duration:** 35-50 min

**Sections:**
1. **Overview** — Integrating Claude Code into Git workflows for safe, reviewable, auditable delivery.
2. **Commit Workflows** — Claude writes meaningful commit messages. Staged commits for logical groupings. The summarize step (Tutorial 4) feeds directly into commits.
3. **Branch Strategy** — Feature branches with Claude. Branch naming conventions. Working in multiple branches with Git worktrees.
4. **PR Creation** — From the summarize step to a GitHub/GitLab PR. Claude writes descriptions, adds labels, assigns reviewers.
5. **Automated Code Review** — Using Claude Code in CI to review PRs automatically. GitHub Actions integration. GitLab CI/CD integration. What to check vs what to leave for humans.
6. **CI/CD Integration** — Running Claude in pipelines for: automated review, issue triage, test generation, documentation updates. Configuration examples.
7. **Session Control** — Managing autonomous operation safely. Permission configurations for CI. What to allow, what to gate.
8. **Human-in-the-Loop** — Where to put the gates in an automated pipeline. Approval workflows. Breaking changes that always need human review.
9. **Hands-On: Ship a Feature with Full Git Workflow** — Implement a TaskForge feature using: branch → implement → test → commit → PR → review cycle, all with Claude.
10. **Exercises** — Set up a Git workflow for your project. Configure an automated review action. Practice the full branch → PR cycle.
11. **What's Next** — Tutorial 12: MCP Servers

---

### Tutorial 12: MCP Servers — Extending Claude's Reach
**Status:** 🔲 TO BUILD
**Level:** 3 — Advanced
**Duration:** 35-50 min

**Sections:**
1. **Overview** — MCP (Model Context Protocol) connects Claude Code to external tools and data. It's an open standard for AI-tool integration.
2. **MCP Architecture** — How it works: Claude Code ↔ MCP client ↔ MCP server ↔ External service. The protocol, message format, tool discovery.
3. **Configuring in settings.json** — Adding MCP servers to your Claude Code configuration. Project-level vs user-level config.
4. **Built-in and Popular Servers** — GitHub (PR management, issue tracking), filesystem. Third-party: Jira, Linear, Slack, Google Drive, databases, Notion.
5. **Using GitHub MCP** — Detailed walkthrough: create PRs, review code, manage issues, link commits. The most common MCP integration.
6. **Database MCP** — Connecting Claude to your database for direct queries. Safety considerations (read-only access).
7. **Building a Custom MCP Server** — When you need Claude to access your own internal tools. Step-by-step guide to building a basic MCP server.
8. **MCP vs Skills vs Bash** — Decision framework:
   - MCP: for real-time external service integration
   - Skills: for knowledge + code bundles (no external connection needed)
   - Bash: for simple CLI tool access
9. **Hands-On: Connect TaskForge to GitHub MCP** — Set up GitHub MCP, link TaskForge tasks to GitHub issues and PRs.
10. **Exercises** — Set up GitHub MCP for your project. Use it to create a PR from Claude Code. Explore a database MCP for your data.
11. **What's Next** — Tutorial 13: Subagents & AGENTS.md

---

### Tutorial 13: Subagents & AGENTS.md
**Status:** 🔲 TO BUILD
**Level:** 3 — Advanced
**Duration:** 35-50 min

**Sections:**
1. **Overview** — Subagents are specialized AI assistants with their own context windows, system prompts, and tool restrictions. They handle specific tasks while keeping your main conversation clean.
2. **Subagent Anatomy** — Markdown files with YAML frontmatter: name, description, tools, model, hooks. The content below the frontmatter is the system prompt. Location: `.claude/agents/` (project) or `~/.claude/agents/` (user).
3. **Creating with /agents** — Interactive setup: `/agents` → Create new agent → choose scope → generate with Claude or write manually. Walk through the full flow.
4. **Tool Restrictions** — Limiting what a subagent can do: whitelist specific tools (Read, Write, Edit, Bash, Glob, Grep). If omitted, inherits all tools from the session. Best practice: always restrict tools for safety.
5. **Read-Only Subagents** — Agents that can only read and analyze, never modify. Perfect for code review, exploration, and analysis. Example: code-reviewer agent with only Read, Glob, Grep tools.
6. **Memory Instructions** — Include memory instructions in the subagent's markdown so it proactively records what it discovers. Builds institutional knowledge across conversations.
7. **PreToolUse Hooks** — Fine-grained control: validate operations before they execute. Example: database-query agent that only allows SELECT statements. Hook scripts that inspect and approve/deny operations.
8. **Project vs User Scope** — Project agents in `.claude/agents/` for project-specific specialists. User agents in `~/.claude/agents/` for personal agents available everywhere. Project overrides user on name collision.
9. **Hands-On: Build Three Subagents for TaskForge** —
   - `code-reviewer`: Read-only, suggests improvements for readability and performance
   - `test-writer`: Writes tests for untested code, restricted to Read + Write + Bash
   - `doc-generator`: Generates and updates documentation
10. **Exercises** — Create a subagent for your most common review task. Build a read-only exploration agent. Create a user-level agent you use across all projects.
11. **What's Next** — Tutorial 14: Supervisor Architectures

---

### Tutorial 14: Supervisor Architectures
**Status:** 🔲 TO BUILD
**Level:** 4 — Expert
**Duration:** 40-55 min

**Sections:**
1. **Overview** — A supervisor is a lead agent that coordinates, reviews, and governs other agents. It creates pipelines where specialized subagents handle stages with hook-based quality gates between them.
2. **The Pipeline Pattern** — Multi-stage development pipeline: pm-spec → architect-review → implementer-tester → code-review. Each stage is a subagent with specific responsibilities and tool access.
3. **Hook-Based Validation** — Stop hooks that fire when a subagent completes. Validation scripts check output quality: did the spec agent create a file? Does it contain required sections? Did tests pass? If validation fails, the agent receives feedback and continues.
4. **Queue Files for Agent Handoff** — File-based coordination between pipeline stages. A hook watches a queue file and surfaces the next command to the main agent. The SubagentStop hook prints explicit handoff instructions.
5. **Human-in-the-Loop Gating** — Where humans approve transitions. Not every stage needs human approval — design which transitions are automatic and which require sign-off. Risk-based gating.
6. **The Builder/Validator Pattern** — An adversarial pattern: one agent builds, another validates. The validator has read-only access and strict quality criteria. If validation fails, the builder gets feedback and iterates.
7. **Governance Through Scoped Permissions** — Each agent in the pipeline has minimum necessary permissions. The spec agent can write specs but not code. The reviewer can read but not modify. Defense in depth.
8. **Hands-On: Build a Full Pipeline for TaskForge Time Tracking** — Complete multi-stage pipeline:
   - `pm-spec` agent writes the feature spec
   - `architect-review` agent validates design against architecture
   - `implementer-tester` agent builds the feature and writes tests
   - Stop hooks validate each stage's output
   - Human approves the transition from spec to implementation
9. **Exercises** — Design a pipeline for a feature on your project. Implement the builder/validator pattern. Create quality gate hooks.
10. **What's Next** — Tutorial 15: Agent Teams

---

### Tutorial 15: Agent Teams — Multi-Agent Collaboration
**Status:** 🔲 TO BUILD
**Level:** 4 — Expert
**Duration:** 40-55 min

**Sections:**
1. **Overview** — Agent Teams remove the bottleneck of subagents by enabling direct inter-agent communication. Teammates message each other, claim tasks from a shared list, and coordinate without routing everything through a lead.
2. **Subagents vs Agent Teams** — Critical distinction: subagents are contractors on separate errands (report back to you, can't talk to each other). Agent teams are a collaborative squad in the same room (direct messaging, shared task list, real-time coordination).
3. **Enabling Agent Teams** — Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in environment or settings.json. This is experimental and token-intensive. Requires Opus 4.6 for best results.
4. **Lead vs Teammate Roles** — The lead coordinates, assigns tasks, synthesizes results. Teammates work independently in their own context windows. Teammates load project context (CLAUDE.md, MCP, skills) but NOT the lead's conversation history — they start fresh with the spawn prompt.
5. **Spawn Prompts** — How the lead initializes teammates. The spawn prompt is all the context a teammate gets. Well-crafted spawn prompts are critical. Templates and examples.
6. **Communication** — How teammates interact: direct messages (to one teammate), broadcasts (to all — use sparingly, costs scale with team size), task claiming from shared list, idle notifications.
7. **Display Modes** — In-process (default): all teammates in one terminal, use Shift+Down to cycle. Split panes: each teammate in its own pane (requires tmux or iTerm2). See everyone's output simultaneously.
8. **Task Claiming and Dependencies** — File locking prevents race conditions when multiple teammates claim the same task. Dependency management: when one teammate completes a blocking task, dependent tasks unblock automatically.
9. **Token Cost Management** — Each teammate is a separate Claude instance. Costs scale linearly with team size. Strategies: keep teams small (3-4), define clear scope, avoid unnecessary broadcasts.
10. **When Teams vs Subagents** — Use subagents when tasks are independent and report back. Use teams when tasks need coordination, shared discovery, or cross-cutting communication.
11. **Hands-On: Build Sprint Planning with Agent Teams** — Multi-agent feature build:
    - `frontend` teammate: React components for sprint board
    - `backend` teammate: API routes for sprint management
    - `test` teammate: Integration tests across both
    - `lead`: Coordinates, reviews, resolves conflicts
12. **Exercises** — Set up a 2-agent team for a simple feature. Practice spawn prompt engineering. Compare completion time: single agent vs team.
13. **What's Next** — Tutorial 16: Ralph — Autonomous Dev Loops

---

### Tutorial 16: Ralph — Autonomous AI Development Loops
**Status:** 🔲 TO BUILD
**Level:** 4 — Expert
**Duration:** 40-55 min

**Sections:**
1. **Overview** — Build a fully autonomous development loop where Claude Code runs continuously: reading tickets, planning, implementing, testing, committing, and creating PRs with minimal human intervention.
2. **What Is "Ralph"?** — Named after the community-developed pattern (Ralph Wiggum loop). The concept: an agent loop that keeps working through a queue of tasks, self-verifying, and only stopping when it needs human input or encounters an error it can't resolve.
3. **Loop Architecture** — Read next task → plan → implement → test → verify → commit → move to next. The verification step is what makes it work — Claude must prove its changes are correct before moving on.
4. **Background Tasks** — Long-running processes (dev servers, file watchers) that run without blocking Claude's main work. Configure background tasks that Claude starts and monitors.
5. **Session Persistence** — Surviving disconnects and restarts. Task files as state management. Checkpoints as rollback points. Resume strategies.
6. **Checkpoint-Based Rollback** — Every change creates a checkpoint. If autonomous Claude takes a wrong turn, the loop can rewind automatically or flag for human review.
7. **Monitoring and Observability** — Hook-based logging: capture every tool call, task transition, and agent lifecycle event. TTS alerts for when Claude needs input. Notification hooks for completion or errors.
8. **Safety Gates and Circuit Breakers** — Automatic stop conditions: too many consecutive failures, unexpected file deletions, changes outside allowed directories, budget limits reached. Design your circuit breakers before enabling autonomy.
9. **Cost Management** — Long-running autonomous sessions consume tokens continuously. Set budget limits. Use cost-efficient models (Sonnet) for routine tasks, escalate to Opus only when needed.
10. **When to Break the Loop** — Human review triggers: security-sensitive changes, database migrations, breaking API changes, ambiguous requirements. Not everything should be autonomous.
11. **Hands-On: Set Up Ralph for TaskForge Bug Backlog** —
    - Seed 5-10 intentional bugs in TaskForge
    - Create task files for each bug
    - Configure the autonomous loop with safety gates
    - Watch Claude work through the queue
    - Review and approve changes
12. **Exercises** — Set up a simple autonomous loop for test generation. Configure safety gates for your project. Monitor an autonomous session with hooks.
13. **What's Next** — Tutorial 17: Plugins & Marketplace

---

### Tutorial 17: Plugins & Marketplace
**Status:** 🔲 TO BUILD
**Level:** 4 — Expert
**Duration:** 30-45 min

**Sections:**
1. **Overview** — Package and distribute your Claude Code extensions (subagents, skills, hooks, commands) as reusable plugins. Share them across teams, projects, and the community.
2. **Plugin Architecture** — What goes in a plugin: agents, commands, skills, hooks bundled together. The `.claude/` directory structure as a distributable package.
3. **Plugin Directory Structure** — Standard layout for a plugin package. How plugins are discovered and loaded by Claude Code.
4. **Creating a Shareable Plugin** — Take project-specific agents/skills/hooks and generalize them. Parameterize project-specific details. Add documentation and usage instructions.
5. **Installing Plugins** — Installing from GitHub repositories. Installing from the official plugins directory. Managing plugin versions.
6. **The Official Plugins Directory** — Anthropic's curated collection of plugins in the Claude Code GitHub repo. How to browse, install, and contribute.
7. **Versioning and Updates** — Maintaining plugins over time. Handling breaking changes in Claude Code. Semantic versioning for plugins.
8. **Building for Team-Wide Adoption** — Organization-level plugins: shared coding standards, review agents, documentation generators. Getting buy-in and measuring adoption.
9. **Hands-On: Package TaskForge's Subagents as a Plugin** — Take the code-reviewer, test-writer, and doc-generator subagents from Tutorial 13 and package them as a distributable plugin with documentation.
10. **The Claude Code Ecosystem** — Where things are heading: the growing community, emerging patterns, the future of agentic development.
11. **Series Conclusion** — Recap of the full journey from Tutorial 1 to 17. What you've learned. Where to go from here. Links to Lumenalta resources and community.

---

## Lumenalta Resources to Reference

Include links to these throughout the tutorials where relevant:
- **Forum: "Coaches Can Use Claude Code Too"** — https://forum.clevertech.biz/t/coaches-can-use-claude-code-too/1112 — Vibe coding examples and tool creation
- **Forum: "Get Started Quickly with Coding Agents"** — https://forum.clevertech.biz/t/get-started-quickly-with-coding-agents/1084 — The Define → Plan → Iterate workflow (primary reference for Tutorial 4)
- **Forum: "Building Great Prompts and Setting Context"** — https://forum.clevertech.biz/t/building-great-prompts-and-setting-context-using-claude-code-part-2/649 — Video series on prompt engineering for Claude Code
- **Forum: "Claude Code Course – Best Practices"** — https://forum.clevertech.biz/t/claude-code-course-best-practices-for-using-claude-as-a-coding-assistan/1079 — DeepLearning.AI free course link
- **Forum: "Improving API Documentation with AI-Assisted Code Review"** — https://forum.clevertech.biz/t/improving-api-documentation-with-ai-assisted-code-review/1140 — Multi-AI approach to FastAPI docs (reference for Tutorial 8)

## External References for Research
- **Anthropic Claude Code Docs:** https://code.claude.com/docs/en/overview
- **Anthropic Subagents Docs:** https://code.claude.com/docs/en/sub-agents
- **Anthropic Common Workflows:** https://code.claude.com/docs/en/common-workflows
- **Claude Code GitHub (changelog):** https://github.com/anthropics/claude-code
- **DeepLearning.AI Claude Code Course:** https://www.deeplearning.ai/
- **Community subagents collection:** https://github.com/VoltAgent/awesome-claude-code-subagents
- **Claude Code hooks mastery:** https://github.com/disler/claude-code-hooks-mastery
- **Agent teams guide:** https://claudefa.st/blog/guide/agents/agent-teams
- **Subagent best practices (PubNub):** https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/