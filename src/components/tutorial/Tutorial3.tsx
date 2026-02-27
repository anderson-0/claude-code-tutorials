'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[2] // Tutorial 3 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'exploration', short: 'Exploration' },
  { id: 'mapping', short: 'Mapping' },
  { id: 'tracing', short: 'Data Flows' },
  { id: 'dependencies', short: 'Dependencies' },
  { id: 'documentation', short: 'Documentation' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'tasks-folder', short: '.tasks/ Pattern' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial3Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial3({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial3Props) {
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
            Project Onboarding — Learning a Codebase
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
            Joining a new project — or inheriting legacy code — can feel overwhelming. Where do you start?
            What's the architecture? How does data flow? Claude Code becomes your{' '}
            <strong className="text-[#e6edf3]">onboarding partner</strong>, helping you understand
            unfamiliar codebases quickly and systematically.
          </p>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🧭',
                title: "What you'll learn",
                desc: 'Explore codebases, trace data flows, map architecture, generate docs',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-2 completed, Claude Code installed, any codebase to explore',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, a project to onboard (TaskForge recommended)',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Architecture docs, data flow maps, dependency analysis, initial CLAUDE.md',
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

          <Callout type="tip" title="The Goal">
            By the end of this tutorial, you'll be able to take any codebase — even one you've
            never seen before — and systematically understand its architecture, patterns, and
            data flows using Claude Code.
          </Callout>
        </section>

        {/* THE EXPLORATION PHASE */}
        <section id="exploration">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Exploration Phase
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When you first encounter a new codebase, resist the urge to dive into specific files.
            Start with exploration prompts that give you the big picture.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Universal Exploration Prompts
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            These prompts work on any codebase — use them as your onboarding checklist:
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">1. High-Level Overview</h4>
            <CodeBlock
              lang="text"
              filename="Prompts"
              code={`> Give me a high-level overview of this project. What does it do,
  who is it for, and what are the main features?

> What's the tech stack? Framework, language, database, key libraries.

> Describe the overall architecture. Is it monolithic, microservices,
  serverless, or something else?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">2. Entry Points</h4>
            <CodeBlock
              lang="text"
              filename="Prompts"
              code={`> What are the main entry points to this application?
  Where does execution start?

> For a web app: What are the main routes? Show me the routing structure.

> For a CLI: What are the available commands? Where are they defined?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">3. Key Modules</h4>
            <CodeBlock
              lang="text"
              filename="Prompts"
              code={`> What are the main modules or domains in this codebase?
  How are they organized?

> Show me the directory structure with explanations of what each
  top-level directory contains.

> What are the most important files I should understand first?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">4. Patterns and Conventions</h4>
            <CodeBlock
              lang="text"
              filename="Prompts"
              code={`> What coding patterns does this project use?
  (e.g., repository pattern, MVC, hooks, etc.)

> What naming conventions are used for files, functions, and variables?

> How is state managed? Where does data live?`}
            />
          </div>

          <Callout type="info" title="Start Broad, Then Narrow">
            Always start with the big picture before diving into specifics. Understanding
            the overall architecture helps you contextualize individual files.
          </Callout>
        </section>

        {/* MAPPING THE CODEBASE */}
        <section id="mapping">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Mapping the Codebase
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Once you understand the basics, have Claude generate documentation artifacts
            that you can reference later and share with your team.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Architecture Documentation
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Generate an architecture document for this project. Include:
  - System overview
  - Component diagram (describe it textually or as ASCII art)
  - Data flow between components
  - External dependencies and integrations

> Create a README.md for this project that explains the architecture
  to a new developer joining the team.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Module Relationships
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Map out the relationships between modules. Which modules depend on
  which? Are there any circular dependencies?

> Generate a dependency graph showing how the main modules connect.

> What are the shared utilities or common libraries that multiple
  modules use?`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Output: Architecture Diagram
          </h3>
          <CodeBlock
            lang="text"
            filename="Example output from Claude"
            code={`## TaskForge Architecture

┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │──│  Components │──│  Hooks / Context    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / Server Actions
┌────────────────────────────┴────────────────────────────────┐
│                         Backend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ API Routes  │──│  Services   │──│  Database (Prisma)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Data Flow:
1. User interacts with Pages/Components
2. Components call Hooks which use Server Actions or API routes
3. API routes delegate to Services for business logic
4. Services use Prisma to interact with SQLite database`}
          />
        </section>

        {/* TRACING DATA FLOWS */}
        <section id="tracing">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Tracing Data Flows
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            One of Claude Code's most powerful onboarding capabilities is tracing specific user
            actions through the code. This reveals how the system actually works.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Trace Prompt Pattern
          </h3>
          <CodeBlock
            lang="text"
            filename="Pattern"
            code={`> Trace what happens when a user [performs action].
  Follow the code from [entry point] through every function call,
  database operation, and response back to the user.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Tracing Task Creation in TaskForge
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Trace what happens when a user creates a new task in TaskForge.
  Start from the UI form submission and follow the code through:
  - The API route or server action
  - Any validation or business logic
  - The database operation
  - The response back to the client
  Show me the exact files and functions involved.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Output
          </h3>
          <CodeBlock
            lang="text"
            filename="Claude's trace output"
            code={`## Task Creation Flow

1. **UI Form** (src/components/features/TaskForm.tsx)
   - User fills form, clicks "Create Task"
   - Calls \`createTask\` server action

2. **Server Action** (src/server/actions/tasks.ts:createTask)
   - Validates input with Zod schema
   - Checks user session (must be authenticated)
   - Delegates to TaskService

3. **Service Layer** (src/server/services/TaskService.ts:create)
   - Business logic: sets default status to "todo"
   - Assigns task to project

4. **Database** (via Prisma)
   - INSERT into tasks table
   - Returns created task with ID

5. **Response**
   - Server action returns task object
   - \`revalidatePath('/dashboard/tasks')\` triggers refresh
   - TaskList component re-renders with new task

Files touched:
- src/components/features/TaskForm.tsx
- src/server/actions/tasks.ts
- src/server/services/TaskService.ts
- prisma/schema.prisma (Task model)`}
          />

          <Callout type="tip" title="Common Traces to Run">
            For any app, trace these flows: user authentication, the main CRUD operations,
            error handling paths, and any background jobs or scheduled tasks.
          </Callout>
        </section>

        {/* UNDERSTANDING DEPENDENCIES */}
        <section id="dependencies">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Understanding Dependencies
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Dependencies tell you a lot about a project: what libraries it relies on,
            potential security concerns, and technical debt.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Package Analysis
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Analyze the dependencies in this project. What are the main
  categories (framework, database, testing, utilities)?

> Are there any dependencies that look outdated or potentially
  problematic?

> What testing framework is used? What about linting and formatting?`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Security Considerations
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Are there any obvious security concerns in the dependencies
  or the code itself?

> How is authentication handled? What about authorization?

> Where are secrets stored? Are there any hardcoded credentials
  I should know about?`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Unused Dependencies
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Are there any dependencies that appear to be unused?
  Check if they're imported anywhere in the codebase.

> What dependencies are only used in development vs production?`}
          />

          <Callout type="warning" title="Don't Trust Blindly">
            Claude's analysis is helpful but not exhaustive. For security audits, combine
            Claude's insights with dedicated tools like <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">npm audit</code> or
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]"> pip-audit</code>.
          </Callout>
        </section>

        {/* GENERATING INITIAL DOCUMENTATION */}
        <section id="documentation">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Generating Initial Documentation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Turn your exploration into permanent documentation. This creates a foundation
            for your CLAUDE.md (from Tutorial 2) and helps future developers.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation Artifacts to Generate
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">README.md</strong> — Project overview,
                  setup instructions, development workflow
                </>,
                <>
                  <strong className="text-[#e6edf3]">ARCHITECTURE.md</strong> — System design,
                  component relationships, data flows
                </>,
                <>
                  <strong className="text-[#e6edf3]">CLAUDE.md</strong> — AI-optimized project
                  documentation (from Tutorial 2)
                </>,
                <>
                  <strong className="text-[#e6edf3]">API.md</strong> — Endpoint documentation,
                  request/response formats
                </>,
                <>
                  <strong className="text-[#e6edf3]">CONTRIBUTING.md</strong> — How to contribute,
                  coding standards, PR process
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generation Prompts
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompts"
            code={`> Generate a comprehensive README.md for this project. Include:
  - What the project does
  - Prerequisites and installation
  - How to run in development
  - How to run tests
  - Project structure overview
  - Contributing guidelines

> Generate an ARCHITECTURE.md that documents the system design.
  Focus on the "why" behind architectural decisions.

> Based on what you've learned about this codebase, generate an
  initial CLAUDE.md file that would help future Claude sessions
  work effectively on this project.`}
          />

          <Callout type="info" title="Connecting Back to Tutorial 2">
            The documentation you generate here becomes the foundation for your CLAUDE.md.
            After generating initial docs, refine them into a focused CLAUDE.md using the
            patterns from Tutorial 2.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Onboard TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice by onboarding TaskForge as if you've never seen it before.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Clone and Explore
            </h3>
            <CodeBlock
              code={`# Clone TaskForge (if you haven't already)
git clone https://github.com/lumenalta/taskforge-tutorial.git
cd taskforge-tutorial/nextjs  # or /fastapi

# Start Claude Code
claude`}
            />
            <CodeBlock
              lang="text"
              filename="Initial exploration"
              code={`> Give me a high-level overview of this project.

> What's the tech stack? List all major dependencies.

> Show me the directory structure with explanations.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Trace a Core Flow
            </h3>
            <CodeBlock
              lang="text"
              filename="Trace prompts"
              code={`> Trace what happens when a user creates a new task.
  Show me every file and function involved.

> Trace the authentication flow. How does a user log in?
  What happens after successful authentication?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Generate Documentation
            </h3>
            <CodeBlock
              lang="text"
              filename="Documentation prompts"
              code={`> Generate an ARCHITECTURE.md for TaskForge.

> Based on your exploration, generate a comprehensive CLAUDE.md
  for this project. Include all the sections we covered in Tutorial 2.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Identify Improvement Areas
            </h3>
            <CodeBlock
              lang="text"
              filename="Analysis prompts"
              code={`> What areas of this codebase could use improvement?
  Look for: missing tests, inconsistent patterns, technical debt.

> Are there any obvious bugs or code smells you notice?

> What would you prioritize fixing if you were the maintainer?`}
            />
          </div>
        </section>

        {/* THE .TASKS/ FOLDER PATTERN */}
        <section id="tasks-folder">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The .tasks/ Folder Pattern
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            As you work with Claude Code on real projects, you'll want a structured way to
            track tasks, plans, and discoveries. The <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.tasks/</code> folder
            pattern provides exactly that.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Directory Structure
          </h3>
          <CodeBlock
            lang="text"
            filename="Structure"
            code={`.tasks/
├── todo/              # Tasks to be started
│   ├── add-search.md
│   └── fix-login-bug.md
├── in-progress/       # Currently being worked on
│   └── refactor-api.md
├── done/              # Completed tasks (for reference)
│   └── setup-auth.md
└── templates/         # Reusable task templates
    └── feature.md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task File Anatomy
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/todo/add-search.md"
            code={`# Add Task Search & Filtering

## Overview
Add the ability to search tasks by title/description and filter by status.

## Why
Users have requested search functionality. Currently difficult to find
specific tasks in projects with many items.

## Acceptance Criteria
- [ ] Search input in task list header
- [ ] Filter by status (all, todo, in-progress, done)
- [ ] Results update as user types (debounced)
- [ ] Clear search button
- [ ] Works with existing task sorting

## Notes
- Consider using URL params for shareable filtered views
- Check how Linear implements their search for inspiration

## Plan
(Claude will fill this in during the Plan phase)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Setup the Folder
          </h3>
          <CodeBlock
            code={`# Create the .tasks structure
mkdir -p .tasks/{todo,in-progress,done,templates}

# Add to .gitignore (tasks are personal/local)
echo ".tasks/" >> .gitignore

# Or if you want to track them in git (team visibility)
# Don't add to .gitignore`}
          />

          <Callout type="tip" title="Why This Pattern Works">
            <div className="my-2">
              {bullet(
                [
                  'Tasks persist across Claude sessions (context resets don\'t lose work)',
                  'Visual organization with folder structure',
                  'Easy to pick up where you left off',
                  'Plans are saved to files, not just chat history',
                  'Can be shared with team or kept private',
                ],
                '#58a6ff'
              )}
            </div>
          </Callout>

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            We'll use this pattern extensively starting in Tutorial 4: The Define → Plan → Iterate
            Workflow.
          </p>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Onboard an Open-Source Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Pick an open-source project you've never seen before and onboard it with Claude.
            </p>
            <CodeBlock
              code={`# Some good candidates:
git clone https://github.com/tiangolo/fastapi.git
git clone https://github.com/vercel/next.js.git
git clone https://github.com/expressjs/express.git

cd <project> && claude`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Work through: overview → entry points → architecture → trace a flow → dependencies
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Generate Architecture Docs
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Using the project from Exercise 1, generate:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'An ASCII architecture diagram',
                  'A list of all major components and their relationships',
                  'A data flow diagram for the main use case',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Set Up .tasks/ for Your Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create the .tasks/ folder structure for a project you're currently working on.
              Create at least 3 task files for real work you need to do.
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. mkdir -p .tasks/{todo,in-progress,done,templates}
2. Create a task template at .tasks/templates/feature.md
3. Add 3 real tasks to .tasks/todo/
4. Decide: .gitignore or track in git?`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now have a systematic approach to understanding any codebase with Claude Code.
            You can explore architecture, trace data flows, analyze dependencies, and generate
            documentation — all skills that accelerate your ramp-up on new projects.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 4 — The Define → Plan → Iterate Workflow
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn the foundational workflow pattern that makes
              AI-assisted development productive and low-risk. We'll use the .tasks/ folder
              pattern to define tasks, plan implementations with Claude, and iterate safely.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Task files, the planning phase,
              clean contexts, implementation workflow, summarization, peer review pattern.
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
              onClick={() => onSelectTutorial(4)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Define → Plan → Iterate →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
