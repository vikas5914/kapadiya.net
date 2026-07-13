import { getOpenApiDocument, jsonResponse } from "../lib/agentContent";

export function GET() {
  return jsonResponse(getOpenApiDocument());
}
