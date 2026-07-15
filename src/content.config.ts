import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const validDate = z.string().refine(
  (value) => !Number.isNaN(new Date(value).getTime()),
  "Expected a valid date",
);
const dateValue = z.date().or(validDate);

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string({ error: "Title is required" }).min(1, {
      message: "Title is required to be at least 1 character",
    }),
    seoTitle: z.string().optional(),
    description: z.string({ error: "Description is required" }).min(1, {
      message: "Description is required to be at least 1 character",
    }),
    author: z.string().optional().default("Vikas Kapadiya"),
    date: dateValue,
    updated: dateValue.optional(),
    readTime: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    slug: z.string(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts };
