'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Lock, X } from '#/components/icons'
import {
  tutorials,
  levelColors,
  levelLabels,
  AVAILABLE_TUTORIALS,
  type Tutorial,
} from '#/lib/tutorials-data'

type TutorialSidebarProps = {
  open: boolean
  onClose: () => void
  currentTutorialId: number
  onSelectTutorial: (id: number) => void
}

export function TutorialSidebar({
  open,
  onClose,
  currentTutorialId,
  onSelectTutorial,
}: TutorialSidebarProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  })

  const toggle = (level: number) =>
    setExpanded((prev) => ({ ...prev, [level]: !prev[level] }))

  const grouped = [1, 2, 3, 4].map((level) => ({
    level,
    items: tutorials.filter((t) => t.level === level),
  }))

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[300px] flex-col overflow-hidden border-r border-[#21262d] bg-[#0d1117] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#21262d] px-[18px] py-4">
          <div>
            <div className="text-[15px] font-bold text-[#e6edf3]">
              Claude Code Tutorials
            </div>
            <div className="mt-0.5 text-[11px] text-[#8b949e]">
              Lumenalta Learning Path
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer border-none bg-transparent p-1 text-[#8b949e] hover:text-[#e6edf3]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tutorial List */}
        <div className="flex-1 overflow-y-auto py-2.5">
          {grouped.map((group) => (
            <div key={group.level} className="mb-1">
              {/* Level Header */}
              <button
                onClick={() => toggle(group.level)}
                className="flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-[18px] py-2 text-left"
              >
                {expanded[group.level] ? (
                  <ChevronDown size={14} className="text-[#8b949e]" />
                ) : (
                  <ChevronRight size={14} className="text-[#8b949e]" />
                )}
                <span
                  className="text-[11px] font-bold tracking-wide"
                  style={{ color: levelColors[group.level] }}
                >
                  {levelLabels[group.level]}
                </span>
                <span className="text-[11px] text-[#484f58]">
                  — {group.items[0]?.tag}
                </span>
              </button>

              {/* Tutorial Items */}
              {expanded[group.level] &&
                group.items.map((tutorial) => {
                  const isActive = tutorial.id === currentTutorialId
                  const isAvailable = AVAILABLE_TUTORIALS.includes(tutorial.id)

                  return (
                    <button
                      key={tutorial.id}
                      onClick={() => {
                        if (isAvailable) {
                          onSelectTutorial(tutorial.id)
                          onClose()
                        }
                      }}
                      className={`flex w-full items-center gap-2.5 border-none py-[9px] pl-[38px] pr-[18px] text-left ${
                        isActive
                          ? 'border-l-2 border-l-[#58a6ff] bg-[#1f6feb18]'
                          : 'border-l-2 border-l-transparent'
                      } ${isAvailable ? 'cursor-pointer' : 'cursor-default opacity-45'}`}
                      style={{ background: isActive ? '#1f6feb18' : 'none' }}
                    >
                      <span
                        className="min-w-[18px] text-[11px] font-bold"
                        style={{ color: levelColors[tutorial.level] }}
                      >
                        {tutorial.id}.
                      </span>
                      <span
                        className={`flex-1 text-[13px] leading-snug ${
                          isActive ? 'text-[#e6edf3]' : 'text-[#c9d1d9]'
                        }`}
                      >
                        {tutorial.title}
                      </span>
                      {!isAvailable && (
                        <Lock size={12} className="text-[#484f58]" />
                      )}
                    </button>
                  )
                })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#21262d] px-[18px] py-3 text-[11px] text-[#484f58]">
          {AVAILABLE_TUTORIALS.length} of 17 tutorials available
        </div>
      </aside>
    </>
  )
}
