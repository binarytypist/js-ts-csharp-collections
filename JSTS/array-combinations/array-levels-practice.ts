
// ------------------------------------------------------------
// export {}
// ------------------------------------------------------------
// This makes this TypeScript file a module.
//
// It is not related to the array examples.
// It simply prevents this file from being treated as
// a global script by TypeScript.
//
// You can leave it here.
export {};


// ------------------------------------------------------------
// INTERFACE
// ------------------------------------------------------------

// interface defines the structure that every User object
// must follow.
//
// Every user MUST have:
// id       -> number
// name     -> string
// age      -> number
// active   -> boolean
// skills   -> array of strings

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
  skills: string[];
}


// ------------------------------------------------------------
// USERS ARRAY
// ------------------------------------------------------------

// User[] means:
//
// "users must be an array of User objects"
//
// Therefore TypeScript checks that every object has:
//
// id
// name
// age
// active
// skills

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


// ------------------------------------------------------------
// ARRAYS FOR ARRAY COMPARISON
// ------------------------------------------------------------

// nod1 contains:
//
// "sa"
// "m"
// "mit"

const nod1 = ["sa", "m", "mit"];


// nod2 contains the SAME values,
// but in a DIFFERENT order.
//
// nod1:
// ["sa", "m", "mit"]
//
// nod2:
// ["mit", "sa", "m"]
//
// Useful for testing:
// "Are these arrays equal if order does not matter?"

const nod2 = ["mit", "sa", "m"];


// nod3 contains:
//
// sa -> 1 time
// m  -> 2 times

const nod3 = ["sa", "m", "m"];


// nod4 contains:
//
// m  -> 1 time
// sa -> 2 times
//
// The unique values are the same as nod3,
// but the number of duplicates is different.

const nod4 = ["m", "sa", "sa"];


// ------------------------------------------------------------
// SECTION FUNCTION
// ------------------------------------------------------------

// This function prints a nice heading.

//
// title: string
//
// means the function expects a string.
//
// : void
//
// means this function does not return a value.

function section(title: string): void {

  // "\n" means create a new line first.
  //
  // Example:
  //
  // console.log("\nLEVEL 1");
  //
  // creates an empty line before LEVEL 1.

  console.log("\n" + title);


  // title.length gives the number of characters.
  //
  // Example:
  //
  // "LEVEL 1".length
  //
  // = 7
  //
  // "-".repeat(7)
  //
  // = "-------"

  console.log("-".repeat(title.length));
}


// ============================================================
// LEVEL 1
// BASIC ARRAY METHODS
// ============================================================

section("LEVEL 1");


// ------------------------------------------------------------
// 1. includes()
// ------------------------------------------------------------

// includes() checks whether a value exists
// inside an array.
//
// Array:
//
// ["Angular", "React"]
//
// We ask:
//
// "Does Angular exist?"
//
// Yes.
//
// Result:
//
// true

console.log(
  "1 includes():",
  ["Angular", "React"].includes("Angular")
);


// ------------------------------------------------------------
// 2. filter()
// ------------------------------------------------------------

// filter() creates a NEW array.
//
// It keeps only elements where the callback
// returns true.
//
// u means:
//
// "current user"
//
// For every user:
//
// u.active
//
// is checked.
//
// Sammit -> true  -> keep
// John   -> false -> remove
// Maria  -> true  -> keep
// David  -> false -> remove

const activeUsers = users.filter(
  (u) => u.active
);


// Now activeUsers contains:
//
// [
//   Sammit,
//   Maria
// ]
//
// We use map() to extract only their names.
//
// u = current user
// u.name = user's name

console.log(
  "2 filter():",
  activeUsers.map((u) => u.name)
);


// ------------------------------------------------------------
// 3. map()
// ------------------------------------------------------------

// map() transforms every element.
//
// Original:
//
// [
//   { name: "Sammit" },
//   { name: "John" },
//   { name: "Maria" },
//   { name: "David" }
// ]
//
// We transform each user object into:
//
// user.name

const names = users.map(
  (u) => u.name
);


// Result:
//
// ["Sammit", "John", "Maria", "David"]

