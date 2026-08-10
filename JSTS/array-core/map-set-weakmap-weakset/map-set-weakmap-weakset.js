// ============================================================
// MAP / SET / WEAKMAP / WEAKSET
// ============================================================
//
// JavaScript provides four useful collection types:
//
// Map
// -> key-value pairs
//
// Set
// -> unique values
//
// WeakMap
// -> key-value pairs where keys MUST be objects
// -> does not prevent those objects from garbage collection
//
// WeakSet
// -> stores objects only
// -> does not prevent those objects from garbage collection
//
// ============================================================


// ============================================================
// 1. MAP
// ============================================================
//
// Map stores KEY -> VALUE pairs.
//
// Example:
//
// "Alice" -> 97
// "Bob"   -> 88
//
// Unlike normal objects, Map can use different types
// of values as keys:
//
// strings
// numbers
// objects
// functions
// etc.
//
// Map also preserves INSERTION ORDER.

const userScores = new Map();


// set(key, value)
// Adds a new key-value pair.
userScores.set("Alice", 95);

userScores.set("Bob", 88);


// If the key already exists,
// set() OVERWRITES the old value.
//
// Alice was:
// 95
//
// Now Alice becomes:
// 97
//
// The key "Alice" still exists only once.
userScores.set("Alice", 97);


// ------------------------------------------------------------
// Useful Map methods
// ------------------------------------------------------------
//
// map.set(key, value)
// -> add/update a value
//
// map.get(key)
// -> get value for a key
//
// map.has(key)
// -> check whether key exists
//
// map.delete(key)
// -> remove a key-value pair
//
// map.size
// -> number of entries
//
// map.clear()
// -> remove everything


// ============================================================
// 2. SET
// ============================================================
//
// Set stores UNIQUE values.
//
// Duplicate values are automatically ignored.
//
// Input:
//
// [
//   "frontend",
//   "backend",
//   "frontend",
//   "devops"
// ]
//
// Set becomes:
//
// {
//   "frontend",
//   "backend",
//   "devops"
// }

const uniqueTags = new Set([
  "frontend",
  "backend",
  "frontend",
  "devops"
]);


// The second "frontend" is ignored
// because Set only keeps unique values.


// ------------------------------------------------------------
// Useful Set methods
// ------------------------------------------------------------
//
// set.add(value)
// -> add a value
//
// set.has(value)
// -> check whether value exists
//
// set.delete(value)
// -> remove a value
//
// set.size
// -> number of unique values
//
// set.clear()
// -> remove everything


// ============================================================
// 3. WEAKMAP
// ============================================================
//
// WeakMap is similar to Map,
// but there is one VERY IMPORTANT difference:
//
// WeakMap keys MUST be objects.
//
// This is valid:
//
// weakMap.set(userObject, data);
//
// This is NOT valid:
//
// weakMap.set("Alice", data);
//
//
// WeakMap is useful when you want to associate
// private/temporary metadata with an object.
//
// The WeakMap does NOT prevent the object
// from being garbage collected.
//
// This can be useful for:
// - private metadata
// - DOM element metadata
// - caching object-related information
// - framework/library internals

const privateMeta = new WeakMap();


// Create objects that will be used as WeakMap keys.
const user1 = {
  id: 1,
  name: "Alice"
};

const user2 = {
  id: 2,
  name: "Bob"
};


// Store metadata associated with user1.
//
// user1 -> {
//   role: "admin",
//   lastLogin: "2026-08-09"
// }
privateMeta.set(
  user1,
  {
    role: "admin",
    lastLogin: "2026-08-09"
  }
);


// Store metadata for user2.
privateMeta.set(
  user2,
  {
    role: "editor",
    lastLogin: "2026-08-08"
  }
);


// Get the metadata associated with user1.
//
// get(object)
// -> returns the value stored for that object.
console.log(
  "User 1 metadata:",
  privateMeta.get(user1)
);


// Check whether metadata exists for user1.
console.log(
  "Has user1 metadata?",
  privateMeta.has(user1)
);


