import {
  markdownResponse,
  renderBlogIndexMarkdown,
} from "../../lib/agentContent";

export async function GET() {
  return markdownResponse(await renderBlogIndexMarkdown());
}
