export {};

/*
  ============================================================
  PRODUCT INTERFACE
  ============================================================

  TypeScript interface defines the structure of a Product object.

  Every Product must have:
  - id       -> number
  - name     -> string
  - price    -> number
  - inStock  -> boolean
  - tags     -> array of strings
*/

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
}


/*
  ============================================================
  PRODUCT DATASET
  ============================================================

  Product[] means:
  "products must be an array containing Product objects."
*/

const products: Product[] = [
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


/*
  ============================================================
  ARRAYS FOR LEVEL 3
  ============================================================

  These arrays are used to practice:

  - Comparing arrays
  - Finding common values
  - Finding missing values
  - Union
  - Intersection
  - Difference
  - Handling duplicates
*/

const codeA = ["kb", "ms", "mn"];
const codeB = ["mn", "kb", "ms"];

const codeC = ["kb", "ms", "ms"];
const codeD = ["ms", "kb", "kb"];


/*
  ============================================================
  HELPER FUNCTION
  ============================================================

  This function creates a nice console section.

  Example:

  section("LEVEL 1");

  Output:

  LEVEL 1
  -------
*/

function section(title: string): void {
  console.log("\n" + title);

  // "-".repeat(7) creates:
  // -------
  console.log("-".repeat(title.length));
}


/*
  ============================================================
  LEVEL 1
  BASIC ARRAY METHODS
  ============================================================
*/

section("LEVEL 1");


/*
  ------------------------------------------------------------
  1. includes()
  ------------------------------------------------------------

  includes() checks whether an array contains a particular value.

  Returns:
    true  -> value exists
    false -> value does not exist

  Here "hardware" exists in the array.
*/

console.log(
  "1 includes():",
  ["hardware", "software"].includes("hardware")
);


/*
  ------------------------------------------------------------
  2. filter()
  ------------------------------------------------------------

  filter() creates a NEW array containing elements
  that satisfy the condition.

  Here we want only products that are in stock.

  p.inStock:
    true  -> product is included
    false -> product is removed
*/

const inStockProducts = products.filter((p) => p.inStock);

console.log(
  "2 filter():",
  inStockProducts.map((p) => p.name)
);


/*
  ------------------------------------------------------------
  3. map()
  ------------------------------------------------------------

  map() transforms every element into something else.

  Product object:

    {
      id: 101,
      name: "Keyboard",
      ...
    }

  becomes:

    "Keyboard"

  Result:

    ["Keyboard", "Mouse", "Monitor", "USB Cable"]
*/

const productNames = products.map((p) => p.name);

console.log(
  "3 map():",
  productNames
);


/*
  ------------------------------------------------------------
  4. find()
  ------------------------------------------------------------

  find() returns the FIRST element that satisfies
  the condition.

  Here we search for the product named "Monitor".

  Result:

    { id: 103, name: "Monitor", ... }

  If nothing is found, find() returns undefined.
*/

const findMonitor = products.find(
  (p) => p.name === "Monitor"
);


/*
  ?. is optional chaining.

  If findMonitor exists:
      findMonitor.name

  If findMonitor is undefined:
      undefined

  This prevents an error.
*/

console.log(
  "4 find():",
  findMonitor?.name
);


/*
  ------------------------------------------------------------
  5. findIndex()
  ------------------------------------------------------------

  findIndex() returns the INDEX of the first element
  that satisfies the condition.

  Array indexes start at 0.

  products:

    0 -> Keyboard
    1 -> Mouse
    2 -> Monitor
    3 -> USB Cable

  Therefore:

    Monitor -> 2

  If nothing is found, findIndex() returns -1.
*/

const findIndexMonitor = products.findIndex(
  (p) => p.name === "Monitor"
);

console.log(
  "5 findIndex():",
  findIndexMonitor
);


/*
  ------------------------------------------------------------
  6. some()
  ------------------------------------------------------------

  some() checks whether AT LEAST ONE element
  satisfies the condition.

  Question:

    "Is there at least one product costing more than 150?"

  Monitor costs 180.

  Therefore:

    true
*/

const hasExpensive = products.some(
  (p) => p.price > 150
);

console.log(
  "6 some():",
  hasExpensive
);


/*
  ------------------------------------------------------------
  7. every()
  ------------------------------------------------------------

  every() checks whether ALL elements
  satisfy the condition.

  Question:

    "Does every product have a price greater than 0?"

  All products have positive prices.

  Therefore:

    true
*/

const allPositivePrice = products.every(
  (p) => p.price > 0
);

console.log(
  "7 every():",
  allPositivePrice
);


/*
  ============================================================
  LEVEL 2
  INTERMEDIATE ARRAY METHODS
  ============================================================
*/

section("LEVEL 2");


/*
  ------------------------------------------------------------
  8. sort()
  ------------------------------------------------------------

  First map() extracts only the prices:

    [45, 25, 180, 10]

  Then sort() sorts them numerically.

  IMPORTANT:

  JavaScript's default sort() converts values to strings.

  Therefore for numbers we normally use:

    sort((a, b) => a - b)

  Result:

    [10, 25, 45, 180]
*/

const sortedPrices = products
  .map((p) => p.price)
  .sort((a, b) => a - b);

console.log(
  "8 sort():",
  sortedPrices
);


/*
  ------------------------------------------------------------
  9. reverse()
  ------------------------------------------------------------

  reverse() reverses an array.

  productNames:

    ["Keyboard", "Mouse", "Monitor", "USB Cable"]

  becomes:

    ["USB Cable", "Monitor", "Mouse", "Keyboard"]

  IMPORTANT:

  reverse() MUTATES the array.

  We use [...productNames] to create a copy first,
  so the original productNames array is not changed.
*/

const reversedProductNames = [
  ...productNames
].reverse();

console.log(
  "9 reverse():",
  reversedProductNames
);


/*
  ------------------------------------------------------------
  10. reduce()
  ------------------------------------------------------------

  reduce() is used when we want to reduce an array
  to ONE final value.

  Here we calculate the total price.

  Prices:

    45 + 25 + 180 + 10

  Result:

    260

  sum = accumulator
  p   = current product

  The second argument, 0, is the initial value of sum.
*/

const totalPrice = products.reduce(
  (sum, p) => sum + p.price,
  0
);

console.log(
  "10 reduce():",
  totalPrice
);


/*
  ------------------------------------------------------------
  11. Set
  ------------------------------------------------------------

  Set stores UNIQUE values.

  First:

    products.flatMap((p) => p.tags)

  produces:

    [
      "hardware",
      "input",
      "hardware",
      "input",
      "hardware",
      "display",
      "accessory",
      "cable"
    ]

  new Set(...) removes duplicates.

  Then [...new Set(...)] converts the Set back into an array.

  Result:

    [
      "hardware",
      "input",
      "display",
      "accessory",
      "cable"
    ]
*/

const uniqueTags = [
  ...new Set(
    products.flatMap((p) => p.tags)
  )
];

console.log(
  "11 Set():",
  uniqueTags
);


/*
  ------------------------------------------------------------
  12. Find duplicate values
  ------------------------------------------------------------

  Input:

    ["x", "y", "x", "z", "y", "y"]

  We want:

    ["x", "y"]

  Let's understand:

    arr.indexOf(v)

  returns the position where the value first appears.

  If the current index is different from the first index,
  then we know that this value is a duplicate.

  Example:

    ["x", "y", "x"]

    index 0 -> x
    index 1 -> y
    index 2 -> x

  For the second "x":

    arr.indexOf("x") === 0
    current index === 2

  Since 0 !== 2, it is a duplicate.

  Finally Set removes duplicate duplicate-results.
*/

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
      (v, i, arr) => arr.indexOf(v) !== i
    )
  )
];

