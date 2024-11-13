import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://kapadiya.net",
  vite: {
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
  integrations: [
    tailwind(),
    icon({
      include: {
        "fa6-solid": ["rss", "circle-half-stroke"],
        tabler: ["mail-filled"],
        "fa6-brands": ["x-twitter", "github", "instagram", "linkedin-in", "bluesky"],
      },
    }),
    react({
      experimentalReactChildren: true,
    }),
  ],
  output: "static",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
