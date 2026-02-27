export type Tutorial = {
  id: number
  title: string
  level: 1 | 2 | 3 | 4
  tag: string
}

export const tutorials: Tutorial[] = [
  { id: 1, title: "Getting Started — Intro to Claude Code", level: 1, tag: "Foundations" },
  { id: 2, title: "CLAUDE.md — Teaching Claude About Your Project", level: 1, tag: "Foundations" },
  { id: 3, title: "Project Onboarding — Learning a Codebase", level: 1, tag: "Foundations" },
  { id: 4, title: "The Define → Plan → Iterate Workflow", level: 2, tag: "Core Workflows" },
  { id: 5, title: "Rules, Commands, Skills & Hooks", level: 2, tag: "Core Workflows" },
  { id: 6, title: "Prompt Engineering for Claude Code", level: 2, tag: "Core Workflows" },
  { id: 7, title: "Code Refactoring with Claude Code", level: 2, tag: "Core Workflows" },
  { id: 8, title: "Handling Documentation", level: 2, tag: "Core Workflows" },
  { id: 9, title: "Token Optimization & Context Management", level: 3, tag: "Advanced" },
  { id: 10, title: "AI-Native Development Mindset", level: 3, tag: "Advanced" },
  { id: 11, title: "Safe Delivery Pipelines", level: 3, tag: "Advanced" },
  { id: 12, title: "MCP Servers", level: 3, tag: "Advanced" },
  { id: 13, title: "Subagents & AGENTS.md", level: 3, tag: "Advanced" },
  { id: 14, title: "Supervisor Architectures", level: 4, tag: "Expert" },
  { id: 15, title: "Agent Teams", level: 4, tag: "Expert" },
  { id: 16, title: "Ralph — Autonomous Dev Loops", level: 4, tag: "Expert" },
  { id: 17, title: "Plugins & Marketplace", level: 4, tag: "Expert" },
]

export const levelColors: Record<number, string> = {
  1: "#3fb950",
  2: "#58a6ff",
  3: "#d29922",
  4: "#f85149",
}

export const levelLabels: Record<number, string> = {
  1: "LEVEL 1",
  2: "LEVEL 2",
  3: "LEVEL 3",
  4: "LEVEL 4",
}

export type Section = {
  id: string
  short: string
}

export const tutorialSections: Section[] = [
  { id: "overview", short: "Overview" },
  { id: "what-is", short: "What Is It?" },
  { id: "install", short: "Install" },
  { id: "first-session", short: "First Session" },
  { id: "core-concepts", short: "Core Concepts" },
  { id: "commands", short: "Commands" },
  { id: "permissions", short: "Permissions" },
  { id: "interfaces", short: "Interfaces" },
  { id: "exercises", short: "Exercises" },
  { id: "troubleshoot", short: "Troubleshoot" },
  { id: "next", short: "What's Next" },
]
