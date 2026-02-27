import { Link, useLocation } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

type Tutorial = {
  slug: string
  title: string
  section: string
  order: number
}

type SidebarProps = {
  tutorials: Array<Tutorial>
  currentSlug?: string
}

type Section = {
  name: string
  tutorials: Array<Tutorial>
}

export function Sidebar({ tutorials, currentSlug }: SidebarProps) {
  const location = useLocation()

  // Group tutorials by section
  const sections = tutorials.reduce<Record<string, Array<Tutorial>>>(
    (acc, tutorial) => {
      if (!acc[tutorial.section]) {
        acc[tutorial.section] = []
      }
      acc[tutorial.section].push(tutorial)
      return acc
    },
    {},
  )

  // Sort tutorials within each section by order
  const sortedSections: Array<Section> = Object.entries(sections)
    .map(([name, tutorials]) => ({
      name,
      tutorials: tutorials.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => {
      // Sort sections by the minimum order of their tutorials
      const minA = Math.min(...a.tutorials.map((t) => t.order))
      const minB = Math.min(...b.tutorials.map((t) => t.order))
      return minA - minB
    })

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--line)] bg-[var(--surface)] p-4">
      <nav className="sticky top-20">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--kicker)]">
          Tutorials
        </h2>
        <ul className="space-y-4">
          {sortedSections.map((section) => (
            <li key={section.name}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)]">
                {section.name}
              </h3>
              <ul className="space-y-1">
                {section.tutorials.map((tutorial) => {
                  const isActive =
                    currentSlug === tutorial.slug ||
                    location.pathname === `/tutorials/${tutorial.slug}`

                  return (
                    <li key={tutorial.slug}>
                      <Link
                        to="/tutorials/$slug"
                        params={{ slug: tutorial.slug }}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-[var(--lagoon)] text-white font-medium'
                            : 'text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]'
                        }`}
                      >
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${isActive ? 'opacity-100' : 'opacity-50'}`}
                        />
                        {tutorial.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
