# Map / Set / WeakMap / WeakSet

These four collection types help you work with grouped values in different ways.

## When to use each one

- Map: store key-value pairs where keys can be any value, not just strings. Great for lookup tables and preserving insertion order.
- Set: store unique values only. Useful for deduplication and tracking membership.
- WeakMap: store key-value pairs for object keys only. The entries are weakly referenced, so they do not prevent garbage collection.
- WeakSet: store unique object references only. Useful for tracking objects without keeping them alive.

## Example

See [map-set-weakmap-weakset.ts](map-set-weakmap-weakset.ts) for a practical example that combines all four structures.

## Quick comparison

| Structure | Accepts duplicate values | Accepts object keys | Can be iterated | Good for |
| --- | --- | --- | --- | --- |
| Map | Yes | Yes | Yes | Lookup tables |
| Set | No | Yes | Yes | Unique values |
| WeakMap | N/A | Object keys only | No | Private metadata |
| WeakSet | N/A | Object references only | No | Object membership tracking |

## Summary

- Use Map when you need a key-value store with flexible keys.
- Use Set when you want to keep only one copy of each value.
- Use WeakMap and WeakSet when the data is meant to be attached to objects without preventing cleanup.

## Practice questions

1. What is the main difference between Map and Set?
2. Why would you choose WeakMap over Map?
3. How can a Set help remove duplicates from an array?
4. When would you use WeakSet in a real project?
