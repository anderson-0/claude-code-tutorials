export type Tutorial = {
  id: number
  title: string
  level: 1 | 2 | 3 | 4
  tag: string
  duration: string
  description: string
}

export const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "Getting Started — Intro to Claude Code",
    level: 1,
    tag: "Foundations",
    duration: "30-45 min",
    description: "Install Claude Code, run your first commands, and understand the mental model of working with an agentic coding tool."
  },
  {
    id: 2,
    title: "CLAUDE.md — Teaching Claude About Your Project",
    level: 1,
    tag: "Foundations",
    duration: "30-45 min",
    description: "Write the single most impactful file for Claude Code productivity. Learn to create, structure, and maintain your project's CLAUDE.md."
  },
  {
    id: 3,
    title: "Project Onboarding — Learning a Codebase",
    level: 1,
    tag: "Foundations",
    duration: "30-45 min",
    description: "Use Claude Code as your onboarding partner when joining a new project or inheriting legacy code."
  },
  {
    id: 4,
    title: "The Define → Plan → Iterate Workflow",
    level: 2,
    tag: "Core Workflows",
    duration: "30-45 min",
    description: "Master the foundational workflow pattern that makes AI-assisted development productive and low-risk."
  },
  {
    id: 5,
    title: "Rules, Commands, Skills & Hooks",
    level: 2,
    tag: "Core Workflows",
    duration: "35-50 min",
    description: "Learn Claude Code's four building blocks for extensibility and customization."
  },
  {
    id: 6,
    title: "Prompt Engineering for Claude Code",
    level: 2,
    tag: "Core Workflows",
    duration: "30-45 min",
    description: "Write prompts that leverage Claude Code's agentic capabilities effectively."
  },
  {
    id: 7,
    title: "Code Refactoring with Claude Code",
    level: 2,
    tag: "Core Workflows",
    duration: "30-45 min",
    description: "Perform safe, coordinated multi-file refactors with AI assistance."
  },
  {
    id: 8,
    title: "Handling Documentation",
    level: 2,
    tag: "Core Workflows",
    duration: "25-35 min",
    description: "Generate and maintain documentation as a first-class development artifact."
  },
  {
    id: 9,
    title: "Token Optimization & Context Management",
    level: 3,
    tag: "Advanced",
    duration: "30-45 min",
    description: "Master context management strategies for productive all-day sessions."
  },
  {
    id: 10,
    title: "AI-Native Development Mindset",
    level: 3,
    tag: "Advanced",
    duration: "30-45 min",
    description: "Design your workflow around what agents do best — move from AI-assisted to AI-native."
  },
  {
    id: 11,
    title: "Safe Delivery Pipelines",
    level: 3,
    tag: "Advanced",
    duration: "35-50 min",
    description: "Integrate Claude Code into Git workflows for safe, reviewable, auditable delivery."
  },
  {
    id: 12,
    title: "MCP Servers",
    level: 3,
    tag: "Advanced",
    duration: "35-50 min",
    description: "Connect Claude Code to external tools and data using the Model Context Protocol."
  },
  {
    id: 13,
    title: "Subagents & AGENTS.md",
    level: 3,
    tag: "Advanced",
    duration: "35-50 min",
    description: "Create specialized AI assistants with their own contexts and tool restrictions."
  },
  {
    id: 14,
    title: "Supervisor Architectures",
    level: 4,
    tag: "Expert",
    duration: "40-55 min",
    description: "Build multi-stage development pipelines with specialized subagents and quality gates."
  },
  {
    id: 15,
    title: "Agent Teams",
    level: 4,
    tag: "Expert",
    duration: "40-55 min",
    description: "Enable direct inter-agent communication for collaborative multi-agent builds."
  },
  {
    id: 16,
    title: "Ralph — Autonomous Dev Loops",
    level: 4,
    tag: "Expert",
    duration: "40-55 min",
    description: "Build fully autonomous development loops with self-verification and minimal human intervention."
  },
  {
    id: 17,
    title: "Plugins & Marketplace",
    level: 4,
    tag: "Expert",
    duration: "30-45 min",
    description: "Package and distribute your Claude Code extensions as reusable plugins."
  },
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

// Tutorial 1 sections
export const tutorial1Sections: Section[] = [
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

// Tutorial 2 sections
export const tutorial2Sections: Section[] = [
  { id: "overview", short: "Overview" },
  { id: "what-is", short: "What Is It?" },
  { id: "init", short: "Using /init" },
  { id: "anatomy", short: "Anatomy" },
  { id: "hands-on", short: "Hands-On" },
  { id: "subdirectory", short: "Subdirectories" },
  { id: "iterating", short: "Iterating" },
  { id: "anti-patterns", short: "Anti-Patterns" },
  { id: "exercises", short: "Exercises" },
  { id: "troubleshoot", short: "Troubleshoot" },
  { id: "next", short: "What's Next" },
]

// Tutorial 3 sections
export const tutorial3Sections: Section[] = [
  { id: "overview", short: "Overview" },
  { id: "exploration", short: "Exploration" },
  { id: "mapping", short: "Mapping" },
  { id: "tracing", short: "Data Flows" },
  { id: "dependencies", short: "Dependencies" },
  { id: "documentation", short: "Documentation" },
  { id: "hands-on", short: "Hands-On" },
  { id: "tasks-folder", short: ".tasks/ Pattern" },
  { id: "exercises", short: "Exercises" },
  { id: "next", short: "What's Next" },
]

// Tutorial 4 sections
export const tutorial4Sections: Section[] = [
  { id: "overview", short: "Overview" },
  { id: "define", short: "Phase 1: Define" },
  { id: "plan", short: "Phase 2: Plan" },
  { id: "implement", short: "Phase 3: Implement" },
  { id: "summarize", short: "Phase 4: Summarize" },
  { id: "hands-on", short: "Hands-On" },
  { id: "clean-contexts", short: "Clean Contexts" },
  { id: "why-works", short: "Why This Works" },
  { id: "exercises", short: "Exercises" },
  { id: "next", short: "What's Next" },
]

// Legacy export for compatibility
export const tutorialSections = tutorial1Sections

// Get sections for a specific tutorial
export function getTutorialSections(tutorialId: number): Section[] {
  switch (tutorialId) {
    case 1:
      return tutorial1Sections
    case 2:
      return tutorial2Sections
    case 3:
      return tutorial3Sections
    case 4:
      return tutorial4Sections
    default:
      return tutorial1Sections
  }
}

// List of available tutorials (those with full content)
export const AVAILABLE_TUTORIALS = [1, 2, 3, 4]
