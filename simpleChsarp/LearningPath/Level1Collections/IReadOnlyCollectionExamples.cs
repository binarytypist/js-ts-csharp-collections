namespace simpleChsarp.LearningPath.Level1Collections;

public static class IReadOnlyCollectionExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IReadOnlyCollection<T> ===");

        // IReadOnlyCollection<T> represents a collection that the
        // caller is allowed to READ but not modify through this interface.
        //
        // It provides:
        //   - Count
        //   - foreach / iteration through IEnumerable<T>
        //
        // It does NOT provide:
        //   - Add()
        //   - Remove()
        //   - Clear()
        //
        // This is useful when a method or class wants to expose
        // collection data without allowing callers to change it.
        //
        // Here:
        //   T = int
        //
        // So numbers is a read-only collection of integers.
        IReadOnlyCollection<int> numbers = [10, 20, 30];


        // Count tells us how many items are in the collection.
        //
        // Result:
        // 3
        Console.WriteLine($"Count: {numbers.Count}");


        // IReadOnlyCollection<T> supports iteration because it
        // inherits from IEnumerable<T>.
        //
        // We can read each value using foreach.
        foreach (int number in numbers)
        {
            Console.Write($"{number} ");
        }

        Console.WriteLine();


        // Real-world example:
        //
        // GetUsers() returns IReadOnlyCollection<string>.
        //
        // The caller can read the users and iterate over them,
        // but cannot call Add(), Remove(), or Clear() through
        // the IReadOnlyCollection interface.
        IReadOnlyCollection<string> users = GetUsers();

        Console.WriteLine(
            "Users: " + string.Join(", ", users));
    }


    // Returning IReadOnlyCollection<T> communicates that the
    // caller should only read the returned collection.
    //
    // Here:
    //   T = string
    //
    // The method provides a collection of user names.
    private static IReadOnlyCollection<string> GetUsers() =>
        ["Sam", "Alex", "Nora"];
}