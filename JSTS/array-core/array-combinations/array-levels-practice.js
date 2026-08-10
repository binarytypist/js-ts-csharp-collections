// ============================================================
// JAVASCRIPT ARRAY METHODS — INTERVIEW PRACTICE
// ============================================================
//
// Topics covered:
//
// LEVEL 1
// - includes()
// - filter()
// - map()
// - find()
// - findIndex()
// - some()
// - every()
//
// LEVEL 2
// - sort()
// - reverse()
// - reduce()
// - Set
// - duplicate detection
// - frequency counting
// - flat()
// - flatMap()
//
// LEVEL 3
// - compare arrays
// - duplicate-sensitive comparison
// - common values
// - missing values
// - union
// - intersection
// - difference
//
// LEVEL 4
// - toSorted()
// - toReversed()
// - toSpliced()
// - with()
// - findLast()
// - findLastIndex()
// - mutation vs non-mutation
// - short-circuit behavior
// - comparing object arrays
// - Array.fromAsync()
//
// ============================================================


// ============================================================
// DATA
// ============================================================

// Main array of user objects used throughout the examples.
const users = [
  {
    id: 1,
    name: "Sammit",
    age: 39,
    active: true,
    skills: ["Angular", "TypeScript"]
  },
  {
    id: 2,
    name: "John",
    age: 28,
    active: false,
    skills: ["React", "JavaScript"]
  },
  {
    id: 3,
    name: "Maria",
    age: 32,
    active: true,
    skills: ["Angular", "RxJS"]
  },
  {
    id: 4,
    name: "David",
    age: 25,
    active: false,
    skills: ["Vue", "JavaScript"]
  }
];


// These arrays are used for array-comparison examples.

// Same values, different order.
const nod1 = ["sa", "m", "mit"];

// Same values as nod1, but different order.
const nod2 = ["mit", "sa", "m"];

// Same length but different duplicate counts.
const nod3 = ["sa", "m", "m"];
const nod4 = ["m", "sa", "sa"];


// Helper function used to visually separate sections.
function section(title) {
  console.log("\n" + title);
  console.log("-".repeat(title.length));
}


// ============================================================
// LEVEL 1 — BASIC ARRAY METHODS
// ============================================================

section("LEVEL 1");


// ------------------------------------------------------------
// 1. includes()
// ------------------------------------------------------------
//
// QUESTION:
// Check whether an array contains a specific value.
//
// Expected:
// true
//
// includes() checks whether the exact value exists
// in the array.
//
// Syntax:
// array.includes(value)

console.log(
  "1 includes():",
  ["Angular", "React"].includes("Angular")
);


// ------------------------------------------------------------
// 2. filter()
// ------------------------------------------------------------
//
// QUESTION:
// Return only active users.
//
// Expected:
// ["Sammit", "Maria"]
//
// filter() returns a NEW array containing
// every element that satisfies the condition.
//
// It does NOT modify the original array.

const activeUsers = users.filter(
  (user) => user.active
);

console.log(
  "2 filter():",
  activeUsers.map((user) => user.name)
);


// ------------------------------------------------------------
// 3. map()
// ------------------------------------------------------------
//
// QUESTION:
// Return only the names from the users array.
//
// Expected:
// ["Sammit", "John", "Maria", "David"]
//
// map() transforms every element into
// another value.
//
// Object -> string in this example.

const names = users.map(
  (user) => user.name
);

console.log(
  "3 map():",
  names
);


// ------------------------------------------------------------
// 4. find()
// ------------------------------------------------------------
//
// QUESTION:
// Find the user named Maria.
//
// Expected:
// "Maria"
//
// find() returns the FIRST element
// that satisfies the condition.
//
// If nothing is found, it returns undefined.

const findMaria = users.find(
  (user) => user.name === "Maria"
);

console.log(
  "4 find():",
  findMaria?.name
);


// ------------------------------------------------------------
// 5. findIndex()
// ------------------------------------------------------------
//
// QUESTION:
// Find the array index of Maria.
//
// Expected:
// 2
//
// findIndex() returns the index of the
// FIRST matching element.
//
// If nothing is found, it returns -1.

