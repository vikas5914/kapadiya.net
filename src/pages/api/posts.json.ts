import { getPosts, jsonResponse, serializePost } from "../../lib/agentContent";

export async function GET() {
  const posts = (await getPosts()).map(serializePost);
  return jsonResponse({ version: "1.0.0", posts });
}
