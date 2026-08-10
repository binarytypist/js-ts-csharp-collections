namespace simpleChsarp.LearningPath.Level1Collections;

public static class ISetExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== ISet<T> ===");

        // ISet<T> enforces uniqueness.
        //
        // Adding a duplicate value has no effect:
        //
        // "CSharp"
        // "LINQ"
        // "CSharp" ← duplicate, silently ignored
        //
        // Result: "CSharp", "LINQ"
        //
        // Use ISet<T> when uniqueness is the requirement.
        ISet<string> tags = new HashSet<string>
        {
            "CSharp",
            "LINQ"
        };

        tags.Add("CSharp");

        Console.WriteLine($"Count (duplicate ignored): {tags.Count}");
        Console.WriteLine("Tags: " + string.Join(", ", tags));

        // Set operations: UnionWith, IntersectWith, ExceptWith
        ISet<string> moreTags = new HashSet<string> { "LINQ", "Azure" };
        tags.UnionWith(moreTags);

        Console.WriteLine("After UnionWith: " + string.Join(", ", tags));
    }
}