console.log(
  "12 duplicates:",
  duplicateLetters
);


/*
  ------------------------------------------------------------
  13. Frequency / Count
  ------------------------------------------------------------

  We want to count how many times each letter appears.

  Input:

    ["x", "y", "x", "z", "y", "y"]

  Expected:

    {
      x: 2,
      y: 3,
      z: 1
    }

  reduce() is perfect for this.

  acc = accumulator object

  v = current value

  First "x":

    acc["x"] is undefined

    (undefined || 0) + 1

    => 1

  Second "x":

    acc["x"] is 1

    1 + 1

    => 2
*/

const letterFrequency = letters.reduce<
  Record<string, number>
>(
  (acc, v) => {

    // If the value does not exist, start at 0.
    // Then increase it by 1.
    acc[v] = (acc[v] || 0) + 1;

    return acc;
  },
  {}
);

console.log(
  "13 frequency/count:",
  letterFrequency
);


/*
  ------------------------------------------------------------
  14. flat()
  ------------------------------------------------------------

  flat() removes nested arrays.

  Input:

    [
      1,
      [2, 3],
      [4, [5]]
    ]

  flat(1):

    [1, 2, 3, 4, [5]]

  flat(2):

    [1, 2, 3, 4, 5]

  The number passed to flat() is the depth.

  Here we use depth = 2.
*/

