// ============================================================
// SALES DATA
// ============================================================

// Each object represents one sale.
//
// id     -> unique sale ID
// user   -> person who made the sale
// region -> user's region
// amount -> sale amount
// items  -> products included in the sale
const sales = [
  {
    id: 1,
    user: "Sammit",
    region: "IN",
    amount: 120,
    items: ["Keyboard", "Mouse"]
  },
  {
    id: 2,
    user: "Maria",
    region: "BR",
    amount: 90,
    items: ["Monitor"]
  },
  {
    id: 3,
    user: "Sammit",
    region: "IN",
    amount: 150,
    items: ["USB", "Cable"]
  },
  {
    id: 4,
    user: "John",
    region: "US",
    amount: 75,
    items: ["Mouse"]
  },
  {
    id: 5,
    user: "Maria",
    region: "BR",
    amount: 210,
    items: ["Laptop", "Bag"]
  },
  {
    id: 6,
    user: "David",
    region: "US",
    amount: 45,
    items: ["USB"]
  }
];


// ============================================================
// HELPER: SECTION
// ============================================================

// Prints a formatted section title.
//
// Example:
//
// ADVANCED 1: Grouping and Aggregation
// ------------------------------------
function section(title) {
  console.log("\n" + title);

  // "-".repeat(title.length)
  // creates the same number of "-" characters
  // as the title length.
  console.log("-".repeat(title.length));
}


// ============================================================
// HELPER: GROUPBY
// ============================================================

// Groups array elements according to a calculated key.
//
// Example:
//
// groupBy(sales, sale => sale.region)
//
// produces:
//
// {
//   IN:  [sale1, sale3],
//   BR:  [sale2, sale5],
//   US:  [sale4, sale6]
// }
//
// array -> source array
// keyFn -> function that decides which group each item belongs to
function groupBy(array, keyFn) {

  // reduce() builds one final object.
  //
  // acc = accumulator object
  // item = current array element
  return array.reduce((acc, item) => {

    // Calculate the key for the current item.
    //
    // Example:
    // sale.region -> "IN"
    const key = keyFn(item);

    // If the group does not exist yet,
    // create an empty array.
    //
    // Example:
    //
    // first IN:
    // acc["IN"] = []
    if (!acc[key]) {
      acc[key] = [];
    }

    // Add the current item to its group.
    acc[key].push(item);

    // Return accumulator for the next iteration.
    return acc;

  }, {});
}


// ============================================================
// HELPER: CHUNK
// ============================================================

// Splits an array into smaller arrays.
//
// Example:
//
// chunk([1,2,3,4,5], 2)
//
// becomes:
//
// [
//   [1,2],
//   [3,4],
//   [5]
// ]
function chunk(array, size) {

  // Final result.
  const out = [];

  // Increase i by "size" each time.
  //
  // If size = 2:
  //
  // i = 0
  // i = 2
  // i = 4
  for (let i = 0; i < array.length; i += size) {

    // slice() does NOT modify the original array.
    //
    // Example:
    // slice(0,2) -> first two elements
    // slice(2,4) -> next two elements
    out.push(array.slice(i, i + size));
  }

  // Return array of chunks.
  return out;
}


// ============================================================
// HELPER: ZIP
// ============================================================

// Combines two arrays position by position.
//
// Example:
//
// zip(["A","B","C"], [10,20,30])
//
// becomes:
//
// [
//   ["A",10],
//   ["B",20],
//   ["C",30]
// ]
//
// If arrays have different lengths,
// the shorter length is used.
function zip(a, b) {

  // Math.min() prevents us from accessing
  // an index that doesn't exist in the shorter array.
  const len = Math.min(a.length, b.length);

  // Array.from() creates an array with "len" elements.
  //
  // (_, i) means:
  // _ = current generated value (not needed)
  // i = current index
  //
  // Each element becomes [a[i], b[i]].
  return Array.from(
    { length: len },
    (_, i) => [a[i], b[i]]
  );
}


// ============================================================
// HELPER: ROTATE LEFT
// ============================================================

// Moves the first k elements to the end.
//
// Example:
//
// rotateLeft([1,2,3,4,5], 2)
//
// becomes:
//
// [3,4,5,1,2]
function rotateLeft(array, k) {

  // Empty array cannot be rotated.
  if (array.length === 0) {
    return [];
  }

  // % handles rotations larger than the array length.
  //
  // Example:
  //
  // 7 % 5 = 2
  //
  // Rotating 5 elements by 7 positions
  // is effectively the same as rotating by 2.
  const n = k % array.length;

  // slice(n)
  // -> elements from n to the end
  //
  // slice(0,n)
  // -> first n elements
  //
  // concat() puts them together.
  return array
    .slice(n)
    .concat(array.slice(0, n));
}


