import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

const requiredFiles = [
  "dist/index.html",
  "dist/index.md",
  "dist/blog/index.html",
  "dist/blog/index.md",
  "dist/docs/api/index.md",
  "dist/api/profile.json",
  "dist/api/posts.json",
  "dist/openapi.json",
  "dist/auth.md",
  "dist/.well-known/api-catalog",
  "dist/.well-known/oauth-protected-resource",
  "dist/.well-known/oauth-authorization-server",
  "dist/.well-known/agent-index.json",
  "dist/.well-known/agent-skills/index.json",
  "dist/.well-known/agent-skills/portfolio-discovery/SKILL.md",
];

await Promise.all(requiredFiles.map((path) => stat(path)));

const [profile, posts, openapi, catalog, protectedResource, authorizationServer, skills, homeHtml, homeMarkdown, skill] = await Promise.all([
  readFile("dist/api/profile.json", "utf8").then(JSON.parse),
  readFile("dist/api/posts.json", "utf8").then(JSON.parse),
  readFile("dist/openapi.json", "utf8").then(JSON.parse),
  readFile("dist/.well-known/api-catalog", "utf8").then(JSON.parse),
  readFile("dist/.well-known/oauth-protected-resource", "utf8").then(JSON.parse),
  readFile("dist/.well-known/oauth-authorization-server", "utf8").then(JSON.parse),
  readFile("dist/.well-known/agent-skills/index.json", "utf8").then(JSON.parse),
  readFile("dist/index.html", "utf8"),
  readFile("dist/index.md", "utf8"),
  readFile("dist/.well-known/agent-skills/portfolio-discovery/SKILL.md", "utf8"),
]);

if (profile.profile?.url !== "https://kapadiya.net") {
  throw new Error("Profile API has the wrong canonical URL");
}
if (!Array.isArray(posts.posts) || posts.posts.length === 0) {
  throw new Error("Posts API is empty");
}
if (openapi.openapi !== "3.1.0" || Object.keys(openapi.paths ?? {}).length !== 3) {
  throw new Error("OpenAPI document is incomplete");
}
if (!Array.isArray(catalog.linkset) || catalog.linkset.length !== 2) {
  throw new Error("API catalog is incomplete");
}
if (
  protectedResource.resource !== "https://kapadiya.net" ||
  protectedResource.authorization_servers?.[0] !== "https://kapadiya.net" ||
  protectedResource.scopes_supported?.[0] !== "public.read" ||
  !protectedResource.bearer_methods_supported?.includes("header")
) {
  throw new Error("Protected-resource metadata is incomplete");
}
if (
  authorizationServer.issuer !== protectedResource.authorization_servers[0] ||
  authorizationServer.agent_auth?.skill !== "https://kapadiya.net/auth.md" ||
  authorizationServer.agent_auth?.register_uri !==
    "https://kapadiya.net/auth.md#registration" ||
  !authorizationServer.agent_auth?.identity_types_supported?.includes("anonymous") ||
  !authorizationServer.agent_auth?.anonymous?.credential_types_supported?.includes("none")
) {
  throw new Error("Authorization-server agent registration metadata is incomplete");
}
if (!homeMarkdown.startsWith("# Vikas Kapadiya\n")) {
  throw new Error("Homepage Markdown is missing its expected heading");
}
if (!homeHtml.includes("modelContext.registerTool") || !homeHtml.includes("modelContext.provideContext")) {
  throw new Error("Homepage does not include WebMCP registration");
}

for (const post of posts.posts) {
  for (const markdownPath of [
    `dist/blog/${post.slug}.md`,
    `dist/blog/${post.slug}/index.md`,
  ]) {
    const markdown = await readFile(markdownPath, "utf8");
    if (!markdown.startsWith(`# ${post.title}\n`)) {
      throw new Error(`${markdownPath} does not match the post title`);
    }
  }
}

const digest = createHash("sha256").update(skill).digest("hex");
if (skills.skills?.[0]?.digest !== `sha256:${digest}`) {
  throw new Error("Agent skill digest does not match its static artifact");
}
console.log(
  `Agent assets verified: ${posts.posts.length} posts, 5 static discovery documents, skill sha256:${digest}`
);
