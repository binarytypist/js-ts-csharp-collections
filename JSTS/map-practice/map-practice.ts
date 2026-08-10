// ============================================================
// MAP PRACTICE IN TYPESCRIPT
// ============================================================

// A Map stores data as KEY -> VALUE pairs.
//
// Unlike a normal object:
//
// {
//   name: "Ava",
//   age: 28
// }
//
// Map allows keys of different types and provides
// useful methods such as set(), get(), has(), delete(),
// clear(), keys(), values(), and entries().

// ============================================================
// CREATE MAP
// ============================================================

// Create a new Map.
//
// Here we don't specify the key/value types explicitly,
// so TypeScript infers them as string -> string | number.
const employeeMap = new Map();

// ============================================================
// SET
// ============================================================

// set(key, value) adds a new key-value pair to the Map.

// Key: "name"
// Value: "Ava"
employeeMap.set("name", "Ava");

// Key: "age"
// Value: 28
employeeMap.set("age", 28);

// Key: "city"
// Value: "Berlin"
employeeMap.set("city", "Berlin");

// The Map now contains:
//
// "name" -> "Ava"
// "age"  -> 28
// "city"  -> "Berlin"

// ============================================================
// SIZE
// ============================================================

// size returns the number of key-value pairs.
//
// There are currently 3 entries:
//
// name
// age
// city
//
// Therefore:
// 3
console.log(
  "Map size:",
  employeeMap.size
);

// ============================================================
// HAS
// ============================================================

// has(key) checks whether a key exists.
//
// "name" exists,
// so the result is true.
console.log(
  "Has name:",
  employeeMap.has("name")
);

// ============================================================
// GET
// ============================================================

// get(key) returns the value associated with a key.
//
// The key "age" contains the value 28.
console.log(
  "Get age:",
  employeeMap.get("age")
);

// If the key does not exist,
// get() returns undefined.
//
// Example:
//
// employeeMap.get("salary")
// -> undefined

// ============================================================
// ENTRIES
// ============================================================

// entries() returns an iterator containing
// [key, value] pairs.
//
// Example:
//
// [
//   ["name", "Ava"],
//   ["age", 28],
//   ["city", "Berlin"]
// ]

// for...of loops through every entry.
//
// [key, value] destructures each pair.
//
// First iteration:
//
// key   = "name"
// value = "Ava"
//
// Second:
//
// key   = "age"
// value = 28
//
// Third:
//
// key   = "city"
// value = "Berlin"
for (const [key, value] of employeeMap.entries()) {
  console.log(
    `Entry: ${key} -> ${value}`
  );
}

// ============================================================
// KEYS
// ============================================================

// keys() returns an iterator containing
// only the keys.
//
// Result:
//
// "name"
// "age"
// "city"

// [...employeeMap.keys()]
//
// converts the iterator into a normal array.
console.log(
  "Keys:",
  [...employeeMap.keys()]
);

// ============================================================
// VALUES
// ============================================================

// values() returns an iterator containing
// only the values.
//
// Result:
//
// "Ava"
// 28
// "Berlin"

// Spread converts the iterator into an array.
console.log(
  "Values:",
  [...employeeMap.values()]
);

// ============================================================
// DELETE
// ============================================================

// delete(key) removes one key-value pair.
//
// Before delete:
//
// name -> Ava
// age  -> 28
// city -> Berlin

// Remove the "city" entry.
employeeMap.delete("city");

// Now the Map contains:
//
// name -> Ava
// age  -> 28

// has("city") now returns false.
console.log(
  "After delete, has city:",
  employeeMap.has("city")
);

// ============================================================
// CLEAR
// ============================================================

// clear() removes ALL entries from the Map.
//
// Before clear:
//
// name -> Ava
// age  -> 28

employeeMap.clear();

// The Map is now empty.
//
// size = 0
console.log(
  "After clear, size:",
  employeeMap.size
);

// ============================================================
// MAP INITIALIZED WITH ARRAY OF PAIRS
// ============================================================

// A Map can also be created directly
// using an array of [key, value] pairs.
//
// Each inner array must have:
//
// [key, value]
//
// Example:
//
// ["id", 1]
// ["role", "admin"]

const userMap = new Map([
  ["id", 1],
  ["role", "admin"],
]);

// The Map contains:
//
// "id"   -> 1
// "role" -> "admin"

// ============================================================
// ENTRIES
// ============================================================

// userMap.entries() returns an iterator,
// not a normal array.
//
// Therefore console.log() may display
// something like:
//
// MapIterator { ... }

// If we want to see the actual entries,
// convert the iterator to an array:
//
// [...userMap.entries()]

console.log(
  "User map entries:",
  [...userMap.entries()]
);

// ============================================================
// MAP SUMMARY
// ============================================================

// set()
//   -> Add or update a key-value pair.
//
// get(key)
//   -> Get the value for a key.
//
// has(key)
//   -> Check whether a key exists.
//
// delete(key)
//   -> Remove one key-value pair.
//
// clear()
//   -> Remove all entries.
//
// size
//   -> Number of entries.
//
// keys()
//   -> Iterator containing keys.
//
// values()
//   -> Iterator containing values.
//
// entries()
//   -> Iterator containing [key, value] pairs.
//
// for...of
//   -> Iterate through Map entries.
//
// [...map.keys()]
//   -> Convert keys iterator to an array.
//
// [...map.values()]
//   -> Convert values iterator to an array.
//
// [...map.entries()]
//   -> Convert entries iterator to an array.