const nestedNumbers:
  Array<number | number[] | Array<number>> = [
    1,
    [2, 3],
    [4, [5]]
  ];

console.log(
  "14 flat():",
  nestedNumbers.flat(2)
);


/*
  ------------------------------------------------------------
  15. flatMap()
  ------------------------------------------------------------

  flatMap() is basically:

    map() + flat(1)

  Every product contains a tags array.

  map() would produce:

    [
      ["hardware", "input"],
      ["hardware", "input"],
      ["hardware", "display"],
      ["accessory", "cable"]
    ]

  flatMap() directly produces:

    [
      "hardware",
      "input",
      "hardware",
      "input",
      "hardware",
      "display",
      "accessory",
      "cable"
    ]
*/

const allTags = products.flatMap(
  (p) => p.tags
);

console.log(
  "15 flatMap():",
  allTags
);


/*
  ============================================================
  LEVEL 3
  ARRAY COMPARISON / SET OPERATIONS
  ============================================================
*/

section("LEVEL 3");


/*
  ------------------------------------------------------------
  16. Compare arrays ignoring order
  ------------------------------------------------------------

  Example:

    ["kb", "ms", "mn"]
    ["mn", "kb", "ms"]

  These arrays contain the same values,
  but their order is different.

  Expected:

    true

  Strategy:

    1. Check length.
    2. Copy both arrays.
    3. Sort both arrays.
    4. Compare every element.

  IMPORTANT:

  [...arr1] creates a copy.

  This prevents sort() from changing the original array.
*/

function compareArrays(
  arr1: string[],
  arr2: string[]
): boolean {

  /*
    If lengths are different, they cannot contain
    exactly the same elements.
  */
  if (arr1.length !== arr2.length) {
    return false;
  }


  /*
    Copy and sort both arrays.

    Example:

      ["kb", "ms", "mn"]
              ↓ sort
      ["kb", "mn", "ms"]

      ["mn", "kb", "ms"]
              ↓ sort
      ["kb", "mn", "ms"]
  */
  const s1 = [...arr1].sort();
  const s2 = [...arr2].sort();


  /*
    every() checks whether every element
    has the same value at the same index.
  */

  return s1.every(
    (v, i) => v === s2[i]
  );
}


/*
  ------------------------------------------------------------
  17. Compare arrays INCLUDING duplicates
  ------------------------------------------------------------

  This is different from compareArrays().

  Example:

    ["kb", "ms", "ms"]

  and:

    ["ms", "kb", "kb"]

  contain the same UNIQUE values:

    kb
    ms

  But their number of occurrences is different.

  First array:

    kb -> 1
    ms -> 2

  Second array:

    kb -> 2
    ms -> 1

  Therefore:

    false
*/


function compareDuplicates(
  arr1: string[],
  arr2: string[]
): boolean {

  /*
    Helper function that converts an array
    into a frequency object.

    Example:

      ["kb", "ms", "ms"]

    becomes:

      {
        kb: 1,
        ms: 2
      }
  */

  const toFreq = (
    arr: string[]
  ): Record<string, number> => {

    return arr.reduce<
      Record<string, number>
    >(
      (acc, item) => {

        acc[item] =
          (acc[item] || 0) + 1;

        return acc;
      },
      {}
    );
  };


  /*
    Create frequency objects for both arrays
    and compare them.
  */

  return JSON.stringify(
    toFreq(arr1)
  ) === JSON.stringify(
    toFreq(arr2)
  );
}


/*
  ------------------------------------------------------------
  18. Common values / Intersection
  ------------------------------------------------------------

  Find values that exist in BOTH arrays.

  Example:

    codeA = ["kb", "ms", "mn"]
    codeB = ["mn", "kb", "ms"]

  All three values are common.

  Result:

    ["kb", "ms", "mn"]

  Set is used to make sure the result contains
  unique values.
*/

