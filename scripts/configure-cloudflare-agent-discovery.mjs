const apiBase = "https://api.cloudflare.com/client/v4";
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const dryRun = process.argv.includes("--dry-run");

const records = [
  {
    type: "SVCB",
    name: "_index._agents.kapadiya.net",
    ttl: 3600,
    data: {
      priority: 1,
      target: "kapadiya.net",
      value:
        'mandatory="alpn,port" alpn="h2,h3" port="443" key65400="/.well-known/agent-index.json"',
    },
    comment: "DNS-AID organization index (draft-mozleywilliams-dnsop-dnsaid)",
  },
];

if (dryRun) {
  console.log(JSON.stringify({ content_converter: "on", records }, null, 2));
  process.exit(0);
}

if (!zoneId || !apiToken) {
  console.error(
    "Set CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN with Zone DNS Edit and Zone Settings Edit permissions."
  );
  process.exit(1);
}

async function cloudflare(path, init = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    const errors = payload.errors?.map((error) => error.message).join("; ");
    throw new Error(`Cloudflare API ${response.status}: ${errors || "request failed"}`);
  }
  return payload.result;
}

await cloudflare(`/zones/${zoneId}/settings/content_converter`, {
  method: "PATCH",
  body: JSON.stringify({ value: "on" }),
});
console.log("Enabled Cloudflare Markdown for Agents.");

for (const record of records) {
  const query = new URLSearchParams({ type: record.type, name: record.name });
  const existing = await cloudflare(`/zones/${zoneId}/dns_records?${query}`);
  if (existing.length > 1) {
    throw new Error(`Refusing to modify duplicate records for ${record.name}`);
  }

  const method = existing.length === 1 ? "PUT" : "POST";
  const path = existing.length === 1
    ? `/zones/${zoneId}/dns_records/${existing[0].id}`
    : `/zones/${zoneId}/dns_records`;
  await cloudflare(path, { method, body: JSON.stringify(record) });
  console.log(`${existing.length === 1 ? "Updated" : "Created"} ${record.type} ${record.name}.`);
}

const dnssec = await cloudflare(`/zones/${zoneId}/dnssec`);
if (dnssec.status !== "active") {
  throw new Error(`DNSSEC is not active (status: ${dnssec.status ?? "unknown"})`);
}
console.log("Verified DNSSEC is active.");
