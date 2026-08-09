using simpleChsarp.LearningPath.Level2BasicLinq;

namespace simpleChsarp.LearningPath.Level4Grouping;

public static class GroupingExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Grouping Examples ===");

        List<LinqUser> users = LinqSampleData.Users;

        // GroupBy builds groups by key and is evaluated when enumerated.
        List<string> groupedByDepartment = users
            .GroupBy(user => user.Department)
            .Select(group => $"{group.Key}: {string.Join(", ", group.Select(user => user.Name))}")
            .ToList();

        // ToLookup creates an index-like structure for repeated key-based access.
        ILookup<bool, LinqUser> activeLookup = users.ToLookup(user => user.IsActive);

        // Lookup indexer returns the group for a key; missing keys return an empty sequence.
        List<string> activeNames = activeLookup[true].Select(user => user.Name).ToList();
        List<string> inactiveNames = activeLookup[false].Select(user => user.Name).ToList();

        Console.WriteLine("GroupBy Department: " + string.Join(" | ", groupedByDepartment));
        Console.WriteLine("ToLookup Active=true: " + string.Join(", ", activeNames));
        Console.WriteLine("ToLookup Active=false: " + string.Join(", ", inactiveNames));
    }
}
