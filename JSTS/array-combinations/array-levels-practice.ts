export {};

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
  skills: string[];
}

// Main object array used for most method demos.
const users: User[] = [
  { id: 1, name: "Sammit", age: 39, active: true, skills: ["Angular", "TypeScript"] },
  { id: 2, name: "John", age: 28, active: false, skills: ["React", "JavaScript"] },
  { id: 3, name: "Maria", age: 32, active: true, skills: ["Angular", "RxJS"] },
  { id: 4, name: "David", age: 25, active: false, skills: ["Vue", "JavaScript"] }
];

// Same values, different order. Good for array equality checks.
const nod1 = ["sa", "m", "mit"];
// Same values as nod1, reordered.
const nod2 = ["mit", "sa", "m"];
// Duplicate-sensitive sample (two "m").
const nod3 = ["sa", "m", "m"];
// Duplicate-sensitive sample (two "sa").
const nod4 = ["m", "sa", "sa"];

function section(title: string): void {
  console.log("\n" + title);
  console.log("-".repeat(title.length));
}

section("LEVEL 1");

console.log("1 includes():", ["Angular", "React"].includes("Angular"));

const activeUsers = users.filter((u) => u.active);
console.log("2 filter():", activeUsers.map((u) => u.name));

const names = users.map((u) => u.name);
console.log("3 map():", names);

const findMaria = users.find((u) => u.name === "Maria");
console.log("4 find():", findMaria?.name);

const findIndexMaria = users.findIndex((u) => u.name === "Maria");
console.log("5 findIndex():", findIndexMaria);

const hasInactive = users.some((u) => !u.active);
console.log("6 some():", hasInactive);

const allAdults = users.every((u) => u.age >= 18);
console.log("7 every():", allAdults);

section("LEVEL 2");

const sortedAges = users.map((u) => u.age).sort((a, b) => a - b);
console.log("8 sort():", sortedAges);

const reversedNames = [...names].reverse();
console.log("9 reverse():", reversedNames);

const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log("10 reduce():", totalAge);

const uniqueSkills = [...new Set(users.flatMap((u) => u.skills))];
console.log("11 Set:", uniqueSkills);

// Primitive array designed for duplicate/frequency examples.
const arrDup = ["a", "b", "b", "c", "a"];
const duplicates = [...new Set(arrDup.filter((v, i, arr) => arr.indexOf(v) !== i))];
console.log("12 duplicates:", duplicates);

const frequency = arrDup.reduce<Record<string, number>>((acc, v) => {
  acc[v] = (acc[v] || 0) + 1;
  return acc;
}, {});
console.log("13 frequency/count:", frequency);

// Nested array used by flat().
const nested: Array<number | number[]> = [1, [2, 3], [4, 5]];
console.log("14 flat():", nested.flat());

const allSkills = users.flatMap((u) => u.skills);
console.log("15 flatMap():", allSkills);

section("LEVEL 3");

// Order-insensitive compare for primitive arrays.
function compareArraysSorted(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  const s1 = [...arr1].sort();
  const s2 = [...arr2].sort();
  return s1.every((v, i) => v === s2[i]);
}

// Compare value counts to detect duplicate mismatches.
function compareArrayDuplicates(arr1: string[], arr2: string[]): boolean {
  const count = (arr: string[]): Record<string, number> =>
    arr.reduce<Record<string, number>>((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  return JSON.stringify(count(arr1)) === JSON.stringify(count(arr2));
}

// Values present in both arrays.
function commonValues(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1.filter((x) => arr2.includes(x)))];
}

// Values from fromArr that do not exist in checkArr.
function missingValues(fromArr: string[], checkArr: string[]): string[] {
  return fromArr.filter((x) => !checkArr.includes(x));
}

// All unique values from both arrays.
function union(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1.concat(arr2))];
}

// Shared unique values between arrays.
function intersection(arr1: string[], arr2: string[]): string[] {
  return [...new Set(arr1)].filter((x) => arr2.includes(x));
}

// Values in arr1 that are not present in arr2.
function difference(arr1: string[], arr2: string[]): string[] {
  return arr1.filter((x) => !arr2.includes(x));
}

console.log("16 Compare arrays:", compareArraysSorted(nod1, nod2));
console.log("17 Compare duplicates:", compareArrayDuplicates(nod3, nod4));
console.log("18 Common values:", commonValues(nod1, nod2));
console.log("19 Missing values (nod1 vs nod2):", missingValues(nod1, nod2));
console.log("20 Union:", union(nod1, nod4));
console.log("21 Intersection:", intersection(nod1, nod2));
console.log("22 Difference (nod4 - nod1):", difference(nod4, nod1));

section("LEVEL 4 (BONUS)");

// 23) Modern immutable alternatives.
const baseNums = [30, 10, 20];
console.log("23 toSorted():", baseNums.toSorted((a, b) => a - b), "original:", baseNums);
console.log("24 toReversed():", baseNums.toReversed(), "original:", baseNums);
console.log("25 toSpliced(1,1,99):", baseNums.toSpliced(1, 1, 99), "original:", baseNums);
console.log("26 with(1,99):", baseNums.with(1, 99), "original:", baseNums);

// 27) findLast and findLastIndex.
const lastActive = users.findLast((u) => u.active);
const lastActiveIndex = users.findLastIndex((u) => u.active);
console.log("27 findLast active:", lastActive?.name);
console.log("28 findLastIndex active:", lastActiveIndex);

// 29) Mutation vs non-mutation quick checks.
const mutA = [1, 2, 3];
const mutB = [1, 2, 3];
mutA.reverse();
const nonMut = mutB.toReversed();
console.log("29 reverse mutates original:", mutA);
console.log("30 toReversed keeps original:", mutB, "new:", nonMut);

// 31) Short-circuit demo for some/every.
const shortNums = [1, 2, 3, 4, 5];
let someChecks = 0;
const someResult = shortNums.some((n) => {
  someChecks++;
  return n > 2;
});
let everyChecks = 0;
const everyResult = shortNums.every((n) => {
  everyChecks++;
  return n < 4;
});
console.log("31 some() short-circuit:", someResult, "checks:", someChecks);
console.log("32 every() short-circuit:", everyResult, "checks:", everyChecks);

// 33) Compare object arrays by id (order-insensitive).
type Item = { id: number };
const teamA: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
const teamB: Item[] = [{ id: 3 }, { id: 1 }, { id: 2 }];
function compareObjectArraysById(arr1: Item[], arr2: Item[]): boolean {
  if (arr1.length !== arr2.length) return false;
  const ids1 = arr1.map((x) => x.id).toSorted((a, b) => a - b);
  const ids2 = arr2.map((x) => x.id).toSorted((a, b) => a - b);
  return ids1.every((id, i) => id === ids2[i]);
}
console.log("33 Compare object arrays by id:", compareObjectArraysById(teamA, teamB));

// 34) Array.fromAsync compatibility demo.
async function demoFromAsync(): Promise<void> {
  async function* source(): AsyncGenerator<string, void, unknown> {
    yield "A";
    yield "B";
    yield "C";
  }

  const fromAsync = (
    Array as ArrayConstructor & {
      fromAsync?: <T>(items: AsyncIterable<T> | Iterable<T | PromiseLike<T>>) => Promise<T[]>;
    }
  ).fromAsync;

  if (fromAsync) {
    const result = await fromAsync(source());
    console.log("34 Array.fromAsync:", result);
  } else {
    console.log("34 Array.fromAsync: not available in this runtime");
  }
}

void demoFromAsync();
