// ============================================================
// PRODUCT DATASET
// ============================================================

// An array of product objects.
// Each product contains:
// - id       -> unique product ID
// - name     -> product name
// - price    -> product price
// - inStock  -> whether the product is available
// - tags     -> array of tags belonging to the product

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


// ============================================================
// ARRAYS FOR LEVEL 3
// ============================================================

// These arrays are used to practice:
//
// - comparing arrays
// - finding common values
// - finding missing values
// - union
// - intersection
// - difference
// - handling duplicates

const codeA = ["kb", "ms", "mn"];

const codeB = ["mn", "kb", "ms"];

const codeC = ["kb", "ms", "ms"];

const codeD = ["ms", "kb", "kb"];


// ============================================================
// HELPER FUNCTION
// ============================================================

// This function prints a section title.
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

  // \n creates a new line before the title.
  console.log("\n" + title);

  // repeat() repeats the "-" character
  // based on the length of the title.
  //
  // "LEVEL 1".length = 7
  //
  // Result:
  // -------

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
// a specific value.
//
// It returns:
// true  -> value exists
// false -> value does not exist

const tags = ["hardware", "software"];

console.log(
  "1 includes():",
  tags.includes("hardware")
);

// Result:
// true


// ============================================================
// 2. filter()
// ============================================================

// filter() creates a NEW array containing
// only elements that satisfy a condition.
//
// Here we want products that are in stock.
//
// p = current product
//
// If:
//
// p.inStock === true
//
// the product is included.
//
// If:
//
// p.inStock === false
//
// the product is excluded.

const inStockProducts = products.filter(
  (p) => p.inStock
);


// We then use map() to get only the names.
//
// Result:
//
// ["Keyboard", "Mouse", "USB Cable"]

console.log(
  "2 filter():",
  inStockProducts.map((p) => p.name)
);


// ============================================================
// 3. map()
// ============================================================

// map() transforms every element of an array.
//
// We have:
//
// Product object
//
// and transform it into:
//
// Product name
//
// Example:
//
// {
//   id: 101,
//   name: "Keyboard",
//   ...
// }
//
// becomes:
//
// "Keyboard"

const productNames = products.map(
  (p) => p.name
);

console.log(
  "3 map():",
  productNames
);

// Result:
//
// ["Keyboard", "Mouse", "Monitor", "USB Cable"]


// ============================================================
// 4. find()
// ============================================================

// find() returns the FIRST element
// that satisfies the condition.
//
// Here we search for:
//
// name === "Monitor"

const findMonitor = products.find(
  (p) => p.name === "Monitor"
);


// Optional chaining:
// ?.name
//
// If findMonitor exists:
//     return its name
//
// If it does not exist:
//     return undefined
//
// This prevents an error.

console.log(
  "4 find():",
  findMonitor?.name
);

// Result:
//
// Monitor


// ============================================================
// 5. findIndex()
// ============================================================

// findIndex() returns the INDEX
// of the first matching element.
//
// Array indexes start from 0:
//
// 0 -> Keyboard
// 1 -> Mouse
// 2 -> Monitor
// 3 -> USB Cable

const findIndexMonitor = products.findIndex(
  (p) => p.name === "Monitor"
);

console.log(
  "5 findIndex():",
  findIndexMonitor
);

// Result:
//
// 2
//
// If the item doesn't exist:
// -1


// ============================================================
// 6. some()
// ============================================================

// some() checks whether AT LEAST ONE
// element satisfies the condition.
//
// Question:
//
// "Is there at least one product
//  that costs more than 150?"

//
// Monitor costs 180.
//
// Therefore the result is true.

const hasExpensive = products.some(
  (p) => p.price > 150
);