const findIndexMaria = users.findIndex(
  (user) => user.name === "Maria"
);

console.log(
  "5 findIndex():",
  findIndexMaria
);


// ------------------------------------------------------------
// 6. some()
// ------------------------------------------------------------
//
// QUESTION:
// Check whether at least ONE user is inactive.
//
// Expected:
// true
//
// some() returns true as soon as it finds
// ONE element satisfying the condition.
//
// It stops early once the answer is known.

const hasInactive = users.some(
  (user) => !user.active
);

console.log(
  "6 some():",
  hasInactive
);


// ------------------------------------------------------------
// 7. every()
// ------------------------------------------------------------
//
// QUESTION:
// Check whether ALL users are adults.
//
// Expected:
// true
//
// every() returns true only when EVERY
// element satisfies the condition.
//
// It stops early if one element fails.

const allAdults = users.every(
  (user) => user.age >= 18
);

console.log(
  "7 every():",
  allAdults
);


// ============================================================
// LEVEL 2 — DATA TRANSFORMATION
// ============================================================

section("LEVEL 2");


// ------------------------------------------------------------
// 8. sort()
// ------------------------------------------------------------
//
// QUESTION:
// Sort all user ages from smallest to largest.
//
// Expected:
// [25, 28, 32, 39]
//
// IMPORTANT:
// sort() MUTATES the array it is called on.
//
// Here map() creates a separate array of ages,
// so the users array itself is not affected.
//
// For numbers:
//
// a - b -> ascending
// b - a -> descending

const sortedAges = users
  .map((user) => user.age)
  .sort((a, b) => a - b);

console.log(
  "8 sort():",
  sortedAges
);


// ------------------------------------------------------------
// 9. reverse()
// ------------------------------------------------------------
//
// QUESTION:
// Reverse the names.
//
// IMPORTANT:
// reverse() MUTATES the array.
//
// [...names] creates a copy first.
//
// Therefore names itself remains unchanged.

const reversedNames = [...names].reverse();

console.log(
  "9 reverse():",
  reversedNames
);


// ------------------------------------------------------------
// 10. reduce()
// ------------------------------------------------------------
//
// QUESTION:
// Calculate the total age of all users.
//
// Expected:
// 124
//
// reduce() reduces many values into ONE final value.
//
// sum = accumulator
// user = current element
//
// Initial value = 0

const totalAge = users.reduce(
  (sum, user) => sum + user.age,
  0
);

console.log(
  "10 reduce():",
  totalAge
);


// ------------------------------------------------------------
// 11. Set — unique values
// ------------------------------------------------------------
//
// QUESTION:
// Find all unique skills.
//
// flatMap() first creates one flat array:
//
// [
//   "Angular",
//   "TypeScript",
//   "React",
//   "JavaScript",
//   "Angular",
//   "RxJS",
//   "Vue",
//   "JavaScript"
// ]
//
// Set removes duplicates.
//
// [...set] converts the Set back to an array.

const uniqueSkills = [
  ...new Set(
    users.flatMap((user) => user.skills)
  )
];

console.log(
  "11 Set:",
  uniqueSkills
);


// ------------------------------------------------------------
// 12. Find duplicate values
// ------------------------------------------------------------
//
// QUESTION:
// Find values that occur more than once.
//
// arrDup:
//
// ["a", "b", "b", "c", "a"]
//
// Expected:
//
// ["b", "a"]
//
// Explanation:
//
// arr.indexOf(value) gives the FIRST position.
//
// If the current index is different from
// the first position, the value is a duplicate.
//
// Set removes duplicate duplicate-results.

const arrDup = [
  "a",
  "b",
  "b",
  "c",
  "a"
];

const duplicates = [
  ...new Set(
    arrDup.filter(
      (value, index, arr) =>
        arr.indexOf(value) !== index
    )
  )
];

console.log(
  "12 duplicates:",
  duplicates
);


