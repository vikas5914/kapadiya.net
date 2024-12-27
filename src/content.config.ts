import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, {
        message: "Title is required to be at least 1 character",
      }),
    cover: z.string().optional(),
    publishedAt: z.string(),
  }),
});

export const collections = { posts };