console.log(
  "3 map():",
  names
);


// ------------------------------------------------------------
// 4. find()
// ------------------------------------------------------------

// find() returns the FIRST element
// that matches the condition.
//
// u = current user
//
// We check:
//
// u.name === "Maria"

const findMaria = users.find(
  (u) => u.name === "Maria"
);


// findMaria is:
//
// {
//   id: 3,
//   name: "Maria",
//   age: 32,
//   ...
// }


// ?. is optional chaining.
//
// findMaria?.name
//
// means:
//
// "If findMaria exists, give me name."
//
// If findMaria is undefined,
// the result is undefined instead of an error.

console.log(
  "4 find():",
  findMaria?.name
);


// ------------------------------------------------------------
// 5. findIndex()
// ------------------------------------------------------------

// findIndex() works like find(),
// but instead of returning the object,
// it returns its array index.
//
// Array:
//
// index 0 -> Sammit
// index 1 -> John
// index 2 -> Maria
// index 3 -> David

const findIndexMaria = users.findIndex(
  (u) => u.name === "Maria"
);


// Maria is at index 2.

console.log(
  "5 findIndex():",
  findIndexMaria
);


// If nothing is found:
//
// findIndex() returns:
//
// -1


// ------------------------------------------------------------
// 6. some()
// ------------------------------------------------------------

// some() asks:
//
// "Does AT LEAST ONE element satisfy this condition?"
//
// !u.active means:
//
// "user is NOT active"
//
// John is inactive.
// David is inactive.
//
// Therefore some() returns true.

const hasInactive = users.some(
  (u) => !u.active
);

console.log(
  "6 some():",
  hasInactive
);


// ------------------------------------------------------------
// 7. every()
// ------------------------------------------------------------

// every() asks:
//
// "Do ALL elements satisfy this condition?"
//
// We check:
//
// u.age >= 18
//
// Ages:
//
// Sammit -> 39 -> true
// John   -> 28 -> true
// Maria  -> 32 -> true
// David  -> 25 -> true
//
// Therefore:
//
// true

const allAdults = users.every(
  (u) => u.age >= 18
);

console.log(
  "7 every():",
  allAdults
);


// ============================================================
// LEVEL 2
// INTERMEDIATE ARRAY METHODS
// ============================================================

section("LEVEL 2");


// ------------------------------------------------------------
// 8. sort()
// ------------------------------------------------------------

// First map() extracts only ages.
//
// users:
// [
//   Sammit,
//   John,
//   Maria,
//   David
// ]
//
// becomes:
//
// [39, 28, 32, 25]

const sortedAges = users
  .map((u) => u.age)

  // sort() sorts the numbers.
  //
  // a and b represent two numbers
  // being compared.
  //
  // a - b:
  //
  // negative -> a comes before b
  // positive -> b comes before a
  // zero     -> same position

  .sort((a, b) => a - b);


// Result:
//
// [25, 28, 32, 39]

console.log(
  "8 sort():",
  sortedAges
);


// ------------------------------------------------------------
// 9. reverse()
// ------------------------------------------------------------

// names:
//
// ["Sammit", "John", "Maria", "David"]
//
// [...names]
//
// creates a COPY.
//
// Why?
//
// Because reverse() changes the original array.
//
// [...names] uses the spread operator.
//
// It means:
//
// "take all values from names
// and put them into a new array."

const reversedNames = [
  ...names
].reverse();


// Result:
//
// ["David", "Maria", "John", "Sammit"]

console.log(
  "9 reverse():",
  reversedNames
);


// ------------------------------------------------------------
// 10. reduce()
// ------------------------------------------------------------

// reduce() combines all array elements
// into ONE final value.
//
// Here we calculate total age.
//
// sum = accumulator
// u   = current user
//
// Initial value = 0
//
// First:
//
// 0 + 39 = 39
//
// Then:
//
// 39 + 28 = 67
//
// Then:
//
// 67 + 32 = 99
//
// Then:
//
// 99 + 25 = 124

const totalAge = users.reduce(
  (sum, u) => sum + u.age,
  0
);


