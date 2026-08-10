namespace simpleChsarp.LearningPath.Level1Collections;

public static class IReadOnlyListExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IReadOnlyList<T> ===");


        // IReadOnlyList<T> represents an ordered collection
        // that the caller can READ but cannot modify through
        // the interface.
        //
        // IReadOnlyList<T> inherits from IReadOnlyCollection<T>,
        // which inherits from IEnumerable<T>.
        //
        // Simplified hierarchy:
        //
        // IEnumerable<T>
        //       ↓
        // IReadOnlyCollection<T>
        //       ↓
        // IReadOnlyList<T>
        //
        // IReadOnlyList<T> provides:
        //
        //   - Count
        //   - foreach / iteration
        //   - index-based READ access
        //
        // Example:
        //
        //   names[0]       → read the first item       ✅
        //   names.Count    → get number of items       ✅
        //
        // But it does NOT provide:
        //
        //   names[0] = ... → modify an item            ❌
        //   names.Add(...) → add an item               ❌
        //   names.Remove() → remove an item            ❌
        //
        // Use IReadOnlyList<T> when:
        //
        // "I want to expose an ordered collection and allow
        // callers to read items by index, but I don't want
        // callers to modify the collection."


        // T = string
        //
        // The collection contains:
        //
        // Index    Value
        //   0      "Sam"
        //   1      "Alex"
        //   2      "Nora"
        IReadOnlyList<string> names =
        [
            "Sam",
            "Alex",
            "Nora"
        ];


        // Read an item using its index.
        //
        // Indexes start at 0.
        //
        // names[0] → "Sam"
        Console.WriteLine($"First: {names[0]}");


        // Count returns the total number of items.
        //
        // Result:
        // 3
        Console.WriteLine($"Count: {names.Count}");


        // Iterate through the list using an index.
        //
        // i represents the current index.
        //
        // i = 0 → names[0] → "Sam"
        // i = 1 → names[1] → "Alex"
        // i = 2 → names[2] → "Nora"
        for (int i = 0; i < names.Count; i++)
        {
            Console.WriteLine(
                $"  [{i}] {names[i]}");
        }
    }
}