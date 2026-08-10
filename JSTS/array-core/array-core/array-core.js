// ============================================================
// USERS DATA
// ============================================================

// Array of user objects.
// Each user has:
// - id       -> unique identifier
// - name     -> user's name
// - age      -> user's age
// - active   -> whether the user is active
// - skills   -> array of technical skills
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
// HELPER FUNCTION
// ============================================================

// Prints a section title in the console.
//
// Example:
//
// section("filter");
//
// Output:
//
// === filter ===
function section(title) {
  console.log("\n=== " + title + " ===");
}


// ============================================================
// 1. filter()
// ============================================================

// filter() creates a NEW array containing only
// elements that satisfy the condition.
//
// Use filter() when:
// - You want multiple matching elements.
// - You want to remove elements based on a condition.
//
// Here we keep only users where active === true.
//
// Result:
// [
//   Sammit,
//   Maria
// ]
section("filter");

const activeUsers = users.filter(
  (u) => u.active
);

// map() is then used to extract only the names.
//
// Result:
// ["Sammit", "Maria"]
console.log(
  "active users:",
  activeUsers.map((u) => u.name)
);


// ============================================================
// 2. map()
// ============================================================

// map() transforms EVERY element into another value.
//
// Original:
// [
//   { id: 1, name: "Sammit", ... },
//   { id: 2, name: "John", ... },
//   ...
// ]
//
// Result:
// ["Sammit", "John", "Maria", "David"]
//
// Interview rule:
//
// filter() -> removes/selects elements
// map()    -> transforms elements
section("map");

const names = users.map(
  (u) => u.name
);

console.log(
  "names:",
  names
);


// ============================================================
// 3. find()
// ============================================================

// find() returns the FIRST element
// that satisfies the condition.
//
// Here we search for the user with id === 3.
//
// Result:
// {
//   id: 3,
//   name: "Maria",
//   ...
// }
//
// Important:
//
// find() returns ONE element.
//
// If nothing is found:
// undefined
section("find");

const id3 = users.find(
  (u) => u.id === 3
);

// ?. is optional chaining.
//
// id3?.name means:
// "If id3 exists, give me name;
//  otherwise return undefined."
console.log(
  "id=3:",
  id3?.name
);


// ============================================================
// 4. findIndex()
// ============================================================

// findIndex() returns the INDEX/POSITION
// of the FIRST matching element.
//
// Array indexes start at 0:
//
// index 0 -> Sammit
// index 1 -> John
// index 2 -> Maria
// index 3 -> David
//
// id 3 belongs to Maria,
// so the result is 2.
//
// If no element is found:
// findIndex() returns -1.
section("findIndex");

const id3Index = users.findIndex(
  (u) => u.id === 3
);

console.log(
  "id=3 index:",
  id3Index
);


// ============================================================
// 5. some()
// ============================================================

// some() checks whether AT LEAST ONE
// element satisfies the condition.
//
// It returns a boolean:
//
// true  -> at least one match
// false -> no match
//
// Here we check:
//
// Is there at least one inactive user?
//
// John and David are inactive,
// so the result is true.
section("some");

const hasInactive = users.some(
  (u) => !u.active
);

console.log(
  "has inactive:",
  hasInactive
);


// ============================================================
// 6. every()
// ============================================================

// every() checks whether ALL elements
// satisfy the condition.
//
// It returns:
//
// true  -> every element passes
// false -> at least one fails
//
// Here we check whether every user
// is at least 18 years old.
//
// All users are adults,
// so the result is true.
section("every");

const allAdults = users.every(
  (u) => u.age >= 18
);

console.log(
  "all adults:",
  allAdults
);


// ============================================================
// 7. includes()
// ============================================================

// includes() checks whether an array
// contains a specific value.
//
// It returns:
//
// true  -> value exists
// false -> value does not exist
//
// Unlike find(), includes() is useful
// when you already know the exact value
// you are looking for.
section("includes");

const skills = [
  "Angular",
  "TypeScript",
  "RxJS"
];

console.log(
  "includes Angular:",
  skills.includes("Angular")
);


// ============================================================
// 8. sort()
// ============================================================

// sort() sorts elements in an array.
//
// IMPORTANT:
//
// sort() MUTATES the original array.
//
// Here we first use map() to create
// a separate array containing only ages.
//
// [39, 28, 32, 25]
//
// Then sort() arranges them numerically.
//
// a - b means ascending order:
//
// 25, 28, 32, 39
//
// IMPORTANT INTERVIEW POINT:
//
// Without (a, b) => a - b,
// JavaScript sorts numbers as strings.
//
// Example:
//
// [10, 2, 5].sort()
//
// can produce:
//
// [10, 2, 5]
//
// Use a numeric comparator for numbers.
section("sort");

const agesSorted = users
  .map((u) => u.age)
  .sort((a, b) => a - b);

console.log(
  "ages sorted:",
  agesSorted
);


// ============================================================
// 9. reduce()
// ============================================================

// reduce() processes the entire array
// and produces ONE final value.
//
// Common uses:
//
// - total
// - sum
// - average
// - grouping
// - counting
// - creating objects
// - creating maps
//
// Here we calculate total age.
//
// Ages:
//
// 39 + 28 + 32 + 25
//
// Result:
//
// 124
section("reduce");

const totalAge = users.reduce(
  (sum, u) => {

    // Add the current user's age
    // to the accumulated total.
    return sum + u.age;

  },

  // Initial accumulator value.
  //
  // Start the total at 0.
  0
);

console.log(
  "total age:",
  totalAge
);


