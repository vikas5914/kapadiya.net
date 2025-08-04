// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import opengraphImages, { presets } from "astro-opengraph-images";
import * as fs from "fs";

// https://astro.build/config
export default defineConfig({
  site: "https://kapadiya.net",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [],
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: import.meta.env.CF_PAGES && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    mdx(),
    sitemap(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"
            ),
          },
        ],
      },
      render: presets.waveSvg,
    }),
  ],
  output: "static",
});
