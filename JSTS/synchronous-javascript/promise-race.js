// Promise.race example in JavaScript

const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main() {
  const winner = await Promise.race([
    delay(200, "slow response"),
    delay(50, "fast response"),
  ]);

  console.log("Promise.race:", winner);
}

main();
