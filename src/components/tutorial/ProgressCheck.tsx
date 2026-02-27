'use client'

import { Check } from 'lucide-react'

type ProgressCheckProps = {
  id: string
  label: string
  completed: boolean
  onToggle: (id: string) => void
}

export function ProgressCheck({
  id,
  label,
  completed,
  onToggle,
}: ProgressCheckProps) {
  return (
    <div
      onClick={() => onToggle(id)}
      className={`my-1.5 flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 transition-all ${
        completed
          ? 'border border-emerald-600/50 bg-emerald-950/50'
          : 'border border-[var(--line)] bg-[var(--surface)]'
      }`}
    >
      <div
        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          completed
            ? 'border-emerald-500 bg-emerald-600'
            : 'border-[var(--sea-ink-soft)] bg-transparent'
        }`}
      >
        {completed && <Check className="h-3.5 w-3.5 text-white" />}
      </div>
      <span
        className={`text-sm ${
          completed
            ? 'text-emerald-400 line-through opacity-80'
            : 'text-[var(--sea-ink)]'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
