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

// Tutorial 5 sections
export const tutorial5Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'rules', short: 'Rules' },
  { id: 'commands', short: 'Commands' },
  { id: 'skills', short: 'Skills' },
  { id: 'hooks', short: 'Hooks' },
  { id: 'decision-framework', short: 'Framework' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 6 sections
export const tutorial6Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'file-references', short: '@ References' },
  { id: 'prompt-structure', short: 'Structure' },
  { id: 'exploratory-vs-implementation', short: 'Prompt Types' },
  { id: 'types-guardrails', short: 'Type Safety' },
  { id: 'safety-nets', short: 'Safety Nets' },
  { id: 'iterating', short: 'Iterating' },
  { id: 'prompt-libraries', short: 'Libraries' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'anti-patterns', short: 'Anti-Patterns' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 7 sections
export const tutorial7Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'scoping', short: 'Scoping' },
  { id: 'checkpoint-safety', short: 'Checkpoints' },
  { id: 'test-driven', short: 'TDD' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'migrations', short: 'Migrations' },
  { id: 'reviewing', short: 'Reviewing' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 8 sections
export const tutorial8Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'readme-generation', short: 'READMEs' },
  { id: 'api-docs', short: 'API Docs' },
  { id: 'adrs', short: 'ADRs' },
  { id: 'changelog', short: 'Changelogs' },
  { id: 'inline-comments', short: 'Comments' },
  { id: 'keeping-sync', short: 'Sync' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 9 sections
export const tutorial9Sections: Section[] = [
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

// Tutorial 10 sections
export const tutorial10Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'task-decomposition', short: 'Decomposition' },
  { id: 'ai-friendly', short: 'AI-Friendly' },
  { id: 'task-categories', short: 'Categories' },
  { id: 'when-not', short: 'Limits' },
  { id: 'building-trust', short: 'Trust' },
  { id: 'measuring', short: 'Metrics' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 11 sections
export const tutorial11Sections: Section[] = [
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

// Tutorial 12 sections
export const tutorial12Sections: Section[] = [
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

// Tutorial 13 sections
export const tutorial13Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'anatomy', short: 'Anatomy' },
  { id: 'creating', short: 'Creating' },
  { id: 'tool-restrictions', short: 'Tools' },
  { id: 'read-only', short: 'Read-Only' },
  { id: 'memory', short: 'Memory' },
  { id: 'hooks', short: 'Hooks' },
  { id: 'scope', short: 'Scope' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 14 sections
export const tutorial14Sections: Section[] = [
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

// Tutorial 15 sections
export const tutorial15Sections: Section[] = [
  { id: 'overview', short: 'Overview' },
  { id: 'vs-subagents', short: 'vs Subagents' },
  { id: 'enabling', short: 'Enabling' },
  { id: 'roles', short: 'Roles' },
  { id: 'spawn-prompts', short: 'Spawn' },
  { id: 'communication', short: 'Comms' },
  { id: 'display-modes', short: 'Display' },
  { id: 'task-claiming', short: 'Tasks' },
  { id: 'token-costs', short: 'Costs' },
  { id: 'when-teams', short: 'When' },
  { id: 'hands-on', short: 'Hands-On' },
  { id: 'exercises', short: 'Exercises' },
  { id: 'next', short: "What's Next" },
]

// Tutorial 16 sections
export const tutorial16Sections: Section[] = [
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

// Tutorial 17 sections
export const tutorial17Sections: Section[] = [
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
    case 5:
      return tutorial5Sections
    case 6:
      return tutorial6Sections
    case 7:
      return tutorial7Sections
    case 8:
      return tutorial8Sections
    case 9:
      return tutorial9Sections
    case 10:
      return tutorial10Sections
    case 11:
      return tutorial11Sections
    case 12:
      return tutorial12Sections
    case 13:
      return tutorial13Sections
    case 14:
      return tutorial14Sections
    case 15:
      return tutorial15Sections
    case 16:
      return tutorial16Sections
    case 17:
      return tutorial17Sections
    default:
      return tutorial1Sections
  }
}

// List of available tutorials (those with full content)
export const AVAILABLE_TUTORIALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
