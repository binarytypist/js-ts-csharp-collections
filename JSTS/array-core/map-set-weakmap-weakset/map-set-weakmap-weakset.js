// Map / Set / WeakMap / WeakSet example in JavaScript

// 1) Map: stores key-value pairs and keeps insertion order
const userScores = new Map();
userScores.set("Alice", 95);
userScores.set("Bob", 88);
userScores.set("Alice", 97); // overwrite Alice's old score

// 2) Set: stores unique values only
const uniqueTags = new Set(["frontend", "backend", "frontend", "devops"]);

// 3) WeakMap: stores private data using object keys
const privateMeta = new WeakMap();

// 4) WeakSet: tracks objects without preventing garbage collection
const visitedUsers = new WeakSet();

const user1 = { id: 1, name: "Alice" };
const user2 = { id: 2, name: "Bob" };

privateMeta.set(user1, { role: "admin", lastLogin: "2026-08-09" });
privateMeta.set(user2, { role: "editor", lastLogin: "2026-08-08" });

visitedUsers.add(user1);

console.log("User scores:", Array.from(userScores.entries()));
console.log("Unique tags:", Array.from(uniqueTags));
console.log("User 1 metadata:", privateMeta.get(user1));
console.log("Has user1 been visited?", visitedUsers.has(user1));
console.log("Has user2 been visited?", visitedUsers.has(user2));

// Practice: create a Set from an array of numbers and remove duplicates
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = new Set(numbers);
console.log("Unique numbers:", Array.from(uniqueNumbers));

// Practice: use a Map to count repeated words
const words = ["apple", "banana", "apple", "cherry", "banana"];
const wordCount = new Map();

for (const word of words) {
  wordCount.set(word, (wordCount.get(word) || 0) + 1);
}

console.log("Word count:", Array.from(wordCount.entries()));
