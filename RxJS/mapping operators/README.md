# RxJS Higher-Order Mapping Operators

These four operators are used when one value starts another Observable, such as an HTTP request.

## 1. switchMap() → latest wins

- Starts the first request
- If a new value arrives, the previous request is cancelled
- Only the latest request continues

Use it for:
- Search boxes
- Changing filters
- Latest selection

> switchMap = cancel previous, use latest

## 2. mergeMap() → run everything

- Starts all requests immediately
- All operations can run at the same time

Use it for:
- Independent requests
- Multiple uploads

> mergeMap = run all in parallel

## 3. concatMap() → queue everything

- Starts the first request
- The next one waits until the previous finishes
- Requests run one after another in order

Use it for:
- Sequential saves
- Ordered updates

> concatMap = one after another

## 4. exhaustMap() → ignore while busy

- If one request is already running, new ones are ignored
- After the current one finishes, new values can be accepted again

Use it for:
- Submit buttons
- Login actions
- Save buttons

> exhaustMap = busy, ignore new

## Easy memory trick

- switchMap → LATEST
- mergeMap → ALL
- concatMap → QUEUE
- exhaustMap → IGNORE

## Quick interview example

If the user clicks quickly three times:

- switchMap: only the last click matters
- mergeMap: process all three
- concatMap: process all three in order
- exhaustMap: ignore the extra clicks while busy
