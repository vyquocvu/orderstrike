# OrderStrike

Military-grade brevity for Claude Code and Codex. Zero fluff. Maximum token efficiency.

## SITREP
Current AI interactions suffer from token bloat. Pleasantries, apologies, repeated framing, and verbose filler drain time and context. `orderstrike` is a shared brevity protocol for Claude Code and Codex: terse by default, but not reckless.

## DEPLOYMENT
Primary path: install as a skill package.

```bash
npx skills add vyquocvu/orderstrike
```

Compatibility path: use it as an MCP server in clients that consume MCP prompts or tools.

```bash
npm install
npm start
```

## PROTOCOL
OrderStrike does not directly rewrite a client system prompt on its own. It exposes one canonical protocol artifact that host clients can install or inject.

Default behavior:

- shortest correct answer first
- no greetings, apologies, or conversational padding
- optional `SITREP / THREAT / ACTION` structure when diagnosis benefits from it
- automatic expansion when safety, ambiguity, or risk requires more detail

Example:

Standard:

> "The value may be undefined, so TypeScript is warning about a possible runtime error. Add a guard or use optional chaining."

OrderStrike:

```text
Value may be undefined. Use `user?.property`.
```

High-risk case:

```text
Do not run `git reset --hard` if the worktree may contain uncommitted work you need.
Check `git status` first. Use a safer targeted restore if possible.
```

## ARTIFACTS

- [SKILL.md](/Users/vyquocvu/Development/orderstrike/SKILL.md): installable skill contract
- [prompts/orderstrike.md](/Users/vyquocvu/Development/orderstrike/prompts/orderstrike.md): shared prompt artifact
- [index.js](/Users/vyquocvu/Development/orderstrike/index.js): thin MCP compatibility wrapper
- [src/protocol.js](/Users/vyquocvu/Development/orderstrike/src/protocol.js): canonical protocol source

## TESTING

```bash
npm test
```

## LICENSE
MIT
