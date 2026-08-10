namespace simpleChsarp.LearningPath.Level1Collections;

public static class HashSetExamples
{
    // Entry point for the HashSet example.
    public static void Run()
    {
        // Display the collection we are learning.
        Console.WriteLine("\n=== HashSet ===");


        // Create a HashSet containing strings.
        //
        // HashSet<T> stores UNIQUE values.
        //
        // Here:
        // T = string
        //
        // We initially provide:
        //
        // "csharp"
        // "linq"
        // "collections"
        // "csharp"
        //
        // Notice that "csharp" appears twice.
        //
        // HashSet automatically removes/ignores the duplicate.
        HashSet<string> tags =
        [
            "csharp",
            "linq",
            "collections",
            "csharp"
        ];


        // Add another value to the HashSet.
        //
        // "dotnet" does not already exist,
        // so it will be added.
        tags.Add("dotnet");


        // Count returns the number of UNIQUE elements.
        //
        // The original values were:
        //
        // csharp
        // linq
        // collections
        // csharp ← duplicate
        // dotnet
        //
        // The HashSet contains only:
        //
        // csharp
        // linq
        // collections
        // dotnet
        //
        // Therefore Count = 4.
        Console.WriteLine(
            $"Unique count: {tags.Count}");


        // OrderBy(x => x) sorts the tags alphabetically.
        //
        // x represents each string in the HashSet.
        //
        // Before sorting, the HashSet does not guarantee
        // the order we should rely on.
        //
        // OrderBy returns the values sorted alphabetically.
        //
        // string.Join(", ", ...) combines them into one string.
        Console.WriteLine(
            "Tags: " + string.Join(", ", tags.OrderBy(x => x)));
    }
}