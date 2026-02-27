import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const tutorials = defineCollection({
  name: 'tutorials',
  directory: 'content/tutorials',
  include: '**/*.{md,mdx}',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    })

    return {
      ...document,
      slug: document._meta.path,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [tutorials],
})
