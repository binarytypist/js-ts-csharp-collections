namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class QuantifierExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Any / All / Contains ===");

        List<LinqUser> users = LinqSampleData.Users;

        // Any checks whether at least one item matches the condition.
        bool anyInactive = users.Any(user => !user.IsActive);
        // All checks whether every item matches the condition.
        bool allHaveSalary = users.All(user => user.Salary > 0);

        List<string> names = users.Select(user => user.Name).ToList();
        // Contains checks whether a specific value exists in the sequence.
        bool containsSam = names.Contains("Sam");

        Console.WriteLine($"Any inactive users: {anyInactive}");
        Console.WriteLine($"All have salary > 0: {allHaveSalary}");
        Console.WriteLine($"Contains 'Sam': {containsSam}");
    }
}
