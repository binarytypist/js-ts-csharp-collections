namespace simpleChsarp.LearningPath.Level1Collections;

public static class IEnumerableExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IEnumerable<T> ===");

        IEnumerable<int> numbers = GetEvenNumbers(1, 10);
        Console.WriteLine("Even numbers: " + string.Join(", ", numbers));
    }

    private static IEnumerable<int> GetEvenNumbers(int start, int end)
    {
        for (int i = start; i <= end; i++)
        {
            if (i % 2 == 0)
            {
                yield return i;
            }
        }
    }
}