// ------------------------------------------------------------
// 13. Frequency / count
// ------------------------------------------------------------
//
// QUESTION:
// Count how many times each value occurs.
//
// Expected:
//
// {
//   a: 2,
//   b: 2,
//   c: 1
// }
//
// reduce() is excellent for building
// frequency/count objects.

const frequency = arrDup.reduce(
  (acc, value) => {

    // If value doesn't exist yet, start at 0.
    // Then increase by 1.
    acc[value] =
      (acc[value] || 0) + 1;

    return acc;
  },
  {}
);

console.log(
  "13 frequency/count:",
  frequency
);


// ------------------------------------------------------------
// 14. flat()
// ------------------------------------------------------------
//
// QUESTION:
// Convert a nested array into a single array.
//
// Input:
//
// [1, [2, 3], [4, 5]]
//
// Expected:
//
// [1, 2, 3, 4, 5]
//
// flat() removes nested array levels.
//
// flat(1) -> one level
// flat(2) -> two levels
// flat(Infinity) -> all levels

const nested = [
  1,
  [2, 3],
  [4, 5]
];

console.log(
  "14 flat():",
  nested.flat()
);


// ------------------------------------------------------------
// 15. flatMap()
// ------------------------------------------------------------
//
// QUESTION:
// Get all skills from all users in one array.
//
// map() would produce:
//
// [
//   ["Angular", "TypeScript"],
//   ["React", "JavaScript"],
//   ...
// ]
//
// flatMap() performs:
//
// map() + flat(1)
//
// Result:
//
// [
//   "Angular",
//   "TypeScript",
//   "React",
//   "JavaScript",
//   ...
// ]

const allSkills = users.flatMap(
  (user) => user.skills
);

console.log(
  "15 flatMap():",
  allSkills
);


// ============================================================
// LEVEL 3 — ARRAY COMPARISON & SET OPERATIONS
// ============================================================

section("LEVEL 3");


// ------------------------------------------------------------
// 16. Compare arrays regardless of order
// ------------------------------------------------------------
//
// QUESTION:
// Are two arrays equal if they contain
// the same values in a different order?
//
// Example:
//
// ["sa", "m", "mit"]
// ["mit", "sa", "m"]
//
// Expected:
//
// true
//
// IMPORTANT:
// This version treats arrays as collections
// where ORDER does not matter.
//
// Duplicate counts are still considered because
// we first check the lengths.

function compareArraysSorted(arr1, arr2) {

  // Different lengths means they cannot be equal.
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Copy before sorting because sort() mutates.
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  // Compare every value at the same position.
  return sorted1.every(
    (value, index) =>
      value === sorted2[index]
  );
}

console.log(
  "16 Compare arrays:",
  compareArraysSorted(nod1, nod2)
);


// ------------------------------------------------------------
// 17. Compare arrays including duplicate counts
// ------------------------------------------------------------
//
// QUESTION:
// Compare two arrays where duplicate counts matter.
//
// nod3:
//
// ["sa", "m", "m"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// Both contain "sa" and "m",
// but their counts are different.
//
// Therefore:
//
// false
//
// We create a frequency object for each array.
//
// nod3:
// {
//   sa: 1,
//   m: 2
// }
//
// nod4:
// {
//   m: 1,
//   sa: 2
// }

function compareArrayDuplicates(arr1, arr2) {

  function countValues(arr) {

    return arr.reduce(
      (acc, item) => {

        acc[item] =
          (acc[item] || 0) + 1;

        return acc;
      },
      {}
    );
  }

  // Convert both frequency objects to JSON
  // and compare their contents.
  return JSON.stringify(
    countValues(arr1)
  ) === JSON.stringify(
    countValues(arr2)
  );
}

console.log(
  "17 Compare duplicates:",
  compareArrayDuplicates(nod3, nod4)
);


// ------------------------------------------------------------
// 18. Common values
// ------------------------------------------------------------
//
// QUESTION:
// Find values that exist in BOTH arrays.
//
// Example:
//
// [1, 2, 3]
// [2, 3, 4]
//
// Result:
//
// [2, 3]
//
// filter() keeps values from arr1
// that also exist in arr2.
//
// Set removes duplicates.

