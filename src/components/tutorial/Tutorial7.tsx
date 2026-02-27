'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TabGroup } from './TabGroup'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[6] // Tutorial 7 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'scoping', short: 'Scoping' },
  { id: 'checkpoint-safety', short: 'Checkpoints' },
  { id: 'test-driven', short: 'TDD' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'migrations', short: 'Migrations' },
  { id: 'reviewing', short: 'Reviewing' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial7Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial7({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial7Props) {
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
            Code Refactoring with Claude Code
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
            Refactoring is where Claude Code truly shines. Its{' '}
            <strong className="text-[#e6edf3]">deep understanding of code structure</strong> combined
            with the ability to{' '}
            <strong className="text-[#e6edf3]">coordinate changes across multiple files</strong> makes it
            uniquely suited for modernizing codebases, extracting abstractions, and performing large-scale
            transformations that would be tedious or error-prone manually.
          </p>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Safe refactoring workflows, test-driven refactors, migration patterns, review strategies',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-6 completed, understanding of checkpoints and git workflows',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, TaskForge project, Git',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Refactored code with preserved behavior and improved structure',
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

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Why Claude Code Excels at Refactoring
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Multi-file coordination</strong> — Updates imports,
                  references, and usages across entire codebase
                </>,
                <>
                  <strong className="text-[#e6edf3]">Pattern recognition</strong> — Identifies repeated
                  code structures and suggests unification
                </>,
                <>
                  <strong className="text-[#e6edf3]">Type safety preservation</strong> — Maintains type
                  correctness during structural changes
                </>,
                <>
                  <strong className="text-[#e6edf3]">Test integration</strong> — Verifies behavior
                  preservation through existing tests
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <Callout type="info" title="The Refactoring Sweet Spot">
            Claude Code is best suited for <strong>structural refactors</strong> (extract, rename, reorganize)
            rather than <strong>algorithmic rewrites</strong> (changing business logic). The former is
            mechanical and verifiable; the latter requires deep domain understanding.
          </Callout>
        </section>

        {/* SCOPING REFACTORS */}
        <section id="scoping">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Scoping Refactors
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Successful refactoring starts with appropriate scope. Risk increases with scope, so start
            small and build confidence.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Small Refactors (Low Risk)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Rename variable/function</strong> — Single file or
                  limited scope
                </>,
                <>
                  <strong className="text-[#e6edf3]">Extract function</strong> — Pull logic into named
                  helper within same file
                </>,
                <>
                  <strong className="text-[#e6edf3]">Inline constant</strong> — Replace magic numbers
                  with named constants
                </>,
                <>
                  <strong className="text-[#e6edf3]">Reorganize imports</strong> — Group, sort, or
                  clean up import statements
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Medium Refactors (Moderate Risk)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Extract module</strong> — Move related functions
                  to new file, update all imports
                </>,
                <>
                  <strong className="text-[#e6edf3]">Rename API endpoint</strong> — Update route
                  definitions and all call sites
                </>,
                <>
                  <strong className="text-[#e6edf3]">Change function signature</strong> — Add/remove
                  parameters across multiple callers
                </>,
                <>
                  <strong className="text-[#e6edf3]">Consolidate duplicates</strong> — Unify repeated
                  logic into shared utility
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Large Refactors (Higher Risk)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Architectural restructure</strong> — Move from
                  layered to modular architecture
                </>,
                <>
                  <strong className="text-[#e6edf3]">State management migration</strong> — Redux to
                  Zustand, Context to React Query
                </>,
                <>
                  <strong className="text-[#e6edf3]">Framework upgrade</strong> — Next.js 13 → 14,
                  Python 3.10 → 3.12
                </>,
                <>
                  <strong className="text-[#e6edf3]">API redesign</strong> — REST to GraphQL, or
                  breaking API version change
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="warning" title="Risk Mitigation Strategy">
            For large refactors:
            <div className="mt-2">
              {bullet(
                [
                  'Break into smaller, independently testable chunks',
                  'Create feature branch from main',
                  'Checkpoint after each successful chunk',
                  'Run full test suite between chunks',
                  'Consider incremental deployment (feature flags)',
                ],
                '#f85149'
              )}
            </div>
          </Callout>
        </section>

        {/* CHECKPOINT SAFETY NET */}
        <section id="checkpoint-safety">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Checkpoint Safety Net
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Checkpoints combined with Git branches create a{' '}
            <strong className="text-[#e6edf3]">near-zero risk</strong> environment for refactoring.
            You can be aggressive knowing you can always rewind.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Two-Layer Safety Net
          </h3>
          <CodeBlock
            code={`# Layer 1: Git branch (coarse-grained rollback)
git checkout -b refactor/extract-api-client
git commit -m "Starting point before refactor"

# Layer 2: Checkpoints (fine-grained rewind during Claude session)
# Claude Code creates checkpoints automatically
# Use /rewind if something goes wrong`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Checkpoint Workflow for Refactoring
          </h3>
          <CodeBlock
            lang="text"
            filename="Refactoring session pattern"
            code={`1. Create feature branch
2. Start Claude Code session
3. Make first refactor change
4. Run tests — if pass, continue; if fail, /rewind
5. Make next change (auto-checkpoint created)
6. Run tests — repeat cycle
7. After 3-5 successful changes, commit to Git
8. Continue until refactor complete`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Safe Refactoring Flow
          </h3>
          <CodeBlock
            code={`# Setup
git checkout -b refactor/consolidate-fetch
claude

# Session starts, checkpoint 1 auto-created`}
          />
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Extract all fetch() calls in src/components/tasks/ into a shared
  API client. Start with just TaskList.tsx. Run tests after.`}
          />
          <CodeBlock
            code={`# Claude makes changes, you verify
npm test
# ✓ Tests pass

# Checkpoint 2 auto-created`}
          />
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Good. Now update TaskDetail.tsx to use the API client.`}
          />
          <CodeBlock
            code={`# Claude makes changes
npm test
# ✗ Tests fail — broke something

# Rewind to checkpoint 2
/rewind`}
          />
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Try again. This time preserve the error handling structure
  from the original code.`}
          />
          <CodeBlock
            code={`# Claude tries again
npm test
# ✓ Tests pass

# Commit progress
git add .
git commit -m "Refactor: extract API client for task components"`}
          />

          <Callout type="tip" title="Checkpoint Best Practices">
            <div className="mt-2">
              {bullet(
                [
                  'Test after each change before proceeding',
                  'Rewind immediately when tests fail (don\'t try to fix forward)',
                  'Commit to Git after 3-5 successful checkpoints',
                  'Use /rewind N to go back multiple checkpoints if needed',
                ],
                '#3fb950'
              )}
            </div>
          </Callout>
        </section>

        {/* TEST-DRIVEN REFACTORING */}
        <section id="test-driven">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Test-Driven Refactoring
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The classic red/green/refactor cycle works exceptionally well with Claude Code. Tests
            provide the safety net that makes aggressive refactoring low-risk.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Refactoring Cycle
          </h3>
          <div className="my-5 grid grid-cols-3 gap-3">
            {[
              {
                num: '1',
                label: 'Green',
                desc: 'Ensure all tests pass before refactoring',
                color: '#3fb950',
              },
              {
                num: '2',
                label: 'Refactor',
                desc: 'Make structural changes without changing behavior',
                color: '#58a6ff',
              },
              {
                num: '3',
                label: 'Verify',
                desc: 'Tests still pass; behavior preserved',
                color: '#3fb950',
              },
            ].map((phase, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4 text-center"
                style={{ borderColor: `${phase.color}50` }}
              >
                <div
                  className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: phase.color, color: '#fff' }}
                >
                  {phase.num}
                </div>
                <div className="mb-1 text-[13px] font-semibold text-[#e6edf3]">
                  {phase.label}
                </div>
                <div className="text-[11px] leading-snug text-[#8b949e]">
                  {phase.desc}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Add Tests Before Refactoring
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If the code you're refactoring lacks tests, add them first:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> I want to refactor the authentication logic in src/auth/session.ts
  but it has no tests. Add comprehensive tests that verify current
  behavior before we make any changes.

  Cover:
  - Session creation and validation
  - Token refresh logic
  - Error cases (expired, invalid, missing tokens)

  Run the tests to ensure they pass with current implementation.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Refactor with Test Verification
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Now refactor src/auth/session.ts to:
  - Extract token validation into separate function
  - Use dependency injection for storage layer
  - Add proper TypeScript types throughout

  After each change, run the test suite. All tests must stay green.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Characterization Tests for Legacy Code
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For poorly understood legacy code, use characterization tests to capture current behavior:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> This legacy function in utils/parser.ts is hard to understand but
  it's used in production. Create characterization tests:

  1. Test with known good inputs and outputs from production logs
  2. Test edge cases by exploring the code paths
  3. Document what the function actually does (vs. what it should do)

  Don't modify the function yet — just capture its behavior.`}
          />

          <Callout type="info" title="The Golden Rule of Refactoring">
            <strong className="text-[#e6edf3]">Never refactor and change behavior simultaneously.</strong>
            <div className="mt-2">
              Refactoring changes <em>structure</em>. Feature work changes <em>behavior</em>.
              Mixing them makes debugging failures nearly impossible. Do one or the other, never both.
            </div>
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Refactor TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice refactoring with two track-specific examples: extracting duplicated fetch
            logic (Next.js) or introducing the repository pattern (FastAPI).
          </p>

          <TabGroup
            tabs={[
              {
                label: 'Next.js Track',
                content: (
                  <>
                    <h3 className="mb-2.5 mt-5 text-[19px] font-semibold text-[#e6edf3]">
                      Refactor: Extract API Client
                    </h3>
                    <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                      TaskForge has scattered fetch() calls. Let's consolidate them into a typed API client.
                    </p>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 1: Identify Duplication
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Search the codebase for all fetch() calls related to tasks.
  Show me the files and the duplicated patterns.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 2: Create API Client Module
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Create src/lib/api/tasks.ts with a typed API client for task operations.
  Include:
  - getTasks(), getTask(id), createTask(), updateTask(), deleteTask()
  - Proper TypeScript types for request/response
  - Error handling wrapper
  - Base URL from environment variable

  Don't modify any components yet.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 3: Add Tests for API Client
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Create tests for the API client in src/lib/api/tasks.test.ts
  - Mock fetch responses
  - Test successful calls
  - Test error handling
  - Test request formatting

  Run tests to verify.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 4: Refactor Components One by One
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Update src/components/TaskList.tsx to use the API client instead
  of direct fetch() calls. Preserve all existing behavior including
  loading states and error handling.

  After making changes, run the component tests.`}
                      />
                      <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                        Repeat for TaskDetail, TaskForm, and any other components.
                      </p>
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 5: Verify End-to-End
                      </h4>
                      <CodeBlock
                        code={`npm run test
npm run lint
npm run build

# Manual verification
npm run dev
# Test task CRUD operations in browser`}
                      />
                    </div>

                    <Callout type="tip" title="Expected Outcomes">
                      <div className="mt-2">
                        {bullet(
                          [
                            'All fetch() logic consolidated in one module',
                            'Type safety across all API calls',
                            'Centralized error handling',
                            'Easier to add request interceptors, caching, or auth headers later',
                          ],
                          '#3fb950'
                        )}
                      </div>
                    </Callout>
                  </>
                ),
              },
              {
                label: 'FastAPI Track',
                content: (
                  <>
                    <h3 className="mb-2.5 mt-5 text-[19px] font-semibold text-[#e6edf3]">
                      Refactor: Introduce Repository Pattern
                    </h3>
                    <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                      TaskForge has inline SQL queries in route handlers. Let's extract them into a repository.
                    </p>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 1: Identify SQL Queries
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Find all SQL queries in app/routes/tasks.py. List them and
  identify the patterns (CRUD operations on tasks table).`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 2: Create Repository Interface
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Create app/repositories/task_repository.py with a TaskRepository class:

  Methods:
  - get_all(user_id: int) -> List[Task]
  - get_by_id(task_id: int, user_id: int) -> Optional[Task]
  - create(task: TaskCreate, user_id: int) -> Task
  - update(task_id: int, task: TaskUpdate, user_id: int) -> Task
  - delete(task_id: int, user_id: int) -> bool

  Move SQL queries from routes into these methods.
  Keep database connection handling.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 3: Add Repository Tests
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Create tests/test_task_repository.py
  - Use test database fixture
  - Test all CRUD operations
  - Test user isolation (can't access other users' tasks)
  - Test error cases (not found, invalid data)

  Run pytest to verify.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 4: Refactor Route Handlers
                      </h4>
                      <CodeBlock
                        lang="text"
                        filename="Prompt"
                        code={`> Update app/routes/tasks.py to use TaskRepository instead of
  inline SQL. Inject repository via dependency injection:

  def get_task_repo() -> TaskRepository:
      return TaskRepository(get_db())

  Update each route to use:
  repo: TaskRepository = Depends(get_task_repo)

  Preserve all existing behavior, response formats, and status codes.
  Run route tests after changes.`}
                      />
                    </div>

                    <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
                      <h4 className="mb-3 mt-0 text-[17px] font-semibold text-[#e6edf3]">
                        Step 5: Verify End-to-End
                      </h4>
                      <CodeBlock
                        code={`pytest
ruff check .
mypy app/

# Manual verification
uvicorn app.main:app --reload
# Test API endpoints with curl or httpie`}
                      />
                    </div>

                    <Callout type="tip" title="Expected Outcomes">
                      <div className="mt-2">
                        {bullet(
                          [
                            'SQL queries isolated from HTTP layer',
                            'Repository can be mocked in route tests',
                            'Easier to swap database implementations',
                            'Route handlers focus on HTTP concerns only',
                          ],
                          '#3fb950'
                        )}
                      </div>
                    </Callout>
                  </>
                ),
              },
            ]}
          />
        </section>

        {/* MIGRATION PATTERNS */}
        <section id="migrations">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Migration Patterns
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Some refactors involve upgrading dependencies or migrating to new frameworks. These have
            unique challenges.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Dependency Upgrades
          </h3>
          <CodeBlock
            lang="text"
            filename="Example: React 17 → 18"
            code={`> I want to upgrade React from 17 to 18. Help me plan this:

  1. Read the React 18 migration guide
  2. Identify breaking changes that affect our codebase
  3. Create a migration checklist
  4. Estimate risk level for each item

  Don't make changes yet — just analyze and plan.`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            After planning, execute incrementally:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Step 1: Update package.json dependencies to React 18.
  Install and verify the app still runs.`}
          />
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Step 2: Replace ReactDOM.render with createRoot in index.tsx
  Test that app still loads.`}
          />
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Step 3: Update any usage of deprecated APIs identified in plan.
  Run full test suite after.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Framework Migrations
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For larger migrations (e.g., Next.js Pages Router → App Router), use the strangler pattern:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Phase 1: Parallel infrastructure</strong> — Set up
                  app/ directory alongside pages/
                </>,
                <>
                  <strong className="text-[#e6edf3]">Phase 2: Migrate one route</strong> — Choose simple
                  route, migrate fully, test
                </>,
                <>
                  <strong className="text-[#e6edf3]">Phase 3: Migrate incrementally</strong> — Move routes
                  one by one, deploy between migrations
                </>,
                <>
                  <strong className="text-[#e6edf3]">Phase 4: Remove old system</strong> — Delete pages/
                  after all routes migrated
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Code Mod Scripts
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For mechanical transformations across many files, have Claude generate a codemod:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> We need to rename all instances of "TaskItem" to "Task" across
  the codebase (files, imports, types, variables).

  Create a Node.js script using jscodeshift that:
  1. Finds all occurrences
  2. Handles imports, type definitions, and usages
  3. Preserves code formatting
  4. Reports what was changed

  Test on a single file first before running on entire codebase.`}
          />

          <Callout type="warning" title="Migration Checklist">
            Before any major migration:
            <div className="mt-2">
              {bullet(
                [
                  'Read official migration guide',
                  'Check for automated migration tools (codemods)',
                  'Audit codebase for usage of deprecated features',
                  'Ensure comprehensive test coverage',
                  'Plan incremental deployment strategy',
                  'Have rollback plan',
                ],
                '#f85149'
              )}
            </div>
          </Callout>
        </section>

        {/* REVIEWING AI-GENERATED REFACTORS */}
        <section id="reviewing">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Reviewing AI-Generated Refactors
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Even when tests pass, human review is critical. Here's what to look for when reviewing
            Claude's refactoring work.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Review Checklist
          </h3>

          <Accordion
            items={[
              {
                title: '1. Behavior Preservation',
                content: (
                  <div>
                    <div className="mb-3">
                      {bullet(
                        [
                          'Run the full test suite, not just affected tests',
                          'Manually test critical user flows',
                          'Check edge cases and error handling',
                          'Verify logging and monitoring still work',
                        ],
                        '#3fb950'
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: '2. Type Safety',
                content: (
                  <div>
                    <div className="mb-3">
                      {bullet(
                        [
                          'TypeScript/mypy passes with no new errors',
                          'No use of any/Any types introduced',
                          'Generic types preserved or improved',
                          'Null safety maintained',
                        ],
                        '#58a6ff'
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: '3. Import Consistency',
                content: (
                  <div>
                    <div className="mb-3">
                      {bullet(
                        [
                          'All imports resolved correctly',
                          'No circular dependencies introduced',
                          'Import paths follow project conventions',
                          'Unused imports removed',
                        ],
                        '#d29922'
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: '4. Code Quality',
                content: (
                  <div>
                    <div className="mb-3">
                      {bullet(
                        [
                          'Naming is clear and follows conventions',
                          'Abstraction level is appropriate (not over-engineered)',
                          'Error messages preserved or improved',
                          'Comments updated to reflect changes',
                        ],
                        '#f85149'
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: '5. Performance',
                content: (
                  <div>
                    <div className="mb-3">
                      {bullet(
                        [
                          'No new N+1 queries introduced',
                          'Caching strategy preserved',
                          'No unnecessary re-renders (React)',
                          'Memory usage patterns unchanged',
                        ],
                        '#8b949e'
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Git Diff Review Strategy
          </h3>
          <CodeBlock
            code={`# Review changes file by file
git diff main --stat

# Focus on high-impact files first
git diff main -- src/core/ src/lib/

# Check for unexpected changes
git diff main --diff-filter=D  # Deletions
git diff main --diff-filter=A  # Additions

# Use GitHub PR if available for inline comments`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Request Changes
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Behavior changed</strong> — Tests pass but behavior
                  is subtly different
                </>,
                <>
                  <strong className="text-[#e6edf3]">Over-abstracted</strong> — Introduced complexity
                  without clear benefit
                </>,
                <>
                  <strong className="text-[#e6edf3]">Convention violated</strong> — Doesn't follow project
                  patterns
                </>,
                <>
                  <strong className="text-[#e6edf3]">Incomplete refactor</strong> — Some files updated,
                  others missed
                </>,
              ],
              '#f85149'
            )}
          </div>

          <Callout type="tip" title="The Two-Stage Review">
            Review in two passes:
            <div className="mt-2">
              <strong className="text-[#e6edf3]">Pass 1: Automated checks</strong> — Tests, linting, type
              checking, build verification.
            </div>
            <div className="mt-1">
              <strong className="text-[#e6edf3]">Pass 2: Human judgment</strong> — Code quality, naming,
              abstraction appropriateness, maintainability.
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
              Exercise 1: Refactor Error Handling
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Find all try/catch blocks in TaskForge. Extract error handling into a centralized error
              handler utility. Preserve all error messages and logging.
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Search for try/catch patterns
2. Identify common error handling logic
3. Create error handler utility
4. Add tests for error handler
5. Refactor one file at a time
6. Verify tests pass after each file`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Extract a Module
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Find a large component or module (200+ lines) and extract logical sections into separate files.
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Identify logical boundaries',
                  'Create new files with clear names',
                  'Move code with proper imports',
                  'Verify tests still pass',
                  'Check bundle size didn\'t increase significantly',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Upgrade a Dependency
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Choose a dependency with a major version update available (check package.json).
              Use Claude to plan and execute the upgrade.
            </p>
            <CodeBlock
              code={`# Example dependencies that often have migrations:
# - React 17 → 18
# - Next.js 13 → 14
# - FastAPI 0.x → 1.0
# - Pydantic v1 → v2`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now know how to perform safe, coordinated refactors with Claude Code. Combine this with
            test-driven development and checkpoint safety nets to confidently modernize even legacy codebases.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 8 — Handling Documentation
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn how to generate and maintain high-quality documentation
              as a first-class development artifact. From API docs to architecture diagrams, make
              documentation a natural output of your development process.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> README generation, API documentation,
              architecture decision records, keeping docs in sync with code, documentation-driven development.
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
              onClick={() => onSelectTutorial(8)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Documentation →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
