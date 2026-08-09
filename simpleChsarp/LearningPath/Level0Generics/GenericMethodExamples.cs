namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericMethodExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Methods ===");

        int first = 10;
        int second = 20;
        Swap(ref first, ref second);

        Console.WriteLine($"Swap<int>: first={first}, second={second}");
        Console.WriteLine($"GetFirst<string>: {GetFirst(new[] { "Sam", "Alex", "Nora" })}");
    }

    private static void Swap<T>(ref T left, ref T right)
    {
        T temp = left;
        left = right;
        right = temp;
    }

    private static T GetFirst<T>(IEnumerable<T> values)
    {
        return values.First();
    }
}
