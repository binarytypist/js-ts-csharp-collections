# Strings, Numbers, Math, & Date

| Category | Methods | When to use |
| --- | --- | --- |
| **String** | `trim`, `toLowerCase`, `toUpperCase`, `includes`, `startsWith`, `endsWith`, `indexOf`, `replace` / `replaceAll`, `split`, `slice` / `substring`, `repeat`, `padStart` / `padEnd`, `at` (ES2022) | Text manipulation. Prefer `replaceAll` for global replace, and `slice` over `substring` for clarity. |
| **Number** | `toFixed`, `toString`, `Number.isNaN`, `Number.isFinite`, `Number.isInteger`, `parseInt` (radix 10), `parseFloat` | Formatting and validation. Always pass radix to `parseInt`. |
| **Math** | `floor`, `ceil`, `round`, `trunc`, `max`, `min`, `abs`, `pow`, `sqrt`, `random` | Numeric utilities. Use `Math.random` only for non-cryptographic needs. |
| **Date** | `new Date()`, `getFullYear`, `getMonth` (0-based), `toISOString`, `toLocaleDateString` | Use date libraries like `date-fns` for complex date handling; avoid manual timezone math. |

## Files

- [string-methods.js](string-methods.js) - JavaScript string examples
- [string-methods.ts](string-methods.ts) - TypeScript string examples
- [number-methods.js](number-methods.js) - JavaScript number examples
- [number-methods.ts](number-methods.ts) - TypeScript number examples
- [math-methods.js](math-methods.js) - JavaScript math examples
- [math-methods.ts](math-methods.ts) - TypeScript math examples
- [date-methods.js](date-methods.js) - JavaScript date examples
- [date-methods.ts](date-methods.ts) - TypeScript date examples
