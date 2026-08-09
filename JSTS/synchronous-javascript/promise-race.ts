// Promise.race example in TypeScript

const delay = <T>(ms: number, value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main(): Promise<void> {
  const winner = await Promise.race([
    delay(200, "slow response"),
    delay(50, "fast response"),
  ]);

  console.log("Promise.race:", winner);
}

void main();
