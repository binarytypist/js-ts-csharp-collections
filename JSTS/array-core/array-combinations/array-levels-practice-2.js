// ============================================================
// JAVASCRIPT INTERVIEW PRACTICE
// LEVEL 1 → LEVEL 3
// Arrays, Objects, filter, map, find, reduce, Set, flat,
// flatMap, sorting, comparison, union, intersection,
// difference and frequency counting.
// ============================================================


// ============================================================
// DATASET
// ============================================================

const products = [
  {
    id: 101,
    name: "Keyboard",
    price: 45,
    inStock: true,
    tags: ["hardware", "input"]
  },
  {
    id: 102,
    name: "Mouse",
    price: 25,
    inStock: true,
    tags: ["hardware", "input"]
  },
  {
    id: 103,
    name: "Monitor",
    price: 180,
    inStock: false,
    tags: ["hardware", "display"]
  },
  {
    id: 104,
    name: "USB Cable",
    price: 10,
    inStock: true,
    tags: ["accessory", "cable"]
  }
];


// Arrays used later for comparison and
// set-operation examples.

const codeA = ["kb", "ms", "mn"];
const codeB = ["mn", "kb", "ms"];

const codeC = ["kb", "ms", "ms"];
const codeD = ["ms", "kb", "kb"];


// ============================================================
// HELPER FUNCTION
// ============================================================

// Prints a readable section title in the terminal.
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
// QUESTION:
// Check whether the array contains the value "hardware".
//
// includes() returns:
// true  -> value exists
// false -> value does not exist
// ------------------------------------------------------------

console.log(
  "1 includes():",
  ["hardware", "software"].includes("hardware")
);


// ------------------------------------------------------------
// 2. filter()
// QUESTION:
// Return only products that are currently in stock.
//
// filter() creates a NEW array containing
// only elements where the condition is true.
// ------------------------------------------------------------

const inStockProducts = products.filter(
  (product) => product.inStock
);

console.log(
  "2 filter():",
  inStockProducts.map((product) => product.name)
);


// ------------------------------------------------------------
// 3. map()
// QUESTION:
// Return only the product names.
//
// map() transforms every element into
// another value.
//
// Product object -> product name
// ------------------------------------------------------------

const productNames = products.map(
  (product) => product.name
);

console.log(
  "3 map():",
  productNames
);


// ------------------------------------------------------------
// 4. find()
// QUESTION:
// Find the product named "Monitor".
//
// find() returns the FIRST matching object.
// If nothing is found, it returns undefined.
// ------------------------------------------------------------

const findMonitor = products.find(
  (product) => product.name === "Monitor"
);

console.log(
  "4 find():",
  findMonitor?.name
);


// ------------------------------------------------------------
// 5. findIndex()
// QUESTION:
// Find the index of the "Monitor" product.
//
// findIndex() returns:
// 2 -> if Monitor is found
// -1 -> if Monitor does not exist
// ------------------------------------------------------------

const findIndexMonitor = products.findIndex(
  (product) => product.name === "Monitor"
);

console.log(
  "5 findIndex():",
  findIndexMonitor
);


// ------------------------------------------------------------
// 6. some()
// QUESTION:
// Check whether at least ONE product costs
// more than 150.
//
// some() returns true as soon as one
// element satisfies the condition.
// ------------------------------------------------------------

const hasExpensive = products.some(
  (product) => product.price > 150
);

console.log(
  "6 some():",
  hasExpensive
);


// ------------------------------------------------------------
// 7. every()
// QUESTION:
// Check whether ALL products have a price
// greater than 0.
//
// every() returns true only when every
// element satisfies the condition.
// ------------------------------------------------------------

const allPositivePrice = products.every(
  (product) => product.price > 0
);

console.log(
  "7 every():",
  allPositivePrice
);


// ============================================================
// LEVEL 2 — DATA TRANSFORMATION
// ============================================================

section("LEVEL 2");


// ------------------------------------------------------------
// 8. sort()
// QUESTION:
// Sort all product prices from lowest to highest.
//
// Important:
// sort() MUTATES the array it is called on.
//
// Here we are sorting a new array created
// by map(), so the original products array
// is not affected.
//
// a - b -> ascending
// b - a -> descending
// ------------------------------------------------------------

const sortedPrices = products
  .map((product) => product.price)
  .sort((a, b) => a - b);

