'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[4] // Tutorial 5 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'rules', short: 'Rules' },
  { id: 'commands', short: 'Slash Commands' },
  { id: 'skills', short: 'Skills' },
  { id: 'hooks', short: 'Hooks' },
  { id: 'decision-framework', short: 'Decision Framework' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial5Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial5({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial5Props) {
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
            Rules, Commands, Skills & Hooks
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
            Claude Code's power comes from four extensibility building blocks that let you customize
            behavior, save time, add capabilities, and automate workflows. Understanding when to use
            each is the difference between{' '}
            <strong className="text-[#e6edf3]">productive Claude Code usage</strong> and fighting the tool.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3">
            {[
              { icon: '📜', label: 'Rules', desc: 'Persistent behavioral constraints', color: '#3fb950' },
              { icon: '⚡', label: 'Commands', desc: 'Reusable prompt shortcuts', color: '#58a6ff' },
              { icon: '🎯', label: 'Skills', desc: 'Auto-loaded knowledge packages', color: '#d29922' },
              { icon: '🪝', label: 'Hooks', desc: 'Lifecycle automation', color: '#f85149' },
            ].map((block, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4"
                style={{ borderColor: `${block.color}50` }}
              >
                <div className="mb-2 text-2xl">{block.icon}</div>
                <div className="mb-1 text-[15px] font-semibold text-[#e6edf3]">
                  {block.label}
                </div>
                <div className="text-[12px] leading-snug text-[#8b949e]">
                  {block.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Rules, slash commands, skills, hooks, and when to use each',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-4 completed, TaskForge project set up',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, text editor',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Full .claude/ configuration for TaskForge',
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

          <Callout type="info" title="All Four Work Together">
            These aren't competing approaches — they complement each other. A well-configured
            project uses all four: rules enforce standards, commands save typing, skills add
            capabilities, and hooks automate workflows.
          </Callout>
        </section>

        {/* RULES */}
        <section id="rules">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Rules — Persistent Behavioral Constraints
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Rules are <strong className="text-[#e6edf3]">constraints Claude always follows</strong>.
            They're perfect for "always" and "never" statements: always use TypeScript strict mode,
            never commit directly to main, always run tests before completing a task.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Where Rules Live
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Project rules</strong> — <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.claude/rules/*.md</code> files specific to this codebase
                </>,
                <>
                  <strong className="text-[#e6edf3]">User rules</strong> — <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">~/.claude/rules/*.md</code> global rules for all your projects
                </>,
                <>
                  <strong className="text-[#e6edf3]">Inline rules</strong> — Rules section in CLAUDE.md (from Tutorial 2)
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating a Rule File
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/rules/typescript-strict.md"
            code={`# TypeScript Strict Mode

**Always** use TypeScript strict mode in this project.

## Required tsconfig settings
- \`"strict": true\`
- \`"noImplicitAny": true\`
- \`"strictNullChecks": true\`

## When writing code
- Never use \`any\` — use \`unknown\` if type is truly unknown
- Always provide explicit return types for functions
- Handle null/undefined cases explicitly

## Verification
Before completing any task involving TypeScript:
- Run \`npm run typecheck\`
- Fix all type errors
- Do not suppress with \`@ts-ignore\` unless absolutely necessary (and document why)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Rules for TaskForge
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Git Workflow',
                file: '.claude/rules/git-workflow.md',
                content: 'Never commit to main. Always create feature branches. Run tests before committing.',
              },
              {
                title: 'Testing Requirements',
                file: '.claude/rules/testing.md',
                content: 'All API routes must have tests. Test both success and error cases. Maintain 80% coverage minimum.',
              },
              {
                title: 'Code Style',
                file: '.claude/rules/code-style.md',
                content: 'Use functional components with hooks. Prefer named exports over default. Max file length 200 lines.',
              },
            ].map((rule, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1.5 text-[13px] font-mono text-[#3fb950]">
                  {rule.file}
                </div>
                <div className="mb-1 text-[14px] font-semibold text-[#e6edf3]">
                  {rule.title}
                </div>
                <div className="text-[12px] text-[#8b949e]">{rule.content}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Project vs User Rules
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Choose the right scope for your rules:
          </p>
          <CodeBlock
            lang="text"
            filename="Decision guide"
            code={`Project rules (.claude/rules/):
- Team conventions (shared across all developers)
- Project-specific architecture decisions
- Framework/library usage patterns
- Checked into Git for consistency

User rules (~/.claude/rules/):
- Personal preferences (coding style, formatting)
- Security policies you always follow
- Productivity shortcuts specific to your workflow
- NOT shared with the team`}
          />

          <Callout type="tip" title="When to Use Standalone Rule Files vs CLAUDE.md">
            Use standalone <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.claude/rules/*.md</code> files
            when rules are detailed, numerous, or subject to frequent updates. Use the CLAUDE.md
            Rules section for short, stable conventions. Both are loaded every session.
          </Callout>
        </section>

        {/* SLASH COMMANDS */}
        <section id="commands">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Slash Commands — Reusable Prompts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Slash commands are <strong className="text-[#e6edf3]">saved prompts you invoke with /</strong>.
            They save you from typing the same instructions repeatedly and ensure consistency across
            the team.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating a Command
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/commands/review-pr.md"
            code={`Review the current branch's changes for a pull request.

## Steps
1. Run \`git diff main...HEAD\` to see all changes
2. Check for:
   - Code quality and readability
   - Test coverage for new code
   - Security issues (exposed secrets, SQL injection, etc.)
   - Performance concerns
   - Breaking changes
3. Generate a PR review comment with:
   - Summary of changes
   - Issues found (if any)
   - Suggestions for improvement
   - Approval status (approve, request changes, comment)

Format output as markdown suitable for GitHub PR comment.`}
          />

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Now you can run <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/review-pr</code> anytime
            instead of typing those instructions.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Parameterized Commands
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">$ARGUMENTS</code> to
            accept input:
          </p>
          <CodeBlock
            lang="markdown"
            filename=".claude/commands/create-component.md"
            code={`Create a new React component following TaskForge conventions.

Component name: $ARGUMENTS

## Steps
1. Create \`src/components/$ARGUMENTS.tsx\`
2. Use functional component with TypeScript
3. Include proper PropTypes interface
4. Add basic styling with Tailwind
5. Export as named export
6. Create \`src/components/__tests__/$ARGUMENTS.test.tsx\`
7. Add basic render test
8. Run \`npm run test $ARGUMENTS\` to verify

Template:
\`\`\`tsx
interface \$ARGUMENTSProps {
  // TODO: Add props
}

export function \$ARGUMENTS({ }: \$ARGUMENTSProps) {
  return (
    <div>
      {/* TODO: Implement */}
    </div>
  )
}
\`\`\``}
          />

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Usage: <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/create-component TaskCard</code>
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Useful Commands to Build
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">/run-tests</strong> — Run full test suite with coverage report
                </>,
                <>
                  <strong className="text-[#e6edf3]">/review-pr</strong> — Analyze changes for PR review
                </>,
                <>
                  <strong className="text-[#e6edf3]">/create-migration</strong> — Generate database migration (with param for description)
                </>,
                <>
                  <strong className="text-[#e6edf3]">/update-docs</strong> — Regenerate documentation after code changes
                </>,
                <>
                  <strong className="text-[#e6edf3]">/today</strong> — Show today's date in YYYY-MM-DD format (useful for changelogs)
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Naming Conventions
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Good command names are:
          </p>
          <div className="my-3">
            {bullet(
              [
                'Short and memorable (easy to type)',
                'Verb-based (review, create, update, fix)',
                'Scoped when needed (test-unit, test-integration)',
                'Lowercase with hyphens (not camelCase or snake_case)',
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="warning" title="Commands vs Rules">
            Rules are <strong>always active</strong> (Claude follows them automatically). Commands
            require <strong>manual invocation</strong> (you type /command-name). Use rules for
            constraints, commands for actions.
          </Callout>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Skills — Knowledge Packages
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Skills are <strong className="text-[#e6edf3]">knowledge bundles Claude auto-detects and loads</strong>.
            Unlike commands (which you invoke manually) or rules (which are always active), skills
            are context-aware: Claude loads them when relevant based on the skill's description.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            SKILL.md Anatomy
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/skills/database-migration/SKILL.md"
            code={`---
name: Database Migration
description: Create and manage database migrations for TaskForge using Alembic (FastAPI) or Prisma (Next.js)
allowed-tools:
  - Read
  - Write
  - Bash
---

# Database Migration Skill

This skill helps create and apply database migrations for TaskForge.

## When to use this skill
- Adding/modifying database tables
- Changing column types or constraints
- Creating indexes
- Seeding data

## FastAPI Track (Alembic)
\`\`\`bash
# Create migration
alembic revision --autogenerate -m "description"

# Review generated migration in alembic/versions/
# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
\`\`\`

## Next.js Track (Prisma)
\`\`\`bash
# Update schema.prisma first
# Generate migration
npx prisma migrate dev --name description

# Apply in production
npx prisma migrate deploy
\`\`\`

## Verification
- Run migrations on a test database first
- Verify data integrity after migration
- Test rollback procedure
- Update CLAUDE.md if schema changes significantly`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            YAML Frontmatter Fields
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">name</strong> — Display name for the skill
                </>,
                <>
                  <strong className="text-[#e6edf3]">description</strong> — What the skill does
                  (Claude uses this to decide when to load it)
                </>,
                <>
                  <strong className="text-[#e6edf3]">allowed-tools</strong> — Which Claude Code
                  tools this skill can use (Read, Write, Edit, Bash, Glob, Grep)
                </>,
              ],
              '#d29922'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Skills vs Commands vs Rules
          </h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#21262d]">
                  <th className="pb-2 pr-4 font-semibold text-[#e6edf3]">Aspect</th>
                  <th className="pb-2 pr-4 font-semibold text-[#3fb950]">Rules</th>
                  <th className="pb-2 pr-4 font-semibold text-[#58a6ff]">Commands</th>
                  <th className="pb-2 font-semibold text-[#d29922]">Skills</th>
                </tr>
              </thead>
              <tbody className="text-[#c9d1d9]">
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 text-[#8b949e]">When loaded</td>
                  <td className="py-2 pr-4">Always (every session)</td>
                  <td className="py-2 pr-4">When you type /cmd</td>
                  <td className="py-2">Auto (when relevant)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 text-[#8b949e]">Use case</td>
                  <td className="py-2 pr-4">Constraints</td>
                  <td className="py-2 pr-4">Actions</td>
                  <td className="py-2">Knowledge + code</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 text-[#8b949e]">Scope</td>
                  <td className="py-2 pr-4">Project or user</td>
                  <td className="py-2 pr-4">Project or user</td>
                  <td className="py-2">Project only</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#8b949e]">Works where</td>
                  <td className="py-2 pr-4">Claude Code only</td>
                  <td className="py-2 pr-4">Claude Code only</td>
                  <td className="py-2">Code, Desktop, Web</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Skills for TaskForge
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Testing Skill',
                path: '.claude/skills/testing/',
                desc: 'Auto-loads when writing tests. Knows Jest/pytest patterns, coverage requirements, mocking strategies.',
              },
              {
                title: 'API Design Skill',
                path: '.claude/skills/api-design/',
                desc: 'Auto-loads when creating routes. Enforces REST conventions, error handling, validation patterns.',
              },
              {
                title: 'Performance Skill',
                path: '.claude/skills/performance/',
                desc: 'Auto-loads when optimizing. Knows profiling tools, caching strategies, query optimization.',
              },
            ].map((skill, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1.5 text-[13px] font-mono text-[#d29922]">
                  {skill.path}SKILL.md
                </div>
                <div className="mb-1 text-[14px] font-semibold text-[#e6edf3]">
                  {skill.title}
                </div>
                <div className="text-[12px] text-[#8b949e]">{skill.desc}</div>
              </div>
            ))}
          </div>

          <Callout type="info" title="Skills Work Everywhere">
            Unlike rules and commands (Claude Code only), skills also work in{' '}
            <strong>claude.ai and Claude Desktop</strong>. Write them once, use them across all
            Claude interfaces. The skill just needs to be in your project's{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.claude/skills/</code> directory.
          </Callout>
        </section>

        {/* HOOKS */}
        <section id="hooks">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hooks — Lifecycle Automation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Hooks are <strong className="text-[#e6edf3]">shell scripts that fire at specific lifecycle events</strong>.
            They provide deterministic automation when LLM variance is unacceptable. Use them for
            notifications, logging, auto-formatting, validation gates, and workflow automation.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Hook Events
          </h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#21262d]">
                  <th className="pb-2 pr-4 font-semibold text-[#e6edf3]">Event</th>
                  <th className="pb-2 font-semibold text-[#e6edf3]">When it fires</th>
                </tr>
              </thead>
              <tbody className="text-[#c9d1d9]">
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 font-mono text-[#f85149]">PreToolUse</td>
                  <td className="py-2">Before Claude uses any tool (Read, Write, Bash, etc.)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 font-mono text-[#f85149]">PostToolUse</td>
                  <td className="py-2">After a tool completes successfully</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 font-mono text-[#f85149]">Stop</td>
                  <td className="py-2">When Claude finishes a response and waits for input</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 font-mono text-[#f85149]">SubagentStop</td>
                  <td className="py-2">When a subagent (Tutorial 13) completes</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4 font-mono text-[#f85149]">Notification</td>
                  <td className="py-2">When Claude wants to notify you (custom trigger)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-[#f85149]">PreCompact</td>
                  <td className="py-2">Before context window compaction happens</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Exit Codes
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Hook scripts return exit codes to control behavior:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">0 (success)</strong> — Pass through, continue normally
                </>,
                <>
                  <strong className="text-[#e6edf3]">1 (error)</strong> — Report error to Claude, retry operation
                </>,
                <>
                  <strong className="text-[#e6edf3]">2 (block)</strong> — Block the operation entirely (PreToolUse only)
                </>,
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Desktop Notification Hook
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/notification.sh"
            code={`#!/bin/bash
# Fires on Notification event
# Sends desktop notification when Claude needs attention

# Read JSON from stdin (Claude passes event data)
EVENT_DATA=$(cat)

# Extract message from JSON
MESSAGE=$(echo "$EVENT_DATA" | jq -r '.message // "Claude Code notification"')

# Send notification (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
  osascript -e "display notification \\"$MESSAGE\\" with title \\"Claude Code\\""
# Linux
elif command -v notify-send &> /dev/null; then
  notify-send "Claude Code" "$MESSAGE"
fi

exit 0`}
          />

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Make it executable and configure:
          </p>
          <CodeBlock
            code={`chmod +x .claude/hooks/notification.sh

# Configure in settings.json or via /hooks command
claude
> /hooks`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Auto-Lint on Save
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/post-tool-use.sh"
            code={`#!/bin/bash
# Fires after any tool use
# Auto-runs linter when files are modified

EVENT_DATA=$(cat)
TOOL=$(echo "$EVENT_DATA" | jq -r '.tool')

# Only run on Write or Edit tools
if [[ "$TOOL" == "Write" || "$TOOL" == "Edit" ]]; then
  FILE=$(echo "$EVENT_DATA" | jq -r '.args.file_path // .args.filepath')

  # Only lint .ts, .tsx, .js, .jsx files
  if [[ "$FILE" =~ \\.(ts|tsx|js|jsx)$ ]]; then
    echo "Auto-linting $FILE..."
    npx eslint --fix "$FILE" 2>&1

    # Return 0 regardless (don't block on lint failures)
    # Claude will see the output and can fix issues
  fi
fi

exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Date Injection Hook
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Inject today's date into Claude's context (useful for changelogs, time-aware features):
          </p>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/pre-tool-use.sh"
            code={`#!/bin/bash
# Inject current date into context
# Only run once per session

STATE_FILE="/tmp/claude-date-injected-$$"

if [[ ! -f "$STATE_FILE" ]]; then
  DATE=$(date +"%Y-%m-%d")
  echo "📅 Today is $DATE" >&2
  touch "$STATE_FILE"
fi

exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Transcript Backup
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/stop.sh"
            code={`#!/bin/bash
# Fires when Claude stops and waits for input
# Backs up conversation transcript

BACKUP_DIR="$HOME/.claude-transcripts"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
SESSION_ID=$(echo "$EVENT_DATA" | jq -r '.session_id // "unknown"')

# Copy transcript (path varies by platform)
if [[ -f ".claude/transcript.json" ]]; then
  cp ".claude/transcript.json" "$BACKUP_DIR/transcript-$TIMESTAMP-$SESSION_ID.json"
fi

exit 0`}
          />

          <Callout type="warning" title="Hooks vs LLM Instructions">
            Use hooks when you need <strong>deterministic, guaranteed behavior</strong>. Use rules/skills
            when slight variance is acceptable. Example: "always lint after save" is a hook (must happen).
            "Prefer functional components" is a rule (Claude follows, but has judgment).
          </Callout>
        </section>

        {/* DECISION FRAMEWORK */}
        <section id="decision-framework">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Decision Framework — When to Use Which
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Choosing the right building block for each use case is critical. Here's how to decide:
          </p>

          <div className="my-5 grid gap-4">
            <div className="rounded-lg border border-[#3fb95050] bg-[#161b22] p-5">
              <div className="mb-2 text-[16px] font-bold text-[#3fb950]">
                📜 Use Rules When...
              </div>
              <div className="my-2">
                {bullet(
                  [
                    'You need a constraint Claude ALWAYS follows',
                    'It\'s an "always" or "never" statement',
                    'It applies to all code in the project (or all your projects)',
                    'Example: "never use any type," "always run tests before completing"',
                  ],
                  '#3fb950'
                )}
              </div>
            </div>

            <div className="rounded-lg border border-[#58a6ff50] bg-[#161b22] p-5">
              <div className="mb-2 text-[16px] font-bold text-[#58a6ff]">
                ⚡ Use Commands When...
              </div>
              <div className="my-2">
                {bullet(
                  [
                    'You repeat the same prompt frequently',
                    'It\'s an action you invoke manually (not automatic)',
                    'You want team consistency (everyone runs same command)',
                    'Example: "/review-pr," "/run-tests," "/create-component"',
                  ],
                  '#58a6ff'
                )}
              </div>
            </div>

            <div className="rounded-lg border border-[#d2992250] bg-[#161b22] p-5">
              <div className="mb-2 text-[16px] font-bold text-[#d29922]">
                🎯 Use Skills When...
              </div>
              <div className="my-2">
                {bullet(
                  [
                    'You need knowledge + code that Claude loads automatically',
                    'It\'s context-dependent (only relevant for certain tasks)',
                    'You want it to work in claude.ai, Desktop, and Code',
                    'Example: database migrations, testing patterns, API design',
                  ],
                  '#d29922'
                )}
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-5">
              <div className="mb-2 text-[16px] font-bold text-[#f85149]">
                🪝 Use Hooks When...
              </div>
              <div className="my-2">
                {bullet(
                  [
                    'You need deterministic, guaranteed automation',
                    'LLM variance is unacceptable (must happen every time)',
                    'You want to integrate external tools (notifications, logging)',
                    'Example: auto-lint on save, desktop notifications, transcript backup',
                  ],
                  '#f85149'
                )}
              </div>
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Decision Tree
          </h3>
          <CodeBlock
            lang="text"
            filename="Choose the right building block"
            code={`Start here:
├─ Is it a constraint Claude should ALWAYS follow?
│  └─ YES → Use a Rule
│
├─ Is it an action you manually trigger repeatedly?
│  └─ YES → Use a Command
│
├─ Is it knowledge Claude should auto-load when relevant?
│  └─ YES → Use a Skill
│
└─ Is it automation that MUST happen (no variance)?
   └─ YES → Use a Hook`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Real-World Examples
          </h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#21262d]">
                  <th className="pb-2 pr-4 font-semibold text-[#e6edf3]">Need</th>
                  <th className="pb-2 font-semibold text-[#e6edf3]">Solution</th>
                </tr>
              </thead>
              <tbody className="text-[#c9d1d9]">
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Enforce TypeScript strict mode</td>
                  <td className="py-2"><span className="text-[#3fb950]">Rule</span> (always)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Review PR before submitting</td>
                  <td className="py-2"><span className="text-[#58a6ff]">Command</span> (/review-pr)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Database migration patterns</td>
                  <td className="py-2"><span className="text-[#d29922]">Skill</span> (auto-loads)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Notify when task completes</td>
                  <td className="py-2"><span className="text-[#f85149]">Hook</span> (deterministic)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Never commit to main</td>
                  <td className="py-2"><span className="text-[#3fb950]">Rule</span> (constraint)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Create React component from template</td>
                  <td className="py-2"><span className="text-[#58a6ff]">Command</span> (/create-component)</td>
                </tr>
                <tr className="border-b border-[#21262d]">
                  <td className="py-2 pr-4">Testing best practices</td>
                  <td className="py-2"><span className="text-[#d29922]">Skill</span> (contextual knowledge)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Auto-lint on file save</td>
                  <td className="py-2"><span className="text-[#f85149]">Hook</span> (PostToolUse)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Build All Four for TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's build a complete <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.claude/</code> configuration
            for TaskForge with rules, commands, skills, and hooks.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create the Directory Structure
            </h3>
            <CodeBlock
              code={`cd taskforge-tutorial/nextjs  # or /fastapi
mkdir -p .claude/{rules,commands,skills,hooks}
chmod +x .claude/hooks  # Make hooks directory executable`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Create a Rule
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create .claude/rules/git-workflow.md with these rules:
  - Never commit directly to main branch
  - Always create feature branches with descriptive names
  - Run tests before committing
  - Write meaningful commit messages (not "fix" or "update")`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Create a Command
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create .claude/commands/run-tests.md that:
  1. Runs the full test suite with coverage
  2. Shows coverage report
  3. Fails if coverage is below 80%
  4. Reports results in a clear format`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Create a Skill
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create .claude/skills/task-management/SKILL.md with:
  - YAML frontmatter (name, description, allowed-tools)
  - Knowledge about TaskForge's task model (status, priority, assignee)
  - Common task operations (create, update, filter, search)
  - Best practices for task workflows`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Create a Hook
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create .claude/hooks/notification.sh that sends a desktop notification
  when Claude finishes a task. Make it work on both macOS and Linux.
  Use the Notification event.`}
            />
            <CodeBlock
              code={`chmod +x .claude/hooks/notification.sh

# Test it
.claude/hooks/notification.sh <<EOF
{"message": "Test notification"}
EOF`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Verify Configuration
            </h3>
            <CodeBlock
              code={`# Start a new Claude session to load the config
claude

# Verify rules loaded
> What rules are configured for this project?

# Test command
> /run-tests

# Verify skill loaded
> I need to create a new task. What's the task model?

# Configure hook
> /hooks`}
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
              Exercise 1: Build a Custom Command
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/create-api-route</code> command
              that generates a new API route following your project's conventions:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Takes route name as $ARGUMENTS',
                  'Creates route file in correct location',
                  'Includes proper types/validation',
                  'Adds basic test file',
                  'Updates route index if needed',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Create a Rule That Prevents a Mistake
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Think of a mistake you or your team makes repeatedly. Create a rule to prevent it:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Identify the pattern (e.g., "forgetting to add error handling")',
                  'Write it as a clear constraint',
                  'Add verification steps',
                  'Test it by asking Claude to do the thing that usually goes wrong',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Set Up a Notification Hook
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a hook that notifies you when a long-running task completes:
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Create .claude/hooks/stop.sh
2. Detect when Claude has been working for >5 minutes
3. Send a desktop notification
4. Include summary of what was done
5. Test by running a multi-step task`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 4: Build a Skill for Your Domain
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a skill that captures domain knowledge specific to your project:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Choose a domain area (e.g., authentication, data processing, UI patterns)',
                  'Document the patterns and best practices',
                  'Include code examples',
                  'Test by asking Claude to implement something in that domain',
                ],
                '#d29922'
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
            You now understand Claude Code's four building blocks and when to use each. Rules enforce
            constraints, commands save time, skills add knowledge, and hooks automate workflows. Combined,
            they make Claude Code dramatically more productive.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 6 — Prompt Engineering for Claude Code
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn how to write effective prompts for an agentic tool.
              We'll cover the @ file reference system, structured prompts, exploratory vs implementation
              prompts, and how to use types and tests as guardrails.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> @ references, prompt structure,
              acceptance criteria, iterating on prompts, safety nets, anti-patterns.
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
              onClick={() => onSelectTutorial(6)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Prompt Engineering →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
