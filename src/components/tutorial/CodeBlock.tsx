'use client'

import { useState } from 'react'
import { Check, CopyIcon, Terminal } from '#/components/icons'

type CodeBlockProps = {
  code: string
  lang?: string
  filename?: string
}

export function CodeBlock({ code, lang = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-3.5 py-1.5">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#8b949e]">
          <Terminal size={14} />
          {filename || lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-1 rounded-md border border-[#30363d] bg-transparent px-2 py-0.5 text-[11px] text-[#8b949e] hover:border-[#8b949e] hover:text-[#e6edf3]"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <CopyIcon size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-3.5 font-mono text-[13px] leading-relaxed text-[#e6edf3]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
