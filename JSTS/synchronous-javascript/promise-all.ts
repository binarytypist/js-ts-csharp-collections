// Promise.all example in TypeScript

const delay = <T>(ms: number, value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main(): Promise<void> {
  const results = await Promise.all([
    delay(100, "users loaded"),
    delay(150, "posts loaded"),
    delay(50, "settings loaded"),
  ]);

  console.log("Promise.all:", results);
}

void main();
