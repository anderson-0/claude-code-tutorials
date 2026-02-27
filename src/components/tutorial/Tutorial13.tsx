'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { AppSelector } from './AppSelector'
import { DynamicCodeBlock } from './DynamicCodeBlock'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[12] // Tutorial 13 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'anatomy', short: 'Anatomy' },
  { id: 'creating', short: 'Creating' },
  { id: 'tool-restrictions', short: 'Tools' },
  { id: 'read-only', short: 'Read-Only' },
  { id: 'memory', short: 'Memory' },
  { id: 'hooks', short: 'Hooks' },
  { id: 'scope', short: 'Scope' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial13Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial13({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial13Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const bullet = (items: React.ReactNode[], color = '#3fb950') =>
    items.map((item, i) => (
      <div key={i} className="flex items-baseline gap-2.5 py-1.5">
        <span className="shrink-0 text-base leading-none" style={{ color }}>
          ›
        </span>
        <span className="text-sm leading-relaxed text-[#c9d1d9]">{item}</span>
      </div>
    ))

  return (
    <div className="min-h-screen bg-[#010409] font-sans text-[#c9d1d9]">
      <TutorialSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentTutorialId={currentTutorialId}
        onSelectTutorial={onSelectTutorial}
      />
      <SectionNav
        sections={sections}
        activeSection={activeSection}
        onMenuOpen={() => setSidebarOpen(true)}
      />

      <div className="mx-auto max-w-[820px] px-6 pb-20">
        {/* Header */}
        <div className="pb-5 pt-11">
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-xl px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-white"
              style={{ background: levelColors[meta.level] }}
            >
              {levelLabels[meta.level]}
            </span>
            <span className="rounded-xl bg-[#1f6feb20] px-2.5 py-[3px] text-[10px] font-semibold text-[#58a6ff]">
              {meta.tag.toUpperCase()}
            </span>
            <span className="text-xs text-[#8b949e]">{meta.duration}</span>
            <span className="text-xs text-[#484f58]">·</span>
            <span className="text-xs text-[#8b949e]">Tutorial {meta.id} of {tutorials.length}</span>
          </div>
          <h1 className="mb-2.5 text-[34px] font-extrabold leading-tight text-[#e6edf3]">
            Subagents & AGENTS.md
          </h1>
          <p className="text-[17px] leading-snug text-[#8b949e]">
            {meta.description}
          </p>
        </div>

        {/* OVERVIEW */}
        <section id="overview">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Overview
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Subagents are <strong className="text-[#e6edf3]">specialized AI assistants</strong> that handle
            specific tasks with their own context windows, system prompts, and tool restrictions. They keep
            your main conversation clean while delegating work to focused specialists.
          </p>

          <div className="my-5 grid grid-cols-3 gap-3">
            {[
              { icon: '👤', label: 'Main Session', desc: 'You coordinate work', color: '#3fb950' },
              { icon: '🤖', label: 'Code Reviewer', desc: 'Read-only analysis', color: '#58a6ff' },
              { icon: '✍️', label: 'Test Writer', desc: 'Writes tests only', color: '#d29922' },
            ].map((agent, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4 text-center"
                style={{ borderColor: `${agent.color}50` }}
              >
                <div className="mb-2 text-2xl">{agent.icon}</div>
                <div className="mb-1 text-[13px] font-semibold text-[#e6edf3]">
                  {agent.label}
                </div>
                <div className="text-[11px] leading-snug text-[#8b949e]">
                  {agent.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Create specialized agents, restrict tools, use PreToolUse hooks, build institutional memory',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-5 completed, familiarity with CLAUDE.md and hooks',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, TaskForge project',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Three specialized subagents for code review, testing, and docs',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1.5 text-xl">{item.icon}</div>
                <div className="mb-1 text-[13px] font-semibold text-[#e6edf3]">
                  {item.title}
                </div>
                <div className="text-xs leading-snug text-[#8b949e]">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <Callout type="info" title="Why Subagents?">
            Subagents solve the <strong>context pollution</strong> problem. Instead of mixing code review,
            testing, implementation, and documentation in one conversation, delegate each to a specialist.
            Your main session stays focused, and specialists build expertise over time.
          </Callout>
        </section>

        {/* ANATOMY */}
        <section id="anatomy">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Subagent Anatomy
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A subagent is a <strong className="text-[#e6edf3]">markdown file</strong> with YAML frontmatter
            that defines its behavior. The content below the frontmatter becomes the subagent's system prompt.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Basic Structure
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/agents/code-reviewer.md"
            code={`---
name: code-reviewer
description: Reviews code for readability, performance, and best practices
tools:
  - Read
  - Glob
  - Grep
model: claude-sonnet-4
hooks:
  - name: read-only-guard
    type: PreToolUse
---

# Code Reviewer Agent

You are a specialized code review assistant. Your role is to:

1. **Analyze code quality** — Check for readability, maintainability, and adherence to best practices
2. **Identify performance issues** — Flag inefficient algorithms, unnecessary computations, memory leaks
3. **Suggest improvements** — Provide actionable recommendations with examples
4. **Check for security concerns** — Look for common vulnerabilities

## Guidelines

- Be specific in your feedback. Quote exact line numbers and code snippets.
- Always explain WHY a change would improve the code.
- Prioritize critical issues over stylistic preferences.
- Suggest, don't demand. The developer has final say.

## Output Format

For each file reviewed, provide:
- **Overall Assessment** — Summary of code quality
- **Issues Found** — List problems by severity (Critical, Important, Minor)
- **Recommendations** — Specific changes with before/after examples
- **Positive Notes** — Highlight what's done well`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Frontmatter Fields
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">name</strong> — Unique identifier for the agent
                  (used in <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">/agent name</code> command)
                </>,
                <>
                  <strong className="text-[#e6edf3]">description</strong> — Short summary shown in agent list
                </>,
                <>
                  <strong className="text-[#e6edf3]">tools</strong> — Whitelist of allowed tools
                  (Read, Write, Edit, Bash, Glob, Grep, etc.)
                </>,
                <>
                  <strong className="text-[#e6edf3]">model</strong> — Which Claude model to use
                  (claude-sonnet-4, claude-opus-4, etc.)
                </>,
                <>
                  <strong className="text-[#e6edf3]">hooks</strong> — Lifecycle hooks that apply to this agent
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Storage Locations
          </h3>
          <CodeBlock
            code={`.claude/agents/           # Project-specific agents
~/.claude/agents/          # User-level agents (all projects)

# Project agents override user agents with the same name`}
          />

          <Callout type="tip" title="System Prompt Is Everything">
            The content below the frontmatter is the subagent's <strong>entire context</strong>.
            Be clear, specific, and include examples. This is what makes a subagent useful vs. generic.
          </Callout>
        </section>

        {/* CREATING */}
        <section id="creating">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Creating with /agents
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code provides an interactive setup flow for creating subagents. You can generate
            them with AI assistance or write them manually.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Interactive Creation Flow
          </h3>
          <CodeBlock
            lang="text"
            filename="In Claude session"
            code={`> /agents

# You'll see:
# - List of existing agents (if any)
# - Options: Create new agent, Edit existing, Delete, View details

# Select "Create new agent"

# Prompted for:
1. Agent name (e.g., "test-writer")
2. Scope: Project (.claude/agents/) or User (~/.claude/agents/)
3. Creation method: Generate with Claude or Write manually`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generate with Claude (Recommended)
          </h3>
          <CodeBlock
            lang="text"
            filename="Generation flow"
            code={`# After selecting "Generate with Claude":

> What should this agent do?

You: Write unit tests for untested code. It should read existing code,
     identify missing test coverage, and write comprehensive tests
     following the project's testing patterns.

> Which tools should it have access to?

You: Read, Write, Bash (for running tests), Glob (finding files)

# Claude generates the agent file with:
# - Appropriate system prompt based on your description
# - Tool restrictions
# - Recommended hooks
# - Example usage instructions`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Invoking a Subagent
          </h3>
          <CodeBlock
            lang="text"
            filename="Using the /agent command"
            code={`# Syntax: /agent <name> <task description>

> /agent code-reviewer Review src/components/TaskList.tsx for performance

# The subagent:
# 1. Spawns a new Claude session with its system prompt
# 2. Executes the task using only its allowed tools
# 3. Returns results to your main session
# 4. Terminates (no persistent state between invocations)

# You see the output inline in your conversation`}
          />

          <Callout type="warning" title="Subagents Are Stateless">
            Each <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px]">/agent</code> invocation
            spawns a fresh session. Subagents don't remember previous interactions unless you use
            memory instructions (covered in the Memory section).
          </Callout>
        </section>

        {/* TOOL RESTRICTIONS */}
        <section id="tool-restrictions">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Tool Restrictions
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Limiting what a subagent can do is <strong className="text-[#e6edf3]">critical for safety</strong>.
            If you omit the <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">tools</code> field,
            the subagent inherits all tools from the main session.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Available Tools
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Read</strong> — Read file contents
                </>,
                <>
                  <strong className="text-[#e6edf3]">Write</strong> — Write new files or overwrite existing
                </>,
                <>
                  <strong className="text-[#e6edf3]">Edit</strong> — Make targeted edits to existing files
                </>,
                <>
                  <strong className="text-[#e6edf3]">Bash</strong> — Run shell commands
                </>,
                <>
                  <strong className="text-[#e6edf3]">Glob</strong> — Find files by pattern
                </>,
                <>
                  <strong className="text-[#e6edf3]">Grep</strong> — Search file contents
                </>,
                <>
                  <strong className="text-[#e6edf3]">WebFetch</strong> — Fetch web content
                </>,
                <>
                  <strong className="text-[#e6edf3]">WebSearch</strong> — Search the web
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Examples by Agent Type
          </h3>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 mt-0 text-[15px] font-semibold text-[#e6edf3]">
              Read-Only Agent (Code Review, Analysis)
            </h4>
            <CodeBlock
              lang="yaml"
              code={`tools:
  - Read
  - Glob
  - Grep`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 mt-0 text-[15px] font-semibold text-[#e6edf3]">
              Test Writer (Read + Write + Run Tests)
            </h4>
            <CodeBlock
              lang="yaml"
              code={`tools:
  - Read
  - Write
  - Bash
  - Glob`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 mt-0 text-[15px] font-semibold text-[#e6edf3]">
              Documentation Generator (Read + Write)
            </h4>
            <CodeBlock
              lang="yaml"
              code={`tools:
  - Read
  - Write
  - Glob
  - Grep`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 mt-0 text-[15px] font-semibold text-[#e6edf3]">
              Refactoring Agent (Edit + Run Tests)
            </h4>
            <CodeBlock
              lang="yaml"
              code={`tools:
  - Read
  - Edit
  - Bash
  - Glob
  - Grep`}
            />
          </div>

          <Callout type="warning" title="Default = All Tools">
            <strong>Always specify tools explicitly.</strong> If you omit the{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px]">tools</code> field,
            the subagent gets unrestricted access. This defeats the purpose of sandboxing.
          </Callout>
        </section>

        {/* READ-ONLY */}
        <section id="read-only">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Read-Only Subagents
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agents that can only <strong className="text-[#e6edf3]">read and analyze</strong> are perfect
            for code review, exploration, and auditing. They're safe to run on any codebase without risk
            of accidental modifications.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Complete Code Review Agent
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/agents/code-reviewer.md"
            code={`---
name: code-reviewer
description: Reviews code for readability, performance, and best practices
tools:
  - Read
  - Glob
  - Grep
model: claude-sonnet-4
---

# Code Reviewer

You are a specialized code review assistant focused on improving code quality.

## Your Responsibilities

### 1. Readability & Maintainability
- Variable and function naming
- Code organization and modularity
- Comment quality and necessity
- Complexity (cyclomatic, cognitive)

### 2. Performance
- Inefficient algorithms (O(n²) when O(n) exists)
- Unnecessary computations (work done in loops)
- Memory leaks (event listeners, subscriptions)
- Premature optimization (avoid bikeshedding)

### 3. Best Practices
- Error handling and edge cases
- Type safety and null checks
- Security vulnerabilities (XSS, SQL injection, etc.)
- Accessibility (a11y) issues

### 4. Architecture
- Separation of concerns
- Dependency direction
- Coupling and cohesion
- Testability

## Review Process

1. **Read the entire file** to understand context
2. **Identify issues** by severity: Critical → Important → Minor
3. **Provide specific recommendations** with code examples
4. **Highlight what's done well** to reinforce good patterns

## Output Format

# Code Review: [filename]

## Summary
[Brief overview of code quality]

## Critical Issues
[Issues that must be fixed before merge]

## Important Issues
[Issues that should be addressed soon]

## Minor Issues
[Nice-to-have improvements]

## Positive Notes
[What's done well - be specific]

## Memory Instructions

After each review, record patterns you discover:
- Project-specific conventions
- Common mistakes in this codebase
- Architectural decisions

Use /memory to save these insights for future reviews.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Using the Code Reviewer
          </h3>
          <CodeBlock
            lang="text"
            filename="Example usage"
            code={`# Review a specific file
> /agent code-reviewer Review src/hooks/useFilterState.ts

# Review multiple files
> /agent code-reviewer Review all files in src/components/features/

# Review before PR
> /agent code-reviewer Review all modified files in the current branch`}
          />

          <Callout type="info" title="Read-Only Is Safe by Default">
            Read-only agents can explore any part of your codebase without risk. This makes them
            ideal for onboarding (exploring unfamiliar code) and auditing (security/compliance reviews).
          </Callout>
        </section>

        {/* MEMORY */}
        <section id="memory">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Memory Instructions
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Subagents are stateless between invocations, but you can include{' '}
            <strong className="text-[#e6edf3]">memory instructions</strong> in their system prompt
            so they proactively record what they learn.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Memory Pattern
          </h3>
          <CodeBlock
            lang="markdown"
            filename="In the subagent's system prompt"
            code={`## Memory Instructions

After completing your task, use the /memory tool to record:

### Project Conventions
- Naming patterns you observe (e.g., "API routes use kebab-case")
- File organization rules (e.g., "Hooks go in src/hooks/")
- Testing patterns (e.g., "Tests colocated with source files")

### Common Issues
- Mistakes you see frequently in this codebase
- Edge cases that are often missed
- Anti-patterns to flag

### Architectural Decisions
- Why certain patterns are used
- Technology choices and their rationale
- Constraints that affect implementation

Use this format:

\`\`\`
/memory [category] [insight]
\`\`\`

Example:
\`\`\`
/memory conventions "All API error responses include a 'code' field for client-side handling"
/memory common-issues "Date comparisons often forget timezone conversion"
\`\`\`

This knowledge will help you provide better, more context-aware reviews in the future.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            How Memory Works
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  Subagent discovers a pattern (e.g., "All components use CSS Modules")
                </>,
                <>
                  Subagent uses <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">/memory</code> to
                  record the insight
                </>,
                <>
                  Memory is stored in <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">.claude/memory.json</code>
                </>,
                <>
                  Future invocations of the subagent see this memory in their context
                </>,
                <>
                  Over time, the subagent builds <strong className="text-[#e6edf3]">institutional knowledge</strong>
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Memory-Enabled Test Writer
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/agents/test-writer.md"
            code={`---
name: test-writer
description: Writes comprehensive tests for untested code
tools:
  - Read
  - Write
  - Bash
  - Glob
model: claude-sonnet-4
---

# Test Writer

You write unit tests for code that lacks test coverage.

## Process

1. Read the source code
2. Identify test cases (happy path, edge cases, error conditions)
3. Read existing tests to match style and patterns
4. Write comprehensive tests following project conventions
5. Run tests to verify they pass
6. Record patterns you discover

## Memory Instructions

Use /memory to record:

### Testing Patterns
- Test file naming (e.g., "*.test.ts" vs "*.spec.ts")
- Assertion library preferences (Jest, Vitest, etc.)
- Mock patterns (jest.mock location, mock factory patterns)
- Test organization (describe blocks, naming conventions)

### Project-Specific Rules
- Which functions need integration tests vs unit tests
- Required test coverage thresholds
- CI/CD test commands

Example:
\`\`\`
/memory testing-patterns "Integration tests go in __tests__/integration/"
/memory project-rules "API handlers require both success and error tests"
\`\`\``}
          />

          <Callout type="tip" title="Build Expertise Over Time">
            Memory instructions turn subagents into learning systems. Each invocation adds to their
            knowledge base, making them progressively more useful and context-aware.
          </Callout>
        </section>

        {/* HOOKS */}
        <section id="hooks">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            PreToolUse Hooks
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            PreToolUse hooks give you <strong className="text-[#e6edf3]">fine-grained control</strong> over
            what a subagent can do. While tool restrictions limit which tools are available, hooks can
            inspect and validate individual operations before they execute.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Use Case: Database Query Agent
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You want a subagent that can query your database, but you only want it to run SELECT statements.
            Tool restrictions alone can't enforce this — you need a hook.
          </p>

          <CodeBlock
            lang="yaml"
            filename=".claude/agents/db-query.md"
            code={`---
name: db-query
description: Runs read-only database queries for analysis
tools:
  - Bash
  - Read
hooks:
  - name: read-only-db
    type: PreToolUse
---

# Database Query Agent

You run SQL queries to answer questions about the database.

## Rules

- You may ONLY run SELECT queries
- No INSERT, UPDATE, DELETE, DROP, ALTER, etc.
- No transaction statements (BEGIN, COMMIT, ROLLBACK)
- Use LIMIT clauses to avoid returning massive result sets

## Process

1. Understand the question
2. Read the schema (database/schema.sql)
3. Write a SELECT query
4. Run it with: psql -c "SELECT ..."
5. Format and explain the results`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Hook Script
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/read-only-db.sh"
            code={`#!/bin/bash
# PreToolUse hook: Only allow SELECT queries

TOOL_NAME="$1"
TOOL_PARAMS="$2"  # JSON string

# Only inspect Bash tool calls
if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0  # Allow
fi

# Extract the command from JSON params
COMMAND=$(echo "$TOOL_PARAMS" | jq -r '.command')

# Check if it's a psql command
if [[ "$COMMAND" =~ psql ]]; then
  # Extract the SQL (everything after -c)
  SQL=$(echo "$COMMAND" | sed -n 's/.*-c "\\(.*\)".*/\\1/p')

  # Check for forbidden keywords (case-insensitive)
  if echo "$SQL" | grep -iE "\\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|BEGIN|COMMIT)\\b"; then
    echo "ERROR: Only SELECT queries are allowed" >&2
    exit 1  # Block
  fi
fi

exit 0  # Allow`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Registering the Hook
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/hooks/hooks.yml"
            code={`hooks:
  - name: read-only-db
    type: PreToolUse
    script: .claude/hooks/read-only-db.sh
    description: Blocks non-SELECT database queries`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Hook Behavior
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  Hook receives tool name and parameters as JSON
                </>,
                <>
                  Hook inspects the operation and decides: allow (exit 0) or block (exit 1)
                </>,
                <>
                  If blocked, the subagent sees an error and can try a different approach
                </>,
                <>
                  If allowed, the operation executes normally
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="warning" title="Hooks Are Security Boundaries">
            PreToolUse hooks are your last line of defense. Use them for:
            <div className="mt-2">
              {bullet(
                [
                  'Enforcing operation restrictions (SELECT-only queries)',
                  'Preventing access to sensitive files',
                  'Validating inputs before execution',
                  'Logging operations for audit trails',
                ],
                '#d29922'
              )}
            </div>
          </Callout>
        </section>

        {/* SCOPE */}
        <section id="scope">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Project vs User Scope
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Subagents can be project-specific or user-level. Choose the right scope based on how
            specialized the agent needs to be.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Project Agents (.claude/agents/)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Stored in project repo</strong> — Versioned with code
                </>,
                <>
                  <strong className="text-[#e6edf3]">Shared with team</strong> — Everyone gets the same agents
                </>,
                <>
                  <strong className="text-[#e6edf3]">Project-specific knowledge</strong> — Understands your
                  architecture, conventions, domain
                </>,
                <>
                  <strong className="text-[#e6edf3]">Examples:</strong> Project-specific test writer,
                  API documentation generator, migration assistant
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            User Agents (~/.claude/agents/)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Stored in your home directory</strong> — Not in any repo
                </>,
                <>
                  <strong className="text-[#e6edf3]">Personal to you</strong> — Available in all projects
                </>,
                <>
                  <strong className="text-[#e6edf3]">Generic capabilities</strong> — Language-specific,
                  framework-agnostic
                </>,
                <>
                  <strong className="text-[#e6edf3]">Examples:</strong> General code reviewer,
                  commit message generator, refactoring assistant
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Name Collision: Project Overrides User
          </h3>
          <CodeBlock
            code={`# If both exist:
.claude/agents/code-reviewer.md        # Project
~/.claude/agents/code-reviewer.md      # User

# Running /agent code-reviewer uses the PROJECT version
# User version is ignored

# To use user version, temporarily rename or delete project version`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Decision Matrix
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Use Project Agents For',
                items: [
                  'Project-specific specialists (e.g., "TaskForge test writer")',
                  'Domain knowledge (e.g., "Finance calculation reviewer")',
                  'Team standards enforcement',
                  'Integration with project tooling',
                ],
                color: '#3fb950',
              },
              {
                title: 'Use User Agents For',
                items: [
                  'Generic capabilities (e.g., "React code reviewer")',
                  'Personal productivity tools (e.g., "Commit message writer")',
                  'Cross-project patterns (e.g., "Security auditor")',
                  'Learning/exploration agents',
                ],
                color: '#58a6ff',
              },
            ].map((group, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 font-semibold" style={{ color: group.color }}>
                  {group.title}
                </div>
                <div className="space-y-1">
                  {group.items.map((item, j) => (
                    <div key={j} className="flex items-baseline gap-2">
                      <span style={{ color: group.color }}>›</span>
                      <span className="text-[13px] text-[#c9d1d9]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Callout type="info" title="Start with User, Move to Project">
            Create agents in your user directory first to experiment. Once they're stable and useful
            for the team, move them to the project and commit them.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Build Three Subagents for TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's create three specialized subagents: a code reviewer, test writer, and documentation generator.
          </p>

          <AppSelector />

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Agent 1: Code Reviewer (Read-Only)
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  code: `cd taskforge-tutorial/nextjs
mkdir -p .claude/agents
claude`,
                },
                fastapi: {
                  code: `cd taskforge-tutorial/fastapi
mkdir -p .claude/agents
claude`,
                },
              }}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> /agents

# Select: Create new agent
# Name: code-reviewer
# Scope: Project
# Method: Generate with Claude

What should this agent do?

Review code for readability, performance, security, and best practices.
Focus on React/Next.js patterns. Output should list issues by severity
and include specific recommendations with code examples.

Which tools should it have?

Read, Glob, Grep (read-only)`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Claude generates <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">.claude/agents/code-reviewer.md</code>.
              Review the system prompt and adjust as needed.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Agent 2: Test Writer
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> /agents

# Select: Create new agent
# Name: test-writer
# Scope: Project
# Method: Generate with Claude

What should this agent do?

Write comprehensive unit tests for untested code. Read existing tests
to match the project's testing style (Vitest, React Testing Library).
Run tests after writing to verify they pass. Focus on behavior, not
implementation details.

Which tools should it have?

Read, Write, Bash, Glob`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              After generation, add memory instructions so the agent learns testing patterns over time.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Agent 3: Doc Generator
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> /agents

# Select: Create new agent
# Name: doc-generator
# Scope: Project
# Method: Generate with Claude

What should this agent do?

Generate and update documentation. Read code to extract API signatures,
component props, and usage examples. Write README files, API docs, and
inline JSDoc comments. Keep docs in sync with code changes.

Which tools should it have?

Read, Write, Glob, Grep`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Test Your Agents
            </h3>
            <CodeBlock
              lang="text"
              filename="Try each agent"
              code={`# Code review
> /agent code-reviewer Review src/components/TaskList.tsx

# Write tests
> /agent test-writer Write tests for src/hooks/useFilterState.ts

# Generate docs
> /agent doc-generator Update README with current feature set`}
            />
          </div>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Create a Review Subagent
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Think about your most common review task (code review, security audit, accessibility check).
              Create a specialized subagent for it.
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Define what it should check for',
                  'Determine which tools it needs',
                  'Write a clear system prompt with examples',
                  'Add memory instructions for learning',
                  'Test it on 3 different files',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Build a Read-Only Exploration Agent
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create an agent that helps you understand unfamiliar code:
            </p>
            <CodeBlock
              lang="yaml"
              filename="Suggested structure"
              code={`---
name: code-explorer
tools: [Read, Glob, Grep]
---

You help developers understand unfamiliar code by:
1. Mapping file structure and key modules
2. Tracing data flows from input to output
3. Identifying dependencies and integration points
4. Explaining architectural patterns`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Use it to explore a part of TaskForge you haven't touched yet.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: User-Level Agent
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a user-level agent (in <code className="rounded bg-[#161b22] px-1 py-0.5 text-[13px]">~/.claude/agents/</code>)
              that you'll use across all projects.
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Ideas: commit message generator, refactoring assistant, performance analyzer',
                  'Make it language/framework-agnostic',
                  'Test it on 2 different projects',
                  'Refine based on what is useful',
                ],
                '#3fb950'
              )}
            </div>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now know how to create specialized subagents with their own contexts, tool restrictions,
            and memory. Subagents keep your main session clean and delegate work to focused specialists.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 14 — Supervisor Architectures
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll build multi-stage development pipelines with specialized
              subagents and quality gates. Learn to orchestrate complex workflows where agents hand
              off work to each other, with validation between stages.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Supervisor pattern, stage-based
              pipelines, quality gates, agent handoff, validation hooks, error recovery.
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-2 border-t border-[#21262d] pt-5">
          <div className="text-[13px] text-[#8b949e]">
            <strong className="text-[#e6edf3]">
              Claude Code Tutorial Series
            </strong>{' '}
            — Lumenalta Learning Path
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#484f58]">Tutorial {meta.id} of {tutorials.length}</span>
            <button
              onClick={() => onSelectTutorial(14)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Supervisor Architectures →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
