'use client'

import { useState } from 'react'

type Tab = {
  label: string
  content: React.ReactNode
}

type TabGroupProps = {
  tabs: Tab[]
}

export function TabGroup({ tabs }: TabGroupProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="my-4">
      <div className="flex border-b border-[#21262d]">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`cursor-pointer border-none bg-transparent px-5 py-2.5 text-sm transition-all ${
              active === i
                ? 'border-b-2 border-[#58a6ff] font-semibold text-[#58a6ff]'
                : 'border-b-2 border-transparent font-normal text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[active].content}</div>
    </div>
  )
}
