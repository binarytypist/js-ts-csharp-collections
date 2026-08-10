// ============================================================
// MAIN USER DATASET
// ============================================================

// An array containing user objects.
//
// Each user has:
// - id      -> unique user ID
// - name    -> user's name
// - age     -> user's age
// - active  -> whether the user is active
// - skills  -> array of technologies/skills

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


// ============================================================
// ARRAYS FOR LEVEL 3 ARRAY COMPARISON
// ============================================================

// These two arrays contain exactly the same values,
// but the order is different.
//
// nod1:
// ["sa", "m", "mit"]
//
// nod2:
// ["mit", "sa", "m"]
//
// They should be considered equal when
// order does NOT matter.

const nod1 = ["sa", "m", "mit"];

const nod2 = ["mit", "sa", "m"];


// These two arrays contain the same UNIQUE values,
// but the number of duplicates is different.
//
// nod3:
//
// ["sa", "m", "m"]
//
// m appears 2 times.
//
// nod4:
//
// ["m", "sa", "sa"]
//
// sa appears 2 times.
//
// Therefore they should NOT be considered equal
// when duplicates matter.

const nod3 = ["sa", "m", "m"];

const nod4 = ["m", "sa", "sa"];


// ============================================================
// HELPER FUNCTION
// ============================================================

// Prints a nice section title.
//
// Example:
//
// section("LEVEL 1");
//
// Output:
//
// LEVEL 1
// -------

function section(title) {

  // \n creates an empty line before the title.

  console.log("\n" + title);

  // repeat() repeats "-" based on title length.

  console.log("-".repeat(title.length));
}


// ============================================================
// LEVEL 1
// BASIC ARRAY METHODS
// ============================================================

section("LEVEL 1");


// ============================================================
// 1. includes()
// ============================================================

// includes() checks whether an array contains
// a particular value.
//
// It returns:
// true  -> value exists
// false -> value does not exist

console.log(
  "1 includes():",
  ["Angular", "React"].includes("Angular")
);

// Result:
//
// true


// ============================================================
// 2. filter()
// ============================================================

// filter() creates a NEW array containing
// only elements that satisfy a condition.
//
// Here:
//
// u = current user
//
// u.active
//
// means:
//
// true  -> include the user
// false -> exclude the user

const activeUsers = users.filter(
  (u) => u.active
);


// We then use map() to get only the names.
//
// Active users:
//
// Sammit
// Maria

console.log(
  "2 filter():",
  activeUsers.map((u) => u.name)
);

// Result:
//
// ["Sammit", "Maria"]


// ============================================================
// 3. map()
// ============================================================

// map() transforms every element of an array.
//
// Here:
//
// User object
//
// becomes:
//
// User name
//
// Example:
//
// {
//   id: 1,
//   name: "Sammit",
//   ...
// }
//
// becomes:
//
// "Sammit"

const names = users.map(
  (u) => u.name
);

console.log(
  "3 map():",
  names
);

// Result:
//
// ["Sammit", "John", "Maria", "David"]


// ============================================================
// 4. find()
// ============================================================

// find() returns the FIRST element
// that satisfies the condition.
//
// Here we search for:
//
// name === "Maria"

const findMaria = users.find(
  (u) => u.name === "Maria"
);


// ?. is optional chaining.
//
// If findMaria exists:
//
// findMaria?.name
//
// returns:
//
// "Maria"
//
// If it doesn't exist:
//
// undefined
//
// without throwing an error.

console.log(
  "4 find():",
  findMaria?.name
);

// Result:
//
// Maria


// ============================================================
// 5. findIndex()
// ============================================================

// findIndex() returns the INDEX
// of the first matching element.
//
// Array indexes:
//
// 0 -> Sammit
// 1 -> John
// 2 -> Maria
// 3 -> David
//
// Therefore Maria has index 2.

const findIndexMaria = users.findIndex(
  (u) => u.name === "Maria"
);

console.log(
  "5 findIndex():",
  findIndexMaria
);

// Result:
//
// 2
//
// If no element matches:
// -1


// ============================================================
// 6. some()
// ============================================================

// some() checks whether AT LEAST ONE
// element satisfies the condition.
//
// Question:
//
// "Does at least one user have active === false?"
//
// John -> false
// David -> false
//
// Therefore:
//
// true

const hasInactive = users.some(
  (u) => !u.active
);

console.log(
  "6 some():",
  hasInactive
);

// Result:
//
// true


// ============================================================
// 7. every()
// ============================================================

// every() checks whether ALL elements
// satisfy the condition.
//
// Question:
//
// "Is every user at least 18 years old?"
//
// Ages:
//
// 39
// 28
// 32
// 25
//
// All are >= 18.
//
// Result:
//
// true

const allAdults = users.every(
  (u) => u.age >= 18
);

console.log(
  "7 every():",
  allAdults
);

// Result:
//
// true


// ============================================================
// LEVEL 2
// INTERMEDIATE ARRAY METHODS
// ============================================================

section("LEVEL 2");


// ============================================================
// 8. sort()
// ============================================================

// First map() extracts only the ages:
//
// [39, 28, 32, 25]
//
// Then sort() sorts the numbers.
//
// IMPORTANT:
//
// JavaScript's default sort()
// sorts values as strings.
//
// For numbers we use:
//
// (a, b) => a - b
//
// Result:
//
// [25, 28, 32, 39]

const sortedAges = users
  .map((u) => u.age)
  .sort((a, b) => a - b);

console.log(
  "8 sort():",
  sortedAges
);


// ============================================================
// 9. reverse()
// ============================================================

// reverse() reverses an array.
//
// Example:
//
// ["A", "B", "C"]
//
// becomes:
//
// ["C", "B", "A"]
//
// IMPORTANT:
//
// reverse() MUTATES the original array.
//
// Therefore:
//
// [...names]
//
// creates a copy first.
//
// We reverse the copy instead of names itself.

const reversedNames = [
  ...names
].reverse();

console.log(
  "9 reverse():",
  reversedNames
);

// Result:
//
// ["David", "Maria", "John", "Sammit"]


// ============================================================
// 10. reduce()
// ============================================================

// reduce() reduces an array
// into ONE final value.
//
// Here we calculate total age.
//
// 39 + 28 + 32 + 25
//
// = 124
//
// sum = accumulator
// u   = current user
//
// 0 = initial value

const totalAge = users.reduce(
  (sum, u) => sum + u.age,
  0
);

console.log(
  "10 reduce():",
  totalAge
);

// Result:
//
// 124


// ============================================================
// 11. Set
// ============================================================

// Set stores UNIQUE values.
//
// First flatMap() gets all skills:
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
// Result:
//
// [
//   "Angular",
//   "TypeScript",
//   "React",
//   "JavaScript",
//   "RxJS",
//   "Vue"
// ]

const uniqueSkills = [
  ...new Set(
    users.flatMap((u) => u.skills)
  )
];

console.log(
  "11 Set():",
  uniqueSkills
);


// ============================================================
// 12. Find duplicate values
// ============================================================

// Input:
//
// ["a", "b", "b", "c", "a"]
//
// Expected duplicates:
//
// ["b", "a"]


// filter() receives three arguments:
//
// value -> current value
// index -> current index
// arr   -> original array
//
// Example for the second "b":
//
// value = "b"
// index = 2
//
// arr.indexOf("b") = 1
//
// 1 !== 2
//
// Therefore "b" is a duplicate.

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

// Result:
//
// ["b", "a"]


// ============================================================
// 13. Frequency / Count
// ============================================================

// We want to count how many times
// each value appears.
//
// Input:
//
// ["a", "b", "b", "c", "a"]
//
// Expected:
//
// {
//   a: 2,
//   b: 2,
//   c: 1
// }


// reduce() is ideal for this.
//
// acc = accumulator object
// v   = current value

const frequency = arrDup.reduce(
  (acc, v) => {

    // If acc[v] doesn't exist,
    // use 0 as the starting value.
    //
    // Then add 1.

    acc[v] =
      (acc[v] || 0) + 1;

    // Return accumulator
    // for the next iteration.

    return acc;

  },
  {}
);

console.log(
  "13 frequency/count:",
  frequency
);

// Result:
//
// {
//   a: 2,
//   b: 2,
//   c: 1
// }


// ============================================================
// 14. flat()
// ============================================================

// flat() removes nested arrays.
//
// Input:
//
// [
//   1,
//   [2, 3],
//   [4, 5]
// ]
//
// flat() removes one level.
//
// Result:
//
// [
//   1,
//   2,
//   3,
//   4,
//   5
// ]

const nested = [
  1,
  [2, 3],
  [4, 5]
];

console.log(
  "14 flat():",
  nested.flat()
);


// ============================================================
// 15. flatMap()
// ============================================================

// flatMap() combines:
//
// map()
// +
// flat(1)
//
// Each user contains a skills array.
//
// map() alone would produce:
//
// [
//   ["Angular", "TypeScript"],
//   ["React", "JavaScript"],
//   ["Angular", "RxJS"],
//   ["Vue", "JavaScript"]
// ]
//
// flatMap() produces one flat array:
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

const allSkills = users.flatMap(
  (u) => u.skills
);

console.log(
  "15 flatMap():",
  allSkills
);


// ============================================================
// LEVEL 3
// ARRAY COMPARISON / SET OPERATIONS
// ============================================================

section("LEVEL 3");


// ============================================================
// 16. Compare arrays ignoring order
// ============================================================

// We want:
//
// ["sa", "m", "mit"]
//
// and:
//
// ["mit", "sa", "m"]
//
// to be considered equal.
//
// Order does NOT matter.
//
// Strategy:
//
// 1. Compare lengths.
// 2. Copy both arrays.
// 3. Sort both arrays.
// 4. Compare every element.

function compareArraysSorted(arr1, arr2) {

  // Different lengths mean they cannot
  // contain exactly the same elements.

  if (arr1.length !== arr2.length) {
    return false;
  }


  // Copy arrays before sorting.
  //
  // sort() mutates the array.

  const s1 = [...arr1].sort();

  const s2 = [...arr2].sort();


  // Compare every value at the same index.

  return s1.every(
    (value, index) =>
      value === s2[index]
  );
}


// ============================================================
// 17. Compare arrays including duplicates
// ============================================================

// This is more strict than #16.
//
// Example:
//
// nod3:
//
// ["sa", "m", "m"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// Unique values are the same:
//
// sa
// m
//
// But the counts are different.
//
// nod3:
//
// sa -> 1
// m  -> 2
//
// nod4:
//
// sa -> 2
// m  -> 1
//
// Therefore:
//
// false

function compareArrayDuplicates(arr1, arr2) {

  // Helper function that creates
  // a frequency object.

  const count = (arr) => {

    return arr.reduce(
      (acc, item) => {

        // Increase the count
        // for the current item.

        acc[item] =
          (acc[item] || 0) + 1;

        return acc;

      },
      {}
    );
  };


  // Convert both arrays to frequency objects
  // and compare them.

  return JSON.stringify(
    count(arr1)
  ) === JSON.stringify(
    count(arr2)
  );
}


// ============================================================
// 18. Common values
// ============================================================

// Common values means:
//
// "Values that exist in BOTH arrays."
//
// Example:
//
// ["a", "b", "c"]
// ["b", "c", "d"]
//
// Result:
//
// ["b", "c"]

function commonValues(arr1, arr2) {

  return [
    ...new Set(

      // Keep values from arr1
      // that also exist in arr2.

      arr1.filter(
        (x) => arr2.includes(x)
      )
    )
  ];
}


// ============================================================
// 19. Missing values
// ============================================================

// Find values that exist in fromArr
// but do NOT exist in checkArr.
//
// Example:
//
// fromArr:
//
// ["a", "b", "c"]
//
// checkArr:
//
// ["a", "b"]
//
// Result:
//
// ["c"]

function missingValues(
  fromArr,
  checkArr
) {

  return fromArr.filter(
    (x) => !checkArr.includes(x)
  );
}


// ============================================================
// 20. Union
// ============================================================

// Union means:
//
// "All unique values from both arrays."
//
// Example:
//
// ["a", "b"]
// ["b", "c"]
//
// Result:
//
// ["a", "b", "c"]
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


// ============================================================
// 21. Intersection
// ============================================================

// Intersection means:
//
// "Values that exist in BOTH arrays."
//
// Example:
//
// ["a", "b", "c"]
// ["b", "c", "d"]
//
// Result:
//
// ["b", "c"]

function intersection(arr1, arr2) {

  // Remove duplicates from arr1.

  return [
    ...new Set(arr1)

  ].filter(

    // Keep only values that
    // also exist in arr2.

    (x) => arr2.includes(x)
  );
}


// ============================================================
// 22. Difference
// ============================================================

// Difference means:
//
// "Values in arr1
//  that are NOT in arr2."
//
// Example:
//
// arr1 = ["a", "b", "c"]
// arr2 = ["a", "b"]
//
// Result:
//
// ["c"]

function difference(arr1, arr2) {

  return arr1.filter(
    (x) => !arr2.includes(x)
  );
}


// ============================================================
// RUN LEVEL 3 EXAMPLES
// ============================================================


// ============================================================
// 16. Compare arrays
// ============================================================

// nod1:
//
// ["sa", "m", "mit"]
//
// nod2:
//
// ["mit", "sa", "m"]
//
// Same values.
// Different order.
//
// Result:
//
// true

console.log(
  "16 Compare arrays:",
  compareArraysSorted(nod1, nod2)
);


// ============================================================
// 17. Compare duplicates
// ============================================================

// nod3:
//
// ["sa", "m", "m"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// The values have different frequencies.
//
// Result:
//
// false

console.log(
  "17 Compare duplicates:",
  compareArrayDuplicates(nod3, nod4)
);


// ============================================================
// 18. Common values
// ============================================================

// Values existing in both arrays.
//
// nod1:
//
// ["sa", "m", "mit"]
//
// nod2:
//
// ["mit", "sa", "m"]
//
// Result:
//
// ["sa", "m", "mit"]

console.log(
  "18 Common values:",
  commonValues(nod1, nod2)
);


// ============================================================
// 19. Missing values
// ============================================================

// Find values in nod1
// that do NOT exist in nod2.
//
// Both arrays have the same values.
//
// Result:
//
// []

console.log(
  "19 Missing values (nod1 vs nod2):",
  missingValues(nod1, nod2)
);


// ============================================================
// 20. Union
// ============================================================

// Combine nod1 and nod4.
//
// nod1:
//
// ["sa", "m", "mit"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// Remove duplicates.
//
// Result:
//
// ["sa", "m", "mit"]

console.log(
  "20 Union:",
  union(nod1, nod4)
);


// ============================================================
// 21. Intersection
// ============================================================

// Find values existing in both nod1 and nod2.
//
// Result:
//
// ["sa", "m", "mit"]

console.log(
  "21 Intersection:",
  intersection(nod1, nod2)
);


// ============================================================
// 22. Difference
// ============================================================

// Find values in nod4
// that are NOT in nod1.
//
// nod4:
//
// ["m", "sa", "sa"]
//
// nod1:
//
// ["sa", "m", "mit"]
//
// Every value in nod4 exists in nod1.
//
// Result:
//
// []

console.log(
  "22 Difference (nod4 - nod1):",
  difference(nod4, nod1)
);


// ============================================================
// LEVEL 4 - BONUS
// MODERN JAVASCRIPT ARRAY METHODS
// ============================================================

section("LEVEL 4 (BONUS)");


// ============================================================
// 23. toSorted()
// ============================================================

// toSorted() is a modern alternative to sort().
//
// IMPORTANT:
//
// sort() mutates the original array.
//
// toSorted() DOES NOT mutate the original array.
//
// Original:
//
// [30, 10, 20]
//
// Sorted copy:
//
// [10, 20, 30]
//
// Original remains:
//
// [30, 10, 20]

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


// ============================================================
// 24. toReversed()
// ============================================================

// toReversed() is the non-mutating
// alternative to reverse().
//
// reverse():
//
// modifies the original array.
//
// toReversed():
//
// creates a new reversed array.
//
// Original:
//
// [30, 10, 20]
//
// New:
//
// [20, 10, 30]
//
// Original remains unchanged.

console.log(
  "24 toReversed():",
  baseNums.toReversed(),
  "original:",
  baseNums
);


// ============================================================
// 25. toSpliced()
// ============================================================

// toSpliced() is the non-mutating
// alternative to splice().
//
// Syntax:
//
// toSpliced(start, deleteCount, item)
//
// Here:
//
// baseNums.toSpliced(1, 1, 99)
//
// means:
//
// start at index 1
// remove 1 element
// insert 99
//
// Original:
//
// [30, 10, 20]
//
// New:
//
// [30, 99, 20]
//
// Original remains:
//
// [30, 10, 20]

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


// ============================================================
// 26. with()
// ============================================================

// with() creates a new array
// with one element replaced.
//
// Example:
//
// [30, 10, 20]
//
// with(1, 99)
//
// means:
//
// replace index 1 with 99.
//
// New array:
//
// [30, 99, 20]
//
// Original remains unchanged.

console.log(
  "26 with(1,99):",
  baseNums.with(1, 99),
  "original:",
  baseNums
);


// ============================================================
// 27 & 28. findLast()
//          findLastIndex()
// ============================================================

// findLast() searches from the END
// of the array.
//
// find() searches from the beginning.
//
// Our active users:
//
// Sammit -> active
// Maria  -> active
//
// Maria is the LAST active user.
//
// Therefore findLast() returns Maria.

const lastActive = users.findLast(
  (u) => u.active
);


// findLastIndex() returns the index
// of the last matching element.
//
// Maria has index 2.

const lastActiveIndex = users.findLastIndex(
  (u) => u.active
);

console.log(
  "27 findLast active:",
  lastActive?.name
);

console.log(
  "28 findLastIndex active:",
  lastActiveIndex
);

// Results:
//
// Maria
// 2


// ============================================================
// 29. Mutation vs non-mutation
// ============================================================

// reverse() MUTATES the original array.
//
// Start:
//
// [1, 2, 3]
//
// After reverse():
//
// [3, 2, 1]

const mutA = [
  1,
  2,
  3
];

const mutB = [
  1,
  2,
  3
];


// reverse() changes mutA itself.

mutA.reverse();


// ============================================================
// 30. toReversed()
// ============================================================

// toReversed() does NOT modify mutB.
//
// mutB:
//
// [1, 2, 3]
//
// new array:
//
// [3, 2, 1]
//
// mutB remains:
//
// [1, 2, 3]

const nonMut = mutB.toReversed();

console.log(
  "29 reverse mutates original:",
  mutA
);

console.log(
  "30 toReversed keeps original:",
  mutB,
  "new:",
  nonMut
);


// ============================================================
// 31. some() SHORT-CIRCUIT
// ============================================================

// JavaScript's some() stops as soon as
// it finds a matching value.
//
// Array:
//
// [1, 2, 3, 4, 5]
//
// Condition:
//
// n > 2
//
// Check:
//
// 1 -> false
// 2 -> false
// 3 -> true
//
// Once 3 is found,
// some() STOPS.
//
// It does NOT check 4 and 5.
//
// Therefore:
//
// someChecks = 3

const shortNums = [
  1,
  2,
  3,
  4,
  5
];

let someChecks = 0;

const someResult = shortNums.some(
  (n) => {

    // Count how many elements
    // are actually checked.

    someChecks++;

    return n > 2;
  }
);


// Result:
//
// true
//
// Checks:
//
// 3

console.log(
  "31 some() short-circuit:",
  someResult,
  "checks:",
  someChecks
);


// ============================================================
// 32. every() SHORT-CIRCUIT
// ============================================================

// every() also stops as soon as
// the condition becomes false.
//
// Array:
//
// [1, 2, 3, 4, 5]
//
// Condition:
//
// n < 4
//
// Check:
//
// 1 -> true
// 2 -> true
// 3 -> true
// 4 -> false
//
// Once 4 fails,
// every() STOPS.
//
// It does NOT check 5.
//
// Therefore:
//
// everyChecks = 4

let everyChecks = 0;

const everyResult = shortNums.every(
  (n) => {

    everyChecks++;

    return n < 4;
  }
);

console.log(
  "32 every() short-circuit:",
  everyResult,
  "checks:",
  everyChecks
);

// Result:
//
// false
//
// Checks:
//
// 4


// ============================================================
// 33. COMPARE OBJECT ARRAYS BY ID
// ============================================================

// Normal array comparison does not work
// for objects based on their content.
//
// Example:
//
// { id: 1 } === { id: 1 }
//
// returns:
//
// false
//
// because they are two different object references.
//
// Therefore, if we want to compare
// object arrays by ID, we extract the IDs first.
//
// teamA:
//
// [{ id: 1 }, { id: 2 }, { id: 3 }]
//
// teamB:
//
// [{ id: 3 }, { id: 1 }, { id: 2 }]
//
// Order should not matter.

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


function compareObjectArraysById(
  arr1,
  arr2
) {

  // Different lengths means
  // they cannot contain the same IDs.

  if (arr1.length !== arr2.length) {
    return false;
  }


  // Extract IDs from the first array.
  //
  // [{id: 1}, {id: 2}, {id: 3}]
  //
  // becomes:
  //
  // [1, 2, 3]

  const ids1 = arr1
    .map((x) => x.id)
    .toSorted(
      (a, b) => a - b
    );


  // Do the same for the second array.

  const ids2 = arr2
    .map((x) => x.id)
    .toSorted(
      (a, b) => a - b
    );


  // Compare the sorted IDs.

  return ids1.every(
    (id, i) => id === ids2[i]
  );
}


console.log(
  "33 Compare object arrays by id:",
  compareObjectArraysById(
    teamA,
    teamB
  )
);

// Result:
//
// true


// ============================================================
// 34. Array.fromAsync()
// ============================================================

// Array.fromAsync() is a modern JavaScript method.
//
// It creates an array from an async iterable.
//
// This example uses an async generator:
//
// async function*
//
// The generator produces:
//
// A
// B
// C
//
// one value at a time.

async function demoFromAsync() {

  // Async generator.

  async function* source() {

    // yield produces one value.

    yield "A";

    yield "B";

    yield "C";
  }


  // Not every JavaScript runtime/version
  // may support Array.fromAsync().
  //
  // Therefore we first check whether
  // it exists.

  if (
    typeof Array.fromAsync === "function"
  ) {

    // Array.fromAsync() collects
    // the async iterable into an array.

    const result =
      await Array.fromAsync(
        source()
      );

    console.log(
      "34 Array.fromAsync:",
      result
    );

    // Result:
    //
    // ["A", "B", "C"]

  } else {

    // If the current runtime does not support it,
    // show a message instead of throwing an error.

    console.log(
      "34 Array.fromAsync: not available in this runtime"
    );
  }
}


// ============================================================
// START ASYNC DEMO
// ============================================================

// demoFromAsync() returns a Promise
// because it is an async function.
//
// void means:
// "I intentionally don't need to await
// or use the returned Promise here."

void demoFromAsync();