console.log(
  "8 sort():",
  sortedPrices
);


// ------------------------------------------------------------
// 9. reverse()
// QUESTION:
// Reverse the product names.
//
// [...productNames] creates a copy first.
//
// This is important because reverse()
// MUTATES the array.
// ------------------------------------------------------------

const reversedProductNames = [
  ...productNames
].reverse();

console.log(
  "9 reverse():",
  reversedProductNames
);


// ------------------------------------------------------------
// 10. reduce()
// QUESTION:
// Calculate the total price of all products.
//
// reduce() combines all elements into
// ONE final value.
//
// Start with:
// 0
//
// Then:
//
// 0 + 45
// 45 + 25
// 70 + 180
// 250 + 10
// = 260
// ------------------------------------------------------------

const totalPrice = products.reduce(
  (sum, product) => sum + product.price,
  0
);

console.log(
  "10 reduce():",
  totalPrice
);


// ------------------------------------------------------------
// 11. Set + flatMap()
// QUESTION:
// Find all UNIQUE tags from all products.
//
// flatMap() creates one flat array:
//
// [
//   "hardware",
//   "input",
//   "hardware",
//   "input",
//   "hardware",
//   "display",
//   "accessory",
//   "cable"
// ]
//
// Set removes duplicates.
//
// Spread converts the Set back into an array.
// ------------------------------------------------------------

const uniqueTags = [
  ...new Set(
    products.flatMap(
      (product) => product.tags
    )
  )
];

console.log(
  "11 Set:",
  uniqueTags
);


// ------------------------------------------------------------
// 12. Find duplicate values
// QUESTION:
// Find values that occur more than once.
//
// We first use filter() to find values whose
// first occurrence is NOT the current index.
//
// Then Set removes duplicate duplicate-values.
//
// Example:
//
// ["x", "y", "x", "z", "y", "y"]
//
// Result:
//
// ["x", "y"]
// ------------------------------------------------------------

const letters = [
  "x",
  "y",
  "x",
  "z",
  "y",
  "y"
];

const duplicateLetters = [
  ...new Set(
    letters.filter(
      (value, index, array) =>
        array.indexOf(value) !== index
    )
  )
];

console.log(
  "12 duplicates:",
  duplicateLetters
);


// ------------------------------------------------------------
// 13. Frequency / Count
// QUESTION:
// Count how many times each value appears.
//
// Expected:
//
// {
//   x: 2,
//   y: 3,
//   z: 1
// }
//
// reduce() is commonly used for frequency maps.
// ------------------------------------------------------------

const letterFrequency = letters.reduce(
  (acc, value) => {

    // If value does not exist yet, start at 0.
    // Then increase it by 1.
    acc[value] =
      (acc[value] || 0) + 1;

    return acc;
  },
  {}
);

console.log(
  "13 frequency/count:",
  letterFrequency
);


// ------------------------------------------------------------
// 14. flat()
// QUESTION:
// Flatten a nested array.
//
// flat(2) removes up to TWO levels of nesting.
//
// [1, [2, 3], [4, [5]]]
//
// becomes:
//
// [1, 2, 3, 4, 5]
// ------------------------------------------------------------

const nestedNumbers = [
  1,
  [2, 3],
  [4, [5]]
];

console.log(
  "14 flat():",
  nestedNumbers.flat(2)
);


// ------------------------------------------------------------
// 15. flatMap()
// QUESTION:
// Get all tags from all products in ONE array.
//
// flatMap() is useful when each object
// contains an array and you want one
// combined array.
//
// map() + flat(1)
// is essentially what flatMap() performs.
// ------------------------------------------------------------

const allTags = products.flatMap(
  (product) => product.tags
);

console.log(
  "15 flatMap():",
  allTags
);


// ============================================================
// LEVEL 3 — ARRAY COMPARISON AND SET OPERATIONS
// ============================================================

section("LEVEL 3");


// ============================================================
// 16. COMPARE ARRAYS IGNORING ORDER
// ============================================================

// QUESTION:
// Compare two arrays by values,
// ignoring their order.
//
// Example:
//
// ["kb", "ms", "mn"]
//
// and
//
// ["mn", "kb", "ms"]
//
// should return true.
//
// IMPORTANT:
// This version ignores the original order,
// but DOES NOT treat duplicate counts as important.
//
// Example:
//
// ["a", "a", "b"]
//
// and
//
// ["a", "b", "b"]
//
// would be considered equal by this simple
// sorted comparison.
//
// For duplicate-sensitive comparison,
// use compareDuplicates() below.

