# TaskForge — Tutorial Companion Project
## A Project Management App for the Claude Code Learning Path

---

## Why "TaskForge"?

The sample project needs to satisfy competing requirements:

1. **Simple enough** that beginners aren't overwhelmed by domain complexity
2. **Complex enough** to exercise all 17 tutorials (subagents, agent teams, MCP, refactoring, etc.)
3. **Relatable** — every developer understands project/task management
4. **Two independent tracks** (Next.js and FastAPI) that can be learned separately
5. **Intentionally imperfect** — the starter code has rough edges that tutorials progressively improve

TaskForge is a lightweight project management tool — think a simplified Linear/Jira. It's the kind of app Lumenalta developers interact with daily, so the domain needs zero explanation.

---

## The App: TaskForge

### Core Features (Starter Code — What Ships in the Repo)

| Feature | Description |
|---|---|
| **Projects** | Create/list/archive projects with name, description, status |
| **Tasks** | CRUD for tasks with title, description, status (todo/in-progress/done), priority, assignee |
| **Comments** | Threaded comments on tasks |
| **Users** | Basic auth (email/password), roles (admin, member, viewer) |
| **Labels/Tags** | Categorize tasks with colored labels |
| **Dashboard** | Simple overview: task counts by status, recent activity |

### Features Added During Tutorials (Progressive Enhancement)

| Tutorial | Feature Added | Why It Exercises the Tutorial |
|---|---|---|
| **T3: Onboarding** | *None — learners explore the existing code* | Claude maps the architecture, generates docs |
| **T4: Define→Plan→Iterate** | **Task filtering & search** | A real feature built using the workflow pattern |
| **T5: Rules/Commands/Skills** | **Custom slash commands** for the project (e.g., `/review-pr`, `/run-tests`) | Learners build their own Claude Code extensions |
| **T6: Prompt Engineering** | **Task dependencies** (blocked-by relationships) | Requires multi-file changes with clear acceptance criteria |
| **T7: Refactoring** | **Extract shared API client** (Next.js) or **refactor DB layer to repository pattern** (FastAPI) | Real refactor across multiple files |
| **T8: Documentation** | **Auto-generate API docs, README, ADRs** | Claude writes docs for the codebase |
| **T9: Token Optimization** | **Notifications system** (in-app + email stubs) | Larger feature that requires context management strategy |
| **T10: AI-Native** | **Activity feed / audit log** | Design it "agent-first" from scratch |
| **T11: Safe Delivery** | **All prior features via proper Git workflow** | Commits, PRs, branch strategy with Claude |
| **T12: MCP Servers** | **GitHub integration** (link tasks to PRs/issues) | Real MCP server usage |
| **T13: Subagents** | **Create code-reviewer, test-writer, and doc-generator subagents** | Subagents specialized for TaskForge |
| **T14: Supervisor** | **Build a spec→architect→implement→test pipeline** | Multi-stage pipeline for a new feature (e.g., **time tracking**) |
| **T15: Agent Teams** | **Sprint planning feature** (multi-agent build: frontend + backend + tests in parallel) | Agent teams building a real feature together |
| **T16: Ralph** | **Autonomous bug-fix loop** from a backlog of seeded issues | Ralph loop works through a queue of pre-written bug tickets |
| **T17: Plugins** | **Package TaskForge's subagents as a distributable plugin** | Shareable Claude Code plugin |

---

## Repo Structure

