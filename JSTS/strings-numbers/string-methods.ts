// String method examples in TypeScript

const message: string = "   Hello, TypeScript world!   ";
const cleaned = message.trim();

console.log("trim:", cleaned);
console.log("toLowerCase:", cleaned.toLowerCase());
console.log("toUpperCase:", cleaned.toUpperCase());
console.log("includes:", cleaned.includes("TypeScript"));
console.log("startsWith:", cleaned.startsWith("Hello"));
console.log("endsWith:", cleaned.endsWith("!"));
console.log("indexOf:", cleaned.indexOf("TypeScript"));
console.log("replace:", cleaned.replace("world", "developers"));
console.log("replaceAll:", "red,blue,red".replaceAll("red", "green"));
console.log("split:", "apple,banana,orange".split(","));
console.log("slice:", cleaned.slice(0, 5));
console.log("substring:", cleaned.substring(0, 5));
console.log("repeat:", "ha".repeat(3));
console.log("padStart:", "7".padStart(3, "0"));
console.log("padEnd:", "7".padEnd(3, "0"));
console.log("at first:", cleaned.at(0));
console.log("at last:", cleaned.at(-1));
