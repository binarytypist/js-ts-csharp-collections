// Promise.all example in JavaScript

const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main() {
  const results = await Promise.all([
    delay(100, "users loaded"),
    delay(150, "posts loaded"),
    delay(50, "settings loaded"),
  ]);

  console.log("Promise.all:", results);
}

main();
