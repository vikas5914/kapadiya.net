import { getApiCatalog, jsonResponse } from "../../lib/agentContent";

export function GET() {
  return jsonResponse(getApiCatalog());
}
