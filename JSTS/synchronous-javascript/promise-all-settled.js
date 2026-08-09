// Promise.allSettled example in JavaScript

const delay = (ms, value, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Failed: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function main() {
  const results = await Promise.allSettled([
    delay(100, "profile"),
    delay(150, "notifications", true),
    delay(50, "messages"),
  ]);

  console.log("Promise.allSettled:", results);
}

main();
