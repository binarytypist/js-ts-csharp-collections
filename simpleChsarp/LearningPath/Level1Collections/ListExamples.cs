namespace simpleChsarp.LearningPath.Level1Collections;

public static class ListExamples
{
    public static void Run()
    {
        // Display the collection we are learning.
        Console.WriteLine("\n=== List<T> ===");


        // Create a List<string>.
        //
        // T = string
        //
        // A List<T> is:
        // - Ordered
        // - Dynamically sized
        // - Index-based
        // - Allows duplicate values
        //
        // Unlike an array, a List<T> can grow and shrink
        // as items are added or removed.
        //
        // Current list:
        //
        // Index    Value
        //   0      "Sam"
        //   1      "Alex"
        //   2      "Nora"
        List<string> users =
        [
            "Sam",
            "Alex",
            "Nora"
        ];


        // Add a new item to the end of the list.
        //
        // Before:
        // Sam, Alex, Nora
        //
        // After:
        // Sam, Alex, Nora, Mina
        users.Add("Mina");


        // Remove the first occurrence of "Alex".
        //
        // Before:
        // Sam, Alex, Nora, Mina
        //
        // After:
        // Sam, Nora, Mina
        //
        // Remove() returns true if the item was found
        // and successfully removed.
        users.Remove("Alex");


        // Count returns the current number of items.
        //
        // There are now 3 users:
        //
        // Sam
        // Nora
        // Mina
        Console.WriteLine($"Count: {users.Count}");


        // string.Join() combines all items into one string.
        //
        // ", " is used as the separator.
        //
        // Result:
        // Sam, Nora, Mina
        Console.WriteLine(
            "Users: " + string.Join(", ", users));
    }
}