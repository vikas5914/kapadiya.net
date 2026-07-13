import { spawnSync } from "node:child_process";

const zone = process.env.CLOUDFLARE_ZONE ?? "kapadiya.net";
const dryRun = process.argv.includes("--dry-run");
const planOnly = process.argv.includes("--plan");
const markdownRequest = [
  `(http.host eq "${zone}")`,
  `(http.request.method in {"GET" "HEAD"})`,
  `ends_with(http.request.uri.path, "/")`,
  `any(lower(http.request.headers["accept"][*])[*] contains "text/markdown")`,
].join(" and ");

const configurations = [
  {
    phase: "http_request_transform",
    rulesetName: "kapadiya.net URL rewrites",
    rule: {
      action: "rewrite",
      action_parameters: {
        uri: {
          path: {
            expression: `concat(http.request.uri.path, "index.md")`,
          },
        },
      },
      expression: markdownRequest,
      description: "Serve prebuilt Markdown when agents request text/markdown",
      enabled: true,
      ref: "kapadiya_net_markdown_accept_rewrite",
    },
  },
];

if (planOnly) {
  console.log(JSON.stringify({ zone, configurations }, null, 2));
  process.exit(0);
}

function invoke(args, { allowNotFound = false } = {}) {
  const result = spawnSync("cf", args, {
    encoding: "utf8",
    env: process.env,
  });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  if (result.status === 0) return result.stdout.trim();
  if (allowNotFound && /\b404\b|not found/i.test(output)) return null;
  throw new Error(output || `cf ${args.join(" ")} failed`);
}

function parseJson(output, label) {
  try {
    return JSON.parse(output);
  } catch {
    throw new Error(`${label} did not return JSON`);
  }
}

const zones = parseJson(
  invoke(["zones", "list", "--name", zone]),
  "cf zones list"
);
const selectedZone = zones.find((candidate) => candidate.name === zone);
if (!selectedZone) throw new Error(`Cloudflare zone ${zone} was not found`);
process.env.CLOUDFLARE_ACCOUNT_ID = selectedZone.account.id;

function comparable(rule) {
  return JSON.stringify({
    action: rule.action,
    action_parameters: rule.action_parameters,
    expression: rule.expression,
    description: rule.description,
    enabled: rule.enabled,
    ref: rule.ref,
  });
}

for (const configuration of configurations) {
  const existingOutput = invoke(
    ["rulesets", "phases", "get", configuration.phase, "--zone", zone],
    { allowNotFound: true }
  );
  const ruleset = existingOutput
    ? parseJson(existingOutput, `cf rulesets phases get ${configuration.phase}`)
    : null;
  const existingRule = ruleset?.rules?.find(
    (rule) => rule.ref === configuration.rule.ref
  );

  if (existingRule && comparable(existingRule) === comparable(configuration.rule)) {
    console.log(`Unchanged ${configuration.rule.ref}.`);
    continue;
  }

  let args;
  if (!ruleset) {
    args = [
      "rulesets",
      "create",
      "--zone",
      zone,
      "--body",
      JSON.stringify({
        name: configuration.rulesetName,
        description: configuration.rulesetName,
        kind: "zone",
        phase: configuration.phase,
        rules: [configuration.rule],
      }),
    ];
  } else if (existingRule) {
    args = [
      "rulesets",
      "rules",
      "edit",
      existingRule.id,
      "--ruleset-id",
      ruleset.id,
      "--zone",
      zone,
      "--body",
      JSON.stringify(configuration.rule),
    ];
  } else {
    args = [
      "rulesets",
      "rules",
      "create",
      ruleset.id,
      "--zone",
      zone,
      "--body",
      JSON.stringify(configuration.rule),
    ];
  }

  if (dryRun) args.push("--dry-run");
  invoke(args);
  console.log(
    `${dryRun ? "Validated" : existingRule ? "Updated" : "Created"} ${configuration.rule.ref}.`
  );
}
