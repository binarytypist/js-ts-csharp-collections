namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericInterfaceExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Interfaces ===");

        // IRepository<CatalogItem> means:
        //
        // T = CatalogItem
        //
        // The repository can now store and manage CatalogItem objects.
        IRepository<CatalogItem> repository =
            new InMemoryRepository<CatalogItem>();

        // Add a CatalogItem to the repository.
        repository.Add(new CatalogItem
        {
            Id = 1,
            Name = "Laptop"
        });

        // Add another CatalogItem.
        repository.Add(new CatalogItem
        {
            Id = 2,
            Name = "Keyboard"
        });

        // Find the item with Id = 2.
        //
        // FindById() returns CatalogItem? because the item
        // might not exist.
        CatalogItem? found = repository.FindById(2);

        // ?. means:
        // "If found is not null, access Name."
        //
        // If found is null, the result is null instead of
        // throwing a NullReferenceException.
        Console.WriteLine($"FindById(2): {found?.Name}");

        // Get all CatalogItem objects from the repository.
        //
        // Select() takes each CatalogItem and returns its Name.
        //
        // Example:
        // CatalogItem 1 → "Laptop"
        // CatalogItem 2 → "Keyboard"
        //
        // ToList() converts the result into List<string>.
        List<string> allNames = repository
            .GetAll()
            .Select(item => item.Name)
            .ToList();

        Console.WriteLine("All items: " + string.Join(", ", allNames));
    }
}


// IEntity is a normal interface.
//
// It says:
// "Any entity must have an Id."
//
// This interface will be used as a generic constraint.
public interface IEntity
{
    // Every entity must provide an integer Id.
    int Id { get; }
}


// Generic interface.
//
// T is the generic type parameter.
//
// "where T : IEntity" is a generic constraint.
//
// It means:
// T MUST implement IEntity.
//
// Therefore, IRepository<T> can safely access:
// item.Id
public interface IRepository<T> where T : IEntity
{
    // Add an object of type T to the repository.
    void Add(T item);

    // Returns all objects of type T.
    //
    // IReadOnlyList means the caller can read the list
    // but cannot modify the collection through this interface.
    IReadOnlyList<T> GetAll();

    // Finds an object using its Id.
    //
    // T? means the result can be:
    // - a T object if found
    // - null if not found
    T? FindById(int id);
}


// Generic implementation of IRepository<T>.
//
// T must:
// 1. Be a class
// 2. Implement IEntity
//
// "class" is a generic constraint that means T must be
// a reference type.
//
// IEntity means T must provide an Id.
public sealed class InMemoryRepository<T> : IRepository<T>
    where T : class, IEntity
{
    // Private list that stores the repository items.
    //
    // Because the repository is generic:
    //
    // InMemoryRepository<CatalogItem>
    //     → List<CatalogItem>
    //
    // InMemoryRepository<Product>
    //     → List<Product>
    private readonly List<T> _items = [];

    // Add a new item to the list.
    public void Add(T item)
    {
        _items.Add(item);
    }

    // Return all stored items.
    //
    // IReadOnlyList prevents callers from directly changing
    // the repository's internal list.
    public IReadOnlyList<T> GetAll()
    {
        return _items;
    }

    // Find the first item whose Id matches the requested id.
    //
    // FirstOrDefault returns:
    // - the matching item
    // - null if no item is found
    public T? FindById(int id)
    {
        return _items.FirstOrDefault(item => item.Id == id);
    }
}


// CatalogItem is an entity.
//
// It implements IEntity, so it MUST provide an Id.
public sealed class CatalogItem : IEntity
{
    // Required by IEntity.
    public int Id { get; set; }

    // Catalog item's name.
    public string Name { get; set; } = string.Empty;
}