function commonValues(arr1, arr2) {

  return [
    ...new Set(
      arr1.filter(
        (value) => arr2.includes(value)
      )
    )
  ];
}

console.log(
  "18 Common values:",
  commonValues(nod1, nod2)
);


// ------------------------------------------------------------
// 19. Missing values
// ------------------------------------------------------------
//
// QUESTION:
// Find values that exist in arr1
// but NOT in arr2.
//
// Example:
//
// arr1 = [1,2,3]
// arr2 = [2,3,4]
//
// Result:
//
// [1]
//
// This is basically:
//
// arr1 - arr2

function missingValues(fromArr, checkArr) {

  return fromArr.filter(
    (value) =>
      !checkArr.includes(value)
  );
}

console.log(
  "19 Missing values (nod1 vs nod2):",
  missingValues(nod1, nod2)
);


// ------------------------------------------------------------
// 20. Union
// ------------------------------------------------------------
//
// QUESTION:
// Return ALL unique values from both arrays.
//
// Example:
//
// [1,2,3]
// [3,4,5]
//
// Result:
//
// [1,2,3,4,5]
//
// concat() combines arrays.
// Set removes duplicates.

function union(arr1, arr2) {

  return [
    ...new Set(
      arr1.concat(arr2)
    )
  ];
}

console.log(
  "20 Union:",
  union(nod1, nod4)
);


// ------------------------------------------------------------
// 21. Intersection
// ------------------------------------------------------------
//
// QUESTION:
// Return values that exist in BOTH arrays.
//
// This is similar to commonValues().
//
// Set ensures the result contains
// unique values.

function intersection(arr1, arr2) {

  return [
    ...new Set(arr1)
  ].filter(
    (value) =>
      arr2.includes(value)
  );
}

console.log(
  "21 Intersection:",
  intersection(nod1, nod2)
);


// ------------------------------------------------------------
// 22. Difference
// ------------------------------------------------------------
//
// QUESTION:
// Return values that exist in arr1
// but NOT in arr2.
//
// Example:
//
// arr1 = [1,2,3]
// arr2 = [2,3,4]
//
// Result:
//
// [1]

function difference(arr1, arr2) {

  return arr1.filter(
    (value) =>
      !arr2.includes(value)
  );
}

console.log(
  "22 Difference (nod4 - nod1):",
  difference(nod4, nod1)
);


// ============================================================
// LEVEL 4 — MODERN JAVASCRIPT / IMMUTABLE ARRAY METHODS
// ============================================================

section("LEVEL 4 (BONUS)");


// ------------------------------------------------------------
// 23. toSorted()
// ------------------------------------------------------------
//
// QUESTION:
// Sort an array without changing the original.
//
// sort() mutates:
//
// const result = numbers.sort();
//
// toSorted() does NOT mutate:
//
// const result = numbers.toSorted();
//
// This is useful when working with immutable data,
// especially in frontend frameworks.

const baseNums = [
  30,
  10,
  20
];

console.log(
  "23 toSorted():",
  baseNums.toSorted(
    (a, b) => a - b
  ),
  "original:",
  baseNums
);


// ------------------------------------------------------------
// 24. toReversed()
// ------------------------------------------------------------
//
// QUESTION:
// Reverse an array without modifying the original.
//
// reverse() -> mutates
// toReversed() -> returns a new array

console.log(
  "24 toReversed():",
  baseNums.toReversed(),
  "original:",
  baseNums
);


// ------------------------------------------------------------
// 25. toSpliced()
// ------------------------------------------------------------
//
// QUESTION:
// Replace/remove/add elements without modifying
// the original array.
//
// Traditional splice() mutates.
//
// toSpliced() returns a NEW array.
//
// Example:
//
// [30,10,20]
//
// toSpliced(1, 1, 99)
//
// index 1
// remove 1 item
// insert 99
//
// Result:
//
// [30,99,20]

console.log(
  "25 toSpliced(1,1,99):",
  baseNums.toSpliced(
    1,
    1,
    99
  ),
  "original:",
  baseNums
);


