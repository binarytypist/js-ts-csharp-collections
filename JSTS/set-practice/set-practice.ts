// Set practice in TypeScript

// Create a typed Set of strings.
const colors = new Set<string>();

// Add values to the set.
colors.add('red');
colors.add('green');
colors.add('blue');
colors.add('red'); // duplicate value, ignored

// Check set size and whether a value exists.
console.log('Set size:', colors.size);
console.log('Has red:', colors.has('red'));

// Loop through the set values.
for (const value of colors.values()) {
  console.log('Value:', value);
}

// Show all entries in the set.
console.log('Entries:', [...colors.entries()]);

// Remove one value and then clear the whole set.
colors.delete('green');
console.log('After delete, has green:', colors.has('green'));

colors.clear();
console.log('After clear, size:', colors.size);

// Example with an initialized Set.
const numbers = new Set<number>([1, 2, 3, 3, 4]);
console.log('Numbers set:', [...numbers]);