// ------------------------------------------------------------
// IMPORTANT WEAKMAP GARBAGE COLLECTION CONCEPT
// ------------------------------------------------------------
//
// Suppose:
//
// const user = {};
// weakMap.set(user, "some data");
//
// If later:
//
// user = null;
//
// and there are no other references to that object,
// JavaScript is allowed to garbage collect the object.
//
// The WeakMap entry can disappear automatically.
//
// You cannot iterate through a WeakMap:
//
// ❌ weakMap.forEach(...)
// ❌ [...weakMap]
//
// WeakMap intentionally does NOT expose all keys.
//
// Useful methods:
//
// weakMap.set()
// weakMap.get()
// weakMap.has()
// weakMap.delete()


// ============================================================
// 4. WEAKSET
// ============================================================
//
// WeakSet is similar to Set,
// but it stores OBJECTS only.
//
// It is useful when you simply want to track
// whether an object has been seen/visited.
//
// Example:
//
// user1 -> visited
// user2 -> not visited

const visitedUsers = new WeakSet();


// Add user1 to the WeakSet.
//
// user1 is now considered "visited".
visitedUsers.add(user1);


// Check whether user1 exists in the WeakSet.
//
// Result:
// true
console.log(
  "Has user1 been visited?",
  visitedUsers.has(user1)
);


// user2 was never added.
//
// Result:
// false
console.log(
  "Has user2 been visited?",
  visitedUsers.has(user2)
);


// ------------------------------------------------------------
// Useful WeakSet methods
// ------------------------------------------------------------
//
// weakSet.add(object)
// -> add object
//
// weakSet.has(object)
// -> check whether object exists
//
// weakSet.delete(object)
// -> remove object
//
// WeakSet cannot be iterated:
//
// ❌ [...weakSet]
// ❌ weakSet.forEach(...)
//
// Also, WeakSet only accepts objects.


// ============================================================
// 5. PRINTING MAP
// ============================================================
//
// Map has an entries() method.
//
// entries() returns:
//
// [
//   ["Alice", 97],
//   ["Bob", 88]
// ]
//
// Array.from() converts the Map iterator
// into a normal array.

console.log(
  "User scores:",
  Array.from(userScores.entries())
);


// You can also use:
//
// [...userScores.entries()]
//
// Both approaches convert the entries
// into a normal array.


// ============================================================
// 6. PRINTING SET
// ============================================================
//
// Set itself is iterable.
//
// Array.from() converts the Set
// into a normal array.
//
// Result:
//
// [
//   "frontend",
//   "backend",
//   "devops"
// ]

console.log(
  "Unique tags:",
  Array.from(uniqueTags)
);


// Alternative:
//
// [...uniqueTags]


// ============================================================
// 7. SET PRACTICE: REMOVE DUPLICATES
// ============================================================
//
// Original array:
//
// [
//   1,
//   2,
//   2,
//   3,
//   4,
//   4,
//   5
// ]
//
// Set automatically removes duplicates.
//
// Result:
//
// {
//   1,
//   2,
//   3,
//   4,
//   5
// }

const numbers = [
  1,
  2,
  2,
  3,
  4,
  4,
  5
];

const uniqueNumbers = new Set(numbers);


// Convert Set back into a normal array.
//
// [...uniqueNumbers]
//
// Result:
//
// [1, 2, 3, 4, 5]

console.log(
  "Unique numbers:",
  Array.from(uniqueNumbers)
);


// Common interview solution:
//
// const unique = [...new Set(numbers)];


// ============================================================
// 8. MAP PRACTICE: COUNT WORDS
// ============================================================
//
// We want to count how many times
// each word appears.
//
// Input:
//
// [
//   "apple",
//   "banana",
//   "apple",
//   "cherry",
//   "banana"
// ]
//
// Expected:
//
// apple  -> 2
// banana -> 2
// cherry -> 1

const words = [
  "apple",
  "banana",
  "apple",
  "cherry",
  "banana"
];


// Create an empty Map.
//
// Key:
// word
//
// Value:
// number of occurrences

const wordCount = new Map();


// Loop through every word.
for (const word of words) {

  // wordCount.get(word)
  //
  // returns the current count.
  //
  // If the word doesn't exist yet,
  // get() returns undefined.
  //
  // undefined || 0
  // becomes 0.
  //
  // Then + 1 increases the count.

  wordCount.set(
    word,
    (wordCount.get(word) || 0) + 1
  );
}


// Convert Map entries into an array
// so the result is easy to display.
//
// Result:
//
// [
//   ["apple", 2],
//   ["banana", 2],
//   ["cherry", 1]
// ]

