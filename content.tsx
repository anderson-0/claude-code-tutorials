import { useState, useEffect } from "react";

const ChevronDown = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronRight = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const Check = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const CopyIcon = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const Terminal = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
const AlertTriangle = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const Lightbulb = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>;
const Target = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const Menu = ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const X = ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Lock = ({ s = 12 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

const tutorials = [
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
];

const levelColors = { 1: "#3fb950", 2: "#58a6ff", 3: "#d29922", 4: "#f85149" };
const levelLabels = { 1: "LEVEL 1", 2: "LEVEL 2", 3: "LEVEL 3", 4: "LEVEL 4" };

const CodeBlock = ({ code, lang = "bash", filename }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2e3); }); };
  return (
    <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", margin: "16px 0", border: "1px solid #21262d" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px", background: "#161b22", borderBottom: "1px solid #21262d" }}>
        <span style={{ color: "#8b949e", fontSize: 11, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}><Terminal />{filename || lang}</span>
        <button onClick={copy} style={{ background: "none", border: "1px solid #30363d", borderRadius: 6, padding: "3px 8px", color: "#8b949e", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>{copied ? <><Check /> Copied</> : <><CopyIcon /> Copy</>}</button>
      </div>
      <pre style={{ margin: 0, padding: "14px 16px", overflowX: "auto", fontSize: 13, lineHeight: 1.6, color: "#e6edf3", fontFamily: "'SF Mono','Fira Code',monospace" }}><code>{code}</code></pre>
    </div>
  );
};

const Callout = ({ type = "info", title, children }) => {
  const s = { info: { bg: "#0e1f3b", border: "#1f6feb", icon: <Lightbulb />, ic: "#58a6ff" }, warning: { bg: "#2a1e0e", border: "#d29922", icon: <AlertTriangle />, ic: "#d29922" }, tip: { bg: "#0e2917", border: "#238636", icon: <Target />, ic: "#3fb950" }, danger: { bg: "#2d1215", border: "#da3633", icon: <AlertTriangle />, ic: "#f85149" } }[type];
  return (
    <div style={{ background: s.bg, borderLeft: `3px solid ${s.border}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "18px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: title ? 6 : 0 }}><span style={{ color: s.ic }}>{s.icon}</span>{title && <strong style={{ color: s.ic, fontSize: 13 }}>{title}</strong>}</div>
      <div style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
};

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid #21262d", borderRadius: 8, margin: "8px 0", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "#161b22", border: "none", color: "#e6edf3", cursor: "pointer", fontSize: 14, fontWeight: 600, textAlign: "left" }}>{open ? <ChevronDown /> : <ChevronRight />}{title}</button>
      {open && <div style={{ padding: "14px 16px", background: "#0d1117", borderTop: "1px solid #21262d" }}>{children}</div>}
    </div>
  );
};

const TabGroup = ({ tabs }) => {
  const [a, setA] = useState(0);
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #21262d" }}>{tabs.map((t, i) => <button key={i} onClick={() => setA(i)} style={{ padding: "10px 20px", background: "none", border: "none", borderBottom: a === i ? "2px solid #58a6ff" : "2px solid transparent", color: a === i ? "#58a6ff" : "#8b949e", cursor: "pointer", fontSize: 14, fontWeight: a === i ? 600 : 400 }}>{t.label}</button>)}</div>
      <div style={{ padding: "16px 0" }}>{tabs[a].content}</div>
    </div>
  );
};

/* ─── Sidebar ─── */
const Sidebar = ({ open, onClose, current, onSelect }) => {
  const [expanded, setExpanded] = useState({ 1: true, 2: true, 3: true, 4: true });
  const toggle = (l) => setExpanded(p => ({ ...p, [l]: !p[l] }));
  const grouped = [1, 2, 3, 4].map(l => ({ level: l, items: tutorials.filter(t => t.level === l) }));

  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 40, backdropFilter: "blur(2px)" }} />}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 300, background: "#0d1117", borderRight: "1px solid #21262d",
        transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s ease", zIndex: 50, display: "flex", flexDirection: "column", overflow: "hidden"
      }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid #21262d", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ color: "#e6edf3", fontSize: 15, fontWeight: 700 }}>Claude Code Tutorials</div>
            <div style={{ color: "#8b949e", fontSize: 11, marginTop: 2 }}>Lumenalta Learning Path</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", padding: 4 }}><X /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {grouped.map(g => (
            <div key={g.level} style={{ marginBottom: 4 }}>
              <button onClick={() => toggle(g.level)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {expanded[g.level] ? <ChevronDown s={14} /> : <ChevronRight s={14} />}
                <span style={{ color: levelColors[g.level], fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{levelLabels[g.level]}</span>
                <span style={{ color: "#484f58", fontSize: 11 }}>— {g.items[0].tag}</span>
              </button>
              {expanded[g.level] && g.items.map(t => {
                const active = t.id === current;
                const avail = t.id === 1;
                return (
                  <button key={t.id} onClick={() => { if (avail) { onSelect(t.id); onClose(); } }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 18px 9px 38px",
                      background: active ? "#1f6feb18" : "none", border: "none", borderLeft: active ? `2px solid #58a6ff` : "2px solid transparent",
                      cursor: avail ? "pointer" : "default", textAlign: "left", opacity: avail ? 1 : 0.45
                    }}>
                    <span style={{ color: levelColors[t.level], fontSize: 11, fontWeight: 700, minWidth: 18 }}>{t.id}.</span>
                    <span style={{ color: active ? "#e6edf3" : "#c9d1d9", fontSize: 13, lineHeight: 1.4, flex: 1 }}>{t.title}</span>
                    {!avail && <Lock />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 18px", borderTop: "1px solid #21262d", fontSize: 11, color: "#484f58", flexShrink: 0 }}>
          1 of 17 tutorials available
        </div>
      </aside>
    </>
  );
};

/* ─── Section Nav ─── */
const SectionNav = ({ sections, active, onMenuOpen }) => (
  <nav style={{ position: "sticky", top: 0, background: "#010409ee", borderBottom: "1px solid #21262d", padding: "0", zIndex: 30, backdropFilter: "blur(12px)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", overflowX: "auto" }}>
      <button onClick={onMenuOpen} style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", padding: 4, flexShrink: 0, display: "flex", alignItems: "center" }}><Menu /></button>
      <div style={{ width: 1, height: 20, background: "#21262d", flexShrink: 0 }} />
      <div style={{ display: "flex", gap: 3, overflow: "auto" }}>
        {sections.map((s, i) => (
          <a key={i} href={`#${s.id}`} style={{ padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap", color: active === s.id ? "#fff" : "#8b949e", background: active === s.id ? "#1f6feb" : "transparent", border: `1px solid ${active === s.id ? "#1f6feb" : "transparent"}`, transition: "all 0.2s" }}>{s.short}</a>
        ))}
      </div>
    </div>
  </nav>
);

/* ─── MAIN ─── */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(1);
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
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
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const h2 = { color: "#e6edf3", fontSize: 26, fontWeight: 700, margin: "44px 0 14px", paddingBottom: 10, borderBottom: "1px solid #21262d" };
  const h3 = { color: "#e6edf3", fontSize: 19, fontWeight: 600, margin: "28px 0 10px" };
  const p = { color: "#c9d1d9", fontSize: 15, lineHeight: 1.8, margin: "12px 0" };
  const strong = { color: "#e6edf3" };
  const code = { background: "#161b22", padding: "2px 6px", borderRadius: 4, fontSize: 13, color: "#e6edf3" };
  const bullet = (items, color = "#3fb950") => items.map((item, i) => (
    <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", alignItems: "baseline" }}>
      <span style={{ color, fontSize: 16, lineHeight: 1, flexShrink: 0 }}>›</span>
      <span style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
    </div>
  ));

  return (
    <div style={{ background: "#010409", color: "#c9d1d9", minHeight: "100vh", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} current={currentTutorial} onSelect={setCurrentTutorial} />
      <SectionNav sections={sections} active={activeSection} onMenuOpen={() => setSidebarOpen(true)} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* ── Header ── */}
        <div style={{ padding: "44px 0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ background: "#238636", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 12, letterSpacing: 0.5 }}>LEVEL 1</span>
            <span style={{ background: "#1f6feb20", color: "#58a6ff", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>FOUNDATIONS</span>
            <span style={{ color: "#8b949e", fontSize: 12 }}>30-45 min</span>
            <span style={{ color: "#484f58", fontSize: 12 }}>·</span>
            <span style={{ color: "#8b949e", fontSize: 12 }}>Tutorial 1 of 17</span>
          </div>
          <h1 style={{ color: "#e6edf3", fontSize: 34, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.2 }}>Getting Started with Claude Code</h1>
          <p style={{ color: "#8b949e", fontSize: 17, lineHeight: 1.5, margin: 0 }}>Install Claude Code, run your first commands, and understand the mental model of working with an agentic coding tool.</p>
        </div>

        {/* ── OVERVIEW ── */}
        <section id="overview">
          <h2 style={h2}>Overview</h2>
          <p style={p}>This tutorial takes you from zero to your first productive Claude Code session. By the end, you'll have Claude Code installed, understand how it differs from chat-based AI, and be comfortable giving it real tasks.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, margin: "20px 0" }}>
            {[
              { icon: "🎯", title: "What you'll learn", desc: "Install, run sessions, understand permissions, navigate the interface" },
              { icon: "📋", title: "Prerequisites", desc: "Terminal, Node.js 18+ or Homebrew/WinGet, a Claude account" },
              { icon: "🛠️", title: "Tools needed", desc: "Terminal (macOS/Linux/Windows), optionally VS Code or Cursor" },
              { icon: "📦", title: "Series project", desc: "TaskForge — a PM app we'll build throughout this series" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: "#e6edf3", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: "#8b949e", fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT IS CLAUDE CODE ── */}
        <section id="what-is">
          <h2 style={h2}>What Is Claude Code?</h2>
          <p style={p}>Claude Code is an <strong style={strong}>agentic coding tool</strong> that lives in your terminal. Unlike chat-based AI (where you copy-paste code back and forth), Claude Code can directly read your files, run shell commands, edit code across multiple files, and execute your test suite — all while you watch and approve.</p>

          <h3 style={h3}>The Mental Model Shift</h3>
          <p style={p}>Think of it this way: chatting with Claude on claude.ai is like texting a brilliant colleague who can only see what you paste. Claude Code is like that same colleague sitting next to you, looking at your screen, with their hands on a second keyboard.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "20px 0" }}>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "18px" }}>
              <div style={{ color: "#f85149", fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>CHAT-BASED AI (claude.ai)</div>
              <div style={{ color: "#8b949e", fontSize: 13, lineHeight: 1.7 }}>You describe the problem → AI gives you code → You copy-paste it → Run it → It breaks → Paste the error back → Repeat</div>
            </div>
            <div style={{ background: "#0e291780", border: "1px solid #23863650", borderRadius: 10, padding: "18px" }}>
              <div style={{ color: "#3fb950", fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>AGENTIC AI (Claude Code)</div>
              <div style={{ color: "#c9d1d9", fontSize: 13, lineHeight: 1.7 }}>You describe the problem → Claude reads your code, edits files, runs commands, sees errors, fixes them, and verifies — you approve each step</div>
            </div>
          </div>

          <h3 style={h3}>Key Capabilities</h3>
          <div style={{ margin: "12px 0" }}>
            {[
              <><strong style={strong}>Read your entire codebase</strong> — navigates files, follows imports, understands architecture</>,
              <><strong style={strong}>Edit files directly</strong> — no copy-pasting; writes changes into your actual source files</>,
              <><strong style={strong}>Run shell commands</strong> — executes build, test, lint, and any CLI tool</>,
              <><strong style={strong}>See and fix errors</strong> — reads failed output and adapts automatically</>,
              <><strong style={strong}>Work across multiple files</strong> — a single task can touch routes, models, tests, and docs</>,
              <><strong style={strong}>Manage Git</strong> — stages, commits, branches, and opens PRs</>,
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", alignItems: "baseline" }}>
                <span style={{ color: "#3fb950", fontSize: 16, flexShrink: 0 }}>›</span>
                <span style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <h3 style={h3}>Where Claude Code Runs</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "16px 0" }}>
            {[
              { icon: "⬛", name: "Terminal CLI", desc: "Full-featured command line. The primary interface." },
              { icon: "🟦", name: "VS Code / Cursor", desc: "IDE extension with inline diffs and @-mentions." },
              { icon: "🌐", name: "Web (claude.ai/code)", desc: "Browser-based, no local setup needed." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: "#e6edf3", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: "#8b949e", fontSize: 12, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INSTALLATION ── */}
        <section id="install">
          <h2 style={h2}>Installation</h2>
          <p style={p}>Choose the installation method that matches your OS.</p>

          <TabGroup tabs={[
            { label: "macOS", content: (
              <div>
                <h3 style={h3}>Option A: Native Install (Recommended)</h3>
                <p style={p}>Auto-updates in the background so you're always on the latest version.</p>
                <CodeBlock code={`# Download and run the installer\ncurl -fsSL https://cli.claude.ai/install.sh | sh\n\n# Verify installation\nclaude --version`} />
                <h3 style={h3}>Option B: Homebrew</h3>
                <p style={p}>Does <strong style={strong}>not</strong> auto-update — run <code style={code}>brew upgrade claude-code</code> periodically.</p>
                <CodeBlock code={`brew install claude-code\nclaude --version`} />
                <Callout type="tip" title="Apple Silicon">Both methods work on Intel and Apple Silicon. No special config needed.</Callout>
              </div>
            )},
            { label: "Linux", content: (
              <div>
                <h3 style={h3}>Native Install</h3>
                <CodeBlock code={`curl -fsSL https://cli.claude.ai/install.sh | sh\nclaude --version`} />
                <Callout type="info" title="Supported Distros">Ubuntu 20.04+, Debian 11+, Fedora 36+, and most modern distributions.</Callout>
              </div>
            )},
            { label: "Windows", content: (
              <div>
                <Callout type="warning" title="Prerequisite">Windows requires <strong>Git for Windows</strong>. Install from git-scm.com first.</Callout>
                <h3 style={h3}>Option A: WinGet</h3>
                <CodeBlock lang="powershell" code={`winget install Anthropic.ClaudeCode\nclaude --version`} />
                <p style={p}>Does <strong style={strong}>not</strong> auto-update. Run <code style={code}>winget upgrade Anthropic.ClaudeCode</code> periodically.</p>
                <h3 style={h3}>Option B: Native Installer</h3>
                <CodeBlock lang="powershell" code={`# In PowerShell\nirm https://cli.claude.ai/install.ps1 | iex`} />
              </div>
            )}
          ]} />

          <h3 style={h3}>VS Code / Cursor Extension</h3>
          <CodeBlock code={`# Install from command line\ncode --install-extension anthropic.claude-code\n\n# Or search "Claude Code" in Extensions (Cmd+Shift+X)`} />
          <p style={p}>After installing: Command Palette → "Claude Code" → <strong style={strong}>Open in New Tab</strong>.</p>

          <h3 style={h3}>Authentication</h3>
          <p style={p}>On first run, Claude Code opens a browser for login. You need either a Claude Pro/Team/Enterprise subscription or an Anthropic API account with credits.</p>
          <CodeBlock code={`# Start Claude Code — opens browser for auth on first run\nclaude`} />
        </section>

        {/* ── FIRST SESSION ── */}
        <section id="first-session">
          <h2 style={h2}>Your First Session</h2>
          <p style={p}>Open your terminal, navigate to any project directory (or create one), and start a session.</p>
          <CodeBlock code={`# Create a test directory\nmkdir claude-test && cd claude-test\n\n# Start Claude Code\nclaude`} />
          <p style={p}>Claude Code's interactive prompt appears, waiting for your instruction. Let's try something simple:</p>
          <CodeBlock lang="text" filename="Claude Code session" code={`> What files are in this directory? Give me a summary of the project structure.`} />
          <p style={p}>If the directory is empty, Claude will tell you so. If it has files, Claude reads them and provides a summary. This is fundamentally different from chat — Claude is actually looking at your filesystem.</p>

          <h3 style={h3}>Try These Starter Prompts</h3>
          {[
            { prompt: "Create a simple Python script that prints 'Hello from Claude Code'", what: "Claude creates a file directly in your directory" },
            { prompt: "Read the file you just created and add error handling", what: "Claude reads, understands, and edits existing files" },
            { prompt: "Run the script and show me the output", what: "Claude executes shell commands" },
            { prompt: "Initialize a git repo and commit what we have", what: "Claude manages Git operations" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "14px", margin: "8px 0" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ background: "#1f6feb", color: "#fff", fontSize: 11, fontWeight: 700, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                <code style={{ color: "#e6edf3", fontSize: 13, background: "#0d1117", padding: "4px 10px", borderRadius: 6 }}>{item.prompt}</code>
              </div>
              <p style={{ color: "#8b949e", fontSize: 13, margin: 0, paddingLeft: 30 }}>{item.what}</p>
            </div>
          ))}

          <Callout type="tip" title="Watch the Permissions">Notice how Claude asks for permission before creating files or running commands. This is the <strong>permission model</strong> — you're always in control. We'll cover this in detail shortly.</Callout>
        </section>

        {/* ── CORE CONCEPTS ── */}
        <section id="core-concepts">
          <h2 style={h2}>Core Concepts</h2>

          <h3 style={h3}>Sessions and Context</h3>
          <p style={p}>Each time you run <code style={code}>claude</code>, you start a <strong style={strong}>session</strong> — a continuous conversation where Claude remembers what it's done. Key things to know:</p>
          <div style={{ margin: "12px 0" }}>
            {bullet([
              "Sessions persist until you exit (Ctrl+C or /exit)",
              "Claude reads files and runs commands throughout the session",
              "Each session has a context window — a limit on how much information Claude can hold",
              "When context fills up, Claude automatically compacts (summarizes) the conversation",
              "Resume previous sessions with /resume or claude --resume",
            ], "#58a6ff")}
          </div>

          <h3 style={h3}>Built-in Tools</h3>
          <p style={p}>Under the hood, Claude Code has built-in tools it uses automatically:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "14px 0" }}>
            {[
              { tool: "Read", desc: "Read file contents" },
              { tool: "Write", desc: "Create or overwrite files" },
              { tool: "Edit", desc: "Targeted edits to specific file sections" },
              { tool: "Bash", desc: "Execute shell commands" },
              { tool: "Glob", desc: "Find files matching patterns" },
              { tool: "Grep", desc: "Search text across the codebase" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                <code style={{ color: "#d2a8ff", fontSize: 13, fontWeight: 600, minWidth: 48 }}>{item.tool}</code>
                <span style={{ color: "#8b949e", fontSize: 13 }}>{item.desc}</span>
              </div>
            ))}
          </div>
          <p style={p}>You never need to specify which tool to use — describe what you want, and Claude picks the right ones.</p>

          <h3 style={h3}>Checkpoints and /rewind</h3>
          <p style={p}>Every time Claude edits a file, it creates a <strong style={strong}>checkpoint</strong>. If Claude takes a wrong turn:</p>
          <CodeBlock lang="text" filename="Rewind options" code={`# Press Esc twice quickly to undo the last change\n# Or use /rewind for more control:\n/rewind\n\n# Choose to restore:\n# - Just the code (undo file changes)\n# - Just the conversation (go back in time)\n# - Both`} />
          <Callout type="info" title="Checkpoints vs. Git">Checkpoints are for quick undo during a session. They only cover Claude's edits, not your manual changes. Always use Git for real version control.</Callout>
        </section>

        {/* ── COMMANDS ── */}
        <section id="commands">
          <h2 style={h2}>Essential Slash Commands</h2>
          <div style={{ margin: "14px 0" }}>
            {[
              ["/help", "Show all available commands and keyboard shortcuts"],
              ["/status", "Check current model, account, and session info"],
              ["/model", "Switch between models (Opus, Sonnet, Haiku)"],
              ["/resume", "Resume a previous session or switch sessions"],
              ["/rewind", "Rewind to a previous checkpoint"],
              ["/init", "Auto-generate a CLAUDE.md file (covered in Tutorial 2)"],
              ["/compact", "Manually summarize conversation to free up context"],
              ["/exit", "End the current session (or Ctrl+C)"],
              ["/bug", "Report a bug directly to Anthropic"],
            ].map(([cmd, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "9px 0", borderBottom: i < 8 ? "1px solid #21262d15" : "none", alignItems: "baseline" }}>
                <code style={{ color: "#d2a8ff", fontSize: 14, fontWeight: 600, minWidth: 90, fontFamily: "'SF Mono','Fira Code',monospace" }}>{cmd}</code>
                <span style={{ color: "#c9d1d9", fontSize: 14 }}>{desc}</span>
              </div>
            ))}
          </div>

          <h3 style={h3}>Keyboard Shortcuts</h3>
          <div style={{ margin: "14px 0" }}>
            {[
              ["Esc ×2", "Rewind the last Claude action"],
              ["Ctrl+C", "Cancel current operation or exit"],
              ["Ctrl+R", "Search prompt history"],
              ["Ctrl+T", "Toggle task list visibility"],
              ["Shift+↓", "Cycle through agent team members"],
            ].map(([key, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "9px 0", borderBottom: i < 4 ? "1px solid #21262d15" : "none", alignItems: "baseline" }}>
                <kbd style={{ color: "#e6edf3", fontSize: 11, fontWeight: 600, background: "#21262d", padding: "3px 8px", borderRadius: 4, border: "1px solid #30363d", minWidth: 80, textAlign: "center", fontFamily: "monospace" }}>{key}</kbd>
                <span style={{ color: "#c9d1d9", fontSize: 14 }}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PERMISSIONS ── */}
        <section id="permissions">
          <h2 style={h2}>The Permission Model</h2>
          <p style={p}>Claude Code operates on <strong style={strong}>trust but verify</strong>. It always asks before changing your system.</p>

          <div style={{ margin: "16px 0" }}>
            {[
              { level: "Read-only — Always allowed", desc: "Reading files, searching code, listing directories.", color: "#3fb950", bg: "#0e291730" },
              { level: "File modifications — Asks permission", desc: "Creating, editing, or deleting files. Shows proposed changes first.", color: "#d29922", bg: "#2a1e0e30" },
              { level: "Shell commands — Asks permission", desc: "Running any terminal command. Shows the command and waits for OK.", color: "#f85149", bg: "#2d121530" },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, border: `1px solid ${item.color}30`, borderRadius: 8, padding: "14px 16px", margin: "8px 0" }}>
                <div style={{ color: item.color, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.level}</div>
                <div style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 style={h3}>Responding to Permission Prompts</h3>
          <CodeBlock lang="text" filename="Permission options" code={`Claude wants to run: npm test\n\n  y  — Yes, allow once\n  n  — No, deny\n  a  — Always allow this command (this session)\n  e  — Edit the command before running\n  !  — Skip and continue without running`} />
          <Callout type="tip" title="Pro Tip: Use 'Always Allow' Wisely">For trusted commands (tests, lint), pressing <strong>a</strong> saves time. You can also configure trusted commands in settings so you're never asked again.</Callout>
        </section>

        {/* ── INTERFACES ── */}
        <section id="interfaces">
          <h2 style={h2}>Choosing Your Interface</h2>
          <p style={p}>Claude Code works in three environments. Use whichever fits the task.</p>

          <Accordion title="Terminal CLI — Full Power" defaultOpen={true}>
            <p style={p}>The CLI is the full-featured experience with every command and the most control. This is what these tutorials primarily use.</p>
            <CodeBlock code={`# Start in your project directory\ncd your-project\nclaude\n\n# Start with an immediate task\nclaude "explain the authentication flow in this project"\n\n# Resume a previous session\nclaude --resume`} />
          </Accordion>

          <Accordion title="VS Code / Cursor Extension — Visual Diffs">
            <p style={p}>Embeds Claude Code in your IDE sidebar with inline diffs, @-mentions, and plan review. Great for seeing file changes in real time.</p>
            <p style={p}>Open via: Command Palette → "Claude Code: Open in New Tab"</p>
          </Accordion>

          <Accordion title="Web Interface — No Local Setup">
            <p style={p}>Run tasks at <strong style={strong}>claude.ai/code</strong> in your browser. Ideal for long-running tasks, repos you haven't cloned, or running tasks in parallel.</p>
          </Accordion>
        </section>

        {/* ── EXERCISES ── */}
        <section id="exercises">
          <h2 style={h2}>Hands-On Exercises</h2>
          <p style={p}>Complete these to build confidence before moving to Tutorial 2.</p>

          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "22px", margin: "16px 0" }}>
            <h3 style={{ ...h3, margin: "0 0 12px" }}>Exercise 1: Explore a Codebase</h3>
            <p style={p}>Clone any open-source project and use Claude Code to understand it.</p>
            <CodeBlock code={`git clone https://github.com/tiangolo/fastapi.git\ncd fastapi\nclaude`} />
            <CodeBlock lang="text" filename="Prompts to try" code={`> Give me a high-level overview of this project's architecture\n> What are the main entry points?\n> How is routing handled?\n> What testing framework is used?`} />
          </div>

          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "22px", margin: "16px 0" }}>
            <h3 style={{ ...h3, margin: "0 0 12px" }}>Exercise 2: Build Something from Scratch</h3>
            <p style={p}>Start empty and have Claude build a tool for you.</p>
            <CodeBlock code={`mkdir my-first-project && cd my-first-project\nclaude`} />
            <CodeBlock lang="text" filename="Prompt" code={`> Build a CLI tool in Python that takes a directory path and\n> outputs a tree view of the file structure, like the 'tree'\n> command. Include a README.`} />
            <p style={p}>Then follow up:</p>
            <CodeBlock lang="text" filename="Follow-ups" code={`> Run it on this directory to test\n> Add an option to ignore node_modules and .git\n> Add tests for the core function\n> Initialize a git repo and make the first commit`} />
          </div>

          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "22px", margin: "16px 0" }}>
            <h3 style={{ ...h3, margin: "0 0 12px" }}>Exercise 3: Session Management</h3>
            <CodeBlock lang="text" filename="Steps" code={`1. Start a session:       claude\n2. Ask Claude to create a file\n3. Check session info:     /status\n4. Check your model:       /model\n5. Exit:                   /exit\n6. Resume:                 claude --resume\n7. Verify Claude remembers what you were working on`} />
          </div>
        </section>

        {/* ── TROUBLESHOOTING ── */}
        <section id="troubleshoot">
          <h2 style={h2}>Troubleshooting</h2>

          <Accordion title="'claude: command not found'">
            <CodeBlock code={`# Check if installed\nwhich claude || where claude\n\n# Restart your terminal or source config:\nsource ~/.zshrc  # or ~/.bashrc`} />
          </Accordion>
          <Accordion title="Authentication Issues">
            <CodeBlock code={`# Force fresh login\nclaude auth login\n\n# Check auth status\nclaude auth status\n\n# Using an API key instead:\nexport ANTHROPIC_API_KEY=your-key-here`} />
          </Accordion>
          <Accordion title="Permission Errors on macOS">
            <CodeBlock code={`# Use nvm if you hit permission issues\nnvm install 18 && nvm use 18\ncurl -fsSL https://cli.claude.ai/install.sh | sh`} />
          </Accordion>
          <Accordion title="Claude Is Slow or Unresponsive">
            <div style={{ margin: "8px 0" }}>
              {bullet([
                "Check your internet connection — Claude Code calls Anthropic's API",
                "Switch to a faster model: /model → Haiku (fastest) or Sonnet (balanced)",
                "Free up context: /compact",
                "Check Anthropic's status page for outages",
              ], "#d29922")}
            </div>
          </Accordion>
          <Accordion title="Windows-Specific Issues">
            <div style={{ margin: "8px 0" }}>
              {bullet([
                "Ensure Git for Windows is installed before Claude Code",
                "Use PowerShell or Windows Terminal (not cmd.exe)",
                "If using WSL, install inside WSL, not on the Windows side",
                "Line endings: Claude Code handles CRLF/LF automatically",
              ], "#d29922")}
            </div>
          </Accordion>
        </section>

        {/* ── WHAT'S NEXT ── */}
        <section id="next">
          <h2 style={h2}>What's Next</h2>
          <p style={p}>You now have Claude Code installed and you've experienced the fundamental loop: describe what you want → Claude reads, edits, runs → you approve. This is the foundation everything else builds on.</p>

          <div style={{ background: "linear-gradient(135deg, #161b22, #0e291780)", border: "1px solid #23863650", borderRadius: 12, padding: "26px", margin: "24px 0" }}>
            <h3 style={{ color: "#3fb950", fontSize: 17, fontWeight: 700, margin: "0 0 10px" }}>Up Next: Tutorial 2 — CLAUDE.md</h3>
            <p style={{ color: "#c9d1d9", fontSize: 15, lineHeight: 1.7, margin: "0 0 14px" }}>
              In the next tutorial, you'll learn to write a <strong style={strong}>CLAUDE.md</strong> file — the single most impactful thing you can do to make Claude Code effective on your project. We'll clone the TaskForge starter project and write its CLAUDE.md together.
            </p>
            <div style={{ color: "#8b949e", fontSize: 13 }}>
              <strong style={{ color: "#e6edf3" }}>Key topics:</strong> Project documentation for AI, the /init command, structuring CLAUDE.md, subdirectory context files, iteration strategies.
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <div style={{ marginTop: 56, padding: "20px 0", borderTop: "1px solid #21262d", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ color: "#8b949e", fontSize: 13 }}><strong style={{ color: "#e6edf3" }}>Claude Code Tutorial Series</strong> — Lumenalta Learning Path</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "#484f58", fontSize: 12 }}>Tutorial 1 of 17</span>
            <button style={{ background: "#238636", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Next: CLAUDE.md →</button>
          </div>
        </div>
      </div>
    </div>
  );
}