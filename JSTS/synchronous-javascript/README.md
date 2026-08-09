# Synchronous JavaScript

| Construct | Description | Best-fit scenario |
| --- | --- | --- |
| `Promise.all` | Parallel await of independent promises | When all results are required |
| `Promise.allSettled` | Wait for all, regardless of failures | Fire-and-collect many independent calls |
| `Promise.race` | First settled promise wins | Implement timeouts or first response wins |
| `Promise.any` | First fulfilled promise wins | Multiple fallback sources |
| `async/await` | Syntactic sugar for promises | Cleaner linear async flow |
| `AbortController` + `fetch` | Cancel HTTP requests | Cancel on component destroy or route change |

## Files

- [promise-all.js](promise-all.js) - `Promise.all` JavaScript example
- [promise-all.ts](promise-all.ts) - `Promise.all` TypeScript example
- [promise-all-settled.js](promise-all-settled.js) - `Promise.allSettled` JavaScript example
- [promise-all-settled.ts](promise-all-settled.ts) - `Promise.allSettled` TypeScript example
- [promise-race.js](promise-race.js) - `Promise.race` JavaScript example
- [promise-race.ts](promise-race.ts) - `Promise.race` TypeScript example
- [promise-any.js](promise-any.js) - `Promise.any` JavaScript example
- [promise-any.ts](promise-any.ts) - `Promise.any` TypeScript example
- [async-await.js](async-await.js) - `async/await` JavaScript example
- [async-await.ts](async-await.ts) - `async/await` TypeScript example
- [abort-controller-fetch.js](abort-controller-fetch.js) - `AbortController` + `fetch` JavaScript example
- [abort-controller-fetch.ts](abort-controller-fetch.ts) - `AbortController` + `fetch` TypeScript example
