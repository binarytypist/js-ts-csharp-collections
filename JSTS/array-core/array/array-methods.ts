// Defines the structure/type that every user object must follow.
interface User {
  // Unique identifier of the user.
  id: number;

  // User's name.
  name: string;

  // User's age.
  age: number;

  // Whether the user is currently active.
  active: boolean;

  // List of skills belonging to the user.
  skills: string[];
}


// Creates an array containing User objects.
// User[] means every element must follow the User interface.
const users: User[] = [
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


// Helper function used to print a title before each example.
function section(title: string): void {

  // \n creates a new line before the title.
  // The title parameter contains the section name.
  console.log("\n=== " + title + " ===");
}


// Helper function used to test whether a condition is true or false.
function check(label: string, condition: boolean): void {

  // If condition is true, print PASS.
  if (condition) {
    console.log("PASS:", label);

  // Otherwise print FAIL.
  } else {
    console.log("FAIL:", label);
  }
}


// Compares two values by converting both to JSON strings.
// Useful here for comparing array contents.
function sameArray(a: unknown, b: unknown): boolean {

  // JSON.stringify([1,2]) -> "[1,2]"
  // If both arrays contain the same values in the same order,
  // their JSON strings will be equal.
  return JSON.stringify(a) === JSON.stringify(b);
}


// ============================================================
// MAP
// ============================================================

// map() creates a NEW array by transforming every element.
section("map");


// Stores a reference to the original users array.
// Both originalUsersRef and users point to the same array.
const originalUsersRef = users;


// user represents one User object during each iteration.
// user.name returns the name of the current user.
//
// Result:
// ["Sammit", "John", "Maria", "David"]
const names = users.map((user) => user.name);


// user represents one User object.
// user.age returns the age of the current user.
//
// Result:
// [39, 28, 32, 25]
const ages = users.map((user) => user.age);


// Print the new names array.
console.log("names:", names);


// Print the new ages array.
console.log("ages:", ages);


// Check that map() produced the expected names.
check(
  "map names",
  sameArray(names, ["Sammit", "John", "Maria", "David"])
);


// Check that map() produced the expected ages.
check(
  "map ages",
  sameArray(ages, [39, 28, 32, 25])
);


// map() does not replace the original users array.
// originalUsersRef === users because both variables reference
// the same original array.
check(
  "map does not replace original array",
  originalUsersRef === users
);


// names is a NEW array created by map().
// Therefore names and users are different array objects.
check(
  "map returns new array",
  names !== users
);


// Array.isArray() checks whether names is actually an array.
// names.length === 4 confirms that four names were produced.
check(
  "map result is an array",
  Array.isArray(names) && names.length === 4
);


// ============================================================
// SHALLOW COPY WITH SPREAD
// ============================================================

// Spread (...) copies the array itself,
// but it does NOT deeply copy objects inside the array.
section("shallow copy with spread");


// Defines a small object type for this example.
type SimplePerson = {
  id: number;
  name: string;
};


// Original array containing two objects.
const shallowUsers: SimplePerson[] = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" }
];


// [...shallowUsers] creates a NEW array.
//
// Important:
// The array is new,
// but the objects inside are still the same objects.
const shallowCopy = [...shallowUsers];


// The two arrays are different objects.
check(
  "spread creates new array",
  shallowCopy !== shallowUsers
);


// shallowCopy[0] and shallowUsers[0] point to the SAME object.
check(
  "spread keeps object references",
  shallowCopy[0] === shallowUsers[0]
);


// We change the name through the copied array.
//
// Because the object itself was NOT copied,
// this also changes the object inside shallowUsers.
shallowCopy[0].name = "Changed";


// The original object is now also changed.
check(
  "editing copied object affects original object",
  shallowUsers[0].name === "Changed"
);


// ============================================================
// FILTER
// ============================================================

// filter() creates a NEW array containing only elements
// for which the callback returns true.
section("filter");


// user represents each User object.
//
// user.active is either true or false.
// Only users where active === true are kept.
const activeUsers = users.filter((user) => user.active);


// user.age >= 30 is the condition.
//
// Only users whose age is 30 or greater are kept.
const adults = users.filter((user) => user.age >= 30);


// Convert the filtered User objects into their names.
console.log(
  "active users:",
  activeUsers.map((u) => u.name)
);


// Convert the adult User objects into their names.
console.log(
  "adults:",
  adults.map((u) => u.name)
);