function commonValues(
  arr1: string[],
  arr2: string[]
): string[] {

  return [
    ...new Set(
      arr1.filter(
        (x) => arr2.includes(x)
      )
    )
  ];
}


/*
  ------------------------------------------------------------
  19. Missing values
  ------------------------------------------------------------

  Find values that exist in fromArr
  but DO NOT exist in checkArr.

  Example:

    fromArr  = ["a", "b", "c"]
    checkArr = ["a", "b"]

  Result:

    ["c"]
*/

function missingValues(
  fromArr: string[],
  checkArr: string[]
): string[] {

  return fromArr.filter(
    (x) => !checkArr.includes(x)
  );
}


/*
  ------------------------------------------------------------
  20. Union
  ------------------------------------------------------------

  Union means:

    "All unique values from both arrays."

  Example:

    ["a", "b"]
    ["b", "c"]

  Union:

    ["a", "b", "c"]

  concat() joins the arrays.

  Set removes duplicates.
*/

function union(
  arr1: string[],
  arr2: string[]
): string[] {

  return [
    ...new Set(
      arr1.concat(arr2)
    )
  ];
}


/*
  ------------------------------------------------------------
  21. Intersection
  ------------------------------------------------------------

  Intersection means:

    "Values that exist in BOTH arrays."

  Example:

    ["a", "b", "c"]
    ["b", "c", "d"]

  Intersection:

    ["b", "c"]

  Again, Set is used to remove duplicates
  from the first array.
*/

function intersection(
  arr1: string[],
  arr2: string[]
): string[] {

  return [
    ...new Set(arr1)
  ].filter(
    (x) => arr2.includes(x)
  );
}


/*
  ------------------------------------------------------------
  22. Difference
  ------------------------------------------------------------

  Difference means:

    "Values that exist in arr1
     but NOT in arr2."

  Example:

    arr1 = ["a", "b", "c"]
    arr2 = ["a", "b"]

  Difference:

    ["c"]
*/

function difference(
  arr1: string[],
  arr2: string[]
): string[] {

  return arr1.filter(
    (x) => !arr2.includes(x)
  );
}


/*
  ============================================================
  RUNNING THE LEVEL 3 EXAMPLES
  ============================================================
*/


/*
  16.

  codeA:

    ["kb", "ms", "mn"]

  codeB:

    ["mn", "kb", "ms"]

  Same values, different order.

  Result:

    true
*/

console.log(
  "16 Compare arrays:",
  compareArrays(codeA, codeB)
);


/*
  17.

  codeC:

    ["kb", "ms", "ms"]

  codeD:

    ["ms", "kb", "kb"]

  Same unique values, but different frequencies.

  Result:

    false
*/

console.log(
  "17 Compare duplicates:",
  compareDuplicates(codeC, codeD)
);


/*
  18. Common values

  Values existing in both codeA and codeB.

  Result:

    ["kb", "ms", "mn"]
*/

console.log(
  "18 Common values:",
  commonValues(codeA, codeB)
);


/*
  19. Missing values

  Find values in codeA that are NOT in codeB.

  Since codeA and codeB contain the same values:

    []

  Result:

    []
*/

console.log(
  "19 Missing values (codeA vs codeB):",
  missingValues(codeA, codeB)
);


/*
  20. Union

  Combine codeA and codeD and remove duplicates.

  codeA:

    ["kb", "ms", "mn"]

  codeD:

    ["ms", "kb", "kb"]

  Result:

    ["kb", "ms", "mn"]
*/

console.log(
  "20 Union:",
  union(codeA, codeD)
);


/*
  21. Intersection

  Find values existing in both codeA and codeB.

  Result:

    ["kb", "ms", "mn"]
*/

console.log(
  "21 Intersection:",
  intersection(codeA, codeB)
);


/*
  22. Difference

  Find values that exist in codeD
  but NOT in codeA.

  codeD:

    ["ms", "kb", "kb"]

  codeA:

    ["kb", "ms", "mn"]

  Every value from codeD also exists in codeA.

  Therefore:

    []
*/

console.log(
  "22 Difference (codeD - codeA):",
  difference(codeD, codeA)
);