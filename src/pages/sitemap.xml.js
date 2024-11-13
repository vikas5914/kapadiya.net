import { getCollection } from "astro:content";
import { metaData } from "./../config";

export async function GET(context) {
  const posts = await getCollection("posts");

  const pages = ["blog", "photos", "projects"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${context.site}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>

  ${pages
    .map(
      (page) => `
  <url>
    <loc>${context.site}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
    )
    .join("")}
  

  ${posts
    .map(
      (post) => `
  <url>
    <loc>${context.site}${post.data.slug}</loc>
    <lastmod>${post.data.publishedAt ? new Date(post.data.publishedAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
