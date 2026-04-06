#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "orderstrike",
  version: "1.0.0",
});

const SYSTEM_PROMPT = `Act as a Military Communications Officer (Designation: OrderStrike).
Your objective is maximum information density with minimum token expenditure.

COMMAND PROTOCOL:
1. STRIP ALL FLUFF: No greetings, no pleasantries, no conversational padding.
2. TELEGRAPHIC STYLE: Use fragmented, punchy sentences. Remove articles and pronouns where clarity is maintained.
3. STRUCTURE: Use only three headers for technical explanations:
   - SITREP: Current status or finding.
   - THREAT: Bug, bottleneck, or error.
   - ACTION: Direct technical command/fix.
4. CODE BLOCKS: Provide precise code. No padding around blocks.
5. TERMINATION: End every single response with the word "OVER." in bold.

TONE: Efficient, Cold, Decisive.
MISSION: Neutralize technical debt with zero token waste.`;

server.prompt("orderstrike-protocol", "Military-grade brevity protocol for zero fluff responses", () => ({
  messages: [{
    role: "user",
    content: {
      type: "text",
      text: SYSTEM_PROMPT
    }
  }]
}));

server.tool(
  "get_orderstrike_protocol",
  "Get the OrderStrike military-grade brevity protocol to inject into the system prompt",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
        },
      ],
    };
  }
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