// ============================================================
// 10. forEach()
// ============================================================

// forEach() executes a function
// once for every element.
//
// Use forEach() mainly for SIDE EFFECTS:
//
// - console.log()
// - calling an API
// - updating something external
// - performing an action
//
// Important interview difference:
//
// map()     -> creates a NEW array
// forEach() -> does NOT create a useful result
//
// You normally don't use forEach()
// when you need to transform an array.
section("forEach");

users.forEach(
  (u) => {
    console.log(
      "user:",
      u.name
    );
  }
);


// ============================================================
// 11. flat()
// ============================================================

// flat() removes nested array levels.
//
// Example:
//
// [
//   1,
//   [2, 3],
//   [4, 5]
// ]
//
// becomes:
//
// [
//   1,
//   2,
//   3,
//   4,
//   5
// ]
//
// By default, flat() removes ONE level.
//
// You can specify the depth:
//
// array.flat(2)
// array.flat(Infinity)
section("flat");

const nested = [
  1,
  [2, 3],
  [4, 5]
];

console.log(
  "flat:",
  nested.flat()
);


// ============================================================
// 12. flatMap()
// ============================================================

// flatMap() combines:
//
// map() + flat(1)
//
// Each user has an array of skills.
//
// Example:
//
// Sammit -> ["Angular", "TypeScript"]
// John   -> ["React", "JavaScript"]
//
// flatMap() combines all skills
// into ONE array.
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
//
// Important:
//
// flatMap() only flattens ONE level.
section("flatMap");

const allSkills = users.flatMap(
  (u) => u.skills
);

console.log(
  "all skills:",
  allSkills
);


// ============================================================
// 13. slice()
// ============================================================

// slice() extracts part of an array
// WITHOUT changing the original array.
//
// Syntax:
//
// array.slice(start, end)
//
// The end index is NOT included.
//
// Example:
//
// slice(0, 2)
//
// means:
//
// index 0
// index 1
//
// but NOT index 2.
//
// Here we get the first two users.
section("slice");

const firstTwo = users
  .slice(0, 2)
  .map((u) => u.name);

console.log(
  "first two users:",
  firstTwo
);


// ============================================================
// 14. concat()
// ============================================================

// concat() combines arrays.
//
// It does NOT modify the original arrays.
//
// Example:
//
// frontend:
// ["Angular", "React"]
//
// backend:
// ["Node", "DotNet"]
//
// Result:
//
// [
//   "Angular",
//   "React",
//   "Node",
//   "DotNet"
// ]
//
// Modern alternative:
//
// [...frontend, ...backend]
section("concat");

const frontend = [
  "Angular",
  "React"
];

const backend = [
  "Node",
  "DotNet"
];

console.log(
  "all stacks:",
  frontend.concat(backend)
);


// ============================================================
// 15. Set
// ============================================================

// Set is a collection that stores
// UNIQUE values.
//
// If the array contains:
//
// [
//   "Angular",
//   "JavaScript",
//   "Angular"
// ]
//
// Set removes the duplicate "Angular".
//
// new Set(allSkills)
// -> creates a Set containing unique skills.
//
// [...new Set(allSkills)]
// -> converts the Set back into an array.
//
// This is one of the most common
// JavaScript interview patterns for
// removing duplicate primitive values.
section("Set");

const uniqueSkills = [
  ...new Set(allSkills)
];


// A Set can also be used for membership checks.
//
// has(value) returns:
//
// true  -> value exists
// false -> value does not exist
const skillSet = new Set(allSkills);

console.log(
  "unique skills:",
  uniqueSkills
);

console.log(
  "set has RxJS:",
  skillSet.has("RxJS")
);


// ============================================================
// QUICK INTERVIEW CHEAT SHEET
// ============================================================
//
// filter()
// -> Select multiple elements based on condition.
//
// map()
// -> Transform every element.
//
// find()
// -> Find the FIRST matching element.
//
// findIndex()
// -> Find the INDEX of the first match.
//
// some()
// -> Does AT LEAST ONE match?
//
// every()
// -> Do ALL elements match?
//
// includes()
// -> Does this exact value exist?
//
// sort()
// -> Sort elements.
// -> MUTATES the array.
//
// reduce()
// -> Turn an array into ONE result.
// -> Sum, count, group, etc.
//
// forEach()
// -> Perform an action for every element.
// -> Mainly side effects.
//
// flat()
// -> Remove nested array levels.
//
// flatMap()
// -> map() + flat(1).
//
// slice()
// -> Extract/copy part of an array.
// -> Does NOT mutate.
//
// concat()
// -> Combine arrays.
// -> Does NOT mutate.
//
// Set
// -> Store unique values.
// -> Useful for removing duplicates
//    and membership checks.
//
// ============================================================
// MOST IMPORTANT INTERVIEW DECISION
// ============================================================
//
// Need to SELECT?
//        ↓
//     filter()
//
// Need to TRANSFORM?
//        ↓
//       map()
//
// Need ONE matching item?
//        ↓
//      find()
//
// Need TRUE/FALSE?
//        ↓
//   some() / every()
//
// Need ONE final result?
//        ↓
//     reduce()
//
// Need to RUN something for every item?
//        ↓
//    forEach()
//
// Need UNIQUE values?
//        ↓
//       Set
//
// Need to SEARCH for an exact value?
//        ↓
//    includes()
//
// Need to COMBINE nested arrays?
//        ↓
//  flat() / flatMap()
//
// Need to SORT?
//        ↓
//      sort()
//
// Need a NON-MUTATING modern sort?
//        ↓
//    toSorted()
//
// ============================================================