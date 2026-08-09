# Object Methods

## `Object.keys`

Returns an array of an object's own property names.

JavaScript:

```js
const user = { id: 1, name: "Ava", role: "admin" };

console.log(Object.keys(user));
// ["id", "name", "role"]

for (const key of Object.keys(user)) {
	console.log(key, user[key]);
}
```

TypeScript:

```ts
type User = {
	id: number;
	name: string;
	role: string;
};

const user: User = { id: 1, name: "Ava", role: "admin" };

console.log(Object.keys(user));
// ["id", "name", "role"]
```

## `Object.values`

Returns an array of an object's own property values.

JavaScript:

```js
const user = { id: 1, name: "Ava", role: "admin" };

console.log(Object.values(user));
// [1, "Ava", "admin"]
```

TypeScript:

```ts
type User = {
	id: number;
	name: string;
	role: string;
};

const user: User = { id: 1, name: "Ava", role: "admin" };

console.log(Object.values(user));
// [1, "Ava", "admin"]
```

## `Object.entries`

Returns `[key, value]` pairs, useful for `for...of` loops and transforms.

JavaScript:

```js
const user = { id: 1, name: "Ava", role: "admin" };

for (const [key, value] of Object.entries(user)) {
	console.log(`${key}: ${value}`);
}
```

TypeScript:

```ts
type User = {
	id: number;
	name: string;
	role: string;
};

const user: User = { id: 1, name: "Ava", role: "admin" };

for (const [key, value] of Object.entries(user)) {
	console.log(`${key}: ${value}`);
}
```

## `Object.fromEntries`

Builds an object from key-value pairs.

JavaScript:

```js
const entries = [
	["name", "Mia"],
	["role", "editor"],
];

const profile = Object.fromEntries(entries);
console.log(profile);
// { name: "Mia", role: "editor" }
```

TypeScript:

```ts
const entries: [string, string][] = [
	["name", "Mia"],
	["role", "editor"],
];

const profile = Object.fromEntries(entries) as Record<string, string>;
console.log(profile);
// { name: "Mia", role: "editor" }
```

## `Object.assign`

Copies properties from source objects into a target object. This is a shallow copy.

JavaScript:

```js
const defaults = { theme: "light", language: "en" };
const overrides = { language: "fr" };

const config = Object.assign({}, defaults, overrides);
console.log(config);
// { theme: "light", language: "fr" }
```

TypeScript:

```ts
type Config = {
	theme: string;
	language: string;
};

const defaults: Config = { theme: "light", language: "en" };
const overrides: Partial<Config> = { language: "fr" };

const config: Config = Object.assign({}, defaults, overrides);
console.log(config);
// { theme: "light", language: "fr" }
```

## `{ ...a, ...b }` Spread Alternative

This is the common shorthand alternative to `Object.assign` for shallow merges.

JavaScript:

```js
const defaults = { theme: "light", language: "en" };
const overrides = { language: "fr" };

const config = { ...defaults, ...overrides };
console.log(config);
// { theme: "light", language: "fr" }
```

TypeScript:

```ts
type Config = {
	theme: string;
	language: string;
};

const defaults: Config = { theme: "light", language: "en" };
const overrides: Partial<Config> = { language: "fr" };

const config: Config = { ...defaults, ...overrides };
console.log(config);
// { theme: "light", language: "fr" }
```

## `structuredClone`

Deep-clones structured data such as objects, arrays, maps, sets, and dates.

JavaScript:

```js
const original = {
	name: "Ava",
	preferences: { theme: "dark" },
};

const copy = structuredClone(original);
copy.preferences.theme = "light";

console.log(original.preferences.theme);
// "dark"
```

TypeScript:

```ts
type User = {
	name: string;
	preferences: { theme: string };
};

const original: User = {
	name: "Ava",
	preferences: { theme: "dark" },
};

const copy: User = structuredClone(original);
copy.preferences.theme = "light";

console.log(original.preferences.theme);
// "dark"
```

## `Object.hasOwn`

Checks whether a property belongs directly to the object.

JavaScript:

```js
const data = Object.create(null);
data.id = 42;

console.log(Object.hasOwn(data, "id"));
// true

console.log(Object.hasOwn(data, "toString"));
// false
```

TypeScript:

```ts
const data: Record<string, number> = { id: 42 };

console.log(Object.hasOwn(data, "id"));
// true
```

## `Object.freeze`

Prevents changes to the object.

JavaScript:

```js
const frozen = Object.freeze({ name: "Ava" });
frozen.name = "Mia";

console.log(frozen.name);
// "Ava"
```

TypeScript:

```ts
const frozen = Object.freeze({ name: "Ava" });
// frozen.name = "Mia"; // Error in TypeScript

console.log(frozen.name);
// "Ava"
```

## `Object.seal`

Prevents adding or removing properties, but existing properties can still be changed.

JavaScript:

```js
const sealed = Object.seal({ count: 1 });
sealed.count = 2;
sealed.extra = true;

console.log(sealed);
// { count: 2 }
```

TypeScript:

```ts
const sealed = Object.seal({ count: 1 });
sealed.count = 2;
// sealed.extra = true; // Error in TypeScript

console.log(sealed);
// { count: 2 }
```

## `Object.preventExtensions`

Prevents new properties from being added, but existing ones can still be updated or deleted.

JavaScript:

```js
const limited = Object.preventExtensions({ name: "Ava" });
limited.name = "Mia";
limited.role = "admin";

console.log(limited);
// { name: "Mia" }
```

TypeScript:

```ts
const limited = Object.preventExtensions({ name: "Ava" });
limited.name = "Mia";
// limited.role = "admin"; // Error in TypeScript

console.log(limited);
// { name: "Mia" }
```

## `Object.create`

Creates an object with a specific prototype. Using `null` gives you a dictionary-style object with no inherited properties.

JavaScript:

```js
const dictionary = Object.create(null);
dictionary.apple = 3;
dictionary.orange = 5;

console.log(Object.keys(dictionary));
// ["apple", "orange"]
```

TypeScript:

```ts
const dictionary: Record<string, number> = Object.create(null);
dictionary.apple = 3;
dictionary.orange = 5;

console.log(Object.keys(dictionary));
// ["apple", "orange"]
```
