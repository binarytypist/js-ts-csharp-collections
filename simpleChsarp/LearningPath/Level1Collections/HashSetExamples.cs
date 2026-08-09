namespace simpleChsarp.LearningPath.Level1Collections;

public static class HashSetExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== HashSet<T> ===");

        HashSet<string> tags = ["csharp", "linq", "collections", "csharp"];
        tags.Add("dotnet");

        Console.WriteLine($"Unique count: {tags.Count}");
        Console.WriteLine("Tags: " + string.Join(", ", tags.OrderBy(x => x)));
    }
}
