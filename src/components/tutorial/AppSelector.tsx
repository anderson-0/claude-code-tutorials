'use client'

import { useAppTrack, APP_TRACKS, type AppTrack } from './AppContext'

type AppSelectorProps = {
  /** Show as compact inline version */
  compact?: boolean
  /** Optional label to show before the selector */
  label?: string
}

export function AppSelector({ compact = false, label }: AppSelectorProps) {
  const { selectedTrack, setSelectedTrack, trackInfo } = useAppTrack()

  const tracks = Object.values(APP_TRACKS)

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        {label && (
          <span className="text-xs text-[#8b949e]">{label}</span>
        )}
        <div className="inline-flex rounded-lg border border-[#30363d] bg-[#0d1117] p-0.5">
          {tracks.map((track) => {
            const isSelected = track.id === selectedTrack
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`cursor-pointer rounded-md border-none px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#21262d] text-[#e6edf3]'
                    : 'bg-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
                style={{
                  borderBottom: isSelected ? `2px solid ${track.color}` : '2px solid transparent',
                }}
              >
                <span className="mr-1.5">{track.icon}</span>
                {track.name}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="my-5 rounded-xl border border-[#30363d] bg-[#0d1117] p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-semibold text-[#e6edf3]">
          Select Your Track
        </span>
        <span className="rounded-md bg-[#1f6feb20] px-2 py-0.5 text-[10px] font-semibold text-[#58a6ff]">
          Code examples will update automatically
        </span>
      </div>

      <div className="flex gap-3">
        {tracks.map((track) => {
          const isSelected = track.id === selectedTrack
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-all ${
                isSelected
                  ? 'border-[color:var(--track-color)] bg-[#161b22]'
                  : 'border-[#30363d] bg-[#0d1117] hover:border-[#484f58]'
              }`}
              style={{
                '--track-color': track.color,
              } as React.CSSProperties}
            >
              <span className="text-2xl">{track.icon}</span>
              <div className="text-left">
                <div className={`text-sm font-semibold ${isSelected ? 'text-[#e6edf3]' : 'text-[#c9d1d9]'}`}>
                  {track.label}
                </div>
                <div className="text-xs text-[#8b949e]">
                  {track.language}
                </div>
              </div>
              {isSelected && (
                <div
                  className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: track.color }}
                >
                  ACTIVE
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Small inline indicator showing currently selected track
 */
export function TrackIndicator() {
  const { trackInfo } = useAppTrack()

  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold"
      style={{
        backgroundColor: `${trackInfo.color}20`,
        color: trackInfo.color,
      }}
    >
      {trackInfo.icon} {trackInfo.name}
    </span>
  )
}
