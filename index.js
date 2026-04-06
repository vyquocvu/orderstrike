#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getProtocolText, protocol } from "./src/protocol.js";

const server = new McpServer({
  name: protocol.id,
  version: protocol.version,
});

const PROTOCOL_TEXT = getProtocolText();

server.prompt(
  protocol.id,
  "Shared OrderStrike brevity protocol for Claude Code and Codex",
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: PROTOCOL_TEXT,
        },
      },
    ],
  }),
);

server.tool(
  "get_orderstrike_protocol",
  "Return the canonical OrderStrike protocol for prompt injection or skill generation",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: PROTOCOL_TEXT,
      },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("OrderStrike MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in OrderStrike server:", error);
  process.exit(1);
});
