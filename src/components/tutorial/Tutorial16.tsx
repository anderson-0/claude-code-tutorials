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

const meta = tutorials[15] // Tutorial 16 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'what-is-ralph', short: 'What Is Ralph' },
  { id: 'loop-architecture', short: 'Architecture' },
  { id: 'background-tasks', short: 'Background' },
  { id: 'session-persistence', short: 'Persistence' },
  { id: 'checkpoint-rollback', short: 'Rollback' },
  { id: 'monitoring', short: 'Monitoring' },
  { id: 'safety-gates', short: 'Safety' },
  { id: 'cost-management', short: 'Costs' },
  { id: 'when-break', short: 'Breaking' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial16Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial16({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial16Props) {
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
            Ralph — Autonomous AI Development Loops
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
            This tutorial teaches you to build a{' '}
            <strong className="text-[#e6edf3]">fully autonomous development loop</strong> where
            Claude Code continuously works through a queue of tasks: reading tickets, planning
            implementations, writing code, running tests, committing changes, and creating pull
            requests with minimal human intervention.
          </p>

          <div className="my-5 grid grid-cols-4 gap-3">
            {[
              { icon: '🔄', label: 'Read', desc: 'Pick next task from queue', color: '#3fb950' },
              { icon: '📋', label: 'Plan', desc: 'Generate implementation approach', color: '#58a6ff' },
              { icon: '⚙️', label: 'Build', desc: 'Implement and test changes', color: '#d29922' },
              { icon: '✅', label: 'Verify', desc: 'Self-check before moving on', color: '#f85149' },
            ].map((phase, i) => (
              <div
                key={i}
                className="rounded-[10px] border bg-[#161b22] p-4 text-center"
                style={{ borderColor: `${phase.color}50` }}
              >
                <div className="mb-2 text-2xl">{phase.icon}</div>
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
                desc: 'Autonomous loop architecture, safety gates, monitoring, cost management',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 14-15, TaskForge, understanding of supervisor patterns',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code, task queue system, monitoring hooks',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'A working autonomous loop processing real bug backlog',
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

          <Callout type="warning" title="Power and Responsibility">
            Autonomous loops can accomplish extraordinary work, but they require careful design
            and monitoring. This tutorial emphasizes <strong>safety gates</strong>,{' '}
            <strong>circuit breakers</strong>, and <strong>human review triggers</strong> to
            ensure the loop remains productive and safe.
          </Callout>
        </section>

        {/* WHAT IS RALPH */}
        <section id="what-is-ralph">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What Is "Ralph"?
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            "Ralph" is named after the{' '}
            <strong className="text-[#e6edf3]">Ralph Wiggum loop</strong> pattern from the Claude
            Code community. The concept: an agent loop that keeps working through a queue of
            tasks, self-verifying at each step, and only stopping when it needs human input or
            encounters an error it can't resolve.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Core Loop
          </h3>
          <CodeBlock
            lang="typescript"
            filename="ralph-loop-pseudocode.ts"
            code={`async function ralphLoop(taskQueue: TaskQueue) {
  while (taskQueue.hasNext()) {
    const task = taskQueue.next()

    try {
      // Phase 1: Plan
      const plan = await claude.plan(task)
      if (needsHumanReview(plan)) {
        await requestReview(plan)
        continue
      }

      // Phase 2: Implement
      const changes = await claude.implement(plan)

      // Phase 3: Verify
      const verification = await claude.verify(changes)
      if (!verification.passed) {
        await handleFailure(verification)
        continue
      }

      // Phase 4: Commit and move on
      await commitChanges(changes)
      taskQueue.markComplete(task)

    } catch (error) {
      await handleError(task, error)
      if (shouldStopLoop(error)) break
    }
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            What Makes It "Autonomous"?
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Self-directed task selection</strong> — Picks
                  next task from queue without human prompt
                </>,
                <>
                  <strong className="text-[#e6edf3]">Automatic verification</strong> — Runs tests
                  and checks to prove correctness before moving on
                </>,
                <>
                  <strong className="text-[#e6edf3]">Checkpoint-based recovery</strong> — Can
                  automatically rollback bad changes
                </>,
                <>
                  <strong className="text-[#e6edf3]">Intelligent stopping</strong> — Knows when to
                  pause for human review or stop on critical errors
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="info" title="Community Origins">
            The Ralph pattern emerged organically from Claude Code users who wanted to batch-process
            backlogs. It's not an official feature — it's a workflow pattern you build using
            Claude Code's primitives: task files, subagents, hooks, and prompt design.
          </Callout>
        </section>

        {/* LOOP ARCHITECTURE */}
        <section id="loop-architecture">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Loop Architecture
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The autonomous loop follows a strict sequence:{' '}
            <strong className="text-[#e6edf3]">read → plan → implement → test → verify → commit → next</strong>.
            The verification step is what makes it work — Claude must prove its changes are
            correct before moving on.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Task Queue Structure
          </h3>
          <CodeBlock
            code={`.tasks/
├── queue/           # Tasks waiting to be processed
│   ├── 001-fix-login-bug.md
│   ├── 002-add-error-handling.md
│   └── 003-optimize-query.md
├── in-progress/     # Currently being worked on
│   └── 000-setup-tests.md
├── completed/       # Finished and verified
│   └── ...
└── blocked/         # Needs human review
    └── ...`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Ralph Supervisor Agent
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/agents/ralph.md"
            code={`# Ralph — Autonomous Development Loop

## Role
You are Ralph, an autonomous agent that processes development tasks from the queue.
You work independently, self-verify, and only stop for human review when necessary.

## Process

### 1. Select Task
- Read next numbered file from .tasks/queue/
- Move to .tasks/in-progress/
- If queue is empty, report completion and stop

### 2. Plan
- Read task file
- Generate implementation plan
- Save plan to task file
- Check if plan needs human review (see Safety Gates below)

### 3. Implement
- Execute plan step by step
- Create checkpoints after each logical unit of work
- Run tests after each checkpoint

### 4. Verify
- Run full test suite
- Run lint/type checks
- Verify all acceptance criteria
- If ANY verification fails, rollback and retry OR flag for human review

### 5. Commit & Move On
- Commit with descriptive message
- Move task to .tasks/completed/
- Return to step 1

## Safety Gates
Flag for human review if:
- Changes affect authentication/authorization
- Database schema migrations required
- Breaking API changes detected
- More than 10 files modified
- Tests fail after 2 retry attempts
- Task file has "HUMAN_REVIEW_REQUIRED" flag

## Circuit Breakers
Stop the loop if:
- 3 consecutive task failures
- Any file deletion in src/
- Changes outside allowed directories
- Budget limit reached (track with /usage)
- Session duration > 2 hours without human check-in

## Checkpoints
- Create checkpoint before each major change
- Tag with: "ralph-checkpoint-{task-id}-{step}"
- Auto-rollback if verification fails

## Monitoring
- Log each phase transition to .claude/logs/ralph.log
- Emit hook events for monitoring dashboard
- Report status every 15 minutes`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Starting the Loop
          </h3>
          <CodeBlock
            code={`# Activate Ralph
claude --agent ralph

# Initial prompt (only once)
> You are now Ralph. Begin processing tasks from .tasks/queue/.
  Remember: plan → implement → verify → commit → next.
  Stop for human review when safety gates trigger.

  Start with task 001.`}
          />
        </section>

        {/* BACKGROUND TASKS */}
        <section id="background-tasks">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Background Tasks
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Long-running processes (dev servers, file watchers, log monitors) that run without
            blocking Claude's main work. Background tasks let Ralph keep services running while
            it implements features.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Configuring Background Processes
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".claude/config/background-tasks.md"
            code={`# Background Tasks Configuration

## Dev Server
\`\`\`bash
# Start in background, monitor for errors
npm run dev &
DEV_SERVER_PID=$!

# Monitor logs
tail -f dev-server.log | grep ERROR
\`\`\`

## Test Watcher
\`\`\`bash
# Run tests in watch mode
npm run test:watch &
TEST_WATCHER_PID=$!
\`\`\`

## Type Checker
\`\`\`bash
# Continuous type checking
npm run typecheck -- --watch &
TYPE_CHECK_PID=$!
\`\`\`

## Cleanup on Exit
\`\`\`bash
# Hook: on-session-end
kill $DEV_SERVER_PID $TEST_WATCHER_PID $TYPE_CHECK_PID
\`\`\`
`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Using run_in_background Parameter
          </h3>
          <CodeBlock
            lang="text"
            filename="Starting background tasks in Ralph"
            code={`# Ralph's initialization
> Start the dev server in background:
  npm run dev

  Use run_in_background: true so it doesn't block the loop.
  Monitor the output periodically for errors.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Monitoring Background Processes
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/monitor-background.ts"
            code={`// Hook: after-tool-call
export async function afterToolCall(result: ToolResult) {
  if (result.toolName === 'Bash' && result.run_in_background) {
    // Check for errors in background process output
    const output = await getBackgroundOutput(result.pid)
    if (output.includes('ERROR') || output.includes('FATAL')) {
      await notifyRalph({
        type: 'background-error',
        process: result.command,
        output
      })
    }
  }
}`}
          />

          <Callout type="tip" title="Don't Block the Loop">
            Always run long-lived processes with <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">run_in_background: true</code>.
            Ralph needs to keep moving through tasks while services run.
          </Callout>
        </section>

        {/* SESSION PERSISTENCE */}
        <section id="session-persistence">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Session Persistence
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Autonomous loops must survive disconnects, crashes, and manual stops. Task files act
            as persistent state. Checkpoints act as rollback points. Resume strategies handle
            interruptions gracefully.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            State Management via Task Files
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/in-progress/002-fix-auth-bug.md"
            code={`# Fix Authentication Token Expiry Bug

## Status: IN_PROGRESS
## Last Updated: 2024-03-20 14:32:15
## Agent: ralph
## Checkpoint: step-2-completed

## Plan
- [x] Step 1: Add token refresh logic
- [x] Step 2: Update auth middleware
- [ ] Step 3: Add expiry tests
- [ ] Step 4: Verify end-to-end flow

## Implementation Log
- 14:15 - Implemented token refresh in src/auth/refresh.ts
- 14:23 - Updated middleware, tests passing
- 14:32 - Starting step 3 (test addition)

## Verification Checklist
- [x] Lint passes
- [x] Type check passes
- [ ] Unit tests pass
- [ ] Integration tests pass`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Resume After Interruption
          </h3>
          <CodeBlock
            code={`# Restart Claude, activate Ralph
claude --agent ralph

# Ralph reads task state and resumes
> Ralph, resume the loop. Check .tasks/in-progress/ for any incomplete
  tasks. Read the status and continue from the last checkpoint.`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Automatic State Tracking Hook
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/track-state.ts"
            code={`// Hook: after-agent-task-update
export async function afterAgentTaskUpdate(task: Task) {
  const stateFile = \`.tasks/in-progress/\${task.id}.md\`

  // Update status section
  await appendToFile(stateFile, {
    status: task.status,
    lastUpdated: new Date().toISOString(),
    checkpoint: getCurrentCheckpoint(),
    log: \`\${timestamp()} - \${task.currentStep}\`
  })

  // Backup state to Redis/DB for multi-session coordination
  await saveToRedis(\`ralph:state:\${task.id}\`, task)
}`}
          />

          <Callout type="warning" title="Manual Stop Protocol">
            If you need to stop Ralph manually, send: <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">/stop</code> or{' '}
            <strong className="text-[#e6edf3]">"Ralph, pause the loop and save state."</strong>
            <br />This ensures the current task status is saved before stopping.
          </Callout>
        </section>

        {/* CHECKPOINT-BASED ROLLBACK */}
        <section id="checkpoint-rollback">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Checkpoint-Based Rollback
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Every change creates a checkpoint. If autonomous Claude takes a wrong turn, the loop
            can rewind automatically or flag for human review. Checkpoints are your safety net.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Creating Checkpoints Automatically
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/auto-checkpoint.ts"
            code={`// Hook: before-edit
export async function beforeEdit(file: string) {
  const taskId = getCurrentTaskId()
  const step = getCurrentStep()

  // Create git checkpoint
  await exec(\`git add . && git commit -m "ralph-checkpoint-\${taskId}-\${step}"\`)

  // Tag for easy rollback
  await exec(\`git tag ralph/\${taskId}/step-\${step}\`)

  console.log(\`Checkpoint created: \${taskId}/step-\${step}\`)
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Automatic Rollback on Verification Failure
          </h3>
          <CodeBlock
            lang="typescript"
            filename="ralph-verification-logic.ts"
            code={`async function verifyChanges(): Promise<VerificationResult> {
  const results = {
    lint: await runLint(),
    tests: await runTests(),
    typecheck: await runTypeCheck()
  }

  if (!results.lint.passed || !results.tests.passed || !results.typecheck.passed) {
    // Automatic rollback
    await rollbackToLastCheckpoint()

    // Try again with different approach
    if (retryCount < MAX_RETRIES) {
      return await retryWithAlternativeApproach()
    }

    // Flag for human review
    await flagForReview({
      reason: 'Verification failed after retries',
      failures: results
    })

    return { passed: false, needsHuman: true }
  }

  return { passed: true }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Manual Rollback
          </h3>
          <CodeBlock
            code={`# List available checkpoints
git tag | grep ralph

# Rollback to specific checkpoint
git reset --hard ralph/002/step-3

# Or use Claude's /rewind command
/rewind ralph/002/step-3`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Rollback Decision Tree
          </h3>
          <CodeBlock
            lang="typescript"
            filename="rollback-decision.ts"
            code={`function shouldRollback(verification: VerificationResult): RollbackDecision {
  // Critical failures: immediate rollback
  if (verification.criticalErrors.length > 0) {
    return { action: 'rollback', retry: false, flagHuman: true }
  }

  // Test failures: rollback and retry with different approach
  if (verification.testsFailed) {
    return { action: 'rollback', retry: true, maxRetries: 2 }
  }

  // Lint/style issues: fix without rollback
  if (verification.lintWarnings) {
    return { action: 'fix-in-place', retry: false }
  }

  return { action: 'continue' }
}`}
          />
        </section>

        {/* MONITORING AND OBSERVABILITY */}
        <section id="monitoring">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Monitoring and Observability
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Hook-based logging captures every tool call, task transition, and agent lifecycle
            event. TTS alerts notify you when Claude needs input. Notification hooks fire on
            completion or errors.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Comprehensive Logging Hook
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/ralph-logger.ts"
            code={`// Hook: after-tool-call
export async function afterToolCall(result: ToolResult) {
  const log = {
    timestamp: new Date().toISOString(),
    tool: result.toolName,
    taskId: getCurrentTaskId(),
    phase: getRalphPhase(),
    success: !result.error,
    duration: result.duration,
    tokensUsed: result.tokens,
    details: result.summary
  }

  // Append to Ralph log
  await appendJSON('.claude/logs/ralph.log', log)

  // Send to monitoring dashboard
  await sendToMonitoring(log)

  // Alert on errors
  if (result.error && result.critical) {
    await sendTTSAlert(\`Ralph encountered critical error in \${result.toolName}\`)
    await sendSlackNotification({
      channel: '#ralph-monitoring',
      message: \`🚨 Ralph stopped: \${result.error}\`
    })
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Real-Time Dashboard
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/monitoring/dashboard.ts"
            code={`// Simple web dashboard for Ralph monitoring
import express from 'express'
import { watchFile } from 'fs'

const app = express()

// Serve real-time Ralph status
app.get('/status', async (req, res) => {
  const status = {
    currentTask: await getCurrentTask(),
    phase: await getRalphPhase(),
    queueLength: await getQueueLength(),
    completedToday: await getCompletedCount(),
    tokensUsed: await getTotalTokens(),
    uptime: getUptimeMinutes(),
    lastCheckpoint: await getLastCheckpoint(),
    errors: await getRecentErrors()
  }
  res.json(status)
})

// WebSocket for live updates
io.on('connection', (socket) => {
  watchFile('.claude/logs/ralph.log', () => {
    socket.emit('log-update', getLatestLogs())
  })
})

app.listen(3001)`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            TTS Alerts for Human Input
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/tts-alerts.ts"
            code={`// Hook: on-human-review-needed
export async function onHumanReviewNeeded(context: ReviewContext) {
  // Text-to-speech alert
  await speak(\`Ralph needs your review for task \${context.taskId}\`)

  // Desktop notification
  await notify({
    title: 'Ralph Needs Review',
    body: \`Task: \${context.taskTitle}\\nReason: \${context.reason}\`,
    sound: 'Glass'
  })

  // Optional: pause music, flash screen, etc.
  await pauseSpotify()
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Completion Notifications
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/completion-notify.ts"
            code={`// Hook: on-task-completed
export async function onTaskCompleted(task: Task) {
  await sendSlackNotification({
    channel: '#dev-updates',
    message: \`✅ Ralph completed: \${task.title}\\n\` +
             \`Files changed: \${task.filesModified}\\n\` +
             \`Tests passing: \${task.testsPass}\\n\` +
             \`PR: \${task.prUrl}\`
  })

  // Update project board
  await updateLinear({
    issueId: task.linearId,
    status: 'Done',
    comment: \`Auto-completed by Ralph. See PR: \${task.prUrl}\`
  })
}`}
          />

          <Callout type="tip" title="Dashboard in Browser Tab">
            Keep the monitoring dashboard open in a browser tab. You can glance at Ralph's progress
            without interrupting your own work. Set alerts for errors or human-review-needed events.
          </Callout>
        </section>

        {/* SAFETY GATES AND CIRCUIT BREAKERS */}
        <section id="safety-gates">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Safety Gates and Circuit Breakers
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Automatic stop conditions prevent runaway loops: too many consecutive failures,
            unexpected file deletions, changes outside allowed directories, budget limits reached.
            Design your circuit breakers <strong className="text-[#e6edf3]">before</strong> enabling autonomy.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Safety Gate Configuration
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/config/safety-gates.yaml"
            code={`safety_gates:
  # Trigger human review
  human_review_required:
    - auth_changes: true
    - db_migrations: true
    - api_breaking_changes: true
    - files_modified_count: 10
    - test_failures_consecutive: 2

  # Stop loop immediately
  circuit_breakers:
    - task_failures_consecutive: 3
    - file_deletions_in: [src/, lib/, app/]
    - changes_outside: [src/, tests/, docs/]
    - token_budget_exceeded: 1000000
    - session_duration_hours: 2
    - critical_file_modified: [package.json, tsconfig.json]

  # Allowed operations
  permissions:
    allowed_directories: [src/, tests/, docs/]
    forbidden_files: [.env, credentials.json, *.key]
    max_file_size_kb: 500`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Implementing Safety Checks
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/safety-check.ts"
            code={`// Hook: before-edit
export async function beforeEdit(file: string, changes: Changes) {
  const safetyConfig = await loadSafetyConfig()

  // Check if file is in allowed directories
  if (!isInAllowedDirectory(file, safetyConfig.permissions.allowed_directories)) {
    throw new Error(\`Attempted to edit file outside allowed directories: \${file}\`)
  }

  // Check if file is forbidden
  if (isForbiddenFile(file, safetyConfig.permissions.forbidden_files)) {
    await flagForReview({
      reason: 'Attempted to edit forbidden file',
      file,
      action: 'blocked'
    })
    return { allowed: false }
  }

  // Check for auth/security changes
  if (isAuthRelated(file) || isSecurityRelated(changes)) {
    await flagForReview({
      reason: 'Security-sensitive changes detected',
      file,
      changes: summarizeChanges(changes)
    })
    return { allowed: false, needsHuman: true }
  }

  return { allowed: true }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Circuit Breaker Logic
          </h3>
          <CodeBlock
            lang="typescript"
            filename="ralph-circuit-breaker.ts"
            code={`class RalphCircuitBreaker {
  private consecutiveFailures = 0
  private sessionStartTime = Date.now()
  private tokensUsed = 0

  async checkBreakers(): Promise<CircuitBreakerStatus> {
    // Check consecutive failures
    if (this.consecutiveFailures >= 3) {
      return {
        tripped: true,
        reason: 'Too many consecutive failures',
        action: 'stop'
      }
    }

    // Check session duration
    const hoursElapsed = (Date.now() - this.sessionStartTime) / (1000 * 60 * 60)
    if (hoursElapsed >= 2) {
      return {
        tripped: true,
        reason: 'Session duration exceeded 2 hours',
        action: 'pause-for-human-checkin'
      }
    }

    // Check token budget
    if (this.tokensUsed >= 1000000) {
      return {
        tripped: true,
        reason: 'Token budget exceeded',
        action: 'stop'
      }
    }

    return { tripped: false }
  }

  async onTaskFailure() {
    this.consecutiveFailures++
    await this.checkBreakers()
  }

  async onTaskSuccess() {
    this.consecutiveFailures = 0 // Reset on success
  }
}`}
          />

          <Callout type="warning" title="Conservative Defaults">
            Start with <strong>strict</strong> safety gates. You can always loosen them after
            observing Ralph in action. It's much better to get false positives (unnecessary
            human reviews) than false negatives (undetected problems).
          </Callout>
        </section>

        {/* COST MANAGEMENT */}
        <section id="cost-management">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Cost Management
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Long-running autonomous sessions consume tokens continuously. Set budget limits. Use
            cost-efficient models (Sonnet) for routine tasks, escalate to Opus only when needed.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Token Budget Configuration
          </h3>
          <CodeBlock
            lang="yaml"
            filename=".claude/config/token-budget.yaml"
            code={`token_budget:
  # Daily/session limits
  daily_limit: 5000000
  session_limit: 1000000
  task_limit: 100000

  # Model selection
  default_model: claude-sonnet-4.5
  escalate_to_opus:
    - complex_refactors: true
    - architecture_changes: true
    - ambiguous_requirements: true

  # Alerts
  alert_thresholds:
    - 50%: 'slack'
    - 80%: 'slack+email'
    - 100%: 'stop-loop'`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Tracking Token Usage
          </h3>
          <CodeBlock
            lang="typescript"
            filename=".claude/hooks/track-tokens.ts"
            code={`// Hook: after-tool-call
export async function afterToolCall(result: ToolResult) {
  const tokens = result.tokensUsed

  // Update running totals
  await incrementCounter('ralph:tokens:session', tokens)
  await incrementCounter(\`ralph:tokens:task:\${getCurrentTaskId()}\`, tokens)
  await incrementCounter(\`ralph:tokens:daily:\${today()}\`, tokens)

  // Check budget
  const sessionTotal = await getCounter('ralph:tokens:session')
  const budget = await getBudgetLimit('session')

  if (sessionTotal >= budget) {
    await stopLoop({
      reason: 'Session token budget exceeded',
      used: sessionTotal,
      limit: budget
    })
  }

  // Alert at thresholds
  const percentage = (sessionTotal / budget) * 100
  if (percentage >= 80 && !alerted80) {
    await sendAlert(\`Ralph at \${percentage}% of session token budget\`)
    alerted80 = true
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Cost-Aware Model Selection
          </h3>
          <CodeBlock
            lang="typescript"
            filename="ralph-model-selector.ts"
            code={`function selectModelForTask(task: Task): Model {
  // Simple tasks: use Sonnet
  if (task.complexity === 'low' && task.filesModified < 3) {
    return 'claude-sonnet-4.5'
  }

  // Complex refactors: use Opus
  if (task.type === 'refactor' && task.filesModified > 5) {
    return 'claude-opus-4.5'
  }

  // Architecture changes: use Opus
  if (task.tags.includes('architecture')) {
    return 'claude-opus-4.5'
  }

  // Default to Sonnet for cost efficiency
  return 'claude-sonnet-4.5'
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Cost Reports
          </h3>
          <CodeBlock
            lang="bash"
            code={`# Generate daily cost report
claude --agent ralph-reporter

> Generate a token usage report for today:
  - Total tokens used
  - Cost estimate (at $X per 1M tokens)
  - Breakdown by task
  - Model usage distribution
  - Recommendations for cost optimization`}
          />

          <Callout type="info" title="Typical Costs">
            A well-configured Ralph loop processing 10-20 small tasks per day typically uses
            2-4M tokens (~$20-40 with Opus, ~$6-12 with Sonnet). Most savings come from using
            Sonnet for routine tasks and reserving Opus for complex problems.
          </Callout>
        </section>

        {/* WHEN TO BREAK THE LOOP */}
        <section id="when-break">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            When to Break the Loop
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Not everything should be autonomous. Human review triggers:{' '}
            <strong className="text-[#e6edf3]">security-sensitive changes</strong>,{' '}
            <strong className="text-[#e6edf3]">database migrations</strong>,{' '}
            <strong className="text-[#e6edf3]">breaking API changes</strong>,{' '}
            <strong className="text-[#e6edf3]">ambiguous requirements</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Human Review Required For
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Authentication/Authorization</strong> — Login
                  flows, permissions, token handling, session management
                </>,
                <>
                  <strong className="text-[#e6edf3]">Database Migrations</strong> — Schema changes,
                  data migrations, irreversible operations
                </>,
                <>
                  <strong className="text-[#e6edf3]">Breaking Changes</strong> — API endpoint
                  removals, contract changes, deprecations
                </>,
                <>
                  <strong className="text-[#e6edf3]">Security Patches</strong> — Vulnerability fixes,
                  dependency updates with CVEs
                </>,
                <>
                  <strong className="text-[#e6edf3]">Production Config</strong> — Environment
                  variables, deployment configs, infrastructure changes
                </>,
                <>
                  <strong className="text-[#e6edf3]">Ambiguous Requirements</strong> — Unclear
                  acceptance criteria, conflicting specs
                </>,
              ],
              '#f85149'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Flagging Tasks for Human Review
          </h3>
          <CodeBlock
            lang="typescript"
            filename="ralph-human-review.ts"
            code={`async function shouldFlagForReview(task: Task, plan: Plan): Promise<ReviewDecision> {
  const flags: ReviewFlag[] = []

  // Check for security-sensitive patterns
  if (mentionsAuth(task) || touchesSecurityFiles(plan)) {
    flags.push({
      reason: 'Security-sensitive changes',
      severity: 'high',
      reviewType: 'security-review'
    })
  }

  // Check for database changes
  if (plan.migrations.length > 0) {
    flags.push({
      reason: 'Database migration required',
      severity: 'high',
      reviewType: 'dba-review'
    })
  }

  // Check for breaking changes
  if (await detectBreakingChanges(plan)) {
    flags.push({
      reason: 'Breaking API changes detected',
      severity: 'high',
      reviewType: 'api-review'
    })
  }

  // Check for ambiguity
  if (task.acceptanceCriteria.some(ac => isAmbiguous(ac))) {
    flags.push({
      reason: 'Ambiguous requirements',
      severity: 'medium',
      reviewType: 'pm-review'
    })
  }

  if (flags.length > 0) {
    await moveToBlockedQueue(task)
    await notifyReviewers(flags)
    return { needsReview: true, flags }
  }

  return { needsReview: false }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Manual Task Annotation
          </h3>
          <CodeBlock
            lang="markdown"
            filename=".tasks/queue/005-add-payment-flow.md"
            code={`# Add Payment Processing Flow

<!-- HUMAN_REVIEW_REQUIRED: payment/security -->
<!-- REVIEWERS: @security-team, @payments-lead -->

## Overview
Integrate Stripe payment processing for premium subscriptions.

## Why
Enable monetization of premium features.

## Security Notes
- Handles credit card tokens
- Must comply with PCI DSS
- Requires security review before merge

## Acceptance Criteria
- [ ] Stripe integration
- [ ] Secure token handling
- [ ] Error handling
- [ ] Audit logging
- [ ] Security review passed`}
          />

          <Callout type="warning" title="When in Doubt, Flag It">
            Ralph should be conservative. If there's any uncertainty about whether a change needs
            human review, flag it. Better to have a human approve it quickly than to ship a
            security issue or break production.
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Set Up Ralph for TaskForge Bug Backlog
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's build a working Ralph loop that processes a queue of intentional bugs in TaskForge.
          </p>

          <AppSelector />

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Seed Bugs in TaskForge
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  code: `cd taskforge-tutorial/nextjs

# Introduce 5 intentional bugs
# Bug 1: Missing null check in task filtering
# Bug 2: Off-by-one error in pagination
# Bug 3: Incorrect date formatting
# Bug 4: Missing error handling in API route
# Bug 5: Race condition in state update`,
                },
                fastapi: {
                  code: `cd taskforge-tutorial/fastapi

# Introduce 5 intentional bugs
# Bug 1: Missing null check in task filtering
# Bug 2: Off-by-one error in pagination
# Bug 3: Incorrect date formatting
# Bug 4: Missing error handling in API route
# Bug 5: Race condition in async operation`,
                },
              }}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Use Claude to introduce these bugs realistically.
            </p>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Introduce 5 realistic bugs in TaskForge:
  1. Missing null check in task filter (causes crash on empty filter)
  2. Off-by-one in pagination (last page shows wrong items)
  3. Date formatting issue (shows UTC instead of local time)
  4. Missing error boundary in API route (500 errors not caught)
  5. Race condition in task status update

  Make them subtle but testable.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Create Task Files for Each Bug
            </h3>
            <CodeBlock
              code={`mkdir -p .tasks/{queue,in-progress,completed,blocked}`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create task files in .tasks/queue/ for each of the 5 bugs:
  - 001-fix-null-check-crash.md
  - 002-fix-pagination-off-by-one.md
  - 003-fix-date-formatting.md
  - 004-add-api-error-handling.md
  - 005-fix-status-race-condition.md

  Each should have:
  - Overview (what's broken)
  - Why (impact on users)
  - Acceptance Criteria (how to verify fix)
  - Leave Plan section blank`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Configure Ralph Agent
            </h3>
            <CodeBlock
              code={`mkdir -p .claude/agents
touch .claude/agents/ralph.md`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create Ralph agent configuration in .claude/agents/ralph.md
  Use the template from the Loop Architecture section.
  Configure safety gates:
  - Max 5 files modified per task
  - Stop on 2 consecutive failures
  - Flag if tests fail after retry
  - Only allowed to modify src/ and tests/`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Set Up Monitoring
            </h3>
            <CodeBlock
              code={`mkdir -p .claude/logs .claude/hooks`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create monitoring hooks:
  1. .claude/hooks/ralph-logger.ts - Log every phase transition
  2. .claude/hooks/auto-checkpoint.ts - Checkpoint before each change
  3. .claude/hooks/track-tokens.ts - Track token usage

  Set up basic dashboard:
  4. .claude/monitoring/dashboard.html - Simple status view

  Logs should go to .claude/logs/ralph.log`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 5: Start Ralph
            </h3>
            <CodeBlock
              code={`# Activate Ralph
claude --agent ralph

# Initialize the loop (only once)
> You are Ralph. Begin processing .tasks/queue/.
  Remember: plan → implement → verify → commit → next.
  Stop if safety gates trigger.
  Create checkpoints before each change.

  Start with task 001.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 6: Monitor Progress
            </h3>
            <CodeBlock
              code={`# In another terminal, watch Ralph's progress
tail -f .claude/logs/ralph.log

# Or open the dashboard
open .claude/monitoring/dashboard.html`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Watch Ralph work through the queue. Observe:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'How it plans each fix',
                  'Checkpoint creation before changes',
                  'Test runs and verification',
                  'Automatic commits after success',
                  'Moving tasks from queue → in-progress → completed',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 7: Review and Approve
            </h3>
            <CodeBlock
              code={`# After Ralph finishes the queue
git log --oneline -10

# Review the commits
git diff HEAD~5..HEAD

# Check completed tasks
ls .tasks/completed/

# Run full test suite
npm test

# If everything looks good, merge
git checkout main
git merge ralph-bug-fixes`}
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
              Exercise 1: Simple Autonomous Loop for Test Generation
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Set up Ralph to generate tests for untested files.
            </p>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Find all files without tests: grep -L "test" src/**/*.ts
2. Create task file for each untested file
3. Configure Ralph with safety gate: only create test files
4. Run the loop
5. Review generated tests for quality`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Configure Safety Gates for Your Project
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Define project-specific safety gates:
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Which files should trigger human review?',
                  'What changes are too risky for autonomy?',
                  'What are acceptable failure thresholds?',
                  'Which directories are off-limits?',
                ],
                '#d29922'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Monitor an Autonomous Session
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Set up comprehensive monitoring:
            </p>
            <CodeBlock
              lang="text"
              filename="Tasks"
              code={`1. Implement all hooks from the Monitoring section
2. Start Ralph on a 10-task queue
3. Watch logs, dashboard, and notifications
4. Identify bottlenecks or frequent rollbacks
5. Tune safety gates based on observations`}
            />
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section id="next">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What's Next
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You've built a fully autonomous development loop. Ralph can process backlogs, fix bugs,
            generate tests, and create PRs with minimal human intervention — as long as you've
            configured the safety gates and monitoring correctly.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 17 — Plugins & Marketplace
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the final tutorial, you'll learn to package your Ralph configuration, monitoring
              dashboard, safety gates, and custom hooks into a reusable plugin. Share it with your
              team or publish it to the community marketplace.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Plugin structure, manifest
              files, versioning, marketplace submission, discovering community plugins.
            </div>
          </div>

          <Callout type="tip" title="Start Small">
            Don't deploy Ralph on production-critical work immediately. Start with low-risk tasks:
            test generation, documentation updates, bug fixes in staging. Build confidence gradually.
          </Callout>
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
              onClick={() => onSelectTutorial(17)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Plugins & Marketplace →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
