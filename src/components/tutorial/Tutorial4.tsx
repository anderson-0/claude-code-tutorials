'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[3] // Tutorial 4 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'define', short: 'Phase 1: Define' },
  { id: 'plan', short: 'Phase 2: Plan' },
  { id: 'implement', short: 'Phase 3: Implement' },
  { id: 'summarize', short: 'Phase 4: Summarize' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'clean-contexts', short: 'Clean Contexts' },
  { id: 'why-works', short: 'Why This Works' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial4Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial4({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial4Props) {
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
            The Define → Plan → Iterate Workflow
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
            The Define → Plan → Iterate workflow is the{' '}
            <strong className="text-[#e6edf3]">foundational pattern</strong> for productive
            AI-assisted development. It's not specific to Claude Code — it works with any AI tool —
            but Claude Code makes it seamless.
          </p>

          <div className="my-5 grid grid-cols-4 gap-3">
            {[
              { num: '1', label: 'Define', desc: 'Create task file from ticket', color: '#3fb950' },
              { num: '2', label: 'Plan', desc: 'Claude proposes approach', color: '#58a6ff' },
              { num: '3', label: 'Implement', desc: 'Claude builds from plan', color: '#d29922' },
              { num: '4', label: 'Summarize', desc: 'Generate change summary', color: '#f85149' },
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

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'The 4-phase workflow, task files, planning with AI, clean contexts',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-3 completed, .tasks/ folder set up (from T3)',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, TaskForge project',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'A real feature implemented using the workflow',
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

          <Callout type="info" title="Why This Workflow?">
            This workflow builds trust in AI tooling incrementally. You're always in control,
            can step back at any point, and the artifacts (task files) are useful even without AI.
            It makes AI-assisted development <strong>low-risk</strong> and <strong>high-visibility</strong>.
          </Callout>
        </section>

        {/* PHASE 1: DEFINE */}
        <section id="define">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Phase 1: Define
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Every task starts with a{' '}
            <strong className="text-[#e6edf3]">task file</strong> — a markdown document that captures
            what needs to be done, why, and how to verify it's complete.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task File Anatomy
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/todo/add-task-filtering.md"
            code={`# Add Task Filtering & Search

## Overview
Add the ability to filter tasks by status and search by title/description.
This has been requested by multiple users who have projects with 50+ tasks.

## Why
Currently there's no way to find specific tasks without scrolling through
the entire list. Users need to quickly locate tasks by status or keyword.

## Assumptions / Notes
- Filter should persist across page reloads (URL params)
- Search should be client-side for instant feedback
- Need to work with existing sort functionality
- Mobile responsive

## Acceptance Criteria
- [ ] Status filter dropdown (All, Todo, In Progress, Done)
- [ ] Search input with debounced typing (300ms)
- [ ] URL updates with filter params (?status=todo&q=search)
- [ ] Clear filters button
- [ ] Empty state when no results
- [ ] Tests for filter logic

## Plan
<!-- Claude will fill this in during the Plan phase -->`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Key Sections
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Overview</strong> — What you're building
                  in 1-2 sentences
                </>,
                <>
                  <strong className="text-[#e6edf3]">Why</strong> — The business reason,
                  user need, or technical motivation
                </>,
                <>
                  <strong className="text-[#e6edf3]">Assumptions / Notes</strong> — Context,
                  constraints, history, related decisions
                </>,
                <>
                  <strong className="text-[#e6edf3]">Acceptance Criteria</strong> — Specific,
                  checkable requirements that define "done"
                </>,
                <>
                  <strong className="text-[#e6edf3]">Plan</strong> — Left blank initially;
                  Claude fills this in Phase 2
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating a Task File from a Ticket
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If you're working from Jira, Linear, or GitHub Issues, Claude can help convert:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> I have this Jira ticket: [paste ticket details]

  Create a task file at .tasks/todo/[appropriate-name].md following
  this template: [paste the template above]

  Fill in Overview, Why, and Assumptions from the ticket.
  Convert the ticket requirements into Acceptance Criteria.
  Leave the Plan section blank.`}
          />

          <Callout type="tip" title="Store in .tasks/todo/">
            New tasks go in <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.tasks/todo/</code>.
            They'll move to <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">in-progress/</code> during
            implementation, then <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">done/</code> when complete.
          </Callout>
        </section>

        {/* PHASE 2: PLAN */}
        <section id="plan">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Phase 2: Plan
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            With the task defined, ask Claude to review it and propose an implementation plan.
            The key insight: <strong className="text-[#e6edf3]">save the plan to the file</strong>,
            not just in chat.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Planning Prompt
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Read the task file at .tasks/todo/add-task-filtering.md

  Review the acceptance criteria and propose an implementation plan.
  Consider:
  - Which files need to be created or modified
  - The order of changes (dependencies between steps)
  - Any potential issues or edge cases
  - How to verify each step works

  Write your plan in the ## Plan section of the task file.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Plan Output
          </h3>
          <CodeBlock
            lang="markdown"
            filename="Plan section filled in by Claude"
            code={`## Plan

### 1. Create filter state and URL sync
- Add useFilterState hook in src/hooks/useFilterState.ts
- Parse URL params on mount, update URL on filter change
- State: { status: 'all' | 'todo' | 'in-progress' | 'done', query: string }

### 2. Build filter UI components
- Create StatusFilter.tsx (dropdown with status options)
- Create SearchInput.tsx (debounced text input)
- Create FilterBar.tsx (combines both + clear button)

### 3. Integrate with task list
- Modify TaskList.tsx to accept filter state
- Add filtering logic (status match + text search)
- Handle empty state

### 4. Add tests
- Test useFilterState hook (state changes, URL sync)
- Test filter logic (various combinations)
- Integration test for FilterBar

### Verification
- [ ] npm run lint passes
- [ ] npm run test passes
- [ ] Manual test: filter by status, search, clear, refresh page`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Second Opinion Pattern (Optional)
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For complex tasks, get a fresh perspective by opening a new Claude session:
          </p>
          <CodeBlock
            lang="text"
            filename="In a new Claude session"
            code={`> Read .tasks/todo/add-task-filtering.md

  Review the proposed plan in the ## Plan section. Look for:
  - Missed edge cases
  - Better approaches
  - Potential issues
  - Missing verification steps

  If you have suggestions, add them as a ### Review Notes subsection.`}
          />

          <Callout type="warning" title="Why Save to File?">
            Saving the plan to the task file means:
            <div className="mt-2">
              {bullet(
                [
                  'You can review it later without scrolling through chat',
                  'It survives context resets and session ends',
                  'A second Claude session can review it',
                  'Team members can see and comment on the plan',
                ],
                '#d29922'
              )}
            </div>
          </Callout>
        </section>

        {/* PHASE 3: IMPLEMENT */}
        <section id="implement">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Phase 3: Implement
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Now Claude implements from the saved plan — not from memory, but from the task file.
            This keeps implementation aligned with what was agreed.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Move to In-Progress
          </h3>
          <CodeBlock
            code={`# Move the task file to signal work has started
mv .tasks/todo/add-task-filtering.md .tasks/in-progress/`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Implementation Prompt
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Read .tasks/in-progress/add-task-filtering.md

  Implement the plan step by step. After each step:
  - Run npm run lint to check for issues
  - Run npm run test to verify nothing broke
  - Commit if the step is complete

  Start with step 1: Create filter state and URL sync.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Incremental Implementation
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Don't ask Claude to do everything at once. Work through plan steps one at a time:
          </p>
          <CodeBlock
            lang="text"
            filename="Incremental prompts"
            code={`# After step 1 is complete:
> Step 1 looks good. Proceed with step 2: Build filter UI components.

# After step 2:
> Great. Now step 3: Integrate with task list.

# After step 3:
> Now step 4: Add tests for the filter logic.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Verification During Implementation
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The plan should include verification steps. Make sure Claude runs them:
          </p>
          <CodeBlock
            lang="text"
            filename="Verification prompt"
            code={`> Run the verification steps from the plan:
  - npm run lint
  - npm run test
  - Manually verify the filtering works

  Report any issues.`}
          />

          <Callout type="tip" title="Checkpoints Are Your Safety Net">
            Claude Code creates checkpoints automatically. If something goes wrong,
            use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/rewind</code> to go back.
            Work incrementally so you can rewind smaller chunks.
          </Callout>
        </section>

        {/* PHASE 4: SUMMARIZE */}
        <section id="summarize">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Phase 4: Summarize
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When implementation is complete, have Claude generate a summary of what changed.
            This is perfect for PR descriptions and often surfaces improvements you'd forgotten.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Summarize Prompt
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Summarize the changes made for this task. Include:
  - Files created or modified
  - Key decisions made during implementation
  - Any deviations from the original plan
  - Anything that should be documented

  Format it for a PR description.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Summary Output
          </h3>
          <CodeBlock
            lang="markdown"
            filename="PR description"
            code={`## Summary
Added task filtering and search functionality to the task list.

## Changes
- **New files:**
  - \`src/hooks/useFilterState.ts\` - Filter state with URL sync
  - \`src/components/features/FilterBar.tsx\` - Filter UI
  - \`src/components/features/StatusFilter.tsx\` - Status dropdown
  - \`src/components/features/SearchInput.tsx\` - Debounced search

- **Modified files:**
  - \`src/components/features/TaskList.tsx\` - Integrated filtering

- **Tests:**
  - Added 8 tests for filter logic and URL sync

## Decisions
- Used URL params for filter state (shareable links)
- 300ms debounce on search (responsive but not excessive)
- Client-side filtering (dataset is small enough)

## Testing
- [x] Lint passes
- [x] All tests pass
- [x] Manual testing: filter, search, refresh, deep link`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Move to Done
          </h3>
          <CodeBlock
            code={`# Move task file to done
mv .tasks/in-progress/add-task-filtering.md .tasks/done/

# Optional: add completion notes to the file
# The summary above could be appended as a ## Completion section`}
          />
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Add Task Filtering to TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice the full workflow by adding task filtering to TaskForge.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create the Task File
            </h3>
            <CodeBlock
              code={`cd taskforge-tutorial/nextjs  # or /fastapi
mkdir -p .tasks/{todo,in-progress,done}
claude`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a task file at .tasks/todo/add-task-filtering.md for adding
  filter and search functionality to the task list.

  Include:
  - Overview: what we're building
  - Why: user need for finding tasks in large projects
  - Acceptance Criteria: status filter, search, URL params, clear button
  - Leave Plan section blank`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Plan the Implementation
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/todo/add-task-filtering.md and create an implementation
  plan. Consider:
  - Files to create/modify
  - Order of changes
  - How to verify each step

  Write the plan in the ## Plan section of the task file.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Implement Step by Step
            </h3>
            <CodeBlock
              code={`mv .tasks/todo/add-task-filtering.md .tasks/in-progress/`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/in-progress/add-task-filtering.md and implement step 1
  of the plan. Run lint and test after.`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Continue through each step until complete.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Summarize and Complete
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Summarize all the changes made for this task. Format it as a PR
  description with files changed, decisions made, and testing done.`}
            />
            <CodeBlock
              code={`mv .tasks/in-progress/add-task-filtering.md .tasks/done/`}
            />
          </div>
        </section>

        {/* CLEAN CONTEXTS */}
        <section id="clean-contexts">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Clean Contexts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A <strong className="text-[#e6edf3]">clean context</strong> is a fresh Claude session
            with no prior conversation history. The task file pattern makes clean contexts powerful.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Use Clean Contexts
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Complex tasks</strong> — One task per session
                  keeps context focused
                </>,
                <>
                  <strong className="text-[#e6edf3]">Second opinions</strong> — Fresh eyes on a
                  plan without bias from prior discussion
                </>,
                <>
                  <strong className="text-[#e6edf3]">Context rot</strong> — Long sessions accumulate
                  outdated context; fresh start helps
                </>,
                <>
                  <strong className="text-[#e6edf3]">Resuming work</strong> — If you left mid-task,
                  a fresh session with the task file is often clearer
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Task File as Persistent Memory
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Task files solve the "stateless session" problem:
          </p>
          <CodeBlock
            lang="text"
            filename="Resuming work in a new session"
            code={`# New Claude session
claude

> Read .tasks/in-progress/add-task-filtering.md

  I was working on this task. The plan is complete and I finished
  steps 1-2. Continue with step 3.`}
          />

          <Callout type="info" title="Context Survives Sessions">
            Unlike chat history, task files:
            <div className="mt-2">
              {bullet(
                [
                  'Survive session ends and context resets',
                  'Can be read by any future session',
                  'Are version controlled (if not in .gitignore)',
                  'Can be shared with team members',
                ],
                '#3fb950'
              )}
            </div>
          </Callout>
        </section>

        {/* WHY THIS WORKS */}
        <section id="why-works">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Why This Works
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The Define → Plan → Iterate workflow isn't just about AI productivity. It fundamentally
            changes how you work with AI tools.
          </p>

          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Builds Trust Incrementally',
                desc: 'You verify at each phase: is the plan good? Is the implementation correct? Did it work? Trust accumulates through successful iterations.',
                color: '#3fb950',
              },
              {
                title: 'Reduces Risk',
                desc: 'Misunderstandings are caught in the Plan phase before code is written. Bad implementations are caught before they\'re merged. You can step back at any point.',
                color: '#58a6ff',
              },
              {
                title: 'Creates Useful Artifacts',
                desc: 'Task files are valuable documentation regardless of AI. They\'re a decision log, audit trail, and knowledge transfer tool.',
                color: '#d29922',
              },
              {
                title: 'Supports Handoff',
                desc: 'A human can take over at any phase. The task file has all the context needed. This isn\'t "AI does everything" — it\'s structured collaboration.',
                color: '#f85149',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 font-semibold" style={{ color: item.color }}>
                  {item.title}
                </div>
                <div className="text-[13px] text-[#c9d1d9]">{item.desc}</div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Personal Growth">
            This workflow makes you a better developer, not just faster. You learn to:
            specify requirements clearly, think through implementation before coding,
            verify work systematically, and document changes effectively.
          </Callout>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Full Workflow on a Real Ticket
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Take a real ticket from your current project and work through the full cycle:
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Create a task file from the ticket
2. Have Claude plan the implementation
3. (Optional) Get a second opinion in a fresh session
4. Implement step by step
5. Summarize for a PR description
6. Move to done/`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Practice the Second Opinion Pattern
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              For a task you've already planned:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Open a new Claude session (clean context)',
                  'Ask it to review the plan for issues or improvements',
                  'Compare insights to the original planning session',
                  'Did the fresh perspective catch anything?',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Create a Task Template
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a reusable template for your project:
            </p>
            <CodeBlock
              code={`# Create .tasks/templates/feature.md with your preferred structure
# Include sections specific to your project's needs
# Try using it for 3 different tasks`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now have the foundational workflow for AI-assisted development. Define → Plan →
            Iterate works with any AI tool and makes you more productive while reducing risk.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 5 — Rules, Commands, Skills & Hooks
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn Claude Code's four building blocks for
              customization and automation. Build rules that enforce conventions, commands
              that save time, skills that add capabilities, and hooks that automate workflows.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Project rules, slash commands,
              SKILL.md files, lifecycle hooks, choosing the right tool for the job.
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
              onClick={() => onSelectTutorial(5)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Rules & Commands →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
