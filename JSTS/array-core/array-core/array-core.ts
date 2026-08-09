export {};

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
  skills: string[];
}

const users: User[] = [
  { id: 1, name: "Sammit", age: 39, active: true, skills: ["Angular", "TypeScript"] },
  { id: 2, name: "John", age: 28, active: false, skills: ["React", "JavaScript"] },
  { id: 3, name: "Maria", age: 32, active: true, skills: ["Angular", "RxJS"] },
  { id: 4, name: "David", age: 25, active: false, skills: ["Vue", "JavaScript"] }
];

function section(title: string): void {
  console.log("\n=== " + title + " ===");
}

// filter(): Use when you want a smaller array by condition.
section("filter");
const activeUsers = users.filter((u) => u.active);
console.log("active users:", activeUsers.map((u) => u.name));

// map(): Use when you transform each item into a new value.
section("map");
const names = users.map((u) => u.name);
console.log("names:", names);

// find(): Use when you need the first matching object.
section("find");
const id3 = users.find((u) => u.id === 3);
console.log("id=3:", id3?.name);

// findIndex(): Use when you need the position of first match.
section("findIndex");
const id3Index = users.findIndex((u) => u.id === 3);
console.log("id=3 index:", id3Index);

// some(): Use when at least one item must satisfy the condition.
section("some");
const hasInactive = users.some((u) => !u.active);
console.log("has inactive:", hasInactive);

// every(): Use when all items must satisfy the condition.
section("every");
const allAdults = users.every((u) => u.age >= 18);
console.log("all adults:", allAdults);

// includes(): Use for simple membership checks.
section("includes");
const skills = ["Angular", "TypeScript", "RxJS"];
console.log("includes Angular:", skills.includes("Angular"));

// sort(): Use for ordering; pass a comparator for numbers/objects.
section("sort");
const agesSorted = users.map((u) => u.age).sort((a, b) => a - b);
console.log("ages sorted:", agesSorted);

// reduce(): Use to accumulate array into one value/object.
section("reduce");
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log("total age:", totalAge);

// forEach(): Use for side effects like logging/calling APIs.
section("forEach");
users.forEach((u) => {
  console.log("user:", u.name);
});

// flat(): Use to flatten nested arrays.
section("flat");
const nested: Array<number | number[]> = [1, [2, 3], [4, 5]];
console.log("flat:", nested.flat());

// flatMap(): Use to map and flatten one level in one step.
section("flatMap");
const allSkills = users.flatMap((u) => u.skills);
console.log("all skills:", allSkills);

// slice(): Use to copy/extract without mutation.
section("slice");
const firstTwo = users.slice(0, 2).map((u) => u.name);
console.log("first two users:", firstTwo);

// concat(): Use to combine arrays immutably.
section("concat");
const frontend = ["Angular", "React"];
const backend = ["Node", "DotNet"];
console.log("all stacks:", frontend.concat(backend));

// Set: Use for unique values and fast membership checks.
section("Set");
const uniqueSkills = [...new Set(allSkills)];
const skillSet = new Set(allSkills);
console.log("unique skills:", uniqueSkills);
console.log("set has RxJS:", skillSet.has("RxJS"));
