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

const meta = tutorials[11] // Tutorial 12 (0-indexed)

const sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'architecture', short: 'Architecture' },
  { id: 'configuration', short: 'Config' },
  { id: 'popular-servers', short: 'Servers' },
  { id: 'github-mcp', short: 'GitHub' },
  { id: 'database-mcp', short: 'Database' },
  { id: 'custom-server', short: 'Custom' },
  { id: 'mcp-vs-others', short: 'Comparison' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

interface Tutorial12Props {
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}

export function Tutorial12({ onMenuOpen, onSelectTutorial, currentTutorialId }: Tutorial12Props) {
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
            MCP Servers — Extending Claude's Reach
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
            The <strong className="text-[#e6edf3]">Model Context Protocol (MCP)</strong> is an open
            standard that lets Claude Code connect to external tools and data sources. Think of it as
            giving Claude superpowers — access to GitHub, databases, Slack, Linear, Jira, and any
            custom APIs you build.
          </p>

          <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {[
              {
                icon: '🎯',
                title: "What you'll learn",
                desc: 'MCP architecture, configuration, built-in servers, building custom servers',
              },
              {
                icon: '📋',
                title: 'Prerequisites',
                desc: 'Tutorials 1-11, understanding of APIs, basic Node.js or Python knowledge',
              },
              {
                icon: '🛠️',
                title: 'Tools needed',
                desc: 'Claude Code, GitHub account (optional), database (optional)',
              },
              {
                icon: '📦',
                title: 'Output',
                desc: 'Working MCP server connections and custom server implementation',
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

          <Callout type="info" title="Why MCP?">
            Before MCP, each AI tool had custom integrations. MCP is an{' '}
            <strong>open standard</strong> — build a server once, use it with any MCP-compatible
            client. Claude Code is one client; others are emerging. This is infrastructure that
            will outlive any single tool.
          </Callout>
        </section>

        {/* MCP ARCHITECTURE */}
        <section id="architecture">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            MCP Architecture
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            MCP follows a simple client-server model. Claude Code is the client, and MCP servers
            expose tools, resources, and prompts that Claude can use.
          </p>

          <div className="my-5 rounded-[10px] border border-[#21262d] bg-[#161b22] p-5">
            <div className="mb-4 text-center text-[13px] font-mono text-[#8b949e]">
              MCP Data Flow
            </div>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-center gap-3">
                <div className="w-[140px] rounded-lg bg-[#238636] px-3 py-2 text-center font-semibold text-white">
                  Claude Code
                </div>
                <div className="text-[#8b949e]">→</div>
                <div className="w-[140px] rounded-lg border border-[#58a6ff] bg-[#0d1117] px-3 py-2 text-center font-semibold text-[#58a6ff]">
                  MCP Client
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[140px]"></div>
                <div className="text-[#8b949e]">↓</div>
                <div className="w-[140px] rounded-lg border border-[#d29922] bg-[#0d1117] px-3 py-2 text-center font-semibold text-[#d29922]">
                  MCP Server
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[140px]"></div>
                <div className="text-[#8b949e]">↓</div>
                <div className="w-[140px] rounded-lg bg-[#1f6feb] px-3 py-2 text-center font-semibold text-white">
                  External API
                </div>
              </div>
            </div>
          </div>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Key Concepts
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">Tools</strong> — Functions Claude can call
                  (e.g., create_issue, search_repo, query_database)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Resources</strong> — Data Claude can read
                  (e.g., file contents, database schemas, API docs)
                </>,
                <>
                  <strong className="text-[#e6edf3]">Prompts</strong> — Reusable prompt templates
                  exposed by the server
                </>,
                <>
                  <strong className="text-[#e6edf3]">Transports</strong> — Communication layer
                  (stdio, HTTP, WebSocket)
                </>,
              ],
              '#58a6ff'
            )}
          </div>

          <Callout type="tip" title="MCP Is a Protocol, Not a Platform">
            MCP defines <strong>how</strong> clients and servers communicate, not{' '}
            <strong>what</strong> they communicate. You can build MCP servers for anything:
            internal APIs, databases, SaaS tools, IoT devices, or local file systems.
          </Callout>
        </section>

        {/* CONFIGURATION */}
        <section id="configuration">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Configuring MCP Servers in settings.json
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            MCP servers are configured in Claude Code's{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">
              settings.json
            </code>{' '}
            file. You can configure servers at the{' '}
            <strong className="text-[#e6edf3]">user level</strong> (all projects) or{' '}
            <strong className="text-[#e6edf3]">project level</strong> (specific to one project).
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            User-Level Configuration
          </h3>
          <CodeBlock
            lang="json"
            filename="~/.config/claude/settings.json"
            code={`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Project-Level Configuration
          </h3>
          <CodeBlock
            lang="json"
            filename=".claude/settings.json (in project root)"
            code={`{
  "mcpServers": {
    "database": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./data.db"]
    },
    "custom-api": {
      "command": "node",
      "args": ["./mcp-servers/custom-api-server.js"],
      "env": {
        "API_KEY": "your_api_key"
      }
    }
  }
}`}
          />

          <Callout type="warning" title="Secrets Management">
            Never commit tokens or API keys to <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.claude/settings.json</code>.
            Use environment variables or reference them from a{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.env</code> file
            that's in <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">.gitignore</code>.
          </Callout>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Configuration Fields
          </h3>
          <div className="my-3">
            {bullet(
              [
                <>
                  <strong className="text-[#e6edf3]">command</strong> — Executable to run
                  (npx, uvx, node, python, etc.)
                </>,
                <>
                  <strong className="text-[#e6edf3]">args</strong> — Command-line arguments
                  passed to the server
                </>,
                <>
                  <strong className="text-[#e6edf3]">env</strong> — Environment variables
                  (tokens, API keys, config values)
                </>,
                <>
                  <strong className="text-[#e6edf3]">disabled</strong> — Set to true to
                  temporarily disable a server
                </>,
              ],
              '#d29922'
            )}
          </div>
        </section>

        {/* POPULAR SERVERS */}
        <section id="popular-servers">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Built-in and Popular MCP Servers
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Anthropic and the community maintain MCP servers for common integrations. Here are
            the most useful ones for development workflows.
          </p>

          <div className="my-4 space-y-3">
            {[
              {
                name: 'GitHub',
                pkg: '@modelcontextprotocol/server-github',
                desc: 'Create issues, PRs, search code, manage repos, link commits',
                color: '#3fb950',
              },
              {
                name: 'Filesystem',
                pkg: '@modelcontextprotocol/server-filesystem',
                desc: 'Read/write files outside project directory with controlled access',
                color: '#58a6ff',
              },
              {
                name: 'SQLite',
                pkg: 'mcp-server-sqlite',
                desc: 'Query SQLite databases, read schemas, execute safe queries',
                color: '#d29922',
              },
              {
                name: 'PostgreSQL',
                pkg: '@modelcontextprotocol/server-postgres',
                desc: 'Connect to Postgres databases with read-only or full access',
                color: '#f85149',
              },
              {
                name: 'Slack',
                pkg: '@modelcontextprotocol/server-slack',
                desc: 'Send messages, read channels, search history',
                color: '#3fb950',
              },
              {
                name: 'Linear',
                pkg: '@linear/mcp-server',
                desc: 'Create issues, update status, search tickets, sync with tasks',
                color: '#58a6ff',
              },
            ].map((server, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div className="mb-1 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: server.color }}
                  ></div>
                  <div className="font-semibold text-[#e6edf3]">{server.name}</div>
                </div>
                <div className="mb-1.5 font-mono text-[11px] text-[#8b949e]">
                  {server.pkg}
                </div>
                <div className="text-[13px] text-[#c9d1d9]">{server.desc}</div>
              </div>
            ))}
          </div>

          <Callout type="info" title="Community Servers">
            Find more servers at{' '}
            <a
              href="https://github.com/modelcontextprotocol/servers"
              className="text-[#58a6ff] underline"
            >
              github.com/modelcontextprotocol/servers
            </a>
            . Anyone can build and publish MCP servers.
          </Callout>
        </section>

        {/* GITHUB MCP */}
        <section id="github-mcp">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Using GitHub MCP
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            The GitHub MCP server is one of the most powerful integrations. It lets Claude create
            PRs, review code, manage issues, and link commits — all from the command line.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Setup
          </h3>
          <CodeBlock
            code={`# 1. Create a GitHub personal access token
# Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
# Create new token with: repo, workflow, read:org

# 2. Add to settings.json
cat << 'EOF' >> ~/.config/claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
EOF

# 3. Restart Claude Code
# The GitHub server tools will appear automatically`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Workflows
          </h3>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Create a Pull Request from Claude
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> I've finished the task filtering feature. Create a GitHub pull request:
  - Title: "Add task filtering and search"
  - Body: [use the summary from Phase 4]
  - Base: main
  - Compare: feature/task-filtering`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Review Code in a PR
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Review PR #42 in my-org/my-repo. Look for:
  - Security issues
  - Performance problems
  - Missing tests
  - Code style violations

  Add review comments inline where needed.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Link Task to GitHub Issue
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Create a GitHub issue for the task at .tasks/todo/add-dark-mode.md
  Use the acceptance criteria as a checklist in the issue body.
  Add labels: enhancement, good-first-issue`}
            />
          </div>

          <Callout type="tip" title="GitHub MCP Can Replace Manual PR Workflow">
            Instead of: code → commit → push → open browser → create PR, you can do:{' '}
            <strong>code → ask Claude to create PR</strong>. The PR includes proper descriptions,
            links, and labels.
          </Callout>
        </section>

        {/* DATABASE MCP */}
        <section id="database-mcp">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Database MCP — Connecting to Databases
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Database MCP servers let Claude query databases, understand schemas, and even generate
            migrations. This is powerful but requires careful safety controls.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            SQLite Example (Safe for Experimentation)
          </h3>
          <CodeBlock
            lang="json"
            filename=".claude/settings.json"
            code={`{
  "mcpServers": {
    "database": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./dev.db", "--readonly"]
    }
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            PostgreSQL Example (Production Database)
          </h3>
          <CodeBlock
            lang="json"
            filename=".claude/settings.json"
            code={`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgres://user:pass@localhost/mydb",
        "READONLY": "true"
      }
    }
  }
}`}
          />

          <Callout type="warning" title="Always Use Read-Only for Production">
            Unless you have a specific need for write access, configure database MCP servers
            with <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">--readonly</code> or{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">READONLY=true</code>.
            Claude can still explore schemas, run SELECT queries, and generate migrations —
            without the risk of data modification.
          </Callout>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Example Prompts
          </h3>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Explore Database Schema
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Connect to the database and show me all tables and their relationships.
  I need to understand the data model before I start working.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Generate Migration
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Generate a migration to add a 'priority' column to the 'tasks' table.
  Priority should be: low, medium, high (enum or varchar).
  Include: migration file, rollback, and any necessary indexes.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h4 className="mb-2 text-[15px] font-semibold text-[#e6edf3]">
              Analyze Query Performance
            </h4>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Run EXPLAIN on the query in src/queries/get-user-tasks.sql
  Identify missing indexes or query optimizations.`}
            />
          </div>
        </section>

        {/* CUSTOM SERVER */}
        <section id="custom-server">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Building a Custom MCP Server
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Building your own MCP server is straightforward. Here's a minimal example that exposes
            a custom tool to Claude.
          </p>

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 1: Create Server File
          </h3>
          <CodeBlock
            lang="javascript"
            filename="mcp-servers/taskforge-server.js"
            code={`#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs/promises";
import path from "path";

const TASKS_DIR = ".tasks";

// Create server instance
const server = new Server(
  {
    name: "taskforge-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler("tools/list", async () => {
  return {
    tools: [
      {
        name: "list_tasks",
        description: "List all tasks in a given status folder (todo, in-progress, done)",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["todo", "in-progress", "done"],
              description: "Task status folder to list",
            },
          },
          required: ["status"],
        },
      },
      {
        name: "create_task",
        description: "Create a new task file in the todo folder",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
          required: ["title", "content"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_tasks") {
    const statusDir = path.join(TASKS_DIR, args.status);
    const files = await fs.readdir(statusDir);
    const tasks = files.filter((f) => f.endsWith(".md"));
    return { content: [{ type: "text", text: JSON.stringify(tasks, null, 2) }] };
  }

  if (name === "create_task") {
    const filename = args.title.toLowerCase().replace(/\\s+/g, "-") + ".md";
    const filepath = path.join(TASKS_DIR, "todo", filename);
    await fs.writeFile(filepath, args.content);
    return { content: [{ type: "text", text: \`Task created: \${filepath}\` }] };
  }

  throw new Error(\`Unknown tool: \${name}\`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 2: Install Dependencies
          </h3>
          <CodeBlock
            code={`cd mcp-servers
npm init -y
npm install @modelcontextprotocol/sdk
chmod +x taskforge-server.js`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 3: Configure in settings.json
          </h3>
          <CodeBlock
            lang="json"
            filename=".claude/settings.json"
            code={`{
  "mcpServers": {
    "taskforge": {
      "command": "node",
      "args": ["./mcp-servers/taskforge-server.js"]
    }
  }
}`}
          />

          <h3 className="mb-2.5 mt-7 text-[19px] font-semibold text-[#e6edf3]">
            Step 4: Use the Server
          </h3>
          <CodeBlock
            lang="text"
            filename="Prompt"
            code={`> List all tasks in the todo folder using the taskforge MCP server.

> Create a new task called "add-dark-mode" with basic structure.`}
          />

          <Callout type="tip" title="Python MCP Servers">
            You can also build MCP servers in Python using the{' '}
            <code className="rounded bg-[#161b22] px-1.5 py-0.5 text-[13px] text-[#e6edf3]">mcp</code> package.
            See the official docs at{' '}
            <a href="https://modelcontextprotocol.io" className="text-[#58a6ff] underline">
              modelcontextprotocol.io
            </a>
          </Callout>
        </section>

        {/* MCP VS OTHERS */}
        <section id="mcp-vs-others">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            MCP vs Skills vs Bash — Decision Framework
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Claude Code has three ways to extend capabilities: MCP servers, Skills (Tutorial 5),
            and Bash commands. When should you use each?
          </p>

          <div className="my-4 space-y-3">
            {[
              {
                title: 'Use MCP When...',
                items: [
                  'You need to connect to external APIs (GitHub, Slack, Linear, Jira)',
                  'You want reusable integrations across multiple projects',
                  'The tool requires authentication or stateful connections',
                  'You want to share the integration with others (MCP is a standard)',
                ],
                color: '#3fb950',
              },
              {
                title: 'Use Skills When...',
                items: [
                  'The task is project-specific and one-off',
                  'You need simple Python/Node.js scripts for data processing',
                  'The logic is procedural and doesn\'t require external APIs',
                  'You want something quick without MCP server overhead',
                ],
                color: '#58a6ff',
              },
              {
                title: 'Use Bash When...',
                items: [
                  'The task is a simple shell command (grep, find, sed, awk)',
                  'You need to interact with git, npm, or other CLI tools',
                  'The operation is file-based and local to the project',
                  'You don\'t need reusable logic or stateful connections',
                ],
                color: '#d29922',
              },
            ].map((section, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#21262d] bg-[#161b22] p-4"
              >
                <div
                  className="mb-2 font-semibold"
                  style={{ color: section.color }}
                >
                  {section.title}
                </div>
                <div className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: section.color }}
                      ></div>
                      <div className="text-[13px] text-[#c9d1d9]">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Callout type="info" title="Hierarchy of Complexity">
            <strong>Bash</strong> → simplest, no setup, local-only<br />
            <strong>Skills</strong> → medium, requires script file, project-scoped<br />
            <strong>MCP</strong> → most powerful, reusable, connects to external systems
          </Callout>
        </section>

        {/* HANDS-ON */}
        <section id="hands-on">
          <h2 className="mb-3.5 mt-11 border-b border-[#21262d] pb-2.5 text-[26px] font-bold text-[#e6edf3]">
            Hands-On: Connect TaskForge to GitHub MCP
          </h2>
          <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
            Let's integrate the GitHub MCP server into TaskForge and use it to link tasks
            to GitHub issues and pull requests.
          </p>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 1: Create GitHub Token
            </h3>
            <CodeBlock
              code={`# Go to: https://github.com/settings/tokens
# Create new token (classic) with scopes: repo, workflow
# Copy the token (starts with ghp_)`}
            />
          </div>

          <AppSelector />

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 2: Configure MCP Server
            </h3>
            <DynamicCodeBlock
                            content={{
                nextjs: {
                  code: `cd taskforge-tutorial/nextjs
mkdir -p .claude

cat << 'EOF' > .claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
EOF

# Add to .gitignore
echo ".claude/settings.json" >> .gitignore`,
                },
                fastapi: {
                  code: `cd taskforge-tutorial/fastapi
mkdir -p .claude

cat << 'EOF' > .claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
EOF

# Add to .gitignore
echo ".claude/settings.json" >> .gitignore`,
                },
              }}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 3: Create GitHub Issue from Task
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> Read .tasks/todo/add-task-filtering.md and create a GitHub issue:
  - Title: same as task file
  - Body: Overview + Acceptance Criteria as checklist
  - Labels: enhancement
  - Repo: [your-username]/taskforge-tutorial

  Add the issue URL to the task file as a ## GitHub Issue section.`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Step 4: Create PR After Implementation
            </h3>
            <CodeBlock
              lang="text"
              filename="Prompt"
              code={`> After implementing the feature, create a pull request:
  - Title: "Add task filtering and search (closes #42)"
  - Body: Use the Phase 4 summary
  - Base: main
  - Head: feature/task-filtering
  - Link to issue #42`}
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
              Exercise 1: Set Up GitHub MCP
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Configure the GitHub MCP server and create a pull request entirely from Claude Code.
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Create GitHub personal access token',
                  'Add to .claude/settings.json',
                  'Use Claude to create a PR from your current branch',
                  'Verify PR appears on GitHub',
                ],
                '#58a6ff'
              )}
            </div>
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 2: Explore Database MCP (SQLite)
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Set up a read-only SQLite MCP server and have Claude explore the schema.
            </p>
            <CodeBlock
              code={`# Create a sample database
sqlite3 sample.db << 'EOF'
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE tasks (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT);
INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO tasks VALUES (1, 1, 'Fix bug'), (2, 1, 'Add feature');
EOF

# Configure MCP, then prompt:
# "Explore the database schema and show me all tables with relationships"`}
            />
          </div>

          <div className="my-4 rounded-[10px] border border-[#21262d] bg-[#161b22] p-[22px]">
            <h3 className="mb-3 mt-0 text-[19px] font-semibold text-[#e6edf3]">
              Exercise 3: Build a Custom MCP Server
            </h3>
            <p className="my-3 text-[15px] leading-relaxed text-[#c9d1d9]">
              Build an MCP server that exposes a tool to search your project's documentation.
            </p>
            <div className="my-2">
              {bullet(
                [
                  'Create mcp-servers/docs-search.js',
                  'Implement search_docs tool (grep through ./docs)',
                  'Add to .claude/settings.json',
                  'Test: "Search docs for mentions of MCP"',
                ],
                '#d29922'
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
            You now understand how to extend Claude Code with MCP servers — both using existing
            servers and building your own. MCP is infrastructure that connects AI tools to the
            rest of your development workflow.
          </p>

          <div
            className="my-6 rounded-xl p-[26px]"
            style={{
              background: 'linear-gradient(135deg, #161b22, #1f6feb20)',
              border: '1px solid #1f6feb50',
            }}
          >
            <h3 className="mb-2.5 mt-0 text-[17px] font-bold text-[#58a6ff]">
              Up Next: Tutorial 13 — Subagents & AGENTS.md
            </h3>
            <p className="mb-3.5 mt-0 text-[15px] leading-relaxed text-[#c9d1d9]">
              In the next tutorial, you'll learn to create specialized subagents with their own
              contexts, tool restrictions, and roles. Build planning agents, implementation agents,
              and review agents that work together in a coordinated workflow.
            </p>
            <div className="text-[13px] text-[#8b949e]">
              <strong className="text-[#e6edf3]">Key topics:</strong> AGENTS.md configuration,
              subagent contexts, tool restrictions, agent orchestration, multi-agent workflows.
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
              onClick={() => onSelectTutorial(13)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-[18px] py-2 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
            >
              Next: Subagents & AGENTS.md →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
