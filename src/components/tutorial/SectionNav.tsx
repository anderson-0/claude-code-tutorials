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
      <div className="flex items-center gap-2 px-4 py-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onMenuOpen()
          }}
          className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-2 text-[#8b949e] hover:text-[#e6edf3]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="h-5 w-px shrink-0 bg-[#21262d]" />

        <div className="flex flex-1 justify-center gap-[3px] overflow-x-auto">
          {sections.map((section) => {
            const isActive = activeSection === section.id

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(section.id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // Update URL hash without jumping
                    window.history.pushState(null, '', `#${section.id}`)
                  }
                }}
                className={`cursor-pointer whitespace-nowrap rounded-2xl px-3 py-[5px] text-[11px] font-medium no-underline transition-all ${
                  isActive
                    ? 'border border-[#1f6feb] bg-[#1f6feb] !text-white'
                    : 'border border-transparent !text-white hover:bg-[#21262d]'
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
