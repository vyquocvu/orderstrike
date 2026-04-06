import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

import { getProtocolText, protocol } from "../src/protocol.js";

const cwd = path.resolve(".");

async function withClient(run) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.join(cwd, "index.js")],
    cwd,
    stderr: "pipe",
  });
  const client = new Client({
    name: "orderstrike-test-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  try {
    await run(client);
  } finally {
    await transport.close();
  }
}

test("mcp prompt exposes canonical orderstrike protocol", async () => {
  await withClient(async (client) => {
    const prompts = await client.listPrompts();
    const prompt = prompts.prompts.find((entry) => entry.name === protocol.id);

    assert.ok(prompt);

    const resolved = await client.getPrompt({ name: protocol.id });
    assert.equal(resolved.messages[0].content.text, getProtocolText());
  });
});

test("mcp tool returns canonical orderstrike protocol", async () => {
  await withClient(async (client) => {
    const tools = await client.listTools();
    const tool = tools.tools.find(
      (entry) => entry.name === "get_orderstrike_protocol",
    );

    assert.ok(tool);

    const result = await client.callTool({
      name: "get_orderstrike_protocol",
      arguments: {},
    });
    assert.equal(result.content[0].text, getProtocolText());
  });
});
