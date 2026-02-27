'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Accordion } from './Accordion'
import { TabGroup } from './TabGroup'
import { TutorialSidebar } from './TutorialSidebar'
import { SectionNav } from './SectionNav'
import { tutorial1Sections, tutorials } from '#/lib/tutorials-data'

interface TutorialContentProps {
  onMenuOpen?: () => void
  onSelectTutorial?: (id: number) => void
  currentTutorialId?: number
}

export function TutorialContent({ onMenuOpen, onSelectTutorial, currentTutorialId = 1 }: TutorialContentProps) {
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

    tutorial1Sections.forEach((section) => {
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

  const handleMenuOpen = () => {
    if (onMenuOpen) {
      onMenuOpen()
    } else {
      setSidebarOpen(true)
    }
  }

  const handleSelectTutorial = (id: number) => {
    if (onSelectTutorial) {
      onSelectTutorial(id)
    }
  }

  return (
    <div className="min-h-screen bg-[#010409] font-sans text-[#c9d1d9] [&_code:not(pre_code)]:bg-[#161b22] [&_code:not(pre_code)]:text-[#e6edf3] [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[0.9em]">
      <TutorialSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentTutorialId={currentTutorialId}
        onSelectTutorial={handleSelectTutorial}
      />
      <SectionNav
        sections={tutorial1Sections}
        activeSection={activeSection}
        onMenuOpen={handleMenuOpen}
      />

      <div className="mx-auto max-w-[820px] px-6 pb-20">
        {/* Header */}
        <div className="pb-5 pt-11">
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
            <span className="rounded-xl bg-[#238636] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-white">
              LEVEL 1
            </span>
            <span className="rounded-xl bg-[#1f6feb20] px-2.5 py-[3px] text-[10px] font-semibold text-[#58a6ff]">
              FOUNDATIONS
            </span>
            <span className="text-xs text-[#8b949e]">30-45 min</span>
            <span className="text-xs text-[#484f58]">·</span>
            <span className="text-xs text-[#8b949e]">Tutorial 1 of 17</span>
          </div>
          <h1 className="mb-2.5 text-[34px] font-extrabold leading-tight text-[#e6edf3]">
            Getting Started with Claude Code
          </h1>
          <p className="text-[17px] leading-snug text-[#8b949e]">
            Install Claude Code, run your first commands, and understand the
            mental model of working with an agentic coding tool.
          </p>
        </div>

        {/* OVERVIEW */}
        <section id="overview">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Overview
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            This tutorial takes you from zero to your first productive Claude
            Code session. By the end, you'll have Claude Code installed,
            understand how it differs from chat-based AI, and be comfortable
            giving it real tasks.
          </p>
          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'Install, run sessions, understand permissions, navigate the interface',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Terminal, Node.js 18+ or Homebrew/WinGet, a Claude account',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Terminal (macOS/Linux/Windows), optionally VS Code or Cursor',
              },
              {
                icon: '📦',
                title: 'Series project',
                desc: "TaskForge — a PM app we'll build throughout this series",
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

        {/* WHAT IS CLAUDE CODE */}
        <section id="what-is">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            What Is Claude Code?
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code is an{' '}
            <strong className="text-[#e6edf3]">agentic coding tool</strong> that
            lives in your terminal. Unlike chat-based AI (where you copy-paste
            code back and forth), Claude Code can directly read your files, run
            shell commands, edit code across multiple files, and execute your
            test suite — all while you watch and approve.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            The Mental Model Shift
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Think of it this way: chatting with Claude on claude.ai is like
            texting a brilliant colleague who can only see what you paste.
            Claude Code is like that same colleague sitting next to you, looking
            at your screen, with their hands on a second keyboard.
          </p>

          <div className="my-5 grid grid-cols-2 gap-3.5">
            <div className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-[18px]">
              <div className="mb-2.5 text-xs font-bold tracking-wide text-[#f85149]">
                CHAT-BASED AI (claude.ai)
              </div>
              <div className="text-[13px] leading-relaxed text-[#8b949e]">
                You describe the problem → AI gives you code → You copy-paste it
                → Run it → It breaks → Paste the error back → Repeat
              </div>
            </div>
            <div className="rounded-[10px] border border-[#23863650] bg-[#0e291780] p-[18px]">
              <div className="mb-2.5 text-xs font-bold tracking-wide text-[#3fb950]">
                AGENTIC AI (Claude Code)
              </div>
              <div className="text-[13px] leading-relaxed text-[#c9d1d9]">
                You describe the problem → Claude reads your code, edits files,
                runs commands, sees errors, fixes them, and verifies — you
                approve each step
              </div>
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Key Capabilities
          </h3>
          <div className="my-3">
            {[
              <>
                <strong className="text-[#e6edf3]">
                  Read your entire codebase
                </strong>{' '}
                — navigates files, follows imports, understands architecture
              </>,
              <>
                <strong className="text-[#e6edf3]">Edit files directly</strong>{' '}
                — no copy-pasting; writes changes into your actual source files
              </>,
              <>
                <strong className="text-[#e6edf3]">Run shell commands</strong>{' '}
                — executes build, test, lint, and any CLI tool
              </>,
              <>
                <strong className="text-[#e6edf3]">See and fix errors</strong>{' '}
                — reads failed output and adapts automatically
              </>,
              <>
                <strong className="text-[#e6edf3]">
                  Work across multiple files
                </strong>{' '}
                — a single task can touch routes, models, tests, and docs
              </>,
              <>
                <strong className="text-[#e6edf3]">Manage Git</strong> — stages,
                commits, branches, and opens PRs
              </>,
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 py-[7px]">
                <span className="shrink-0 text-base text-[#3fb950]">›</span>
                <span className="text-sm leading-relaxed text-[#c9d1d9]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Where Claude Code Runs
          </h3>
          <div className="my-4 grid grid-cols-3 gap-3">
            {[
              {
                icon: '⬛',
                name: 'Terminal CLI',
                desc: 'Full-featured command line. The primary interface.',
              },
              {
                icon: '🟦',
                name: 'VS Code / Cursor',
                desc: 'IDE extension with inline diffs and @-mentions.',
              },
              {
                icon: '🌐',
                name: 'Web (claude.ai/code)',
                desc: 'Browser-based, no local setup needed.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border border-[#21262d] bg-[#161b22] p-3.5 text-center"
              >
                <div className="mb-1.5 text-2xl">{item.icon}</div>
                <div className="mb-1 text-[13px] font-semibold text-[#e6edf3]">
                  {item.name}
                </div>
                <div className="text-xs leading-snug text-[#8b949e]">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INSTALLATION */}
        <section id="install">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Installation
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Choose the installation method that matches your OS.
          </p>

          <TabGroup
            tabs={[
              {
                label: 'macOS',
                content: (
                  <div>
                    <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
                      Option A: Native Install (Recommended)
                    </h3>
                    <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                      Auto-updates in the background so you're always on the
                      latest version.
                    </p>
                    <CodeBlock
                      code={`# Download and run the installer\ncurl -fsSL https://cli.claude.ai/install.sh | sh\n\n# Verify installation\nclaude --version`}
                    />
                    <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
                      Option B: Homebrew
                    </h3>
                    <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                      Does{' '}
                      <strong className="text-[#e6edf3]">not</strong> auto-update
                      — run{' '}
                      <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
                        brew upgrade claude-code
                      </code>{' '}
                      periodically.
                    </p>
                    <CodeBlock code={`brew install claude-code\nclaude --version`} />
                    <Callout type="tip" title="Apple Silicon">
                      Both methods work on Intel and Apple Silicon. No special
                      config needed.
                    </Callout>
                  </div>
                ),
              },
              {
                label: 'Linux',
                content: (
                  <div>
                    <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
                      Native Install
                    </h3>
                    <CodeBlock
                      code={`curl -fsSL https://cli.claude.ai/install.sh | sh\nclaude --version`}
                    />
                    <Callout type="info" title="Supported Distros">
                      Ubuntu 20.04+, Debian 11+, Fedora 36+, and most modern
                      distributions.
                    </Callout>
                  </div>
                ),
              },
              {
                label: 'Windows',
                content: (
                  <div>
                    <Callout type="warning" title="Prerequisite">
                      Windows requires <strong>Git for Windows</strong>. Install
                      from git-scm.com first.
                    </Callout>
                    <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
                      Option A: WinGet
                    </h3>
                    <CodeBlock
                      lang="powershell"
                      code={`winget install Anthropic.ClaudeCode\nclaude --version`}
                    />
                    <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
                      Does <strong className="text-[#e6edf3]">not</strong>{' '}
                      auto-update. Run{' '}
                      <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
                        winget upgrade Anthropic.ClaudeCode
                      </code>{' '}
                      periodically.
                    </p>
                    <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
                      Option B: Native Installer
                    </h3>
                    <CodeBlock
                      lang="powershell"
                      code={`# In PowerShell\nirm https://cli.claude.ai/install.ps1 | iex`}
                    />
                  </div>
                ),
              },
            ]}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            VS Code / Cursor Extension
          </h3>
          <CodeBlock
            code={`# Install from command line\ncode --install-extension anthropic.claude-code\n\n# Or search "Claude Code" in Extensions (Cmd+Shift+X)`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            After installing: Command Palette → "Claude Code" →{' '}
            <strong className="text-[#e6edf3]">Open in New Tab</strong>.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Authentication
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            On first run, Claude Code opens a browser for login. You need either
            a Claude Pro/Team/Enterprise subscription or an Anthropic API
            account with credits.
          </p>
          <CodeBlock
            code={`# Start Claude Code — opens browser for auth on first run\nclaude`}
          />
        </section>

        {/* FIRST SESSION */}
        <section id="first-session">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Your First Session
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Open your terminal, navigate to any project directory (or create
            one), and start a session.
          </p>
          <CodeBlock
            code={`# Create a test directory\nmkdir claude-test && cd claude-test\n\n# Start Claude Code\nclaude`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code's interactive prompt appears, waiting for your
            instruction. Let's try something simple:
          </p>
          <CodeBlock
            lang="text"
            filename="Claude Code session"
            code={`> What files are in this directory? Give me a summary of the project structure.`}
          />
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            If the directory is empty, Claude will tell you so. If it has files,
            Claude reads them and provides a summary. This is fundamentally
            different from chat — Claude is actually looking at your filesystem.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Try These Starter Prompts
          </h3>
          {[
            {
              prompt: "Create a simple Python script that prints 'Hello from Claude Code'",
              what: 'Claude creates a file directly in your directory',
            },
            {
              prompt: 'Read the file you just created and add error handling',
              what: 'Claude reads, understands, and edits existing files',
            },
            {
              prompt: 'Run the script and show me the output',
              what: 'Claude executes shell commands',
            },
            {
              prompt: 'Initialize a git repo and commit what we have',
              what: 'Claude manages Git operations',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="my-2 rounded-lg border border-[#21262d] bg-[#161b22] p-3.5"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#1f6feb] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <code className="rounded-md bg-[#0d1117] px-2.5 py-1 text-[13px] text-[#e6edf3]">
                  {item.prompt}
                </code>
              </div>
              <p className="m-0 pl-[30px] text-[13px] text-[#8b949e]">
                {item.what}
              </p>
            </div>
          ))}

          <Callout type="tip" title="Watch the Permissions">
            Notice how Claude asks for permission before creating files or
            running commands. This is the <strong>permission model</strong> —
            you're always in control. We'll cover this in detail shortly.
          </Callout>
        </section>

        {/* CORE CONCEPTS */}
        <section id="core-concepts">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Core Concepts
          </h2>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Sessions and Context
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Each time you run{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
              claude
            </code>
            , you start a <strong className="text-[#e6edf3]">session</strong> —
            a continuous conversation where Claude remembers what it's done. Key
            things to know:
          </p>
          <div className="my-3">
            {bullet(
              [
                'Sessions persist until you exit (Ctrl+C or /exit)',
                'Claude reads files and runs commands throughout the session',
                'Each session has a context window — a limit on how much information Claude can hold',
                'When context fills up, Claude automatically compacts (summarizes) the conversation',
                'Resume previous sessions with /resume or claude --resume',
              ],
              '#58a6ff'
            )}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Built-in Tools
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Under the hood, Claude Code has built-in tools it uses
            automatically:
          </p>
          <div className="my-3.5 grid grid-cols-2 gap-2">
            {[
              { tool: 'Read', desc: 'Read file contents' },
              { tool: 'Write', desc: 'Create or overwrite files' },
              { tool: 'Edit', desc: 'Targeted edits to specific file sections' },
              { tool: 'Bash', desc: 'Execute shell commands' },
              { tool: 'Glob', desc: 'Find files matching patterns' },
              { tool: 'Grep', desc: 'Search text across the codebase' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg border border-[#21262d] bg-[#161b22] px-3.5 py-2.5"
              >
                <code className="min-w-[48px] text-[13px] font-semibold text-[#d2a8ff]">
                  {item.tool}
                </code>
                <span className="text-[13px] text-[#8b949e]">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            You never need to specify which tool to use — describe what you
            want, and Claude picks the right ones.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Checkpoints and /rewind
          </h3>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Every time Claude edits a file, it creates a{' '}
            <strong className="text-[#e6edf3]">checkpoint</strong>. If Claude
            takes a wrong turn:
          </p>
          <CodeBlock
            lang="text"
            filename="Rewind options"
            code={`# Press Esc twice quickly to undo the last change\n# Or use /rewind for more control:\n/rewind\n\n# Choose to restore:\n# - Just the code (undo file changes)\n# - Just the conversation (go back in time)\n# - Both`}
          />
          <Callout type="info" title="Checkpoints vs. Git">
            Checkpoints are for quick undo during a session. They only cover
            Claude's edits, not your manual changes. Always use Git for real
            version control.
          </Callout>
        </section>

        {/* COMMANDS */}
        <section id="commands">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Essential Slash Commands
          </h2>
          <div className="my-3.5">
            {[
              ['/help', 'Show all available commands and keyboard shortcuts'],
              ['/status', 'Check current model, account, and session info'],
              ['/model', 'Switch between models (Opus, Sonnet, Haiku)'],
              ['/resume', 'Resume a previous session or switch sessions'],
              ['/rewind', 'Rewind to a previous checkpoint'],
              ['/init', 'Auto-generate a CLAUDE.md file (covered in Tutorial 2)'],
              ['/compact', 'Manually summarize conversation to free up context'],
              ['/exit', 'End the current session (or Ctrl+C)'],
              ['/bug', 'Report a bug directly to Anthropic'],
            ].map(([cmd, desc], i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 border-b border-[#21262d15] py-2.5 last:border-none"
              >
                <code className="min-w-[90px] font-mono text-sm font-semibold text-[#d2a8ff]">
                  {cmd}
                </code>
                <span className="text-sm text-[#c9d1d9]">{desc}</span>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Keyboard Shortcuts
          </h3>
          <div className="my-3.5">
            {[
              ['Esc ×2', 'Rewind the last Claude action'],
              ['Ctrl+C', 'Cancel current operation or exit'],
              ['Ctrl+R', 'Search prompt history'],
              ['Ctrl+T', 'Toggle task list visibility'],
              ['Shift+↓', 'Cycle through agent team members'],
            ].map(([key, desc], i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 border-b border-[#21262d15] py-2.5 last:border-none"
              >
                <kbd className="min-w-[80px] rounded border border-[#30363d] bg-[#21262d] px-2 py-[3px] text-center font-mono text-[11px] font-semibold text-[#e6edf3]">
                  {key}
                </kbd>
                <span className="text-sm text-[#c9d1d9]">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PERMISSIONS */}
        <section id="permissions">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            The Permission Model
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code operates on{' '}
            <strong className="text-[#e6edf3]">trust but verify</strong>. It
            always asks before changing your system.
          </p>

          <div className="my-4">
            {[
              {
                level: 'Read-only — Always allowed',
                desc: 'Reading files, searching code, listing directories.',
                color: '#3fb950',
                bg: '#0e291730',
              },
              {
                level: 'File modifications — Asks permission',
                desc: 'Creating, editing, or deleting files. Shows proposed changes first.',
                color: '#d29922',
                bg: '#2a1e0e30',
              },
              {
                level: 'Shell commands — Asks permission',
                desc: 'Running any terminal command. Shows the command and waits for OK.',
                color: '#f85149',
                bg: '#2d121530',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="my-2 rounded-lg px-4 py-3.5"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <div
                  className="mb-1 text-[13px] font-semibold"
                  style={{ color: item.color }}
                >
                  {item.level}
                </div>
                <div className="text-sm leading-snug text-[#c9d1d9]">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Responding to Permission Prompts
          </h3>
          <CodeBlock
            lang="text"
            filename="Permission options"
            code={`Claude wants to run: npm test\n\n  y  — Yes, allow once\n  n  — No, deny\n  a  — Always allow this command (this session)\n  e  — Edit the command before running\n  !  — Skip and continue without running`}
          />
          <Callout type="tip" title="Pro Tip: Use 'Always Allow' Wisely">
            For trusted commands (tests, lint), pressing{' '}
            <strong>a</strong> saves time. You can also configure trusted
            commands in settings so you're never asked again.
          </Callout>
        </section>

        {/* INTERFACES */}
        <section id="interfaces">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Choosing Your Interface
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code works in three environments. Use whichever fits the
            task.
          </p>

          <Accordion title="Terminal CLI — Full Power" defaultOpen={true}>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              The CLI is the full-featured experience with every command and the
              most control. This is what these tutorials primarily use.
            </p>
            <CodeBlock
              code={`# Start in your project directory\ncd your-project\nclaude\n\n# Start with an immediate task\nclaude "explain the authentication flow in this project"\n\n# Resume a previous session\nclaude --resume`}
            />
          </Accordion>

          <Accordion title="VS Code / Cursor Extension — Visual Diffs">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Embeds Claude Code in your IDE sidebar with inline diffs,
              @-mentions, and plan review. Great for seeing file changes in real
              time.
            </p>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Open via: Command Palette → "Claude Code: Open in New Tab"
            </p>
          </Accordion>

          <Accordion title="Web Interface — No Local Setup">
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Run tasks at{' '}
              <strong className="text-[#e6edf3]">claude.ai/code</strong> in your
              browser. Ideal for long-running tasks, repos you haven't cloned,
              or running tasks in parallel.
            </p>
          </Accordion>
        </section>

        {/* EXERCISES */}
        <section id="exercises">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On Exercises
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Complete these to build confidence before moving to Tutorial 2.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 1: Explore a Codebase
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Clone any open-source project and use Claude Code to understand
              it.
            </p>
            <CodeBlock
              code={`git clone https://github.com/tiangolo/fastapi.git\ncd fastapi\nclaude`}
            />
            <CodeBlock
              lang="text"
              filename="Prompts to try"
              code={`> Give me a high-level overview of this project's architecture\n> What are the main entry points?\n> How is routing handled?\n> What testing framework is used?`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Build Something from Scratch
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Start empty and have Claude build a tool for you.
            </p>
            <CodeBlock
              code={`mkdir my-first-project && cd my-first-project\nclaude`}
            />
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Build a CLI tool in Python that takes a directory path and\n> outputs a tree view of the file structure, like the 'tree'\n> command. Include a README.`}
            />
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Then follow up:
            </p>
            <CodeBlock
              lang="text"
              filename="Follow-ups"
              code={`> Run it on this directory to test\n> Add an option to ignore node_modules and .git\n> Add tests for the core function\n> Initialize a git repo and make the first commit`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Session Management
            </h3>
            <CodeBlock
              lang="text"
              filename="Steps"
              code={`1. Start a session:       claude\n2. Ask Claude to create a file\n3. Check session info:     /status\n4. Check your model:       /model\n5. Exit:                   /exit\n6. Resume:                 claude --resume\n7. Verify Claude remembers what you were working on`}
            />
          </div>
        </section>

        {/* TROUBLESHOOTING */}
        <section id="troubleshoot">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Troubleshooting
          </h2>

          <Accordion title="'claude: command not found'">
            <CodeBlock
              code={`# Check if installed\nwhich claude || where claude\n\n# Restart your terminal or source config:\nsource ~/.zshrc  # or ~/.bashrc`}
            />
          </Accordion>
          <Accordion title="Authentication Issues">
            <CodeBlock
              code={`# Force fresh login\nclaude auth login\n\n# Check auth status\nclaude auth status\n\n# Using an API key instead:\nexport ANTHROPIC_API_KEY=your-key-here`}
            />
          </Accordion>
          <Accordion title="Permission Errors on macOS">
            <CodeBlock
              code={`# Use nvm if you hit permission issues\nnvm install 18 && nvm use 18\ncurl -fsSL https://cli.claude.ai/install.sh | sh`}
            />
          </Accordion>
          <Accordion title="Claude Is Slow or Unresponsive">
            <div className="my-2">
              {bullet(
                [
                  "Check your internet connection — Claude Code calls Anthropic's API",
                  'Switch to a faster model: /model → Haiku (fastest) or Sonnet (balanced)',
                  'Free up context: /compact',
                  "Check Anthropic's status page for outages",
                ],
                '#d29922'
              )}
            </div>
          </Accordion>
          <Accordion title="Windows-Specific Issues">
            <div className="my-2">
              {bullet(
                [
                  'Ensure Git for Windows is installed before Claude Code',
                  'Use PowerShell or Windows Terminal (not cmd.exe)',
                  'If using WSL, install inside WSL, not on the Windows side',
                  'Line endings: Claude Code handles CRLF/LF automatically',
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
            You now have Claude Code installed and you've experienced the
            fundamental loop: describe what you want → Claude reads, edits, runs
            → you approve. This is the foundation everything else builds on.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #0e291780)',
              border: '1px solid #23863650',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#3fb950]">
              Up Next: Tutorial 2 — CLAUDE.md
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn to write a{' '}
              <strong className="text-[#e6edf3]">CLAUDE.md</strong> file — the
              single most impactful thing you can do to make Claude Code
              effective on your project. We'll clone the TaskForge starter
              project and write its CLAUDE.md together.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> Project
              documentation for AI, the /init command, structuring CLAUDE.md,
              subdirectory context files, iteration strategies.
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
            <span className="text-xs text-[#484f58]">Tutorial 1 of {tutorials.length}</span>
            <button
              onClick={() => handleSelectTutorial(2)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: CLAUDE.md →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
