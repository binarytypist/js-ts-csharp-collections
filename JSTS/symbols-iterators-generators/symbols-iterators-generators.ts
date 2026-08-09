// Symbols / Iterators / Generators in TypeScript

// 1) Symbol: unique identifier
const id = Symbol('id');
const user: Record<string | symbol, unknown> = {
  name: 'Alice',
  [id]: 101
};

console.log('User object:', user);
console.log('Symbol key value:', user[id]);

// 2) Iterator: custom iteration over a collection
const numbers = {
  data: [10, 20, 30],
  [Symbol.iterator](): Iterator<number> {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true, value: undefined };
      }
    };
  }
};

console.log('Iterator values:');
for (const value of numbers) {
  console.log(value);
}

// 3) Generator: pause and resume execution
function* countUp(limit: number): Generator<number, void, unknown> {
  let current = 1;
  while (current <= limit) {
    yield current;
    current++;
  }
}

console.log('Generator values:');
for (const value of countUp(5)) {
  console.log(value);
}