console.log(
  "6 some():",
  hasExpensive
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
// "Does every product have a price
//  greater than 0?"
//
// Yes.
//
// Therefore:
// true

const allPositivePrice = products.every(
  (p) => p.price > 0
);

console.log(
  "7 every():",
  allPositivePrice
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

// First, map() extracts only the prices.
//
// Original:
//
// [
//   45,
//   25,
//   180,
//   10
// ]
//
// Then sort() sorts the numbers.
//
// IMPORTANT:
//
// JavaScript's default sort() treats values
// as strings.
//
// Therefore:
//
// sort((a, b) => a - b)
//
// is used for numeric ascending order.
//
// Result:
//
// [10, 25, 45, 180]

const sortedPrices = products
  .map((p) => p.price)
  .sort((a, b) => a - b);

console.log(
  "8 sort():",
  sortedPrices
);


// ============================================================
// 9. reverse()
// ============================================================

// reverse() reverses the order of an array.
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
// Therefore we create a copy first:
//
// [...productNames]
//
// and reverse the copy.

const reversedProductNames = [
  ...productNames
].reverse();

console.log(
  "9 reverse():",
  reversedProductNames
);

// Result:
//
// ["USB Cable", "Monitor", "Mouse", "Keyboard"]


// ============================================================
// 10. reduce()
// ============================================================

// reduce() is used when we want to turn
// an array into ONE final value.
//
// Here we calculate the total price.
//
// Prices:
//
// 45 + 25 + 180 + 10
//
// = 260
//
// sum = accumulator
// p   = current product
//
// 0 = initial value of sum

const totalPrice = products.reduce(
  (sum, p) => sum + p.price,
  0
);

console.log(
  "10 reduce():",
  totalPrice
);

// Result:
//
// 260


// ============================================================
// 11. Set
// ============================================================

// A Set stores UNIQUE values.
//
// First:
//
// products.flatMap((p) => p.tags)
//
// produces:
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
// Then:
//
// [...new Set(...)]
//
// converts the Set back into an array.
//
// Result:
//
// [
//   "hardware",
//   "input",
//   "display",
//   "accessory",
//   "cable"
// ]

const uniqueTags = [
  ...new Set(
    products.flatMap((p) => p.tags)
  )
];

console.log(
  "11 Set():",
  uniqueTags
);


// ============================================================
// 12. Find duplicate values
// ============================================================

// Example:
//
// ["x", "y", "x", "z", "y", "y"]
//
// We want:
//
// ["x", "y"]


// indexOf() returns the FIRST position
// where a value appears.
//
// Example:
//
// const arr = ["x", "y", "x"];
//
// arr.indexOf("x")
// returns 0.
//
// But the second "x" is at index 2.
//
// Therefore:
//
// current index !== first index
//
// means the value is a duplicate.

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
      (value, index, array) => {

        // Find the first position of this value.
        const firstIndex = array.indexOf(value);

        // If the current index is different
        // from the first index,
        // this is a duplicate.

        return firstIndex !== index;
      }
    )
  )
];

console.log(
  "12 duplicates:",
  duplicateLetters
);

// Result:
//
// ["x", "y"]


// ============================================================
// 13. Frequency / Count
// ============================================================

// We want to count how many times
// each letter occurs.
//
// Input:
//
// ["x", "y", "x", "z", "y", "y"]
//
// Expected:
//
// {
//   x: 2,
//   y: 3,
//   z: 1
// }


// reduce() is perfect for this problem.
//
// acc = accumulator object
// value = current letter

const letterFrequency = letters.reduce(
  (acc, value) => {

    // If the value does not exist,
    // use 0 as the starting value.
    //
    // Then add 1.

    acc[value] =
      (acc[value] || 0) + 1;

    // Return the accumulator
    // for the next iteration.

    return acc;

  },
  {}
);

console.log(
  "13 frequency/count:",
  letterFrequency
);

// Result:
//
// {
//   x: 2,
//   y: 3,
//   z: 1
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
//   [4, [5]]
// ]
//
// flat(1) removes one level:
//
// [
//   1,
//   2,
//   3,
//   4,
//   [5]
// ]
//
// flat(2) removes two levels:
//
// [
//   1,
//   2,
//   3,
//   4,
//   5
// ]

const nestedNumbers = [
  1,
  [2, 3],
  [4, [5]]
];

