'use client'

import { Menu } from '#/components/icons'
import { type Section } from '#/lib/tutorials-data'

type SectionNavProps = {
  sections: Section[]
  activeSection: string
  onMenuOpen: () => void
}

export function SectionNav({
  sections,
  activeSection,
  onMenuOpen,
}: SectionNavProps) {
  return (
    <nav className="sticky top-0 z-30 border-b border-[#21262d] bg-[#010409ee] backdrop-blur-xl">
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-2">
        <button
          onClick={onMenuOpen}
          className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-[#8b949e] hover:text-[#e6edf3]"
        >
          <Menu size={22} />
        </button>

        <div className="h-5 w-px shrink-0 bg-[#21262d]" />

        <div className="flex gap-[3px] overflow-auto">
          {sections.map((section) => {
            const isActive = activeSection === section.id

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`whitespace-nowrap rounded-2xl px-3 py-[5px] text-[11px] font-medium no-underline transition-all ${
                  isActive
                    ? 'border border-[#1f6feb] bg-[#1f6feb] text-white'
                    : 'border border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                {section.short}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
