import { createFileRoute } from '@tanstack/react-router'
import { TutorialApp } from '#/components/tutorial'

export const Route = createFileRoute('/tutorials/')({
  head: () => ({
    meta: [
      { title: 'Claude Code Tutorial Series | Lumenalta' },
      {
        name: 'description',
        content:
          'A 17-tutorial interactive web course teaching Claude Code from beginner to expert. Learn agentic AI development.',
      },
    ],
  }),
  component: TutorialsIndex,
})

function TutorialsIndex() {
  return <TutorialApp />
}
