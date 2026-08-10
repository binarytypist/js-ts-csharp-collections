namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class Level1InterfacesPracticeInterviewPractice
{
    public static void Run()
    {
        Console.WriteLine("\n=== Level 1 Interfaces Practice - Interview Questions (1-12) ===");

        Problem1_ValueVsReferenceTypes();
        Problem2_ClassesAndObjects();
        Problem3_ListOperations();
        Problem4_DictionaryTryGetValue();
        Problem5_GenericSwap();
        Problem6_IEnumerableAndYield();
        Problem7_CollectionInterfaces();
        Problem8_LinqBasics();
        Problem9_SetOperations();
        Problem10_GenericConstraint();
        Problem11_ShallowVsDeepCopy();
        Problem12_RepositoryChallenge();
    }

    // Problem 1:
    // int a = 10;
    // int b = a;
    // b = 20;
    // Console.WriteLine(a);
    // Console.WriteLine(b);
    // What is the output, and why?
    private static void Problem1_ValueVsReferenceTypes()
    {
        Console.WriteLine("\n[Problem 1] Value vs Reference Types");

        int a = 10;
        int b = a;

        b = 20;

        Console.WriteLine(a);
        Console.WriteLine(b);

        Console.WriteLine("Explanation: int is a value type, so b gets a copy of a. Changing b does not change a.");
    }

    // Problem 2:
    // Create a Person class with Id, Name, Age.
    // Create two Person objects and print their information.
    // Bonus: make Name required/non-nullable.
    private static void Problem2_ClassesAndObjects()
    {
        Console.WriteLine("\n[Problem 2] Classes and Objects");

        PersonQ2 person1 = new() { Id = 1, Name = "Sam", Age = 27 };
        PersonQ2 person2 = new() { Id = 2, Name = "Nora", Age = 25 };

        Console.WriteLine($"Id: {person1.Id}, Name: {person1.Name}, Age: {person1.Age}");
        Console.WriteLine($"Id: {person2.Id}, Name: {person2.Name}, Age: {person2.Age}");
    }

    // Problem 3:
    // Given List<int> numbers = [10, 20, 30, 40, 50];
    // Add 60, remove 20, check if 40 exists,
    // print numbers greater than 30.
    private static void Problem3_ListOperations()
    {
        Console.WriteLine("\n[Problem 3] List<T>");

        List<int> numbers = [10, 20, 30, 40, 50];

        numbers.Add(60);
        numbers.Remove(20);

        bool hasForty = numbers.Contains(40);
        Console.WriteLine($"Contains 40: {hasForty}");

        IEnumerable<int> greaterThanThirty = numbers.Where(n => n > 30);
        Console.WriteLine("Numbers greater than 30:");
        foreach (int value in greaterThanThirty)
        {
            Console.WriteLine(value);
        }
    }

    // Problem 4:
    // Implement:
    // string? FindEmployee(Dictionary<int, string> employees, int id)
    // using TryGetValue() and return null if not found.
    private static void Problem4_DictionaryTryGetValue()
    {
        Console.WriteLine("\n[Problem 4] Dictionary + TryGetValue");

        Dictionary<int, string> employees = new()
        {
            [1] = "Sam",
            [2] = "Nora",
            [3] = "Alex"
        };

        string? employee2 = FindEmployee(employees, 2);
        string? employee9 = FindEmployee(employees, 9);

        Console.WriteLine($"Id 2: {employee2}");
        Console.WriteLine($"Id 9: {(employee9 ?? "null")}");
    }

    private static string? FindEmployee(
        Dictionary<int, string> employees,
        int id)
    {
        return employees.TryGetValue(id, out string? name)
            ? name
            : null;
    }

    // Problem 5:
    // Implement generic swap:
    // static void Swap<T>(ref T first, ref T second)
    // and use with int and string.
    private static void Problem5_GenericSwap()
    {
        Console.WriteLine("\n[Problem 5] Generic Method Swap<T>");

        int a = 10;
        int b = 20;
        Swap(ref a, ref b);
        Console.WriteLine($"Swapped ints: a={a}, b={b}");

        string x = "Hello";
        string y = "World";
        Swap(ref x, ref y);
        Console.WriteLine($"Swapped strings: x={x}, y={y}");

        Console.WriteLine("Explanation: T is a type parameter. It stands for any type used when calling the method.");
    }

    private static void Swap<T>(ref T first, ref T second)
    {
        T temp = first;
        first = second;
        second = temp;
    }

    // Problem 6:
    // Implement:
    // static IEnumerable<int> GetEvenNumbers(IEnumerable<int> numbers)
    // using yield return.
    private static void Problem6_IEnumerableAndYield()
    {
        Console.WriteLine("\n[Problem 6] IEnumerable<T> and yield return");

        int[] numbers = [1, 2, 3, 4, 5, 6, 7, 8];

        IEnumerable<int> evens = GetEvenNumbers(numbers);
        foreach (int number in evens)
        {
            Console.WriteLine(number);
        }

        Console.WriteLine("Explanation: yield return generates items lazily, so items are produced on demand.");
    }

    private static IEnumerable<int> GetEvenNumbers(IEnumerable<int> numbers)
    {
        foreach (int number in numbers)
        {
            if (number % 2 == 0)
            {
                yield return number;
            }
        }
    }

    // Problem 7:
    // Choose best parameter type:
    // Method1 -> foreach only
    // Method2 -> Count only
    // Method3 -> index access users[0]
    // Method4 -> add users.Add(...)
    private static void Problem7_CollectionInterfaces()
    {
        Console.WriteLine("\n[Problem 7] Collection Interface Selection");

        List<string> users = ["Sam", "Alex", "Nora"];

        Method1(users);
        Method2(users);
        Method3(users);
        Method4(users);

        Console.WriteLine("Method1 uses IEnumerable<string> for iteration only.");
        Console.WriteLine("Method2 uses IReadOnlyCollection<string> because it needs Count but no mutation.");
        Console.WriteLine("Method3 uses IReadOnlyList<string> because it needs index access.");
        Console.WriteLine("Method4 uses ICollection<string> because it needs Add().");
    }

    private static void Method1(IEnumerable<string> users)
    {
        foreach (string user in users)
        {
            Console.WriteLine(user);
        }
    }

    private static void Method2(IReadOnlyCollection<string> users)
    {
        Console.WriteLine(users.Count);
    }

    private static void Method3(IReadOnlyList<string> users)
    {
        Console.WriteLine(users[0]);
    }

    private static void Method4(ICollection<string> users)
    {
        users.Add("John");
        Console.WriteLine(string.Join(", ", users));
    }

    // Problem 8:
    // Given Product list, use LINQ to:
    // - price > 100
    // - names only
    // - order by ascending price
    // - most expensive
    // - average price
    // - group by category
    private static void Problem8_LinqBasics()
    {
        Console.WriteLine("\n[Problem 8] LINQ");

        List<ProductQ8> products =
        [
            new("Laptop", 999m, "Computer"),
            new("Keyboard", 49m, "Computer"),
            new("Mouse", 29m, "Computer"),
            new("Desk", 300m, "Furniture"),
            new("Chair", 150m, "Furniture")
        ];

        IEnumerable<ProductQ8> overHundred = products.Where(p => p.Price > 100m);
        IEnumerable<string> names = products.Select(p => p.Name);
        IEnumerable<ProductQ8> ordered = products.OrderBy(p => p.Price);
        ProductQ8? mostExpensive = products.MaxBy(p => p.Price);
        decimal averagePrice = products.Average(p => p.Price);
        IEnumerable<IGrouping<string, ProductQ8>> grouped = products.GroupBy(p => p.Category);

        Console.WriteLine("Products > 100:");
        foreach (ProductQ8 product in overHundred)
        {
            Console.WriteLine($"{product.Name} ({product.Price})");
        }

        Console.WriteLine("Names:");
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }

        Console.WriteLine("Ordered by price:");
        foreach (ProductQ8 product in ordered)
        {
            Console.WriteLine($"{product.Name} ({product.Price})");
        }

        Console.WriteLine($"Most expensive: {mostExpensive?.Name} ({mostExpensive?.Price})");
        Console.WriteLine($"Average price: {averagePrice:F2}");

        Console.WriteLine("Grouped by category:");
        foreach (IGrouping<string, ProductQ8> group in grouped)
        {
            Console.WriteLine(group.Key);
            foreach (ProductQ8 product in group)
            {
                Console.WriteLine($"  {product.Name} ({product.Price})");
            }
        }
    }

    // Problem 9:
    // Use ISet/HashSet and set operators:
    // IntersectWith, ExceptWith, UnionWith
    private static void Problem9_SetOperations()
    {
        Console.WriteLine("\n[Problem 9] ISet<T> / HashSet<T>");

        ISet<string> backend = new HashSet<string>
        {
            "C#",
            "SQL",
            "Docker",
            "REST"
        };

        ISet<string> frontend = new HashSet<string>
        {
            "TypeScript",
            "React",
            "REST",
            "Docker"
        };

        HashSet<string> shared = new(backend);
        shared.IntersectWith(frontend);

        HashSet<string> backendOnly = new(backend);
        backendOnly.ExceptWith(frontend);

        HashSet<string> allSkills = new(backend);
        allSkills.UnionWith(frontend);

        Console.WriteLine($"Shared: {string.Join(", ", shared)}");
        Console.WriteLine($"Backend only: {string.Join(", ", backendOnly)}");
        Console.WriteLine($"All skills: {string.Join(", ", allSkills)}");

        Console.WriteLine("Explanation: HashSet<T> is better than List<T> here because set operations and lookup are efficient and duplicates are prevented.");
    }

    // Problem 10:
    // Implement:
    // static T? FindById<T>(IEnumerable<T> items, int id) where T : IEntity
    private static void Problem10_GenericConstraint()
    {
        Console.WriteLine("\n[Problem 10] Generic Constraint where T : IEntity");

        List<UserQ10> users =
        [
            new(1, "Sam"),
            new(2, "Alex"),
            new(3, "Nora")
        ];

        UserQ10? user = FindById(users, 2);
        Console.WriteLine(user is null ? "User not found" : $"Found: {user.Name}");

        Console.WriteLine("Explanation: where T : IEntity guarantees T has an Id property, so item.Id is always valid.");
    }

    private static T? FindById<T>(
        IEnumerable<T> items,
        int id)
        where T : IEntityQ10
    {
        foreach (T item in items)
        {
            if (item.Id == id)
            {
                return item;
            }
        }

        return default;
    }

    // Problem 11:
    // Reference assignment, then mutation on person2.
    // Explain value copy, reference copy, shallow copy, deep copy.
    private static void Problem11_ShallowVsDeepCopy()
    {
        Console.WriteLine("\n[Problem 11] Shallow vs Deep Copy");

        PersonQ11 person1 = new()
        {
            Name = "Sam",
            Address = new AddressQ11
            {
                City = "Berlin"
            }
        };

        PersonQ11 person2 = person1;

        person2.Name = "Alex";
        person2.Address.City = "Hamburg";

        Console.WriteLine(person1.Name);
        Console.WriteLine(person1.Address.City);

        Console.WriteLine("Explanation: person2 = person1 copies the reference, so both variables point to the same object graph.");
        Console.WriteLine("Value copy: copies the data itself (e.g., int). Reference copy: copies the object address/reference.");
        Console.WriteLine("Shallow copy: copies top-level object, nested references are shared. Deep copy: copies nested objects too.");
    }

    // Problem 12:
    // Build IRepository<T> and ProductRepository with Add/GetAll/FindById/Remove.
    // Include record, sealed, nullable, IReadOnlyCollection, IEnumerable, LINQ, TryGetValue.
    private static void Problem12_RepositoryChallenge()
    {
        Console.WriteLine("\n[Problem 12] Final Challenge - Product Repository");

        IRepository<ProductQ12> repository = new ProductRepository();

        repository.Add(new ProductQ12(1, "Laptop", 999m));
        repository.Add(new ProductQ12(2, "Keyboard", 49m));
        repository.Add(new ProductQ12(3, "Mouse", 29m));

        ProductQ12? found = repository.FindById(2);
        Console.WriteLine(found is null ? "Product not found" : $"Found by id=2: {found.Name}");

        bool removed = repository.Remove(2);
        Console.WriteLine($"Removed id=2: {removed}");

        IReadOnlyCollection<ProductQ12> all = repository.GetAll();

        Console.WriteLine("All products:");
        foreach (ProductQ12 product in all)
        {
            Console.WriteLine($"{product.Id}: {product.Name} - {product.Price}");
        }

        IEnumerable<string> names = all.Select(p => p.Name);
        Console.WriteLine($"Names via LINQ: {string.Join(", ", names)}");
    }

    public sealed class PersonQ2
    {
        public int Id { get; init; }

        public required string Name { get; init; }

        public int Age { get; init; }
    }

    public record ProductQ8(string Name, decimal Price, string Category);

    public interface IEntityQ10
    {
        int Id { get; }
    }

    public record UserQ10(int Id, string Name) : IEntityQ10;

    public sealed class AddressQ11
    {
        public string City { get; set; } = string.Empty;
    }

    public sealed class PersonQ11
    {
        public string Name { get; set; } = string.Empty;

        public AddressQ11 Address { get; set; } = new();
    }

    public record ProductQ12(
        int Id,
        string Name,
        decimal Price);

    public interface IRepository<T>
    {
        void Add(T item);

        IReadOnlyCollection<T> GetAll();

        T? FindById(int id);

        bool Remove(int id);
    }

    public sealed class ProductRepository : IRepository<ProductQ12>
    {
        private readonly Dictionary<int, ProductQ12> _productsById = new();

        public void Add(ProductQ12 item)
        {
            if (!_productsById.TryAdd(item.Id, item))
            {
                throw new InvalidOperationException(
                    $"Product with ID {item.Id} already exists.");
            }
        }

        public IReadOnlyCollection<ProductQ12> GetAll()
        {
            return _productsById.Values.ToList();
        }

        public ProductQ12? FindById(int id)
        {
            return _productsById.TryGetValue(id, out ProductQ12? product)
                ? product
                : null;
        }

        public bool Remove(int id)
        {
            return _productsById.Remove(id);
        }
    }
}
