# RxJS Observable Operator Examples

This folder is split into two parts so each topic is easier to learn and run.

## 1) Important Filtering Operators

File: `important-filtering-example.js`

Included operators:
- `filter()`
- `take()`
- `takeUntil()`
- `takeWhile()`
- `first()`
- `last()`
- `skip()`
- `skipWhile()`
- `distinctUntilChanged()`

Why these matter:
- They help control how many values are emitted.
- They help ignore unwanted values.
- They help stop streams safely.

## 2) Combining Observables

File: `combining-observables-example.js`

Included operators:
- `combineLatest()`
- `forkJoin()`
- `merge()`
- `concat()`
- `zip()`
- `withLatestFrom()`

Why these matter:
- They combine values from multiple streams.
- They define timing and ordering behavior between streams.

## 3) Run All Examples

Launcher file: `operators-example.js`

From the `RxJS` folder:

```bash
node observable/operators-example.js
```

## 4) Run One Section Only

Run combining section only:

```bash
node -e "require('./observable/combining-observables-example').runCombiningExamples()"
```

Run important + filtering section only:

```bash
node -e "require('./observable/important-filtering-example').runImportantAndFilteringExamples()"
```
