const requiredEnvironment = [
  "CLOUDFLARE_ZONE_ID",
  "CLOUDFLARE_CACHE_PURGE_TOKEN",
];

for (const name of requiredEnvironment) {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
}

const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const token = process.env.CLOUDFLARE_CACHE_PURGE_TOKEN;
const hostname = process.env.CLOUDFLARE_HOSTNAME || "kapadiya.net";
const apiBaseUrl = process.env.CLOUDFLARE_API_BASE_URL || "https://api.cloudflare.com/client/v4";

const response = await fetch(`${apiBaseUrl}/zones/${zoneId}/purge_cache`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ hosts: [hostname] }),
});

const result = await response.json().catch(() => null);

if (!response.ok || result?.success !== true) {
  const errors = result?.errors?.map(({ code, message }) => `${code}: ${message}`).join("; ");
  console.error(`Cloudflare cache purge failed (${response.status})${errors ? `: ${errors}` : ""}`);
  process.exit(1);
}

console.log(`Purged Cloudflare cache for ${hostname}.`);
