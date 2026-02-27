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

const meta = tutorials[7] // Tutorial 8 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'readme-generation', short: 'READMEs' },
  { id: 'api-docs', short: 'API Docs' },
  { id: 'adrs', short: 'ADRs' },
  { id: 'changelog', short: 'Changelogs' },
  { id: 'inline-comments', short: 'Comments' },
  { id: 'keeping-sync', short: 'Sync' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial8Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial8({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial8Props) {
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
            Handling Documentation
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
            Documentation is often treated as an afterthought — something you write after the code is done,
            if you remember. With Claude Code, documentation becomes a{' '}
            <strong className="text-[#e6edf3]">first-class artifact</strong> that's generated,
            maintained, and updated automatically as part of your workflow.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: '📖', label: 'READMEs', desc: 'Auto-generated from codebase analysis' },
              { icon: '🔌', label: 'API Docs', desc: 'From routes and schemas' },
              { icon: '🏛️', label: 'ADRs', desc: 'Document why, not just what' },
              { icon: '📝', label: 'Changelogs', desc: 'From Git history' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-4 text-center"
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
                desc: 'Generate READMEs, API docs, ADRs, changelogs, and keep them in sync',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-4, basic understanding of Git',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, TaskForge project',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Complete documentation suite for your project',
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

          <Callout type="info" title="Documentation as Code">
            Treating documentation as a first-class artifact means it's generated from code,
            version controlled, reviewed like code, and automatically updated when things change.
            This ensures docs are <strong>accurate</strong>, <strong>current</strong>,
            and <strong>useful</strong>.
          </Callout>
        </section>

        {/* AUTO-GENERATING READMES */}
        <section id="readme-generation">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Auto-Generating READMEs
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code can analyze your codebase and generate comprehensive README files that
            actually reflect what your project does. Not boilerplate — real, useful documentation.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Basic Prompt
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Analyze this project and generate a comprehensive README.md that includes:
  - Project overview and purpose
  - Installation instructions
  - Usage examples
  - Project structure
  - Configuration options
  - Development workflow
  - Contributing guidelines

  Base it on the actual code, not assumptions.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Generated README
          </h3>
          <CodeBlock
            lang="markdown"
            filename="README.md"
            code={`# TaskForge

A modern task management API built with FastAPI and PostgreSQL.

## Overview

TaskForge provides a RESTful API for managing tasks, projects, and user
assignments. It features JWT authentication, real-time updates via WebSockets,
and a comprehensive filtering system.

## Quick Start

\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
\`\`\`

The API will be available at http://localhost:8000
Docs available at http://localhost:8000/docs

## Project Structure

\`\`\`
app/
├── api/           # API routes and endpoints
│   ├── auth.py    # Authentication endpoints
│   ├── tasks.py   # Task CRUD operations
│   └── projects.py
├── models/        # SQLAlchemy models
├── schemas/       # Pydantic schemas
├── services/      # Business logic
└── main.py        # Application entry point
\`\`\`

## Key Features

- **JWT Authentication** - Secure token-based auth
- **Task Management** - CRUD operations with filtering
- **Project Organization** - Hierarchical project structure
- **WebSocket Updates** - Real-time task status changes
- **Advanced Filtering** - Query by status, assignee, date range

## API Endpoints

### Authentication
- \`POST /auth/login\` - Get JWT token
- \`POST /auth/register\` - Create new user

### Tasks
- \`GET /tasks\` - List tasks (with filters)
- \`POST /tasks\` - Create task
- \`GET /tasks/{id}\` - Get task details
- \`PATCH /tasks/{id}\` - Update task
- \`DELETE /tasks/{id}\` - Delete task

See full API documentation at /docs when running.

## Configuration

Environment variables in \`.env\`:

\`\`\`
DATABASE_URL=postgresql://user:pass@localhost/taskforge
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
\`\`\`

## Development

\`\`\`bash
# Run tests
pytest

# Type checking
mypy app/

# Linting
ruff check app/

# Format code
black app/
\`\`\`

## Contributing

1. Create a feature branch
2. Make changes with tests
3. Run linting and tests
4. Submit a pull request

See CONTRIBUTING.md for detailed guidelines.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Customizing the Output
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You can tailor the README to your audience:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt variations"
            code={`# For open source projects:
> Generate a README optimized for external contributors. Include:
  - Clear value proposition
  - Getting started in under 5 minutes
  - How to contribute
  - Code of conduct mention
  - License information

# For internal projects:
> Generate a README for the engineering team. Include:
  - Service dependencies
  - Deployment process
  - Monitoring and alerting
  - Runbook links
  - Team contacts

# For client projects:
> Generate a README for handoff to the client. Include:
  - Business context
  - Non-technical setup guide
  - Common troubleshooting
  - Support contacts`}
          />

          <Callout type="tip" title="Update with Changes">
            Add README generation to your Summarize phase. After implementing a feature,
            ask Claude to update the README to reflect the changes.
          </Callout>
        </section>

        {/* API DOCUMENTATION */}
        <section id="api-docs">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            API Documentation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code can extract API documentation from your routes, schemas, and docstrings,
            then format it for consumption — whether that's OpenAPI specs, Markdown docs,
            or Postman collections.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generate OpenAPI Documentation
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Analyze the API routes in app/api/ and generate an OpenAPI 3.0
  specification. Include:
  - All endpoints with methods
  - Request/response schemas from Pydantic models
  - Authentication requirements
  - Example requests and responses
  - Error responses

  Save it to docs/openapi.yaml`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generate Markdown API Reference
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Create a Markdown API reference at docs/api-reference.md based on
  the routes in app/api/. For each endpoint include:
  - HTTP method and path
  - Description
  - Query parameters
  - Request body schema
  - Response format
  - Example curl command

  Group by resource (auth, tasks, projects).`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example API Documentation Output
          </h3>
          <CodeBlock
            lang="markdown"
            filename="docs/api-reference.md"
            code={`# TaskForge API Reference

Base URL: \`http://localhost:8000\`

## Authentication

All endpoints except \`/auth/*\` require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## POST /auth/login

Authenticate a user and receive a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepass"
}
\`\`\`

**Response:** \`200 OK\`
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 3600
}
\`\`\`

**Errors:**
- \`401 Unauthorized\` - Invalid credentials
- \`422 Unprocessable Entity\` - Validation error

**Example:**
\`\`\`bash
curl -X POST http://localhost:8000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "securepass"}'
\`\`\`

---

## GET /tasks

Retrieve a list of tasks with optional filtering.

**Query Parameters:**
- \`status\` (optional) - Filter by status: todo, in_progress, done
- \`assignee_id\` (optional) - Filter by assigned user ID
- \`project_id\` (optional) - Filter by project ID
- \`limit\` (optional) - Max results (default: 50)
- \`offset\` (optional) - Pagination offset (default: 0)

**Response:** \`200 OK\`
\`\`\`json
{
  "tasks": [
    {
      "id": 1,
      "title": "Implement user auth",
      "description": "Add JWT authentication",
      "status": "in_progress",
      "assignee_id": 5,
      "project_id": 2,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-16T14:20:00Z"
    }
  ],
  "total": 45,
  "limit": 50,
  "offset": 0
}
\`\`\`

**Example:**
\`\`\`bash
curl -X GET "http://localhost:8000/tasks?status=in_progress&limit=10" \\
  -H "Authorization: Bearer <token>"
\`\`\`

---

## POST /tasks

Create a new task.

**Request Body:**
\`\`\`json
{
  "title": "Write API documentation",
  "description": "Document all API endpoints",
  "status": "todo",
  "assignee_id": 5,
  "project_id": 2
}
\`\`\`

**Response:** \`201 Created\`
\`\`\`json
{
  "id": 46,
  "title": "Write API documentation",
  "description": "Document all API endpoints",
  "status": "todo",
  "assignee_id": 5,
  "project_id": 2,
  "created_at": "2024-01-17T09:15:00Z",
  "updated_at": "2024-01-17T09:15:00Z"
}
\`\`\`

**Example:**
\`\`\`bash
curl -X POST http://localhost:8000/tasks \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Write API documentation", "status": "todo"}'
\`\`\``}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Adding Docstrings for Better Documentation
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude can also add or improve docstrings in your route handlers:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Add comprehensive docstrings to all route handlers in app/api/tasks.py
  following Google style. Include:
  - Summary line
  - Detailed description
  - Args with types
  - Returns with type
  - Raises for error cases
  - Example usage`}
          />

          <Callout type="warning" title="Keep Docs Near Code">
            The best API documentation lives in the code as docstrings and type hints.
            Claude can extract this into formatted docs, ensuring they stay in sync.
          </Callout>
        </section>

        {/* ARCHITECTURE DECISION RECORDS */}
        <section id="adrs">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Architecture Decision Records (ADRs)
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            ADRs document the <strong className="text-[#e6edf3]">why</strong> behind architectural
            choices. They capture context, alternatives considered, and tradeoffs — information
            that doesn't belong in code but is critical for future maintainers.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            ADR Template
          </h3>
          <CodeBlock
            lang="markdown"
            filename="docs/adr/001-use-postgresql.md"
            code={`# ADR 001: Use PostgreSQL as Primary Database

## Status
Accepted

## Context
We need to choose a database for TaskForge. Requirements:
- Support for complex queries (filtering, joins)
- ACID compliance for task assignments
- Good Python ecosystem support
- Scalable for future growth
- Team has SQL experience

## Decision
We will use PostgreSQL as the primary database.

## Alternatives Considered

### MongoDB
- **Pros:** Flexible schema, good for rapid prototyping
- **Cons:** Weaker consistency guarantees, team unfamiliar with Mongo
- **Why not chosen:** We need strong consistency for task assignments

### MySQL
- **Pros:** Widely used, good tooling, team knows it
- **Cons:** Weaker JSON support, less advanced features
- **Why not chosen:** PostgreSQL offers better JSON support which we need

### SQLite
- **Pros:** Zero config, embedded, simple
- **Cons:** Not suitable for multi-user production use
- **Why not chosen:** Won't scale for our needs

## Consequences

### Positive
- Strong consistency guarantees for critical operations
- Excellent query capabilities with indexes
- JSON column support for flexible metadata
- Rich ecosystem (SQLAlchemy, psycopg3, etc.)
- Team expertise available

### Negative
- More operational overhead than managed solutions like Supabase
- Requires proper connection pooling configuration
- Backup and maintenance responsibility

### Neutral
- Need to learn PostgreSQL-specific features (like full-text search)
- Migration tooling (Alembic) adds complexity

## Notes
- Started with SQLite for development, plan PostgreSQL for production
- Using SQLAlchemy ORM to keep database-agnostic where possible
- Consider read replicas if we scale beyond 10k users

## References
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQLAlchemy Best Practices](https://docs.sqlalchemy.org/en/14/orm/extensions/asyncio.html)
- Discussion thread: #34`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generating ADRs with Claude
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Create an ADR for our decision to use JWT for authentication instead
  of session-based auth. Save it to docs/adr/002-jwt-authentication.md

  Include:
  - Context: why we needed auth
  - Decision: use JWT
  - Alternatives: sessions, OAuth-only
  - Consequences: stateless, token management, refresh strategy

  Number it as ADR 002.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Write ADRs
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Architectural choices</strong> — Database,
                  framework, deployment platform
                </>,
                <>
                  <strong className="text-[#e6edf3]">Significant tradeoffs</strong> — When you
                  chose X over Y for important reasons
                </>,
                <>
                  <strong className="text-[#e6edf3]">Non-obvious decisions</strong> — Things that
                  might seem wrong but are intentional
                </>,
                <>
                  <strong className="text-[#e6edf3]">Standards & conventions</strong> — Why we
                  structure code a certain way
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="info" title="ADRs Are Immutable">
            ADRs are <strong>never edited</strong> after acceptance. If a decision changes,
            write a new ADR that supersedes the old one. This preserves the historical context.
          </Callout>
        </section>

        {/* CHANGELOG GENERATION */}
        <section id="changelog">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Changelog Generation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Changelogs communicate what changed between versions. Claude can generate them from
            Git history, commit messages, and PR descriptions — formatted for users, not developers.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Generate Changelog from Git History
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Generate a changelog entry for version 2.1.0 by analyzing Git commits
  from v2.0.0 to HEAD. Group changes into:
  - Added (new features)
  - Changed (modifications to existing features)
  - Fixed (bug fixes)
  - Removed (deprecated features)

  Write it in user-friendly language, not commit messages.
  Append to CHANGELOG.md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Changelog Output
          </h3>
          <CodeBlock
            lang="markdown"
            filename="CHANGELOG.md"
            code={`# Changelog

All notable changes to TaskForge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-01-17

### Added
- **Task filtering** - Filter tasks by status, assignee, and project (#45)
- **Search functionality** - Full-text search across task titles and descriptions (#47)
- **Bulk operations** - Update multiple tasks at once (#52)
- **Export to CSV** - Download task lists as CSV files (#48)

### Changed
- **Improved performance** - Task list queries now 3x faster with new indexes (#50)
- **Updated UI** - Refreshed task card design for better readability (#51)
- **API versioning** - All endpoints now support v1 prefix for future compatibility (#49)

### Fixed
- Task assignment emails not sending for some users (#46)
- Date filter showing incorrect results across timezones (#53)
- Memory leak in WebSocket connection handler (#54)

### Security
- Updated dependencies to patch security vulnerabilities

## [2.0.0] - 2024-01-03

### Added
- **WebSocket support** - Real-time task updates without polling (#38)
- **Project hierarchies** - Nest projects within other projects (#40)
- **Role-based permissions** - Admin, member, and viewer roles (#41)

### Changed
- **Breaking:** Authentication now requires JWT instead of API keys (#39)
- **Breaking:** Task status values changed from strings to enum (#42)

### Removed
- Legacy v0 API endpoints (deprecated in 1.8.0)

## [1.8.0] - 2023-12-15

...`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Changelog from PR Descriptions
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If you follow the Summarize pattern from Tutorial 4, you already have good PR descriptions:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Review all merged PRs since v2.0.0 and create a changelog entry for
  v2.1.0. Use the PR titles and descriptions, not raw commits.

  Extract user-facing changes only. Ignore refactorings, test updates,
  and internal improvements unless they impact users.`}
          />

          <Callout type="tip" title="Automate with Hooks">
            Add changelog generation to your release workflow. Before tagging a version,
            have Claude generate the changelog section automatically.
          </Callout>
        </section>

        {/* INLINE COMMENTS */}
        <section id="inline-comments">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Inline Comments
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Code comments are documentation at the source level. Claude can add them strategically —
            explaining <strong className="text-[#e6edf3]">why</strong>, not what, and only where needed.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Add Comments
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Non-obvious decisions</strong> — "Why did we do it this way?"
                </>,
                <>
                  <strong className="text-[#e6edf3]">Workarounds</strong> — Temporary fixes, awaiting library updates
                </>,
                <>
                  <strong className="text-[#e6edf3]">Performance optimizations</strong> — Code that's complex for speed
                </>,
                <>
                  <strong className="text-[#e6edf3]">Business logic</strong> — Domain-specific rules that aren't obvious
                </>,
                <>
                  <strong className="text-[#e6edf3]">Gotchas</strong> — Edge cases, order dependencies, subtle bugs
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Adding Strategic Comments
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Review app/services/task_service.py and add comments where:
  - The logic is non-obvious
  - There's a business rule being enforced
  - You're working around a limitation
  - Performance considerations were made

  Don't comment obvious code. Focus on the "why" not the "what".`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Good vs Bad Comments
          </h3>
          <CodeBlock
            lang="python"
            filename="Good and bad comments"
            code={`# ❌ BAD: Restates what the code does
# Set status to done
task.status = TaskStatus.DONE

# ✅ GOOD: Explains why
# Mark as done even if subtasks aren't complete. Per product requirement,
# parent tasks can be closed independently (see ADR-008)
task.status = TaskStatus.DONE


# ❌ BAD: Obvious
# Loop through tasks
for task in tasks:
    process(task)

# ✅ GOOD: Explains non-obvious constraint
# Process tasks sequentially to avoid race condition in assignment logic.
# Parallelizing this caused duplicate assignments in production (TASK-234)
for task in tasks:
    process(task)


# ❌ BAD: Too vague
# Handle edge case
if not task.assignee:
    task.assignee = default_user

# ✅ GOOD: Explains the edge case
# Unassigned tasks default to the project owner. This ensures they appear
# in someone's queue and don't get lost (product decision from Q4 retro)
if not task.assignee:
    task.assignee = project.owner`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Removing Outdated Comments
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Review comments in app/api/tasks.py and remove any that are:
  - Outdated (code changed but comment didn't)
  - Obvious (just restate what the code does)
  - Misleading (no longer accurate)

  Update comments that are still relevant but need clarification.`}
          />

          <Callout type="warning" title="Comments Rot">
            Comments age poorly. Prefer <strong>self-documenting code</strong> (clear names,
            small functions) over comments. Only comment what <strong>can't</strong> be expressed in code.
          </Callout>
        </section>

        {/* KEEPING DOCS IN SYNC */}
        <section id="keeping-sync">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Keeping Docs in Sync
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The biggest documentation problem isn't writing it — it's keeping it accurate as code changes.
            Integrate documentation updates into your workflow to ensure they stay current.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation in the Summarize Phase
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Extend the Summarize phase from Tutorial 4 to include documentation updates:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Summarize the changes for this task and update documentation:

  1. What code changed (for PR description)
  2. What documentation needs updating:
     - README.md if setup/usage changed
     - API docs if endpoints changed
     - CLAUDE.md if project conventions changed
     - ADR if architectural decision was made
  3. Update those docs accordingly
  4. Add changelog entry if this is user-facing`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            PR Checklist for Documentation
          </h3>
          <CodeBlock
            lang="markdown"
            filename="PR template"
            code={`## Changes
[Describe what changed]

## Documentation Updates
- [ ] README updated (if setup/usage changed)
- [ ] API docs updated (if endpoints changed)
- [ ] Comments added for non-obvious logic
- [ ] ADR created (if architectural decision made)
- [ ] Changelog entry added (if user-facing)
- [ ] CLAUDE.md updated (if conventions changed)

## Testing
- [ ] Tests pass
- [ ] Manual testing done`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation Audit
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Periodically audit documentation for accuracy:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Audit the documentation in docs/ and README.md:

  1. Check for outdated information (compare to current code)
  2. Find broken links
  3. Identify missing documentation for new features
  4. Flag contradictions between different docs

  Create a task file for fixing the issues found.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Automated Documentation Checks
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Create a pre-commit hook that checks:
  - All public API functions have docstrings
  - README examples are syntactically valid
  - API docs match actual route definitions

  Use the hooks system from Tutorial 5.`}
          />

          <Callout type="info" title="Docs as Part of Definition">
            Make documentation updates part of the task definition. In the acceptance criteria,
            include "Documentation updated" as a checkbox. This ensures it's never forgotten.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Generate Full Docs for TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's generate a complete documentation suite for TaskForge.
          </p>

          <AppSelector />

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Generate the README
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  code: `cd taskforge-tutorial/nextjs
claude`,
                },
                fastapi: {
                  code: `cd taskforge-tutorial/fastapi
claude`,
                },
              }}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Analyze this project and generate a comprehensive README.md that includes:
  - Project overview and purpose
  - Quick start instructions
  - Project structure
  - Key features
  - API endpoints summary
  - Configuration options
  - Development workflow
  - Contributing guidelines

  Base it on the actual codebase.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Create API Documentation
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a detailed API reference at docs/api-reference.md by analyzing
  the routes in app/api/. For each endpoint include:
  - HTTP method and path
  - Description
  - Authentication requirements
  - Request parameters and body
  - Response format
  - Example curl command

  Group by resource type.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Create Architecture Documentation
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create docs/architecture.md documenting:
  - System overview diagram (in Mermaid)
  - Layer descriptions (API, services, models)
  - Data flow for key operations
  - Authentication flow
  - Database schema overview
  - External dependencies

  Keep it high-level but accurate.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Create an ADR
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  lang: 'text',
                  filename: 'Prompt',
                  code: `> Create an ADR documenting why we chose Next.js App Router over Pages Router.
  Save it to docs/adr/001-use-nextjs-app-router.md

  Include:
  - Context: what we needed from a React framework
  - Decision: use Next.js 15 App Router
  - Alternatives: Pages Router, Remix, Vite + React Router
  - Consequences: server components, streaming, improved caching

  Use the ADR template format.`,
                },
                fastapi: {
                  lang: 'text',
                  filename: 'Prompt',
                  code: `> Create an ADR documenting why we chose FastAPI over Flask/Django.
  Save it to docs/adr/001-use-fastapi.md

  Include:
  - Context: what we needed from a web framework
  - Decision: use FastAPI
  - Alternatives: Flask, Django
  - Consequences: async support, type safety, auto docs

  Use the ADR template format.`,
                },
              }}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Initialize a Changelog
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a CHANGELOG.md following the Keep a Changelog format.
  Initialize it with version 1.0.0 listing the current feature set.

  Group features into: Added, Changed, Fixed, Removed sections.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Create a Documentation Index
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create docs/README.md as an index for all documentation:
  - Link to each doc with a brief description
  - Organize by category (Getting Started, API, Architecture, etc.)
  - Include when to read each doc

  Make it easy to navigate the documentation.`}
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
              Exercise 1: Document Your Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Generate a complete documentation suite for a project you're working on:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Start with README.md (overview, setup, usage)',
                  'Add API documentation if applicable',
                  'Create architecture.md documenting key design decisions',
                  'Write an ADR for a significant architectural choice',
                  'Initialize a CHANGELOG.md',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Create an ADR Template
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a reusable ADR template for your team:
            </p>
            <CodeBlock
              code={`# Create docs/adr/template.md with your preferred ADR structure
# Include sections relevant to your project's needs
# Add instructions for when to create ADRs
# Share with your team and document in CLAUDE.md`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Documentation Update Command
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a slash command that updates documentation after changes:
            </p>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a slash command /update-docs that:
  1. Analyzes recent Git changes
  2. Identifies what documentation needs updating
  3. Updates README, API docs, and changelog
  4. Reports what was changed

  Use the commands system from Tutorial 5.`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now know how to generate and maintain documentation as a first-class development
            artifact. Documentation becomes an output of your workflow, not an afterthought.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #d2992220)',
              border: '1px solid #d2992250',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#d29922]">
              Up Next: Tutorial 9 — Token Optimization & Context Management
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn strategies for managing Claude's context window
              effectively. Understand token budgets, context pruning, and techniques for maintaining
              productive all-day sessions without hitting limits.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Token budgets, context
              window management, strategic file reading, checkpoint usage, clean context patterns,
              multi-session workflows.
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
              onClick={() => onSelectTutorial(9)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Token Optimization →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
