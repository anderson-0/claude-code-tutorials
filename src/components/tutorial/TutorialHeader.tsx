import { Clock } from 'lucide-react'

type TutorialHeaderProps = {
  level: number
  category: string
  duration: string
  title: string
  description: string
}

export function TutorialHeader({
  level,
  category,
  duration,
  title,
  description,
}: TutorialHeaderProps) {
  return (
    <div className="pb-6 pt-12">
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="rounded-xl bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white">
          LEVEL {level}
        </span>
        <span className="rounded-xl bg-[var(--lagoon)]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--lagoon)]">
          {category}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--sea-ink-soft)]">
          <Clock className="h-3.5 w-3.5" />
          {duration}
        </span>
      </div>
      <h1 className="display-title mb-3 text-4xl font-extrabold leading-tight text-[var(--sea-ink)]">
        {title}
      </h1>
      <p className="text-lg leading-relaxed text-[var(--sea-ink-soft)]">
        {description}
      </p>
    </div>
  )
}
