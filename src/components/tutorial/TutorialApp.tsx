'use client'

import { useState, useEffect } from 'react'
import { TutorialContent } from './TutorialContent'
import { Tutorial2 } from './Tutorial2'
import { Tutorial3 } from './Tutorial3'
import { Tutorial4 } from './Tutorial4'
import { TutorialSidebar } from './TutorialSidebar'
import { AVAILABLE_TUTORIALS } from '#/lib/tutorials-data'

// Map of tutorial ID to component
const tutorialComponents: Record<number, React.ComponentType<{
  onMenuOpen: () => void
  onSelectTutorial: (id: number) => void
  currentTutorialId: number
}>> = {
  1: TutorialContent as React.ComponentType<{
    onMenuOpen: () => void
    onSelectTutorial: (id: number) => void
    currentTutorialId: number
  }>,
  2: Tutorial2,
  3: Tutorial3,
  4: Tutorial4,
}

export function TutorialApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTutorial, setCurrentTutorial] = useState(1)

  // Handle URL hash for direct linking
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const tutorialId = parseInt(hash.replace('#tutorial-', ''), 10)
      if (AVAILABLE_TUTORIALS.includes(tutorialId)) {
        setCurrentTutorial(tutorialId)
      }
    }
  }, [])

  // Update URL hash when tutorial changes
  useEffect(() => {
    if (currentTutorial > 1) {
      window.location.hash = `tutorial-${currentTutorial}`
    } else {
      // Remove hash for tutorial 1
      window.history.pushState('', document.title, window.location.pathname)
    }
  }, [currentTutorial])

  const handleSelectTutorial = (id: number) => {
    if (AVAILABLE_TUTORIALS.includes(id)) {
      setCurrentTutorial(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Get the component for current tutorial (or fallback to coming soon)
  const TutorialComponent = tutorialComponents[currentTutorial]

  if (!TutorialComponent) {
    return (
      <div className="min-h-screen bg-[#010409] font-sans text-[#c9d1d9]">
        <TutorialSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentTutorialId={currentTutorial}
          onSelectTutorial={handleSelectTutorial}
        />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">🚧</div>
            <h1 className="mb-2 text-2xl font-bold text-[#e6edf3]">Coming Soon</h1>
            <p className="mb-6 text-[#8b949e]">Tutorial {currentTutorial} is under construction.</p>
            <button
              onClick={() => handleSelectTutorial(1)}
              className="cursor-pointer rounded-lg border-none bg-[#238636] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2ea043]"
            >
              ← Back to Tutorial 1
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TutorialComponent
      onMenuOpen={() => setSidebarOpen(true)}
      onSelectTutorial={handleSelectTutorial}
      currentTutorialId={currentTutorial}
    />
  )
}
