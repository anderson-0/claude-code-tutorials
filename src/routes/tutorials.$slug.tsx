import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/tutorials/$slug')({
  loader: () => {
    // Redirect all tutorial slug routes to the main tutorials page
    throw redirect({ to: '/tutorials' })
  },
  component: () => null,
})