```
taskforge/
├── README.md
├── CLAUDE.md                      # Pre-written (learners improve it in T2)
│
├── nextjs/                        # 🟦 Next.js Track
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma          # SQLite for simplicity
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx       # Project list
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx   # Project detail + task board
│   │   │   │       └── tasks/
│   │   │   │           └── [taskId]/page.tsx
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   └── api/               # Route handlers
│   │   │       ├── projects/
│   │   │       ├── tasks/
│   │   │       ├── comments/
│   │   │       └── auth/
│   │   ├── components/
│   │   │   ├── ui/                # Shared UI (buttons, cards, modals)
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskBoard.tsx      # Kanban-style columns
│   │   │   ├── ProjectList.tsx
│   │   │   └── CommentThread.tsx
│   │   ├── lib/
│   │   │   ├── db.ts              # Prisma client
│   │   │   ├── auth.ts            # Auth utilities
│   │   │   └── types.ts           # Shared TypeScript types
│   │   └── styles/
│   │       └── globals.css        # Tailwind
│   └── tests/
│       ├── api/                   # API route tests
│       └── components/            # Component tests
│
├── fastapi/                       # 🟩 FastAPI Track
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── .env.example
│   ├── alembic/
│   │   └── versions/              # DB migrations
│   ├── app/
│   │   ├── main.py                # FastAPI app + CORS
│   │   ├── config.py              # Settings (pydantic-settings)
│   │   ├── database.py            # SQLAlchemy engine + session
│   │   ├── models/                # SQLAlchemy models
│   │   │   ├── project.py
│   │   │   ├── task.py
│   │   │   ├── comment.py
│   │   │   ├── user.py
│   │   │   └── label.py
│   │   ├── schemas/               # Pydantic schemas
│   │   │   ├── project.py
│   │   │   ├── task.py
│   │   │   ├── comment.py
│   │   │   └── user.py
│   │   ├── routers/               # API routes
│   │   │   ├── projects.py
│   │   │   ├── tasks.py
│   │   │   ├── comments.py
│   │   │   └── auth.py
│   │   ├── services/              # Business logic
│   │   │   ├── project_service.py
│   │   │   ├── task_service.py
│   │   │   └── auth_service.py
│   │   └── utils/
│   │       ├── security.py        # JWT + password hashing
│   │       └── exceptions.py      # Custom exceptions
│   └── tests/
│       ├── conftest.py
│       ├── test_projects.py
│       └── test_tasks.py
│
├── .claude/                       # 🤖 Claude Code config (grows across tutorials)
│   ├── rules/                     # Added in T5
│   ├── commands/                  # Added in T5
│   ├── skills/                    # Added in T5
│   ├── agents/                    # Added in T13
│   └── settings.json              # Added in T12 (MCP config)
│
├── .tasks/                        # 📋 Task files (used from T4 onward)
│   ├── todo/
│   ├── in-progress/
│   └── done/
│
└── docs/                          # 📖 Generated in T8
    ├── architecture.md
    ├── api-reference.md
    └── adr/
```

---

## Intentional Imperfections (Teaching Opportunities)

The starter code ships with deliberate rough edges that tutorials address:

| Imperfection | Tutorial That Fixes It | Learning Goal |
|---|---|---|
| No CLAUDE.md or only a skeleton | T2 | Learner writes/improves it |
| Inconsistent error handling across routes | T7 (Refactor) | Real refactoring target |
| No tests for some endpoints | T7, T14 | Test-writing with subagents |
| Inline SQL in some routes (FastAPI) | T7 (Refactor) | Extract to repository pattern |
| Duplicated fetch logic (Next.js) | T7 (Refactor) | Extract shared API client |
| No API docs / sparse comments | T8 (Documentation) | Auto-generate with Claude |
| Missing input validation on a few endpoints | T16 (Ralph) | Seeded bugs for autonomous loop |
| No `.tasks/` folder | T4 | Learner creates the workflow structure |
| No `.claude/` config | T5 | Learner builds from scratch |

---

## Tech Stack Details

### Next.js Track 🟦
- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Prisma** + **SQLite** (zero-config DB, no Docker needed)
- **Tailwind CSS** + **shadcn/ui** components
- **NextAuth.js** (credentials provider for simplicity)
- **Jest** + **React Testing Library**

### FastAPI Track 🟩
- **Python 3.12+**
- **FastAPI** + **Uvicorn**
- **SQLAlchemy 2.0** + **Alembic** + **SQLite**
- **Pydantic v2** (schemas + settings)
- **python-jose** + **passlib** (JWT auth)
- **pytest** + **httpx** (async test client)

### Shared Design Decisions
- **SQLite** for both tracks — no Docker, no external DB setup, works everywhere
- **Same data model** — both tracks implement identical entities so tutorials apply regardless of track
- **Same API contract** — the Next.js API routes and FastAPI routes return identical JSON shapes
- **Seed data script** — both tracks ship with a `seed` command that populates sample projects, tasks, and users

---

## How the Tutorials Use It

### Beginner Flow (T1-T3)
```
Student clones repo → picks a track → installs → runs the app →
explores with Claude Code → generates CLAUDE.md → onboards the codebase
```

### Intermediate Flow (T4-T8)
```
Student uses Define→Plan→Iterate to add features →
builds custom commands/skills/hooks →
refactors rough code → generates documentation
```

### Advanced Flow (T9-T13)
```
Student builds a large feature with context management →
integrates MCP servers → creates specialized subagents
```

### Expert Flow (T14-T17)
```
Student builds a supervisor pipeline → runs agent teams →
sets up an autonomous dev loop → packages everything as a plugin
```

---

## Getting Started (What Goes in the README)

```bash
# Clone the repo
git clone https://github.com/lumenalta/taskforge-tutorial.git
cd taskforge-tutorial

# === Next.js Track ===
cd nextjs
npm install
npx prisma db push
npm run seed
npm run dev
# Open http://localhost:3000

# === FastAPI Track ===
cd fastapi
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -e ".[dev]"
alembic upgrade head
python -m app.seed
uvicorn app.main:app --reload
# Open http://localhost:8000/docs
```

---

## Next Steps

1. **Approve this project design** — any features to add/remove?
2. **Build the starter repo** — I can generate the initial codebase for either or both tracks
3. **Start writing Tutorial 1** — using TaskForge as the hands-on example