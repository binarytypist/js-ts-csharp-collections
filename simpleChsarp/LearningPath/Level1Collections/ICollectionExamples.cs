namespace simpleChsarp.LearningPath.Level1Collections;

public static class ICollectionExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== ICollection<T> ===");

        // ICollection<T> extends IEnumerable<T>.
        //
        // It adds collection-management operations:
        //
        // ICollection<T>
        // │
        // ├── IEnumerable<T>
        // ├── Count
        // ├── Add()
        // ├── Remove()
        // ├── Clear()
        // └── Contains()
        ICollection<int> numbers = [10, 20, 30];

        numbers.Add(40);
        numbers.Remove(20);

        Console.WriteLine($"Count: {numbers.Count}");
        Console.WriteLine($"Contains 40: {numbers.Contains(40)}");
        Console.WriteLine("Numbers: " + string.Join(", ", numbers));
    }
}