console.log(
  "10 reduce():",
  totalAge
);


// ------------------------------------------------------------
// 11. Set
// ------------------------------------------------------------

// We want all unique skills.
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

const uniqueSkills = [

  // new Set(...) removes duplicates.

  ...new Set(

    // flatMap() gets skills from every user
    // and creates one flat array.

    users.flatMap(
      (u) => u.skills
    )
  )
];


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

console.log(
  "11 Set():",
  uniqueSkills
);


// ------------------------------------------------------------
// 12. Find duplicates
// ------------------------------------------------------------

// Input:
//
// ["a", "b", "b", "c", "a"]
//
// We want:
//
// ["b", "a"]

const arrDup = [
  "a",
  "b",
  "b",
  "c",
  "a"
];


const duplicates = [

  // Set removes duplicate results.

  ...new Set(

    arrDup.filter(
      (v, i, arr) =>

        // v = current value
        // i = current index
        // arr = original array
        //
        // indexOf(v) returns the FIRST position
        // where this value appears.
        //
        // If first position !== current position,
        // this is a duplicate occurrence.

        arr.indexOf(v) !== i
    )
  )
];


// Result:
//
// ["b", "a"]

console.log(
  "12 duplicates:",
  duplicates
);


// ------------------------------------------------------------
// 13. Frequency / count
// ------------------------------------------------------------

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

const frequency = arrDup.reduce<
  Record<string, number>
>(

  // acc = accumulator object
  //
  // v = current value

  (acc, v) => {

    // acc[v] means:
    //
    // "property whose name is the current value"
    //
    // If v = "a":
    //
    // acc["a"]
    //
    // If it does not exist, use 0.
    //
    // Then add 1.

    acc[v] = (acc[v] || 0) + 1;


    // Return the accumulator so it can
    // be used in the next iteration.

    return acc;
  },

  // Start with an empty object.

  {}
);


console.log(
  "13 frequency/count:",
  frequency
);


// ------------------------------------------------------------
// 14. flat()
// ------------------------------------------------------------

// nested is:
//
// [
//   1,
//   [2, 3],
//   [4, 5]
// ]
//
// flat() removes one level of nesting.
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

