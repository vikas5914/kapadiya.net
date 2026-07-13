---
name: portfolio-discovery
description: Discover Vikas Kapadiya's public profile, projects, posts, and agent resources.
---

# Discover kapadiya.net

Use this skill when an agent needs public information from kapadiya.net.

## Resources

- Read `https://kapadiya.net/api/profile.json` for the public profile and selected projects.
- Read `https://kapadiya.net/api/posts.json` for published-post metadata and canonical URLs.
- Request any HTML page with `Accept: text/markdown` to receive its Markdown representation.
- Read `https://kapadiya.net/openapi.json` for the OpenAPI 3.1 description.
- Read `https://kapadiya.net/.well-known/oauth-protected-resource` and `https://kapadiya.net/.well-known/oauth-authorization-server` for the anonymous agent registration profile.
- Browser-capable agents can use the read-only WebMCP tools registered by each HTML page.

## Authentication

All advertised operations are anonymous and read-only. Follow `https://kapadiya.net/auth.md`; registration issues no credential. Do not send API keys, OAuth tokens, or credentials intended for another origin.

## Content usage

The publisher permits search and AI input use but does not permit AI model training. Respect the `Content-Signal` directive in `https://kapadiya.net/robots.txt`.
