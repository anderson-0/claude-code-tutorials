'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorials, levelColors, levelLabels, type Section } from '#/lib/tutorials-data'

const meta = tutorials[8] // Tutorial 9 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'context-window', short: 'Context' },
  { id: 'context-rot', short: 'Context Rot' },
  { id: 'model-selection', short: 'Models' },
  { id: 'compaction', short: 'Compaction' },
  { id: 'clean-contexts', short: 'Clean Start' },
  { id: 'session-handoff', short: 'Handoff' },
  { id: 'tasks-pattern', short: '.tasks/' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'token-costs', short: 'Costs' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial9Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial9({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial9Props) {
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
            Token Optimization & Context Management
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
            Claude Code's effectiveness{' '}
            <strong className="text-[#e6edf3]">degrades as context fills up</strong>. Strategic
            context management is the difference between productive all-day sessions and frustrating ones.
          </p>

          <div className="my-5 grid grid-cols-3 gap-3">
            {[
              { icon: '🧠', label: 'Context Budget', desc: 'Think in tokens, not files', color: '#3fb950' },
              { icon: '♻️', label: 'Context Rot', desc: 'Recognize decay patterns', color: '#d29922' },
              { icon: '🎯', label: 'Model Strategy', desc: 'Pick the right tool', color: '#58a6ff' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4 text-center"
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
                desc: 'Context windows, model selection, compaction, session handoff patterns',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorial 4 (Define → Plan workflow), .tasks/ folder setup',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code, TaskForge project, understanding of Tutorial 4 workflow',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Context management strategies for complex multi-session features',
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

          <Callout type="info" title="Why This Matters">
            Without context management, sessions degrade: Claude forgets earlier decisions,
            contradicts itself, or produces lower-quality output. Strategic context use keeps
            sessions <strong>productive for hours</strong> instead of minutes.
          </Callout>
        </section>

        {/* UNDERSTANDING THE CONTEXT WINDOW */}
        <section id="context-window">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Understanding the Context Window
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The <strong className="text-[#e6edf3]">context window</strong> is all the text Claude
            can "see" at once: your messages, its responses, file contents, tool outputs. Think of
            it as working memory with a hard limit.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            What Fills the Context Window
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Your prompts</strong> — Everything you type
                </>,
                <>
                  <strong className="text-[#e6edf3]">Claude's responses</strong> — All text
                  generated, including reasoning
                </>,
                <>
                  <strong className="text-[#e6edf3]">File contents</strong> — Every file Claude
                  reads with Read, Glob, Grep
                </>,
                <>
                  <strong className="text-[#e6edf3]">Tool outputs</strong> — Terminal command
                  output, test results, error logs
                </>,
                <>
                  <strong className="text-[#e6edf3]">System instructions</strong> — CLAUDE.md,
                  rules, skills (constant overhead)
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Context Window as a Budget
          </h3>
          <CodeBlock
            lang="text"
            filename="Mental model"
            code={`Claude Opus 4.5:   200K tokens (~500 pages of text)
Claude Sonnet 4.5: 200K tokens
Claude Haiku 4.5:  200K tokens

Typical token consumption:
- 1 prompt (complex):         500-2000 tokens
- 1 response (code + text):   1000-5000 tokens
- 1 file read (React comp):   500-2000 tokens
- 1 grep search result:       200-1000 tokens
- 1 npm test output:          1000-5000 tokens

After 20-30 interactions, you've used 30-50K tokens.
After a full day session, you might hit 150-180K tokens.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When Context Fills Up
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            As the window approaches its limit:
          </p>
          <div className="my-3">
            {bullet(
              [
                'Responses slow down (more processing required)',
                'Accuracy decreases (older context deprioritized)',
                'Token limits trigger auto-compaction or errors',
                'Cost increases (you pay per token)',
              ],
              '#d29922'
            )}
          </div>

          <Callout type="warning" title="Context ≠ Memory">
            Claude doesn't "remember" past sessions. Everything must be in the current context window.
            This is why patterns like <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.tasks/</code> files
            are critical — they persist context across sessions.
          </Callout>
        </section>

        {/* CONTEXT ROT */}
        <section id="context-rot">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Context Rot
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            <strong className="text-[#e6edf3]">Context rot</strong> is when accumulated conversation
            history causes Claude to give worse answers over time. It's subtle at first, then suddenly
            obvious.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Signs of Context Rot
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                title: 'Repeating Past Mistakes',
                desc: 'Claude makes an error, you correct it, then it makes the same error 10 messages later.',
                severity: 'High',
                color: '#f85149',
              },
              {
                title: 'Contradictory Advice',
                desc: 'Claude suggests an approach that conflicts with decisions made earlier in the session.',
                severity: 'High',
                color: '#f85149',
              },
              {
                title: 'Forgetting Project Conventions',
                desc: 'Starts using snake_case in a camelCase project, or ignores established patterns.',
                severity: 'Medium',
                color: '#d29922',
              },
              {
                title: 'Overly Verbose Responses',
                desc: 'Responses get longer with unnecessary explanations, recapping prior context.',
                severity: 'Low',
                color: '#58a6ff',
              },
              {
                title: 'Hallucinating Details',
                desc: 'Makes up API details or file structures that don\'t exist in your project.',
                severity: 'High',
                color: '#f85149',
              },
              {
                title: 'Asking Already-Answered Questions',
                desc: 'Requests information you provided 30 messages ago.',
                severity: 'Medium',
                color: '#d29922',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border bg-[#161b22] p-4"
                style={{ borderColor: `${item.color}30` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold" style={{ color: item.color }}>
                    {item.title}
                  </div>
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.severity}
                  </span>
                </div>
                <div className="text-[13px] text-[#8b949e]">{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Why Context Rot Happens
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Attention dilution</strong> — With 100K tokens
                  in context, Claude can't weight all of it equally
                </>,
                <>
                  <strong className="text-[#e6edf3]">Stale information</strong> — Early context
                  becomes outdated as code evolves
                </>,
                <>
                  <strong className="text-[#e6edf3]">Conflicting signals</strong> — Multiple
                  attempts at the same task create contradictory patterns
                </>,
                <>
                  <strong className="text-[#e6edf3]">Error accumulation</strong> — Small mistakes
                  compound into larger misunderstandings
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="tip" title="The 50-Message Rule of Thumb">
            After 50 interactions or when you notice any high-severity symptoms, start fresh. Don't
            fight context rot — embrace clean contexts.
          </Callout>
        </section>

        {/* MODEL SELECTION STRATEGY */}
        <section id="model-selection">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Model Selection Strategy
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code supports multiple models. Understanding when to use each optimizes both
            performance and cost.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Three Models (as of Jan 2025)
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                model: 'Claude Opus 4.5',
                id: 'claude-opus-4-5-20251101',
                when: 'Complex architecture, refactoring, critical decisions',
                cost: 'Highest',
                speed: 'Moderate',
                color: '#f85149',
              },
              {
                model: 'Claude Sonnet 4.5',
                id: 'claude-sonnet-4-5-20250929',
                when: 'Most daily work, feature implementation, debugging',
                cost: 'Moderate',
                speed: 'Fast',
                color: '#58a6ff',
              },
              {
                model: 'Claude Haiku 4.5',
                id: 'claude-haiku-4-5-20250124',
                when: 'Simple edits, documentation, repetitive tasks',
                cost: 'Lowest',
                speed: 'Very Fast',
                color: '#3fb950',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border bg-[#161b22] p-4"
                style={{ borderColor: `${item.color}30` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-bold" style={{ color: item.color }}>
                    {item.model}
                  </div>
                  <span className="rounded bg-[#161b22] px-2 py-0.5 font-mono text-[10px] text-[#8b949e]">
                    {item.cost} cost
                  </span>
                </div>
                <div className="mb-2 font-mono text-[11px] text-[#6e7681]">{item.id}</div>
                <div className="mb-2 text-[13px] text-[#c9d1d9]">
                  <strong className="text-[#e6edf3]">Use for:</strong> {item.when}
                </div>
                <div className="text-[11px] text-[#8b949e]">Speed: {item.speed}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The /model Command
          </h3>
          <CodeBlock
            code={`# Switch to Opus for complex refactor
/model opus

# Switch to Haiku for docs generation
/model haiku

# Switch back to Sonnet for normal work
/model sonnet

# Check current model
/model`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Hybrid Strategy (Recommended)
          </h3>
          <CodeBlock
            lang="text"
            filename="Model selection workflow"
            code={`1. Planning phase → Opus
   Complex decisions, architecture reviews, risk assessment

2. Implementation phase → Sonnet
   Most feature work, tests, integrations

3. Documentation phase → Haiku
   README updates, comments, changelog

4. Debugging → Sonnet or Opus
   Sonnet for typical bugs, Opus for complex/subtle issues`}
          />

          <Callout type="warning" title="Model Switch Resets Context">
            Switching models in Claude Code starts a new session. Use this strategically to get a
            clean context when you would have started fresh anyway.
          </Callout>
        </section>

        {/* COMPACTION */}
        <section id="compaction">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Compaction
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            <strong className="text-[#e6edf3]">Compaction</strong> is Claude Code's automatic
            summarization system. When context gets large, it condenses old messages into summaries
            to free up space.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            How Auto-Compaction Works
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  Claude Code monitors context usage throughout the session
                </>,
                <>
                  When usage exceeds ~70-80% of limit, compaction is triggered
                </>,
                <>
                  Old messages are summarized, preserving key decisions/facts
                </>,
                <>
                  Recent messages (last 10-20) remain uncompacted
                </>,
                <>
                  Compacted summaries are injected back into context
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The /compact Command
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You can manually trigger compaction:
          </p>
          <CodeBlock
            code={`# Trigger compaction immediately
/compact

# Use before starting a new major task in the same session
# Use after completing a feature before starting another`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Preparing for Compaction
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Before compacting, create persistent artifacts:
          </p>
          <CodeBlock
            lang="text"
            filename="Pre-compaction checklist"
            code={`> Before we compact, let's capture key context:
  1. Summarize decisions made in the last 50 messages
  2. List all files modified with brief descriptions
  3. Note any conventions or patterns established
  4. Document any unresolved issues or TODOs

  Write this summary to .tasks/in-progress/[current-task].md`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Limitations of Compaction
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Information loss</strong> — Summaries discard
                  nuance and detail
                </>,
                <>
                  <strong className="text-[#e6edf3]">No guarantee of quality</strong> — Compaction
                  might miss critical context
                </>,
                <>
                  <strong className="text-[#e6edf3]">Doesn't fix rot</strong> — Stale or
                  contradictory info may persist in summaries
                </>,
                <>
                  <strong className="text-[#e6edf3]">One-way operation</strong> — You can't
                  "uncompress" to see original messages
                </>,
              ],
              '#d29922'
            )}
          </div>

          <Callout type="tip" title="Compaction vs Clean Context">
            Compaction extends a session but doesn't solve context rot. For complex tasks or when
            quality degrades, <strong>start fresh</strong> instead of compacting.
          </Callout>
        </section>

        {/* CLEAN CONTEXT PATTERNS */}
        <section id="clean-contexts">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Clean Context Patterns
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Strategic use of <strong className="text-[#e6edf3]">clean contexts</strong> (new sessions)
            is the most powerful context management technique.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            When to Start Fresh
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                trigger: 'One Task Per Session',
                desc: 'Each feature, bug, or refactor gets its own session. Prevents cross-contamination.',
                benefit: 'Focused context, clear scope',
              },
              {
                trigger: 'After Major Phase Completion',
                desc: 'Finished implementation and tests pass? Start fresh for documentation or next feature.',
                benefit: 'Clean slate for new work',
              },
              {
                trigger: 'Context Rot Detected',
                desc: 'Notice repetition, contradictions, or hallucinations? Don\'t fight it — reset.',
                benefit: 'Restore quality',
              },
              {
                trigger: 'Switching Problem Domains',
                desc: 'Going from backend API work to frontend UI? Different context needs.',
                benefit: 'Avoid domain confusion',
              },
              {
                trigger: 'Morning / After Break',
                desc: 'Start each work session fresh. Previous session context is rarely useful.',
                benefit: 'Consistent baseline',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 font-semibold text-[#58a6ff]">
                  {item.trigger}
                </div>
                <div className="mb-2 text-[13px] text-[#c9d1d9]">{item.desc}</div>
                <div className="text-[11px] text-[#8b949e]">
                  <strong className="text-[#e6edf3]">Benefit:</strong> {item.benefit}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Fresh Start Protocol
          </h3>
          <CodeBlock
            lang="text"
            filename="Starting a clean session"
            code={`# 1. Save current state (if mid-task)
> Summarize progress on this task and save to
  .tasks/in-progress/[task-name].md

# 2. Exit current session
exit

# 3. Start new session
claude

# 4. Restore context from artifacts
> Read .tasks/in-progress/[task-name].md
  Continue from where we left off.`}
          />

          <Callout type="info" title="Fresh ≠ Starting Over">
            With task files and good documentation, a fresh session picks up immediately. You don't
            lose progress — you just drop stale context.
          </Callout>
        </section>

        {/* SESSION HANDOFF */}
        <section id="session-handoff">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Session Handoff
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            <strong className="text-[#e6edf3]">Session handoff</strong> is the practice of
            deliberately ending one session and continuing work in another, preserving all necessary
            context through files.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Why Handoff Instead of Continue?
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Prevents context rot</strong> — Fresh context
                  means no accumulated errors
                </>,
                <>
                  <strong className="text-[#e6edf3]">Faster responses</strong> — Smaller context
                  window processes quicker
                </>,
                <>
                  <strong className="text-[#e6edf3]">Lower cost</strong> — Less context = fewer
                  tokens per request
                </>,
                <>
                  <strong className="text-[#e6edf3]">Better focus</strong> — Only relevant context,
                  no historical baggage
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Handoff Workflow
          </h3>
          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">
              Session A: Before Handoff
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt in current session"
              code={`> I need to end this session. Create a handoff document:

  1. What we've accomplished so far
  2. Current state of implementation (what's done, what's next)
  3. Key decisions and patterns established
  4. Any blockers or issues encountered
  5. Next steps for continuation

  Save to .tasks/in-progress/[task-name]-handoff.md`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-3 text-[15px] font-semibold text-[#e6edf3]">
              Session B: After Handoff
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt in new session"
              code={`> Read .tasks/in-progress/[task-name]-handoff.md

  Continue the work described. Start with the next steps listed.`}
            />
            <p className="my-3 text-[13px] leading-relaxed text-[#8b949e]">
              The new session has zero baggage from Session A, only the essentials from the handoff
              document.
            </p>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Handoff Document
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/in-progress/notifications-handoff.md"
            code={`# Notification System Handoff

## Accomplished
- Created notification schema in Prisma (User, Notification models)
- Built NotificationService with create/read/markRead methods
- Implemented API routes: GET /api/notifications, POST /api/notifications/read
- Added React context (NotificationContext) for client state
- Created NotificationBell component with unread count badge

## Current State
- Backend complete and tested
- Frontend context wired up
- NotificationBell renders but dropdown UI not built yet

## Decisions Made
- Using Prisma for storage (no separate notification DB)
- Polling approach (no WebSockets yet, future enhancement)
- Notifications auto-expire after 30 days
- Categories: task_assigned, task_completed, mention

## Next Steps
1. Build NotificationDropdown component (list of notifications)
2. Add polling interval to NotificationContext (every 30s)
3. Integrate NotificationBell into app header
4. Add notification triggers in task mutations
5. Write integration tests for notification flow

## Blockers
None currently.

## Files Modified
- prisma/schema.prisma
- src/services/NotificationService.ts
- src/app/api/notifications/route.ts
- src/app/api/notifications/read/route.ts
- src/contexts/NotificationContext.tsx
- src/components/features/NotificationBell.tsx`}
          />

          <Callout type="tip" title="Handoff = Human-Readable Checkpoint">
            Think of handoff docs as save points in a game. You can load from any handoff doc,
            even weeks later, and Claude will have all the context needed.
          </Callout>
        </section>

        {/* .TASKS/ PATTERN AS PERSISTENT MEMORY */}
        <section id="tasks-pattern">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The .tasks/ Pattern as Persistent Memory
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You learned about <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.tasks/</code> in{' '}
            Tutorial 4. Now you see its true power: it's Claude's <strong className="text-[#e6edf3]">
            external memory system</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Why .tasks/ Solves Context Problems
          </h3>
          <div className="my-4 grid gap-3">
            {[
              {
                problem: 'Context Rot',
                solution: 'Task files persist correct decisions, overriding stale chat history',
              },
              {
                problem: 'Session Limits',
                solution: 'Task files survive session ends, model switches, browser crashes',
              },
              {
                problem: 'Handoff Friction',
                solution: 'New session reads task file and has complete context immediately',
              },
              {
                problem: 'Multi-Day Projects',
                solution: 'Task files accumulate context over days/weeks, session-independent',
              },
              {
                problem: 'Team Collaboration',
                solution: 'Human teammates read same files Claude uses, shared source of truth',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-2 font-semibold text-[#d29922]">
                  Problem: {item.problem}
                </div>
                <div className="text-[13px] text-[#c9d1d9]">
                  <strong className="text-[#3fb950]">Solution:</strong> {item.solution}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Enhanced .tasks/ Structure for Context Management
          </h3>
          <CodeBlock
            code={`.tasks/
├── todo/
│   └── feature-name.md              # Task definition
├── in-progress/
│   ├── feature-name.md              # Active task with plan
│   ├── feature-name-handoff.md      # Session handoff doc
│   └── feature-name-decisions.md    # Decision log
├── done/
│   └── feature-name.md              # Completed with summary
└── archive/
    └── old-tasks/                   # Cleaned out old tasks`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task File + Handoff: The Complete Pattern
          </h3>
          <CodeBlock
            lang="markdown"
            filename="Typical task file after several sessions"
            code={`# Add Notification System

## Overview
[original requirements]

## Plan
[implementation plan from planning session]

## Progress Log

### Session 1 (Jan 15)
- Created schema and migrations
- Built NotificationService
- Status: Backend complete, frontend pending

### Session 2 (Jan 16)
- Built React context and NotificationBell
- Status: See handoff doc for next steps

### Session 3 (Jan 17)
- Completed NotificationDropdown
- Integrated polling
- Status: Feature complete, testing pending

## Decisions
- Using polling (not WebSockets) for MVP
- Notifications expire after 30 days
- Four categories: task_assigned, task_completed, mention, system

## Testing
- [ ] Unit tests for NotificationService
- [ ] Integration tests for notification flow
- [ ] Manual test: create task, verify notification appears`}
          />

          <Callout type="info" title="Pattern Connection">
            This extends the Define → Plan → Iterate workflow from Tutorial 4. Now you see how it
            scales across multiple sessions and handles complex, multi-day features.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Build Notifications for TaskForge
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This exercise is large enough to require multiple sessions. You'll practice all context
            management strategies.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Session 1: Plan
            </h3>
            <CodeBlock
              code={`cd taskforge-tutorial/nextjs
claude`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a task file at .tasks/todo/add-notifications.md for building
  a notification system in TaskForge.

  Requirements:
  - Users receive notifications for: task assigned, task completed, mentions
  - Notification badge in header showing unread count
  - Dropdown to view/dismiss notifications
  - Notifications stored in database
  - Polling-based updates (no WebSockets for MVP)

  Include Overview, Why, Assumptions, Acceptance Criteria.
  Leave Plan blank.`}
            />
            <CodeBlock
              lang="text"
              filename="After task file is created"
              code={`> Read .tasks/todo/add-notifications.md and create an implementation plan.
  This is a large feature — break it into logical phases.

  Consider:
  - Backend (schema, service, API)
  - Frontend state management
  - UI components
  - Integration points
  - Testing strategy`}
            />
            <p className="my-3 text-[13px] leading-relaxed text-[#8b949e]">
              Review the plan. If it's good, end this session.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Session 2: Backend Implementation
            </h3>
            <CodeBlock
              code={`claude
mv .tasks/todo/add-notifications.md .tasks/in-progress/`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/in-progress/add-notifications.md

  Implement the backend portion of the plan:
  - Schema and migrations
  - NotificationService
  - API routes

  Run tests after each step. When backend is complete, create a handoff
  document at .tasks/in-progress/add-notifications-handoff.md`}
            />
            <p className="my-3 text-[13px] leading-relaxed text-[#8b949e]">
              After handoff doc is created, end this session.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Session 3: Frontend Implementation
            </h3>
            <CodeBlock
              code={`claude`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/in-progress/add-notifications-handoff.md

  Continue from where we left off. Implement:
  - NotificationContext for state management
  - NotificationBell component with badge
  - NotificationDropdown component
  - Polling mechanism

  Test after each component. When complete, update the handoff doc.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Session 4: Integration & Testing
            </h3>
            <CodeBlock
              code={`# Optional: switch to Haiku for integration work
claude
/model haiku`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/in-progress/add-notifications-handoff.md

  Final integration:
  - Add NotificationBell to app header
  - Add notification triggers in task mutations
  - Write integration tests
  - Manual testing

  When complete, summarize the entire feature and move task to done/.`}
            />
          </div>

          <Callout type="tip" title="Observe Context Management">
            Notice how each session is focused, has clear scope, and picks up seamlessly from the
            previous one. You never fight context rot because each session is fresh.
          </Callout>
        </section>

        {/* TOKEN COST AWARENESS */}
        <section id="token-costs">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Token Cost Awareness
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code charges per token. Good context management isn't just about quality — it's
            about cost efficiency.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Token Pricing (Approximate as of Jan 2025)
          </h3>
          <CodeBlock
            lang="text"
            filename="Rough cost estimates"
            code={`Claude Opus 4.5:
  Input:  $15 / 1M tokens (~$0.015 per 1K)
  Output: $75 / 1M tokens (~$0.075 per 1K)

Claude Sonnet 4.5:
  Input:  $3 / 1M tokens (~$0.003 per 1K)
  Output: $15 / 1M tokens (~$0.015 per 1K)

Claude Haiku 4.5:
  Input:  $0.80 / 1M tokens (~$0.0008 per 1K)
  Output: $4 / 1M tokens (~$0.004 per 1K)

Typical session (50 interactions, 60K tokens total):
  Opus:   $0.90 - $4.50 depending on input/output ratio
  Sonnet: $0.18 - $0.90
  Haiku:  $0.05 - $0.24`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Cost-Effective Strategies
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Use the right model</strong> — Don't use Opus
                  for simple tasks
                </>,
                <>
                  <strong className="text-[#e6edf3]">Start fresh often</strong> — Smaller context =
                  fewer input tokens per request
                </>,
                <>
                  <strong className="text-[#e6edf3]">Avoid redundant file reads</strong> — Don't
                  ask Claude to re-read files unnecessarily
                </>,
                <>
                  <strong className="text-[#e6edf3]">Use focused prompts</strong> — "Do X" vs "Let
                  me explain the entire history, then do X"
                </>,
                <>
                  <strong className="text-[#e6edf3]">Compact before continuing</strong> — If you
                  must continue a long session, compact first
                </>,
              ],
              '#3fb950'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Monitoring Usage
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code shows token usage in the interface. Check it periodically:
          </p>
          <CodeBlock
            lang="text"
            filename="Usage indicators"
            code={`Look for:
- "Context: 45K / 200K tokens" (context window usage)
- Cost estimate in settings/usage dashboard
- Warnings when approaching context limits

If context usage is high but session is still needed:
1. Run /compact to free space
2. Or start fresh and use handoff pattern`}
          />

          <Callout type="warning" title="Long Sessions Are Expensive">
            A 180K token session costs 3-6x more per request than a 60K token session (due to input
            tokens). Frequent fresh starts are both higher quality <strong>and</strong> cheaper.
          </Callout>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Exercises
          </h2>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Detect Context Rot
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Continue a Claude session until you hit 50+ messages. Intentionally create conditions
              for context rot (complex task, multiple iterations, corrections).
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Document the first sign of rot you notice',
                  'Try to continue working despite rot',
                  'Note how quality degrades',
                  'Start fresh and compare the difference',
                ],
                '#d29922'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Practice Handoff
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Build a feature across 3 sessions with explicit handoffs:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Session 1: Planning, save plan to task file',
                  'Session 2: Implement half, create handoff doc',
                  'Session 3: Complete from handoff doc',
                ],
                '#58a6ff'
              )}
            </div>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Verify Session 3 has zero knowledge of Session 1 chat history, only from files.
            </p>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Model Switching
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Build a feature using the hybrid model strategy:
            </p>
            <CodeBlock
              lang="text"
              filename="Workflow"
              code={`1. Use Opus for planning and architecture review
2. Switch to Sonnet for implementation
3. Switch to Haiku for documentation generation
4. Compare response quality and speed at each stage`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 4: Cost Analysis
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Track token usage for one day of development:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Record token usage after each session',
                  'Estimate cost based on pricing',
                  'Identify most expensive operations',
                  'Find opportunities for optimization',
                ],
                '#3fb950'
              )}
            </div>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You now understand how to manage Claude's context window for productive, cost-effective,
            multi-day projects. These strategies scale to professional development workflows.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #d2992250)',
              border: '1px solid #d2992270',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#d29922]">
              Up Next: Tutorial 10 — AI-Native Development Mindset
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              Move beyond "AI as a tool" to designing your entire workflow around what agents do best.
              Learn to think in terms of artifacts, delegation, verification loops, and parallel
              execution.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> AI-native vs AI-assisted,
              artifact-driven development, delegation patterns, autonomous verification, human-in-the-loop
              design.
            </div>
          </div>

          <div className="my-5 rounded-lg border border-[#21262d] bg-[#161b22] p-5">
            <h3 className="mb-3 text-[17px] font-semibold text-[#e6edf3]">
              Key Takeaways
            </h3>
            <div className="my-2">
              {bullet(
                [
                  'Context window is a finite resource — manage it like a budget',
                  'Context rot is real — recognize symptoms and reset before quality tanks',
                  'Fresh sessions with task files beat long sessions with compaction',
                  'Model selection affects both quality and cost — use the right tool',
                  'Handoff pattern enables multi-day features without context baggage',
                  '.tasks/ folder is persistent memory across all sessions',
                ],
                '#58a6ff'
              )}
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
              onClick={() => onSelectTutorial(10)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: AI-Native Development →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