console.log(
  "14 flat():",
  nestedNumbers.flat(2)
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
// Each product has a tags array.
//
// map() alone would produce:
//
// [
//   ["hardware", "input"],
//   ["hardware", "input"],
//   ["hardware", "display"],
//   ["accessory", "cable"]
// ]
//
// flatMap() immediately flattens one level:
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

const allTags = products.flatMap(
  (p) => p.tags
);

console.log(
  "15 flatMap():",
  allTags
);


// ============================================================
// LEVEL 3
// ARRAY COMPARISON / SET OPERATIONS
// ============================================================

section("LEVEL 3");


// ============================================================
// 16. Compare arrays
// ============================================================

// We want to compare two arrays
// WITHOUT caring about their order.
//
// Example:
//
// ["kb", "ms", "mn"]
//
// and:
//
// ["mn", "kb", "ms"]
//
// should return:
//
// true
//
// Strategy:
//
// 1. Check the length.
// 2. Copy the arrays.
// 3. Sort both arrays.
// 4. Compare every element.

function compareArrays(arr1, arr2) {

  // If lengths are different,
  // they cannot contain exactly
  // the same number of values.

  if (arr1.length !== arr2.length) {
    return false;
  }


  // Create copies before sorting.
  //
  // Why?
  //
  // sort() mutates the original array.

  const s1 = [...arr1].sort();

  const s2 = [...arr2].sort();


  // every() checks every element.
  //
  // v = current value
  // i = current index
  //
  // We compare:
  //
  // s1[i] === s2[i]

  return s1.every(
    (v, i) => v === s2[i]
  );
}


// ============================================================
// 17. Compare arrays INCLUDING duplicates
// ============================================================

// This is different from compareArrays().
//
// Example:
//
// codeC:
//
// ["kb", "ms", "ms"]
//
// codeD:
//
// ["ms", "kb", "kb"]
//
// Both contain:
//
// kb
// ms
//
// But the number of occurrences is different.
//
// codeC:
//
// kb -> 1
// ms -> 2
//
// codeD:
//
// kb -> 2
// ms -> 1
//
// Therefore:
//
// false

function compareDuplicates(arr1, arr2) {

  // Helper function.
  //
  // It converts an array into
  // a frequency/count object.

  const toFreq = (arr) => {

    return arr.reduce(
      (acc, item) => {

        // Increase the count for this item.

        acc[item] =
          (acc[item] || 0) + 1;

        return acc;

      },
      {}
    );
  };


  // Convert both arrays into frequency objects
  // and compare them.

  return JSON.stringify(
    toFreq(arr1)
  ) === JSON.stringify(
    toFreq(arr2)
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
// arr1 = ["a", "b", "c"]
// arr2 = ["b", "c", "d"]
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
// Union:
//
// ["a", "b", "c"]
//
// concat() joins two arrays.
//
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

  // First remove duplicates from arr1.

  return [
    ...new Set(arr1)

  ].filter(

    // Keep only values
    // that also exist in arr2.

    (x) => arr2.includes(x)
  );
}


// ============================================================
// 22. Difference
// ============================================================

// Difference means:
//
// "Values that exist in arr1
//  but NOT in arr2."
//
// Example:
//
// arr1:
//
// ["a", "b", "c"]
//
// arr2:
//
// ["a", "b"]
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

// codeA:
//
// ["kb", "ms", "mn"]
//
// codeB:
//
// ["mn", "kb", "ms"]
//
// Same values.
// Different order.
//
// Result:
//
// true

console.log(
  "16 Compare arrays:",
  compareArrays(codeA, codeB)
);


// ============================================================
// 17. Compare duplicates
// ============================================================

// codeC:
//
// ["kb", "ms", "ms"]
//
// codeD:
//
// ["ms", "kb", "kb"]
//
// Same unique values,
// but different number of occurrences.
//
// Result:
//
// false

console.log(
  "17 Compare duplicates:",
  compareDuplicates(codeC, codeD)
);


// ============================================================
// 18. Common values
// ============================================================

// Values that exist in both:
//
// codeA:
//
// ["kb", "ms", "mn"]
//
// codeB:
//
// ["mn", "kb", "ms"]
//
// Result:
//
// ["kb", "ms", "mn"]

console.log(
  "18 Common values:",
  commonValues(codeA, codeB)
);


// ============================================================
// 19. Missing values
// ============================================================

// Find values in codeA
// that are NOT in codeB.
//
// Both arrays contain the same values.
//
// Therefore:
//
// []

console.log(
  "19 Missing values (codeA vs codeB):",
  missingValues(codeA, codeB)
);


// ============================================================
// 20. Union
// ============================================================

// Combine:
//
// codeA:
//
// ["kb", "ms", "mn"]
//
// codeD:
//
// ["ms", "kb", "kb"]
//
// Then remove duplicates.
//
// Result:
//
// ["kb", "ms", "mn"]

console.log(
  "20 Union:",
  union(codeA, codeD)
);


// ============================================================
// 21. Intersection
// ============================================================

// Find values existing in BOTH:
//
// codeA:
//
// ["kb", "ms", "mn"]
//
// codeB:
//
// ["mn", "kb", "ms"]
//
// Result:
//
// ["kb", "ms", "mn"]

console.log(
  "21 Intersection:",
  intersection(codeA, codeB)
);


// ============================================================
// 22. Difference
// ============================================================

// Find values that exist in codeD
// but NOT in codeA.
//
// codeD:
//
// ["ms", "kb", "kb"]
//
// codeA:
//
// ["kb", "ms", "mn"]
//
// Every value from codeD exists in codeA.
//
// Therefore:
//
// []

console.log(
  "22 Difference (codeD - codeA):",
  difference(codeD, codeA)
);