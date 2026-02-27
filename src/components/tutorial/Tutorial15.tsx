'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[14] // Tutorial 15 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'vs-subagents', short: 'vs Subagents' },
  { id: 'enabling', short: 'Enabling' },
  { id: 'roles', short: 'Roles' },
  { id: 'spawn-prompts', short: 'Spawn' },
  { id: 'communication', short: 'Comms' },
  { id: 'display-modes', short: 'Display' },
  { id: 'task-claiming', short: 'Tasks' },
  { id: 'token-costs', short: 'Costs' },
  { id: 'when-teams', short: 'When' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial15Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial15({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial15Props) {
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
            Agent Teams — Multi-Agent Collaboration
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
            Agent Teams remove the coordination bottleneck of subagents by enabling{' '}
            <strong className="text-[#e6edf3]">direct inter-agent communication</strong>. Instead of
            all communication routing through a lead agent, teammates message each other, claim tasks
            from a shared list, and coordinate in real-time.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3">
            {[
              { icon: '👥', label: 'Direct Messaging', desc: 'Agents communicate without routing through lead', color: '#3fb950' },
              { icon: '📋', label: 'Shared Task List', desc: 'Teammates claim and coordinate work independently', color: '#58a6ff' },
              { icon: '🔄', label: 'Real-Time Sync', desc: 'File locks prevent race conditions on shared files', color: '#d29922' },
              { icon: '⚡', label: 'Parallel Work', desc: 'Multiple agents work simultaneously on features', color: '#f85149' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4"
                style={{ borderColor: `${item.color}50` }}
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <div className="mb-1 text-[13px] font-semibold text-[#e6edf3]">
                  {item.label}
                </div>
                <div className="text-[11px] leading-snug text-[#8b949e]">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Team architecture, spawn prompts, communication patterns, task claiming, cost management',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorial 14 (Supervisor), understanding of subagents and parallel workflows',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code with Opus 4.6+, experimental flag enabled',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Multi-agent sprint planning feature with coordinated frontend/backend/tests',
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

          <Callout type="warning" title="Experimental Feature">
            Agent Teams is experimental and token-intensive. Works best with Opus 4.6+.
            Costs scale linearly with team size. Use for coordinated multi-agent work only.
          </Callout>
        </section>

        {/* SUBAGENTS VS AGENT TEAMS */}
        <section id="vs-subagents">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Subagents vs Agent Teams
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This is the critical distinction: subagents are{' '}
            <strong className="text-[#e6edf3]">contractors on separate errands</strong>, while agent
            teams are a <strong className="text-[#e6edf3]">collaborative squad in the same room</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Subagents (Tutorial 13)
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Hub-and-spoke model</strong> — All communication
                  routes through the lead agent
                </>,
                <>
                  <strong className="text-[#e6edf3]">Independent tasks</strong> — Each subagent works
                  on isolated tasks and reports back
                </>,
                <>
                  <strong className="text-[#e6edf3]">No coordination</strong> — Subagents cannot talk
                  to each other or see each other's work
                </>,
                <>
                  <strong className="text-[#e6edf3]">Lead coordinates</strong> — Lead agent must
                  manually coordinate dependencies and handoffs
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Agent Teams
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Mesh communication</strong> — Teammates can
                  message each other directly without lead mediation
                </>,
                <>
                  <strong className="text-[#e6edf3]">Shared task list</strong> — All agents see the
                  same task backlog and claim work autonomously
                </>,
                <>
                  <strong className="text-[#e6edf3]">Real-time coordination</strong> — Teammates
                  discover blockers, dependencies, and conflicts as they work
                </>,
                <>
                  <strong className="text-[#e6edf3]">Lead as facilitator</strong> — Lead reviews,
                  resolves conflicts, and synthesizes results
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <div className="my-5 rounded-lg border border-[#21262d] bg-[#161b22] p-5">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">
              Analogy: Restaurant Kitchen
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 text-[13px] font-semibold text-[#58a6ff]">
                  Subagents = Delivery Orders
                </div>
                <div className="text-[13px] text-[#8b949e]">
                  Head chef sends individual orders out for delivery (prep salad, grill steak, bake
                  dessert). Each returns their completed dish. Head chef plates everything.
                </div>
              </div>
              <div>
                <div className="mb-2 text-[13px] font-semibold text-[#3fb950]">
                  Teams = Kitchen Brigade
                </div>
                <div className="text-[13px] text-[#8b949e]">
                  Line cooks see all orders, coordinate timing, share ingredients, call out when dishes
                  are ready. Head chef oversees and expedites.
                </div>
              </div>
            </div>
          </div>

          <Callout type="info" title="When to Use Each">
            Use <strong>subagents</strong> for independent tasks (generate tests, write docs, analyze logs).
            Use <strong>teams</strong> when tasks have interdependencies and need coordination (build
            a feature across frontend/backend/tests with shared discovery).
          </Callout>
        </section>

        {/* ENABLING AGENT TEAMS */}
        <section id="enabling">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Enabling Agent Teams
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agent Teams is an experimental feature. Enable it via environment variable or settings file.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Option 1: Environment Variable
          </h3>
          <CodeBlock
            code={`# In your shell (bash/zsh)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Launch Claude Code
claude`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Option 2: Settings File
          </h3>
          <CodeBlock
            lang="json"
            filename="~/.config/claude-code/settings.json"
            code={`{
  "experimental": {
    "agentTeams": true
  },
  "modelPreferences": {
    "default": "claude-opus-4.6",
    "teammates": "claude-opus-4.6"
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Model Requirements
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Recommended: Opus 4.6</strong> — Best at
                  multi-agent coordination and task claiming
                </>,
                <>
                  <strong className="text-[#e6edf3]">Minimum: Sonnet 3.5</strong> — Works but may
                  struggle with complex dependencies
                </>,
                <>
                  <strong className="text-[#e6edf3]">Mix models</strong> — Lead uses Opus for
                  orchestration, teammates use Sonnet for implementation
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="warning" title="Cost Warning">
            Each teammate is a full Claude instance. A 4-agent team means 4x the token cost. Use teams
            deliberately for tasks that truly benefit from parallel coordination.
          </Callout>
        </section>

        {/* LEAD VS TEAMMATE ROLES */}
        <section id="roles">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Lead vs Teammate Roles
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The <strong className="text-[#e6edf3]">lead agent</strong> coordinates the team.
            <strong className="text-[#e6edf3]"> Teammates</strong> work independently in their own
            context windows.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Lead Agent Responsibilities
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Initialize team</strong> — Spawn teammates with
                  clear roles and spawn prompts
                </>,
                <>
                  <strong className="text-[#e6edf3]">Define tasks</strong> — Create shared task list
                  with acceptance criteria and dependencies
                </>,
                <>
                  <strong className="text-[#e6edf3]">Monitor progress</strong> — Watch for blockers,
                  conflicts, and dependency resolution
                </>,
                <>
                  <strong className="text-[#e6edf3]">Resolve conflicts</strong> — Mediate when
                  teammates disagree on approach or encounter file conflicts
                </>,
                <>
                  <strong className="text-[#e6edf3]">Synthesize results</strong> — Combine teammate
                  outputs into final deliverable
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Teammate Responsibilities
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Claim tasks</strong> — Pick tasks from shared
                  list that match their role/expertise
                </>,
                <>
                  <strong className="text-[#e6edf3]">Coordinate laterally</strong> — Message other
                  teammates about dependencies and shared concerns
                </>,
                <>
                  <strong className="text-[#e6edf3]">Report blockers</strong> — Notify lead when stuck
                  or waiting on another teammate
                </>,
                <>
                  <strong className="text-[#e6edf3]">Request help</strong> — Ask for clarification or
                  architectural decisions when needed
                </>,
                <>
                  <strong className="text-[#e6edf3]">Mark complete</strong> — Update task status and
                  unblock dependent tasks
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Teammate Context Windows
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Teammates load project context (CLAUDE.md, MCP servers, skills) but{' '}
            <strong className="text-[#e6edf3]">NOT the lead's conversation history</strong>. They
            start fresh with only their spawn prompt.
          </p>
          <CodeBlock
            lang="text"
            filename="What a teammate sees on spawn"
            code={`# Project context (automatic):
- CLAUDE.md
- .claude/rules/*.md
- MCP server tools
- .claude/skills/*.md

# Spawn prompt (from lead):
- Role definition
- Task assignments
- Communication expectations
- Success criteria

# Does NOT see:
- Lead's conversation history
- Other teammates' contexts
- Prior planning discussions`}
          />

          <Callout type="tip" title="Fresh Start Advantage">
            Teammates starting with clean contexts avoids context pollution. Each teammate focuses
            on their specialty without baggage from unrelated discussions.
          </Callout>
        </section>

        {/* SPAWN PROMPTS */}
        <section id="spawn-prompts">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Spawn Prompts
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The spawn prompt is <strong className="text-[#e6edf3]">all the context a teammate gets</strong>
            when initialized. Well-crafted spawn prompts are critical for team success.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Spawn Prompt Anatomy
          </h3>
          <CodeBlock
            lang="markdown"
            filename="Example: Frontend Teammate Spawn Prompt"
            code={`You are the **frontend teammate** on a feature development team.

## Your Role
Build React components for the sprint planning board feature. You own:
- All files in src/components/sprint/
- Sprint-related state management hooks
- Frontend integration tests

## Task List
See shared task list at .tasks/sprint-board/tasks.md
Claim tasks marked [frontend] or [ui].

## Coordination
- **Backend teammate**: Building API routes. Wait for /api/sprints endpoint before integration.
- **Test teammate**: Will add E2E tests after your components are complete.
- **Lead**: Report blockers or architectural questions to lead.

## Success Criteria
- Components render correctly in Storybook
- All props are TypeScript typed
- Unit tests for state logic
- Accessibility: keyboard navigation, ARIA labels

## Communication Protocol
- Use direct messages for lateral coordination
- Broadcast only for critical blockers affecting all teammates
- Update task status immediately when claiming or completing work

## Architecture Constraints
- Use existing design system components (src/components/ui/)
- Follow React Query patterns for API calls
- No direct database access (use backend API)

Start by claiming the "Create SprintBoard component" task.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Spawn Prompt Template
          </h3>
          <CodeBlock
            lang="markdown"
            filename="Template"
            code={`You are the **[role]** teammate on a [project type] team.

## Your Role
[What they're responsible for building]
You own:
- [Specific files/directories]
- [Specific subsystems]

## Task List
[Where to find the shared task list]
Claim tasks marked [tag] or [category].

## Coordination
- **[Teammate 1]**: [What they're building + handoff points]
- **[Teammate 2]**: [What they're building + handoff points]
- **Lead**: [When to escalate to lead]

## Success Criteria
- [Measurable completion criteria]
- [Quality standards]
- [Testing requirements]

## Communication Protocol
- [When to use direct messages]
- [When to broadcast]
- [Task status update expectations]

## Architecture Constraints
- [Tech stack rules]
- [Integration points]
- [What NOT to touch]

Start by [specific first action].`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Common Spawn Prompt Mistakes
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#f85149]">Too vague</strong> — "Build the frontend" without
                  specific files or boundaries
                </>,
                <>
                  <strong className="text-[#f85149]">Missing coordination info</strong> — No mention of
                  other teammates or handoff points
                </>,
                <>
                  <strong className="text-[#f85149]">No success criteria</strong> — Teammate doesn't
                  know when they're done
                </>,
                <>
                  <strong className="text-[#f85149]">Duplicate responsibilities</strong> — Two teammates
                  both think they own the same files
                </>,
              ],
              '#f85149'
            )}
          </div>

          <Callout type="tip" title="Test Your Spawn Prompts">
            Before spawning the team, read each spawn prompt aloud. Does it give you enough context
            to start work? Would you know who to ask for help? Can you identify your boundaries?
          </Callout>
        </section>

        {/* COMMUNICATION */}
        <section id="communication">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Communication Patterns
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agent teams communicate through direct messages, broadcasts, and task status updates.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Direct Messages
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Send a message to a specific teammate. This is the most common communication pattern.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Example: Frontend asking Backend for API schema"
            code={`from: frontend
to: backend
message: |
  I'm building the SprintBoard component and need to integrate with
  the /api/sprints endpoint. Can you share the response schema?

  Specifically I need to know:
  - Sprint object shape
  - Pagination structure
  - Error response format`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Broadcasts
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Send a message to all teammates. <strong className="text-[#e6edf3]">Use sparingly</strong> —
            broadcast costs scale with team size.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Example: Lead announcing architectural change"
            code={`from: lead
to: all
message: |
  [ARCHITECTURAL CHANGE]

  We're switching from REST to GraphQL for the sprints API.
  This affects all integration points.

  Frontend: Use Apollo Client instead of React Query
  Backend: Implement GraphQL resolver for sprints query
  Test: Update API mocks to GraphQL schema

  Updated API design in docs/api-design.md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task Status Updates
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Teammates update shared task status automatically when claiming, completing, or blocking work.
          </p>
          <CodeBlock
            lang="markdown"
            filename=".tasks/sprint-board/tasks.md"
            code={`## Tasks

### Frontend
- [x] Create SprintBoard component (claimed by: frontend, completed: 2025-01-15)
- [ ] Add drag-and-drop for task reordering (claimed by: frontend, in-progress)
- [ ] Implement sprint filters (available)

### Backend
- [x] Create /api/sprints GET endpoint (claimed by: backend, completed: 2025-01-15)
- [x] Add sprint validation logic (claimed by: backend, completed: 2025-01-15)
- [ ] Implement task assignment API (claimed by: backend, in-progress)

### Integration
- [ ] Connect frontend to backend API (blocked: waiting for frontend UI, backend API)
- [ ] Add loading states and error handling (available)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Idle Notifications
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When a teammate finishes their work and no more tasks are available, they notify the lead.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Example: Teammate going idle"
            code={`from: test
to: lead
message: |
  All test tasks are complete:
  - ✅ Unit tests for SprintBoard component
  - ✅ Integration tests for API routes
  - ✅ E2E test for sprint creation flow

  No additional test tasks in the backlog. Awaiting further instructions or
  new test requirements from feature work.`}
          />

          <Callout type="warning" title="Broadcast Sparingly">
            Broadcasts cost tokens for every teammate. A 4-agent team with 10 broadcasts = 40 message
            deliveries. Use direct messages when possible.
          </Callout>
        </section>

        {/* DISPLAY MODES */}
        <section id="display-modes">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Display Modes
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agent teams can display output in different modes depending on your terminal setup.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            In-Process Mode (Default)
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            All teammates share one terminal window. Use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">Shift+Down</code> to
            cycle through teammate outputs.
          </p>
          <CodeBlock
            code={`# Launch team in single terminal
claude --team

# During execution:
# Press Shift+Down to cycle: Lead → Frontend → Backend → Test → Lead...
# Current agent name shown in header: [frontend]`}
          />
          <div className="my-4 rounded-lg border border-[#21262d] bg-[#161b22] p-4">
            <div className="mb-2 text-[13px] font-semibold text-[#e6edf3]">Pros</div>
            <div className="mb-3">
              {bullet(
                [
                  'Simple setup, works in any terminal',
                  'Lower resource usage',
                  'Easy to follow one agent at a time',
                ],
                '#3fb950'
              )}
            </div>
            <div className="mb-2 text-[13px] font-semibold text-[#e6edf3]">Cons</div>
            <div>
              {bullet(
                [
                  'Cannot see all agents simultaneously',
                  'Must cycle to check teammate progress',
                  'Easy to lose track of which agent is active',
                ],
                '#f85149'
              )}
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Split Panes Mode
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Each teammate gets their own terminal pane. Requires tmux or iTerm2.
          </p>
          <CodeBlock
            code={`# With tmux
claude --team --display=split

# Creates layout:
# ┌─────────────┬─────────────┐
# │   [lead]    │  [frontend] │
# ├─────────────┼─────────────┤
# │  [backend]  │   [test]    │
# └─────────────┴─────────────┘`}
          />
          <div className="my-4 rounded-lg border border-[#21262d] bg-[#161b22] p-4">
            <div className="mb-2 text-[13px] font-semibold text-[#e6edf3]">Pros</div>
            <div className="mb-3">
              {bullet(
                [
                  'See all agents simultaneously',
                  'Easier to spot blockers and idle teammates',
                  'Better for monitoring team coordination',
                ],
                '#3fb950'
              )}
            </div>
            <div className="mb-2 text-[13px] font-semibold text-[#e6edf3]">Cons</div>
            <div>
              {bullet(
                [
                  'Requires tmux or iTerm2',
                  'Higher resource usage (more terminal buffers)',
                  'Can be overwhelming with large teams',
                ],
                '#f85149'
              )}
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Choosing a Display Mode
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Use in-process</strong> for small teams (2-3),
                  simple tasks, or single-monitor setups
                </>,
                <>
                  <strong className="text-[#e6edf3]">Use split panes</strong> for larger teams (4+),
                  complex coordination, or monitoring progress across agents
                </>,
                <>
                  <strong className="text-[#e6edf3]">Switch modes</strong> anytime with Ctrl+T (toggle display)
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="tip" title="iTerm2 Tip">
            In iTerm2, use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">Cmd+D</code> and
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]"> Cmd+Shift+D</code> to manually
            split panes, then assign each pane to a teammate for custom layouts.
          </Callout>
        </section>

        {/* TASK CLAIMING AND DEPENDENCIES */}
        <section id="task-claiming">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Task Claiming and Dependencies
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Teammates claim tasks from a shared list. File locking prevents race conditions. Dependency
            management ensures tasks unblock automatically when prerequisites complete.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task Claiming Flow
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/sprint-board/tasks.md"
            code={`## Available Tasks

### [frontend] Create SprintCard component
**Status:** available
**Estimated:** 30 min
**Depends on:** none
**Acceptance:**
- Renders sprint title, date range, task count
- Click opens sprint detail view
- Drag handle for reordering

### [backend] Implement POST /api/sprints
**Status:** claimed by backend
**Estimated:** 45 min
**Depends on:** none
**Acceptance:**
- Validates sprint data (dates, title)
- Returns 201 with created sprint
- Handles duplicate sprint names

### [integration] Connect frontend to POST endpoint
**Status:** blocked
**Estimated:** 20 min
**Depends on:** "Create SprintCard component", "Implement POST /api/sprints"
**Acceptance:**
- Submit form creates sprint via API
- Shows loading state during request
- Displays error toast on failure`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Claiming a Task
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Teammates claim tasks by updating the status field. The task file is locked during update
            to prevent conflicts.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Teammate action"
            code={`# Frontend teammate claims task
action: claim_task
task: "Create SprintCard component"
result: |
  Task claimed successfully.
  Status updated: available → claimed by frontend
  File lock acquired: .tasks/sprint-board/tasks.md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Dependency Resolution
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When a teammate completes a task, dependent tasks automatically unblock if all prerequisites
            are satisfied.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Automatic unblocking"
            code={`# Backend completes their task
task: "Implement POST /api/sprints"
status: completed

# System checks dependent tasks
dependent_task: "Connect frontend to POST endpoint"
dependencies:
  - "Create SprintCard component": completed ✅
  - "Implement POST /api/sprints": completed ✅
result: |
  All dependencies satisfied.
  Status updated: blocked → available
  Notification sent to team: "Connect frontend to POST endpoint" now available`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            File Locking
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When multiple teammates try to modify the same file, the first one acquires the lock.
            Others receive a lock conflict notification.
          </p>
          <CodeBlock
            lang="yaml"
            filename="Lock conflict scenario"
            code={`# Frontend tries to edit src/components/sprint/SprintBoard.tsx
action: edit_file
file: src/components/sprint/SprintBoard.tsx
result: |
  ❌ Lock conflict
  File currently locked by: backend
  Reason: backend is refactoring props interface

  Options:
  1. Wait for backend to finish
  2. Coordinate with backend via direct message
  3. Claim a different task

# Frontend sends message
from: frontend
to: backend
message: "I need to update SprintBoard.tsx for the filter feature. How long until you're done?"`}
          />

          <Callout type="tip" title="Task Granularity">
            Break tasks into small enough chunks that file conflicts are rare. If teammates frequently
            block each other, tasks are too large or boundaries are unclear.
          </Callout>
        </section>

        {/* TOKEN COST MANAGEMENT */}
        <section id="token-costs">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Token Cost Management
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agent teams are <strong className="text-[#e6edf3]">expensive</strong>. Each teammate is a
            separate Claude instance. Costs scale linearly with team size and conversation length.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Cost Breakdown
          </h3>
          <CodeBlock
            lang="text"
            filename="Example: 4-agent team (Lead + 3 teammates)"
            code={`Team composition:
- 1 lead (Opus 4.6)
- 3 teammates (Opus 4.6)

Per turn costs (approximate):
- Lead: 2,000 tokens input + 1,000 tokens output = 3,000 tokens
- Each teammate: 1,500 tokens input + 800 tokens output = 2,300 tokens
- Total per turn: 3,000 + (3 × 2,300) = 9,900 tokens

Over 20 turns:
- Total tokens: ~198,000 tokens
- Cost at Opus 4.6 rates: ~$3.00 (input) + ~$7.50 (output) = $10.50

Compare to single agent:
- Single agent over 20 turns: ~60,000 tokens
- Cost: ~$1.50

Team overhead: 7x more expensive`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Cost Optimization Strategies
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Keep teams small</strong> — 3-4 agents max.
                  More than 4 rarely improves coordination enough to justify cost
                </>,
                <>
                  <strong className="text-[#e6edf3]">Clear scope</strong> — Well-defined tasks reduce
                  back-and-forth messages. Each message is 4x the cost (lead + 3 teammates)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Avoid broadcasts</strong> — Broadcast to 4 agents
                  costs 4x a direct message. Use direct messages when possible
                </>,
                <>
                  <strong className="text-[#e6edf3]">Mix models</strong> — Use Opus for lead (complex
                  coordination), Sonnet for teammates (implementation work)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Batch work</strong> — Don't spawn a team for
                  10-minute tasks. Teams shine on 2-4 hour coordinated efforts
                </>,
                <>
                  <strong className="text-[#e6edf3]">Shut down early</strong> — When work is done,
                  terminate teammates immediately. Idle agents still incur overhead
                </>,
              ],
              '#d29922'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When Team Cost is Worth It
          </h3>
          <CodeBlock
            lang="text"
            filename="Cost-benefit analysis"
            code={`✅ WORTH IT: Multi-component feature with frontend/backend/test coordination
- Single agent: 3 hours of sequential work (context switching, handoff overhead)
- Team: 1 hour of parallel work (simultaneous development, real-time coordination)
- Savings: 2 hours of developer time > $10 in token costs

❌ NOT WORTH IT: Simple single-file refactor
- Single agent: 15 minutes
- Team: 10 minutes with coordination overhead + 7x token cost
- Loss: Minimal time savings, high token overhead

✅ WORTH IT: Complex integration across 5+ files with shared discovery
- Single agent: Implements one layer, discovers issue, backtracks, repeats
- Team: Discovers integration issues during parallel development, adjusts real-time
- Savings: Avoids costly rework cycles

❌ NOT WORTH IT: Documentation generation task
- Single agent: Perfectly capable of reading code and writing docs
- Team: No parallelization benefit, coordination adds overhead
- Loss: Pure cost increase with no benefit`}
          />

          <Callout type="warning" title="Monitor Your Spend">
            Use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">claude --team --dry-run</code> to
            estimate token costs before spawning a team. Set budget alerts in your Claude Code settings.
          </Callout>
        </section>

        {/* WHEN TO USE TEAMS VS SUBAGENTS */}
        <section id="when-teams">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            When Teams vs Subagents
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Choose the right multi-agent pattern for your task type.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Use Subagents When...
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Tasks are independent</strong> — Generate test
                  fixtures, write documentation, analyze logs — each can be done in isolation
                </>,
                <>
                  <strong className="text-[#e6edf3]">Report-back pattern works</strong> — You just need
                  results, not ongoing coordination
                </>,
                <>
                  <strong className="text-[#e6edf3]">No shared discovery</strong> — Each subagent's
                  work doesn't reveal new requirements for others
                </>,
                <>
                  <strong className="text-[#e6edf3]">Cost-sensitive</strong> — Subagents are cheaper
                  (no coordination overhead, terminate after task)
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Use Agent Teams When...
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Cross-cutting dependencies</strong> — Frontend
                  needs backend API shape, backend needs frontend's data model
                </>,
                <>
                  <strong className="text-[#e6edf3]">Shared discovery</strong> — Implementing one part
                  reveals issues in another (e.g., "this API needs pagination")
                </>,
                <>
                  <strong className="text-[#e6edf3]">Real-time coordination</strong> — Decisions made
                  by one teammate immediately affect others
                </>,
                <>
                  <strong className="text-[#e6edf3]">Parallel speedup matters</strong> — 3 hours
                  sequential vs 1 hour parallel is worth the cost
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <div className="my-5 rounded-lg border border-[#21262d] bg-[#161b22]">
            <div className="border-b border-[#21262d] px-5 py-3">
              <h4 className="text-[15px] font-semibold text-[#e6edf3]">
                Decision Matrix
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#21262d]">
                    <th className="px-5 py-3 text-left font-semibold text-[#e6edf3]">Scenario</th>
                    <th className="px-5 py-3 text-left font-semibold text-[#e6edf3]">Pattern</th>
                    <th className="px-5 py-3 text-left font-semibold text-[#e6edf3]">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#21262d]">
                    <td className="px-5 py-3 text-[#c9d1d9]">Generate OpenAPI docs from code</td>
                    <td className="px-5 py-3 text-[#58a6ff]">Subagent</td>
                    <td className="px-5 py-3 text-[#8b949e]">Independent task, report back</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="px-5 py-3 text-[#c9d1d9]">Build full-stack CRUD feature</td>
                    <td className="px-5 py-3 text-[#3fb950]">Team</td>
                    <td className="px-5 py-3 text-[#8b949e]">Frontend/backend coordination needed</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="px-5 py-3 text-[#c9d1d9]">Add error logging across 20 files</td>
                    <td className="px-5 py-3 text-[#58a6ff]">Subagent</td>
                    <td className="px-5 py-3 text-[#8b949e]">Mechanical task, no discovery</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="px-5 py-3 text-[#c9d1d9]">Database migration + code changes</td>
                    <td className="px-5 py-3 text-[#3fb950]">Team</td>
                    <td className="px-5 py-3 text-[#8b949e]">Schema changes affect API, frontend</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="px-5 py-3 text-[#c9d1d9]">Write unit tests for 10 functions</td>
                    <td className="px-5 py-3 text-[#58a6ff]">Subagent</td>
                    <td className="px-5 py-3 text-[#8b949e]">Independent tests, batch work</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-[#c9d1d9]">Refactor shared types used everywhere</td>
                    <td className="px-5 py-3 text-[#3fb950]">Team</td>
                    <td className="px-5 py-3 text-[#8b949e]">Changes cascade, need coordination</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Callout type="info" title="Hybrid Approach">
            You can use both! Start with subagents for independent prep work (generate boilerplate,
            set up tests), then spawn a team for coordinated implementation.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Build Sprint Planning with Agent Teams
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Build a full-stack sprint planning feature using a 4-agent team: lead, frontend, backend, test.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Enable Agent Teams
            </h3>
            <CodeBlock
              code={`# Set environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Verify it's enabled
claude --version
# Should show: Agent Teams: enabled`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Create Project Structure
            </h3>
            <CodeBlock
              code={`cd taskforge-tutorial/nextjs
mkdir -p .tasks/sprint-board
mkdir -p src/components/sprint
mkdir -p src/pages/api/sprints`}
            />
            <CodeBlock
              lang="markdown"
              filename=".tasks/sprint-board/tasks.md"
              code={`## Sprint Planning Feature Tasks

### Frontend
- [ ] Create SprintBoard component (grid layout)
- [ ] Create SprintCard component (individual sprint)
- [ ] Add sprint creation form
- [ ] Implement drag-and-drop reordering

### Backend
- [ ] Create /api/sprints GET endpoint (list sprints)
- [ ] Create /api/sprints POST endpoint (create sprint)
- [ ] Add sprint validation logic
- [ ] Implement database queries

### Integration
- [ ] Connect frontend to backend API
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add optimistic updates

### Testing
- [ ] Unit tests for SprintBoard component
- [ ] Unit tests for API routes
- [ ] Integration tests for full flow
- [ ] E2E test for sprint creation`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Spawn the Team
            </h3>
            <CodeBlock
              code={`claude --team`}
            />
            <CodeBlock
              lang="text"
              filename="Lead agent prompt"
              code={`> I need to build a sprint planning feature for TaskForge. Let's use an agent team.

  Spawn 3 teammates:

  1. **frontend** - React components for sprint board
     - Owns: src/components/sprint/*
     - Claims: [frontend] tasks from .tasks/sprint-board/tasks.md

  2. **backend** - API routes for sprint management
     - Owns: src/pages/api/sprints/*
     - Claims: [backend] tasks from .tasks/sprint-board/tasks.md

  3. **test** - Tests across frontend and backend
     - Owns: src/**/*.test.tsx, src/**/*.test.ts
     - Claims: [testing] tasks from .tasks/sprint-board/tasks.md

  Each teammate should:
  - Read the full task list
  - Claim one task at a time
  - Coordinate with other teammates on dependencies
  - Report blockers to me

  Start by having each teammate introduce themselves and claim their first task.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Monitor Team Progress
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Use <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">Shift+Down</code> to
              cycle through teammate outputs. Watch for:
            </p>
            <div className="my-3">
              {bullet(
                [
                  'Task claiming messages: "Claimed: Create SprintBoard component"',
                  'Direct messages between teammates: frontend asks backend for API schema',
                  'Dependency blocks: "Waiting for backend to complete API endpoint"',
                  'Completion notifications: "SprintCard component complete, tests passing"',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Handle Coordination Issues
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              The lead agent will see coordination requests. Respond to help teammates:
            </p>
            <CodeBlock
              lang="text"
              filename="Example coordination"
              code={`[frontend → lead]: "Backend API returns 500 error. Should I mock the response or wait?"

> Check with backend teammate. Backend, what's the status of /api/sprints GET?

[backend → lead]: "GET endpoint is working but validation logic is stricter than expected.
Frontend needs to send 'start_date' and 'end_date' in ISO format."

> Frontend, use ISO date format (YYYY-MM-DD) for dates in API calls. Backend,
  document the expected format in a comment above the validation function.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Review and Integrate
            </h3>
            <CodeBlock
              lang="text"
              filename="Final integration prompt"
              code={`> All teammates report their tasks are complete. Let's verify:

  1. Run npm run lint (should pass)
  2. Run npm run test (all tests should pass)
  3. Start dev server and manually test sprint creation flow
  4. Check for any file conflicts or merge issues

  If everything works, summarize:
  - What each teammate built
  - Any architectural decisions made during coordination
  - Known limitations or follow-up work`}
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
              Exercise 1: 2-Agent Team for Simple Feature
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Start small: spawn a 2-agent team (frontend + backend) for a simple CRUD endpoint.
            </p>
            <CodeBlock
              lang="text"
              filename="Task"
              code={`Feature: Task commenting
- Frontend: Add comment input below each task, display comment list
- Backend: POST /api/tasks/:id/comments, GET /api/tasks/:id/comments

Practice:
1. Write spawn prompts for both teammates
2. Create shared task list with clear boundaries
3. Coordinate on comment data model (what fields?)
4. Time how long parallel development takes vs sequential`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Spawn Prompt Engineering
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Practice writing effective spawn prompts. Test iterations:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Version 1: Vague prompt ("Build the frontend")',
                  'Version 2: Add file ownership boundaries',
                  'Version 3: Add coordination expectations and communication protocol',
                  'Version 4: Add success criteria and first action',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Compare teammate effectiveness across versions. How much does spawn prompt quality matter?
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Single Agent vs Team Time Comparison
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Implement the same feature twice:
            </p>
            <CodeBlock
              lang="text"
              filename="Experiment"
              code={`Feature: User profile editing (form + API + tests)

Run 1: Single agent (sequential)
- Time: [record]
- Rework cycles: [record]
- Token cost: [record]

Run 2: Agent team (parallel)
- Time: [record]
- Coordination overhead: [record]
- Token cost: [record]

Analysis:
- Was parallel faster?
- Did team discover integration issues sooner?
- Was the cost difference worth the time savings?`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now understand how to spawn agent teams, write spawn prompts, coordinate lateral
            communication, and manage the cost-benefit tradeoffs. Agent teams unlock parallel development
            with real-time coordination.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 16 — Ralph — Autonomous Dev Loops
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the final expert tutorial, you'll build fully autonomous development loops. Ralph
              (Recursive Autonomous Loop for Programming and Heuristics) runs test-driven development
              cycles with self-verification and minimal human intervention.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Autonomous loops, self-verification,
              quality gates, when to intervene, building trust in automation.
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
              onClick={() => onSelectTutorial(16)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Ralph — Autonomous Loops →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
