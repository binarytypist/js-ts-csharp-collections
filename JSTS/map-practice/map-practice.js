// Map practice in JavaScript

// Create a new Map to store key-value pairs.
const employeeMap = new Map();

// Add entries to the map using set().
employeeMap.set('name', 'Ava');
employeeMap.set('age', 28);
employeeMap.set('city', 'Berlin');

// Check the map size and read values.
console.log('Map size:', employeeMap.size);
console.log('Has name:', employeeMap.has('name'));
console.log('Get age:', employeeMap.get('age'));

// Loop over entries and print each key-value pair.
for (const [key, value] of employeeMap.entries()) {
  console.log(`Entry: ${key} -> ${value}`);
}

// Show all keys and values separately.
console.log('Keys:', [...employeeMap.keys()]);
console.log('Values:', [...employeeMap.values()]);

// Remove one item and then clear the whole map.
employeeMap.delete('city');
console.log('After delete, has city:', employeeMap.has('city'));

employeeMap.clear();
console.log('After clear, size:', employeeMap.size);

// Example with a Map initialized from an array of pairs.
const userMap = new Map([
  ['id', 1],
  ['role', 'admin'],
]);

console.log('User map entries:', userMap.entries());
