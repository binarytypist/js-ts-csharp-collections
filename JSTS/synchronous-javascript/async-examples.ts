// Async / Promise examples in TypeScript

interface UserExample {
  id: number;
  name: string;
}

const delay = <T>(ms: number, value: T, shouldReject = false): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Failed: ${String(value)}`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function runExamples(): Promise<void> {
  console.log("Promise.all");
  const allResults = await Promise.all([
    delay(100, "A"),
    delay(150, "B"),
    delay(50, "C"),
  ]);
  console.log(allResults);

  console.log("Promise.allSettled");
  const settledResults = await Promise.allSettled([
    delay(100, "A"),
    delay(150, "B", true),
    delay(50, "C"),
  ]);
  console.log(settledResults);

  console.log("Promise.race");
  const raceResult = await Promise.race([
    delay(200, "slow"),
    delay(50, "fast"),
  ]);
  console.log(raceResult);

  console.log("Promise.any");
  const anyResult = await Promise.any([
    delay(100, "first success", true),
    delay(50, "fallback success"),
  ]);
  console.log(anyResult);

  console.log("async/await");
  const user: UserExample = await delay(100, { id: 1, name: "Ava" });
  console.log(user);

  console.log("AbortController + fetch");
  const controller = new AbortController();
  const request: Promise<Response> = fetch("https://example.com", {
    signal: controller.signal,
  });
  controller.abort();

  try {
    await request;
  } catch (error) {
    if (error instanceof DOMException) {
      console.log(error.name);
    }
  }
}

void runExamples();
