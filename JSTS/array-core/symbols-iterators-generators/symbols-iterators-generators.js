// ============================================================
// SYMBOLS / ITERATORS / GENERATORS
// ============================================================


// ============================================================
// 1) SYMBOL
// ============================================================

// Symbol creates a UNIQUE primitive value.
//
// Even if two Symbols have the same description,
// they are still different:
//
// Symbol("id") !== Symbol("id")
//
// Symbols are often useful for creating object properties
// that should not accidentally conflict with normal
// string-based property names.

const id = Symbol("id");


// Create a normal JavaScript object.
const user = {
  name: "Alice",

  // [id] uses the Symbol as the property key.
  //
  // The property key is NOT the string "id".
  // It is the unique Symbol stored in the variable "id".
  [id]: 101
};


// Normal property access.
console.log("User object:", user);


// Access the Symbol property using the SAME Symbol.
//
// user[id] -> 101
//
// You cannot access it with:
// user["id"]
//
// because "id" and Symbol("id") are different keys.
console.log("Symbol key value:", user[id]);


// IMPORTANT:
//
// Symbols are useful when you want a property key
// that is unique and unlikely to conflict with
// other properties.
//
// Example:
//
// const ID = Symbol("id");
//
// object[ID] = 123;


// ============================================================
// 2) ITERATOR
// ============================================================

// An iterator is an object that produces values
// one at a time.
//
// An object becomes iterable when it implements:
//
// [Symbol.iterator]()
//
// The iterator must provide a next() method.
//
// next() returns an object like:
//
// { value: 10, done: false }
//
// When there are no more values:
//
// { done: true }


// Create a custom collection.
const numbers = {

  // Our actual data.
  data: [10, 20, 30],


  // Symbol.iterator tells JavaScript:
  //
  // "This object can be used with for...of."
  [Symbol.iterator]() {

    // Keep track of the current position.
    //
    // Start at index 0.
    let index = 0;


    // Return the iterator object.
    return {

      // next() is called automatically
      // every time for...of asks for another value.
      next: () => {

        // Check whether there are still values available.
        if (index < this.data.length) {

          // Return the current value.
          //
          // index++ means:
          //
          // 1. use current index
          // 2. then increase index by 1
          //
          // First call:
          // data[0] -> 10
          //
          // Second call:
          // data[1] -> 20
          //
          // Third call:
          // data[2] -> 30
          return {
            value: this.data[index++],
            done: false
          };
        }


        // No values remain.
        //
        // done: true tells for...of
        // to stop the loop.
        return {
          done: true
        };
      }
    };
  }
};


// ============================================================
// USING THE CUSTOM ITERATOR
// ============================================================

console.log("Iterator values:");


// for...of works because numbers implements
// [Symbol.iterator]().
for (const value of numbers) {

  // Values are produced one at a time:
  //
  // 10
  // 20
  // 30
  console.log(value);
}


// ============================================================
// HOW for...of WORKS INTERNALLY
// ============================================================
//
// When JavaScript sees:
//
// for (const value of numbers) {
//
// it roughly does:
//
// const iterator = numbers[Symbol.iterator]();
//
// iterator.next()
// iterator.next()
// iterator.next()
// iterator.next()
//
// The results are:
//
// { value: 10, done: false }
// { value: 20, done: false }
// { value: 30, done: false }
// { done: true }
//
// When done becomes true,
// the loop stops.
//
// This is the important idea behind ITERATORS:
//
// object
//   ↓
// Symbol.iterator()
//   ↓
// iterator
//   ↓
// next()
//   ↓
// { value, done }


// ============================================================
// 3) GENERATOR
// ============================================================

// A generator is a special function that can
// PAUSE and RESUME execution.
//
// Generator functions use:
//
// function*
//
// The yield keyword pauses the generator
// and produces a value.

function* countUp(limit) {

  // Start counting at 1.
  let current = 1;


  // Continue until current reaches the limit.
  while (current <= limit) {

    // yield returns the current value
    // and PAUSES the function.
    //
    // It does NOT finish the function.
    //
    // The next call resumes execution
    // from this exact point.
    yield current;


    // When the generator resumes,
    // increase the counter.
    current++;
  }
}


// ============================================================
// USING THE GENERATOR
// ============================================================

console.log("Generator values:");


// countUp(5) returns a GENERATOR OBJECT.
//
// The generator is iterable,
// so we can use it directly with for...of.
for (const value of countUp(5)) {

  // Values:
  //
  // 1
  // 2
  // 3
  // 4
  // 5
  console.log(value);
}


// ============================================================
// HOW THE GENERATOR WORKS
// ============================================================
//
// countUp(5)
//
// First execution:
//
// current = 1
// current <= 5 -> true
// yield 1
//
// PAUSED
//
// Next iteration:
//
// current++ -> 2
// current <= 5 -> true
// yield 2
//
// PAUSED
//
// Then:
//
// yield 3
// yield 4
// yield 5
//
// Finally:
//
// current = 6
// current <= 5 -> false
// generator finishes.
//
//
// The important difference:
//
// NORMAL FUNCTION
// ----------------
// return -> finishes the function
//
// GENERATOR
// ---------
// yield -> pauses the function
//          and can continue later


// ============================================================
// MANUAL GENERATOR CONTROL
// ============================================================

// Generators can also be controlled manually
// using next().

const counter = countUp(3);


// First next()
console.log("next 1:", counter.next());

// Result:
// { value: 1, done: false }


// Second next()
console.log("next 2:", counter.next());

// Result:
// { value: 2, done: false }


// Third next()
console.log("next 3:", counter.next());

// Result:
// { value: 3, done: false }


// Fourth next()
console.log("next 4:", counter.next());

// Result:
// { value: undefined, done: true }


// ============================================================
// QUICK INTERVIEW SUMMARY
// ============================================================
//
// SYMBOL
// ------
// Creates a unique primitive value.
//
// const id = Symbol("id");
//
// object[id] = 123;
//
// Useful for unique object property keys.
//
//
// ITERATOR
// --------
// Produces values one by one.
//
// Requires:
//
// [Symbol.iterator]()
//
// and usually:
//
// next()
//
// returning:
//
// { value: ..., done: false }
//
//
// GENERATOR
// ---------
// Special function that can pause/resume.
//
// function* example() {
//   yield 1;
//   yield 2;
// }
//
// Generator functions automatically create
// iterator objects.
//
//
// RELATIONSHIP
// ------------
//
// Symbol
//   ↓
// Symbol.iterator
//   ↓
// makes an object iterable
//   ↓
// for...of can consume it
//
// Generator
//   ↓
// automatically creates an iterator
//   ↓
// yield produces values
//   ↓
// for...of can consume it