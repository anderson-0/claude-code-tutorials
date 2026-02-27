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

const meta = tutorials[10] // Tutorial 11 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'commit-workflows', short: 'Commits' },
  { id: 'branch-strategy', short: 'Branches' },
  { id: 'pr-creation', short: 'PRs' },
  { id: 'automated-review', short: 'Auto Review' },
  { id: 'cicd', short: 'CI/CD' },
  { id: 'session-control', short: 'Control' },
  { id: 'human-loop', short: 'Human Gate' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial11Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial11({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial11Props) {
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
            Safe Delivery Pipelines
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
            AI-assisted development is most valuable when it integrates cleanly into your{' '}
            <strong className="text-[#e6edf3]">existing delivery pipeline</strong>. This tutorial
            teaches you how to integrate Claude Code into Git workflows with{' '}
            <strong className="text-[#e6edf3]">safety gates</strong>,{' '}
            <strong className="text-[#e6edf3]">automated review</strong>, and{' '}
            <strong className="text-[#e6edf3]">human oversight</strong> at the right points.
          </p>

          <div className="my-5 grid grid-cols-4 gap-3">
            {[
              { icon: '🔀', label: 'Git Flow', desc: 'Branch, commit, PR workflows', color: '#3fb950' },
              { icon: '🤖', label: 'Automation', desc: 'CI/CD integration', color: '#58a6ff' },
              { icon: '🛡️', label: 'Safety', desc: 'Human-in-the-loop gates', color: '#d29922' },
              { icon: '📝', label: 'Audit', desc: 'Reviewable history', color: '#f85149' },
            ].map((phase, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4 text-center"
                style={{ borderColor: `${phase.color}50` }}
              >
                <div className="mb-2 text-2xl">
                  {phase.icon}
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
                desc: 'Commit workflows, branch strategy, PRs, CI/CD automation, safety gates',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorial 4 (Define → Plan workflow), basic Git knowledge',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Git, GitHub or GitLab, gh CLI (optional), CI/CD access',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Full feature delivered through Git workflow with Claude',
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

          <Callout type="info" title="Why Safe Pipelines Matter">
            AI tools can move fast — too fast if not properly gated. This tutorial teaches you
            how to harness AI velocity while maintaining <strong>code quality</strong>,{' '}
            <strong>team visibility</strong>, and <strong>production safety</strong>.
          </Callout>
        </section>

        {/* COMMIT WORKFLOWS */}
        <section id="commit-workflows">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Commit Workflows
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code excels at writing <strong className="text-[#e6edf3]">meaningful commit messages</strong>{' '}
            because it has full context of what changed and why. The key is connecting the{' '}
            <strong className="text-[#e6edf3]">Summarize phase</strong> (from Tutorial 4) to your commits.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Basic Commit Pattern
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Review the changes in the working directory and create a commit with
  a descriptive message. Use conventional commits format:

  type(scope): short description

  Longer explanation of what changed and why.

  Consider: feat, fix, refactor, docs, test, chore`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example: Claude-Written Commit
          </h3>
          <CodeBlock
            lang="bash"
            filename="Claude executes"
            code={`git add src/hooks/useFilterState.ts src/components/features/FilterBar.tsx
git commit -m "feat(tasks): add filtering and search to task list

Implemented client-side filtering with URL state persistence.
Users can now filter by status and search by keyword. Filter
state syncs to URL params for shareable links.

- Created useFilterState hook with URL sync
- Built FilterBar component with status dropdown and search
- Added debounced search (300ms) for instant feedback
- Integrated with existing TaskList component

Resolves #142"`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Staged Commits for Logical Groupings
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Don't commit everything at once. Break implementation into logical commits:
          </p>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> I've implemented the filter feature in multiple steps. Create separate
  commits for:

  1. The filter state hook (useFilterState.ts)
  2. The UI components (FilterBar, StatusFilter, SearchInput)
  3. Integration with TaskList
  4. Tests

  Use conventional commits format for each.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            From Summarize to Commit
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The <strong className="text-[#e6edf3]">Summarize phase</strong> from Tutorial 4 is perfect input for commits:
          </p>
          <CodeBlock
            lang="text"
            filename="Combined prompt"
            code={`> Read .tasks/done/add-task-filtering.md

  Using the summary in the file, create a final commit for this feature.
  Include all the key decisions and testing details in the commit body.`}
          />

          <Callout type="tip" title="Commit Message Quality">
            Claude's commit messages are often <strong>better than human-written ones</strong> because
            it has perfect recall of all changes. It can reference file paths, explain trade-offs,
            and link related changes without missing details.
          </Callout>
        </section>

        {/* BRANCH STRATEGY */}
        <section id="branch-strategy">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Branch Strategy
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code works seamlessly with feature branch workflows. The key patterns:
            branch naming conventions, working in isolation, and managing multiple branches.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Feature Branch Creation
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Create a feature branch for the task filtering feature. Use the naming
  convention: feature/issue-number-description

  Branch from main, switch to the new branch.`}
          />
          <CodeBlock
            lang="bash"
            filename="Claude executes"
            code={`git checkout main
git pull origin main
git checkout -b feature/142-task-filtering
# Output: Switched to a new branch 'feature/142-task-filtering'`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Branch Naming Conventions
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Teach Claude your team's conventions via CLAUDE.md:
          </p>
          <CodeBlock
            lang="markdown"
            filename="CLAUDE.md"
            code={`## Git Workflow

### Branch Naming
- Feature branches: \`feature/ISSUE-short-description\`
- Bug fixes: \`fix/ISSUE-short-description\`
- Refactors: \`refactor/short-description\`
- Hotfixes: \`hotfix/ISSUE-critical-description\`

Always include the issue/ticket number if available.

### Commit Messages
Use conventional commits:
- \`feat(scope): description\` for new features
- \`fix(scope): description\` for bug fixes
- \`refactor(scope): description\` for refactors
- \`docs(scope): description\` for documentation
- \`test(scope): description\` for tests
- \`chore(scope): description\` for maintenance`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Working with Git Worktrees
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Git worktrees let you work on multiple branches simultaneously. Useful for comparing implementations:
          </p>
          <CodeBlock
            lang="bash"
            filename="Setup worktrees"
            code={`# Main worktree
cd ~/projects/myapp

# Add worktree for feature branch
git worktree add ../myapp-feature-filtering feature/142-task-filtering

# Now you can run Claude in both directories:
# Terminal 1: ~/projects/myapp (main branch)
# Terminal 2: ~/projects/myapp-feature-filtering (feature branch)`}
          />
          <CodeBlock
            lang="text"
            filename="Use case"
            code={`> I'm exploring two different approaches to task filtering.
  I have two worktrees set up. In this session (feature branch),
  implement approach A. I'll compare results later.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Keeping Feature Branches Updated
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Rebase this feature branch onto the latest main. Check for conflicts
  and resolve if needed.`}
          />
          <CodeBlock
            lang="bash"
            filename="Claude executes"
            code={`git fetch origin main
git rebase origin/main
# If conflicts occur, Claude can help resolve them`}
          />

          <Callout type="warning" title="Branch Isolation">
            Always work on feature branches, never directly on main/master. This keeps your
            experiments isolated and makes it safe to try alternative approaches in parallel.
          </Callout>
        </section>

        {/* PR CREATION */}
        <section id="pr-creation">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            PR Creation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code can create pull requests with well-structured descriptions, labels,
            and even assign reviewers.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            From Summarize to PR
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> Push this branch to origin and create a pull request with:
  - Title: "Add task filtering and search"
  - Description: Use the summary we generated earlier
  - Labels: "enhancement", "frontend"
  - Assign reviewers: @alice, @bob`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            PR Description Template
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude follows your project's PR template:
          </p>
          <CodeBlock
            lang="markdown"
            filename=".github/pull_request_template.md"
            code={`## Summary
<!-- What does this PR do? -->

## Changes
<!-- List key files and modifications -->

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing complete

## Screenshots (if UI changes)
<!-- Add before/after screenshots -->

## Notes
<!-- Any context reviewers should know -->`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude will fill this in automatically based on the work done.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Using gh CLI
          </h3>
          <CodeBlock
            code={`# Claude can use gh CLI for PR creation
gh pr create \\
  --title "Add task filtering and search" \\
  --body "$(cat .tasks/done/add-task-filtering.md)" \\
  --label enhancement,frontend \\
  --reviewer alice,bob`}
          />

          <Callout type="tip" title="Link to Task Files">
            Include a link to the task file in the PR description. It provides complete context
            for reviewers and creates an audit trail from requirement to implementation.
          </Callout>
        </section>

        {/* AUTOMATED CODE REVIEW */}
        <section id="automated-review">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Automated Code Review
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Run Claude as a reviewer in your CI pipeline to catch issues before human review.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            GitHub Actions Example
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/claude-review.yml"
            code={`name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for git diff

      - name: Set up Claude Code
        run: |
          npm install -g @anthropic-ai/claude-code
          echo "$\{\{ secrets.ANTHROPIC_API_KEY }}" > ~/.claude-api-key

      - name: Run automated review
        run: |
          claude --non-interactive << 'EOF'
          Review this PR for:
          - Code quality issues
          - Potential bugs
          - Security concerns
          - Performance problems
          - Missing tests

          Generate a review summary with specific line references.
          EOF

      - name: Post review as comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`## 🤖 Claude Code Review\\n\\n\${review}\`
            });`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            GitLab CI Example
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".gitlab-ci.yml"
            code={`claude-review:
  stage: review
  image: node:20
  script:
    - npm install -g @anthropic-ai/claude-code
    - echo "$ANTHROPIC_API_KEY" > ~/.claude-api-key
    - |
      claude --non-interactive << 'EOF'
      Review this MR. Focus on:
      - Architecture alignment with existing patterns
      - Test coverage
      - Documentation completeness

      Output findings to review.md
      EOF
    - cat review.md
  only:
    - merge_requests
  artifacts:
    paths:
      - review.md
    expire_in: 1 week`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Custom Review Rules
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Create a review rule file for consistency:
          </p>
          <CodeBlock
            lang="markdown"
            filename=".claude/rules/code-review.md"
            code={`# Code Review Rules

When reviewing PRs:

1. **Architecture**
   - Does it follow existing patterns?
   - Are dependencies properly managed?
   - Is the abstraction level appropriate?

2. **Testing**
   - Are new features tested?
   - Do tests cover edge cases?
   - Are tests maintainable?

3. **Security**
   - Are inputs validated?
   - Are secrets properly handled?
   - Are auth checks in place?

4. **Performance**
   - Are there N+1 queries?
   - Are lists efficiently rendered?
   - Are expensive operations memoized?

5. **Documentation**
   - Are complex functions documented?
   - Is the README updated?
   - Are breaking changes noted?

Output a structured review with severity levels:
- 🔴 Critical: Must fix before merge
- 🟡 Warning: Should address
- 🔵 Suggestion: Nice to have`}
          />

          <Callout type="warning" title="AI Reviews Complement, Don't Replace">
            Claude reviews catch common issues and enforce standards, but human reviewers understand
            business context, team dynamics, and strategic direction. Use AI reviews as a first pass.
          </Callout>
        </section>

        {/* CI/CD INTEGRATION */}
        <section id="cicd">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            CI/CD Integration
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Run Claude in your CI pipeline for automated tasks: documentation generation, test
            creation, migration scripts, and more.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation Generation
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/docs.yml"
            code={`name: Update Documentation

on:
  push:
    branches: [main]
    paths:
      - 'src/**/*.ts'
      - 'src/**/*.tsx'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate docs
        run: |
          claude --non-interactive << 'EOF'
          Read all files in src/ that changed in the last commit.
          Update docs/api-reference.md with any new or changed APIs.
          Commit the changes if docs were updated.
          EOF

      - name: Push changes
        run: |
          git config user.name "Claude Bot"
          git config user.email "claude@example.com"
          git push`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Test Generation
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/test-check.yml"
            code={`name: Test Coverage Check

on:
  pull_request:

jobs:
  check-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check test coverage
        run: |
          claude --non-interactive << 'EOF'
          For each new or modified file in src/, check if there's a
          corresponding test file. If not, list the missing tests.

          For files that have tests, verify:
          - Edge cases are covered
          - Error conditions are tested
          - Happy path is tested

          Output a report to test-coverage.md
          EOF

      - name: Comment on PR
        if: failure()
        run: |
          gh pr comment $\{\{ github.event.pull_request.number }} \\
            --body-file test-coverage.md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Migration Scripts
          </h3>
          <CodeBlock
            lang="text"
            filename="CI task"
            code={`# Triggered when database schema changes
> A migration was added in db/migrations/008-add-filters.sql

  Generate a rollback script at db/rollbacks/008-rollback-filters.sql
  Test both scripts against a dev database snapshot.

  Document the migration in docs/database-migrations.md`}
          />

          <Callout type="tip" title="Idempotent CI Tasks">
            Design CI tasks to be idempotent — they should be safe to run multiple times.
            Claude can help: "Make this script idempotent by checking if the change already exists."
          </Callout>
        </section>

        {/* SESSION CONTROL */}
        <section id="session-control">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Session Control
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Control what Claude can do in CI environments with permission configs. CI sessions
            should be more restrictive than local development.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            CI Permission Config
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/ci-config.yml"
            code={`# Restrictive permissions for CI
permissions:
  filesystem:
    read: true
    write: false  # Don't modify files in CI reviews

  git:
    read: true
    commit: false  # No commits in review jobs
    push: false

  network:
    allow: false  # No external API calls

  shell:
    allow: false  # No arbitrary commands

# Allow specific commands only
allowed_commands:
  - npm test
  - npm run lint
  - git diff
  - git log`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation Generation Config
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/docs-generation-config.yml"
            code={`# Permissions for doc generation
permissions:
  filesystem:
    read: true
    write: true
    allowed_paths:
      - docs/**
      - README.md

  git:
    read: true
    commit: true
    push: true  # Can push doc updates

  network:
    allow: false

# Only allow doc-related changes
validation:
  - name: "Only docs modified"
    check: "git diff --name-only | grep -E '^docs/|^README.md$'"
    required: true`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Using Configs
          </h3>
          <CodeBlock
            code={`# In CI, specify the config
claude --config .claude/ci-config.yml --non-interactive << 'EOF'
Review this PR for code quality issues.
EOF

# Or via environment variable
export CLAUDE_CONFIG=.claude/ci-config.yml
claude --non-interactive << 'EOF'
Generate API docs from src/api/ changes.
EOF`}
          />

          <Callout type="warning" title="Defense in Depth">
            Layer permissions: CI user permissions + Claude config + command validation.
            Even if Claude tries something unexpected, multiple safeguards prevent issues.
          </Callout>
        </section>

        {/* HUMAN-IN-THE-LOOP */}
        <section id="human-loop">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Human-in-the-Loop
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Some changes require human approval. Build gates into your pipeline where Claude
            surfaces decisions rather than making them.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Breaking Change Detection
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/breaking-changes.yml"
            code={`name: Breaking Change Check

on:
  pull_request:

jobs:
  check-breaking:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Detect breaking changes
        id: detect
        run: |
          claude --non-interactive << 'EOF'
          Compare the public API surface between main and this branch.

          Check for:
          - Removed functions/classes
          - Changed function signatures
          - Removed or renamed props
          - Changed behavior of existing APIs

          If breaking changes found:
          - List each breaking change
          - Suggest migration path
          - Output: breaking-changes.md

          Exit with code 1 if breaking changes detected.
          EOF

      - name: Require approval for breaking changes
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const changes = fs.readFileSync('breaking-changes.md', 'utf8');

            // Request review from architects
            await github.rest.pulls.requestReviewers({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              reviewers: ['tech-lead', 'architect']
            });

            // Add warning label
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              labels: ['breaking-change', 'needs-approval']
            });

            // Comment with details
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: \`## ⚠️ Breaking Changes Detected\\n\\n\${changes}\\n\\n**This PR requires approval from a tech lead or architect.**\`
            });`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Security Audit Gate
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/security-audit.yml"
            code={`name: Security Audit

on:
  pull_request:
    paths:
      - 'src/auth/**'
      - 'src/api/**'
      - 'package.json'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Security review
        run: |
          claude --config .claude/security-review-config.yml \\
            --non-interactive << 'EOF'
          Review changes for security issues:

          1. Authentication/Authorization
             - Are auth checks present?
             - Are roles properly validated?
             - Are sessions handled securely?

          2. Input Validation
             - Are all inputs validated?
             - Are SQL injections prevented?
             - Are XSS vectors blocked?

          3. Secrets Management
             - Are secrets hardcoded?
             - Are API keys exposed?
             - Are tokens properly stored?

          4. Dependencies
             - Are new deps from trusted sources?
             - Are there known vulnerabilities?

          Output findings to security-audit.md
          Exit 1 if critical issues found.
          EOF

      - name: Block merge on critical issues
        if: failure()
        run: |
          gh pr comment $\{\{ github.event.pull_request.number }} \\
            --body "## 🔒 Security Issues Detected\\n\\n$(cat security-audit.md)\\n\\n**This PR cannot be merged until security issues are resolved.**"

          gh pr edit $\{\{ github.event.pull_request.number }} \\
            --add-label "security-review-required"

          exit 1`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Performance Budget Gate
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".github/workflows/performance-budget.yml"
            code={`name: Performance Budget

on:
  pull_request:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.css'

jobs:
  check-bundle:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build and check bundle size
        run: |
          npm run build

          claude --non-interactive << 'EOF'
          Compare the bundle sizes between main and this branch.

          Budget:
          - Main bundle: max 150kb (current: get from git show main:dist/stats.json)
          - Vendor bundle: max 300kb
          - Total: max 450kb

          If over budget:
          - List which modules grew
          - Suggest optimizations (code splitting, lazy loading, etc.)
          - Output to performance-report.md
          - Exit 1

          If near budget (within 10%):
          - Warn but don't fail
          EOF

      - name: Request optimization review
        if: failure()
        run: |
          gh pr comment $\{\{ github.event.pull_request.number }} \\
            --body "## 📦 Bundle Size Over Budget\\n\\n$(cat performance-report.md)\\n\\n**Please optimize before merging.**"

          gh pr edit $\{\{ github.event.pull_request.number }} \\
            --add-label "performance-review"`}
          />

          <Callout type="info" title="Gates vs. Guidance">
            Use gates (blocking checks) for critical issues: security, breaking changes, severe
            performance regressions. Use guidance (non-blocking comments) for suggestions:
            code style, minor performance, refactoring opportunities.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Ship a Feature with Full Git Workflow
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's practice the complete flow: branch → implement → test → commit → PR → review → merge.
          </p>

          <AppSelector />

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create Feature Branch
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  code: `cd taskforge-tutorial/nextjs
git checkout main
git pull origin main`,
                },
                fastapi: {
                  code: `cd taskforge-tutorial/fastapi
git checkout main
git pull origin main`,
                },
              }}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a new branch feature/add-task-export for exporting tasks to CSV.
  Then create a task file at .tasks/todo/add-task-export.md`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Implement with Incremental Commits
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/todo/add-task-export.md and create an implementation plan.

  Then implement step by step, committing after each step:
  1. Create CSV export utility function
  2. Add export button to task list UI
  3. Add tests for export logic
  4. Update documentation

  Make meaningful commits after each step.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Generate PR Summary
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Run git log --oneline main..HEAD to see all commits.
  Run git diff main...HEAD to see all changes.

  Summarize this branch for a PR description:
  - What feature was added
  - Files created/modified
  - How to test it
  - Any design decisions

  Format using our PR template.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Create Pull Request
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Push the branch to origin and create a PR with:
  - Title: "Add CSV export for tasks"
  - Body: Use the summary we just generated
  - Labels: "enhancement", "frontend"

  Use gh CLI to create the PR.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Automated Review (CI)
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              At this point, CI runs:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Lint and type checks',
                  'Test suite',
                  'Claude automated review',
                  'Bundle size check',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Claude posts a review comment with findings. Address any issues:
            </p>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Claude's review found that we're not handling empty task lists.
  Add a check in the export function to show a message when there
  are no tasks to export. Commit the fix.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Human Review and Merge
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              After CI passes and human reviewers approve:
            </p>
            <CodeBlock
              code={`# Merge via GitHub UI or:
gh pr merge --squash --delete-branch

# Move task file to done
mv .tasks/in-progress/add-task-export.md .tasks/done/
git add .tasks/
git commit -m "Mark task-export as complete"
git push`}
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
              Exercise 1: Set Up Git Workflow
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Configure your project for Claude Code + Git:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Create a PR template in .github/pull_request_template.md',
                  'Set up branch protection rules on main',
                  'Configure Claude to follow your commit message conventions',
                  'Practice: implement a small feature with proper branching',
                ],
                '#3fb950'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Configure Automated Code Review
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Set up CI-based code review:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Create .github/workflows/claude-review.yml',
                  'Create .claude/rules/code-review.md with your standards',
                  'Test it: open a PR with intentional issues and see if Claude catches them',
                  'Tune the rules based on false positives/negatives',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Full Cycle Practice
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Complete the full workflow:
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Pick a feature from your backlog
2. Create a feature branch with Claude
3. Implement with incremental commits
4. Generate a thorough PR description
5. Create the PR and wait for CI
6. Address any review comments
7. Merge and move task to done/
8. Verify the automation worked as expected`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now have automated safeguards for AI-generated code. Your Git workflow treats
            Claude Code as a team member with proper review, testing, and audit trails.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 12 — MCP Servers
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn to connect Claude Code to external tools and data
              sources using the Model Context Protocol. Query databases, call APIs, read Slack messages,
              and integrate with any service your team uses.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> MCP basics, creating MCP servers,
              connecting to databases, integrating third-party APIs, security considerations.
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
              onClick={() => onSelectTutorial(12)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: MCP Servers →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
