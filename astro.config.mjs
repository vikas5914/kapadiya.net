import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://kapadiya.net",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-tweet"],
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.CF_PAGES && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  integrations: [
    icon({
      include: {
        "fa6-solid": ["rss", "circle-half-stroke"],
        tabler: ["mail-filled"],
        "fa6-brands": [
          "x-twitter",
          "github",
          "instagram",
          "linkedin-in",
          "bluesky",
        ],
      },
    }),
    react({
      experimentalReactChildren: true,
    }),
    mdx(),
    sitemap(),
  ],
  output: "static",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
    ],
  },
});
