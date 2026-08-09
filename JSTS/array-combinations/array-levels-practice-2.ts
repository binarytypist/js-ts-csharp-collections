export {};

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
}

// Another dataset to practice the same Level 1-3 methods with different values.
const products: Product[] = [
  { id: 101, name: "Keyboard", price: 45, inStock: true, tags: ["hardware", "input"] },
  { id: 102, name: "Mouse", price: 25, inStock: true, tags: ["hardware", "input"] },
  { id: 103, name: "Monitor", price: 180, inStock: false, tags: ["hardware", "display"] },
  { id: 104, name: "USB Cable", price: 10, inStock: true, tags: ["accessory", "cable"] }
];

// Arrays for compare/union/intersection/difference demos.
const codeA = ["kb", "ms", "mn"];
const codeB = ["mn", "kb", "ms"];
const codeC = ["kb", "ms", "ms"];
const codeD = ["ms", "kb", "kb"];

function section(title: string): void {
  console.log("\n" + title);
  console.log("-".repeat(title.length));
}

section("LEVEL 1");

console.log("1 includes():", ["hardware", "software"].includes("hardware"));

const inStockProducts = products.filter((p) => p.inStock);
console.log("2 filter():", inStockProducts.map((p) => p.name));

const productNames = products.map((p) => p.name);
console.log("3 map():", productNames);

const findMonitor = products.find((p) => p.name === "Monitor");
console.log("4 find():", findMonitor?.name);

const findIndexMonitor = products.findIndex((p) => p.name === "Monitor");
console.log("5 findIndex():", findIndexMonitor);

const hasExpensive = products.some((p) => p.price > 150);
console.log("6 some():", hasExpensive);

const allPositivePrice = products.every((p) => p.price > 0);
console.log("7 every():", allPositivePrice);

section("LEVEL 2");

const sortedPrices = products.map((p) => p.price).sort((a, b) => a - b);
console.log("8 sort():", sortedPrices);

const reversedProductNames = [...productNames].reverse();
console.log("9 reverse():", reversedProductNames);

const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
console.log("10 reduce():", totalPrice);

const uniqueTags = [...new Set(products.flatMap((p) => p.tags))];
console.log("11 Set:", uniqueTags);

const letters = ["x", "y", "x", "z", "y", "y"];
const duplicateLetters = [...new Set(letters.filter((v, i, arr) => arr.indexOf(v) !== i))];
console.log("12 duplicates:", duplicateLetters);

const letterFrequency = letters.reduce<Record<string, number>>((acc, v) => {
  acc[v] = (acc[v] || 0) + 1;
  return acc;
}, {});
console.log("13 frequency/count:", letterFrequency);

const nestedNumbers: Array<number | number[] | Array<number>> = [1, [2, 3], [4, [5]]];
console.log("14 flat():", nestedNumbers.flat(2));

const allTags = products.flatMap((p) => p.tags);
console.log("15 flatMap():", allTags);

section("LEVEL 3");

function compareArrays(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  const s1 = [...arr1].sort();
  const s2 = [...arr2].sort();
  return s1.every((v, i) => v === s2[i]);
}

function compareDuplicates(arr1: string[], arr2: string[]): boolean {
  const toFreq = (arr: string[]): Record<string, number> =>
    arr.reduce<Record<string, number>>((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  return JSON.stringify(toFreq(arr1)) === JSON.stringify(toFreq(arr2));
}

function commonValues(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1.filter((x) => arr2.includes(x)))];
}

function missingValues(fromArr: string[], checkArr: string[]): string[] {
  return fromArr.filter((x) => !checkArr.includes(x));
}

function union(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1.concat(arr2))];
}

function intersection(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1)].filter((x) => arr2.includes(x));
}

function difference(arr1: string[], arr2: string[]): string[] {
  return arr1.filter((x) => !arr2.includes(x));
}

console.log("16 Compare arrays:", compareArrays(codeA, codeB));
console.log("17 Compare duplicates:", compareDuplicates(codeC, codeD));
console.log("18 Common values:", commonValues(codeA, codeB));
console.log("19 Missing values (codeA vs codeB):", missingValues(codeA, codeB));
console.log("20 Union:", union(codeA, codeD));
console.log("21 Intersection:", intersection(codeA, codeB));
console.log("22 Difference (codeD - codeA):", difference(codeD, codeA));
