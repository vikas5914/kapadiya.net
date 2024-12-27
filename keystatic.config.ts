import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        cover: fields.image({ label: "Cover" }),
        content: fields.mdx({
          label: "Content",
        }),
        publishedAt: fields.date({
          label: "Published At",
        }),
      },
    }),
  },
});
