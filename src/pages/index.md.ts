import { markdownResponse, renderHomeMarkdown } from "../lib/agentContent";

export async function GET() {
  return markdownResponse(await renderHomeMarkdown());
}
