import type { CollectionEntry } from "astro:content";
import { getPosts, markdownResponse, renderPostMarkdown } from "../../lib/agentContent";

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: post,
  }));
}

export function GET({ props }: { props: CollectionEntry<"posts"> }) {
  return markdownResponse(renderPostMarkdown(props));
}