// ------------------------------------------------------------
// 26. with()
// ------------------------------------------------------------
//
// QUESTION:
// Replace one element without modifying
// the original array.
//
// with(index, value)
//
// Example:
//
// [30,10,20]
//
// with(1,99)
//
// Result:
//
// [30,99,20]

console.log(
  "26 with(1,99):",
  baseNums.with(1, 99),
  "original:",
  baseNums
);


// ------------------------------------------------------------
// 27. findLast()
// ------------------------------------------------------------
//
// QUESTION:
// Find the LAST active user.
//
// find() searches from the beginning.
//
// findLast() searches from the end.
//
// The last active user is Maria.

const lastActive = users.findLast(
  (user) => user.active
);

console.log(
  "27 findLast active:",
  lastActive?.name
);


// ------------------------------------------------------------
// 28. findLastIndex()
// ------------------------------------------------------------
//
// QUESTION:
// Find the index of the LAST active user.
//
// Expected:
//
// 2
//
// findLastIndex() searches backwards.

const lastActiveIndex =
  users.findLastIndex(
    (user) => user.active
  );

console.log(
  "28 findLastIndex active:",
  lastActiveIndex
);


// ------------------------------------------------------------
// 29. reverse() MUTATES
// ------------------------------------------------------------
//
// QUESTION:
// Demonstrate that reverse() changes
// the original array.
//
// reverse() directly changes mutA.
//
// Therefore mutA becomes:
//
// [3,2,1]

const mutA = [
  1,
  2,
  3
];

mutA.reverse();

console.log(
  "29 reverse mutates original:",
  mutA
);


// ------------------------------------------------------------
// 30. toReversed() DOES NOT MUTATE
// ------------------------------------------------------------
//
// QUESTION:
// Demonstrate the immutable alternative.
//
// mutB stays:
//
// [1,2,3]
//
// nonMut becomes:
//
// [3,2,1]

const mutB = [
  1,
  2,
  3
];

const nonMut =
  mutB.toReversed();

console.log(
  "30 toReversed keeps original:",
  mutB,
  "new:",
  nonMut
);


// ============================================================
// 31. SOME() SHORT-CIRCUIT
// ============================================================
//
// QUESTION:
// Understand when some() stops.
//
// some() stops as soon as it finds
// the first matching value.
//
// Array:
//
// [1,2,3,4,5]
//
// Condition:
//
// n > 2
//
// It checks:
//
// 1 -> false
// 2 -> false
// 3 -> true
//
// Then it STOPS.
//
// Therefore checks = 3.

const shortNums = [
  1,
  2,
  3,
  4,
  5
];

let someChecks = 0;

const someResult =
  shortNums.some((n) => {

    someChecks++;

    return n > 2;
  });

console.log(
  "31 some() short-circuit:",
  someResult,
  "checks:",
  someChecks
);


// ============================================================
// 32. EVERY() SHORT-CIRCUIT
// ============================================================
//
// QUESTION:
// Understand when every() stops.
//
// Condition:
//
// n < 4
//
// It checks:
//
// 1 -> true
// 2 -> true
// 3 -> true
// 4 -> false
//
// Then it STOPS.
//
// Therefore checks = 4.

let everyChecks = 0;

const everyResult =
  shortNums.every((n) => {

    everyChecks++;

    return n < 4;
  });

console.log(
  "32 every() short-circuit:",
  everyResult,
  "checks:",
  everyChecks
);


// ============================================================
// 33. COMPARE OBJECT ARRAYS BY ID
// ============================================================
//
// QUESTION:
// Compare two arrays of objects by their IDs,
// ignoring object order.
//
// teamA:
//
// [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 }
// ]
//
// teamB:
//
// [
//   { id: 3 },
//   { id: 1 },
//   { id: 2 }
// ]
//
// Expected:
//
// true
//
// IMPORTANT:
// Objects cannot normally be compared like:
//
// { id: 1 } === { id: 1 }
//
// That returns false because they are
// different object references.
//
// Instead, extract the IDs and compare them.

const teamA = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

const teamB = [
  { id: 3 },
  { id: 1 },
  { id: 2 }
];

