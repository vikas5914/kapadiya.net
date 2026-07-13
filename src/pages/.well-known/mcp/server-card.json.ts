import { getMcpServerCard, jsonResponse } from "../../../lib/agentContent";

export function GET() {
  return jsonResponse(getMcpServerCard());
}
