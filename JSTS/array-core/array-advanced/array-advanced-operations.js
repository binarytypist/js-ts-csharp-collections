
// ============================================================
// SALES DATA
// ============================================================

// An array containing multiple sales objects.
// Each object represents one sale.
const sales = [
  {
    id: 1, // Unique ID of the sale.
    user: "Sammit", // Person who made the sale.
    region: "IN", // Sales region/country.
    amount: 120, // Sale amount.
    items: ["Keyboard", "Mouse"] // Products included in this sale.
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
// SECTION HELPER
// ============================================================

// This function prints a formatted section title.
//
// title is the string passed to the function.
//
// Example:
//
// section("Grouping");
//
// Output:
//
// Grouping
// --------
function section(title) {

  // \n creates a new line before the title.
  console.log("\n" + title);

  // "-".repeat(title.length)
  //
  // Creates a string containing "-" repeated
  // as many times as the title has characters.
  //
  // Example:
  // "Test".length = 4
  // "-".repeat(4) = "----"
  console.log("-".repeat(title.length));
}


// ============================================================
// GROUP BY
// ============================================================

// groupBy() groups array elements based on a key.
//
// array  -> the original array.
// keyFn  -> a callback function that decides
//           which key each item belongs to.
//
// Example:
//
// groupBy(sales, s => s.region)
//
// creates:
//
// {
//   IN: [...],
//   BR: [...],
//   US: [...]
// }
function groupBy(array, keyFn) {

  // reduce() processes every item and builds
  // one final object.
  //
  // acc = accumulator object.
  // item = current element from the array.
  const result = array.reduce((acc, item) => {

    // keyFn(item) calculates the key for this item.
    //
    // For sales:
    //
    // Sammit -> "IN"
    // Maria  -> "BR"
    // John   -> "US"
    const key = keyFn(item);

    // If this key does not already exist,
    // create an empty array for it.
    //
    // Example:
    // acc["IN"] = []
    if (!acc[key]) {
      acc[key] = [];
    }

    // Add the current item to the correct group.
    //
    // Example:
    // acc["IN"].push(Sammit's sale)
    acc[key].push(item);

    // Return the accumulator so reduce()
    // can use it in the next iteration.
    return acc;

  // {} is the initial accumulator.
  }, {});

  // Return the completed grouped object.
  return result;
}


// ============================================================
// CHUNK
// ============================================================

// chunk() divides an array into smaller arrays.
//
// Example:
//
// chunk([1,2,3,4,5], 2)
//
// Result:
//
// [
//   [1,2],
//   [3,4],
//   [5]
// ]
function chunk(array, size) {

  // This array will contain the final chunks.
  const out = [];

  // Start at index 0.
  //
  // Increase i by "size" after every iteration.
  //
  // If size = 2:
  //
  // i = 0
  // i = 2
  // i = 4
  for (let i = 0; i < array.length; i += size) {

    // slice(i, i + size) extracts a portion
    // without changing the original array.
    //
    // Example:
    // slice(0,2) -> first two elements.
    out.push(array.slice(i, i + size));
  }

  // Return all chunks.
  return out;
}


// ============================================================
// ZIP
// ============================================================

// zip() combines two arrays element by element.
//
// Example:
//
// zip(["A","B"], [10,20])
//
// Result:
//
// [
//   ["A",10],
//   ["B",20]
// ]
function zip(a, b) {

  // Use the shorter array length.
  //
  // This prevents trying to access an index
  // that does not exist in one of the arrays.
  const len = Math.min(a.length, b.length);

  // Array.from() creates a new array.
  //
  // { length: len }
  // creates an array-like object with the required length.
  //
  // (_, i) => [a[i], b[i]]
  // creates one pair for every index.
  return Array.from(
    { length: len },
    (_, i) => [a[i], b[i]]
  );
}


// ============================================================
// ROTATE LEFT
// ============================================================

// rotateLeft() moves elements from the beginning
// of an array to the end.
//
// Example:
//
// rotateLeft([1,2,3,4], 2)
//
// Result:
//
// [3,4,1,2]
function rotateLeft(array, k) {

  // If the array is empty,
  // there is nothing to rotate.
  if (array.length === 0) {
    return [];
  }

  // k % array.length prevents unnecessary rotations.
  //
  // Example:
  // array length = 4
  // k = 6
  //
  // 6 % 4 = 2
  //
  // Rotating 6 times is equivalent to rotating 2 times.
  const n = k % array.length;

  // slice(n)
  // gets everything from index n to the end.
  //
  // slice(0,n)
  // gets the first n elements.
  //
  // concat() combines them.
  //
  // Example:
  //
  // [1,2,3,4]
  //
  // n = 2
  //
  // slice(2)   -> [3,4]
  // slice(0,2) -> [1,2]
  //
  // Result -> [3,4,1,2]
  return array
    .slice(n)
    .concat(array.slice(0, n));
}


// ============================================================
// FLATTEN DEEP
// ============================================================

// flattenDeep() recursively removes all levels
// of nested arrays.
//
// Example:
//
// [1, [2, [3,4]]]
//
// becomes:
//
// [1,2,3,4]
function flattenDeep(array) {

  // reduce() builds one flat array.
  return array.reduce((acc, item) => {

    // Check whether the current item is itself an array.
    if (Array.isArray(item)) {

      // If it is an array,
      // recursively call flattenDeep()
      // to flatten it.
      //
      // concat() adds the flattened values
      // to the accumulator.
      return acc.concat(flattenDeep(item));
    }

    // If item is not an array,
    // simply add it to the accumulator.
    return acc.concat(item);

  // Start with an empty array.
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
// 1. sales array
// 2. callback that returns the grouping key.
//
// s represents the current sale.
//
// s.region returns:
// "IN", "BR", or "US".
const byRegion = groupBy(
  sales,
  (s) => s.region
);

// Object.keys() returns all keys of the grouped object.
//
// Example:
//
// {
//   IN: [...],
//   BR: [...],
//   US: [...]
// }
//
// Object.keys() -> ["IN", "BR", "US"]
console.log(
  "1 groupBy region keys:",
  Object.keys(byRegion)
);


// ------------------------------------------------------------
// 2. REVENUE BY USER
// ------------------------------------------------------------

// reduce() is used to calculate the total
// sales amount for each user.
//
// acc = accumulator object.
// s   = current sale.
const revenueByUser = sales.reduce(
  (acc, s) => {

    // If the user does not exist yet,
    // use 0 as the starting amount.
    //
    // Example:
    //
    // acc["Sammit"] || 0
    //
    // If Sammit does not exist -> 0
    //
    // Then add the current sale amount.
    acc[s.user] =
      (acc[s.user] || 0) + s.amount;

    // Return accumulator for next iteration.
    return acc;

  // Start with an empty object.
  },
  {}
);

console.log(
  "2 revenue by user:",
  revenueByUser
);

// Result:
//
// {
//   Sammit: 270,
//   Maria: 300,
//   John: 75,
//   David: 45
// }


// ------------------------------------------------------------
// 3. FIND THE HIGHEST SALE
// ------------------------------------------------------------

// reduce() can also be used to find
// the object with the maximum amount.
//
// best = current highest sale.
// s    = current sale.
//
// If current sale amount is greater than
// best amount, return current sale.
// Otherwise keep best.
const topSale = sales.reduce(
  (best, s) =>
    s.amount > best.amount
      ? s
      : best,

  // Start with the first sale as the initial best.
  sales[0]
);

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
// 4. NORMALIZE DATA USING MAP
// ------------------------------------------------------------

// map() creates a NEW array.
//
// Each sale is transformed into a new object.
const normalized = sales.map((s) => ({

  // Spread the original sale object.
  //
  // This copies:
  // id
  // region
  // amount
  // items
  //
  // into the new object.
  ...s,

  // Convert the username to lowercase.
  //
  // "Sammit" -> "sammit"
  user: s.user.toLowerCase(),

  // Add a new property containing
  // the number of items in the sale.
  itemCount: s.items.length
}));

// Print the first normalized object.
console.log(
  "4 normalize map sample:",
  normalized[0]
);


// ------------------------------------------------------------
// 5. FLATMAP + SET
// ------------------------------------------------------------

// flatMap() performs:
//
// 1. map()
// 2. flat(1)
//
// Each sale contains an items array.
//
// We want one single array containing
// all products from all sales.
const allItems = sales.flatMap(
  (s) => s.items
);

// Set stores only UNIQUE values.
//
// Example:
//
// ["Mouse", "USB", "Mouse"]
//
// becomes:
//
// Set {"Mouse", "USB"}
//
// Spread converts the Set back into an array.
//
// toSorted() returns a NEW sorted array.
const uniqueItems =
  [...new Set(allItems)]
    .toSorted();

console.log(
  "5 flatMap + Set unique items:",
  uniqueItems
);


// ------------------------------------------------------------
// 6. MULTI-KEY SORT
// ------------------------------------------------------------

// [...sales] creates a copy of the sales array.
//
// This is important because sort()
// normally MUTATES the array.
const sortedMulti = [...sales].sort(
  (a, b) =>

    // First sort by amount DESCENDING.
    //
    // Example:
    // 210 before 150
    b.amount - a.amount

    ||

    // If amounts are equal,
    // sort alphabetically by username.
    //
    // localeCompare() compares strings.
    a.user.localeCompare(b.user)
);

console.log(
  "6 multi-key sort first:",
  sortedMulti[0]
);


// ============================================================
// ADVANCED 3: COMPARISON AND SET OPERATIONS
// ============================================================

section("ADVANCED 3: Comparison and Set Operations");


// Take the first four sales.
const idsA = sales
  .slice(0, 4)

  // Convert each sale into its id.
  .map((s) => s.id);

// Second ID collection.
const idsB = [3, 4, 5, 6, 7];


// ------------------------------------------------------------
// 7. UNION
// ------------------------------------------------------------

// concat() combines the two arrays.
//
// idsA:
// [1,2,3,4]
//
// idsB:
// [3,4,5,6,7]
//
// Combined:
// [1,2,3,4,3,4,5,6,7]
const combinedIds =
  idsA.concat(idsB);

// Set removes duplicate values.
//
// Result:
//
// Set {1,2,3,4,5,6,7}
const uniqueIds =
  new Set(combinedIds);

// Spread converts the Set back into an array.
const union = [...uniqueIds];

console.log(
  "7 union:",
  union
);


// ------------------------------------------------------------
// 8. INTERSECTION
// ------------------------------------------------------------

// filter() keeps values from idsA
// that also exist in idsB.
//
// includes() checks whether the value
// exists in idsB.
//
// idsA = [1,2,3,4]
// idsB = [3,4,5,6,7]
//
// Result:
// [3,4]
const intersection = idsA.filter(
  (id) => idsB.includes(id)
);

console.log(
  "8 intersection:",
  intersection
);


// ------------------------------------------------------------
// 9. DIFFERENCE A - B
// ------------------------------------------------------------

// Keep values from idsA that DO NOT
// exist in idsB.
//
// idsA = [1,2,3,4]
// idsB = [3,4,5,6,7]
//
// Result:
// [1,2]
const difference = idsA.filter(
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
// [1,2,3,4]
//
// chunk(..., 2)
//
// Result:
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

// First create an array containing usernames.
//
// ["Sammit","Maria","Sammit","John","Maria","David"]
const users = sales.map(
  (s) => s.user
);

// Create an array containing amounts.
//
// [120,90,150,75,210,45]
const amounts = sales.map(
  (s) => s.amount
);

// zip() combines values by index.
//
// [
//   ["Sammit",120],
//   ["Maria",90],
//   ...
// ]
console.log(
  "11 zip user+amount:",
  zip(users, amounts)
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
// 13. DEEPLY NESTED ARRAY
// ------------------------------------------------------------

// This array contains multiple levels of nesting.
const nested = [
  1,
  [2, [3, 4], 5],
  [6, [7]]
];

// flattenDeep() recursively removes
// every array level.
//
// Result:
//
// [1,2,3,4,5,6,7]
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
// ["Sammit","Maria","Sammit","John","Maria","David"]
const allUsers = sales.map(
  (s) => s.user
);

// filter() checks each username.
//
// u   = current username.
// i   = current index.
// arr = complete username array.
//
// arr.indexOf(u) returns the FIRST occurrence.
//
// If the first occurrence is NOT the current index,
// then we know this username appeared before.
//
// Example:
//
// ["Sammit","Maria","Sammit"]
//
// At index 2:
//
// indexOf("Sammit") = 0
//
// 0 !== 2 -> duplicate.
const duplicateUsers = [
  ...new Set(
    allUsers.filter(
      (u, i, arr) =>
        arr.indexOf(u) !== i
    )
  )
];

// Set removes duplicate duplicate entries.
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

// reduce() counts how many times
// each item occurs.
const frequency = allItems.reduce(
  (acc, item) => {

    // If item does not exist,
    // start from 0.
    //
    // Then increase the count by 1.
    acc[item] =
      (acc[item] || 0) + 1;

    // Return accumulator.
    return acc;

  // Start with empty object.
  },
  {}
);

console.log(
  "15 frequency map:",
  frequency
);

// Example result:
//
// {
//   Keyboard: 1,
//   Mouse: 2,
//   Monitor: 1,
//   USB: 2,
//   Cable: 1,
//   Laptop: 1,
//   Bag: 1
// }


// ------------------------------------------------------------
// 16. TOP 3 AMOUNTS
// ------------------------------------------------------------

// map() extracts only the sale amounts.
//
// [120,90,150,75,210,45]
//
// toSorted() creates a new sorted array.
//
// b - a means descending:
//
// 210,150,120,90,75,45
//
// slice(0,3) takes the first three values.
const top3Amounts = sales
  .map((s) => s.amount)
  .toSorted((a, b) => b - a)
  .slice(0, 3);

console.log(
  "16 top 3 amounts:",
  top3Amounts
);


// ============================================================
// 17. SOME / EVERY
// ============================================================

// some() returns true when AT LEAST ONE
// element satisfies the condition.
//
// Is any sale greater than 200?
//
// Maria has a sale of 210,
// so this returns true.
const hasLargeDeal = sales.some(
  (s) => s.amount > 200
);


// every() returns true only when ALL
// elements satisfy the condition.
//
// Every sale must contain at least one item.
//
// All sales contain items,
// so this returns true.
const allHaveItems = sales.every(
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
// 18. FILTER -> MAP -> TOSORTED
// ============================================================

// This is a very common interview pattern.
//
// We build a pipeline where the output
// of one method becomes the input
// of the next method.

const pipeline = sales

  // ----------------------------------------------------------
  // STEP 1: FILTER
  // ----------------------------------------------------------
  // Keep only sales with amount >= 90.
  //
  // Original amounts:
  // 120, 90, 150, 75, 210, 45
  //
  // Result:
  // 120, 90, 150, 210
  .filter(
    (s) => s.amount >= 90
  )

  // ----------------------------------------------------------
  // STEP 2: MAP
  // ----------------------------------------------------------
  // Transform each sale into a smaller object.
  //
  // Instead of keeping:
  //
  // {
  //   id,
  //   user,
  //   region,
  //   amount,
  //   items
  // }
  //
  // we keep only:
  //
  // {
  //   user,
  //   amount
  // }
  .map(
    (s) => ({
      user: s.user,
      amount: s.amount
    })
  )

  // ----------------------------------------------------------
  // STEP 3: TOSORTED
  // ----------------------------------------------------------
  // Sort by amount descending.
  //
  // Important:
  // toSorted() returns a NEW array
  // and does not mutate the previous array.
  .toSorted(
    (a, b) => b.amount - a.amount
  );


// Final result:
//
// [
//   { user: "Maria", amount: 210 },
//   { user: "Sammit", amount: 150 },
//   { user: "Sammit", amount: 120 },
//   { user: "Maria", amount: 90 }
// ]
console.log(
  "18 filter -> map -> toSorted:",
  pipeline
);

