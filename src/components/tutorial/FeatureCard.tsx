type FeatureCardProps = {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[18px]">
      <div className="mb-2 text-[22px]">{icon}</div>
      <div className="mb-1 text-sm font-semibold text-[var(--sea-ink)]">
        {title}
      </div>
      <div className="text-[13px] leading-relaxed text-[var(--sea-ink-soft)]">
        {description}
      </div>
    </div>
  )
}
