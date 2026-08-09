// Promise.any example in TypeScript

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
  const result = await Promise.any([
    delay(100, "primary source", true),
    delay(150, "backup source"),
    delay(200, "third source"),
  ]);

  console.log("Promise.any:", result);

  try {
    const allFailed = await Promise.any([
      delay(100, "first", true),
      delay(150, "second", true),
      delay(200, "third", true),
    ]);

    console.log("Promise.any all failed:", allFailed);
  } catch (error) {
    console.log("Promise.any all failed error:", error);
  }
}

void main();
