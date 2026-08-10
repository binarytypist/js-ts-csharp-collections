namespace simpleChsarp.LearningPath.Level1InterfacesPractice;


// IReadOnlyCollection<T> is a C# interface that lets you read a collection without providing methods to modify the collection.
public static class IReadOnlyCollectionPractice
{
    // Simple record representing an employee.
    //
    // Each employee has:
    // - Id         → unique employee ID
    // - Name       → employee name
    // - Department → department where the employee works
    private record Employee(
        int Id,
        string Name,
        string Department);


    public static void Run()
    {
        Console.WriteLine(
            "\n=== IReadOnlyCollection<T> — Intermediate ===");


        // Create the repository.
        //
        // The repository owns and manages the internal
        // employee collection.
        EmployeeRepository repo = new();


        // Add employees through the repository.
        //
        // The repository is responsible for modifying
        // its internal collection.
        repo.Add(
            new Employee(1, "Sam", "Engineering"));

        repo.Add(
            new Employee(2, "Nora", "Engineering"));

        repo.Add(
            new Employee(3, "Alex", "Support"));

        repo.Add(
            new Employee(4, "Mina", "Sales"));


        // Get the employees as IReadOnlyCollection<Employee>.
        //
        // This is an important design pattern:
        //
        // The repository can modify its internal List<T>,
        // but the caller only receives a read-only interface.
        //
        // Therefore the caller can:
        //
        //   Count       
        //   foreach     
        //   LINQ        
        //
        // But cannot:
        //
        //   Add()       
        //   Remove()    
        //
        // The caller gets access to the data,
        // but not the ability to modify the collection.
        IReadOnlyCollection<Employee> employees =
            repo.GetAll();


        // IReadOnlyCollection<T> provides Count.
        Console.WriteLine(
            $"Total: {employees.Count}");


        // IReadOnlyCollection<T> inherits from
        // IEnumerable<T>.
        //
        // Therefore LINQ extension methods can be used.
        //
        // Count(predicate) counts only employees
        // whose department is "Engineering".
        int engineeringCount =
            employees.Count(
                e => e.Department == "Engineering");


        Console.WriteLine(
            $"Engineering: {engineeringCount}");


        // LINQ can also be used to transform the collection.
        //
        // Select()
        //   ↓
        // Get only the Department value.
        //
        // Distinct()
        //   ↓
        // Remove duplicate departments.
        //
        // OrderBy()
        //   ↓
        // Sort departments alphabetically.
        //
        // The result is IEnumerable<string>.
        IEnumerable<string> departments =
            employees
                .Select(e => e.Department)
                .Distinct()
                .OrderBy(d => d);


        Console.WriteLine(
            "Departments: " +
            string.Join(", ", departments));


        // Pass the read-only collection to another method.
        //
        // PrintAll() can read the employees,
        // but it cannot modify the collection.
        PrintAll(employees);
    }


    // This method only needs to READ the employees.
    //
    // Therefore IReadOnlyCollection<Employee> is a better
    // parameter type than List<Employee>.
    //
    // This communicates the intention clearly:
    //
    // "This method needs to read the collection,
    // but it should not modify it."
    private static void PrintAll(
        IReadOnlyCollection<Employee> employees)
    {
        // IReadOnlyCollection<T> extends IEnumerable<T>,
        // so foreach is available.
        foreach (Employee e in employees)
        {
            Console.WriteLine(
                $"  [{e.Id}] {e.Name} — {e.Department}");
        }
    }


    // This repository represents a common real-world pattern.
    //
    // The repository internally owns a mutable List<Employee>.
    //
    // External callers should not be able to directly
    // modify that internal list.
    private class EmployeeRepository
    {
        // Private mutable collection.
        //
        // Only the repository itself can access this field.
        private readonly List<Employee> _employees = [];


        // Add an employee to the internal list.
        //
        // Because this method belongs to the repository,
        // the repository controls how employees are added.
        public void Add(
            Employee employee) =>
            _employees.Add(employee);


        // Return the employees as IReadOnlyCollection<Employee>.
        //
        // The important part is the return type:
        //
        // IReadOnlyCollection<Employee>
        //
        // The caller receives read-only collection capabilities.
        //
        // The repository still owns the underlying List<Employee>
        // and can continue to modify it internally.
        public IReadOnlyCollection<Employee> GetAll() =>
            _employees;
    }
}