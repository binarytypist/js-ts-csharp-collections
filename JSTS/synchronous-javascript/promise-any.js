// Promise.any example in JavaScript

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
  const result = await Promise.any([
    delay(100, "primary source", true),
    delay(150, "backup source"),
    delay(200, "third source"),
  ]);

  console.log("Promise.any:", result);
}

main();
