// Strings, Numbers, Math, and Date examples in TypeScript

console.log("String examples");
const rawText: string = "   Hello, TypeScript!   ";
const text = rawText.trim();
console.log(text.toLowerCase());
console.log(text.toUpperCase());
console.log(text.includes("TypeScript"));
console.log(text.startsWith("Hello"));
console.log(text.endsWith("!"));
console.log(text.indexOf("TypeScript"));
console.log(text.replace("TypeScript", "JavaScript"));
console.log("apple,banana,orange".replaceAll(",", " | "));
console.log("one-two-three".split("-"));
console.log(text.slice(0, 5));
console.log(text.substring(0, 5));
console.log("ha".repeat(3));
console.log("7".padStart(3, "0"));
console.log("7".padEnd(3, "0"));
console.log("TypeScript".at(0));
console.log("TypeScript".at(-1));

console.log("Number examples");
const price: number = 12.3456;
console.log(price.toFixed(2));
console.log(price.toString());
console.log(Number.isNaN(Number("abc")));
console.log(Number.isFinite(100));
console.log(Number.isInteger(10));
console.log(parseInt("42", 10));
console.log(parseFloat("3.14px"));

console.log("Math examples");
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.round(4.5));
console.log(Math.trunc(4.9));
console.log(Math.max(3, 8, 1));
console.log(Math.min(3, 8, 1));
console.log(Math.abs(-15));
console.log(Math.pow(2, 3));
console.log(Math.sqrt(16));
console.log(Math.random());

console.log("Date examples");
const today: Date = new Date();
console.log(today.getFullYear());
console.log(today.getMonth());
console.log(today.toISOString());
console.log(today.toLocaleDateString());
