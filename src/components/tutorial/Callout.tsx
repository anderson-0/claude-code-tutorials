'use client'

import { AlertTriangle, Lightbulb, Target } from '#/components/icons'

type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

type CalloutProps = {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  info: {
    bg: 'bg-[#0e1f3b]',
    border: 'border-l-[#1f6feb]',
    iconColor: 'text-[#58a6ff]',
    Icon: Lightbulb,
  },
  warning: {
    bg: 'bg-[#2a1e0e]',
    border: 'border-l-[#d29922]',
    iconColor: 'text-[#d29922]',
    Icon: AlertTriangle,
  },
  tip: {
    bg: 'bg-[#0e2917]',
    border: 'border-l-[#238636]',
    iconColor: 'text-[#3fb950]',
    Icon: Target,
  },
  danger: {
    bg: 'bg-[#2d1215]',
    border: 'border-l-[#da3633]',
    iconColor: 'text-[#f85149]',
    Icon: AlertTriangle,
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const { Icon } = config

  return (
    <div
      className={`my-4 rounded-r-lg border-l-[3px] px-4 py-3.5 ${config.bg} ${config.border}`}
    >
      <div className={`flex items-center gap-2 ${title ? 'mb-1.5' : ''}`}>
        <span className={config.iconColor}>
          <Icon size={16} />
        </span>
        {title && (
          <strong className={`text-[13px] font-semibold ${config.iconColor}`}>
            {title}
          </strong>
        )}
      </div>
      <div className="text-sm leading-relaxed text-[#c9d1d9] [&_code]:!bg-[#161b22] [&_code]:!text-[#e6edf3] [&_code]:!border-0 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5">{children}</div>
    </div>
  )
}
