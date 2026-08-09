namespace simpleChsarp.LearningPath.Level1Collections;

public static class ArrayExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Array (T[]) ===");

        int[] scores = { 88, 92, 75, 100 };
        Console.WriteLine($"Length: {scores.Length}");
        Console.WriteLine($"First: {scores[0]}, Last: {scores[^1]}");

        Array.Sort(scores);
        Console.WriteLine("Sorted: " + string.Join(", ", scores));
    }
}
