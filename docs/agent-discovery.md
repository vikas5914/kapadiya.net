# Agent discovery deployment

Astro generates every HTTP discovery document and Markdown representation as a static file. Cloudflare Transform Rules select the Markdown representation when an agent sends `Accept: text/markdown`; no Worker, Pages Function, or server adapter is used.

## Markdown content negotiation

Create a token with Account / Transform Rules / Edit and Account / Account Rulesets / Read permissions, scoped to the account containing `kapadiya.net`, then run it through the Cloudflare CLI:

```bash
CLOUDFLARE_API_TOKEN="..." bun run configure:cloudflare-markdown
```

The default `cf auth login` OAuth client does not currently request Rulesets permissions, so an API token is required for this operation. The token is read only from the environment and must not be committed.

Use `bun run configure:cloudflare-markdown --plan` to inspect the intended rules without contacting Cloudflare. With an authorized token, `--dry-run` asks `cf` to validate the planned create or update operations without applying them.

The script idempotently upserts one rule using a stable reference while preserving unrelated rules:

- A URL Rewrite Transform Rule maps a canonical path such as `/blog/example/` to its prebuilt `/blog/example/index.md` asset when `Accept` contains `text/markdown`.
- Markdown assets publish `Cloudflare-CDN-Cache-Control: no-store` to prevent the zone cache from mixing them with HTML responses. Responses also publish `Vary: Accept` for downstream caches.

Cloudflare's native Markdown for Agents converter is not required. Astro remains in `output: "static"` mode, and browsers continue to receive HTML by default.

## DNS-AID permissions

Create an API token scoped to the `kapadiya.net` zone with:

- Zone / DNS / Edit

Run:

```bash
CLOUDFLARE_ZONE_ID="..." \
CLOUDFLARE_API_TOKEN="..." \
bun run configure:cloudflare-agents
```

The script idempotently publishes the `_index._agents.kapadiya.net` SVCB record and verifies DNSSEC remains active. Use `bun run configure:cloudflare-agents --dry-run` to inspect the intended API payload without changing Cloudflare.

`key65400` is in the private-use SvcParamKey range and carries the endpoint path while the DNS-AID draft's named parameters remain unregistered. The standard `alpn` and `port` keys are marked mandatory; the private-use hint is deliberately not mandatory so clients that do not understand it can still use the record.

## Post-deployment checks

```bash
# macOS's bundled dig may not recognize the SVCB mnemonic; TYPE64 is equivalent.
dig @1.1.1.1 _index._agents.kapadiya.net TYPE64 +dnssec
curl -I https://kapadiya.net/
curl -i -H 'Accept: text/markdown' https://kapadiya.net/
curl -i https://kapadiya.net/.well-known/api-catalog
curl -i https://kapadiya.net/.well-known/oauth-protected-resource
curl -i https://kapadiya.net/.well-known/oauth-authorization-server
curl -i https://kapadiya.net/auth.md
```
