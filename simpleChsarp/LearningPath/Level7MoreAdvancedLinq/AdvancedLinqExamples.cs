namespace simpleChsarp.LearningPath.Level7MoreAdvancedLinq;

public static class AdvancedLinqExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Advanced LINQ Examples ===");

        var employees = new[]
        {
            new { Id = 1, Name = "Ali", DepartmentId = 1 },
            new { Id = 2, Name = "Ben", DepartmentId = 2 },
            new { Id = 3, Name = "Cara", DepartmentId = 1 },
            new { Id = 4, Name = "Dina", DepartmentId = 3 }
        };

        var departments = new[]
        {
            new { Id = 1, Name = "Engineering" },
            new { Id = 2, Name = "Sales" },
            new { Id = 3, Name = "HR" }
        };

        var joined = employees.Join(
            departments,
            employee => employee.DepartmentId,
            department => department.Id,
            (employee, department) => $"{employee.Name} -> {department.Name}");

        Console.WriteLine("Join:");
        foreach (var item in joined)
        {
            Console.WriteLine($"  {item}");
        }

        var grouped = departments.GroupJoin(
            employees,
            department => department.Id,
            employee => employee.DepartmentId,
            (department, people) => $"{department.Name}: {string.Join(", ", people.Select(x => x.Name))}");

        Console.WriteLine("\nGroupJoin:");
        foreach (var item in grouped)
        {
            Console.WriteLine($"  {item}");
        }

        var numbers = new[] { 2, 4, 6, 8, 10 };
        var sum = numbers.Aggregate(0, (total, next) => total + next);
        Console.WriteLine($"\nAggregate sum: {sum}");

        var left = new[] { "A", "B", "C" };
        var right = new[] { "1", "2", "3", "4" };
        var zipped = left.Zip(right, (first, second) => $"{first}-{second}");
        Console.WriteLine("\nZip:");
        foreach (var item in zipped)
        {
            Console.WriteLine($"  {item}");
        }

        var chunks = numbers.Chunk(2);
        Console.WriteLine("\nChunk:");
        foreach (var chunk in chunks)
        {
            Console.WriteLine($"  [{string.Join(", ", chunk)}]");
        }

        Console.WriteLine("\nTake / TakeLast / Skip / SkipLast:");
        Console.WriteLine($"Take 3: [{string.Join(", ", numbers.Take(3))}]");
        Console.WriteLine($"TakeLast 2: [{string.Join(", ", numbers.TakeLast(2))}]");
        Console.WriteLine($"Skip 2: [{string.Join(", ", numbers.Skip(2))}]");
        Console.WriteLine($"SkipLast 2: [{string.Join(", ", numbers.SkipLast(2))}]");

        var values = new[] { 1, 3, 5, 7, 9 };
        Console.WriteLine("\nTakeWhile / SkipWhile:");
        Console.WriteLine($"TakeWhile < 7: [{string.Join(", ", values.TakeWhile(x => x < 7))}]");
        Console.WriteLine($"SkipWhile < 7: [{string.Join(", ", values.SkipWhile(x => x < 7))}]");
    }
}
