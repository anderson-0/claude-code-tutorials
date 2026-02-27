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

const meta = tutorials[1] // Tutorial 2 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'what-is', short: 'What Is It?' },
  { id: 'init', short: 'Using /init' },
  { id: 'anatomy', short: 'Anatomy' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'subdirectory', short: 'Subdirectories' },
  { id: 'iterating', short: 'Iterating' },
  { id: 'anti-patterns', short: 'Anti-Patterns' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'troubleshoot', short: 'Troubleshoot' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial2Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial2({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial2Props) {
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
            <span className="text-xs text-[#8b949e]">30-45 min</span>
            <span className="text-xs text-[#484f58]">·</span>
            <span className="text-xs text-[#8b949e]">Tutorial {meta.id} of {tutorials.length}</span>
          </div>
          <h1 className="mb-2.5 text-[34px] font-extrabold leading-tight text-[#e6edf3]">
            CLAUDE.md — Teaching Claude About Your Project
          </h1>
          <p className="text-[17px] leading-snug text-[#8b949e]">
            Write the single most impactful file for Claude Code productivity. Learn to create, structure, and maintain your project's CLAUDE.md.
          </p>
        </div>

        {/* OVERVIEW */}
        <section id="overview">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Overview
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If there's one thing you do after installing Claude Code, it should be creating a{' '}
            <strong className="text-[#e6edf3]">CLAUDE.md</strong> file. This single file transforms
            Claude from a generic AI assistant into a knowledgeable team member who understands your
            project's architecture, conventions, and quirks.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3.5">
            <div className="rounded-[10px] border border-[#f8514930] bg-[#2d121530] p-[18px]">
              <div className="mb-2.5 text-xs font-bold tracking-wide text-[#f85149]">
                WITHOUT CLAUDE.md
              </div>
              <div className="text-[13px] leading-relaxed text-[#8b949e]">
                Claude guesses at your conventions → Uses wrong patterns → Misses build commands →
                You spend time correcting its mistakes
              </div>
            </div>
            <div className="rounded-[10px] border border-[#23863650] bg-[#0e291780] p-[18px]">
              <div className="mb-2.5 text-xs font-bold tracking-wide text-[#3fb950]">
                WITH CLAUDE.md
              </div>
              <div className="text-[13px] leading-relaxed text-[#c9d1d9]">
                Claude knows your stack → Follows your patterns → Runs the right commands →
                Produces code that fits naturally into your codebase
              </div>
            </div>
          </div>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Create CLAUDE.md, use /init, structure sections, maintain over time',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorial 1 completed, Claude Code installed, any project to work with',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, your project codebase, optionally TaskForge starter',
              },
              {
                icon: '📦',
                title: 'Series project',
                desc: "We'll write CLAUDE.md for TaskForge as a hands-on exercise",
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
        </section>

        {/* WHAT IS CLAUDE.MD */}
        <section id="what-is">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What Is CLAUDE.md?
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            <strong className="text-[#e6edf3]">CLAUDE.md</strong> is a markdown file in your project root
            that Claude Code reads automatically at the start of every session. It's your project's
            documentation — specifically written for Claude to understand.
          </p>

          <Callout type="info" title="Think of it like an onboarding doc">
            CLAUDE.md is the document you'd give a new developer on their first day. What does
            the app do? How is it structured? How do I run it? What patterns should I follow?
            What mistakes should I avoid?
          </Callout>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            How It Works
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>When you start a session with <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">claude</code>, Claude Code automatically reads <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">CLAUDE.md</code> from your working directory</>,
                <>The content becomes part of Claude's context — it "knows" everything in that file</>,
                <>Claude references this knowledge when reading your code, writing new code, and running commands</>,
                <>You can update CLAUDE.md anytime — changes take effect in the next session</>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Why It Matters
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Without CLAUDE.md, Claude Code has to infer everything from your code alone.
            It might figure out you're using React, but it won't know:
          </p>
          <div className="my-3">
            {bullet(
              [
                'Your preferred component patterns (functional vs class, hooks organization)',
                'That you use pnpm instead of npm, or bun instead of node',
                'Your testing commands and expected coverage thresholds',
                'Architectural decisions like "we never put business logic in components"',
                'Team conventions like "always use TypeScript strict mode" or "avoid any"',
              ],
              '#d29922'
            )}
          </div>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            CLAUDE.md makes all of this explicit, so Claude produces code that fits your project from the start.
          </p>
        </section>

        {/* USING /INIT */}
        <section id="init">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Using /init
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The fastest way to get started is with the <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#d2a8ff]">/init</code> command.
            Claude Code scans your codebase and generates a starter CLAUDE.md automatically.
          </p>

          <CodeBlock
            filename="Terminal"
            code={`# Navigate to your project
cd your-project

# Start Claude Code
claude

# Run the init command
> /init`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            What /init Produces
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude analyzes your project structure, package files, configs, and source code to generate:
          </p>
          <div className="my-3">
            {bullet(
              [
                'Project overview based on README, package.json, or other metadata',
                'Tech stack detection (framework, language, database, key libraries)',
                'Directory structure summary',
                'Build, test, and lint commands from package.json or equivalent',
                'Basic coding conventions inferred from existing code',
              ],
              '#3fb950'
            )}
          </div>

          <Callout type="warning" title="Always Review the Output">
            The auto-generated CLAUDE.md is a starting point, not a finished product. It may miss
            important context or include outdated information. Always review and improve it.
          </Callout>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example /init Output
          </h3>
          <CodeBlock
            lang="markdown"
            filename="CLAUDE.md (auto-generated)"
            code={`# CLAUDE.md

## Project Overview
TaskForge is a project management application built with Next.js 15.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** Prisma + SQLite
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** NextAuth.js

## Commands
\`\`\`bash
npm run dev      # Start development server
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Lint code
\`\`\`

## Directory Structure
\`\`\`
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── lib/           # Utility functions
└── server/        # Server-side code
\`\`\`
`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This is useful but incomplete. Let's see how to make it great.
          </p>
        </section>

        {/* ANATOMY */}
        <section id="anatomy">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Anatomy of a Great CLAUDE.md
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A well-structured CLAUDE.md has distinct sections, each serving a purpose. Here's the
            recommended structure:
          </p>

          <Accordion title="1. Project Overview" defaultOpen={true}>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              2-3 sentences explaining what the app does and who it's for. Keep it high-level.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Project Overview
TaskForge is a project management application for small teams. It provides
task tracking, project organization, and team collaboration features.
Think "simplified Jira" or "Linear-lite."`}
            />
          </Accordion>

          <Accordion title="2. Tech Stack">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              List the framework, language, database, and key libraries. Be specific about versions
              when they matter.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Tech Stack
- **Framework:** Next.js 15 (App Router, NOT Pages Router)
- **Language:** TypeScript 5.3+ (strict mode)
- **Database:** Prisma ORM + SQLite (dev), PostgreSQL (prod)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Auth:** NextAuth.js with credentials provider
- **State:** React Query (TanStack Query) for server state
- **Testing:** Jest + React Testing Library`}
            />
          </Accordion>

          <Accordion title="3. Architecture / Directory Structure">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Show the project structure as a tree. Call out key directories and what goes where.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Architecture

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-related routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components (don't edit directly)
│   └── features/          # Feature-specific components
├── lib/
│   ├── db.ts              # Prisma client singleton
│   ├── auth.ts            # NextAuth config
│   └── utils.ts           # Utility functions
├── server/
│   ├── actions/           # Server actions
│   └── queries/           # Database queries
└── types/                 # TypeScript types
\`\`\`

### Key Architectural Decisions
- Server Components by default; use "use client" only when needed
- Server Actions for mutations, not API routes
- All database access goes through /server/queries/`}
            />
          </Accordion>

          <Accordion title="4. Build/Test/Lint Commands">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Every command Claude might need to run. Be explicit — don't assume Claude knows your aliases.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Commands

\`\`\`bash
# Development
npm run dev              # Start dev server at localhost:3000

# Database
npx prisma db push      # Push schema changes to SQLite
npx prisma generate     # Regenerate Prisma client
npx prisma studio       # Open Prisma Studio GUI
npm run seed            # Seed database with test data

# Testing
npm test                # Run all tests
npm test -- --watch     # Watch mode
npm run test:coverage   # With coverage report

# Build & Lint
npm run build           # Production build (runs type check first)
npm run lint            # ESLint
npm run lint:fix        # ESLint with auto-fix
npm run typecheck       # TypeScript check only
\`\`\``}
            />
          </Accordion>

          <Accordion title="5. Coding Conventions">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Explicit rules Claude should follow. These prevent common mistakes.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Coding Conventions

### TypeScript
- Always use explicit types; avoid \`any\`
- Prefer interfaces over types for object shapes
- Use \`unknown\` over \`any\` when type is truly unknown

### Components
- One component per file; filename matches component name
- Props interface named \`{ComponentName}Props\`
- Export component as named export, not default

### Imports
- Use absolute imports: \`@/components/...\` not \`../../../components\`
- Order: React, external libs, internal modules, types, styles

### Naming
- Components: PascalCase (TaskCard.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: SCREAMING_SNAKE_CASE
- Database fields: snake_case (Prisma handles conversion)`}
            />
          </Accordion>

          <Accordion title="6. Common Patterns">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Show how things are typically done in this codebase. Examples are powerful.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Common Patterns

### Creating a New API Route
\`\`\`typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... implementation
}
\`\`\`

### Adding a Server Action
\`\`\`typescript
// src/server/actions/tasks.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createTask(data: CreateTaskInput) {
  const task = await db.task.create({ data })
  revalidatePath('/dashboard/tasks')
  return task
}
\`\`\``}
            />
          </Accordion>

          <Accordion title="7. Rules (Do's and Don'ts)">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Explicit constraints. What Claude should always or never do.
            </p>
            <CodeBlock
              lang="markdown"
              code={`## Rules

### Always
- Run \`npm run lint\` after making changes
- Add tests for new features
- Use Server Components unless client interactivity is needed
- Handle loading and error states

### Never
- Use \`any\` type
- Commit directly to main branch
- Store secrets in code (use environment variables)
- Modify shadcn/ui components in /components/ui/ directly

### Error Handling
- API routes: Return appropriate HTTP status codes
- Server actions: Throw errors; caught by error boundaries
- Client: Use React Query's error handling`}
            />
          </Accordion>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Complete Example: TaskForge CLAUDE.md
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Here's a complete CLAUDE.md for the TaskForge project. Select your track to see the relevant example:
          </p>

          <AppSelector />

          <DynamicCodeBlock
            showTrackIndicator
            content={{
              nextjs: {
                lang: 'markdown',
                filename: 'taskforge/nextjs/CLAUDE.md',
                code: `# CLAUDE.md — TaskForge (Next.js)

## Project Overview
TaskForge is a project management app for small teams. Features include
projects, tasks, comments, labels, and a dashboard. Built as a learning
companion for the Claude Code Tutorial Series.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3+ (strict mode)
- **Database:** Prisma + SQLite
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** NextAuth.js (credentials provider)
- **Testing:** Jest + React Testing Library

## Commands
\`\`\`bash
npm run dev           # Dev server (localhost:3000)
npm run build         # Production build
npm run test          # Run tests
npm run lint          # Lint code
npx prisma db push    # Push schema changes
npm run seed          # Seed database
\`\`\`

## Directory Structure
\`\`\`
src/
├── app/              # App Router pages & API routes
├── components/       # React components
│   ├── ui/          # shadcn/ui (don't modify)
│   └── features/    # Feature components
├── lib/             # Utilities (db, auth, etc.)
├── server/          # Server actions & queries
└── types/           # TypeScript types
prisma/
├── schema.prisma    # Database schema
└── seed.ts          # Seed script
\`\`\`

## Conventions
- Server Components by default; \`use client\` only when needed
- Server Actions for mutations (not API routes)
- Absolute imports: \`@/components/...\`
- One component per file; named exports

## Rules
- Always run \`npm run lint\` after changes
- Never use \`any\` type
- Never modify /components/ui/ directly
- Always handle loading and error states

## Test Users
| Email | Password | Role |
|-------|----------|------|
| admin@taskforge.dev | password123 | Admin |
| alice@taskforge.dev | password123 | Member |`,
              },
              fastapi: {
                lang: 'markdown',
                filename: 'taskforge/fastapi/CLAUDE.md',
                code: `# CLAUDE.md — TaskForge (FastAPI)

## Project Overview
TaskForge is a project management API for small teams. Features include
projects, tasks, comments, labels, and dashboard endpoints. Built as a
learning companion for the Claude Code Tutorial Series.

## Tech Stack
- **Framework:** FastAPI 0.110+
- **Language:** Python 3.12+
- **Database:** SQLAlchemy 2.0 + SQLite
- **Migrations:** Alembic
- **Validation:** Pydantic v2
- **Auth:** JWT with python-jose
- **Testing:** pytest + httpx

## Commands
\`\`\`bash
# Start dev server
uvicorn app.main:app --reload

# Database
alembic upgrade head     # Run migrations
python -m app.seed       # Seed database

# Testing
pytest                   # Run all tests
pytest -v               # Verbose
pytest --cov=app        # With coverage

# Linting
ruff check .            # Lint
ruff format .           # Format
mypy app/               # Type check
\`\`\`

## Directory Structure
\`\`\`
app/
├── main.py            # FastAPI app entry
├── routers/           # API route handlers
├── models/            # SQLAlchemy models
├── schemas/           # Pydantic schemas
├── services/          # Business logic
├── dependencies.py    # Dependency injection
└── database.py        # DB connection
alembic/
└── versions/          # Migration files
tests/
└── ...                # Test files
\`\`\`

## Conventions
- Routers: one file per resource (projects.py, tasks.py)
- Schemas: Input + Output schemas per resource
- Services: Business logic separate from routes
- Dependencies: Use FastAPI's Depends() for injection

## Rules
- Always run \`ruff check .\` after changes
- Type hints on all functions
- Docstrings on all public functions
- Never store secrets in code (use .env)

## Test Users
| Email | Password | Role |
|-------|----------|------|
| admin@taskforge.dev | password123 | Admin |
| alice@taskforge.dev | password123 | Member |`,
              },
            }}
          />
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Write TaskForge's CLAUDE.md
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice by creating a CLAUDE.md for TaskForge. We'll start with /init and
            progressively improve it.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Clone TaskForge
            </h3>
            <DynamicCodeBlock
              showInlineSwitcher
              content={{
                nextjs: {
                  code: `# Clone the starter repo
git clone https://github.com/lumenalta/taskforge-tutorial.git
cd taskforge-tutorial/nextjs

# Install dependencies
npm install

# Start development server
npm run dev`,
                },
                fastapi: {
                  code: `# Clone the starter repo
git clone https://github.com/lumenalta/taskforge-tutorial.git
cd taskforge-tutorial/fastapi

# Create virtual environment and install
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -e ".[dev]"

# Start development server
uvicorn app.main:app --reload`,
                },
              }}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Generate with /init
            </h3>
            <CodeBlock
              code={`# Start Claude Code
claude

# Generate initial CLAUDE.md
> /init`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Claude will scan the project and create a starter CLAUDE.md. Review what it generated.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Improve Each Section
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Work through each section with Claude. Use prompts like:
            </p>
            <CodeBlock
              lang="text"
              filename="Prompts to try"
              code={`> The project overview is too vague. Make it more specific about what TaskForge does.

> Add a section showing the directory structure with explanations of key directories.

> Add a "Coding Conventions" section based on patterns you see in the existing code.

> What commands would a developer need to run? Add a Commands section.

> Add a "Common Patterns" section with examples of how API routes are typically written.

> What rules should developers follow? Create a "Rules" section with do's and don'ts.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Test It
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Start a fresh session and ask Claude to do something. Does it follow your conventions?
            </p>
            <CodeBlock
              lang="text"
              filename="Test prompts"
              code={`# Exit and restart to load the updated CLAUDE.md
> /exit
$ claude

# Test with a real task
> Add a new API endpoint to get all tasks for a specific project.
  Follow the patterns in the codebase.

# Check if Claude:
# - Used the correct file locations
# - Followed your naming conventions
# - Applied your coding standards
# - Ran the commands you specified`}
            />
          </div>

          <Callout type="tip" title="Iterate Based on Mistakes">
            When Claude makes a mistake, that's valuable feedback. Add a rule to CLAUDE.md to
            prevent it next time. "Always use the repository pattern for database queries"
            or "Never use inline SQL."
          </Callout>
        </section>

        {/* SUBDIRECTORY */}
        <section id="subdirectory">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Subdirectory CLAUDE.md Files
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            For larger projects or monorepos, you can place additional CLAUDE.md files in subdirectories.
            These <strong className="text-[#e6edf3]">append to</strong> (not replace) the root CLAUDE.md.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            How It Works
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>When Claude reads files in <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">src/components/</code>, it also loads <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">src/components/CLAUDE.md</code> if it exists</>,
                'Subdirectory context is additive — it provides extra context for that area',
                'Useful for monorepos with distinct packages or areas with complex conventions',
                "Keep subdirectory files focused on that directory's specific patterns",
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Monorepo Structure
          </h3>
          <CodeBlock
            lang="text"
            code={`taskforge/
├── CLAUDE.md                    # Root: project overview, shared conventions
├── packages/
│   ├── web/
│   │   ├── CLAUDE.md           # Web app specific: Next.js patterns, components
│   │   └── src/
│   ├── api/
│   │   ├── CLAUDE.md           # API specific: FastAPI patterns, endpoints
│   │   └── app/
│   └── shared/
│       ├── CLAUDE.md           # Shared lib: utilities, types
│       └── src/`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Component Directory Context
          </h3>
          <CodeBlock
            lang="markdown"
            filename="src/components/CLAUDE.md"
            code={`# Components Directory

## Structure
- /ui/ — shadcn/ui components (do NOT modify directly)
- /features/ — Feature-specific components (TaskCard, ProjectList, etc.)
- /layout/ — Layout components (Header, Sidebar, etc.)

## Component Pattern
All components in this directory should:
1. Be functional components with TypeScript
2. Use named exports (not default)
3. Have Props interface named {ComponentName}Props
4. Use Tailwind for styling (no CSS modules)

## Example
\`\`\`tsx
// TaskCard.tsx
interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  // ...
}
\`\`\``}
          />

          <Callout type="info" title="When to Use Subdirectory Files">
            Use subdirectory CLAUDE.md when an area has patterns or rules that don't apply
            to the whole project. Don't overuse — one good root CLAUDE.md is often enough.
          </Callout>
        </section>

        {/* ITERATING */}
        <section id="iterating">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Iterating Over Time
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            CLAUDE.md is a <strong className="text-[#e6edf3]">living document</strong>, not a one-time
            setup. The best CLAUDE.md files evolve as the project grows.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Update
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">New patterns emerge</strong> — Added a new
                  way of doing things? Document it so Claude follows it.
                </>,
                <>
                  <strong className="text-[#e6edf3]">Architecture changes</strong> — Reorganized
                  directories? Updated the structure section.
                </>,
                <>
                  <strong className="text-[#e6edf3]">Claude keeps making the same mistake</strong> —
                  Add a rule to prevent it: "Never use X, always use Y."
                </>,
                <>
                  <strong className="text-[#e6edf3]">New tools added</strong> — Added a test
                  framework or linter? Document the commands.
                </>,
                <>
                  <strong className="text-[#e6edf3]">Team conventions evolve</strong> — Coding
                  standards changed? Update the conventions section.
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Make It Part of Your Workflow
          </h3>
          <CodeBlock
            lang="markdown"
            filename="PR Checklist"
            code={`## Before Merging
- [ ] Tests pass
- [ ] Lint clean
- [ ] CLAUDE.md updated (if patterns/architecture changed)`}
          />

          <Callout type="tip" title="Review CLAUDE.md Monthly">
            Set a reminder to review your CLAUDE.md monthly. Remove outdated info, add new patterns,
            and keep it aligned with how the project actually works.
          </Callout>
        </section>

        {/* ANTI-PATTERNS */}
        <section id="anti-patterns">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Anti-Patterns
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Common mistakes that make CLAUDE.md less effective:
          </p>

          <div className="my-4">
            {[
              {
                title: 'Too Much Context',
                problem: 'Dumping entire documentation, API specs, or long tutorials.',
                fix: 'Keep it concise. Link to external docs instead of copying them.',
                color: '#f85149',
              },
              {
                title: 'Too Vague',
                problem: '"Use good practices" or "Write clean code" — meaningless to Claude.',
                fix: 'Be specific: "Use TypeScript strict mode. Never use any. Always add error handling."',
                color: '#f85149',
              },
              {
                title: 'Outdated Information',
                problem: 'Commands that no longer work, removed directories, deprecated patterns.',
                fix: 'Review and update regularly. Remove anything that\'s no longer true.',
                color: '#f85149',
              },
              {
                title: 'Missing Commands',
                problem: 'Claude can\'t build, test, or lint because those commands aren\'t documented.',
                fix: 'Include every command a developer would need. Be exhaustive.',
                color: '#f85149',
              },
              {
                title: 'Describing the Obvious',
                problem: 'Explaining what every file does when Claude can just read the code.',
                fix: 'Focus on conventions and patterns, not file-by-file descriptions.',
                color: '#f85149',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="my-3 rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 font-semibold" style={{ color: item.color }}>
                  ❌ {item.title}
                </div>
                <div className="mb-2 text-[13px] text-[#8b949e]">
                  <strong className="text-[#c9d1d9]">Problem:</strong> {item.problem}
                </div>
                <div className="text-[13px] text-[#8b949e]">
                  <strong className="text-[#3fb950]">Fix:</strong> {item.fix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Write CLAUDE.md for Your Own Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Take a project you're currently working on and create a comprehensive CLAUDE.md.
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Navigate to your project: cd your-project
2. Start Claude Code: claude
3. Run /init to generate a starter
4. Review the output — what's missing? What's wrong?
5. Improve each section using the anatomy guide above
6. Test: exit and restart, then ask Claude to add a feature
7. Did it follow your conventions? If not, add rules.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Improve an Existing CLAUDE.md
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              If your project already has a CLAUDE.md, review and improve it.
            </p>
            <CodeBlock
              lang="text"
              filename="Checklist"
              code={`□ Does it have a clear project overview?
□ Is the tech stack complete and accurate?
□ Are all commands documented (dev, build, test, lint)?
□ Does it describe the directory structure?
□ Are coding conventions explicit?
□ Are there examples of common patterns?
□ Are there clear rules (do's and don'ts)?
□ Is anything outdated or no longer accurate?
□ Is it concise (not dumping documentation)?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Before/After Comparison
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Test how CLAUDE.md affects Claude's behavior.
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Rename CLAUDE.md temporarily: mv CLAUDE.md CLAUDE.md.bak
2. Start Claude Code and ask it to add a feature
3. Note what conventions it uses (or doesn't use)
4. Restore CLAUDE.md: mv CLAUDE.md.bak CLAUDE.md
5. Restart Claude and ask for the same feature
6. Compare the output — is it more aligned with your project?`}
            />
          </div>
        </section>

        {/* TROUBLESHOOTING */}
        <section id="troubleshoot">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Troubleshooting
          </h2>

          <Accordion title="Claude Ignores CLAUDE.md Instructions">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Check these common issues:
            </p>
            <div className="my-2">
              {bullet(
                [
                  <>Is the file named exactly <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">CLAUDE.md</code> (uppercase)? Not <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">claude.md</code> or <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">Claude.md</code>.</>,
                  'Is it in the project root (the directory where you run claude)?',
                  'Did you start a new session after updating it? (Changes require a new session)',
                  'Are your rules specific enough? "Be careful" is vague; "Never use any" is clear.',
                ],
                '#d29922'
              )}
            </div>
          </Accordion>

          <Accordion title="Context Too Large">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              If CLAUDE.md is too long, it wastes context tokens:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Remove redundant information (don\'t describe what\'s obvious from code)',
                  'Link to external docs instead of copying them',
                  'Use subdirectory CLAUDE.md files to distribute context',
                  'Focus on patterns and rules, not exhaustive descriptions',
                ],
                '#d29922'
              )}
            </div>
          </Accordion>

          <Accordion title="Claude Still Makes Mistakes">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              When Claude keeps making the same mistake:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Add an explicit rule: "Never do X. Always do Y instead."',
                  'Provide an example of the correct pattern',
                  'Make the rule more specific — what exactly should Claude do?',
                  'Check if there\'s conflicting guidance elsewhere in CLAUDE.md',
                ],
                '#d29922'
              )}
            </div>
          </Accordion>

          <Accordion title="/init Produces Poor Results">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              If auto-generation isn't helpful:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Your project may lack standard markers (package.json, requirements.txt)',
                  'Write CLAUDE.md manually instead — the template above is your guide',
                  'Use /init output as a starting point, then heavily edit',
                  'Small or unusual projects often need manual CLAUDE.md creation',
                ],
                '#d29922'
              )}
            </div>
          </Accordion>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now know how to create the single most impactful file for Claude Code productivity.
            A well-written CLAUDE.md transforms Claude from a generic assistant into a knowledgeable
            collaborator who understands your project.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #0e291780)',
              border: '1px solid #23863650',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#3fb950]">
              Up Next: Tutorial 3 — Project Onboarding
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn to use Claude Code as your onboarding partner when
              joining a new project or inheriting legacy code. We'll explore prompts for understanding
              architecture, tracing data flows, and generating initial documentation.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Codebase exploration, architecture
              mapping, data flow tracing, dependency analysis, documentation generation, the .tasks/
              folder pattern.
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
              onClick={() => onSelectTutorial(3)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Project Onboarding →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
