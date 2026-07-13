import { getAgentIndex, jsonResponse } from "../../lib/agentContent";

export function GET() {
  return jsonResponse(getAgentIndex());
}
