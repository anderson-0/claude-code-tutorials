'use client'

import { useState, useEffect } from 'react'
import { AppProvider } from './AppContext'
import { TutorialContent } from './TutorialContent'
import { Tutorial2 } from './Tutorial2'
import { Tutorial3 } from './Tutorial3'
import { Tutorial4 } from './Tutorial4'
import { Tutorial5 } from './Tutorial5'
import { Tutorial6 } from './Tutorial6'
import { Tutorial7 } from './Tutorial7'
import { Tutorial8 } from './Tutorial8'
import { Tutorial9 } from './Tutorial9'
import { Tutorial10 } from './Tutorial10'
import { Tutorial11 } from './Tutorial11'
import { Tutorial12 } from './Tutorial12'
import { Tutorial13 } from './Tutorial13'
import { Tutorial14 } from './Tutorial14'
import { Tutorial15 } from './Tutorial15'
import { Tutorial16 } from './Tutorial16'
import { Tutorial17 } from './Tutorial17'
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
  5: Tutorial5,
  6: Tutorial6,
  7: Tutorial7,
  8: Tutorial8,
  9: Tutorial9,
  10: Tutorial10,
  11: Tutorial11,
  12: Tutorial12,
  13: Tutorial13,
  14: Tutorial14,
  15: Tutorial15,
  16: Tutorial16,
  17: Tutorial17,
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
    <AppProvider>
      <TutorialComponent
        onMenuOpen={() => setSidebarOpen(true)}
        onSelectTutorial={handleSelectTutorial}
        currentTutorialId={currentTutorial}
      />
    </AppProvider>
  )
}
