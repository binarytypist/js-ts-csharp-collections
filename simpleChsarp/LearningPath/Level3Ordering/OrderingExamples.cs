using simpleChsarp.LearningPath.Level2BasicLinq;

namespace simpleChsarp.LearningPath.Level3Ordering;

public static class OrderingExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Ordering Examples ===");

        List<LinqUser> users = LinqSampleData.Users;

        // OrderBy sorts ascending by the selected key.
        List<string> byAge = users
            .OrderBy(user => user.Age)
            .Select(user => $"{user.Name}({user.Age})")
            .ToList();

        // OrderByDescending sorts descending by the selected key.
        List<string> bySalaryDesc = users
            .OrderByDescending(user => user.Salary)
            .Select(user => $"{user.Name}({user.Salary})")
            .ToList();

        // ThenBy adds a secondary ascending sort when primary keys are equal.
        List<string> byDepartmentThenAge = users
            .OrderBy(user => user.Department)
            .ThenBy(user => user.Age)
            .Select(user => $"{user.Department}:{user.Name}({user.Age})")
            .ToList();

        // ThenByDescending adds a secondary descending sort when primary keys are equal.
        List<string> byDepartmentThenSalaryDesc = users
            .OrderBy(user => user.Department)
            .ThenByDescending(user => user.Salary)
            .Select(user => $"{user.Department}:{user.Name}({user.Salary})")
            .ToList();

        List<int> numbers = [1, 2, 3, 4, 5];
        // Reverse flips the current in-memory order of this list.
        numbers.Reverse();

        Console.WriteLine("OrderBy Age: " + string.Join(", ", byAge));
        Console.WriteLine("OrderByDescending Salary: " + string.Join(", ", bySalaryDesc));
        Console.WriteLine("OrderBy Department + ThenBy Age: " + string.Join(" | ", byDepartmentThenAge));
        Console.WriteLine("OrderBy Department + ThenByDescending Salary: " + string.Join(" | ", byDepartmentThenSalaryDesc));
        Console.WriteLine("Reverse numbers: " + string.Join(", ", numbers));
    }
}
