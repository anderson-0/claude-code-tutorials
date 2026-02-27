'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[16] // Tutorial 17 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'plugin-architecture', short: 'Architecture' },
  { id: 'directory-structure', short: 'Structure' },
  { id: 'creating', short: 'Creating' },
  { id: 'installing', short: 'Installing' },
  { id: 'official-directory', short: 'Directory' },
  { id: 'versioning', short: 'Versioning' },
  { id: 'team-adoption', short: 'Teams' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'ecosystem', short: 'Ecosystem' },
  { id: 'conclusion', short: 'Conclusion' },
]

interface Tutorial17Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial17({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial17Props) {
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
            Plugins & Marketplace
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
            Everything you've learned in the previous 16 tutorials — subagents, commands, skills,
            hooks, rules — can be{' '}
            <strong className="text-[#e6edf3]">packaged as reusable plugins</strong>. Share them
            across your projects, your team, or the entire Claude Code community.
          </p>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '📦',
                title: "What you'll learn",
                desc: 'Plugin structure, creating, installing, versioning, team adoption',
              },
              {
                icon: '🔧',
                title: 'Prerequisites',
                desc: 'Tutorials 1-16 completed, experience with .claude/ directory',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, Git/GitHub, TaskForge project',
              },
              {
                icon: '🎁',
                title: 'Output',
                desc: 'A distributable plugin package from TaskForge subagents',
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

          <Callout type="info" title="Why Plugins Matter">
            Plugins enable <strong>knowledge reuse</strong> at scale. Build once, use everywhere.
            They transform Claude Code from a personal productivity tool into a{' '}
            <strong>team capability amplifier</strong>.
          </Callout>
        </section>

        {/* PLUGIN ARCHITECTURE */}
        <section id="plugin-architecture">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Plugin Architecture
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A Claude Code plugin is simply a{' '}
            <strong className="text-[#e6edf3]">.claude/ directory that's been packaged for distribution</strong>.
            It can contain any combination of:
          </p>

          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Agents (AGENTS.md)</strong> — Specialized
                  subagents with focused roles
                </>,
                <>
                  <strong className="text-[#e6edf3]">Commands (.claude/commands/)</strong> —
                  Project-specific slash commands
                </>,
                <>
                  <strong className="text-[#e6edf3]">Skills (.claude/skills/)</strong> — Tools,
                  scripts, and capabilities
                </>,
                <>
                  <strong className="text-[#e6edf3]">Hooks (.claude/hooks/)</strong> — Lifecycle
                  automation and workflows
                </>,
                <>
                  <strong className="text-[#e6edf3]">Rules (CLAUDE.md snippets)</strong> — Coding
                  standards and conventions
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Plugin Categories
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Workflow Plugins',
                desc: 'Standardize development workflows. Example: code-review-workflow (review agent + hooks + commands)',
                color: '#3fb950',
              },
              {
                title: 'Domain Plugins',
                desc: 'Domain-specific expertise. Example: data-science-toolkit (agents + skills for ML workflows)',
                color: '#58a6ff',
              },
              {
                title: 'Framework Plugins',
                desc: 'Framework conventions. Example: nextjs-standards (rules + commands for Next.js projects)',
                color: '#d29922',
              },
              {
                title: 'Toolchain Plugins',
                desc: 'Tool integrations. Example: cicd-integrations (hooks for GitHub Actions, deploy scripts)',
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

          <Callout type="tip" title="The Composability Principle">
            Well-designed plugins are composable. You can install multiple plugins in a project
            and they won't conflict. Use namespaced commands, clear file organization, and
            non-overlapping agent names.
          </Callout>
        </section>

        {/* DIRECTORY STRUCTURE */}
        <section id="directory-structure">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Plugin Directory Structure
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            A plugin repository follows a standard layout that Claude Code recognizes:
          </p>

          <CodeBlock
            lang="text"
            filename="Standard plugin structure"
            code={`my-plugin/
├── README.md              # Installation & usage docs
├── CHANGELOG.md           # Version history
├── plugin.json            # Plugin metadata
├── .claude/
│   ├── AGENTS.md          # Subagent definitions
│   ├── commands/
│   │   ├── review.json    # Command definitions
│   │   └── test.json
│   ├── skills/
│   │   ├── code-analyzer/
│   │   │   ├── SKILL.md
│   │   │   └── analyze.py
│   │   └── test-generator/
│   │       ├── SKILL.md
│   │       └── generate.ts
│   └── hooks/
│       ├── pre-commit.sh
│       └── post-plan.sh
└── examples/              # Usage examples
    └── sample-project/`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            plugin.json Metadata
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The plugin manifest describes your plugin:
          </p>
          <CodeBlock
            lang="json"
            filename="plugin.json"
            code={`{
  "name": "taskforge-subagents",
  "version": "1.0.0",
  "description": "Code review, test generation, and documentation agents for TaskForge",
  "author": "Lumenalta",
  "license": "MIT",
  "repository": "github.com/lumenalta/taskforge-plugin",
  "tags": ["review", "testing", "documentation", "subagents"],
  "claudeVersion": ">=2.0.0",
  "dependencies": {
    "python": ">=3.9",
    "node": ">=18"
  },
  "agents": [
    {
      "name": "code-reviewer",
      "description": "Comprehensive code review with security checks"
    },
    {
      "name": "test-writer",
      "description": "Generate unit and integration tests"
    },
    {
      "name": "doc-generator",
      "description": "Create API and architecture documentation"
    }
  ],
  "commands": [
    {
      "name": "/review",
      "description": "Trigger code review workflow"
    }
  ]
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Documentation Requirements
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">README.md</strong> — Installation steps,
                  usage examples, configuration options
                </>,
                <>
                  <strong className="text-[#e6edf3]">CHANGELOG.md</strong> — Version history,
                  breaking changes, migration guides
                </>,
                <>
                  <strong className="text-[#e6edf3]">Examples</strong> — Sample projects showing
                  the plugin in action
                </>,
                <>
                  <strong className="text-[#e6edf3]">Agent docs</strong> — Each SKILL.md and
                  agent description should be clear
                </>,
              ],
              '#58a6ff'
            )}
          </div>
        </section>

        {/* CREATING A PLUGIN */}
        <section id="creating">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Creating a Shareable Plugin
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            To convert project-specific agents/skills into a plugin, you need to{' '}
            <strong className="text-[#e6edf3]">generalize</strong> and{' '}
            <strong className="text-[#e6edf3]">parameterize</strong> project-specific details.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 1: Extract Project-Specific Logic
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Identify hardcoded paths, project names, and assumptions:
          </p>
          <CodeBlock
            lang="markdown"
            filename="Before: project-specific"
            code={`## code-reviewer

You are a code reviewer for the TaskForge project (Next.js + TypeScript).
Review changes in the src/ directory against TaskForge coding standards.
Store reports in .review-reports/ directory.`}
          />

          <CodeBlock
            lang="markdown"
            filename="After: parameterized"
            code={`## code-reviewer

You are a code review agent.

**Configuration (from CLAUDE.md):**
- Project type: {{PROJECT_TYPE}} (default: full-stack web)
- Source directory: {{SOURCE_DIR}} (default: src/)
- Report directory: {{REPORT_DIR}} (default: .review-reports/)

Review changes against project coding standards documented in CLAUDE.md.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 2: Add Configuration Support
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Allow users to configure the plugin in their CLAUDE.md:
          </p>
          <CodeBlock
            lang="markdown"
            filename="In user's CLAUDE.md"
            code={`## Plugin Configuration

### taskforge-subagents

\`\`\`yaml
code-reviewer:
  source_dir: "app/"
  report_dir: ".reviews/"
  frameworks: ["Next.js", "TypeScript", "TailwindCSS"]

test-writer:
  test_dir: "__tests__/"
  framework: "vitest"
  coverage_threshold: 80
\`\`\``}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 3: Make Skills Self-Documenting
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/skills/code-analyzer/SKILL.md"
            code={`# Code Analyzer Skill

## Purpose
Static analysis tool for identifying code quality issues, security vulnerabilities, and architectural violations.

## Installation
Requires Python 3.9+ with dependencies:
\`\`\`bash
pip install pylint mypy bandit
\`\`\`

## Usage
From subagents:
> Activate the code-analyzer skill and scan src/components/*.tsx

Manual invocation:
\`\`\`bash
python .claude/skills/code-analyzer/analyze.py --dir src/ --format json
\`\`\`

## Configuration
Optional config in CLAUDE.md:
- \`excluded_paths\`: List of paths to skip
- \`severity_threshold\`: "high" | "medium" | "low"
- \`output_format\`: "json" | "markdown" | "console"`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 4: Add Tests and Examples
          </h3>
          <CodeBlock
            lang="text"
            filename="Plugin with examples"
            code={`my-plugin/
├── examples/
│   ├── nextjs-example/
│   │   ├── CLAUDE.md       # Shows plugin config
│   │   ├── .claude/        # Plugin installed
│   │   └── README.md       # "Try /review in this example"
│   └── fastapi-example/
│       └── ...
└── tests/
    ├── test-agents.sh      # Test agent activation
    ├── test-commands.sh    # Test command execution
    └── test-skills.py      # Test skill scripts`}
          />

          <Callout type="warning" title="Avoid Over-Coupling">
            Don't assume specific folder structures, file naming conventions, or tooling. Make
            plugins flexible enough to work with different project setups. Use sensible defaults
            but allow configuration overrides.
          </Callout>
        </section>

        {/* INSTALLING PLUGINS */}
        <section id="installing">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Installing Plugins
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code supports multiple installation methods:
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Method 1: From GitHub
          </h3>
          <CodeBlock
            code={`# Clone plugin into .claude/plugins/
mkdir -p .claude/plugins
git clone https://github.com/lumenalta/taskforge-plugin .claude/plugins/taskforge-subagents

# Run plugin install script if provided
cd .claude/plugins/taskforge-subagents
./install.sh`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Method 2: Using /plugin install Command
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If Claude Code CLI supports it:
          </p>
          <CodeBlock
            code={`# Install from GitHub
claude plugin install lumenalta/taskforge-plugin

# Install from official directory
claude plugin install @official/code-review-workflow

# List installed plugins
claude plugin list`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Method 3: Manual Copy
          </h3>
          <CodeBlock
            code={`# Download plugin ZIP or clone repo
# Copy .claude/ contents into your project
cp -r taskforge-plugin/.claude/agents/* .claude/agents/
cp -r taskforge-plugin/.claude/skills/* .claude/skills/
cp -r taskforge-plugin/.claude/commands/* .claude/commands/

# Merge AGENTS.md if needed`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Post-Install Configuration
          </h3>
          <CodeBlock
            lang="markdown"
            filename="Add to your CLAUDE.md"
            code={`## Installed Plugins

### taskforge-subagents v1.0.0
Source: https://github.com/lumenalta/taskforge-plugin

Provides:
- /review command — Trigger comprehensive code review
- code-reviewer agent — Automated PR review
- test-writer agent — Generate test suites
- doc-generator agent — API and architecture docs

Configuration:
\`\`\`yaml
taskforge-subagents:
  enabled: true
  code-reviewer:
    frameworks: ["Next.js", "TypeScript"]
  test-writer:
    framework: "vitest"
\`\`\``}
          />

          <Callout type="tip" title="Version Pinning">
            Pin plugin versions in production projects. Track plugin versions in CLAUDE.md or
            a separate plugins.lock file. This prevents breaking changes from auto-updates.
          </Callout>
        </section>

        {/* OFFICIAL DIRECTORY */}
        <section id="official-directory">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Official Plugins Directory
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Anthropic maintains a curated collection of plugins in the{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
              claude-code-plugins
            </code>{' '}
            GitHub repository. These are vetted, well-documented, and maintained.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Official Plugin Categories
          </h3>
          <CodeBlock
            lang="text"
            filename="Example official plugins"
            code={`@official/code-review-workflow
  Comprehensive code review agents and hooks

@official/documentation-suite
  Auto-generate READMEs, ADRs, API docs, changelogs

@official/test-automation
  Test generation, coverage tracking, regression detection

@official/refactoring-tools
  Safe multi-file refactoring with verification

@official/security-scanner
  Security audit agents, dependency scanning

@official/performance-profiler
  Performance analysis and optimization suggestions

@official/cicd-integrations
  GitHub Actions, GitLab CI, Jenkins hooks

@official/framework-nextjs
  Next.js conventions, best practices, project templates

@official/framework-fastapi
  FastAPI standards, endpoint generation, schema validation`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Browsing the Directory
          </h3>
          <CodeBlock
            code={`# Browse available official plugins
claude plugin search --official

# Search by tag
claude plugin search --tag testing
claude plugin search --tag documentation

# View plugin details
claude plugin info @official/code-review-workflow

# Install official plugin
claude plugin install @official/code-review-workflow`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Contributing to the Directory
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            To submit your plugin to the official directory:
          </p>
          <div className="my-3">
            {bullet(
              [
                '1. Ensure plugin meets quality standards (docs, tests, examples)',
                '2. Open PR to claude-code-plugins repo with plugin directory',
                '3. Include plugin.json, comprehensive README, CHANGELOG',
                '4. Pass automated checks (linting, security scan, test coverage)',
                '5. Maintainer review and approval',
                '6. Plugin published to official directory',
              ],
              '#3fb950'
            )}
          </div>

          <Callout type="info" title="Community Plugins">
            Not all plugins need to be official. Share yours on GitHub with the{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
              claude-code-plugin
            </code>{' '}
            topic tag. The community will discover them through search.
          </Callout>
        </section>

        {/* VERSIONING */}
        <section id="versioning">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Versioning and Updates
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Plugins evolve. Use{' '}
            <strong className="text-[#e6edf3]">semantic versioning</strong> to communicate changes
            and maintain compatibility.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Semantic Versioning (SemVer)
          </h3>
          <CodeBlock
            lang="text"
            filename="Version format: MAJOR.MINOR.PATCH"
            code={`1.0.0 → Initial stable release
1.0.1 → Bug fixes (PATCH)
1.1.0 → New features, backward compatible (MINOR)
2.0.0 → Breaking changes (MAJOR)

Examples:
- 1.0.1: Fixed code-reviewer bug with TypeScript generics
- 1.1.0: Added test-writer support for Playwright tests
- 2.0.0: Changed AGENTS.md format, requires Claude Code 2.5+`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Maintaining CHANGELOG.md
          </h3>
          <CodeBlock
            lang="markdown"
            filename="CHANGELOG.md"
            code={`# Changelog

All notable changes to the taskforge-subagents plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-15

### Breaking Changes
- AGENTS.md format changed to support multi-model agents
- Minimum Claude Code version: 2.5.0
- Configuration moved from \`.claude/config.yml\` to \`CLAUDE.md\`

### Migration Guide
1. Upgrade Claude Code: \`npm install -g @anthropic/claude-code@latest\`
2. Update CLAUDE.md with new plugin config format (see README)
3. Run migration script: \`./migrate-to-v2.sh\`

### Added
- Multi-model agent support (Sonnet, Opus, Haiku per agent)
- Parallel agent execution for faster workflows
- New skill: dependency-auditor

### Changed
- code-reviewer now checks accessibility standards
- test-writer generates Playwright tests by default

### Fixed
- Issue #42: doc-generator crash on large codebases

## [1.1.0] - 2026-01-10

### Added
- test-writer support for Playwright integration tests
- /review command now accepts --scope flag

### Fixed
- code-reviewer false positives on React hooks`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Handling Breaking Changes
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            When releasing breaking changes:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Document migration path</strong> — Clear
                  step-by-step guide in CHANGELOG
                </>,
                <>
                  <strong className="text-[#e6edf3]">Provide migration scripts</strong> —
                  Automate config format changes when possible
                </>,
                <>
                  <strong className="text-[#e6edf3]">Deprecation warnings</strong> — Warn users in
                  v1.x before v2.0 breaking change
                </>,
                <>
                  <strong className="text-[#e6edf3]">Support old versions</strong> — Maintain v1.x
                  branch for critical bug fixes
                </>,
              ],
              '#d29922'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Updating Installed Plugins
          </h3>
          <CodeBlock
            code={`# Check for plugin updates
claude plugin outdated

# Update specific plugin
claude plugin update taskforge-subagents

# Update to specific version
claude plugin update taskforge-subagents@2.0.0

# Update all plugins
claude plugin update --all`}
          />

          <Callout type="warning" title="Test Before Upgrading">
            Always test plugin updates in a feature branch before upgrading production projects.
            Breaking changes can affect workflows. Review CHANGELOG and run your test suite.
          </Callout>
        </section>

        {/* TEAM ADOPTION */}
        <section id="team-adoption">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Building for Team-Wide Adoption
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Organization-level plugins standardize workflows across teams. They're your{' '}
            <strong className="text-[#e6edf3]">coding standards as code</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Use Cases for Organization Plugins
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Coding Standards Enforcement',
                desc: 'Plugin with rules, linters, and review agents that enforce company coding standards. Every project starts with consistent conventions.',
                example: '@acme/coding-standards',
              },
              {
                title: 'Onboarding Acceleration',
                desc: 'Plugin with project templates, common commands, and documentation generators. New hires get productive faster.',
                example: '@acme/onboarding-toolkit',
              },
              {
                title: 'Security & Compliance',
                desc: 'Plugin with security scanning agents, compliance checkers, and audit trail hooks. Automated security reviews on every PR.',
                example: '@acme/security-suite',
              },
              {
                title: 'Domain-Specific Workflows',
                desc: 'Plugin tailored to your industry. E-commerce: inventory management agents. FinTech: regulatory compliance checks.',
                example: '@acme/fintech-agents',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1 text-[14px] font-semibold text-[#e6edf3]">
                  {item.title}
                </div>
                <div className="mb-2 text-[13px] text-[#c9d1d9]">{item.desc}</div>
                <div className="text-[11px] text-[#8b949e]">
                  Example: <code className="rounded bg-[#010409] px-1 py-0.5">{item.example}</code>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Rollout Strategy
          </h3>
          <CodeBlock
            lang="text"
            filename="Phased rollout approach"
            code={`Phase 1: Pilot Team (Week 1-2)
- Install plugin in 1-2 projects with early adopters
- Gather feedback on usability and pain points
- Fix critical issues and improve documentation

Phase 2: Expanded Pilot (Week 3-4)
- Roll out to 3-5 additional teams
- Measure adoption metrics (command usage, agent invocations)
- Host Q&A sessions and training

Phase 3: Organization-Wide (Week 5+)
- Announce plugin availability to all teams
- Create video tutorials and guides
- Make plugin mandatory for new projects
- Offer office hours for support`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Measuring Adoption
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Track plugin usage to quantify impact:
          </p>
          <CodeBlock
            lang="yaml"
            filename="Metrics to track"
            code={`Adoption Metrics:
  - Projects with plugin installed: 45 / 60 (75%)
  - Active users (weekly): 120 engineers
  - Command invocations per week: 2,400

Impact Metrics:
  - Code review turnaround: 2 hours → 30 minutes (75% reduction)
  - Test coverage: 60% → 85% (with test-writer agent)
  - Documentation freshness: 40% → 90% (with doc-generator)
  - Onboarding time: 2 weeks → 3 days

Quality Metrics:
  - Security vulnerabilities detected: 140 (prevented)
  - Linting violations: -65% (enforcement via hooks)
  - PR approval time: -50% (automated reviews)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Getting Buy-In
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Start small</strong> — Build plugin that
                  solves a real pain point for one team
                </>,
                <>
                  <strong className="text-[#e6edf3]">Show ROI</strong> — Measure time saved,
                  quality improved, issues prevented
                </>,
                <>
                  <strong className="text-[#e6edf3]">Enable self-service</strong> — Excellent
                  docs so teams can adopt without hand-holding
                </>,
                <>
                  <strong className="text-[#e6edf3]">Iterate based on feedback</strong> — Treat
                  internal plugins as products, not mandates
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <Callout type="tip" title="Internal Plugin Registry">
            Set up an internal registry for organization plugins. Use a private GitHub org,
            internal npm registry, or artifact storage. Control access and versioning centrally.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Package TaskForge's Subagents as a Plugin
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's take the code-reviewer, test-writer, and doc-generator agents from Tutorial 13
            and package them as a distributable plugin.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create Plugin Repository
            </h3>
            <CodeBlock
              code={`mkdir taskforge-plugin
cd taskforge-plugin
git init

# Create structure
mkdir -p .claude/{agents,commands,skills,hooks}
touch README.md CHANGELOG.md plugin.json LICENSE`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Copy and Generalize Agents
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Copy the AGENTS.md file from the TaskForge project. For each agent
  (code-reviewer, test-writer, doc-generator):

  1. Remove project-specific references to "TaskForge"
  2. Parameterize hardcoded paths (src/ → {{SOURCE_DIR}})
  3. Make framework assumptions configurable
  4. Add configuration examples to agent descriptions

  Save the generalized AGENTS.md to this plugin repo's .claude/ directory.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Add Skills and Commands
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a /review command that triggers the code-reviewer agent workflow.
  Save the command definition to .claude/commands/review.json

  Also copy any skills that the agents depend on (code-analyzer, test-runner)
  to .claude/skills/. Ensure each skill has a clear SKILL.md with usage docs.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Write plugin.json
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a plugin.json manifest with:
  - name: "taskforge-subagents"
  - version: "1.0.0"
  - description, author, license
  - List of agents and commands
  - Dependencies (Node, Python versions)
  - Tags: ["review", "testing", "documentation"]`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Write Documentation
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a comprehensive README.md with:
  - Overview of what the plugin provides
  - Installation instructions (git clone method)
  - Configuration examples (CLAUDE.md snippets)
  - Usage examples for each agent and command
  - Troubleshooting section

  Also create CHANGELOG.md with initial 1.0.0 release notes.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Create Example Project
            </h3>
            <CodeBlock
              code={`mkdir examples/sample-project
cd examples/sample-project

# Create minimal project that demonstrates plugin
# Include CLAUDE.md with plugin config
# Include sample code that benefits from code review

# Document: "To try this plugin, cd here and run /review"`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 7: Test and Publish
            </h3>
            <CodeBlock
              code={`# Test the plugin in a clean project
cd /tmp/test-project
git clone /path/to/taskforge-plugin .claude/plugins/taskforge-subagents

# Verify agents load
claude
> @code-reviewer help

# Test command
> /review

# If it works, publish to GitHub
cd taskforge-plugin
git add .
git commit -m "Initial plugin release v1.0.0"
git tag v1.0.0
git remote add origin https://github.com/yourorg/taskforge-plugin
git push origin main --tags`}
            />
          </div>

          <Callout type="tip" title="Iterate Based on Usage">
            After publishing, track how people use your plugin. Add telemetry (opt-in) or ask for
            feedback in issues. The best plugins evolve based on real-world usage patterns.
          </Callout>
        </section>

        {/* ECOSYSTEM */}
        <section id="ecosystem">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Claude Code Ecosystem
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code is more than a tool — it's a{' '}
            <strong className="text-[#e6edf3]">platform for agentic development</strong>. The
            plugin ecosystem is just beginning. Here's where things are heading.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Emerging Patterns
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Multi-Agent Marketplaces',
                desc: 'Specialized agent teams for complex domains (financial modeling, healthcare compliance, game development). Plug-and-play expertise.',
              },
              {
                title: 'Framework-Native Plugins',
                desc: 'Tight integrations with frameworks. @nextjs/official-plugin knows Next.js better than you do. Auto-generates routes, middleware, layouts.',
              },
              {
                title: 'AI-Generated Plugins',
                desc: 'Claude generating plugins on-demand. "Create a plugin for Stripe integration" → Instant working plugin with agents, skills, docs.',
              },
              {
                title: 'Cross-Tool Interop',
                desc: 'Plugins that work across Claude Code, Cursor, GitHub Copilot. Standard agent/skill formats enable ecosystem growth.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 text-[14px] font-semibold text-[#58a6ff]">
                  {item.title}
                </div>
                <div className="text-[13px] text-[#c9d1d9]">{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Growing Community
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            As of early 2026, the Claude Code community is rapidly expanding:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Official Plugin Directory</strong> — 50+
                  curated plugins covering most common workflows
                </>,
                <>
                  <strong className="text-[#e6edf3]">Community Plugins</strong> — 200+ community
                  plugins on GitHub with claude-code-plugin tag
                </>,
                <>
                  <strong className="text-[#e6edf3]">Discord & Forums</strong> — Active communities
                  sharing agents, skills, workflows
                </>,
                <>
                  <strong className="text-[#e6edf3]">Conferences & Meetups</strong> — AgenticDev
                  Conference 2026, monthly local meetups
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Future of Agentic Development
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            In the next 2-3 years, expect:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Fully autonomous pipelines</strong> — Ticket
                  → code → tests → docs → PR → deploy, minimal human involvement
                </>,
                <>
                  <strong className="text-[#e6edf3]">Agent specialization</strong> — Agents become
                  experts in narrow domains (React performance, Kubernetes config, SQL optimization)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Self-improving systems</strong> — Agents learn
                  from feedback, adapt to your codebase patterns
                </>,
                <>
                  <strong className="text-[#e6edf3]">Standardized protocols</strong> — MCP evolves
                  to support richer agent communication, tool sharing
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="info" title="Your Role in the Ecosystem">
            Every plugin you create, workflow you share, and tutorial you write contributes to the
            ecosystem. The agentic development community thrives on shared knowledge. Contribute
            your learnings back to the community.
          </Callout>
        </section>

        {/* CONCLUSION */}
        <section id="conclusion">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Series Conclusion: Your Journey from Beginner to Expert
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Congratulations. You've completed all 17 tutorials in the Claude Code learning path.
            Let's reflect on what you've accomplished.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            What You've Learned
          </h3>

          <div className="my-4 rounded-lg border border-[#21262d] bg-[#161b22] p-5">
            <h4 className="mb-2 text-[15px] font-semibold text-[#3fb950]">
              Level 1: Foundations (Tutorials 1-3)
            </h4>
            <div className="mb-4 text-[13px] text-[#c9d1d9]">
              You learned the basics: installing Claude Code, understanding the agentic model,
              writing CLAUDE.md, and using Claude as an onboarding partner. You set up TaskForge
              and learned how to teach Claude about your project.
            </div>

            <h4 className="mb-2 text-[15px] font-semibold text-[#58a6ff]">
              Level 2: Core Workflows (Tutorials 4-8)
            </h4>
            <div className="mb-4 text-[13px] text-[#c9d1d9]">
              You mastered the Define → Plan → Iterate workflow, the four extensibility building
              blocks (rules, commands, skills, hooks), prompt engineering for agentic tools, safe
              refactoring, and documentation generation. You built your first custom commands and
              skills.
            </div>

            <h4 className="mb-2 text-[15px] font-semibold text-[#d29922]">
              Level 3: Advanced (Tutorials 9-13)
            </h4>
            <div className="mb-4 text-[13px] text-[#c9d1d9]">
              You dove deep: token optimization and context management, AI-native development
              mindset, safe delivery pipelines with Git, MCP server integrations, and subagents.
              You built specialized AI assistants with their own contexts and tool restrictions.
            </div>

            <h4 className="mb-2 text-[15px] font-semibold text-[#f85149]">
              Level 4: Expert (Tutorials 14-17)
            </h4>
            <div className="text-[13px] text-[#c9d1d9]">
              You reached mastery: supervisor architectures with quality gates, agent teams with
              inter-agent communication, Ralph's autonomous dev loops, and now plugins for
              ecosystem-wide knowledge sharing. You can design and build production-grade agentic
              systems.
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Skills You've Gained
          </h3>
          <div className="my-4 grid grid-cols-2 gap-3">
            {[
              'Write effective CLAUDE.md files',
              'Design task files and workflows',
              'Create custom commands and skills',
              'Build lifecycle hooks',
              'Optimize token usage',
              'Manage context strategically',
              'Create subagents with focused roles',
              'Build supervisor architectures',
              'Enable agent-to-agent communication',
              'Design autonomous dev loops',
              'Package plugins for distribution',
              'Measure productivity improvements',
            ].map((skill, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border border-[#21262d] bg-[#161b22] p-3"
              >
                <span className="text-[#3fb950]">✓</span>
                <span className="text-[13px] text-[#c9d1d9]">{skill}</span>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            What You've Built
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Throughout this series, you built a complete AI-augmented development environment:
          </p>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">TaskForge</strong> — A full-stack task
                  management app with Next.js and FastAPI
                </>,
                <>
                  <strong className="text-[#e6edf3]">.tasks/ workflow</strong> — Task files for
                  Define → Plan → Iterate cycles
                </>,
                <>
                  <strong className="text-[#e6edf3]">Custom commands</strong> — /summarize,
                  /review, /test, and more
                </>,
                <>
                  <strong className="text-[#e6edf3]">Skills library</strong> — Code analyzer,
                  test runner, doc generator
                </>,
                <>
                  <strong className="text-[#e6edf3]">Hooks automation</strong> — Pre-commit
                  checks, post-plan summaries
                </>,
                <>
                  <strong className="text-[#e6edf3]">Subagent team</strong> — code-reviewer,
                  test-writer, doc-generator
                </>,
                <>
                  <strong className="text-[#e6edf3]">Supervisor pipeline</strong> — Multi-stage
                  development with quality gates
                </>,
                <>
                  <strong className="text-[#e6edf3]">Ralph loop</strong> — Autonomous ticket → PR
                  workflow
                </>,
                <>
                  <strong className="text-[#e6edf3]">Plugin package</strong> — Distributable
                  plugin from your TaskForge agents
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Where to Go from Here
          </h3>

          <div className="my-5 space-y-4">
            <div className="rounded-lg border border-[#1f6feb50] bg-[#1f6feb10] p-5">
              <h4 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[#58a6ff]">
                <span>🚀</span>
                Apply to Real Projects
              </h4>
              <p className="mb-2 text-[13px] text-[#c9d1d9]">
                Take these skills to your production codebases. Start with CLAUDE.md and the Define
                → Plan workflow. Build incrementally: commands, then skills, then agents. Measure
                your productivity gains.
              </p>
            </div>

            <div className="rounded-lg border border-[#3fb95050] bg-[#3fb95010] p-5">
              <h4 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[#3fb950]">
                <span>🤝</span>
                Join the Community
              </h4>
              <p className="mb-2 text-[13px] text-[#c9d1d9]">
                Share your learnings, plugins, and workflows. Join the Claude Code Discord, attend
                meetups, contribute to open-source plugins. The community grows through shared
                knowledge.
              </p>
              <div className="mt-3 text-[13px]">
                {bullet(
                  [
                    <>
                      Claude Code Discord:{' '}
                      <a
                        href="https://discord.gg/anthropic"
                        className="text-[#58a6ff] hover:underline"
                      >
                        discord.gg/anthropic
                      </a>
                    </>,
                    <>
                      Official Plugins:{' '}
                      <a
                        href="https://github.com/anthropic/claude-code-plugins"
                        className="text-[#58a6ff] hover:underline"
                      >
                        github.com/anthropic/claude-code-plugins
                      </a>
                    </>,
                  ],
                  '#3fb950'
                )}
              </div>
            </div>

            <div className="rounded-lg border border-[#d2992250] bg-[#d2992210] p-5">
              <h4 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[#d29922]">
                <span>📚</span>
                Lumenalta Resources
              </h4>
              <p className="mb-2 text-[13px] text-[#c9d1d9]">
                Continue your AI-native development journey with Lumenalta's resources:
              </p>
              <div className="mt-3 text-[13px]">
                {bullet(
                  [
                    <>
                      <strong className="text-[#e6edf3]">Advanced Workshops</strong> — Hands-on
                      training on enterprise agent architectures
                    </>,
                    <>
                      <strong className="text-[#e6edf3]">Consulting</strong> — Partner with us to
                      build agentic systems for your org
                    </>,
                    <>
                      <strong className="text-[#e6edf3]">Case Studies</strong> — Real-world
                      examples of teams scaling with Claude Code
                    </>,
                    <>
                      <strong className="text-[#e6edf3]">Blog & Newsletter</strong> — Stay updated
                      on agentic development best practices
                    </>,
                  ],
                  '#d29922'
                )}
              </div>
              <div className="mt-3 text-[13px] text-[#8b949e]">
                Visit{' '}
                <a
                  href="https://lumenalta.com/ai-development"
                  className="text-[#58a6ff] hover:underline"
                >
                  lumenalta.com/ai-development
                </a>{' '}
                for more information.
              </div>
            </div>

            <div className="rounded-lg border border-[#f8514950] bg-[#f8514910] p-5">
              <h4 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[#f85149]">
                <span>🔬</span>
                Keep Experimenting
              </h4>
              <p className="mb-2 text-[13px] text-[#c9d1d9]">
                The field is evolving rapidly. New patterns emerge weekly. Experiment with
                multi-model agents, cross-tool integrations, autonomous verification. Push the
                boundaries. Share what you discover.
              </p>
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Agentic Future
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You've learned Claude Code, but more importantly, you've learned{' '}
            <strong className="text-[#e6edf3]">how to think about AI-augmented development</strong>.
            These principles — clear communication, structured workflows, incremental trust-building,
            systematic verification — apply to any agentic tool, present or future.
          </p>

          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The future of software development is agentic. Not AI replacing developers, but{' '}
            <strong className="text-[#e6edf3]">developers commanding fleets of specialized AI assistants</strong>,
            each handling different aspects of the development lifecycle. You're now equipped to
            lead in that future.
          </p>

          <div
            className="my-6 rounded-xl border p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb15)',
              borderColor: '#1f6feb50',
            }}
          >
            <div className="mb-3 text-[40px]">🎉</div>
            <div className="mb-2 text-[20px] font-bold text-[#e6edf3]">
              Congratulations, You've Completed the Journey!
            </div>
            <div className="mx-auto max-w-[600px] text-[14px] leading-relaxed text-[#c9d1d9]">
              From first installation to autonomous pipelines, you've mastered agentic development
              with Claude Code. Now go build something amazing.
            </div>
          </div>

          <Callout type="info" title="Thank You">
            Thank you for investing your time in this learning path. We hope these tutorials have
            transformed how you think about development. If they helped you, share them with your
            team. The agentic revolution grows through shared knowledge.
          </Callout>
        </section>

        {/* Footer */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-2 border-t border-[#21262d] pt-5">
          <div className="text-[13px] text-[#8b949e]">
            <strong className="text-[#e6edf3]">
              Claude Code Tutorial Series — Complete
            </strong>{' '}
            · Lumenalta Learning Path
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#484f58]">Tutorial {meta.id} of {tutorials.length}</span>
            <button
              onClick={() => onSelectTutorial(1)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Start Over: Tutorial 1 →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