// ============================================================
// HELPER: FLATTEN DEEP
// ============================================================

// Recursively flattens an array regardless of nesting depth.
//
// Example:
//
// [1, [2, [3,4]]]
//
// becomes:
//
// [1,2,3,4]
function flattenDeep(array) {

  // reduce() builds the final flat array.
  return array.reduce((acc, item) => {

    // Check whether the current item is an array.
    if (Array.isArray(item)) {

      // If it is an array,
      // recursively flatten it.
      //
      // Example:
      // [2,[3,4]]
      // becomes:
      // [2,3,4]
      //
      // concat() adds the flattened values.
      return acc.concat(flattenDeep(item));
    }

    // If item is not an array,
    // simply add it to the accumulator.
    return acc.concat(item);

  }, []);
}


// ============================================================
// ADVANCED 1: GROUPING AND AGGREGATION
// ============================================================

section("ADVANCED 1: Grouping and Aggregation");


// ------------------------------------------------------------
// 1. GROUP SALES BY REGION
// ------------------------------------------------------------

// groupBy() receives:
//
// sales
// -> source array
//
// (s) => s.region
// -> tells groupBy() which property should be used as the key.
const byRegion = groupBy(
  sales,
  (s) => s.region
);

// Object.keys() returns the object's property names.
//
// Expected:
//
// ["IN", "BR", "US"]
console.log(
  "1 groupBy region keys:",
  Object.keys(byRegion)
);


// ------------------------------------------------------------
// 2. TOTAL REVENUE BY USER
// ------------------------------------------------------------

// reduce() is used to create an object:
//
// {
//   Sammit: 270,
//   Maria: 300,
//   John: 75,
//   David: 45
// }
const revenueByUser = sales.reduce(
  (acc, s) => {

    // If the user doesn't exist yet,
    // use 0 as the starting amount.
    //
    // Then add the current sale amount.
    //
    // Sammit:
    // 0 + 120 = 120
    // 120 + 150 = 270
    acc[s.user] =
      (acc[s.user] || 0) + s.amount;

    // Return accumulator for the next sale.
    return acc;

  },
  {}
);

// Print revenue totals.
console.log(
  "2 revenue by user:",
  revenueByUser
);


// ------------------------------------------------------------
// 3. FIND THE LARGEST SALE
// ------------------------------------------------------------

// reduce() can also find the maximum object.
//
// best = current best sale
// s    = current sale
//
// If current sale is larger,
// replace best.
//
// Otherwise keep best.
const topSale = sales.reduce(
  (best, s) =>
    s.amount > best.amount
      ? s
      : best,
  sales[0]
);

// Expected:
//
// Maria 210
console.log(
  "3 max by reduce:",
  topSale.user,
  topSale.amount
);


// ============================================================
// ADVANCED 2: TRANSFORM AND NORMALIZE
// ============================================================

section("ADVANCED 2: Transform and Normalize");


// ------------------------------------------------------------
// 4. NORMALIZE DATA WITH MAP
// ------------------------------------------------------------

// map() creates a NEW array.
//
// We use the spread operator:
//
// ...s
//
// to copy all existing sale properties.
//
// Then we override/add:
//
// user
// itemCount
const normalized = sales.map(
  (s) => ({

    // Copy all properties from s.
    ...s,

    // Convert username to lowercase.
    //
    // "Sammit" -> "sammit"
    user: s.user.toLowerCase(),

    // Add a calculated property.
    //
    // Example:
    // ["Keyboard","Mouse"].length
    // -> 2
    itemCount: s.items.length
  })
);

// Print first normalized sale.
console.log(
  "4 normalize map sample:",
  normalized[0]
);


// ------------------------------------------------------------
// 5. GET UNIQUE ITEMS
// ------------------------------------------------------------

// flatMap() gets the items from every sale
// and combines them into one flat array.
//
// Example:
//
// [
//   ["Keyboard","Mouse"],
//   ["Monitor"],
//   ["USB","Cable"]
// ]
//
// becomes:
//
// [
//   "Keyboard",
//   "Mouse",
//   "Monitor",
//   "USB",
//   "Cable"
// ]
const allItems =
  sales.flatMap(
    (s) => s.items
  );

