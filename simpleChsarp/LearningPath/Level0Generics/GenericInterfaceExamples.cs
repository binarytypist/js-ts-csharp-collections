namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericInterfaceExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Interfaces ===");

        IRepository<CatalogItem> repository = new InMemoryRepository<CatalogItem>();
        repository.Add(new CatalogItem { Id = 1, Name = "Laptop" });
        repository.Add(new CatalogItem { Id = 2, Name = "Keyboard" });

        CatalogItem? found = repository.FindById(2);
        Console.WriteLine($"FindById(2): {found?.Name}");

        List<string> allNames = repository
            .GetAll()
            .Select(item => item.Name)
            .ToList();

        Console.WriteLine("All items: " + string.Join(", ", allNames));
    }
}

public interface IEntity
{
    int Id { get; }
}

public interface IRepository<T> where T : IEntity
{
    void Add(T item);

    IReadOnlyList<T> GetAll();

    T? FindById(int id);
}

public sealed class InMemoryRepository<T> : IRepository<T> where T : class, IEntity
{
    private readonly List<T> _items = [];

    public void Add(T item)
    {
        _items.Add(item);
    }

    public IReadOnlyList<T> GetAll()
    {
        return _items;
    }

    public T? FindById(int id)
    {
        return _items.FirstOrDefault(item => item.Id == id);
    }
}

public sealed class CatalogItem : IEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
}
