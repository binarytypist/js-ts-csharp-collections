namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class ElementExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== First / Single / Last ===");

        List<LinqUser> users = LinqSampleData.Users;

        // First returns the first element; throws if the sequence is empty.
        LinqUser first = users.First();
        // FirstOrDefault returns null/default when no item matches.
        LinqUser? firstOrDefault = users.FirstOrDefault(user => user.Age > 100);

        // Single requires exactly one match; throws on 0 or many matches.
        LinqUser single = users.Single(user => user.Id == 2);
        // SingleOrDefault allows 0 matches, but still throws if there are many.
        LinqUser? singleOrDefault = users.SingleOrDefault(user => user.Id == 100);

        // Last returns the last element; throws if the sequence is empty.
        LinqUser last = users.Last();
        // LastOrDefault returns null/default when no item matches.
        LinqUser? lastOrDefault = users.LastOrDefault(user => user.Age > 100);

        Console.WriteLine($"First: {first.Name}");
        Console.WriteLine($"FirstOrDefault(Age > 100): {firstOrDefault?.Name ?? "null"}");
        Console.WriteLine($"Single(Id == 2): {single.Name}");
        Console.WriteLine($"SingleOrDefault(Id == 100): {singleOrDefault?.Name ?? "null"}");
        Console.WriteLine($"Last: {last.Name}");
        Console.WriteLine($"LastOrDefault(Age > 100): {lastOrDefault?.Name ?? "null"}");
    }
}
