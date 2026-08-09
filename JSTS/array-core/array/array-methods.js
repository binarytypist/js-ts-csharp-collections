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

function section(title) {
  console.log("\n=== " + title + " ===");
}

function check(label, condition) {
  if (condition) {
    console.log("PASS:", label);
  } else {
    console.log("FAIL:", label);
  }
}

function sameArray(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// map transforms each element and returns a new array.
section("map");
const originalUsersRef = users;
const names = users.map((user) => user.name);
const ages = users.map((user) => user.age);
console.log("names:", names);
console.log("ages:", ages);
check("map names", sameArray(names, ["Sammit", "John", "Maria", "David"]));
check("map ages", sameArray(ages, [39, 28, 32, 25]));
check("map does not replace original array", originalUsersRef === users);
check("map returns new array", names !== users);

// Spread with objects is a shallow copy: array is new, nested objects are shared.
section("shallow copy with spread");
const shallowUsers = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" }
];
const shallowCopy = [...shallowUsers];
check("spread creates new array", shallowCopy !== shallowUsers);
check("spread keeps object references", shallowCopy[0] === shallowUsers[0]);
shallowCopy[0].name = "Changed";
check("editing copied object affects original object", shallowUsers[0].name === "Changed");

// filter keeps only elements that match a condition.
section("filter");
const activeUsers = users.filter((user) => user.active);
const adults = users.filter((user) => user.age >= 30);
console.log("active users:", activeUsers.map((u) => u.name));
console.log("adults:", adults.map((u) => u.name));
check("filter active", sameArray(activeUsers.map((u) => u.name), ["Sammit", "Maria"]));
check("filter adults", sameArray(adults.map((u) => u.name), ["Sammit", "Maria"]));

// find returns first match, findIndex returns its index.
section("find / findIndex");
const userById3 = users.find((user) => user.id === 3);
const indexById3 = users.findIndex((user) => user.id === 3);
console.log("find id=3:", userById3?.name);
console.log("findIndex id=3:", indexById3);
check("find id=3", userById3?.name === "Maria");
check("findIndex id=3", indexById3 === 2);

// findLast and findLastIndex search from the end.
section("findLast / findLastIndex");
const lastAgeOver25 = users.findLast((user) => user.age > 25);
const lastIndexAgeOver25 = users.findLastIndex((user) => user.age > 25);
console.log("findLast age>25:", lastAgeOver25?.name);
console.log("findLastIndex age>25:", lastIndexAgeOver25);
check("findLast age>25", lastAgeOver25?.name === "Maria");
check("findLastIndex age>25", lastIndexAgeOver25 === 2);

// some checks at least one match; every checks all match.
section("some / every");
const hasAgeOver35 = users.some((user) => user.age > 35);
const allAdults = users.every((user) => user.age >= 18);
console.log("some age>35:", hasAgeOver35);
console.log("every age>=18:", allAdults);
check("some age>35", hasAgeOver35 === true);
check("every age>=18", allAdults === true);

// forEach runs side effects and returns undefined.
section("forEach");
const foreachNames = [];
users.forEach((user) => {
  foreachNames.push(user.name);
});
console.log("forEach names:", foreachNames);
check("forEach iteration", sameArray(foreachNames, ["Sammit", "John", "Maria", "David"]));

// reduce accumulates to one value; reduceRight does it from right to left.
section("reduce / reduceRight");
const totalAge = users.reduce((total, user) => total + user.age, 0);
const usersById = users.reduce((result, user) => {
  result[user.id] = user;
  return result;
}, {});
const reverseLetters = ["A", "B", "C"].reduceRight((acc, v) => acc + v, "");
console.log("totalAge:", totalAge);
console.log("usersById[3]:", usersById[3].name);
console.log("reduceRight letters:", reverseLetters);
check("reduce totalAge", totalAge === 124);
check("reduce object", usersById[3].name === "Maria");
check("reduceRight", reverseLetters === "CBA");

// Membership and position helpers on arrays.
section("includes / indexOf / lastIndexOf / at");
const numbers = [10, 20, 30, 20];
console.log("includes 20:", numbers.includes(20));
console.log("indexOf 20:", numbers.indexOf(20));
console.log("lastIndexOf 20:", numbers.lastIndexOf(20));
console.log("at(0):", numbers.at(0));
console.log("at(-1):", numbers.at(-1));
check("includes", numbers.includes(20) === true);
check("indexOf", numbers.indexOf(20) === 1);
check("lastIndexOf", numbers.lastIndexOf(20) === 3);
check("at", numbers.at(-1) === 20);

// slice copies without mutation; splice mutates; toSpliced is immutable.
section("slice / splice / toSpliced");
const sliceNumbers = [10, 20, 30, 40, 50];
const sliced = sliceNumbers.slice(1, 4);
console.log("slice(1,4):", sliced);
const spliceNumbers = [10, 20, 30, 40];
spliceNumbers.splice(1, 2);
console.log("after splice(1,2):", spliceNumbers);
const toSplicedNumbers = [10, 20, 30, 40];
const immutableSplice = toSplicedNumbers.toSpliced(1, 2);
console.log("toSpliced(1,2):", immutableSplice);
console.log("original after toSpliced:", toSplicedNumbers);
check("slice", sameArray(sliced, [20, 30, 40]));
check("splice", sameArray(spliceNumbers, [10, 40]));
check("toSpliced result", sameArray(immutableSplice, [10, 40]));
check("toSpliced immutable", sameArray(toSplicedNumbers, [10, 20, 30, 40]));

