'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  highlightedHtml?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  highlightedHtml,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-[var(--line)]">
      {filename && (
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#1a2535] px-4 py-2">
          <span className="text-xs font-medium text-[#8b9eb0]">{filename}</span>
          <span className="text-xs text-[#6b7d8f]">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 rounded-lg border border-[var(--line)] bg-[#243044] p-2 text-[#8b9eb0] opacity-0 transition-opacity hover:bg-[#2d3d54] hover:text-white group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        {highlightedHtml ? (
          <div
            className="overflow-x-auto bg-[#1d2e45] p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="overflow-x-auto bg-[#1d2e45] p-4 text-sm text-[#e8efff]">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
