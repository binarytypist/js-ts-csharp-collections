// Promise.allSettled example in TypeScript

const delay = <T>(ms: number, value: T, shouldFail = false): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Failed: ${String(value)}`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function main(): Promise<void> {
  const results = await Promise.allSettled([
    delay(100, "profile"),
    delay(150, "notifications", true),
    delay(50, "messages"),
  ]);

  console.log("Promise.allSettled:", results);
}

void main();
