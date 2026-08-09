// Symbols / Iterators / Generators in JavaScript

// 1) Symbol: unique identifier
const id = Symbol('id');
const user = {
  name: 'Alice',
  [id]: 101
};

console.log('User object:', user);
console.log('Symbol key value:', user[id]);

// 2) Iterator: custom iteration over a collection
const numbers = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

console.log('Iterator values:');
for (const value of numbers) {
  console.log(value);
}

// 3) Generator: pause and resume execution
function* countUp(limit) {
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
