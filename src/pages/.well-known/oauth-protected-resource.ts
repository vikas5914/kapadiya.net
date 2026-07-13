import {
  getProtectedResourceMetadata,
  jsonResponse,
} from "../../lib/agentContent";

export function GET() {
  return jsonResponse(getProtectedResourceMetadata());
}