// Set automatically removes duplicates.
//
// Example:
//
// ["Mouse","USB","Mouse"]
//
// becomes:
//
// {"Mouse","USB"}
//
// [...new Set(...)] converts the Set back into an array.
//
// toSorted() returns a new sorted array.
const uniqueItems =
  [
    ...new Set(allItems)
  ].toSorted();

// Print unique products.
console.log(
  "5 flatMap + Set unique items:",
  uniqueItems
);


// ------------------------------------------------------------
// 6. MULTI-KEY SORT
// ------------------------------------------------------------

// Create a copy first.
//
// [...sales] prevents the original sales array
// from being modified by sort().
const sortedMulti =
  [...sales].sort(
    (a, b) => {

      // First sort by amount descending.
      //
      // Example:
      // 210 before 150
      //
      const amountSort =
        b.amount - a.amount;

      // If amounts are different,
      // use the amount comparison.
      if (amountSort !== 0) {
        return amountSort;
      }

      // If amounts are equal,
      // sort by username alphabetically.
      return a.user.localeCompare(b.user);
    }
  );

// The highest sale should be first.
console.log(
  "6 multi-key sort first:",
  sortedMulti[0]
);


// ============================================================
// ADVANCED 3: COMPARISON AND SET OPERATIONS
// ============================================================

section("ADVANCED 3: Comparison and Set Operations");


// First four sale IDs.
//
// [1,2,3,4]
const idsA =
  sales
    .slice(0, 4)
    .map((s) => s.id);


// Second ID collection.
//
// [3,4,5,6,7]
const idsB =
  [3, 4, 5, 6, 7];


// ------------------------------------------------------------
// 7. UNION
// ------------------------------------------------------------

// concat() combines both arrays.
//
// [1,2,3,4,3,4,5,6,7]
//
// Set removes duplicates.
//
// Result:
//
// [1,2,3,4,5,6,7]
const union =
  [
    ...new Set(
      idsA.concat(idsB)
    )
  ];

console.log(
  "7 union:",
  union
);


// ------------------------------------------------------------
// 8. INTERSECTION
// ------------------------------------------------------------

// filter() keeps IDs from idsA
// that also exist in idsB.
//
// idsA:
// [1,2,3,4]
//
// idsB:
// [3,4,5,6,7]
//
// Common:
// [3,4]
const intersection =
  idsA.filter(
    (id) => idsB.includes(id)
  );

console.log(
  "8 intersection:",
  intersection
);


// ------------------------------------------------------------
// 9. DIFFERENCE
// ------------------------------------------------------------

// Keep values from idsA
// that DO NOT exist in idsB.
//
// idsA:
// [1,2,3,4]
//
// idsB:
// [3,4,5,6,7]
//
// Result:
// [1,2]
const difference =
  idsA.filter(
    (id) => !idsB.includes(id)
  );

console.log(
  "9 difference A-B:",
  difference
);


// ============================================================
// ADVANCED 4: STRUCTURAL UTILITIES
// ============================================================

section("ADVANCED 4: Structural Utilities");


// ------------------------------------------------------------
// 10. CHUNK
// ------------------------------------------------------------

// idsA:
//
// [1,2,3,4]
//
// chunk size = 2
//
// Result:
//
// [
//   [1,2],
//   [3,4]
// ]
console.log(
  "10 chunk size 2:",
  chunk(idsA, 2)
);


// ------------------------------------------------------------
// 11. ZIP
// ------------------------------------------------------------

// First array:
//
// ["Sammit","Maria","Sammit","John","Maria","David"]
//
// Second array:
//
// [120,90,150,75,210,45]
//
// zip() combines corresponding positions.
//
// Result:
//
// [
//   ["Sammit",120],
//   ["Maria",90],
//   ["Sammit",150],
//   ...
// ]
console.log(
  "11 zip user+amount:",
  zip(
    sales.map((s) => s.user),
    sales.map((s) => s.amount)
  )
);


// ------------------------------------------------------------
// 12. ROTATE LEFT
// ------------------------------------------------------------

// idsA:
//
// [1,2,3,4]
//
// Rotate left by 2:
//
// [3,4,1,2]
console.log(
  "12 rotate left 2:",
  rotateLeft(idsA, 2)
);


// ------------------------------------------------------------
// 13. DEEP FLATTEN
// ------------------------------------------------------------