// Expected active users:
// Sammit and Maria.
check(
  "filter active",
  sameArray(
    activeUsers.map((u) => u.name),
    ["Sammit", "Maria"]
  )
);


// Expected users age >= 30:
// Sammit and Maria.
check(
  "filter adults",
  sameArray(
    adults.map((u) => u.name),
    ["Sammit", "Maria"]
  )
);


// ============================================================
// FIND / FINDINDEX
// ============================================================

// find() returns the FIRST element matching the condition.
// findIndex() returns the INDEX of the first matching element.
section("find / findIndex");


// user represents each User.
// We search for the user whose id is 3.
//
// Maria is returned.
const userById3 = users.find((user) => user.id === 3);


// Same search, but findIndex() returns the position.
// Maria is at index 2.
const indexById3 = users.findIndex((user) => user.id === 3);


// ?. is optional chaining.
// If userById3 exists, return its name.
// Otherwise return undefined.
console.log(
  "find id=3:",
  userById3?.name
);


// Print the index.
console.log(
  "findIndex id=3:",
  indexById3
);


// Check that the found user is Maria.
check(
  "find id=3",
  userById3?.name === "Maria"
);


// Check that Maria is at index 2.
check(
  "findIndex id=3",
  indexById3 === 2
);


// ============================================================
// FINDLAST / FINDLASTINDEX
// ============================================================

// These search from RIGHT TO LEFT.
section("findLast / findLastIndex");


// Modern JavaScript provides findLast().
//
// It starts searching from the END of the array.
//
// Users:
// David  -> 25
// Maria  -> 32  <-- first match when searching backwards
// John   -> 28
// Sammit -> 39
//
// Maria is therefore returned.
const lastAgeOver25 = users.findLast(
  (user) => user.age > 25
);


// findLastIndex() works like findLast(),
// but returns the original array index.
//
// Maria is at index 2.
const lastIndexAgeOver25 = users.findLastIndex(
  (user) => user.age > 25
);


// Print the last matching user.
console.log(
  "findLast age>25:",
  lastAgeOver25?.name
);


// Print the original array index.
console.log(
  "findLastIndex age>25:",
  lastIndexAgeOver25
);


// Maria is the last user whose age is greater than 25.
check(
  "findLast age>25",
  lastAgeOver25?.name === "Maria"
);


// Maria's original array index is 2.
check(
  "findLastIndex age>25",
  lastIndexAgeOver25 === 2
);


// ============================================================
// SOME / EVERY
// ============================================================

// some() checks whether AT LEAST ONE element matches.
// every() checks whether ALL elements match.
section("some / every");


// user represents each user.
// Returns true when at least one user is older than 35.
//
// Sammit is 39, so the result is true.
const hasAgeOver35 = users.some(
  (user) => user.age > 35
);


// Returns true only when EVERY user is at least 18.
//
// All four users are adults, so result is true.
const allAdults = users.every(
  (user) => user.age >= 18
);


// Print some() result.
console.log(
  "some age>35:",
  hasAgeOver35
);


// Print every() result.
console.log(
  "every age>=18:",
  allAdults
);


// Verify some() returned true.
check(
  "some age>35",
  hasAgeOver35 === true
);


// Verify every() returned true.
check(
  "every age>=18",
  allAdults === true
);


// ============================================================
// FOREACH
// ============================================================

// forEach() runs a function once for every element.
// It is normally used for side effects.
section("forEach");


// Empty array that we will fill inside forEach().
const foreachNames: string[] = [];


// user represents each user.
//
// push() adds the user's name to foreachNames.
users.forEach((user) => {
  foreachNames.push(user.name);
});


// Print the resulting array.
console.log(
  "forEach names:",
  foreachNames
);


// Verify all names were added.
check(
  "forEach iteration",
  sameArray(
    foreachNames,
    ["Sammit", "John", "Maria", "David"]
  )
);


// ============================================================
// REDUCE / REDUCERIGHT
// ============================================================

// reduce() processes every element and builds ONE final value.
// reduceRight() does the same from RIGHT TO LEFT.
section("reduce / reduceRight");


// total is the accumulator.
// user is the current User object.
//
// Start value is 0.
//
// Iterations:
//
// 0 + 39 = 39
// 39 + 28 = 67
// 67 + 32 = 99
// 99 + 25 = 124
const totalAge = users.reduce(
  (total, user) => total + user.age,
  0
);


// result is the accumulator object.
// user is the current User.
//
// Each user is stored using its id as the key.
//
// Example:
// result[1] = Sammit
// result[2] = John
// result[3] = Maria
// result[4] = David
const usersById = users.reduce<Record<number, User>>(
  (result, user) => {

    // Store the current user under its id.
    result[user.id] = user;

    // IMPORTANT:
    // reduce() needs the accumulator returned
    // for the next iteration.
    return result;
  },
  {}
);


// reduceRight() starts from C and moves toward A.
//
// "" + C = C
// C + B = CB
// CB + A = CBA
const reverseLetters = ["A", "B", "C"].reduceRight(
  (acc, v) => acc + v,
  ""
);


// Print total age.
console.log(
  "totalAge:",
  totalAge
);


// Access user with id 3.
// That user is Maria.
console.log(
  "usersById[3]:",
  usersById[3].name
);


// Print reversed letters.
console.log(
  "reduceRight letters:",
  reverseLetters
);


// Verify total.
check(
  "reduce totalAge",
  totalAge === 124
);


// Verify object lookup.
check(
  "reduce object",
  usersById[3].name === "Maria"
);


// Verify reduceRight.
check(
  "reduceRight",
  reverseLetters === "CBA"
);


// ============================================================
// INCLUDES / INDEXOF / LASTINDEXOF / AT
// ============================================================

// These methods are useful for searching and accessing
// values in arrays.
section("includes / indexOf / lastIndexOf / at");


// Array containing duplicate value 20.
const numbers: number[] = [10, 20, 30, 20];


// includes() checks whether a value exists.
// Result: true.
console.log(
  "includes 20:",
  numbers.includes(20)
);


// indexOf() returns the FIRST matching index.
// First 20 is at index 1.
console.log(
  "indexOf 20:",
  numbers.indexOf(20)
);


// lastIndexOf() returns the LAST matching index.
// Last 20 is at index 3.
console.log(
  "lastIndexOf 20:",
  numbers.lastIndexOf(20)
);


// at(0) gets the first element.
console.log(
  "at(0):",
  numbers.at(0)
);


// at(-1) gets the last element.
// Negative indexes count from the end.
console.log(
  "at(-1):",
  numbers.at(-1)
);


// Check includes().
check(
  "includes",
  numbers.includes(20) === true
);


// Check first index.
check(
  "indexOf",
  numbers.indexOf(20) === 1
);


// Check last index.
check(
  "lastIndexOf",
  numbers.lastIndexOf(20) === 3
);


// Check last value.
check(
  "at",
  numbers.at(-1) === 20
);


// ============================================================
// SLICE / SPLICE / IMMUTABLE SPLICE
// ============================================================

// slice() does NOT modify the original array.
// splice() DOES modify the original array.
// Here immutable splice is manually created using slice + concat.
section("slice / splice / immutable splice");


// Original array.
const sliceNumbers = [10, 20, 30, 40, 50];


// slice(1,4) means:
// start at index 1
// stop BEFORE index 4
//
// Result:
// [20,30,40]
const sliced = sliceNumbers.slice(1, 4);


// Print sliced result.
console.log(
  "slice(1,4):",
  sliced
);


// Original array for splice example.
const spliceNumbers = [10, 20, 30, 40];


// splice(1,2):
//
// Start at index 1.
// Remove 2 elements.
//
// Removes 20 and 30.
//
// Original becomes:
// [10,40]
spliceNumbers.splice(1, 2);


// Print modified array.
console.log(
  "after splice(1,2):",
  spliceNumbers
);


// Original array for immutable example.
const toSplicedNumbers = [10, 20, 30, 40];


// slice(0,1) -> [10]
// slice(3)   -> [40]
// concat combines them.
//
// Result:
// [10,40]
//
// IMPORTANT:
// The original array is NOT changed.
const immutableSplice = toSplicedNumbers
  .slice(0, 1)
  .concat(toSplicedNumbers.slice(3));


// Print new array.
console.log(
  "immutable splice:",
  immutableSplice
);


// Original remains unchanged.
console.log(
  "original after immutable splice:",
  toSplicedNumbers
);


// Check slice result.
check(
  "slice",
  sameArray(sliced, [20, 30, 40])
);


// Check splice result.
check(
  "splice",
  sameArray(spliceNumbers, [10, 40])
);


// Check immutable splice result.
check(
  "immutable splice result",
  sameArray(immutableSplice, [10, 40])
);


// Check original was preserved.
check(
  "immutable splice preserves original",
  sameArray(
    toSplicedNumbers,
    [10, 20, 30, 40]
  )
);


// ============================================================
// CONCAT / SPREAD
// ============================================================

// Both concat() and spread can combine arrays.
section("concat / spread");


// First array.
const a = [1, 2];


// Second array.
const b = [3, 4];


// concat() creates a new combined array.
const concatted = a.concat(b);


// Spread creates a new array and inserts
// all elements from a and b.
const spreaded = [...a, ...b];


// Print concat result.
console.log(
  "concat:",
  concatted
);


// Print spread result.
console.log(
  "spread:",
  spreaded
);


// Check concat result.
check(
  "concat",
  sameArray(concatted, [1, 2, 3, 4])
);


// Check spread result.
check(
  "spread",
  sameArray(spreaded, [1, 2, 3, 4])
);


// ============================================================
// FLAT / FLATMAP / JOIN
// ============================================================

// flat() removes nested array levels.
// flatMap() performs map() and then flat(1).
// join() converts array elements into a string.
section("flat / flatMap / join");


// Nested array.
const values = [
  1,
  [2, 3],
  [4, 5]
];


// flat() removes one nesting level.
//
// [1,[2,3],[4,5]]
//
// becomes:
//
// [1,2,3,4,5]
const flattened = values.flat();


// For every user, return their skills array.
// flatMap() then combines all skill arrays into one array.
const allSkills = users.flatMap(
  (user) => user.skills
);


// join() converts array values into one string.
// ", " is used as the separator.
const joined = [
  "Angular",
  "TypeScript",
  "RxJS"
].join(", ");


// Print flattened array.
console.log(
  "flat:",
  flattened
);


// Print all skills.
console.log(
  "flatMap skills:",
  allSkills
);


// Print joined string.
console.log(
  "join:",
  joined
);


// Check flat result.
check(
  "flat",
  sameArray(
    flattened,
    [1, 2, 3, 4, 5]
  )
);


// Each user has two skills.
// 4 users × 2 skills = 8 skills.
check(
  "flatMap length",
  allSkills.length === 8
);


// Check join result.
check(
  "join",
  joined === "Angular, TypeScript, RxJS"
);


// ============================================================
// REVERSE / IMMUTABLE REVERSE
// ============================================================

// reverse() modifies the original array.
// Immutable reverse is simulated using slice().reverse().
section("reverse / immutable reverse");


// Original array.
const reverseNumbers = [1, 2, 3];


// reverse() changes the original array.
//
// [1,2,3] -> [3,2,1]
reverseNumbers.reverse();


// Separate original array for immutable example.
const immutableReverseSource = [1, 2, 3];


// slice() first creates a copy.
// reverse() then modifies the copy.
//
// Therefore immutableReverseSource remains unchanged.
const immutableReversed = immutableReverseSource
  .slice()
  .reverse();


// Print result of reverse().
console.log(
  "reverse mutates:",
  reverseNumbers
);


// Print immutable result.
console.log(
  "immutable reverse:",
  immutableReversed
);


// Original remains unchanged.
console.log(
  "original after immutable reverse:",
  immutableReverseSource
);


// Check reverse.
check(
  "reverse",
  sameArray(
    reverseNumbers,
    [3, 2, 1]
  )
);


// Check immutable result.
check(
  "immutable reverse",
  sameArray(
    immutableReversed,
    [3, 2, 1]
  )
);


// Check original was preserved.
check(
  "immutable reverse preserves original",
  sameArray(
    immutableReverseSource,
    [1, 2, 3]
  )
);


// ============================================================
// SORT / IMMUTABLE SORT
// ============================================================

// sort() modifies the original array.
// Here immutable sorting is simulated using slice().sort().
section("sort / immutable sort");


// Original number array.
const sortNumbers = [30, 10, 20];


// sort() normally compares values as strings.
// (x, y) => x - y forces numeric ascending order.
//
// Result:
// [10,20,30]
sortNumbers.sort(
  (x, y) => x - y
);


// users.slice() creates a new array first.
// sort() then modifies the COPY,
// not the original users array.
//
// x and y represent two User objects being compared.
// x.age - y.age sorts by age ascending.
const sortedUsersByAge = users
  .slice()
  .sort(
    (x, y) => x.age - y.age
  );


// Print sorted numbers.
console.log(
  "sort mutates:",
  sortNumbers
);


// Convert sorted users into readable strings.
//
// u represents one User.
// u.name -> user name.
// u.age -> user age.
//
// Example:
// "David(25)"
console.log(
  "immutable sort users by age:",
  sortedUsersByAge.map(
    (u) => u.name + "(" + u.age + ")"
  )
);


// Check number sorting.
check(
  "sort",
  sameArray(
    sortNumbers,
    [10, 20, 30]
  )
);


// Check user sorting.
//
// Age order:
// David 25 -> id 4
// John 28  -> id 2
// Maria 32 -> id 3
// Sammit 39 -> id 1
check(
  "immutable sort",
  sameArray(
    sortedUsersByAge.map((u) => u.id),
    [4, 2, 3, 1]
  )
);


// ============================================================
// WITH
// ============================================================

// Array.prototype.with() replaces one element
// without changing the original array.
//
// Here we simulate it using slice() + concat().
section("with");


// Original array.
const withNumbers = [10, 20, 30];


// slice(0,1) -> [10]
// [99] -> replacement value
// slice(2) -> [30]
//
// Combined:
// [10,99,30]
const withResult = withNumbers
  .slice(0, 1)
  .concat(
    [99],
    withNumbers.slice(2)
  );


// Print new array.
console.log(
  "with(1,99):",
  withResult
);


// Print original array.
console.log(
  "original:",
  withNumbers
);


// Check replacement.
check(
  "with result",
  sameArray(
    withResult,
    [10, 99, 30]
  )
);


// Check original remains unchanged.
check(
  "with immutable",
  sameArray(
    withNumbers,
    [10, 20, 30]
  )
);


// ============================================================
// PUSH / POP / SHIFT / UNSHIFT
// ============================================================

// These methods MODIFY the original array.
section("push / pop / shift / unshift");


// Initial queue.
const queue = [2, 3];


// unshift() adds an element at the beginning.
//
// [2,3] -> [1,2,3]
queue.unshift(1);


// push() adds an element at the end.
//
// [1,2,3] -> [1,2,3,4]
queue.push(4);


// pop() removes and returns the LAST element.
//
// Returns 4.
// queue becomes [1,2,3].
const popped = queue.pop();


// shift() removes and returns the FIRST element.
//
// Returns 1.
// queue becomes [2,3].
const shifted = queue.shift();


// Print removed values and remaining array.
console.log(
  "popped:",
  popped,
  "shifted:",
  shifted,
  "remaining:",
  queue
);


// Verify all four operations.
check(
  "push/pop/shift/unshift",
  popped === 4 &&
  shifted === 1 &&
  sameArray(queue, [2, 3])
);


// ============================================================
// FILL / COPYWITHIN
// ============================================================

// Both fill() and copyWithin() modify the original array.
section("fill / copyWithin");


// Original array.
const fillNumbers = [1, 2, 3, 4, 5];


// fill(value, start, end)
//
// Start at index 1.
// Stop BEFORE index 4.
//
// Indexes 1,2,3 become 0.
//
// [1,2,3,4,5]
// [1,0,0,0,5]
fillNumbers.fill(0, 1, 4);


// Original array for copyWithin().
const copyWithinNumbers = [1, 2, 3, 4, 5];


// copyWithin(target, start)
//
// Copy values starting at index 3
// and place them starting at index 0.
//
// Source:
// [4,5]
//
// Result:
// [4,5,3,4,5]
copyWithinNumbers.copyWithin(0, 3);


// Print fill result.
console.log(
  "fill:",
  fillNumbers
);


// Print copyWithin result.
console.log(
  "copyWithin:",
  copyWithinNumbers
);


// Check fill.
check(
  "fill",
  sameArray(
    fillNumbers,
    [1, 0, 0, 0, 5]
  )
);


// Check copyWithin.
check(
  "copyWithin",
  sameArray(
    copyWithinNumbers,
    [4, 5, 3, 4, 5]
  )
);


// ============================================================
// ENTRIES / KEYS / VALUES
// ============================================================

// These methods return iterators.
section("entries / keys / values");


// entries() returns [index, value] pairs.
//
// [
//   [0,"Sammit"],
//   [1,"John"],
//   [2,"Maria"]
// ]
//
// [...iterator] converts the iterator into an array.
const entryList = [
  ..."Sammit,John,Maria".split(",").entries()
];


// keys() returns indexes.
//
// users.keys()
// -> 0,1,2,3
//
// Spread converts iterator into an array.
const keyList = [
  ...users.keys()
];


// values() returns the actual User objects.
//
// Then map() extracts only their names.
const valueList = [
  ...users.values()
].map((u) => u.name);


// Print entries.
console.log(
  "entries:",
  entryList
);


// Print indexes.
console.log(
  "keys:",
  keyList
);


// Print names from values.
console.log(
  "values:",
  valueList
);


// Check entries.
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


// Check indexes.
check(
  "keys",
  sameArray(
    keyList,
    [0, 1, 2, 3]
  )
);


// Check names.
check(
  "values",
  sameArray(
    valueList,
    ["Sammit", "John", "Maria", "David"]
  )
);


// ============================================================
// ARRAY STATIC METHODS
// ============================================================

// Static methods are called directly on Array,
// not on an array instance.
section("Array static methods");


// Array.from() converts an iterable/string-like value
// into an actual array.
//
// "Angular"
// becomes:
// ["A","n","g","u","l","a","r"]
const fromWord = Array.from("Angular");


// Array.from() can also create an array from
// an array-like object.
//
// length: 5
// i starts at 0.
//
// Result:
// [1,2,3,4,5]
const fromLen = Array.from(
  { length: 5 },
  (_, i) => i + 1
);


// Array.of() creates an array from the supplied arguments.
const ofList = Array.of(1, 2, 3);


// Array.isArray() checks whether users is an array.
console.log(
  "Array.isArray(users):",
  Array.isArray(users)
);


// Print Array.from result.
console.log(
  "Array.from:",
  fromWord
);


// Print generated array.
console.log(
  "Array.from length:",
  fromLen
);


// Print Array.of result.
console.log(
  "Array.of:",
  ofList
);


// Verify users is an array.
check(
  "Array.isArray",
  Array.isArray(users) === true
);


// Verify Array.from string conversion.
check(
  "Array.from",
  sameArray(
    fromWord,
    ["A", "n", "g", "u", "l", "a", "r"]
  )
);


// Verify Array.of().
check(
  "Array.of",
  sameArray(
    ofList,
    [1, 2, 3]
  )
);


// ============================================================
// FOR...OF
// ============================================================

// for...of loops through array VALUES.
// Unlike for...in, which gives indexes,
// for...of gives the actual elements.
section("for...of with break");


// Empty array to collect names.
const seenNames: string[] = [];


// user is the current User object.
for (const user of users) {

  // When we reach Maria (id 3),
  // break immediately stops the loop.
  if (user.id === 3) {
    break;
  }

  // Add current user's name.
  seenNames.push(user.name);
}


// Only Sammit and John were processed
// because the loop stopped before Maria.
console.log(
  "seen before break:",
  seenNames
);


// Check result.
check(
  "for...of break",
  sameArray(
    seenNames,
    ["Sammit", "John"]
  )
);


// ============================================================
// ARRAY.FROMASYNC
// ============================================================

// Array.fromAsync() converts an async iterable
// into a Promise containing an array.
section("Array.fromAsync");


// async function allows us to use await inside it.
async function demoFromAsync(): Promise<void> {

  // async generator produces values asynchronously.
  //
  // Each yield produces one value.
  async function* source(): AsyncGenerator<
    number,
    void,
    unknown
  > {

    // Produce 1.
    yield 1;

    // Produce 2.
    yield 2;

    // Produce 3.
    yield 3;
  }


  // We access Array.fromAsync dynamically.
  //
  // The ? means fromAsync may not exist
  // in older JavaScript runtimes.
  const fromAsync = (
    Array as ArrayConstructor & {
      fromAsync?: <T>(
        items:
          | AsyncIterable<T>
          | Iterable<T | PromiseLike<T>>
      ) => Promise<T[]>;
    }
  ).fromAsync;


  // Check whether this runtime supports Array.fromAsync().
  if (fromAsync) {

    // await waits for the Promise returned by fromAsync().
    //
    // source() produces:
    // 1
    // 2
    // 3
    //
    // Result:
    // [1,2,3]
    const asyncValues = await fromAsync(source());


    // Print the resulting array.
    console.log(
      "Array.fromAsync:",
      asyncValues
    );


    // Verify the result.
    check(
      "Array.fromAsync",
      sameArray(
        asyncValues,
        [1, 2, 3]
      )
    );

  } else {

    // This executes if the current JavaScript runtime
    // does not support Array.fromAsync().
    console.log(
      "Array.fromAsync is not available in this runtime."
    );
  }
}


// Call the async function.
//
// void means we intentionally ignore the returned Promise.
void demoFromAsync();