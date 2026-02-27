'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from '#/components/icons'

type AccordionProps = {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-[#21262d]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 border-none bg-[#161b22] px-3.5 py-3 text-left text-sm font-semibold text-[#e6edf3] hover:bg-[#1c2128]"
      >
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        {title}
      </button>
      {open && (
        <div className="border-t border-[#21262d] bg-[#0d1117] p-4">
          {children}
        </div>
      )}
    </div>
  )
}
