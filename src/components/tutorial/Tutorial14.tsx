'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[13] // Tutorial 14 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'pipeline-pattern', short: 'Pipeline' },
  { id: 'hook-validation', short: 'Validation' },
  { id: 'queue-files', short: 'Queues' },
  { id: 'human-gating', short: 'Human Gate' },
  { id: 'builder-validator', short: 'Build/Validate' },
  { id: 'governance', short: 'Governance' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial14Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial14({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial14Props) {
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
            Supervisor Architectures
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
            A <strong className="text-[#e6edf3]">supervisor architecture</strong> is a pattern where a
            lead agent coordinates multiple specialized subagents through a{' '}
            <strong className="text-[#e6edf3]">multi-stage pipeline</strong>. Each stage has its own
            responsibilities, tool permissions, and quality gates. This creates a{' '}
            <strong className="text-[#e6edf3]">governed development workflow</strong> with automated
            validation between stages.
          </p>

          <div className="my-5 grid grid-cols-4 gap-3">
            {[
              { num: '1', label: 'Spec', desc: 'PM writes feature spec', color: '#3fb950' },
              { num: '2', label: 'Review', desc: 'Architect validates design', color: '#58a6ff' },
              { num: '3', label: 'Build', desc: 'Engineer implements + tests', color: '#d29922' },
              { num: '4', label: 'Approve', desc: 'Reviewer checks quality', color: '#f85149' },
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
                desc: 'Multi-stage pipelines, hook validation, queue-based handoff, human-in-the-loop gating',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorial 13 completed (subagents), understanding of hooks (Tutorial 5)',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal, Claude Code, TaskForge project with .claude/ folder',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Full pipeline with quality gates for time tracking feature',
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

          <Callout type="info" title="Why Supervisor Architectures?">
            Supervisor architectures provide <strong>quality control</strong>,{' '}
            <strong>separation of concerns</strong>, and <strong>automated governance</strong>.
            Each agent in the pipeline has a single responsibility and the minimum permissions
            needed. Hooks enforce quality gates between stages, ensuring output meets standards
            before moving forward.
          </Callout>
        </section>

        {/* PIPELINE PATTERN */}
        <section id="pipeline-pattern">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Pipeline Pattern
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The pipeline pattern breaks feature development into{' '}
            <strong className="text-[#e6edf3]">sequential stages</strong>, each handled by a
            specialized subagent. The pattern mimics real development teams: PM defines requirements,
            architect reviews design, engineer implements, reviewer validates.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Standard Four-Stage Pipeline
          </h3>
          <CodeBlock
            lang="text"
            filename="Pipeline stages"
            code={`Stage 1: pm-spec
  Role: Product manager / spec writer
  Input: Feature request, user story
  Output: Structured spec file with requirements
  Tools: Write, Read (spec files only)
  Gate: Spec file exists with required sections

Stage 2: architect-review
  Role: Technical architect
  Input: Spec file from Stage 1
  Output: Architecture validation notes, approved or rejected
  Tools: Read (all files), Write (review notes only)
  Gate: Review file contains "APPROVED" or "REJECTED"

Stage 3: implementer-tester
  Role: Software engineer
  Input: Approved spec and review notes
  Output: Code implementation + tests
  Tools: Read, Write, Edit, Bash (except delete)
  Gate: All tests pass, lint passes

Stage 4: code-review
  Role: Code reviewer
  Input: Implementation files
  Output: Review comments, approval
  Tools: Read (all files), Write (review file only)
  Gate: Review contains "LGTM" or "CHANGES REQUESTED"`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating Pipeline Subagents
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/agents/pm-spec.md"
            code={`---
name: pm-spec
description: Product manager that writes feature specifications
tools:
  - Write
  - Read
allowed_paths:
  - .tasks/specs/**
model: sonnet-4.5
---

# Product Manager Spec Writer

You are a product manager responsible for writing clear, complete feature specifications.

## Your Responsibilities
- Read feature requests and user stories
- Write structured spec files in .tasks/specs/
- Include: Overview, User Stories, Acceptance Criteria, Technical Notes
- Ask clarifying questions if requirements are ambiguous
- Format specs in markdown with clear sections

## Spec Template
Every spec must include:
1. ## Overview — What and why
2. ## User Stories — As a [user], I want [goal] so that [benefit]
3. ## Acceptance Criteria — Testable requirements
4. ## Technical Notes — Architecture considerations, dependencies
5. ## Out of Scope — What this does NOT include

## Quality Standards
- Acceptance criteria must be specific and testable
- Technical notes must mention affected systems
- Include edge cases and error scenarios
- Flag security or performance considerations`}
          />

          <CodeBlock
            lang="markdown"
            filename=".claude/agents/architect-review.md"
            code={`---
name: architect-review
description: Technical architect that reviews specs for feasibility
tools:
  - Read
  - Write
allowed_paths:
  - .tasks/specs/**
  - .tasks/reviews/**
  - src/**
  - docs/**
model: sonnet-4.5
---

# Technical Architect

You review feature specs for technical feasibility, architecture alignment, and completeness.

## Your Responsibilities
- Read spec files from .tasks/specs/
- Review against system architecture (docs/system-architecture.md)
- Check for conflicts with existing features
- Validate technical approach is sound
- Write review file in .tasks/reviews/ with APPROVED or REJECTED

## Review Criteria
1. **Architecture Alignment** — Does this fit our patterns?
2. **Feasibility** — Can this be built with our stack?
3. **Dependencies** — Are prerequisites identified?
4. **Security** — Any security implications?
5. **Performance** — Any performance concerns?
6. **Testing** — Is it testable?

## Review Output Format
Create .tasks/reviews/[feature-name]-review.md with:
- Decision: APPROVED or REJECTED
- Reasoning for each criterion
- Required changes if rejected
- Implementation recommendations if approved`}
          />

          <Callout type="tip" title="Tool Restrictions = Safety">
            Notice how each agent has <strong>only the tools it needs</strong>. The PM can't modify
            code. The architect can read but not write code. This creates{' '}
            <strong>defense in depth</strong> — even if an agent makes an error, its limited
            permissions contain the damage.
          </Callout>
        </section>

        {/* HOOK VALIDATION */}
        <section id="hook-validation">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hook-Based Validation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            <strong className="text-[#e6edf3]">Stop hooks</strong> fire when a subagent completes.
            They run validation scripts that check output quality. If validation fails, the hook
            blocks progression and provides feedback to the agent.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Validation Hook Architecture
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Trigger:</strong> SubagentStop event fires when
                  agent finishes
                </>,
                <>
                  <strong className="text-[#e6edf3]">Input:</strong> Hook receives agent name, output
                  files, exit status
                </>,
                <>
                  <strong className="text-[#e6edf3]">Validation:</strong> Script checks output meets
                  quality criteria
                </>,
                <>
                  <strong className="text-[#e6edf3]">Exit codes:</strong> 0=pass (continue), 1=fail
                  (block + feedback), 2=fatal error
                </>,
                <>
                  <strong className="text-[#e6edf3]">Feedback loop:</strong> Agent receives validation
                  errors and can retry
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Spec Validation Hook
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/validate-spec.sh"
            code={`#!/bin/bash
# Validates that pm-spec agent created a complete spec file

set -e

# Read hook input (JSON with agent name, files modified, etc)
input=$(cat)
agent=$(echo "$input" | jq -r '.agent_name')

# Only run for pm-spec agent
if [ "$agent" != "pm-spec" ]; then
  exit 0
fi

echo "Validating spec output..."

# Find the spec file (should be in .tasks/specs/)
spec_file=$(find .tasks/specs -name "*.md" -type f -mmin -5 | head -n 1)

if [ -z "$spec_file" ]; then
  echo "ERROR: No spec file found in .tasks/specs/"
  echo "The pm-spec agent must create a spec file."
  exit 1
fi

echo "Found spec: $spec_file"

# Check required sections
required_sections=("## Overview" "## User Stories" "## Acceptance Criteria" "## Technical Notes")

for section in "\${required_sections[@]}"; do
  if ! grep -q "$section" "$spec_file"; then
    echo "ERROR: Missing required section: $section"
    echo "The spec must include all required sections."
    exit 1
  fi
done

# Check that Acceptance Criteria has actual criteria (not just the heading)
criteria_content=$(sed -n '/## Acceptance Criteria/,/^## /p' "$spec_file" | tail -n +2 | head -n -1)
if [ -z "$criteria_content" ] || [ $(echo "$criteria_content" | wc -w) -lt 10 ]; then
  echo "ERROR: Acceptance Criteria section is empty or too short"
  echo "Please provide detailed, testable acceptance criteria."
  exit 1
fi

echo "✓ Spec validation passed"
exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Implementation Validation Hook
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/validate-implementation.sh"
            code={`#!/bin/bash
# Validates that implementer-tester agent wrote code that passes tests

set -e

input=$(cat)
agent=$(echo "$input" | jq -r '.agent_name')

if [ "$agent" != "implementer-tester" ]; then
  exit 0
fi

echo "Validating implementation..."

# Run lint
echo "Running lint..."
if ! npm run lint; then
  echo "ERROR: Lint failed"
  echo "Please fix all linting errors before completing."
  exit 1
fi

# Run tests
echo "Running tests..."
if ! npm test -- --passWithNoTests; then
  echo "ERROR: Tests failed"
  echo "All tests must pass before implementation is complete."
  exit 1
fi

# Check test coverage (optional but recommended)
echo "Checking test coverage..."
if ! npm test -- --coverage --coverageThreshold='{"global":{"statements":70}}' > /dev/null 2>&1; then
  echo "WARNING: Test coverage below 70%"
  echo "Consider adding more tests, but allowing to proceed."
fi

echo "✓ Implementation validation passed"
exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Configuring Validation Hooks
          </h3>
          <CodeBlock
            lang="json"
            filename="settings.json"
            code={`{
  "hooks": {
    "SubagentStop": [
      {
        "command": ".claude/hooks/validate-spec.sh",
        "description": "Validate spec completeness"
      },
      {
        "command": ".claude/hooks/validate-implementation.sh",
        "description": "Validate tests and lint"
      }
    ]
  }
}`}
          />

          <Callout type="warning" title="Validation Feedback Loop">
            When a hook returns exit code 1, the agent receives the error message and continues
            working to fix the issue. This creates a <strong>self-correcting loop</strong> — the
            agent iterates until validation passes. Be clear in error messages so the agent knows
            what to fix.
          </Callout>
        </section>

        {/* QUEUE FILES */}
        <section id="queue-files">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Queue Files for Agent Handoff
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Agents in a pipeline don't communicate directly. Instead, they use{' '}
            <strong className="text-[#e6edf3]">queue files</strong> to coordinate handoffs. A hook
            watches the queue and surfaces the next command when a stage completes.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Queue File Pattern
          </h3>
          <CodeBlock
            lang="json"
            filename=".tasks/pipeline-queue.json"
            code={`{
  "current_stage": "spec",
  "feature": "time-tracking",
  "stages": [
    {
      "name": "spec",
      "agent": "pm-spec",
      "status": "in-progress",
      "input": ".tasks/requests/time-tracking.md",
      "output": ".tasks/specs/time-tracking.md"
    },
    {
      "name": "review",
      "agent": "architect-review",
      "status": "pending",
      "input": ".tasks/specs/time-tracking.md",
      "output": ".tasks/reviews/time-tracking-review.md"
    },
    {
      "name": "implement",
      "agent": "implementer-tester",
      "status": "pending",
      "input": ".tasks/specs/time-tracking.md",
      "output": "src/**"
    },
    {
      "name": "code-review",
      "agent": "code-review",
      "status": "pending",
      "input": "src/**",
      "output": ".tasks/reviews/time-tracking-code-review.md"
    }
  ],
  "history": []
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Queue Management Hook
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/pipeline-coordinator.sh"
            code={`#!/bin/bash
# Coordinates pipeline progression via queue file

set -e

input=$(cat)
agent=$(echo "$input" | jq -r '.agent_name')
queue_file=".tasks/pipeline-queue.json"

if [ ! -f "$queue_file" ]; then
  # No active pipeline
  exit 0
fi

current_agent=$(jq -r '.stages[] | select(.status == "in-progress") | .agent' "$queue_file")

if [ "$agent" != "$current_agent" ]; then
  # This agent isn't in the pipeline
  exit 0
fi

echo "Pipeline stage completed: $agent"

# Update current stage to completed
jq --arg agent "$agent" '
  (.stages[] | select(.agent == $agent) | .status) = "completed" |
  .history += [{
    "stage": $agent,
    "completed_at": (now | todate)
  }]
' "$queue_file" > "$queue_file.tmp" && mv "$queue_file.tmp" "$queue_file"

# Find next stage
next_stage=$(jq -r '.stages[] | select(.status == "pending") | .name' "$queue_file" | head -n 1)

if [ -z "$next_stage" ]; then
  echo "✓ Pipeline complete!"
  jq '.current_stage = "complete"' "$queue_file" > "$queue_file.tmp" && mv "$queue_file.tmp" "$queue_file"
  exit 0
fi

# Mark next stage as in-progress
jq --arg stage "$next_stage" '
  (.stages[] | select(.name == $stage) | .status) = "in-progress" |
  .current_stage = $stage
' "$queue_file" > "$queue_file.tmp" && mv "$queue_file.tmp" "$queue_file"

next_agent=$(jq -r --arg stage "$next_stage" '.stages[] | select(.name == $stage) | .agent' "$queue_file")
next_input=$(jq -r --arg stage "$next_stage" '.stages[] | select(.name == $stage) | .input' "$queue_file")

echo ""
echo "▶ Next stage: $next_stage"
echo "▶ Agent: $next_agent"
echo "▶ Run: /agent $next_agent"
echo "▶ Prompt: Read $next_input and proceed with your responsibilities"
echo ""

exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Starting a Pipeline
          </h3>
          <CodeBlock
            lang="bash"
            filename="Terminal"
            code={`# Initialize the queue file
cat > .tasks/pipeline-queue.json << 'EOF'
{
  "current_stage": "spec",
  "feature": "time-tracking",
  "stages": [
    {"name": "spec", "agent": "pm-spec", "status": "in-progress", ...},
    {"name": "review", "agent": "architect-review", "status": "pending", ...},
    ...
  ]
}
EOF

# Start the pipeline in Claude Code
claude

> /agent pm-spec
> Read .tasks/requests/time-tracking.md and create a complete feature spec`}
          />

          <Callout type="tip" title="Automatic Handoff">
            The pipeline coordinator hook automatically prints the next command when each stage
            completes. You can copy-paste it directly into Claude to move to the next stage. This
            creates a <strong>semi-automated pipeline</strong> — agents hand off work without manual
            queue management.
          </Callout>
        </section>

        {/* HUMAN GATING */}
        <section id="human-gating">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Human-in-the-Loop Gating
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Not every pipeline stage should be automatic. Design{' '}
            <strong className="text-[#e6edf3]">human gates</strong> at key decision points where
            you want to review before proceeding. Use <strong className="text-[#e6edf3]">risk-based
            gating</strong>: high-risk transitions need approval, low-risk transitions are automatic.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Add Human Gates
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">After architectural review</strong> — Approve
                  design before implementation starts
                </>,
                <>
                  <strong className="text-[#e6edf3]">Before deployment</strong> — Final approval
                  before code goes live
                </>,
                <>
                  <strong className="text-[#e6edf3]">After test failures</strong> — Review why tests
                  failed before allowing retry
                </>,
                <>
                  <strong className="text-[#e6edf3]">Before breaking changes</strong> — Approve
                  changes that affect APIs or dependencies
                </>,
                <>
                  <strong className="text-[#e6edf3]">Security-sensitive stages</strong> — Review
                  auth, permissions, data access changes
                </>,
              ],
              '#d29922'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Implementing Human Gates
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/human-gate-review.sh"
            code={`#!/bin/bash
# Human gate after architect review

set -e

input=$(cat)
agent=$(echo "$input" | jq -r '.agent_name')

if [ "$agent" != "architect-review" ]; then
  exit 0
fi

review_file=$(find .tasks/reviews -name "*-review.md" -type f -mmin -5 | head -n 1)

if [ ! -f "$review_file" ]; then
  echo "ERROR: Review file not found"
  exit 1
fi

decision=$(grep -E "^Decision: (APPROVED|REJECTED)" "$review_file" | awk '{print $2}')

if [ "$decision" == "REJECTED" ]; then
  echo "❌ Architect rejected the design."
  echo "Review feedback in $review_file and revise the spec."
  exit 1
fi

if [ "$decision" == "APPROVED" ]; then
  echo "✓ Architect approved the design."
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "⚠️  HUMAN GATE: Review Required"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "The architect has approved the design. Review:"
  echo "  - Spec: .tasks/specs/[feature].md"
  echo "  - Review: $review_file"
  echo ""
  echo "If approved, proceed to implementation:"
  echo "  /agent implementer-tester"
  echo ""
  echo "To reject and revise:"
  echo "  Edit the spec and re-run /agent architect-review"
  echo ""
  exit 2  # Exit code 2 = stop pipeline, wait for human
fi

echo "ERROR: Review decision unclear"
exit 1`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Risk Matrix for Gating Decisions
          </h3>
          <CodeBlock
            lang="text"
            filename="When to gate"
            code={`┌─────────────────────────────────────────────────────────┐
│                    RISK MATRIX                          │
├─────────────────────────────────────────────────────────┤
│ LOW RISK → Automatic                                    │
│   - Spec writing (validated by hooks)                   │
│   - Running tests                                        │
│   - Generating documentation                             │
│   - Code formatting / linting                            │
├─────────────────────────────────────────────────────────┤
│ MEDIUM RISK → Human review recommended                  │
│   - Architectural review approval                        │
│   - Implementation of new features                       │
│   - Database migrations                                  │
│   - Dependency updates                                   │
├─────────────────────────────────────────────────────────┤
│ HIGH RISK → Human gate required                         │
│   - Breaking API changes                                 │
│   - Security-related code                                │
│   - Production deployments                               │
│   - Data deletion operations                             │
└─────────────────────────────────────────────────────────┘`}
          />

          <Callout type="warning" title="Exit Code 2 = Human Required">
            When a hook returns exit code 2, it signals a <strong>required human decision point</strong>.
            The pipeline stops and waits for human input. Use this for high-risk transitions where
            automated validation isn't sufficient.
          </Callout>
        </section>

        {/* BUILDER/VALIDATOR PATTERN */}
        <section id="builder-validator">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Builder/Validator Pattern
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            An <strong className="text-[#e6edf3]">adversarial pattern</strong> where one agent builds
            and another validates. The validator is read-only with strict quality criteria. If
            validation fails, the builder receives feedback and iterates. This creates a{' '}
            <strong className="text-[#e6edf3]">self-improving loop</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Builder Agent
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/agents/builder.md"
            code={`---
name: builder
description: Builds features from approved specs
tools:
  - Read
  - Write
  - Edit
  - Bash
blocked_commands:
  - rm -rf
  - git push --force
model: sonnet-4.5
---

# Feature Builder

You implement features from approved specifications with high quality code.

## Your Responsibilities
- Read spec from .tasks/specs/
- Read architectural review from .tasks/reviews/
- Implement the feature following project patterns
- Write comprehensive tests
- Run lint and tests before declaring complete
- Document complex logic with inline comments

## Quality Standards
- Follow patterns in existing codebase
- Write tests for all new code
- Handle edge cases and errors
- Use TypeScript strict mode (or Python type hints)
- No console.log / print statements in final code
- All functions have clear names and purposes

## When You're Done
Run: npm run lint && npm test
If both pass, signal completion.
The validator will review your work.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Validator Agent
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/agents/validator.md"
            code={`---
name: validator
description: Validates code quality and correctness (read-only)
tools:
  - Read
  - Glob
  - Grep
  - Bash
allowed_commands:
  - npm test
  - npm run lint
  - git diff
model: sonnet-4.5
---

# Code Validator

You are a strict code reviewer with read-only access. Your job is to catch issues
the builder missed.

## Your Responsibilities
- Review all files modified by the builder
- Check code quality, correctness, test coverage
- Verify requirements from spec are met
- Look for edge cases, security issues, performance problems
- Write detailed feedback in .tasks/reviews/[feature]-validation.md

## Validation Checklist
1. **Correctness** — Does it do what the spec requires?
2. **Tests** — Are all critical paths tested?
3. **Edge Cases** — Are errors and edge cases handled?
4. **Security** — Any XSS, injection, or auth issues?
5. **Performance** — Any obvious performance problems?
6. **Code Quality** — Clear naming, proper abstractions?
7. **Documentation** — Complex logic explained?

## Output Format
Write .tasks/reviews/[feature]-validation.md with:

**Status:** PASS or FAIL

**Issues Found:**
- [High/Medium/Low] Description of issue
- File: path/to/file.ts:line
- Recommendation: How to fix

**If PASS:** Congratulations, code is ready for merge.
**If FAIL:** Builder must address issues before proceeding.

## Important
You can ONLY read and analyze. You cannot fix issues yourself.
Your role is to identify problems, not solve them.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Builder/Validator Loop
          </h3>
          <CodeBlock
            lang="text"
            filename="Workflow"
            code={`1. Run builder:
   /agent builder
   > Read .tasks/specs/time-tracking.md and implement the feature

2. Builder completes, runs tests, signals done

3. Hook triggers validator:
   /agent validator
   > Review the implementation and write validation report

4. Validator finds issues:
   Status: FAIL
   - [High] Missing error handling in startTimer function
   - [Medium] No test for edge case: starting timer when one is running

5. Pass feedback back to builder:
   /agent builder
   > Read .tasks/reviews/time-tracking-validation.md and fix the issues

6. Builder fixes issues, validator re-reviews

7. Validator approves:
   Status: PASS

8. Feature complete, ready for merge`}
          />

          <Callout type="info" title="Adversarial = Higher Quality">
            The builder knows the validator will scrutinize its work. This encourages the builder to
            be thorough. The validator has fresh eyes and catches issues the builder missed. The
            combination produces <strong>higher quality</strong> than a single agent working alone.
          </Callout>
        </section>

        {/* GOVERNANCE */}
        <section id="governance">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Governance Through Scoped Permissions
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Each agent in the pipeline has <strong className="text-[#e6edf3]">minimum necessary
            permissions</strong>. This is <strong className="text-[#e6edf3]">defense in depth</strong>
            — even if an agent makes an error or is compromised, its limited permissions contain the
            damage.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Permission Matrix
          </h3>
          <CodeBlock
            lang="text"
            filename="Pipeline permissions"
            code={`Agent              | Tools                    | Allowed Paths          | Blocked
───────────────────|──────────────────────────|────────────────────────|──────────────────
pm-spec            | Write, Read              | .tasks/specs/**        | src/**, tests/**
architect-review   | Read, Write              | .tasks/**, src/**, docs/** | (no blocks)
implementer-tester | Read, Write, Edit, Bash  | src/**, tests/**       | rm -rf, force push
validator          | Read, Glob, Grep, Bash   | All (read-only)        | Write, Edit
code-review        | Read, Write              | .tasks/reviews/**      | src/**, tests/**`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Implementing Permission Boundaries
          </h3>
          <CodeBlock
            lang="yaml"
            filename="Agent frontmatter with restrictions"
            code={`---
name: implementer-tester
tools:
  - Read
  - Write
  - Edit
  - Bash
allowed_paths:
  - src/**
  - tests/**
  - package.json
  - tsconfig.json
blocked_paths:
  - .env
  - .env.*
  - secrets/**
blocked_commands:
  - rm -rf
  - git push --force
  - npm publish
---`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Path-Based Access Control Hook
          </h3>
          <CodeBlock
            lang="bash"
            filename=".claude/hooks/enforce-permissions.sh"
            code={`#!/bin/bash
# Enforces agent path restrictions

set -e

input=$(cat)
agent=$(echo "$input" | jq -r '.agent_name')
tool=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.parameters.file_path // empty')

if [ -z "$file_path" ]; then
  exit 0  # No file path, nothing to check
fi

# Load agent's allowed paths from .claude/agents/$agent.md
agent_file=".claude/agents/$agent.md"
if [ ! -f "$agent_file" ]; then
  exit 0  # No restrictions defined
fi

# Extract allowed_paths from YAML frontmatter
allowed_paths=$(sed -n '/^allowed_paths:/,/^[a-z_]*:/p' "$agent_file" | grep '  -' | sed 's/  - //')

if [ -z "$allowed_paths" ]; then
  exit 0  # No restrictions
fi

# Check if file_path matches any allowed pattern
allowed=false
while IFS= read -r pattern; do
  pattern=$(echo "$pattern" | tr -d ' ')
  # Convert glob pattern to regex
  regex=$(echo "$pattern" | sed 's/\*\*/.*/' | sed 's/\*/[^/]*/')
  if echo "$file_path" | grep -qE "^$regex$"; then
    allowed=true
    break
  fi
done <<< "$allowed_paths"

if [ "$allowed" = false ]; then
  echo "ERROR: Permission denied"
  echo "Agent '$agent' is not allowed to access: $file_path"
  echo "Allowed paths:"
  echo "$allowed_paths"
  exit 1
fi

exit 0`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Security Best Practices
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Principle of least privilege</strong> — Grant
                  only the permissions required for the job
                </>,
                <>
                  <strong className="text-[#e6edf3]">Read-only validators</strong> — Reviewers should
                  never be able to modify code
                </>,
                <>
                  <strong className="text-[#e6edf3]">Block destructive commands</strong> — No rm -rf,
                  no force push, no publish
                </>,
                <>
                  <strong className="text-[#e6edf3]">Protect sensitive paths</strong> — Block access
                  to .env, secrets, credentials
                </>,
                <>
                  <strong className="text-[#e6edf3]">Audit trail via hooks</strong> — Log all tool
                  calls for security review
                </>,
              ],
              '#f85149'
            )}
          </div>

          <Callout type="warning" title="Defense in Depth">
            Layer multiple security mechanisms: tool restrictions in agent config + path restrictions
            in hooks + command blocking + human gates at high-risk transitions. No single layer is
            perfect, but together they create <strong>robust governance</strong>.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Build a Full Pipeline for TaskForge Time Tracking
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's build a complete supervisor architecture for adding time tracking to TaskForge.
            We'll create four agents, validation hooks, and a queue-based pipeline.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create Pipeline Structure
            </h3>
            <CodeBlock
              code={`cd taskforge-tutorial/nextjs  # or /fastapi
mkdir -p .tasks/{requests,specs,reviews}
mkdir -p .claude/{agents,hooks}`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create the feature request:
            </p>
            <CodeBlock
              lang="markdown"
              filename=".tasks/requests/time-tracking.md"
              code={`# Feature Request: Time Tracking

## User Need
Users need to track time spent on tasks for billing and productivity analysis.

## High-Level Requirements
- Start/stop timer for a task
- View time entries for a task
- Edit/delete time entries
- Generate time reports by project/user

## Business Value
Enables accurate client billing and team productivity insights.

## Priority
High — requested by 3 enterprise customers`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Create Pipeline Agents
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create all four agents using the patterns shown earlier in this tutorial:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'pm-spec.md — Creates structured spec from feature request',
                  'architect-review.md — Validates technical feasibility',
                  'implementer-tester.md — Builds feature with tests',
                  'validator.md — Reviews code quality (read-only)',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Use the code examples from earlier sections. Customize the system prompts for time
              tracking specifics.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Create Validation Hooks
            </h3>
            <CodeBlock
              code={`# Create the three hooks from earlier sections:
chmod +x .claude/hooks/validate-spec.sh
chmod +x .claude/hooks/validate-implementation.sh
chmod +x .claude/hooks/human-gate-review.sh
chmod +x .claude/hooks/pipeline-coordinator.sh`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Configure them in settings.json:
            </p>
            <CodeBlock
              lang="json"
              filename="settings.json"
              code={`{
  "hooks": {
    "SubagentStop": [
      ".claude/hooks/validate-spec.sh",
      ".claude/hooks/validate-implementation.sh",
      ".claude/hooks/human-gate-review.sh",
      ".claude/hooks/pipeline-coordinator.sh"
    ]
  }
}`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Initialize Pipeline Queue
            </h3>
            <CodeBlock
              lang="json"
              filename=".tasks/pipeline-queue.json"
              code={`{
  "current_stage": "spec",
  "feature": "time-tracking",
  "stages": [
    {
      "name": "spec",
      "agent": "pm-spec",
      "status": "in-progress",
      "input": ".tasks/requests/time-tracking.md",
      "output": ".tasks/specs/time-tracking.md"
    },
    {
      "name": "review",
      "agent": "architect-review",
      "status": "pending",
      "input": ".tasks/specs/time-tracking.md",
      "output": ".tasks/reviews/time-tracking-review.md"
    },
    {
      "name": "implement",
      "agent": "implementer-tester",
      "status": "pending",
      "input": ".tasks/specs/time-tracking.md",
      "output": "src/**"
    },
    {
      "name": "validate",
      "agent": "validator",
      "status": "pending",
      "input": "src/**",
      "output": ".tasks/reviews/time-tracking-validation.md"
    }
  ],
  "history": []
}`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Run the Pipeline
            </h3>
            <CodeBlock
              lang="text"
              filename="In Claude Code"
              code={`# Stage 1: Spec
claude
> /agent pm-spec
> Read .tasks/requests/time-tracking.md and create a complete feature spec

# (pm-spec creates spec, validation hook checks it, coordinator suggests next stage)

# Stage 2: Review
> /agent architect-review
> Read .tasks/specs/time-tracking.md and perform architectural review

# (architect reviews, human gate hook pauses for approval)
# Review .tasks/reviews/time-tracking-review.md
# If approved, continue:

# Stage 3: Implement
> /agent implementer-tester
> Read .tasks/specs/time-tracking.md and implement the feature with tests

# (implementer builds, validation hook runs tests, coordinator suggests next)

# Stage 4: Validate
> /agent validator
> Review all implementation files and write validation report

# (validator reviews, provides feedback or approval)
# If issues found, return to implementer:
> /agent implementer-tester
> Read .tasks/reviews/time-tracking-validation.md and fix issues`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Review Pipeline Output
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              After the pipeline completes, you should have:
            </p>
            <CodeBlock
              lang="text"
              filename="Pipeline artifacts"
              code={`.tasks/
├── requests/
│   └── time-tracking.md                    # Original request
├── specs/
│   └── time-tracking.md                    # Detailed spec
├── reviews/
│   ├── time-tracking-review.md             # Architect review
│   └── time-tracking-validation.md         # Code validation
└── pipeline-queue.json                     # Pipeline state

src/
├── components/features/TimeTracker.tsx     # New component
├── hooks/useTimeTracking.ts                # Time tracking logic
└── api/time-entries/                       # API routes

tests/
└── features/time-tracking.test.tsx         # Tests`}
            />
          </div>

          <Callout type="info" title="Pipeline Complete">
            You've built a full supervised pipeline with quality gates, human approval points, and
            automated validation. This pattern scales to any multi-stage workflow: feature development,
            bug fixes, refactors, migrations, or documentation generation.
          </Callout>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Design a Pipeline for Your Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Take a feature you're building and design a supervisor pipeline for it:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Identify the stages (spec, review, implement, validate, etc.)',
                  'Define agent responsibilities for each stage',
                  'Determine tool permissions for each agent',
                  'Identify where human gates are needed',
                  'Create a queue file structure',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Document your design in a pipeline-design.md file.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Implement Builder/Validator for Test Generation
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Create a builder/validator pair where:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'test-builder agent writes tests for untested code',
                  'test-validator agent reviews test quality (coverage, edge cases)',
                  'Use the adversarial pattern to iteratively improve tests',
                  'Run on a file with no tests in your codebase',
                ],
                '#d29922'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Create Quality Gate Hooks
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Build validation hooks specific to your project:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Code coverage threshold check (minimum 70%)',
                  'Bundle size check (fail if over limit)',
                  'Dependency security audit (npm audit or safety)',
                  'Documentation completeness check',
                ],
                '#f85149'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Configure these as SubagentStop hooks that block progression if checks fail.
            </p>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You've mastered supervisor architectures with multi-stage pipelines, quality gates, and
            governed workflows. This creates <strong>automated quality control</strong> while keeping
            humans in the loop at critical decision points.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 15 — Agent Teams
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              Supervisor architectures coordinate agents sequentially through pipelines. But what if
              agents need to work in parallel and communicate directly? Agent Teams remove the
              bottleneck by enabling direct inter-agent messaging, shared task lists, and real-time
              coordination. Perfect for features that span frontend, backend, and testing simultaneously.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Subagents vs teams, spawn prompts,
              direct messaging, task claiming, dependencies, split pane display, token cost management.
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
              onClick={() => onSelectTutorial(15)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Agent Teams →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
