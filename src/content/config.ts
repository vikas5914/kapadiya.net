import { defineCollection, z } from 'astro:content';
import { HygraphLoader } from '@lib/HygraphLoader';

const posts = defineCollection({
  loader: HygraphLoader({
    endpoint: import.meta.env.HYGRAPH_ENDPOINT,
    operation: 'blogPosts',
    fields: ["id", "title", "slug", "content", "publishedAt", {
      "cover": ["url"]
    }],
  }),

  schema: z.object({
    id: z.string(),
    title: z.string({
      required_error: 'Title is required'
    }).min(1, {
      message: 'Title is required to be at least 1 character'
    }),
    slug: z.string(),
    cover: z.object({
      url: z.string()
    }),
    content: z.string(),
    publishedAt: z.string() 
  })
})

export const collections = { posts }