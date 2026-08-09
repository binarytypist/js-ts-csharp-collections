namespace simpleChsarp.LearningPath.Level8LinqObjects;

public static class LinqObjectsExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== LINQ + Objects Examples ===");

        var users = new List<User>
        {
            new(1, "Sam", true, 29),
            new(2, "Nora", true, 34),
            new(3, "Alex", false, 25),
            new(1, "Sam", true, 29),
            new(4, "Mina", true, 31)
        };

        var employees = new List<Employee>
        {
            new(1, "Sam", "Engineering", 7200, 29),
            new(2, "Nora", "Engineering", 9200, 34),
            new(3, "Alex", "Support", 4200, 25),
            new(4, "Mina", "Sales", 6100, 31)
        };

        var products = new List<Product>
        {
            new(1, "Laptop", 999),
            new(2, "Keyboard", 49),
            new(3, "Monitor", 199),
            new(1, "Laptop", 999)
        };

        var orders = new List<Order>
        {
            new(1001, 1, 2),
            new(1002, 2, 1),
            new(1003, 3, 3)
        };

        Console.WriteLine("Active users:");
        foreach (var user in users.Where(u => u.IsActive))
        {
            Console.WriteLine($"  {user.Name}");
        }

        Console.WriteLine("\nDuplicate users:");
        foreach (var user in users.GroupBy(u => u.Id).Where(g => g.Count() > 1).Select(g => g.Key))
        {
            Console.WriteLine($"  UserId {user}");
        }

        Console.WriteLine("\nUnique product names:");
        foreach (var name in products.Select(p => p.Name).Distinct())
        {
            Console.WriteLine($"  {name}");
        }

        Console.WriteLine("\nCommon values between users and employees:");
        var userNames = users.Select(u => u.Name);
        var employeeNames = employees.Select(e => e.Name);
        foreach (var name in userNames.Intersect(employeeNames))
        {
            Console.WriteLine($"  {name}");
        }

        Console.WriteLine("\nMissing values between users and employees:");
        foreach (var name in userNames.Except(employeeNames))
        {
            Console.WriteLine($"  {name}");
        }

        Console.WriteLine("\nEmployees by department:");
        foreach (var group in employees.GroupBy(e => e.Department))
        {
            Console.WriteLine($"  {group.Key}: {string.Join(", ", group.Select(e => e.Name))}");
        }

        Console.WriteLine("\nHighest salary:");
        Console.WriteLine($"  {employees.OrderByDescending(e => e.Salary).First().Name} ({employees.Max(e => e.Salary)})");

        Console.WriteLine("\nSecond highest salary:");
        var secondHighest = employees.OrderByDescending(e => e.Salary).Skip(1).First();
        Console.WriteLine($"  {secondHighest.Name} ({secondHighest.Salary})");

        Console.WriteLine("\nSorted employees:");
        foreach (var employee in employees.OrderBy(e => e.Age))
        {
            Console.WriteLine($"  {employee.Name} ({employee.Age})");
        }

        Console.WriteLine("\nCount employees by department:");
        foreach (var count in employees.GroupBy(e => e.Department).Select(g => new { Department = g.Key, Count = g.Count() }))
        {
            Console.WriteLine($"  {count.Department}: {count.Count}");
        }

        Console.WriteLine("\nEmployees older than 30:");
        foreach (var employee in employees.Where(e => e.Age > 30))
        {
            Console.WriteLine($"  {employee.Name} ({employee.Age})");
        }

        Console.WriteLine("\nJoined employees with orders:");
        var joined = employees.Join(
            orders,
            employee => employee.Id,
            order => order.EmployeeId,
            (employee, order) => $"{employee.Name} -> Order {order.OrderId}");

        foreach (var item in joined)
        {
            Console.WriteLine($"  {item}");
        }
    }

    public sealed record User(int Id, string Name, bool IsActive, int Age);
    public sealed record Employee(int Id, string Name, string Department, int Salary, int Age);
    public sealed record Product(int Id, string Name, decimal Price);
    public sealed record Order(int OrderId, int EmployeeId, int ProductId);
}
