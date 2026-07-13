import { getProfilePayload, jsonResponse } from "../../lib/agentContent";

export function GET() {
  return jsonResponse(getProfilePayload());
}
