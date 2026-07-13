# kapadiya.net auth.md

## Audience

This guidance is for agents and automated clients using the public kapadiya.net content API or WebMCP browser tools.

## Registration

Agent registration is not required or offered. There is no provisioning or registration endpoint because every published operation is public and read-only.

## Supported method

Use anonymous HTTPS requests without an `Authorization` header:

- Public API: `https://kapadiya.net/api/profile.json` and `https://kapadiya.net/api/posts.json`
- API documentation: `https://kapadiya.net/docs/api/`

## Credentials

No API key, OAuth token, client credential, identity assertion, or bearer token is accepted. Do not send credentials intended for another service.

The protected-resource metadata at `https://kapadiya.net/.well-known/oauth-protected-resource` explicitly publishes empty authorization-server, scope, and bearer-method lists.
