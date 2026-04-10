import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const paletteSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  bg: z.string(),
  // Readable text color for this project's background (white for dark bg, dark for light bg)
  text: z.string().default('#FFFFFF'),
  textMuted: z.string().default('rgba(255,255,255,0.55)'),
})

const statSchema = z.object({
  label: z.string(),
  value: z.number(),
  suffix: z.string().optional().default(''),
})

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.string(),
        year: z.number(),
        client: z.string(),
        role: z.string(),
        tools: z.array(z.string()),
        palette: paletteSchema,
        cover: z.string(),
        heroImage: z.string(),
        gallery: z.array(galleryImageSchema).optional().default([]),
        stats: z.array(statSchema).optional(),
        galleryLayout: z.enum(['grid-2x2', 'horizontal-scroll', 'before-after', 'large-first']).optional().default('grid-2x2'),
        draft: z.boolean().optional().default(false),
        sections: z.array(z.enum(['overview', 'gallery', 'process', 'results', 'next'])),
        nextProject: z.string(),
      }),
    }),
  },
})
