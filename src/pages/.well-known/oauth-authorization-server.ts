import {
  getAuthorizationServerMetadata,
  jsonResponse,
} from "../../lib/agentContent";

export function GET() {
  return jsonResponse(getAuthorizationServerMetadata());
}