function compareArrays(arr1, arr2) {

  // Different lengths cannot contain
  // exactly the same number of values.
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Copy before sorting because sort()
  // mutates the array.
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  // every() checks every position.
  return sorted1.every(
    (value, index) =>
      value === sorted2[index]
  );
}

console.log(
  "16 Compare arrays:",
  compareArrays(codeA, codeB)
);


// ============================================================
// 17. COMPARE ARRAYS INCLUDING DUPLICATE COUNTS
// ============================================================

// QUESTION:
// Compare arrays while also respecting
// how many times each value appears.
//
// Example:
//
// codeC:
// ["kb", "ms", "ms"]
//
// codeD:
// ["ms", "kb", "kb"]
//
// They contain the same unique values,
// BUT the duplicate counts are different.
//
// ms -> 2 in codeC
// ms -> 1 in codeD
//
// Therefore the result should be false.
//
// This is a better approach when duplicates matter.

function compareDuplicates(arr1, arr2) {

  // Helper function to create a frequency map.
  //
  // Example:
  //
  // ["a", "a", "b"]
  //
  // becomes:
  //
  // {
  //   a: 2,
  //   b: 1
  // }
  const toFrequency = (array) => {

    return array.reduce(
      (acc, item) => {

        acc[item] =
          (acc[item] || 0) + 1;

        return acc;
      },
      {}
    );
  };

  const frequency1 =
    toFrequency(arr1);

  const frequency2 =
    toFrequency(arr2);

  // JSON.stringify() converts both objects
  // into strings so we can compare them.
  //
  // Note:
  // For simple string/number keys this is fine.
  return JSON.stringify(frequency1) ===
         JSON.stringify(frequency2);
}

console.log(
  "17 Compare duplicates:",
  compareDuplicates(codeC, codeD)
);


// ============================================================
// 18. COMMON VALUES / INTERSECTION
// ============================================================

// QUESTION:
// Find values that exist in BOTH arrays.
//
// codeA:
// ["kb", "ms", "mn"]
//
// codeB:
// ["mn", "kb", "ms"]
//
// Result:
//
// ["kb", "ms", "mn"]
//
// Set removes duplicates from the result.

function commonValues(arr1, arr2) {

  return [
    ...new Set(
      arr1.filter(
        (value) =>
          arr2.includes(value)
      )
    )
  ];
}

console.log(
  "18 Common values:",
  commonValues(codeA, codeB)
);


// ============================================================
// 19. DIFFERENCE
// ============================================================

// QUESTION:
// Find values that exist in the FIRST array
// but NOT in the SECOND array.
//
// Example:
//
// difference(
//   ["a", "b", "c"],
//   ["b", "c"]
// )
//
// Result:
//
// ["a"]
//
// This is often called:
// A - B

function difference(arr1, arr2) {

  return arr1.filter(
    (value) =>
      !arr2.includes(value)
  );
}

console.log(
  "19 Difference codeA - codeB:",
  difference(codeA, codeB)
);


// ============================================================
// 20. UNION
// ============================================================

// QUESTION:
// Combine both arrays and remove duplicates.
//
// Example:
//
// ["a", "b"]
// +
// ["b", "c"]
//
// Result:
//
// ["a", "b", "c"]
//
// Set is perfect for this.

function union(arr1, arr2) {

  return [
    ...new Set(
      arr1.concat(arr2)
    )
  ];
}

console.log(
  "20 Union codeA + codeD:",
  union(codeA, codeD)
);


// ============================================================
// 21. INTERSECTION
// ============================================================

// QUESTION:
// Find values that exist in both arrays.
//
// This is similar to commonValues().
//
// The Set around arr1 ensures duplicate
// values from arr1 appear only once.

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
  intersection(codeA, codeB)
);


// ============================================================
// 22. DIFFERENCE A - B
// ============================================================

// QUESTION:
// Find values that exist in codeD
// but do NOT exist in codeA.
//
// codeD:
// ["ms", "kb", "kb"]
//
// codeA:
// ["kb", "ms", "mn"]
//
// Every value from codeD exists in codeA,
// so the result is:
//
// []

console.log(
  "22 Difference codeD - codeA:",
  difference(codeD, codeA)
);