import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  getPromptMarkdown,
  getProtocolText,
  getSkillDocument,
  protocol,
} from "../src/protocol.js";

test("canonical protocol includes terse default and safety override", () => {
  const text = getProtocolText();

  assert.match(text, /Prefer shortest correct answer\./);
  assert.match(text, /Default format: report\/order command\./);
  assert.match(
    text,
    /Expand automatically when ambiguity, risk, or task complexity makes terse output unsafe\./,
  );
});

test("skill document stays aligned with protocol identity", () => {
  const skill = getSkillDocument();

  assert.match(skill, new RegExp(`name: ${protocol.id}`));
  assert.match(skill, /No greetings, apologies, or conversational padding\./);
});

test("checked-in markdown prompt matches generated prompt", () => {
  const promptFile = fs.readFileSync("prompts/orderstrike.md", "utf8");

  assert.equal(promptFile, `${getPromptMarkdown()}\n`);
});

test("checked-in skill file matches generated skill document", () => {
  const skillFile = fs.readFileSync("SKILL.md", "utf8");

  assert.equal(skillFile, `${getSkillDocument()}\n`);
});
