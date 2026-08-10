namespace simpleChsarp.LearningPath.Level1Collections;

public static class IListExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IList<T> ===");

        // IList<T> represents an ordered collection
        // where items can be accessed by their index.
        //
        // IList<T> inherits from ICollection<T>,
        // which inherits from IEnumerable<T>.
        //
        // Simplified hierarchy:
        //
        // IEnumerable<T>
        //       ↓
        // ICollection<T>
        //       ↓
        // IList<T>
        //
        // IList<T> adds:
        // - Index access: [0]
        // - Insert()
        // - RemoveAt()
        // - IndexOf()
        //
        // Use IList<T> when the position of an item matters.

        // T = string
        //
        // Index:
        //   0       1       2
        //   ↓       ↓       ↓
        // "Sam"   "Alex"  "Nora"
        IList<string> names = ["Sam", "Alex", "Nora"];


        // Access an item using its index.
        //
        // Indexes start at 0.
        //
        // names[0] → "Sam"
        Console.WriteLine($"First: {names[0]}");


        // Find the index of a specific item.
        //
        // "Alex" is at index 1.
        //
        // Result:
        // 1
        Console.WriteLine(
            $"IndexOf Alex: {names.IndexOf("Alex")}");


        // Add a new item to the end of the list.
        //
        // Before:
        // Sam, Alex, Nora
        //
        // After:
        // Sam, Alex, Nora, John
        names.Add("John");


        // Change the value at a specific index.
        //
        // Index 1 currently contains "Alex".
        //
        // Replace "Alex" with "Michael".
        names[1] = "Michael";


        // Print all items.
        Console.WriteLine(
            "Names: " + string.Join(", ", names));
    }
}