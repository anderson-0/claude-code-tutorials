'use client'

import { useAppTrack, type AppTrack, APP_TRACKS } from './AppContext'
import { CodeBlock } from './CodeBlock'

type TrackContent = {
  code: string
  filename?: string
  lang?: string
}

type DynamicCodeBlockProps = {
  /** Content for each track */
  content: Partial<Record<AppTrack, TrackContent>>
  /** Fallback content if track doesn't have specific content */
  fallback?: TrackContent
  /** Show track indicator above code block */
  showTrackIndicator?: boolean
  /** Show inline track switcher above the code block */
  showInlineSwitcher?: boolean
}

/**
 * A code block that automatically shows content based on selected app track.
 * If no content is available for the current track, shows fallback or first available.
 */
export function DynamicCodeBlock({
  content,
  fallback,
  showTrackIndicator = false,
  showInlineSwitcher = false,
}: DynamicCodeBlockProps) {
  const { selectedTrack, setSelectedTrack, trackInfo } = useAppTrack()

  // Get content for current track, or fallback
  const currentContent = content[selectedTrack] || fallback || Object.values(content)[0]

  if (!currentContent) {
    return null
  }

  // Get available tracks for this code block
  const availableTracks = Object.keys(content) as AppTrack[]

  return (
    <div className="relative">
      {/* Track indicator or switcher */}
      {(showTrackIndicator || showInlineSwitcher) && availableTracks.length > 1 && (
        <div className="mb-2 flex items-center gap-2">
          {showInlineSwitcher ? (
            <div className="inline-flex rounded-lg border border-[#30363d] bg-[#0d1117] p-0.5">
              {availableTracks.map((track) => {
                const info = APP_TRACKS[track]
                const isSelected = track === selectedTrack
                return (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(track)}
                    className={`cursor-pointer rounded-md border-none px-3 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#21262d] text-[#e6edf3]'
                        : 'bg-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                    }`}
                    style={{
                      borderBottom: isSelected ? `2px solid ${info.color}` : '2px solid transparent',
                    }}
                  >
                    <span className="mr-1">{info.icon}</span>
                    {info.name}
                  </button>
                )
              })}
            </div>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold"
              style={{
                backgroundColor: `${trackInfo.color}20`,
                color: trackInfo.color,
              }}
            >
              {trackInfo.icon} {trackInfo.name}
            </span>
          )}
        </div>
      )}

      <CodeBlock
        code={currentContent.code}
        filename={currentContent.filename}
        lang={currentContent.lang}
      />
    </div>
  )
}

/**
 * Dynamic content that renders different JSX based on selected track.
 * Useful for instructions, descriptions, or any non-code content.
 */
type DynamicContentProps = {
  content: Partial<Record<AppTrack, React.ReactNode>>
  fallback?: React.ReactNode
}

export function DynamicContent({ content, fallback }: DynamicContentProps) {
  const { selectedTrack } = useAppTrack()

  return <>{content[selectedTrack] || fallback || Object.values(content)[0]}</>
}

/**
 * Wrapper that only renders children if the selected track matches.
 */
type TrackOnlyProps = {
  track: AppTrack | AppTrack[]
  children: React.ReactNode
}

export function TrackOnly({ track, children }: TrackOnlyProps) {
  const { selectedTrack } = useAppTrack()

  const tracks = Array.isArray(track) ? track : [track]

  if (!tracks.includes(selectedTrack)) {
    return null
  }

  return <>{children}</>
}
