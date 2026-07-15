// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";

import astroTakumi from "astro-takumi";
import { renderOpenGraphImage } from "./src/lib/ogRenderer";
import { industrialShikiTheme } from "./src/lib/shikiTheme";
import * as fs from "fs";

// https://astro.build/config
export default defineConfig({
  site: "https://kapadiya.net",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    mdx(),
    sitemap(),
    astroTakumi({
      options: {
        fonts: [
          fs.readFileSync(
            "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"
          ),
        ],
      },
      render: renderOpenGraphImage,
    }),
  ],
  markdown: {
    processor: satteri(),
    shikiConfig: {
      theme: industrialShikiTheme,
    },
  },
  trailingSlash: "always",
  output: "static",
});
