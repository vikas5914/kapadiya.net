# Agent discovery deployment

Astro generates every HTTP discovery document as a static file. The remaining provider-level configuration is automated by `scripts/configure-cloudflare-agent-discovery.mjs`.

## Cloudflare permissions

Create an API token scoped to the `kapadiya.net` zone with:

- Zone / DNS / Edit
- Zone / Zone Settings / Edit

Run:

```bash
CLOUDFLARE_ZONE_ID="..." \
CLOUDFLARE_API_TOKEN="..." \
bun run configure:cloudflare-agents
```

The script idempotently enables Cloudflare Markdown for Agents, publishes the `_index._agents.kapadiya.net` SVCB record, and verifies DNSSEC remains active. Use `bun run configure:cloudflare-agents --dry-run` to inspect the intended API payload without changing Cloudflare.

Cloudflare's native content converter is the only request-time feature. Astro remains in `output: "static"` mode with no adapter, Pages Function, or custom Worker.

Cloudflare currently makes Markdown for Agents available on Pro, Business, and Enterprise plans. On a Free zone, the generated `.md` routes still work, but same-URL `Accept: text/markdown` negotiation requires either a plan upgrade or request-time edge code.

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
