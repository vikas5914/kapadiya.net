import { getCollection, type CollectionEntry } from "astro:content";
import {
  metaData,
  projects,
  skillGroups,
  socialLinks,
} from "../config";

const API_VERSION = "1.0.0";
const ORIGIN = metaData.baseUrl;

type Post = CollectionEntry<"posts">;

function isoDate(value: string | Date) {
  return new Date(value).toISOString().slice(0, 10);
}

function sortPosts(posts: Post[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

export function serializePost(post: Post) {
  return {
    slug: post.data.slug,
    title: post.data.title,
    description: post.data.description,
    excerpt: post.data.excerpt ?? post.data.description,
    author: post.data.author,
    published: isoDate(post.data.date),
    updated: post.data.updated ? isoDate(post.data.updated) : undefined,
    readTime: post.data.readTime,
    category: post.data.category,
    tags: post.data.tags,
    featured: post.data.featured,
    url: `${metaData.baseUrl}/blog/${post.data.slug}/`,
  };
}

export async function getPosts() {
  return sortPosts(await getCollection("posts"));
}

export function getProfilePayload() {
  return {
    version: API_VERSION,
    profile: {
      name: metaData.name,
      title: "AI Engineer at Shopos AI",
      description: metaData.description,
      url: metaData.baseUrl,
      topics: skillGroups.flatMap((group) => group.items),
      links: socialLinks,
    },
    projects: projects.map((project) => ({
      name: project.name,
      description: project.description,
      url: project.url,
      tags: project.tags,
      stars: Number(project.stars),
    })),
  };
}

export function getApiCatalog() {
  const apiEntry = (anchor: string) => ({
    anchor,
    "service-desc": [
      {
        href: `${ORIGIN}/openapi.json`,
        type: "application/vnd.oai.openapi+json;version=3.1",
      },
    ],
    "service-doc": [{ href: `${ORIGIN}/docs/api/`, type: "text/html" }],
    status: [{ href: `${ORIGIN}/api/status`, type: "application/json" }],
  });

  return {
    linkset: [
      apiEntry(`${ORIGIN}/api/profile.json`),
      apiEntry(`${ORIGIN}/api/posts.json`),
    ],
  };
}

export function getProtectedResourceMetadata() {
  return {
    resource: ORIGIN,
    authorization_servers: [ORIGIN],
    scopes_supported: ["public.read"],
    bearer_methods_supported: ["header"],
    resource_name: "kapadiya.net Public Content API",
    resource_documentation: `${ORIGIN}/docs/api/`,
  };
}

export function getAuthorizationServerMetadata() {
  return {
    issuer: ORIGIN,
    resource: ORIGIN,
    authorization_servers: [ORIGIN],
    protected_resources: [ORIGIN],
    scopes_supported: ["public.read"],
    bearer_methods_supported: ["header"],
    agent_auth: {
      skill: `${ORIGIN}/auth.md`,
      register_uri: `${ORIGIN}/auth.md#registration`,
      claim_uri: `${ORIGIN}/auth.md#claiming-an-anonymous-registration`,
      revocation_uri: `${ORIGIN}/auth.md#revocation`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["none"],
      },
    },
  };
}

export function getMcpServerCard() {
  return {
    serverInfo: {
      name: "kapadiya.net WebMCP",
      version: API_VERSION,
    },
    description:
      "Read-only browser tools for discovering Vikas Kapadiya's public profile, posts, and visible site content.",
    transport: {
      type: "webmcp",
      endpoint: ORIGIN,
    },
    capabilities: {
      tools: [
        {
          name: "get_site_profile",
          description: "Read the public Vikas Kapadiya profile represented on the page.",
        },
        {
          name: "list_blog_posts",
          description: "List blog posts linked from the current page.",
        },
        {
          name: "search_visible_content",
          description: "Search text visible on the current page.",
        },
      ],
      resources: [],
      prompts: [],
    },
  };
}

export function getAgentIndex() {
  return {
    version: "1.0",
    domain: "kapadiya.net",
    resources: [
      {
        name: "public-content-api",
        description: "Read-only public profile, projects, and writing metadata.",
        protocol: "https",
        endpoint: `${ORIGIN}/.well-known/api-catalog`,
        authentication: { required: false },
      },
      {
        name: "webmcp",
        description: "Read-only browser tools registered by pages on kapadiya.net.",
        protocol: "webmcp",
        endpoint: ORIGIN,
        authentication: { required: false },
      },
    ],
  };
}

export function markdownResponse(body: string) {
  return new Response(`${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
    },
  });
}

export function jsonResponse(value: unknown) {
  return new Response(`${JSON.stringify(value, null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function toAgentMarkdown(body: string) {
  return body
    .replace(
      /<Tweet\s+id="([^"]+)"\s*\/>/g,
      "[View the referenced post on X](https://x.com/i/web/status/$1)"
    )
    .replace(
      /<ProTip\s+title="([^"]+)">\s*([\s\S]*?)\s*<\/ProTip>/g,
      (_match, title: string, content: string) =>
        [`> **${title}**`, ...content.trim().split("\n").map((line) => `> ${line}`)].join(
          "\n"
        )
    )
    .replace(/^import\s+.+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function renderPostMarkdown(post: Post) {
  const data = serializePost(post);
  const metadata = [
    `# ${data.title}`,
    "",
    data.description,
    "",
    `- Published: ${data.published}`,
    data.updated ? `- Updated: ${data.updated}` : undefined,
    `- Author: ${data.author}`,
    `- Category: ${data.category}`,
    `- Reading time: ${data.readTime}`,
    `- Canonical URL: ${data.url}`,
    data.tags.length > 0 ? `- Tags: ${data.tags.join(", ")}` : undefined,
    "",
  ].filter((line): line is string => line !== undefined);

  return [...metadata, toAgentMarkdown(post.body ?? "")].join("\n");
}

export async function renderBlogIndexMarkdown() {
  const posts = await getPosts();
  return [
    "# Vikas Kapadiya's Blog",
    "",
    "Posts about TypeScript, agents, LLM tooling, and open source.",
    "",
    ...posts.flatMap((post) => {
      const data = serializePost(post);
      return [
        `## [${data.title}](${data.url})`,
        "",
        data.excerpt,
        "",
        `${data.published} · ${data.readTime} · ${data.category}`,
        "",
      ];
    }),
  ].join("\n");
}

export async function renderHomeMarkdown() {
  const posts = (await getPosts()).slice(0, 6).map(serializePost);
  const profile = getProfilePayload();

  return [
    `# ${profile.profile.name}`,
    "",
    profile.profile.description,
    "",
    "## About",
    "",
    "AI engineer at Shopos AI working on agent workflows, LLM APIs, and the TypeScript and Python services underneath them.",
    "",
    "## Selected projects",
    "",
    ...profile.projects.flatMap((project) => [
      `### [${project.name}](${project.url})`,
      "",
      project.description,
      "",
      `Technologies: ${project.tags.join(", ")}`,
      "",
    ]),
    "## Recent writing",
    "",
    ...posts.flatMap((post) => [
      `- [${post.title}](${post.url}) — ${post.excerpt}`,
    ]),
    "",
    "## Agent resources",
    "",
    `- [API catalog](${metaData.baseUrl}/.well-known/api-catalog)`,
    `- [OpenAPI description](${metaData.baseUrl}/openapi.json)`,
    `- [Agent skills index](${metaData.baseUrl}/.well-known/agent-skills/index.json)`,
    `- [Authentication guidance](${metaData.baseUrl}/auth.md)`,
    `- [Agent registration metadata](${metaData.baseUrl}/.well-known/oauth-authorization-server)`,
    `- [MCP Server Card](${metaData.baseUrl}/.well-known/mcp/server-card.json)`,
    "",
    "## Contact",
    "",
    `- [GitHub](${socialLinks.github})`,
    `- [LinkedIn](${socialLinks.linkedin})`,
    `- [Bluesky](${socialLinks.bluesky})`,
    `- [Email](${socialLinks.email})`,
  ].join("\n");
}

export function getOpenApiDocument() {
  const schemaLink = (name: string) => ({ $ref: `#/components/schemas/${name}` });
  return {
    openapi: "3.1.0",
    info: {
      title: "kapadiya.net Public Content API",
      version: API_VERSION,
      description: "Read-only profile, project, post, and service-status data.",
    },
    servers: [{ url: metaData.baseUrl }],
    paths: {
      "/api/profile.json": {
        get: {
          operationId: "getProfile",
          summary: "Get the public profile and selected projects",
          responses: {
            "200": {
              description: "Public profile",
              content: { "application/json": { schema: schemaLink("ProfileResponse") } },
            },
          },
        },
      },
      "/api/posts.json": {
        get: {
          operationId: "listPosts",
          summary: "List published posts",
          responses: {
            "200": {
              description: "Published posts",
              content: { "application/json": { schema: schemaLink("PostsResponse") } },
            },
          },
        },
      },
      "/api/status": {
        get: {
          operationId: "getStatus",
          summary: "Check API availability",
          responses: {
            "200": {
              description: "Service status",
              content: { "application/json": { schema: schemaLink("StatusResponse") } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ProfileResponse: { type: "object", additionalProperties: true },
        PostsResponse: {
          type: "object",
          required: ["version", "posts"],
          properties: {
            version: { type: "string" },
            posts: { type: "array", items: { type: "object", additionalProperties: true } },
          },
        },
        StatusResponse: {
          type: "object",
          required: ["status", "api"],
          properties: {
            status: { type: "string", const: "ok" },
            api: { type: "string", const: "available" },
          },
        },
      },
    },
  };
}
