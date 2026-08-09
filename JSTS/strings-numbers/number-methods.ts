// Number method examples in TypeScript

const price: number = 12.3456;
const badValue: number = Number("abc");

console.log("toFixed:", price.toFixed(2));
console.log("toString:", price.toString());
console.log("Number.isNaN:", Number.isNaN(badValue));
console.log("Number.isFinite:", Number.isFinite(100));
console.log("Number.isInteger:", Number.isInteger(10));
console.log("parseInt:", parseInt("42", 10));
console.log("parseFloat:", parseFloat("3.14px"));
