'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

// Available app tracks
export type AppTrack = 'nextjs' | 'fastapi'

export type AppTrackInfo = {
  id: AppTrack
  name: string
  label: string
  icon: string
  language: string
  color: string
}

export const APP_TRACKS: Record<AppTrack, AppTrackInfo> = {
  nextjs: {
    id: 'nextjs',
    name: 'Next.js',
    label: 'Next.js Track',
    icon: '⚛️',
    language: 'TypeScript',
    color: '#58a6ff',
  },
  fastapi: {
    id: 'fastapi',
    name: 'FastAPI',
    label: 'FastAPI Track',
    icon: '🐍',
    language: 'Python',
    color: '#3fb950',
  },
}

type AppContextType = {
  selectedTrack: AppTrack
  setSelectedTrack: (track: AppTrack) => void
  trackInfo: AppTrackInfo
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrackState] = useState<AppTrack>('nextjs')

  const setSelectedTrack = useCallback((track: AppTrack) => {
    setSelectedTrackState(track)
    // Persist to localStorage for page reloads
    if (typeof window !== 'undefined') {
      localStorage.setItem('tutorial-app-track', track)
    }
  }, [])

  // Load from localStorage on mount
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tutorial-app-track') as AppTrack | null
    if (saved && saved !== selectedTrack && APP_TRACKS[saved]) {
      setSelectedTrackState(saved)
    }
  }

  const trackInfo = APP_TRACKS[selectedTrack]

  return (
    <AppContext.Provider value={{ selectedTrack, setSelectedTrack, trackInfo }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppTrack() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppTrack must be used within an AppProvider')
  }
  return context
}
