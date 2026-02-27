'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[9] // Tutorial 10 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'task-decomposition', short: 'Decomposition' },
  { id: 'ai-friendly', short: 'AI-Friendly' },
  { id: 'task-categories', short: 'Categories' },
  { id: 'when-not', short: 'Limits' },
  { id: 'building-trust', short: 'Trust' },
  { id: 'measuring', short: 'Metrics' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial10Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial10({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial10Props) {
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
            AI-Native Development — Adopting an Agent-First Mindset
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
            Most developers think about AI as a tool that <strong className="text-[#e6edf3]">assists</strong> with
            coding — a smarter autocomplete, a faster debugger. But the real productivity leap comes from thinking
            <strong className="text-[#e6edf3]"> AI-native</strong>: designing your work around what agents do best.
          </p>

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This tutorial shifts your mental model from "Claude helps me code" to "I orchestrate development
            through Claude." It's about becoming a force multiplier, not just a faster coder.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3">
            {[
              { label: 'AI-Assisted', desc: 'Human writes code, AI suggests improvements', color: '#58a6ff' },
              { label: 'AI-Native', desc: 'Human defines outcomes, AI implements them', color: '#3fb950' },
            ].map((mode, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4"
                style={{ borderColor: `${mode.color}50` }}
              >
                <div className="mb-2 text-[15px] font-semibold" style={{ color: mode.color }}>
                  {mode.label}
                </div>
                <div className="text-[13px] leading-snug text-[#8b949e]">
                  {mode.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Task decomposition, AI-friendly design, 50+ delegatable task types, trust building',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-9, comfort with Define → Plan → Iterate workflow',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code, TaskForge project, willingness to rethink workflow',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'An activity feed feature designed and built AI-native from scratch',
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

          <Callout type="info" title="The Shift">
            AI-native development isn't about working <strong>with</strong> Claude Code.
            It's about designing work so Claude Code can do <strong>most of it</strong> while
            you focus on what only humans can do: judgment, context, strategy, and verification.
          </Callout>
        </section>

        {/* TASK DECOMPOSITION */}
        <section id="task-decomposition">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Task Decomposition for Agents
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The key to AI-native work is breaking tasks into{' '}
            <strong className="text-[#e6edf3]">delegatable units</strong> — work that can be specified
            clearly, verified objectively, and completed independently.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Delegation Test
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A task is delegatable to Claude if you can answer "yes" to these three questions:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Can I specify it?</strong> — Do I know what "done" looks like?
                </>,
                <>
                  <strong className="text-[#e6edf3]">Can I verify it?</strong> — Can I check if it worked without
                  understanding every line?
                </>,
                <>
                  <strong className="text-[#e6edf3]">Is it self-contained?</strong> — Does it have clear boundaries
                  and minimal dependencies?
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Bad vs Good Decomposition
          </h3>
          <CodeBlock
            lang="markdown"
            filename="❌ Too vague, not delegatable"
            code={`# Improve the task list

Make the task list better. Users are complaining it's hard to use.
Add some features that would help.`}
          />

          <CodeBlock
            lang="markdown"
            filename="✅ Specific, verifiable, self-contained"
            code={`# Add status filter dropdown to task list

## Acceptance Criteria
- [ ] Dropdown with options: All, Todo, In Progress, Done
- [ ] Filter state persists in URL query param (?status=todo)
- [ ] Integrates with existing TaskList component
- [ ] Empty state when no tasks match filter
- [ ] Tests for filter logic

## Verification
- npm run test passes
- Manual: select each status, verify only matching tasks shown
- Manual: refresh page, filter state preserved`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Decomposition Patterns
          </h3>
          <Accordion title="Feature → Components">
            <p className="mb-2 text-[13px] text-[#c9d1d9]">
              Break features into UI components, each with clear props and behavior.
            </p>
            <CodeBlock
              lang="text"
              code={`Feature: Task filtering
├─ StatusFilter component (dropdown)
├─ SearchInput component (debounced)
├─ FilterBar component (combines both)
└─ Integration with TaskList`}
            />
          </Accordion>
          <Accordion title="Refactor → Steps">
            <p className="mb-2 text-[13px] text-[#c9d1d9]">
              Break refactors into verifiable steps with tests between each.
            </p>
            <CodeBlock
              lang="text"
              code={`Refactor: Extract auth logic
1. Create auth utility module
2. Add tests for utility
3. Replace first usage site
4. Test & verify
5. Replace remaining sites one by one
6. Remove old code`}
            />
          </Accordion>
          <Accordion title="Bug Fix → Reproduction">
            <p className="mb-2 text-[13px] text-[#c9d1d9]">
              Start with a failing test that reproduces the bug.
            </p>
            <CodeBlock
              lang="text"
              code={`Bug: Date filter returns wrong results
1. Write failing test for bug scenario
2. Verify test fails
3. Fix the logic
4. Verify test passes
5. Add edge case tests`}
            />
          </Accordion>
          <Accordion title="Migration → File-by-File">
            <p className="mb-2 text-[13px] text-[#c9d1d9]">
              Migrate incrementally, one file or module at a time.
            </p>
            <CodeBlock
              lang="text"
              code={`Migration: TypeScript conversion
1. Add tsconfig.json
2. Rename one file .ts
3. Fix type errors
4. Test & verify
5. Repeat for next file
6. Gradually increase strictness`}
            />
          </Accordion>

          <Callout type="tip" title="Think in Checkpoints">
            Every delegatable task should have a checkpoint where you can verify progress.
            If you can't check if a task is half-done, it's too big or too vague to delegate.
          </Callout>
        </section>

        {/* AI-FRIENDLY CODEBASES */}
        <section id="ai-friendly">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Designing AI-Friendly Codebases
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Some codebases are easier for AI to work with than others. The good news: the qualities that
            make code AI-friendly also make it <strong className="text-[#e6edf3]">human-friendly</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Strong Types
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Types are machine-readable specifications. They tell Claude exactly what data structures expect.
          </p>
          <CodeBlock
            lang="typescript"
            filename="❌ Claude has to guess"
            code={`function updateTask(task, changes) {
  return { ...task, ...changes, updatedAt: Date.now() }
}`}
          />
          <CodeBlock
            lang="typescript"
            filename="✅ Claude knows exactly what's valid"
            code={`interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  createdAt: number
  updatedAt: number
}

function updateTask(task: Task, changes: Partial<Task>): Task {
  return { ...task, ...changes, updatedAt: Date.now() }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Clear Abstractions
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Well-named functions and modules tell Claude what each piece does without reading implementation.
          </p>
          <CodeBlock
            lang="typescript"
            filename="❌ Unclear boundaries"
            code={`// All in one giant TaskList.tsx
function TaskList() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  // 300 more lines mixing concerns...
}`}
          />
          <CodeBlock
            lang="typescript"
            filename="✅ Clear, composable abstractions"
            code={`// TaskList.tsx - orchestration only
function TaskList() {
  const tasks = useTasks()
  const filter = useTaskFilter()
  const filtered = useFilteredTasks(tasks, filter)
  return <TaskTable tasks={filtered} />
}

// Each hook, component has single responsibility
// Claude can modify one without understanding all`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Good Tests
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Tests are specifications that run. They tell Claude what behavior must be preserved.
          </p>
          <CodeBlock
            lang="typescript"
            filename="Tests enable confident refactoring"
            code={`describe('TaskFilter', () => {
  it('shows only matching tasks', () => {
    const tasks = [
      { id: '1', status: 'todo' },
      { id: '2', status: 'done' },
    ]
    const filtered = filterByStatus(tasks, 'todo')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe('1')
  })
})

// Claude can refactor filterByStatus knowing this must pass`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Consistent Patterns
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When your codebase follows conventions, Claude learns them and applies them consistently.
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">File structure</strong> — components/, hooks/, utils/
                  in predictable locations
                </>,
                <>
                  <strong className="text-[#e6edf3]">Naming</strong> — useData for hooks, handleClick for
                  handlers, isLoading for booleans
                </>,
                <>
                  <strong className="text-[#e6edf3]">Error handling</strong> — Consistent try/catch, error boundaries,
                  user messaging
                </>,
                <>
                  <strong className="text-[#e6edf3]">Documentation</strong> — JSDoc for public APIs, comments for
                  non-obvious logic
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="warning" title="Invest in Structure">
            Time spent improving types, abstractions, and tests pays off exponentially when working
            with AI. A well-structured codebase lets Claude work faster and make fewer mistakes.
          </Callout>
        </section>

        {/* 50+ TASK CATEGORIES */}
        <section id="task-categories">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The 50+ Task Categories
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Here are over 50 types of work Claude Code can handle. Use this as a reference for
            what to delegate. Categories range from trivial to complex.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Feature Development
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Add new UI components with specified props and behavior',
                'Implement CRUD operations for data entities',
                'Add form validation with specific rules',
                'Build pagination, sorting, filtering for lists',
                'Create modal dialogs, dropdowns, tooltips',
                'Implement authentication flows (login, signup, reset)',
                'Add file upload with validation',
                'Build search with autocomplete',
                'Implement real-time features (WebSocket, polling)',
                'Add export functionality (CSV, PDF, Excel)',
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Bug Fixes & Debugging
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Fix type errors and linting issues',
                'Resolve test failures with clear error messages',
                'Fix edge cases in business logic',
                'Correct off-by-one errors, date math bugs',
                'Fix race conditions with clear reproduction steps',
                'Resolve styling issues (layout, responsive, dark mode)',
                'Fix broken links, 404s, routing issues',
                'Correct accessibility violations',
                'Fix memory leaks with profiling data',
                'Debug performance issues with specific metrics',
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Refactoring & Code Quality
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Extract duplicated code into reusable functions',
                'Split large files into focused modules',
                'Rename variables, functions for clarity',
                'Convert class components to hooks',
                'Modernize deprecated APIs',
                'Add TypeScript types to untyped code',
                'Simplify complex conditionals',
                'Remove dead code, unused imports',
                'Apply design patterns (Factory, Observer, etc.)',
                'Improve error handling consistency',
              ],
              '#d29922'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Testing
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Write unit tests for pure functions',
                'Add integration tests for user flows',
                'Create component tests with user interactions',
                'Write API tests with mocked responses',
                'Add edge case tests for error handling',
                'Generate test fixtures and mock data',
                'Write snapshot tests for UI components',
                'Add performance benchmarks',
                'Create E2E tests for critical paths',
                'Achieve specific coverage targets',
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Write API documentation with examples',
                'Create README files for modules',
                'Add JSDoc comments to functions',
                'Generate changelog from git history',
                'Write user guides for features',
                'Document configuration options',
                'Create architecture diagrams (as code)',
                'Write migration guides',
                'Document error codes and troubleshooting',
                'Create onboarding docs for new developers',
              ],
              '#8b949e'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Migrations & Upgrades
          </h3>
          <div className="my-3">
            {bullet(
              [
                'Upgrade framework versions (React, Next.js, etc.)',
                'Migrate from one library to another',
                'Convert JavaScript to TypeScript',
                'Migrate from REST to GraphQL',
                'Update database schema with migrations',
                'Migrate from CSS to Tailwind',
                'Convert from Webpack to Vite',
                'Migrate authentication systems',
                'Update deprecated dependencies',
                'Port code to different platform (web to mobile)',
              ],
              '#d29922'
            )}
          </div>

          <Callout type="info" title="Your Delegation Checklist">
            When starting work, ask: "Could I delegate this to Claude?" If it's on this list
            and you can specify acceptance criteria, the answer is probably yes.
          </Callout>
        </section>

        {/* WHEN NOT TO USE */}
        <section id="when-not">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            When NOT to Use Claude Code
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            AI-native doesn't mean "AI for everything." Some tasks are better done by humans.
            Knowing when <strong className="text-[#e6edf3]">not</strong> to delegate is just as important.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Security-Critical Code
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Authentication, authorization, encryption, input sanitization — these require deep security
            expertise and careful review. Claude can assist, but shouldn't implement from scratch without
            expert oversight.
          </p>
          <CodeBlock
            lang="text"
            filename="❌ Don't delegate"
            code={`"Implement JWT authentication with refresh tokens"
"Add role-based access control to API"
"Encrypt user data before storing"`}
          />
          <CodeBlock
            lang="text"
            filename="✅ Safe delegation"
            code={`"Add tests for existing auth middleware"
"Document the auth flow in README"
"Add type safety to auth tokens"`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Novel Algorithms
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Implementing new algorithms, especially for business-critical logic, requires deep understanding
            and careful verification. Claude is great at applying known patterns, less reliable at inventing
            new ones.
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Not ideal:</strong> "Design a recommendation algorithm
                  for our product catalog"
                </>,
                <>
                  <strong className="text-[#e6edf3]">Better:</strong> "Implement collaborative filtering
                  using this research paper [link]"
                </>,
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Ambiguous Decisions
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Product decisions, architectural choices, design tradeoffs — these require human judgment,
            business context, and stakeholder alignment.
          </p>
          <div className="my-3">
            {bullet(
              [
                'Should we use REST or GraphQL? (architectural decision)',
                'What fields should this form have? (product decision)',
                'How should error messages be worded? (UX decision)',
                'Which features should we prioritize? (strategy)',
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Exploration & Discovery
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When you don't know what you're looking for — exploring APIs, prototyping UIs, experimenting
            with approaches — the back-and-forth of discovery is often faster done by hand.
          </p>

          <Callout type="tip" title="The Hybrid Approach">
            Often the best approach is hybrid: you explore and prototype by hand, then once you know
            what you want, delegate the implementation to Claude.
          </Callout>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Quick, Tiny Changes
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Sometimes it's faster to just make a one-line change yourself than to explain it to Claude.
            Don't delegate for the sake of delegating.
          </p>
          <CodeBlock
            lang="text"
            filename="Probably faster to just do it"
            code={`"Change this button from blue to green"
"Fix this typo: 'teh' should be 'the'"
"Add console.log to see what this value is"`}
          />
        </section>

        {/* BUILDING TRUST */}
        <section id="building-trust">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Building Trust Incrementally
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You don't go from "never used Claude" to "Claude builds everything" overnight. Trust builds
            incrementally through successful delegation.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Confidence Ladder
          </h3>
          <div className="my-4 space-y-3">
            {[
              {
                level: 1,
                title: 'Low Risk → Low Verification',
                tasks: 'Documentation, tests, refactoring existing code',
                verify: 'Quick scan, run tests',
                color: '#3fb950',
              },
              {
                level: 2,
                title: 'Medium Risk → Medium Verification',
                tasks: 'New features, bug fixes, component updates',
                verify: 'Code review, manual testing, QA check',
                color: '#58a6ff',
              },
              {
                level: 3,
                title: 'High Risk → High Verification',
                tasks: 'API changes, data migrations, auth logic',
                verify: 'Peer review, staging deploy, full test suite',
                color: '#d29922',
              },
              {
                level: 4,
                title: 'Critical → Paired Implementation',
                tasks: 'Payment processing, security, production data',
                verify: 'Multiple reviews, audits, incremental rollout',
                color: '#f85149',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border bg-[#161b22] p-4"
                style={{ borderColor: `${item.color}50` }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: item.color }}
                  >
                    {item.level}
                  </div>
                  <div className="font-semibold" style={{ color: item.color }}>
                    {item.title}
                  </div>
                </div>
                <div className="ml-10 space-y-1 text-[13px]">
                  <div className="text-[#c9d1d9]">
                    <span className="text-[#8b949e]">Tasks:</span> {item.tasks}
                  </div>
                  <div className="text-[#c9d1d9]">
                    <span className="text-[#8b949e]">Verify:</span> {item.verify}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            How Trust Grows
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Start at level 1. When Claude consistently succeeds, move up the ladder:
          </p>
          <CodeBlock
            lang="text"
            filename="Trust progression"
            code={`Week 1: Claude writes tests, updates docs
        → Tests pass, docs are clear, minimal fixes needed

Week 2: Claude implements simple features
        → Features work, only minor tweaks needed

Week 3: Claude handles bug fixes, refactors
        → Fixes are correct, refactors improve code

Week 4: Claude builds complex features
        → You're delegating full features with confidence`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Verification Strategies
          </h3>
          <Accordion title="Run the Tests">
            <div className="text-[13px] text-[#c9d1d9]">
              <p className="mb-2">
                Automated tests are your first line of verification. If tests pass, you've verified behavior.
              </p>
              <CodeBlock code={`npm run test\nnpm run lint\nnpm run typecheck`} />
            </div>
          </Accordion>
          <Accordion title="Manual Spot Check">
            <div className="text-[13px] text-[#c9d1d9]">
              <p className="mb-2">
                Open the app, try the happy path and one edge case. You don't need to test everything exhaustively.
              </p>
            </div>
          </Accordion>
          <Accordion title="Code Review Checklist">
            <div className="text-[13px] text-[#c9d1d9]">
              <p className="mb-2">Scan for these common issues:</p>
              {bullet(
                [
                  'Hardcoded values that should be configurable',
                  'Missing error handling',
                  'Inconsistent naming or patterns',
                  'Security concerns (SQL injection, XSS, etc.)',
                ],
                '#d29922'
              )}
            </div>
          </Accordion>
          <Accordion title="Diff Review">
            <div className="text-[13px] text-[#c9d1d9]">
              <p className="mb-2">
                Use git diff or GitHub PR view. Look for unexpected changes, deleted code that shouldn't be, or scope creep.
              </p>
              <CodeBlock code={`git diff main...feature-branch`} />
            </div>
          </Accordion>

          <Callout type="info" title="Trust Isn't Binary">
            You don't either trust or not trust Claude. You trust it for some tasks and verify more
            carefully for others. This is exactly how you'd work with a junior developer — and that's healthy.
          </Callout>
        </section>

        {/* MEASURING PRODUCTIVITY */}
        <section id="measuring">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Measuring AI-Assisted Productivity
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            How do you know if AI-native development is working? What should you measure?
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Good Metrics
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Tasks completed per day</strong> — Count distinct work
                  items shipped, not lines of code
                </>,
                <>
                  <strong className="text-[#e6edf3]">Time to first draft</strong> — How quickly do you
                  get from "start" to "reviewable"?
                </>,
                <>
                  <strong className="text-[#e6edf3]">Rework rate</strong> — How often does Claude's work
                  need significant revision?
                </>,
                <>
                  <strong className="text-[#e6edf3]">Context switches</strong> — Are you staying in flow,
                  or constantly firefighting?
                </>,
                <>
                  <strong className="text-[#e6edf3]">Scope tackled</strong> — Are you taking on work you
                  previously would have deferred?
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Bad Metrics (Vanity Metrics)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Lines of code</strong> — Good code is often shorter;
                  LoCWrit metric is meaningless
                </>,
                <>
                  <strong className="text-[#e6edf3]">Prompts sent</strong> — More prompts might mean you're
                  struggling, not succeeding
                </>,
                <>
                  <strong className="text-[#e6edf3]">Files modified</strong> — A good refactor touches many
                  files but is still one task
                </>,
                <>
                  <strong className="text-[#e6edf3]">Tokens used</strong> — Token efficiency matters, but
                  isn't the goal
                </>,
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Real Question
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The ultimate measure: <strong className="text-[#e6edf3]">Are you shipping more value with less stress?</strong>
          </p>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If you're completing your sprint goals with time to spare, tackling technical debt you've been
            deferring, and ending the day energized instead of exhausted — you're succeeding.
          </p>

          <Callout type="tip" title="Weekly Retrospective">
            Every Friday, ask yourself:
            <div className="mt-2">
              {bullet(
                [
                  'What did I ship this week?',
                  'How much of it was AI-assisted?',
                  'What would I have deferred without AI?',
                  'Where did I waste time or hit friction?',
                  'What will I delegate differently next week?',
                ],
                '#58a6ff'
              )}
            </div>
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Design Activity Feed for TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice AI-native development from scratch. We'll design an activity feed feature
            for TaskForge — but instead of coding it ourselves, we'll design it to be AI-friendly
            and delegate the implementation.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Specify the Feature
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a task file that breaks the feature into delegatable units:
            </p>
            <CodeBlock
              lang="markdown"
              filename=".tasks/todo/activity-feed.md"
              code={`# Activity Feed

## Overview
Show a chronological feed of task-related events (created, updated, completed).
Helps teams track project progress and understand who's doing what.

## Acceptance Criteria
- [ ] ActivityEvent type (user, timestamp, action, task)
- [ ] useActivityFeed hook (fetches last 50 events)
- [ ] ActivityFeedItem component (renders one event)
- [ ] ActivityFeed component (scrollable list)
- [ ] Real-time updates via polling (30s interval)
- [ ] Empty state for no activity
- [ ] Tests for all components

## Design Decisions
- Store events in memory (no persistence needed for v1)
- Poll rather than WebSocket (simpler, good enough for v1)
- Show last 50 events (pagination can come later)
- Use relative timestamps (2 minutes ago, etc.)

## Tasks
1. Define data types
2. Create mock activity data generator
3. Build ActivityFeedItem component
4. Build ActivityFeed component
5. Add polling logic
6. Integrate with TaskList (emit events on task changes)
7. Add tests`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Have Claude Plan It
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/todo/activity-feed.md

  Create a detailed implementation plan. For each task, specify:
  - Files to create or modify
  - Key functions/components to implement
  - How to verify that step works
  - Dependencies on previous steps

  Write the plan in the ## Plan section of the task file.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Review the Plan
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Read Claude's plan. Ask yourself:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Does each step have clear boundaries?',
                  'Can I verify each step independently?',
                  'Are there missing edge cases?',
                  'Is the order of steps logical?',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              If you spot issues, ask Claude to revise. Get the plan right before coding starts.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Implement Step by Step
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Move the task to in-progress and implement step 1.

  After completing step 1:
  - Run tests
  - Verify it works
  - Commit
  - Report status

  Then I'll tell you to proceed with step 2.`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Work through all steps incrementally. Verify at each checkpoint.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Verify & Ship
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Once all steps are complete:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Run full test suite',
                  'Manual test: create/update/complete tasks, watch feed update',
                  'Code review: scan for issues',
                  'Move task to done/',
                  'Create PR with Claude\'s summary',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <Callout type="tip" title="Notice What You Did">
            You designed the feature, made architectural decisions, verified each step, and reviewed
            the final result. Claude did the typing. This is AI-native: your judgment, Claude's execution.
          </Callout>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Audit Your Last Week
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Look at the work you did last week. For each task, ask:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Was this delegatable? Could I have specified clear acceptance criteria?',
                  'Where did I spend the most time? (Coding, debugging, reviewing, thinking?)',
                  'What was risky or required judgment? What was mechanical?',
                  'If I had delegated to Claude, where would verification be needed?',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Calculate: what % of your time was spent on delegatable work?
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Redesign a Workflow
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Pick a recurring workflow (e.g., "add a new API endpoint"):
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Write down your current process step-by-step',
                  'Mark which steps are delegatable',
                  'Redesign the workflow to maximize delegation',
                  'Identify verification points',
                  'Try the new workflow for your next instance of that task',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Time It
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Pick a feature you built recently. Build a similar feature (different but comparable
              complexity) using AI-native workflow:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Time yourself on both',
                  'Track: specification time, implementation time, verification time, rework time',
                  'Compare total time and final quality',
                  'Note where you felt in control vs. anxious',
                ],
                '#d29922'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              The goal isn't speed — it's understanding where AI-native helps and where it doesn't.
            </p>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now understand the AI-native mindset: design work to be delegatable, build trust
            incrementally, and focus your time on judgment and verification rather than typing.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #d2992250)',
              border: '1px solid #d2992250',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#d29922]">
              Up Next: Tutorial 11 — Safe Delivery Pipelines
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn how to integrate Claude Code into Git workflows
              for safe, reviewable, auditable delivery. Build confidence in AI-generated code through
              structured review and verification pipelines.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Git workflows, PR automation,
              code review strategies, automated verification, rollback procedures, audit trails.
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
              onClick={() => onSelectTutorial(11)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Safe Delivery →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
