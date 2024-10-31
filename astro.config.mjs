import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://kapadiya.net",
  image: {
    // Example: Allow remote image optimization from a single domain
    domains: ["kapadiya.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.kapadiya.net",
      },
    ],
  },
  integrations: [
    mdx({
      optimize: true,
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
          langs: [],
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: {
              className: "anchor",
            },
          },
        ],
        rehypeKatex,
      ],
      gfm: true,
    }),
    sitemap(),
    tailwind(),
    react({
      experimentalReactChildren: true,
    }),
    icon({
      include: {
        "fa6-solid": ["rss", "circle-half-stroke"],
        tabler: ["mail-filled"],
        "fa6-brands": ["x-twitter", "github", "instagram", "linkedin-in"],
      },
    }),
    sitemap(),
  ],
  output: "hybrid",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