console.log(
  "Word count:",
  Array.from(wordCount.entries())
);


// ============================================================
// MAP vs OBJECT
// ============================================================
//
// Both can store key-value data.
//
// Object:
//
// const user = {
//   name: "Sammit",
//   age: 39
// };
//
// Map:
//
// const user = new Map();
//
// user.set("name", "Sammit");
// user.set("age", 39);
//
// Prefer Map when:
// - You frequently add/remove entries.
// - You need keys of different types.
// - You need Map's built-in size.
// - You want clear Map-specific operations.
// - You need guaranteed insertion-order iteration.
//
// Object is often better for:
// - Representing a normal data object.
// - JSON/API data.
// - Records with known property names.


// ============================================================
// MAP vs SET
// ============================================================
//
// MAP
// ------------------------------------------------------------
// Stores:
//
// key -> value
//
// Example:
//
// "Sammit" -> 95
//
// Useful for:
//
// lookup by key
// counting
// caching
// relationships
//
//
// SET
// ------------------------------------------------------------
// Stores:
//
// value
//
// Example:
//
// "Angular"
// "React"
// "Vue"
//
// Useful for:
//
// unique values
// membership checks
// removing duplicates


// ============================================================
// MAP vs WEAKMAP
// ============================================================
//
// MAP
// ------------------------------------------------------------
// Keys can be:
// - strings
// - numbers
// - objects
// - etc.
//
// Can iterate:
//
// [...map]
//
// Has size:
//
// map.size
//
// Example:
//
// const map = new Map();
// map.set("user1", {...});
//
//
// WEAKMAP
// ------------------------------------------------------------
// Keys MUST be objects.
//
// Cannot iterate.
//
// No size property.
//
// Designed for object-associated metadata.
//
// Example:
//
// const weakMap = new WeakMap();
//
// const user = {};
//
// weakMap.set(user, {
//   privateData: true
// });


// ============================================================
// SET vs WEAKSET
// ============================================================
//
// SET
// ------------------------------------------------------------
// Can contain:
//
// primitives + objects
//
// Example:
//
// new Set([1, 2, 3])
//
// Can iterate:
//
// [...set]
//
//
// WEAKSET
// ------------------------------------------------------------
// Can contain OBJECTS only.
//
// Example:
//
// const user = {};
// weakSet.add(user);
//
// Cannot iterate.
//
// Useful for tracking objects
// without keeping them alive in memory.


// ============================================================
// QUICK INTERVIEW CHEAT SHEET
// ============================================================
//
// Map
// -> key-value collection
//
// map.set(key, value)
// map.get(key)
// map.has(key)
// map.delete(key)
// map.size
//
// ------------------------------------------------------------
//
// Set
// -> unique values
//
// set.add(value)
// set.has(value)
// set.delete(value)
// set.size
//
// ------------------------------------------------------------
//
// WeakMap
// -> object keys + associated values
// -> keys MUST be objects
// -> not iterable
// -> does not prevent garbage collection
//
// ------------------------------------------------------------
//
// WeakSet
// -> objects only
// -> tracks whether objects exist in the set
// -> not iterable
// -> does not prevent garbage collection
//
// ============================================================


// ============================================================
// MOST IMPORTANT INTERVIEW PATTERNS
// ============================================================
//
// Remove duplicates:
//
// const unique = [...new Set(array)];
//
//
// Count occurrences:
//
// const count = new Map();
//
// for (const item of array) {
//   count.set(
//     item,
//     (count.get(item) || 0) + 1
//   );
// }
//
//
// Check membership:
//
// const set = new Set(array);
//
// set.has(value);
//
//
// Key-value lookup:
//
// const map = new Map();
//
// map.set(id, user);
//
// const user = map.get(id);
//
//
// Object metadata:
//
// const metadata = new WeakMap();
//
// metadata.set(object, data);
//
//
// Track visited objects:
//
// const visited = new WeakSet();
//
// visited.add(object);
//
// visited.has(object);
//
// ============================================================
// SIMPLE DECISION RULE
// ============================================================
//
// Need KEY -> VALUE?
//        ↓
//      Map
//
// Need UNIQUE VALUES?
//        ↓
//      Set
//
// Need metadata attached to OBJECTS?
//        ↓
//    WeakMap
//
// Need to TRACK OBJECTS?
//        ↓
//    WeakSet
//
// ============================================================