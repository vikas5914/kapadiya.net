import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { jsonResponse } from "../../../lib/agentContent";

const skillPath = ".well-known/agent-skills/portfolio-discovery/SKILL.md";

export async function GET() {
  const artifact = await readFile(`public/${skillPath}`, "utf8");
  const digest = createHash("sha256").update(artifact).digest("hex");

  return jsonResponse({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "portfolio-discovery",
        type: "skill-md",
        description:
          "Discover Vikas Kapadiya's public profile, projects, posts, and agent resources.",
        url: `https://kapadiya.net/${skillPath}`,
        digest: `sha256:${digest}`,
      },
    ],
  });
}
