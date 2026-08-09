namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class AggregateExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Count / Sum / Min / Max / Average ===");

        List<LinqUser> users = LinqSampleData.Users;

        // Count returns how many items are in the sequence.
        int count = users.Count();
        // Sum, Min, Max, and Average compute numeric summaries across the sequence.
        decimal sum = users.Sum(user => user.Salary);
        decimal min = users.Min(user => user.Salary);
        decimal max = users.Max(user => user.Salary);
        decimal average = users.Average(user => user.Salary);

        Console.WriteLine($"Count: {count}");
        Console.WriteLine($"Sum salary: {sum}");
        Console.WriteLine($"Min salary: {min}");
        Console.WriteLine($"Max salary: {max}");
        Console.WriteLine($"Average salary: {average:F2}");
    }
}
