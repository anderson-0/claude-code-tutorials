'use client'

type ProgressBarProps = {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="flex items-center gap-4 border-b border-[var(--line)] bg-[var(--surface)] px-5 py-3">
      <span className="whitespace-nowrap text-xs text-[var(--sea-ink-soft)]">
        Progress: {completed}/{total}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {completed === total && (
        <span className="text-xs font-semibold text-emerald-400">
          Complete!
        </span>
      )}
    </div>
  )
}