const nested: Array<number | number[]> = [
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

// Each user has a skills array.
//
// map() alone would give:
//
// [
//   ["Angular", "TypeScript"],
//   ["React", "JavaScript"],
//   ["Angular", "RxJS"],
//   ["Vue", "JavaScript"]
// ]
//
// flatMap() performs:
//
// map()
// +
// flat(1)
//
// So we get:
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
// ARRAY COMPARISON
// ============================================================

section("LEVEL 3");


// ------------------------------------------------------------
// 16. Compare arrays ignoring order
// ------------------------------------------------------------

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
// The order does NOT matter.
//
// Strategy:
//
// 1. Check length.
// 2. Copy array 1.
// 3. Copy array 2.
// 4. Sort both.
// 5. Compare values.

function compareArraysSorted(
  arr1: string[],
  arr2: string[]
): boolean {

  // If lengths are different,
  // they cannot contain exactly
  // the same number of values.

  if (arr1.length !== arr2.length) {
    return false;
  }


  // [...arr1] creates a copy.
  //
  // We copy because sort() modifies the array.

  const s1 = [...arr1].sort();

  const s2 = [...arr2].sort();


  // every() checks whether ALL positions
  // contain the same value.
  //
  // v = current value
  // i = current index

  return s1.every(
    (v, i) => v === s2[i]
  );
}


// ------------------------------------------------------------
// 17. Compare arrays including duplicates
// ------------------------------------------------------------

// This comparison is stricter.
//
// nod3:
//
// ["sa", "m", "m"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// Both have:
//
// "sa"
// "m"
//
// But the counts differ.
//
// nod3:
//
// sa = 1
// m  = 2
//
// nod4:
//
// sa = 2
// m  = 1
//
// Therefore:
//
// false

function compareArrayDuplicates(
  arr1: string[],
  arr2: string[]
): boolean {


  // Helper function.
  //
  // It converts an array into a frequency object.

  const count = (
    arr: string[]
  ): Record<string, number> =>

    arr.reduce<Record<string, number>>(
      (acc, item) => {

        // item = current value.
        //
        // Increase its count.

        acc[item] =
          (acc[item] || 0) + 1;


        return acc;
      },

      // Start with empty object.

      {}
    );


  // count(arr1) might produce:
  //
  // { sa: 1, m: 2 }
  //
  // count(arr2) might produce:
  //
  // { m: 1, sa: 2 }
  //
  // JSON.stringify() converts objects
  // into strings so we can compare them.

  return JSON.stringify(
    count(arr1)
  ) === JSON.stringify(
    count(arr2)
  );
}


// ------------------------------------------------------------
// 18. Common values
// ------------------------------------------------------------

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

function commonValues(
  arr1: string[],
  arr2: string[]
): string[] {

  return [

    // Set removes duplicates.

    ...new Set(

      // Keep values from arr1
      // that are also inside arr2.

      arr1.filter(
        (x) => arr2.includes(x)
      )
    )
  ];
}


// ------------------------------------------------------------
// 19. Missing values
// ------------------------------------------------------------

// Find values that exist in arr1
// but do NOT exist in arr2.
//
// Example:
//
// arr1 = ["a", "b", "c"]
// arr2 = ["a", "b"]
//
// Result:
//
// ["c"]

function missingValues(
  fromArr: string[],
  checkArr: string[]
): string[] {

  return fromArr.filter(

    // Keep x only when x
    // does NOT exist in checkArr.

    (x) => !checkArr.includes(x)
  );
}


// ------------------------------------------------------------
// 20. Union
// ------------------------------------------------------------

// Union means:
//
// "Combine both arrays and keep
// only unique values."
//
// Example:
//
// ["a", "b"]
// ["b", "c"]
//
// Result:
//
// ["a", "b", "c"]

function union(
  arr1: string[],
  arr2: string[]
): string[] {

  return [

    // concat() joins two arrays.

    ...new Set(
      arr1.concat(arr2)
    )
  ];
}


// ------------------------------------------------------------
// 21. Intersection
// ------------------------------------------------------------

// Intersection means:
//
// "Values that exist in BOTH arrays."

function intersection(
  arr1: string[],
  arr2: string[]
): string[] {

  return [

    // First remove duplicates from arr1.

    ...new Set(arr1)

  ].filter(

    // Keep x only if arr2 contains x.

    (x) => arr2.includes(x)
  );
}


// ------------------------------------------------------------
// 22. Difference
// ------------------------------------------------------------

// Difference means:
//
// "Values that exist in arr1
// but do NOT exist in arr2."

function difference(
  arr1: string[],
  arr2: string[]
): string[] {

  return arr1.filter(

    // Keep x only if arr2 does NOT contain x.

    (x) => !arr2.includes(x)
  );
}


// ============================================================
// RUN LEVEL 3 EXAMPLES
// ============================================================


// ------------------------------------------------------------
// 16. Compare arrays
// ------------------------------------------------------------

// nod1:
//
// ["sa", "m", "mit"]
//
// nod2:
//
// ["mit", "sa", "m"]
//
// Different order,
// same values.
//
// Result:
//
// true

console.log(
  "16 Compare arrays:",
  compareArraysSorted(
    nod1,
    nod2
  )
);


// ------------------------------------------------------------
// 17. Compare duplicates
// ------------------------------------------------------------

// nod3:
//
// ["sa", "m", "m"]
//
// nod4:
//
// ["m", "sa", "sa"]
//
// Counts are different.
//
// Result:
//
// false

console.log(
  "17 Compare duplicates:",
  compareArrayDuplicates(
    nod3,
    nod4
  )
);


// ------------------------------------------------------------
// 18. Common values
// ------------------------------------------------------------

// Both arrays contain:
//
// sa
// m
// mit
//
// Therefore all three are common.

console.log(
  "18 Common values:",
  commonValues(
    nod1,
    nod2
  )
);


// ------------------------------------------------------------
// 19. Missing values
// ------------------------------------------------------------

// Find values in nod1
// that are NOT in nod2.
//
// nod1 and nod2 contain
// exactly the same values.
//
// Therefore:
//
// []

console.log(
  "19 Missing values (nod1 vs nod2):",
  missingValues(
    nod1,
    nod2
  )
);


// ------------------------------------------------------------
// 20. Union
// ------------------------------------------------------------

// Combine:
//
// nod1:
// ["sa", "m", "mit"]
//
// nod4:
// ["m", "sa", "sa"]
//
// Then remove duplicates.
//
// Result:
//
// ["sa", "m", "mit"]

console.log(
  "20 Union:",
  union(
    nod1,
    nod4
  )
);


// ------------------------------------------------------------
// 21. Intersection
// ------------------------------------------------------------

// Values existing in BOTH nod1 and nod2.
//
// Result:
//
// ["sa", "m", "mit"]

console.log(
  "21 Intersection:",
  intersection(
    nod1,
    nod2
  )
);


// ------------------------------------------------------------
// 22. Difference
// ------------------------------------------------------------

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
// Therefore:
//
// []

console.log(
  "22 Difference (nod4 - nod1):",
  difference(
    nod4,
    nod1
  )
);


// ============================================================
// LEVEL 4
// MODERN JAVASCRIPT ARRAY METHODS
// ============================================================

section("LEVEL 4 (BONUS)");


// ------------------------------------------------------------
// 23. toSorted()
// ------------------------------------------------------------

// Normal sort():
//
// changes the original array.
//
// toSorted():
//
// creates a NEW sorted array.
//
// baseNums:
//
// [30, 10, 20]
//
// toSorted():
//
// [10, 20, 30]
//
// baseNums stays:
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


// ------------------------------------------------------------
// 24. toReversed()
// ------------------------------------------------------------

// reverse():
//
// changes the original.
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

console.log(
  "24 toReversed():",
  baseNums.toReversed(),
  "original:",
  baseNums
);


// ------------------------------------------------------------
// 25. toSpliced()
// ------------------------------------------------------------

// toSpliced() is the immutable
// alternative to splice().
//
// Syntax:
//
// toSpliced(
//   start,
//   deleteCount,
//   item
// )
//
// Here:
//
// toSpliced(1, 1, 99)
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

// with() creates a new array
// with one element replaced.
//
// with(1, 99)
//
// means:
//
// replace index 1 with 99.
//
// Original:
//
// [30, 10, 20]
//
// New:
//
// [30, 99, 20]

console.log(
  "26 with(1,99):",

  baseNums.with(
    1,
    99
  ),

  "original:",
  baseNums
);


// ------------------------------------------------------------
// 27. findLast()
// ------------------------------------------------------------

// find() searches from the START.
//
// findLast() searches from the END.
//
// Active users:
//
// Sammit -> true
// Maria  -> true
//
// The LAST active user is Maria.

const lastActive = users.findLast(
  (u) => u.active
);


// ------------------------------------------------------------
// 28. findLastIndex()
// ------------------------------------------------------------

// findLastIndex() works like findLast(),
// but returns the index instead of the object.
//
// Maria is index 2.

const lastActiveIndex =
  users.findLastIndex(
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


// ------------------------------------------------------------
// 29 & 30. Mutation vs non-mutation
// ------------------------------------------------------------

// reverse() changes the original array.

const mutA = [
  1,
  2,
  3
];


// This is another independent array.

const mutB = [
  1,
  2,
  3
];


// reverse() MUTATES mutA.
//
// Before:
//
// [1, 2, 3]
//
// After:
//
// [3, 2, 1]

mutA.reverse();


// toReversed() DOES NOT mutate mutB.
//
// mutB stays:
//
// [1, 2, 3]
//
// nonMut becomes:
//
// [3, 2, 1]

const nonMut =
  mutB.toReversed();


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

// some() stops immediately
// when it finds the first true result.
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
// Once 3 is true,
// some() stops.
//
// It never checks 4 or 5.

const shortNums = [
  1,
  2,
  3,
  4,
  5
];


// This variable counts
// how many values were checked.

let someChecks = 0;


const someResult =
  shortNums.some(
    (n) => {

      // Every time the callback runs,
      // increase the counter.

      someChecks++;


      // Return whether n is greater than 2.

      return n > 2;
    }
  );


// someResult:
//
// true
//
// someChecks:
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

// every() stops immediately
// when it finds the first false result.
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
// Once 4 is false,
// every() stops.
//
// It never checks 5.

let everyChecks = 0;


const everyResult =
  shortNums.every(
    (n) => {

      // Count how many values
      // were checked.

      everyChecks++;


      // Check whether n is less than 4.

      return n < 4;
    }
  );


// everyResult:
//
// false
//
// everyChecks:
//
// 4

console.log(
  "32 every() short-circuit:",
  everyResult,
  "checks:",
  everyChecks
);


// ============================================================
// 33. COMPARE OBJECT ARRAYS BY ID
// ============================================================

// TypeScript type for an object
// containing an id number.

type Item = {
  id: number;
};


// First team.

const teamA: Item[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];


// Second team.
//
// Same IDs,
// but different order.

const teamB: Item[] = [
  { id: 3 },
  { id: 1 },
  { id: 2 }
];


// Function compares object arrays
// by their IDs.

function compareObjectArraysById(
  arr1: Item[],
  arr2: Item[]
): boolean {


  // Different lengths mean
  // they cannot contain the same IDs.

  if (arr1.length !== arr2.length) {
    return false;
  }


  // Extract IDs from arr1.
//
// [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 }
// ]
//
// becomes:
//
// [1, 2, 3]

  const ids1 =
    arr1
      .map((x) => x.id)

      // Sort numerically.
      //
      // toSorted() does NOT modify
      // the array returned by map().

      .toSorted(
        (a, b) => a - b
      );


  // Do exactly the same
  // for arr2.

  const ids2 =
    arr2
      .map((x) => x.id)
      .toSorted(
        (a, b) => a - b
      );


  // Compare each ID.
  //
  // id = current ID
  // i  = current index

  return ids1.every(
    (id, i) =>
      id === ids2[i]
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
//
// Because both contain:
//
// 1
// 2
// 3
//
// Order does not matter.


// ============================================================
// 34. Array.fromAsync()
// ============================================================

// async function means:
//
// "This function works asynchronously
// and returns a Promise."

async function demoFromAsync(): Promise<void> {


  // async function* creates an
  // asynchronous generator.
  //
  // It can produce values
  // one at a time using yield.

  async function* source():
    AsyncGenerator<
      string,
      void,
      unknown
    > {


    // Produce "A".

    yield "A";


    // Produce "B".

    yield "B";


    // Produce "C".

    yield "C";
  }


  // Here we access Array.fromAsync
  // safely.
  //
  // The ? means fromAsync is optional
  // because some runtimes may not support it.

  const fromAsync =
    (
      Array as ArrayConstructor & {

        // fromAsync is optional.

        fromAsync?: <T>(

          // It can accept an AsyncIterable
          // or a normal Iterable.

          items:
            | AsyncIterable<T>
            | Iterable<T | PromiseLike<T>>

        ) => Promise<T[]>;
      }

    ).fromAsync;


  // Check whether the current runtime
  // actually supports Array.fromAsync().

  if (fromAsync) {


    // source() produces:
    //
    // A
    // B
    // C
    //
    // Array.fromAsync() collects them
    // into a normal array.

    const result =
      await fromAsync(
        source()
      );


    // Result:
//
// ["A", "B", "C"]

    console.log(
      "34 Array.fromAsync:",
      result
    );


  } else {

    // If the JavaScript runtime
    // does not support fromAsync(),
    // we print a message instead.

    console.log(
      "34 Array.fromAsync: not available in this runtime"
    );
  }
}


// ============================================================
// START THE ASYNC FUNCTION
// ============================================================

// demoFromAsync() starts the async operation.
//
// Because it returns a Promise,
// we could normally use:
//
// await demoFromAsync();
//
// But at the top level of this file,
// we use:
//
// void demoFromAsync();
//
// void means:
//
// "I intentionally ignore
// the returned Promise."

void demoFromAsync();
