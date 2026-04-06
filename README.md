# OrderStrike

Military-grade brevity for Claude Code. Zero fluff. Maximum token efficiency.

## SITREP
Current AI interactions suffer from excessive token bloat. Pleasantries, apologies, and conversational padding drain resources and cognitive bandwidth. The objective of `orderstrike` is simple: eliminate all unnecessary tokens. Fast. Focused. Efficient.

## DEPLOYMENT
Install via `npx` into your Claude Code skills:

```bash
npx skills add <username>/orderstrike
```

*Or use as a standard MCP server in your preferred client.*

## COMBAT PROTOCOL
OrderStrike modifies Claude's system prompt to enforce a strict, military-grade communication style.

### Standard Claude Output
> "Hello! The TypeScript error you're seeing is occurring because you're trying to access a property on a value that could potentially be undefined. TypeScript's strict null checks are flagging this as a potential runtime error. I'd recommend adding a null check or using optional chaining." (61 tokens)

### OrderStrike Output
```
  SITREP: Value maybe undefined.
  THREAT: Potential runtime error.
  ACTION: Use optional chain: `user?.property`.
  **OVER.**
 (24 tokens)
```

## LICENSE
MIT
