'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[5] // Tutorial 6 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'file-references', short: '@ File References' },
  { id: 'prompt-structure', short: 'Prompt Structure' },
  { id: 'exploratory-vs-implementation', short: 'Exploratory vs Implementation' },
  { id: 'types-as-guardrails', short: 'Types as Guardrails' },
  { id: 'safety-nets', short: 'Building Safety Nets' },
  { id: 'iterating', short: 'Iterating on Prompts' },
  { id: 'prompt-libraries', short: 'Prompt Libraries' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'anti-patterns', short: 'Anti-Patterns' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial6Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial6({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial6Props) {
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
    <div className="min-h-screen bg-[#010409] font-sans text-[#c9d1d9] [&_code:not(pre_code)]:bg-[#161b22] [&_code:not(pre_code)]:text-[#e6edf3] [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[0.9em]">
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
            Prompt Engineering for Claude Code
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
            Prompting for <strong className="text-[#e6edf3]">agentic tools</strong> like Claude Code
            is fundamentally different from prompting chat models. Chat models respond once and wait.
            Agentic tools read files, run commands, write code, and iterate — they're more like a
            junior developer than a search engine.
          </p>

          <div className="my-5 grid grid-cols-2 gap-4">
            {[
              {
                title: 'Chat Prompting',
                items: ['One-shot responses', 'No file access', 'Explain or generate', 'No verification'],
                color: '#8b949e',
              },
              {
                title: 'Agentic Prompting',
                items: ['Multi-step execution', 'Read/write files', 'Implement & verify', 'Iterative refinement'],
                color: '#3fb950',
              },
            ].map((col, i) => (
              <div
                key={i}
                className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-3 text-[15px] font-semibold text-[#e6edf3]">
                  {col.title}
                </div>
                {bullet(col.items, col.color)}
              </div>
            ))}
          </div>

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This tutorial teaches you how to write prompts that leverage Claude Code's agentic
            capabilities: file references, structured goals, safety nets, and iterative refinement.
          </p>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: '@ references, Goal+Constraints+Criteria pattern, types as guardrails, prompt iteration',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-5 completed, TaskForge project, basic TypeScript/Python',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code, TaskForge project, linter + type checker',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Prompt patterns you can reuse, bad prompts refactored into good ones',
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

          <Callout type="info" title="Why This Matters">
            Good prompts reduce back-and-forth, prevent misunderstandings, and make Claude Code's
            output more reliable. They're the difference between "it sort of works" and "it's
            production-ready."
          </Callout>
        </section>

        {/* FILE REFERENCES */}
        <section id="file-references">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The @ File Reference System
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code's <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">@filename</code> syntax
            tells Claude to read files before responding. This is critical for agentic workflows because
            Claude needs context to make good decisions.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Basic File References
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt with @ references"
            code={`> @src/components/TaskList.tsx
  @src/hooks/useTasks.ts

  Add error handling for failed task fetches. Show an error message
  to the user if the API call fails.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Directory References
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">@directory/</code> to
            reference all files in a directory:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt with directory reference"
            code={`> @src/components/

  Review all components for consistent prop naming. Ensure:
  - Boolean props use 'is' or 'has' prefix
  - Event handlers use 'on' prefix
  - Data props are nouns (not verbs)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Use File References
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Modifications</strong> — Always reference the file
                  you want to modify
                </>,
                <>
                  <strong className="text-[#e6edf3]">Context</strong> — Reference related files (types,
                  tests, dependencies)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Patterns</strong> — Reference example files to
                  maintain consistency
                </>,
                <>
                  <strong className="text-[#e6edf3]">Reviews</strong> — Reference files to check for
                  issues or improvements
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Before/After Example
          </h3>
          <div className="my-4 grid grid-cols-2 gap-3">
            <div className="rounded-[10px] border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#f85149]">
                ❌ Bad: No References
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Add a loading state to the task list component.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Claude has to guess which file, which component, and what loading pattern to use.
              </div>
            </div>
            <div className="rounded-[10px] border border-[#3fb95050] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                ✅ Good: Explicit References
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> @src/components/TaskList.tsx
  @src/components/LoadingSpinner.tsx

  Add loading state using LoadingSpinner component.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Claude knows exactly which file to modify and which pattern to follow.
              </div>
            </div>
          </div>

          <Callout type="tip" title="Pro Tip: Reference Tests">
            Always reference test files when modifying code. Claude will update tests to match
            the new implementation, preventing broken test suites.
          </Callout>
        </section>

        {/* PROMPT STRUCTURE */}
        <section id="prompt-structure">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Prompt Structure: Goal + Constraints + Acceptance Criteria
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The most reliable prompt structure for agentic tools follows this pattern:
          </p>

          <div className="my-5 rounded-[10px] border border-[#21262d] bg-[#161b22] p-5">
            <div className="grid gap-4">
              {[
                {
                  num: '1',
                  label: 'Goal',
                  desc: 'What you want to achieve (the outcome)',
                  color: '#3fb950',
                },
                {
                  num: '2',
                  label: 'Constraints',
                  desc: 'Limitations, requirements, patterns to follow',
                  color: '#58a6ff',
                },
                {
                  num: '3',
                  label: 'Acceptance Criteria',
                  desc: 'How to verify success (testable conditions)',
                  color: '#d29922',
                },
              ].map((phase) => (
                <div key={phase.num} className="flex items-start gap-3">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: phase.color }}
                  >
                    {phase.num}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#e6edf3]">
                      {phase.label}
                    </div>
                    <div className="text-[13px] text-[#8b949e]">{phase.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Well-Structured Prompt
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> @src/components/TaskList.tsx
  @src/types/task.ts

  GOAL:
  Add the ability to archive completed tasks so users can declutter
  their active task list without losing task history.

  CONSTRAINTS:
  - Use existing Task type, add 'archived' boolean field
  - Follow the pattern from StatusFilter.tsx for UI
  - Archive action should be reversible (unarchive)
  - Don't delete tasks from database

  ACCEPTANCE CRITERIA:
  - [ ] Add 'archived' field to Task type
  - [ ] Add archive/unarchive buttons to task actions
  - [ ] Filter out archived tasks from default view
  - [ ] Add "Show Archived" toggle to header
  - [ ] API endpoints for archive/unarchive
  - [ ] Tests for archive logic
  - [ ] npm run typecheck passes
  - [ ] npm test passes`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Before/After: Vague vs Structured
          </h3>
          <div className="my-4 grid gap-3">
            <div className="rounded-[10px] border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#f85149]">
                ❌ Bad: Vague Goal, No Criteria
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Make the task list better. It should be easier to use and look nicer.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Claude has no idea what "better" means. This will result in random changes.
              </div>
            </div>
            <div className="rounded-[10px] border border-[#3fb95050] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                ✅ Good: Clear Goal, Constraints, Criteria
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> @src/components/TaskList.tsx

  GOAL:
  Improve task list performance for projects with 100+ tasks.

  CONSTRAINTS:
  - Virtualize the list (use react-window)
  - Don't change existing sort/filter behavior
  - Maintain current styling

  ACCEPTANCE CRITERIA:
  - [ ] List renders smoothly with 1000+ tasks
  - [ ] Scroll position persists on re-render
  - [ ] All existing tests pass
  - [ ] No visual regressions`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Clear goal (performance), specific constraints (react-window, no behavior changes),
                verifiable criteria (smooth scrolling, tests pass).
              </div>
            </div>
          </div>

          <Callout type="info" title="Why This Works">
            This structure mimics how you'd assign work to a junior developer. Goal provides
            motivation, constraints prevent bad solutions, criteria enable verification without
            you inspecting every line of code.
          </Callout>
        </section>

        {/* EXPLORATORY VS IMPLEMENTATION */}
        <section id="exploratory-vs-implementation">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exploratory vs Implementation Prompts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Not all prompts should be prescriptive. Sometimes you want Claude to explore options,
            other times you want precise execution. Use the right style for the job.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Exploratory Prompts (Open-Ended)
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Use when you're unsure of the best approach:
          </p>
          <CodeBlock
            lang="text"
            filename="Exploratory prompt"
            code={`> @src/components/TaskList.tsx
  @docs/system-architecture.md

  I want to add real-time task updates so changes from other users
  appear immediately. What are the trade-offs between:
  - WebSockets
  - Server-sent events (SSE)
  - Polling with SWR

  Consider: our current stack (Next.js + FastAPI), expected user
  count (< 1000 concurrent), and deployment constraints (no Redis
  currently, but could add).

  Propose 2-3 options with pros/cons for each.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Implementation Prompts (Prescriptive)
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Use when you know what you want:
          </p>
          <CodeBlock
            lang="text"
            filename="Implementation prompt"
            code={`> @src/components/TaskList.tsx
  @src/hooks/useTasks.ts

  Implement real-time task updates using Server-Sent Events (SSE).

  APPROACH:
  - Add /api/tasks/stream endpoint in FastAPI
  - Use EventSource in React to consume stream
  - Merge streamed updates into existing SWR cache
  - Handle reconnection on connection drop

  CONSTRAINTS:
  - Don't break existing polling fallback
  - Add feature flag: ENABLE_REALTIME env var
  - Handle SSE not supported (old browsers)

  ACCEPTANCE CRITERIA:
  - [ ] SSE endpoint streams task updates
  - [ ] React receives and applies updates
  - [ ] Fallback to polling if SSE unavailable
  - [ ] Tests for SSE connection + reconnection
  - [ ] Works in Chrome, Firefox, Safari`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Use Each
          </h3>
          <div className="my-4 grid grid-cols-2 gap-3">
            <div className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#58a6ff]">
                Exploratory (Open-Ended)
              </div>
              {bullet(
                [
                  'Architecture decisions',
                  'Technology selection',
                  'Refactoring approaches',
                  'Performance optimization',
                  'Design pattern choices',
                ],
                '#58a6ff'
              )}
            </div>
            <div className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                Implementation (Prescriptive)
              </div>
              {bullet(
                [
                  'Feature implementation',
                  'Bug fixes',
                  'Code formatting/refactoring',
                  'Test writing',
                  'Documentation updates',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <Callout type="tip" title="Two-Phase Pattern">
            For complex work, use exploratory first, then implementation:
            <div className="mt-2">
              {bullet(
                [
                  'Phase 1: "What are the options for solving X?"',
                  'Phase 2: "Implement Option B using approach Y"',
                ],
                '#d29922'
              )}
            </div>
            This mirrors the Define → Plan → Iterate workflow.
          </Callout>
        </section>

        {/* TYPES AS GUARDRAILS */}
        <section id="types-as-guardrails">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Using Types as Guardrails
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Type systems (TypeScript, Pydantic, etc.) are <strong className="text-[#e6edf3]">automatic
            prompt validators</strong>. They catch mistakes Claude makes without you having to specify
            every detail.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            TypeScript as a Safety Net
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt leveraging types"
            code={`> @src/types/task.ts
  @src/components/TaskList.tsx

  Add a 'priority' field to tasks (low, medium, high, urgent).

  CONSTRAINTS:
  - Update Task type in task.ts
  - TypeScript strict mode must pass
  - All components using Task type should update automatically

  Run 'npm run typecheck' after changes. Fix any type errors.`}
          />

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When Claude adds the <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">priority</code> field
            to the Task type, TypeScript will flag every place that needs updating. Claude can then
            fix those errors systematically.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Pydantic for Python Validation
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt for Python with Pydantic"
            code={`> @src/models/task.py
  @src/api/routes.py

  Add email notifications when task status changes.

  CONSTRAINTS:
  - Add 'notifyEmail' field to TaskCreate Pydantic model
  - Validate email format (use EmailStr from pydantic)
  - Add optional 'notificationPreferences' nested model

  Run 'python -m pytest' after changes. Pydantic validation
  should catch invalid emails automatically.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Type-Driven Development Loop
          </h3>
          <div className="my-5 rounded-[10px] border border-[#21262d] bg-[#161b22] p-5">
            <div className="grid gap-3">
              {[
                {
                  step: '1',
                  label: 'Update types',
                  desc: 'Change the core type definition',
                },
                {
                  step: '2',
                  label: 'Run type checker',
                  desc: 'Find all broken references',
                },
                {
                  step: '3',
                  label: 'Fix type errors',
                  desc: 'Update code to match new types',
                },
                {
                  step: '4',
                  label: 'Verify',
                  desc: 'Type checker passes, tests pass',
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#58a6ff] text-xs font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#e6edf3]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#8b949e]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Before/After: With and Without Types
          </h3>
          <div className="my-4 grid gap-3">
            <div className="rounded-[10px] border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#f85149]">
                ❌ Without Types
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Add a 'tags' field to tasks. Make sure to update:
  - The TaskList component
  - The TaskForm component
  - The TaskDetail component
  - The API endpoint
  - The database migration
  - All places tasks are created or displayed`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                You have to list every affected location. Miss one and it breaks silently.
              </div>
            </div>
            <div className="rounded-[10px] border border-[#3fb95050] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                ✅ With Types
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> @src/types/task.ts

  Add a 'tags' field to Task type (string array).

  Run 'npm run typecheck' to find all places that need updating.
  Fix each type error.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                TypeScript finds affected locations automatically. Claude fixes them systematically.
              </div>
            </div>
          </div>

          <Callout type="info" title="Types Reduce Prompt Complexity">
            Strong typing means you can write shorter, simpler prompts. The type system acts as
            implicit constraints, catching errors that would otherwise require explicit instructions.
          </Callout>
        </section>

        {/* SAFETY NETS */}
        <section id="safety-nets">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Building Safety Nets: Lint, Tests, Types
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The best prompts leverage <strong className="text-[#e6edf3]">automated verification</strong>.
            Linters, type checkers, and test suites act as safety nets that catch mistakes without
            manual inspection.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Three-Layer Safety Net
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: '1. Linter (Syntax & Style)',
                tool: 'ESLint, Prettier, Ruff',
                catches: 'Unused variables, formatting issues, basic mistakes',
                color: '#3fb950',
              },
              {
                title: '2. Type Checker (Correctness)',
                tool: 'TypeScript, mypy, Pydantic',
                catches: 'Type mismatches, missing properties, invalid operations',
                color: '#58a6ff',
              },
              {
                title: '3. Tests (Behavior)',
                tool: 'Jest, pytest, Vitest',
                catches: 'Logic errors, broken features, regressions',
                color: '#d29922',
              },
            ].map((layer) => (
              <div
                key={layer.title}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1 font-semibold" style={{ color: layer.color }}>
                  {layer.title}
                </div>
                <div className="mb-1 text-xs text-[#8b949e]">
                  <strong className="text-[#e6edf3]">Tools:</strong> {layer.tool}
                </div>
                <div className="text-xs text-[#8b949e]">
                  <strong className="text-[#e6edf3]">Catches:</strong> {layer.catches}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Prompt Pattern: Verify at Each Step
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt with built-in verification"
            code={`> @src/components/TaskList.tsx

  Add keyboard shortcuts for task actions:
  - 'd' to mark done
  - 'e' to edit
  - 'Delete' to remove

  After implementing:
  1. Run 'npm run lint' — fix any warnings
  2. Run 'npm run typecheck' — fix any type errors
  3. Run 'npm test' — ensure all tests pass
  4. Manually test each keyboard shortcut

  Report results of each verification step.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Automated Fix Pattern
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Some tools can auto-fix issues. Leverage this in prompts:
          </p>
          <CodeBlock
            lang="text"
            filename="Auto-fix prompt"
            code={`> Run 'npm run lint:fix' to auto-format all code.

  Then run 'npm run typecheck'. If there are type errors, fix them
  and verify tests still pass.

  This ensures consistent formatting across the codebase.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Test-Driven Prompts
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For critical features, write tests first:
          </p>
          <CodeBlock
            lang="text"
            filename="Test-first prompt"
            code={`> @src/components/TaskList.test.tsx

  PHASE 1: Write tests for drag-and-drop task reordering
  - Test: dragging a task updates order
  - Test: dropping outside list cancels
  - Test: order persists after refresh

  Don't implement the feature yet. Just write failing tests.

  PHASE 2: (after tests are written)
  Implement drag-and-drop to make the tests pass.`}
          />

          <Callout type="tip" title="CI/CD as Final Safety Net">
            If your project has CI/CD, reference it in prompts:
            <div className="mt-2">
              <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
                "Ensure all CI checks pass before marking complete."
              </code>
            </div>
            This gives Claude a clear definition of "done."
          </Callout>
        </section>

        {/* ITERATING ON PROMPTS */}
        <section id="iterating">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Iterating on Prompts: Reframing Techniques
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Sometimes Claude misunderstands your prompt. Instead of repeating yourself, use
            <strong className="text-[#e6edf3]"> reframing techniques</strong> to clarify intent.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Technique 1: Add Examples
          </h3>
          <div className="my-4 grid gap-3">
            <div className="rounded-[10px] border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#f85149]">
                ❌ Initial Prompt (Misunderstood)
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Make the task list more compact.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Claude might reduce padding, font size, or remove features. Unclear what "compact" means.
              </div>
            </div>
            <div className="rounded-[10px] border border-[#3fb95050] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                ✅ Reframed with Example
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Make the task list more compact by reducing the gap between tasks
  from 16px to 8px. Keep all other styling the same.

  EXAMPLE:
  Before: <div className="space-y-4">
  After:  <div className="space-y-2">`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                Specific change with before/after example. No ambiguity.
              </div>
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Technique 2: Contrast with What You Don't Want
          </h3>
          <CodeBlock
            lang="text"
            filename="Reframed prompt"
            code={`> Add error handling for task creation.

  DO:
  - Show user-friendly error message in UI
  - Log detailed error to console for debugging
  - Keep form data so user can retry

  DON'T:
  - Don't use alert() for errors
  - Don't clear the form on error
  - Don't show technical stack traces to users`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Technique 3: Break Down Complex Requests
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If Claude's response is off, the request might be too complex:
          </p>
          <div className="my-4 grid gap-3">
            <div className="rounded-[10px] border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#f85149]">
                ❌ Too Complex at Once
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Add user authentication with JWT tokens, password reset flow,
  email verification, and role-based access control.`}
              />
            </div>
            <div className="rounded-[10px] border border-[#3fb95050] bg-[#161b22] p-4">
              <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                ✅ Broken into Steps
              </div>
              <CodeBlock
                lang="text"
                filename="Prompt"
                code={`> Step 1: Add JWT authentication (login/logout only).

  We'll add password reset, email verification, and RBAC in
  subsequent steps. Focus on getting basic auth working first.`}
              />
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Technique 4: Point to Existing Patterns
          </h3>
          <CodeBlock
            lang="text"
            filename="Reframed prompt"
            code={`> @src/components/UserList.tsx
  @src/components/ProjectList.tsx

  Create a TaskList component following the same pattern as UserList
  and ProjectList:
  - Same loading state
  - Same error handling
  - Same empty state
  - Same grid layout

  Ensure styling consistency across all list components.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Technique 5: Use Analogies
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt with analogy"
            code={`> Implement task dependencies (a task can depend on others completing
  first).

  Think of it like npm package dependencies:
  - A task can list prerequisite tasks
  - Can't start a task until prerequisites are done
  - Circular dependencies should be detected and prevented
  - Visualize the dependency graph`}
          />

          <Callout type="info" title="The Clarity Checklist">
            If Claude misunderstands, ask:
            <div className="mt-2">
              {bullet(
                [
                  'Did I provide examples of what I want?',
                  'Did I clarify what I don\'t want?',
                  'Is the request too complex to do at once?',
                  'Is there an existing pattern Claude can follow?',
                  'Would an analogy help?',
                ],
                '#58a6ff'
              )}
            </div>
          </Callout>
        </section>

        {/* PROMPT LIBRARIES */}
        <section id="prompt-libraries">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Prompt Libraries: Saving Effective Prompts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Once you've refined a prompt that works well, save it for reuse. Claude Code supports
            <strong className="text-[#e6edf3]"> custom slash commands</strong> for this.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating a Slash Command
          </h3>
          <CodeBlock
            filename=".claude/commands/refactor-component.md"
            code={`---
description: Refactor a React component for better maintainability
---

# Refactor Component

@{file}

Refactor this component following these guidelines:

STRUCTURE:
- Extract complex logic into custom hooks
- Move static data to constants file
- Break large components into smaller ones (< 150 lines)

CODE QUALITY:
- Add TypeScript types for all props and state
- Add JSDoc comments for non-obvious logic
- Use meaningful variable names

VERIFICATION:
- [ ] npm run lint passes
- [ ] npm run typecheck passes
- [ ] All tests pass
- [ ] Component behavior unchanged`}
          />

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Now you can use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/refactor-component</code> to
            apply this pattern consistently.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Common Prompt Templates
          </h3>
          <Accordion title="Template: Add Feature">
            <CodeBlock
              filename=".claude/commands/add-feature.md"
              code={`---
description: Add a new feature with full testing
---

# Add Feature: {feature_name}

@{files}

GOAL:
{Describe what the feature does and why it's needed}

CONSTRAINTS:
- Follow existing code patterns in @{example_file}
- Use TypeScript strict mode
- Add comprehensive tests

ACCEPTANCE CRITERIA:
- [ ] Feature implemented per requirements
- [ ] Unit tests with >80% coverage
- [ ] Integration tests for happy path + edge cases
- [ ] Documentation updated
- [ ] npm run typecheck passes
- [ ] npm test passes`}
            />
          </Accordion>

          <Accordion title="Template: Fix Bug">
            <CodeBlock
              filename=".claude/commands/fix-bug.md"
              code={`---
description: Fix a bug with root cause analysis
---

# Fix Bug

@{affected_files}

BUG DESCRIPTION:
{What's broken and how to reproduce}

ANALYSIS:
1. Read the affected files
2. Identify the root cause
3. Propose a fix
4. Explain why the fix works

FIX REQUIREMENTS:
- Fix the root cause, not symptoms
- Add test case that would catch this bug
- Check for similar bugs in related code

VERIFICATION:
- [ ] Bug no longer reproducible
- [ ] New test fails before fix, passes after
- [ ] No regressions (all tests pass)`}
            />
          </Accordion>

          <Accordion title="Template: Refactor for Performance">
            <CodeBlock
              filename=".claude/commands/optimize.md"
              code={`---
description: Optimize code for performance
---

# Performance Optimization

@{files}

GOAL:
Improve performance for {specific_scenario}

APPROACH:
1. Profile current performance (baseline metrics)
2. Identify bottlenecks
3. Propose optimizations with trade-offs
4. Implement chosen optimization
5. Measure improvement

CONSTRAINTS:
- Don't break existing functionality
- Maintain code readability
- Document any trade-offs made

VERIFICATION:
- [ ] Performance improvement measurable
- [ ] All tests pass
- [ ] No regressions in other areas`}
            />
          </Accordion>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Team Prompt Libraries
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Store team prompts in version control:
          </p>
          <CodeBlock
            code={`.claude/
├── commands/
│   ├── add-feature.md          # Feature development template
│   ├── fix-bug.md              # Bug fix template
│   ├── refactor.md             # Code refactoring template
│   ├── write-tests.md          # Test writing template
│   └── review-code.md          # Code review template
└── README.md                   # Guide to using project commands`}
          />

          <Callout type="tip" title="Versioned Prompts">
            Treating prompts as code means you can:
            <div className="mt-2">
              {bullet(
                [
                  'Review prompt changes in PRs',
                  'Track which prompts work best over time',
                  'Share effective patterns across team',
                  'Improve prompts iteratively',
                ],
                '#3fb950'
              )}
            </div>
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Add Task Dependencies with Good Prompts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice prompt engineering by adding task dependencies to TaskForge.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Exploratory Prompt (Design)
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> @docs/system-architecture.md
  @src/types/task.ts

  I want to add task dependencies to TaskForge (a task can depend on
  other tasks completing first).

  Propose 2-3 approaches for the data model and UI:
  - How to store dependencies (DB schema)
  - How to prevent circular dependencies
  - How to visualize dependencies in UI
  - How to handle editing dependencies

  Consider: current Task type, PostgreSQL database, React frontend.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Review and Choose Approach
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Read Claude's proposals. Choose one (e.g., "Use a separate dependencies table with
              circular dependency detection").
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Implementation Prompt (Type-First)
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> @src/types/task.ts

  GOAL:
  Add task dependencies using separate dependencies table approach.

  PHASE 1: Update Types
  Add 'dependencies' field to Task type:
  - dependencies: string[]  // Array of task IDs this task depends on

  Add new TaskDependency type:
  - id: string
  - taskId: string
  - dependsOnTaskId: string
  - createdAt: Date

  Run 'npm run typecheck'. List all type errors. Don't fix them yet.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Fix Type Errors Systematically
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Now fix each type error one at a time:
  1. Update API endpoints to return dependencies
  2. Update components to handle dependencies field
  3. Update tests to match new types

  After each fix, run 'npm run typecheck' to verify progress.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Add Circular Dependency Detection
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> @src/utils/task-dependencies.ts (create this file)

  GOAL:
  Implement circular dependency detection for tasks.

  APPROACH:
  - Use graph traversal (DFS) to detect cycles
  - Function: detectCircularDependency(taskId, dependsOnId, allDeps)
  - Returns: true if adding dependency would create cycle

  CONSTRAINTS:
  - Pure function (no side effects)
  - TypeScript strict mode
  - Comprehensive JSDoc comments

  ACCEPTANCE CRITERIA:
  - [ ] Function detects direct cycles (A → B → A)
  - [ ] Function detects indirect cycles (A → B → C → A)
  - [ ] Function returns false for valid dependencies
  - [ ] Unit tests with >90% coverage
  - [ ] All tests pass`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Add UI with Safety Nets
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> @src/components/TaskForm.tsx
  @src/components/TaskDependencySelector.tsx (create this)

  GOAL:
  Add dependency selection to task form.

  UI REQUIREMENTS:
  - Multi-select dropdown showing available tasks
  - Disable tasks that would create circular dependencies
  - Show warning message when dependency is blocked
  - Display current dependencies as removable chips

  CONSTRAINTS:
  - Follow existing form patterns in TaskForm.tsx
  - Use existing Select component from UI library
  - Call detectCircularDependency before allowing selection

  VERIFICATION:
  - [ ] Can add/remove dependencies
  - [ ] Circular dependencies prevented
  - [ ] Warning message displays correctly
  - [ ] npm run lint passes
  - [ ] npm run typecheck passes
  - [ ] Tests for UI interactions`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 7: Final Verification
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Run full verification suite:
  1. npm run lint:fix
  2. npm run typecheck
  3. npm test
  4. Manual test: add dependency, try circular dependency, remove dependency

  Report results of each step. Fix any failures.`}
            />
          </div>
        </section>

        {/* ANTI-PATTERNS */}
        <section id="anti-patterns">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Anti-Patterns: Common Prompt Mistakes
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Avoid these common mistakes that lead to poor results or wasted time.
          </p>

          <div className="my-4 grid gap-4">
            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">Over-Specifying</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> On line 47 of src/components/TaskList.tsx, change the className
  from "flex items-center gap-2" to "flex items-center gap-3".
  Then on line 52, update the onClick handler to use handleClick
  instead of onClick. Make sure to add a comma after gap-3.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> You're doing the work instead
                of Claude. Just describe the goal and constraints.
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">Under-Specifying</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> Fix the task list.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> Claude has no idea what's
                broken or what "fix" means. Provide context and acceptance criteria.
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">Missing Acceptance Criteria</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> Add sorting to the task list. Make it better than the current version.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> No way to verify "done" or
                "better." Add specific criteria: sort by what? Ascending/descending? Persist?
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">No File References</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> Update the task component to show priority badges.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> Which task component? Where
                is it? Use @references to be explicit.
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">Assuming Context</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> Continue with the refactoring we discussed earlier.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> In a new session, Claude has
                no memory of "earlier." Always provide context explicitly.
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#161b22] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-semibold text-[#f85149]">No Verification Steps</span>
              </div>
              <CodeBlock
                lang="text"
                filename="Bad prompt"
                code={`> Refactor the TaskList component for better performance.`}
              />
              <div className="mt-2 text-xs text-[#8b949e]">
                <strong className="text-[#e6edf3]">Why it's bad:</strong> No way to measure "better
                performance." Add: run benchmarks, measure before/after, verify tests pass.
              </div>
            </div>
          </div>

          <Callout type="info" title="The Goldilocks Prompt">
            A good prompt is not too specific (over-engineering) and not too vague (under-specifying).
            It provides:
            <div className="mt-2">
              {bullet(
                [
                  'Clear goal (what and why)',
                  'Key constraints (how not to do it)',
                  'Acceptance criteria (how to verify)',
                  'Enough context (@files) but not excessive',
                ],
                '#3fb950'
              )}
            </div>
          </Callout>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Rewrite Bad Prompts
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Take these bad prompts and rewrite them following the Goal + Constraints + Criteria pattern:
            </p>
            <div className="my-3 space-y-3">
              <CodeBlock
                lang="text"
                filename="Bad Prompt 1"
                code={`> Make the app faster.`}
              />
              <CodeBlock
                lang="text"
                filename="Bad Prompt 2"
                code={`> Add authentication.`}
              />
              <CodeBlock
                lang="text"
                filename="Bad Prompt 3"
                code={`> Fix the bug where tasks don't load sometimes.`}
              />
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              For each, add: file references, specific goal, constraints, acceptance criteria.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Add Feature with Structured Prompts
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Add task comments to TaskForge using only well-structured prompts:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Phase 1: Exploratory prompt for design options',
                  'Phase 2: Type-first implementation prompt',
                  'Phase 3: UI implementation with safety nets',
                  'Phase 4: Verification prompt',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Track how many iterations each prompt requires. Refine based on results.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Create Your Team's Prompt Library
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create 3 custom slash commands for common tasks in your project:
            </p>
            <CodeBlock
              code={`.claude/commands/
├── add-api-endpoint.md
├── add-ui-component.md
└── write-integration-test.md`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Each should include: goal template, constraints specific to your project, acceptance
              criteria checklist.
            </p>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now know how to write prompts that leverage Claude Code's agentic capabilities. Good
            prompts use file references, follow Goal + Constraints + Criteria structure, leverage types
            as guardrails, and include verification steps.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 7 — Working with Large Codebases
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn how to work with Claude Code on large, real-world
              codebases. Techniques for navigating unfamiliar code, understanding architecture,
              making safe changes, and managing context limits.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Codebase exploration strategies,
              understanding legacy code, context management, safe refactoring at scale, documentation
              patterns.
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
              onClick={() => onSelectTutorial(7)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Large Codebases →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
