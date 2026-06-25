import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z
      .string({ error: "Title is required" })
      .min(1, {
        message: "Title is required to be at least 1 character",
      }),
    description: z
      .string({ error: "Description is required" })
      .min(1, {
        message: "Description is required to be at least 1 character",
      }),
    author: z.string().optional().default("Vikas Kapadiya"),
    date: z.string().or(z.date()),
    readTime: z.string(),
    category: z.string(),
    featured: z.boolean().optional().default(false),
    slug: z.string(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts };
