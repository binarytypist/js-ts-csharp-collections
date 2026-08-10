
// ============================================================
// USERS DATA
// ============================================================

// This array contains multiple user objects.
// Each object represents one user.
//
// Each user has:
// id      -> unique identifier
// name    -> user's name
// age     -> user's age
// active  -> whether the user is active
// skills  -> array of skills

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
// HELPER FUNCTION: section()
// ============================================================

// This function prints a section heading.
//
// Example:
//
// section("map");
//
// Output:
//
// === map ===

function section(title) {

  // \n creates a new line before the title.

  console.log("\n=== " + title + " ===");
}


// ============================================================
// HELPER FUNCTION: check()
// ============================================================

// This function checks whether a condition is true.
//
// If condition === true:
//
// PASS
//
// If condition === false:
//
// FAIL
//
// This is useful for testing our examples.

function check(label, condition) {

  if (condition) {

    // The condition is true.

    console.log("PASS:", label);

  } else {

    // The condition is false.

    console.log("FAIL:", label);
  }
}


// ============================================================
// HELPER FUNCTION: sameArray()
// ============================================================

// This function compares two arrays.
//
// JSON.stringify() converts an array into a string.
//
// Example:
//
// [1, 2, 3]
//
// becomes:
//
// "[1,2,3]"
//
// If both strings are the same,
// we consider the arrays equal.

function sameArray(a, b) {

  return JSON.stringify(a) === JSON.stringify(b);
}


// ============================================================
// 1. map()
// ============================================================

// map() creates a NEW array.
//
// It goes through every element of the original array.
//
// The callback receives the current element.
//
// Example:
//
// user = first user
//
// user.name = "Sammit"
//
// map() returns "Sammit".
//
// Then it does the same for John, Maria and David.

section("map");


// Keep a reference to the original users array.
//
// This allows us to check later whether
// map() replaced or changed the original array.

const originalUsersRef = users;


// map() extracts only the name from every user.
//
// Input:
//
// user object
//
// Output:
//
// user.name
//
// Result:
//
// ["Sammit", "John", "Maria", "David"]

const names = users.map((user) => user.name);


// map() can also extract ages.
//
// Result:
//
// [39, 28, 32, 25]

const ages = users.map((user) => user.age);


// Print the resulting arrays.

console.log("names:", names);
console.log("ages:", ages);


// Check that names are correct.

check(
  "map names",
  sameArray(
    names,
    ["Sammit", "John", "Maria", "David"]
  )
);


// Check that ages are correct.

check(
  "map ages",
  sameArray(
    ages,
    [39, 28, 32, 25]
  )
);


// map() does NOT replace the original users array.
//
// originalUsersRef and users still point
// to the same array.

check(
  "map does not replace original array",
  originalUsersRef === users
);


// names is a completely different array.
//
// Therefore:
//
// names !== users
//
// is true.

check(
  "map returns new array",
  names !== users
);


// ============================================================
// 2. SHALLOW COPY WITH SPREAD
// ============================================================

// The spread operator:
//
// [...array]
//
// creates a NEW array.
//
// However, when the array contains objects,
// the objects themselves are NOT copied.
//
// Only the array container is copied.
//
// This is called a SHALLOW COPY.

section("shallow copy with spread");


// Original array containing objects.

const shallowUsers = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" }
];


// Create a new array using spread.
//
// The array itself is new.
//
// But the objects inside are still the same objects.

const shallowCopy = [...shallowUsers];


// The arrays are different objects.

check(
  "spread creates new array",
  shallowCopy !== shallowUsers
);


// But the first object is shared.
//
// shallowCopy[0]
// and
// shallowUsers[0]
//
// point to the SAME object.

check(
  "spread keeps object references",
  shallowCopy[0] === shallowUsers[0]
);


// Change the object through shallowCopy.

shallowCopy[0].name = "Changed";


// Because both arrays reference the same object,
// the original object is also changed.

check(
  "editing copied object affects original object",
  shallowUsers[0].name === "Changed"
);


// ============================================================
// 3. filter()
// ============================================================

// filter() creates a NEW array.
//
// It keeps elements for which
// the callback returns true.
//
// Example:
//
// user.active === true
//
// -> keep user
//
// user.active === false
//
// -> remove user

section("filter");


// Keep only active users.

const activeUsers = users.filter(
  (user) => user.active
);


// Keep only users whose age is >= 30.

const adults = users.filter(
  (user) => user.age >= 30
);


// Extract names from the filtered arrays.

console.log(
  "active users:",
  activeUsers.map((u) => u.name)
);

console.log(
  "adults:",
  adults.map((u) => u.name)
);


// Active users:
//
// Sammit
// Maria

check(
  "filter active",
  sameArray(
    activeUsers.map((u) => u.name),
    ["Sammit", "Maria"]
  )
);


// Users age >= 30:
//
// Sammit
// Maria

check(
  "filter adults",
  sameArray(
    adults.map((u) => u.name),
    ["Sammit", "Maria"]
  )
);


// ============================================================
// 4. find() / findIndex()
// ============================================================

// find() searches from the beginning.
//
// It returns the FIRST element
// that satisfies the condition.
//
// findIndex() does the same search,
// but returns the INDEX.

section("find / findIndex");


// Search for user with id 3.
//
// First:
//
// id 1 -> false
// id 2 -> false
// id 3 -> true
//
// find() stops here.

const userById3 = users.find(
  (user) => user.id === 3
);


// findIndex() returns the position.
//
// Maria is at index 2.

const indexById3 = users.findIndex(
  (user) => user.id === 3
);


// ?. is optional chaining.
//
// If userById3 exists:
//
// userById3?.name
//
// returns "Maria".
//
// If it doesn't exist,
// it returns undefined instead of throwing an error.

console.log(
  "find id=3:",
  userById3?.name
);

console.log(
  "findIndex id=3:",
  indexById3
);


// Check find() result.

check(
  "find id=3",
  userById3?.name === "Maria"
);


// Check findIndex() result.

check(
  "findIndex id=3",
  indexById3 === 2
);


// ============================================================
// 5. findLast() / findLastIndex()
// ============================================================

// findLast() works like find(),
// but searches from RIGHT -> LEFT.
//
// find():
//
// LEFT -> RIGHT
//
// findLast():
//
// RIGHT -> LEFT

section("findLast / findLastIndex");


// Search from the end for age > 25.
//
// David:
//
// 25 -> false
//
// Maria:
//
// 32 -> true
//
// So Maria is returned.

const lastAgeOver25 = users.findLast(
  (user) => user.age > 25
);


// findLastIndex() returns the index
// of the last matching element.
//
// Maria is index 2.

const lastIndexAgeOver25 = users.findLastIndex(
  (user) => user.age > 25
);


console.log(
  "findLast age>25:",
  lastAgeOver25?.name
);

console.log(
  "findLastIndex age>25:",
  lastIndexAgeOver25
);


// Verify result.

check(
  "findLast age>25",
  lastAgeOver25?.name === "Maria"
);

check(
  "findLastIndex age>25",
  lastIndexAgeOver25 === 2
);


// ============================================================
// 6. some() / every()
// ============================================================

// some() asks:
//
// "Does AT LEAST ONE element satisfy the condition?"
//
// It returns true or false.
//
// every() asks:
//
// "Do ALL elements satisfy the condition?"
//
// It also returns true or false.

section("some / every");


// Is there at least one user older than 35?
//
// Sammit = 39
//
// Therefore:
//
// true

const hasAgeOver35 = users.some(
  (user) => user.age > 35
);


// Are ALL users adults?
//
// 39 >= 18 -> true
// 28 >= 18 -> true
// 32 >= 18 -> true
// 25 >= 18 -> true
//
// Therefore:
//
// true

const allAdults = users.every(
  (user) => user.age >= 18
);


console.log(
  "some age>35:",
  hasAgeOver35
);

console.log(
  "every age>=18:",
  allAdults
);


check(
  "some age>35",
  hasAgeOver35 === true
);

check(
  "every age>=18",
  allAdults === true
);


// ============================================================
// 7. forEach()
// ============================================================

// forEach() executes a function
// once for every element.
//
// IMPORTANT:
//
// forEach() does NOT create a new array.
//
// It is normally used for SIDE EFFECTS.
//
// Examples:
//
// console.log()
// updating another variable
// calling another function

section("forEach");


// Start with an empty array.

const foreachNames = [];


// Visit every user.
//
// user is the current user.
//
// push() adds the user's name
// to foreachNames.

users.forEach((user) => {

  foreachNames.push(user.name);
});


console.log(
  "forEach names:",
  foreachNames
);


// Check final result.

check(
  "forEach iteration",
  sameArray(
    foreachNames,
    ["Sammit", "John", "Maria", "David"]
  )
);


// ============================================================
// 8. reduce() / reduceRight()
// ============================================================

// reduce() processes the entire array
// and produces ONE final result.
//
// Common uses:
//
// sum
// average
// object creation
// grouping
// counting
// etc.

//
// reduceRight() works from RIGHT -> LEFT.

section("reduce / reduceRight");


// Calculate total age.
//
// Start:
//
// total = 0
//
// First user:
//
// 0 + 39 = 39
//
// Second:
//
// 39 + 28 = 67
//
// Third:
//
// 67 + 32 = 99
//
// Fourth:
//
// 99 + 25 = 124

const totalAge = users.reduce(
  (total, user) => total + user.age,
  0
);


// reduce() can also build an object.
//
// We want:
//
// {
//   1: Sammit,
//   2: John,
//   3: Maria,
//   4: David
// }

const usersById = users.reduce(
  (result, user) => {

    // Use the user's id as the object key.

    result[user.id] = user;

    // Return the accumulator
    // for the next iteration.

    return result;

  },
  {}
);


// reduceRight() starts at the right side.
//
// Array:
//
// ["A", "B", "C"]
//
// Processing:
//
// C
// B
// A
//
// Result:
//
// "CBA"

const reverseLetters = [
  "A",
  "B",
  "C"
].reduceRight(
  (acc, v) => acc + v,
  ""
);


console.log(
  "totalAge:",
  totalAge
);

console.log(
  "usersById[3]:",
  usersById[3].name
);

console.log(
  "reduceRight letters:",
  reverseLetters
);


check(
  "reduce totalAge",
  totalAge === 124
);

check(
  "reduce object",
  usersById[3].name === "Maria"
);

check(
  "reduceRight",
  reverseLetters === "CBA"
);


// ============================================================
// 9. includes() / indexOf() / lastIndexOf() / at()
// ============================================================

// These methods are useful for
// searching and accessing array elements.

section("includes / indexOf / lastIndexOf / at");


const numbers = [
  10,
  20,
  30,
  20
];


// includes() asks:
//
// "Does 20 exist?"

console.log(
  "includes 20:",
  numbers.includes(20)
);


// indexOf() returns the FIRST index
// where 20 appears.
//
// Array:
//
// index 0 -> 10
// index 1 -> 20
//
// Result:
//
// 1

console.log(
  "indexOf 20:",
  numbers.indexOf(20)
);


// lastIndexOf() returns the LAST index
// where 20 appears.
//
// 20 appears at indexes:
//
// 1
// 3
//
// Therefore:
//
// 3

console.log(
  "lastIndexOf 20:",
  numbers.lastIndexOf(20)
);


// at() accesses an element by index.

console.log(
  "at(0):",
  numbers.at(0)
);


// at() also supports negative indexes.
//
// -1 means:
//
// last element

console.log(
  "at(-1):",
  numbers.at(-1)
);


check(
  "includes",
  numbers.includes(20) === true
);

check(
  "indexOf",
  numbers.indexOf(20) === 1
);

check(
  "lastIndexOf",
  numbers.lastIndexOf(20) === 3
);

check(
  "at",
  numbers.at(-1) === 20
);


// ============================================================
// 10. slice() / splice() / toSpliced()
// ============================================================

// slice():
//
// creates a portion of an array.
//
// IMPORTANT:
//
// slice() does NOT mutate.
//
//
//
// splice():
//
// removes/adds elements.
//
// IMPORTANT:
//
// splice() MUTATES the original array.
//
//
//
// toSpliced():
//
// modern immutable version of splice().
//
// It returns a NEW array.

section("slice / splice / toSpliced");


// Original array.

const sliceNumbers = [
  10,
  20,
  30,
  40,
  50
];


// slice(1, 4)
//
// start = index 1
//
// end = index 4
//
// IMPORTANT:
//
// end index is NOT included.
//
// Therefore:
//
// index 1 -> 20
// index 2 -> 30
// index 3 -> 40
//
// Result:
//
// [20, 30, 40]

const sliced = sliceNumbers.slice(
  1,
  4
);


console.log(
  "slice(1,4):",
  sliced
);


// ============================================================
// splice()
// ============================================================


// Start with:

// [10, 20, 30, 40]

const spliceNumbers = [
  10,
  20,
  30,
  40
];


// splice(1, 2)
//
// start at index 1
//
// remove 2 elements.
//
// Remove:
//
// 20
// 30
//
// Original becomes:
//
// [10, 40]

spliceNumbers.splice(
  1,
  2
);


console.log(
  "after splice(1,2):",
  spliceNumbers
);


// ============================================================
// toSpliced()
// ============================================================


// Start with a new array.

const toSplicedNumbers = [
  10,
  20,
  30,
  40
];


// toSpliced(1, 2)
//
// starts at index 1
// removes 2 elements
//
// Result:
//
// [10, 40]
//
// BUT:
//
// toSpliced() does not modify
// toSplicedNumbers.

const immutableSplice =
  toSplicedNumbers.toSpliced(
    1,
    2
  );


console.log(
  "toSpliced(1,2):",
  immutableSplice
);


console.log(
  "original after toSpliced:",
  toSplicedNumbers
);


check(
  "slice",
  sameArray(
    sliced,
    [20, 30, 40]
  )
);

check(
  "splice",
  sameArray(
    spliceNumbers,
    [10, 40]
  )
);

check(
  "toSpliced result",
  sameArray(
    immutableSplice,
    [10, 40]
  )
);

check(
  "toSpliced immutable",
  sameArray(
    toSplicedNumbers,
    [10, 20, 30, 40]
  )
);


// ============================================================
// 11. concat() / spread
// ============================================================

// Both concat() and spread
// can combine arrays.
//
// Neither changes the original arrays.

section("concat / spread");


const a = [
  1,
  2
];

const b = [
  3,
  4
];


// concat() combines a and b.
//
// Result:
//
// [1, 2, 3, 4]

const concatted = a.concat(b);


// Spread also combines them.
//
// ...a -> 1, 2
//
// ...b -> 3, 4
//
// Result:
//
// [1, 2, 3, 4]

const spreaded = [
  ...a,
  ...b
];


console.log(
  "concat:",
  concatted
);

console.log(
  "spread:",
  spreaded
);


check(
  "concat",
  sameArray(
    concatted,
    [1, 2, 3, 4]
  )
);

check(
  "spread",
  sameArray(
    spreaded,
    [1, 2, 3, 4]
  )
);


// ============================================================
// 12. flat() / flatMap() / join()
// ============================================================

// flat() removes nested array levels.
//
// flatMap() does:
//
// map()
// +
// flat(1)
//
// join() converts array elements
// into one string.

section("flat / flatMap / join");


// Nested array.

const values = [
  1,
  [2, 3],
  [4, 5]
];


// flat() removes one level of nesting.
//
// Result:
//
// [1, 2, 3, 4, 5]

const flattened = values.flat();


// flatMap() gets skills from every user.
//
// First map-like operation:
//
// User -> skills
//
// Then flat() combines the arrays.
//
// Result:
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
  (user) => user.skills
);


// join() combines array elements
// into a single string.
//
// Separator:
//
// ", "

const joined = [
  "Angular",
  "TypeScript",
  "RxJS"
].join(", ");


console.log(
  "flat:",
  flattened
);

console.log(
  "flatMap skills:",
  allSkills
);

console.log(
  "join:",
  joined
);


check(
  "flat",
  sameArray(
    flattened,
    [1, 2, 3, 4, 5]
  )
);


check(
  "flatMap length",
  allSkills.length === 8
);


check(
  "join",
  joined === "Angular, TypeScript, RxJS"
);


// ============================================================
// 13. reverse() / toReversed()
// ============================================================

// reverse() MUTATES.
//
// toReversed() does NOT mutate.
//
// This is another example of:
//
// mutable
// vs
// immutable

section("reverse / toReversed");


// reverse() example.

const reverseNumbers = [
  1,
  2,
  3
];


// reverse() changes the original array.
//
// Before:
//
// [1, 2, 3]
//
// After:
//
// [3, 2, 1]

reverseNumbers.reverse();


// toReversed() example.

const immutableReverseSource = [
  1,
  2,
  3
];


// Creates a new reversed array.
//
// Original remains unchanged.

const immutableReversed =
  immutableReverseSource.toReversed();


console.log(
  "reverse mutates:",
  reverseNumbers
);

console.log(
  "toReversed:",
  immutableReversed
);

console.log(
  "original after toReversed:",
  immutableReverseSource
);


check(
  "reverse",
  sameArray(
    reverseNumbers,
    [3, 2, 1]
  )
);

check(
  "toReversed",
  sameArray(
    immutableReversed,
    [3, 2, 1]
  )
);

check(
  "toReversed immutable",
  sameArray(
    immutableReverseSource,
    [1, 2, 3]
  )
);


// ============================================================
// 14. sort() / toSorted()
// ============================================================

// sort() sorts the array IN PLACE.
//
// Therefore:
//
// sort() MUTATES.
//
// toSorted() returns a NEW sorted array.
//
// Therefore:
//
// toSorted() is immutable.

section("sort / toSorted");


// Numbers that need sorting.

const sortNumbers = [
  30,
  10,
  20
];


// Sort numbers from smallest to largest.
//
// x - y is used because
// JavaScript's default sort()
// treats values as strings.
//
// 10 < 20 < 30

sortNumbers.sort(
  (x, y) => x - y
);


// toSorted() sorts users by age.
//
// x.age - y.age
//
// means:
//
// smaller age first.

const sortedUsersByAge =
  users.toSorted(
    (x, y) => x.age - y.age
  );


console.log(
  "sort mutates:",
  sortNumbers
);


console.log(
  "toSorted users by age:",
  sortedUsersByAge.map(
    (u) => u.name + "(" + u.age + ")"
  )
);


check(
  "sort",
  sameArray(
    sortNumbers,
    [10, 20, 30]
  )
);


// Sorted users:
//
// David 25 -> id 4
// John  28 -> id 2
// Maria 32 -> id 3
// Sammit 39 -> id 1

check(
  "toSorted",
  sameArray(
    sortedUsersByAge.map(
      (u) => u.id
    ),
    [4, 2, 3, 1]
  )
);


// ============================================================
// 15. with()
// ============================================================

// with() replaces one element
// WITHOUT modifying the original array.
//
// Syntax:
//
// array.with(index, newValue)

section("with");


const withNumbers = [
  10,
  20,
  30
];


// Replace index 1.
//
// Index 1 currently contains 20.
//
// Replace it with 99.
//
// New array:
//
// [10, 99, 30]

const withResult =
  withNumbers.with(
    1,
    99
  );


console.log(
  "with(1,99):",
  withResult
);

console.log(
  "original:",
  withNumbers
);


check(
  "with result",
  sameArray(
    withResult,
    [10, 99, 30]
  )
);


check(
  "with immutable",
  sameArray(
    withNumbers,
    [10, 20, 30]
  )
);


// ============================================================
// 16. push() / pop() / shift() / unshift()
// ============================================================

// These methods MUTATE the original array.
//
// push():
//
// adds to END
//
// pop():
//
// removes from END
//
// shift():
//
// removes from BEGINNING
//
// unshift():
//
// adds to BEGINNING

section("push / pop / shift / unshift");


const queue = [
  2,
  3
];


// Add 1 to the beginning.
//
// [2, 3]
// becomes
// [1, 2, 3]

queue.unshift(1);


// Add 4 to the end.
//
// [1, 2, 3]
// becomes
// [1, 2, 3, 4]

queue.push(4);


// Remove last element.
//
// Removes 4.
//
// popped = 4

const popped = queue.pop();


// Remove first element.
//
// Removes 1.
//
// shifted = 1

const shifted = queue.shift();


// Remaining array:
//
// [2, 3]

console.log(
  "popped:",
  popped,
  "shifted:",
  shifted,
  "remaining:",
  queue
);


check(
  "push/pop/shift/unshift",
  popped === 4 &&
  shifted === 1 &&
  sameArray(queue, [2, 3])
);


// ============================================================
// 17. fill() / copyWithin()
// ============================================================

// fill() overwrites elements
// with a specific value.
//
// copyWithin() copies elements
// from one part of the SAME array
// to another position.
//
// Both MUTATE the original array.

section("fill / copyWithin");


// fill() example.

const fillNumbers = [
  1,
  2,
  3,
  4,
  5
];


// fill(0, 1, 4)
//
// value = 0
// start = 1
// end = 4
//
// Index 4 is excluded.
//
// Therefore indexes:
//
// 1 -> 0
// 2 -> 0
// 3 -> 0
//
// Result:
//
// [1, 0, 0, 0, 5]

fillNumbers.fill(
  0,
  1,
  4
);


// copyWithin() example.

const copyWithinNumbers = [
  1,
  2,
  3,
  4,
  5
];


// copyWithin(0, 3)
//
// target = index 0
// source = index 3
//
// Source values:
//
// index 3 -> 4
// index 4 -> 5
//
// Copy them starting at index 0.
//
// Result:
//
// [4, 5, 3, 4, 5]

copyWithinNumbers.copyWithin(
  0,
  3
);


console.log(
  "fill:",
  fillNumbers
);

console.log(
  "copyWithin:",
  copyWithinNumbers
);


check(
  "fill",
  sameArray(
    fillNumbers,
    [1, 0, 0, 0, 5]
  )
);

check(
  "copyWithin",
  sameArray(
    copyWithinNumbers,
    [4, 5, 3, 4, 5]
  )
);


// ============================================================
// 18. entries() / keys() / values()
// ============================================================

// These methods return ITERATORS.
//
// entries():
//
// gives [index, value]
//
// keys():
//
// gives indexes
//
// values():
//
// gives values

section("entries / keys / values");


// entries() returns:
//
// [index, value]
//
// Example:
//
// [0, "Sammit"]
// [1, "John"]
// [2, "Maria"]

//
// [...iterator]
//
// converts the iterator into an array.

const entryList = [
  ...[
    "Sammit",
    "John",
    "Maria"
  ].entries()
];


// keys() returns indexes:
//
// 0
// 1
// 2
// 3

const keyList = [
  ...users.keys()
];


// values() returns the user objects.
//
// map() then extracts only their names.

const valueList = [
  ...users.values()
].map(
  (u) => u.name
);


console.log(
  "entries:",
  entryList
);

console.log(
  "keys:",
  keyList
);

console.log(
  "values:",
  valueList
);


check(
  "entries",
  sameArray(
    entryList,
    [
      [0, "Sammit"],
      [1, "John"],
      [2, "Maria"]
    ]
  )
);


check(
  "keys",
  sameArray(
    keyList,
    [0, 1, 2, 3]
  )
);


check(
  "values",
  sameArray(
    valueList,
    [
      "Sammit",
      "John",
      "Maria",
      "David"
    ]
  )
);


// ============================================================
// 19. ARRAY STATIC METHODS
// ============================================================

// Static methods belong to Array itself,
// not to an individual array.
//
// Examples:
//
// Array.isArray()
// Array.from()
// Array.of()

section("Array static methods");


// Array.from() can convert an iterable
// into an array.
//
// A string is iterable.
//
// "Angular"
//
// becomes:
//
// ["A", "n", "g", "u", "l", "a", "r"]

const fromWord =
  Array.from("Angular");


// Array.from() can also create an array
// from an object containing length.
//
// { length: 5 }
//
// means:
//
// create 5 positions.
//
// The callback:
//
// (_, i) => i + 1
//
// generates:
//
// 1, 2, 3, 4, 5

const fromLen =
  Array.from(
    { length: 5 },
    (_, i) => i + 1
  );


// Array.of() creates an array
// from the supplied arguments.
//
// Array.of(1, 2, 3)
//
// becomes:
//
// [1, 2, 3]

const ofList =
  Array.of(
    1,
    2,
    3
  );


// Array.isArray() checks whether
// a value is an array.

console.log(
  "Array.isArray(users):",
  Array.isArray(users)
);

console.log(
  "Array.from:",
  fromWord
);

console.log(
  "Array.from length:",
  fromLen
);

console.log(
  "Array.of:",
  ofList
);


check(
  "Array.isArray",
  Array.isArray(users) === true
);


check(
  "Array.from",
  sameArray(
    fromWord,
    [
      "A",
      "n",
      "g",
      "u",
      "l",
      "a",
      "r"
    ]
  )
);


check(
  "Array.of",
  sameArray(
    ofList,
    [1, 2, 3]
  )
);


// ============================================================
// 20. for...of WITH break
// ============================================================

// for...of loops through array values.
//
// Unlike forEach(),
// for...of supports:
//
// break
// continue
// await
//
// Therefore it is useful when
// we need more control over the loop.

section("for...of with break");


const seenNames = [];


// Start looping through users.

for (const user of users) {

  // If we reach user id 3,
  // stop the loop immediately.

  if (user.id === 3) {
    break;
  }


  // Add the user's name
  // to the result array.

  seenNames.push(user.name);
}


// The loop stops BEFORE Maria.
//
// Therefore:
//
// ["Sammit", "John"]

console.log(
  "seen before break:",
  seenNames
);


check(
  "for...of break",
  sameArray(
    seenNames,
    ["Sammit", "John"]
  )
);


// ============================================================
// 21. Array.fromAsync()
// ============================================================

// Array.fromAsync() is used to create an array
// from an ASYNC iterable.
//
// An async iterable can produce values
// asynchronously.
//
// This is useful when values arrive from:
//
// API calls
// streams
// async generators
// etc.

section("Array.fromAsync");


// This function is async because
// we will use await inside it.

async function demoFromAsync() {


  // async generator.
  //
  // async function* means
  // the generator can produce values asynchronously.

  async function* source() {


    // yield produces the first value.

    yield 1;


    // yield produces the second value.

    yield 2;


    // yield produces the third value.

    yield 3;
  }


  // Check whether the current JavaScript runtime
  // supports Array.fromAsync().

  if (
    typeof Array.fromAsync === "function"
  ) {


    // Array.fromAsync() consumes
    // the async generator.
    //
    // The result is a Promise.
    //
    // await waits for the Promise
    // and gives us the final array.

    const asyncValues =
      await Array.fromAsync(
        source()
      );


    console.log(
      "Array.fromAsync:",
      asyncValues
    );


    check(
      "Array.fromAsync",
      sameArray(
        asyncValues,
        [1, 2, 3]
      )
    );


  } else {


    // If the current runtime does not support
    // Array.fromAsync(), print a message
    // instead of causing an error.

    console.log(
      "Array.fromAsync is not available in this runtime."
    );
  }
}


// demoFromAsync() is an async function,
// so it returns a Promise.
//
// void means:
//
// "I intentionally don't need
// to use or await this Promise here."
//
// The function itself will still execute.

void demoFromAsync();