// Nested array:
//
// [
//   1,
//   [2,[3,4],5],
//   [6,[7]]
// ]
//
// flattenDeep() recursively removes
// every level of nesting.
//
// Result:
//
// [1,2,3,4,5,6,7]
const nested = [
  1,
  [2, [3, 4], 5],
  [6, [7]]
];

console.log(
  "13 flatten deep:",
  flattenDeep(nested)
);


// ============================================================
// ADVANCED 5: PATTERNS FOR INTERVIEWS
// ============================================================

section("ADVANCED 5: Patterns for Interviews");


// ------------------------------------------------------------
// 14. FIND DUPLICATE USERS
// ------------------------------------------------------------

// First get all usernames.
//
// [
//   "Sammit",
//   "Maria",
//   "Sammit",
//   "John",
//   "Maria",
//   "David"
// ]
//
// filter() checks whether the current value
// appeared earlier in the array.
//
// arr.indexOf(u) gives the FIRST occurrence.
//
// If the first occurrence is NOT the current index,
// then this is a duplicate.
const duplicateUsers =
  [
    ...new Set(
      sales
        .map((s) => s.user)
        .filter(
          (u, i, arr) =>
            arr.indexOf(u) !== i
        )
    )
  ];

// Set removes duplicate duplicate-detections.
//
// Result:
//
// ["Sammit","Maria"]
console.log(
  "14 duplicates:",
  duplicateUsers
);


// ------------------------------------------------------------
// 15. FREQUENCY MAP
// ------------------------------------------------------------

// allItems contains every product:
//
// [
//   "Keyboard",
//   "Mouse",
//   "Monitor",
//   "USB",
//   "Cable",
//   "Mouse",
//   "Laptop",
//   "Bag",
//   "USB"
// ]
//
// reduce() creates a frequency object.
//
// Example:
//
// {
//   Mouse: 2,
//   USB: 2,
//   Keyboard: 1,
//   ...
// }
const frequency =
  allItems.reduce(
    (acc, item) => {

      // If item does not exist,
      // start at 0.
      //
      // Then add 1.
      acc[item] =
        (acc[item] || 0) + 1;

      return acc;

    },
    {}
  );

console.log(
  "15 frequency map:",
  frequency
);


// ------------------------------------------------------------
// 16. TOP 3 SALE AMOUNTS
// ------------------------------------------------------------

// map() extracts only amounts.
//
// Example:
//
// [120,90,150,75,210,45]
const top3Amounts =
  sales
    .map((s) => s.amount)

    // toSorted() returns a NEW sorted array.
    //
    // b - a means descending.
    //
    // 210,150,120,90,75,45
    .toSorted(
      (a, b) => b - a
    )

    // Keep only first 3.
    //
    // [210,150,120]
    .slice(0, 3);

console.log(
  "16 top 3 amounts:",
  top3Amounts
);


// ------------------------------------------------------------
// 17. SOME / EVERY
// ------------------------------------------------------------

// some() returns true if AT LEAST ONE
// sale is greater than 200.
//
// Maria has a 210 sale.
//
// Therefore:
//
// true
const hasLargeDeal =
  sales.some(
    (s) => s.amount > 200
  );


// every() returns true only if ALL sales
// contain at least one item.
//
// Every sale has at least one item.
//
// Therefore:
//
// true
const allHaveItems =
  sales.every(
    (s) => s.items.length > 0
  );

console.log(
  "17 some/every:",
  {
    hasLargeDeal,
    allHaveItems
  }
);


// ============================================================
// 18. PIPELINE
// ============================================================

// This is a very common interview pattern.
//
// filter()
//     ↓
// map()
//     ↓
// toSorted()
//
// Data flows through multiple transformations.
const pipeline =
  sales

    // STEP 1: FILTER
    //
    // Keep only sales >= 90.
    //
    // Removed:
    // John 75
    // David 45
    //
    // Remaining:
    // 120,90,150,210
    .filter(
      (s) => s.amount >= 90
    )

    // STEP 2: MAP
    //
    // Convert each sale object into
    // a smaller object containing only
    // user and amount.
    //
    // Example:
    //
    // {
    //   user: "Sammit",
    //   amount: 120
    // }
    .map(
      (s) => ({
        user: s.user,
        amount: s.amount
      })
    )

    // STEP 3: SORT
    //
    // Sort by amount descending.
    //
    // 210
    // 150
    // 120
    // 90
    .toSorted(
      (a, b) =>
        b.amount - a.amount
    );


// Print final pipeline result.
console.log(
  "18 filter -> map -> toSorted:",
  pipeline
);