# kapadiya.net auth.md

## Audience

This guidance is for agents and automated clients using the public kapadiya.net content API or WebMCP browser tools.

## Registration

Registration uses the `anonymous` identity type and is automatic: reading this section completes registration. Do not send a POST request or create an account. No user identity is asserted, stored, or linked.

Discovery metadata:

- Protected resource: `https://kapadiya.net/.well-known/oauth-protected-resource`
- Authorization server profile: `https://kapadiya.net/.well-known/oauth-authorization-server`
- Registration URI: `https://kapadiya.net/auth.md#registration`

The only supported credential type is `none`. Registration produces no access token, client secret, identity assertion, session, or refresh token.

## Supported method

Use anonymous HTTPS requests without an `Authorization` header:

- Public API: `https://kapadiya.net/api/profile.json` and `https://kapadiya.net/api/posts.json`
- API documentation: `https://kapadiya.net/docs/api/`

## Credentials

No API key, OAuth token, client credential, identity assertion, or bearer token is accepted. Do not send credentials intended for another service.

The advertised `public.read` scope describes the public read-only surface. It does not require a grant or token exchange. The `header` bearer method in protected-resource metadata identifies the standard presentation location for clients that inspect OAuth metadata; anonymous clients must omit the header because this profile issues no bearer credential.

## Claiming an anonymous registration

Anonymous registrations cannot be claimed or associated with a person. There is no claim ceremony or claim-processing endpoint. Continue using anonymous public access.

## Revocation

There is nothing to revoke because the service issues no credential and stores no registration. To stop access, stop making requests. If a future version introduces credentials, it will publish an operational revocation endpoint in the authorization-server metadata.
