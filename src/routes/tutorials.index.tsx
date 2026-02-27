import { createFileRoute } from '@tanstack/react-router'
import { TutorialContent } from '#/components/tutorial'

export const Route = createFileRoute('/tutorials/')({
  head: () => ({
    meta: [
      { title: 'Getting Started with Claude Code | Claude Code Tutorials' },
      {
        name: 'description',
        content:
          'Install Claude Code, run your first commands, and understand the mental model of working with an agentic coding tool.',
      },
    ],
  }),
  component: TutorialsIndex,
})

function TutorialsIndex() {
  return <TutorialContent />
}
