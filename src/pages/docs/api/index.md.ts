import { markdownResponse } from "../../../lib/agentContent";

export function GET() {
  return markdownResponse(`
# kapadiya.net Public Content API

Read-only profile, project, and writing metadata. No account, API key, or OAuth token is required.

## HTTP endpoints

- [GET /api/profile.json](https://kapadiya.net/api/profile.json) returns the public profile and selected projects.
- [GET /api/posts.json](https://kapadiya.net/api/posts.json) lists published posts and canonical URLs.
- [GET /api/status](https://kapadiya.net/api/status) checks public API availability.
- [GET /openapi.json](https://kapadiya.net/openapi.json) returns the OpenAPI 3.1 description.

## WebMCP

Pages register read-only browser tools for the public profile, blog links, and visible-content search through WebMCP. This static site does not advertise a remote MCP server.

## Authentication and usage

All operations are public and read-only. Agents use the anonymous registration profile and receive no credential. See [auth.md](https://kapadiya.net/auth.md) and the [authorization-server metadata](https://kapadiya.net/.well-known/oauth-authorization-server) for discovery details.

Content may be used for search and as agent input, but not for model training. The same preference is published in [robots.txt](https://kapadiya.net/robots.txt).
`);
}
