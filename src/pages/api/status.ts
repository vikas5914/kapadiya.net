import { jsonResponse } from "../../lib/agentContent";

export function GET() {
  return jsonResponse({ status: "ok", api: "available" });
}