function compareObjectArraysById(arr1, arr2) {

  // Different lengths means they cannot match.
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Extract IDs and sort them.
  //
  // Example:
  //
  // teamA -> [1,2,3]
  // teamB -> [3,1,2]
  //
  // After sorting:
  //
  // [1,2,3]
  // [1,2,3]

  const ids1 =
    arr1
      .map((item) => item.id)
      .toSorted((a, b) => a - b);

  const ids2 =
    arr2
      .map((item) => item.id)
      .toSorted((a, b) => a - b);

  // Compare the sorted IDs.
  return ids1.every(
    (id, index) =>
      id === ids2[index]
  );
}

console.log(
  "33 Compare object arrays by id:",
  compareObjectArraysById(
    teamA,
    teamB
  )
);


// ============================================================
// 34. Array.fromAsync()
// ============================================================
//
// QUESTION:
// Convert an async iterable into an array.
//
// This is useful when values arrive
// asynchronously.
//
// Array.fromAsync() is similar to:
//
// Array.from()
//
// but works with async iterables/promises.
//
// IMPORTANT:
// It is asynchronous, so we need:
//
// async function
//
// and:
//
// await Array.fromAsync(...)

async function demoFromAsync() {

  // Async generator.
  //
  // Each yield produces a value asynchronously.
  async function* source() {

    yield "A";
    yield "B";
    yield "C";
  }

  // Check whether the current JavaScript runtime
  // supports Array.fromAsync().
  if (
    typeof Array.fromAsync === "function"
  ) {

    // Convert async iterable into an array.
    const result =
      await Array.fromAsync(source());

    console.log(
      "34 Array.fromAsync:",
      result
    );

  } else {

    // Older runtimes may not support it.
    console.log(
      "34 Array.fromAsync: not available in this runtime"
    );
  }
}


// Start the asynchronous demo.
//
// void means:
// "I intentionally don't need to await
// this returned Promise here."
void demoFromAsync();


// ============================================================
// QUICK INTERVIEW CHEAT SHEET
// ============================================================
//
// filter()
// -> Keep SOME elements.
//
// map()
// -> Transform EVERY element.
//
// find()
// -> Get the FIRST matching element.
//
// findIndex()
// -> Get the INDEX of the first match.
//
// findLast()
// -> Get the LAST matching element.
//
// findLastIndex()
// -> Get the INDEX of the last match.
//
// some()
// -> Does AT LEAST ONE match?
//
// every()
// -> Do ALL match?
//
// includes()
// -> Does this value exist?
//
// reduce()
// -> Reduce many values into ONE result.
//
// sort()
// -> Sorts AND MUTATES.
//
// reverse()
// -> Reverses AND MUTATES.
//
// toSorted()
// -> Sorts WITHOUT mutating.
//
// toReversed()
// -> Reverses WITHOUT mutating.
//
// toSpliced()
// -> Splice WITHOUT mutating.
//
// with()
// -> Replace one index WITHOUT mutating.
//
// flat()
// -> Remove nested array levels.
//
// flatMap()
// -> map() + flat(1).
//
// Set
// -> Store UNIQUE values.
//
// concat()
// -> Combine arrays.
//
// ============================================================
//
// COMMON INTERVIEW PATTERNS
// ============================================================
//
// 1. Filter data
//
// array.filter(x => condition)
//
// 2. Transform data
//
// array.map(x => transformation)
//
// 3. Find one item
//
// array.find(x => condition)
//
// 4. Check if something exists
//
// array.some(x => condition)
//
// 5. Check if everything matches
//
// array.every(x => condition)
//
// 6. Calculate a total
//
// array.reduce((sum, x) => sum + x, 0)
//
// 7. Remove duplicates
//
// [...new Set(array)]
//
// 8. Find common values
//
// a.filter(x => b.includes(x))
//
// 9. Find difference
//
// a.filter(x => !b.includes(x))
//
// 10. Union
//
// [...new Set([...a, ...b])]
//
// 11. Frequency counting
//
// array.reduce((acc, value) => {
//   acc[value] = (acc[value] || 0) + 1;
//   return acc;
// }, {})
//
// ============================================================