// concat and spread combine arrays into new arrays.
section("concat / spread");
const a = [1, 2];
const b = [3, 4];
const concatted = a.concat(b);
const spreaded = [...a, ...b];
console.log("concat:", concatted);
console.log("spread:", spreaded);
check("concat", sameArray(concatted, [1, 2, 3, 4]));
check("spread", sameArray(spreaded, [1, 2, 3, 4]));

// flat flattens nested arrays; flatMap maps then flattens one level.
section("flat / flatMap / join");
const values = [1, [2, 3], [4, 5]];
const flattened = values.flat();
const allSkills = users.flatMap((user) => user.skills);
const joined = ["Angular", "TypeScript", "RxJS"].join(", ");
console.log("flat:", flattened);
console.log("flatMap skills:", allSkills);
console.log("join:", joined);
check("flat", sameArray(flattened, [1, 2, 3, 4, 5]));
check("flatMap length", allSkills.length === 8);
check("join", joined === "Angular, TypeScript, RxJS");

// reverse mutates; toReversed returns a new reversed array.
section("reverse / toReversed");
const reverseNumbers = [1, 2, 3];
reverseNumbers.reverse();
const immutableReverseSource = [1, 2, 3];
const immutableReversed = immutableReverseSource.toReversed();
console.log("reverse mutates:", reverseNumbers);
console.log("toReversed:", immutableReversed);
console.log("original after toReversed:", immutableReverseSource);
check("reverse", sameArray(reverseNumbers, [3, 2, 1]));
check("toReversed", sameArray(immutableReversed, [3, 2, 1]));
check("toReversed immutable", sameArray(immutableReverseSource, [1, 2, 3]));

// sort mutates in place; toSorted returns a new sorted array.
section("sort / toSorted");
const sortNumbers = [30, 10, 20];
sortNumbers.sort((x, y) => x - y);
const sortedUsersByAge = users.toSorted((x, y) => x.age - y.age);
console.log("sort mutates:", sortNumbers);
console.log("toSorted users by age:", sortedUsersByAge.map((u) => u.name + "(" + u.age + ")"));
check("sort", sameArray(sortNumbers, [10, 20, 30]));
check("toSorted", sameArray(sortedUsersByAge.map((u) => u.id), [4, 2, 3, 1]));

// with replaces one index immutably.
section("with");
const withNumbers = [10, 20, 30];
const withResult = withNumbers.with(1, 99);
console.log("with(1,99):", withResult);
console.log("original:", withNumbers);
check("with result", sameArray(withResult, [10, 99, 30]));
check("with immutable", sameArray(withNumbers, [10, 20, 30]));

// push/pop/shift/unshift mutate by adding/removing edges.
section("push / pop / shift / unshift");
const queue = [2, 3];
queue.unshift(1);
queue.push(4);
const popped = queue.pop();
const shifted = queue.shift();
console.log("popped:", popped, "shifted:", shifted, "remaining:", queue);
check("push/pop/shift/unshift", popped === 4 && shifted === 1 && sameArray(queue, [2, 3]));

// fill overwrites values; copyWithin copies part of array into itself.
section("fill / copyWithin");
const fillNumbers = [1, 2, 3, 4, 5];
fillNumbers.fill(0, 1, 4);
const copyWithinNumbers = [1, 2, 3, 4, 5];
copyWithinNumbers.copyWithin(0, 3);
console.log("fill:", fillNumbers);
console.log("copyWithin:", copyWithinNumbers);
check("fill", sameArray(fillNumbers, [1, 0, 0, 0, 5]));
check("copyWithin", sameArray(copyWithinNumbers, [4, 5, 3, 4, 5]));

// entries/keys/values provide iterators for index-value data.
section("entries / keys / values");
const entryList = [...["Sammit", "John", "Maria"].entries()];
const keyList = [...users.keys()];
const valueList = [...users.values()].map((u) => u.name);
console.log("entries:", entryList);
console.log("keys:", keyList);
console.log("values:", valueList);
check("entries", sameArray(entryList, [[0, "Sammit"], [1, "John"], [2, "Maria"]]));
check("keys", sameArray(keyList, [0, 1, 2, 3]));
check("values", sameArray(valueList, ["Sammit", "John", "Maria", "David"]));

// Static helpers create and detect arrays.
section("Array static methods");
const fromWord = Array.from("Angular");
const fromLen = Array.from({ length: 5 }, (_, i) => i + 1);
const ofList = Array.of(1, 2, 3);
console.log("Array.isArray(users):", Array.isArray(users));
console.log("Array.from:", fromWord);
console.log("Array.from length:", fromLen);
console.log("Array.of:", ofList);
check("Array.isArray", Array.isArray(users) === true);
check("Array.from", sameArray(fromWord, ["A", "n", "g", "u", "l", "a", "r"]));
check("Array.of", sameArray(ofList, [1, 2, 3]));

// for...of supports break/continue and works naturally with async code.
section("for...of with break");
const seenNames = [];
for (const user of users) {
  if (user.id === 3) {
    break;
  }
  seenNames.push(user.name);
}
console.log("seen before break:", seenNames);
check("for...of break", sameArray(seenNames, ["Sammit", "John"]));

// Array.fromAsync consumes async iterables into an array.
section("Array.fromAsync");
async function demoFromAsync() {
  async function* source() {
    yield 1;
    yield 2;
    yield 3;
  }

  if (typeof Array.fromAsync === "function") {
    const asyncValues = await Array.fromAsync(source());
    console.log("Array.fromAsync:", asyncValues);
    check("Array.fromAsync", sameArray(asyncValues, [1, 2, 3]));
  } else {
    console.log("Array.fromAsync is not available in this runtime.");
  }
}

void demoFromAsync();
