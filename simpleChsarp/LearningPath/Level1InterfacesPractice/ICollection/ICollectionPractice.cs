namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class ICollectionPractice
{
    // A simple immutable record used as our collection item.
    //
    // record automatically provides value-based equality,
    // which is especially useful when working with HashSet<T>.
    private record Product(
        int Id,
        string Name,
        decimal Price);


    public static void Run()
    {
        Console.WriteLine("\n=== ICollection<T> — Intermediate ===");


        // ICollection<T> is an interface that represents
        // a collection whose items can be:
        //
        // - Added
        // - Removed
        // - Checked with Contains()
        // - Counted
        // - Iterated
        //
        // The important idea is:
        //
        // We program against the interface instead of
        // depending on a specific collection implementation.
        //
        // For example, a method accepting ICollection<Product>
        // can receive:
        //
        // List<Product>
        // HashSet<Product>
        //
        // without changing the method.


        // Create a List<Product>.
        //
        // List<T> implements ICollection<T>,
        // so it can be passed to methods expecting
        // ICollection<Product>.
        List<Product> listProducts =
        [
            new(1, "Laptop", 999m),
            new(2, "Keyboard", 49m),
            new(3, "Monitor", 329m)
        ];


        // Pass List<Product> to a method that expects
        // ICollection<Product>.
        //
        // This works because:
        //
        // List<Product>
        //       ↓
        // ICollection<Product>
        PrintCount(
            listProducts,
            "List<Product>");


        // Create a HashSet<Product>.
        //
        // HashSet<T> also implements ICollection<T>.
        //
        // Therefore, the same PrintCount() method can
        // accept this collection as well.
        HashSet<Product> setProducts =
        [
            new(4, "Mouse", 29m),
            new(5, "Webcam", 89m)
        ];


        // HashSet<Product> can also be passed as
        // ICollection<Product>.
        PrintCount(
            setProducts,
            "HashSet<Product>");


        // Add all products from setProducts into listProducts.
        //
        // AddRange() accepts:
        //
        // ICollection<Product> target
        //
        // and:
        //
        // IEnumerable<Product> source
        //
        // Therefore, the method does not care that
        // target is a List and source is a HashSet.
        AddRange(
            listProducts,
            setProducts);


        // The original list contained 3 products.
        //
        // Two products were added from the HashSet:
        //
        // 3 + 2 = 5
        Console.WriteLine(
            $"After merge: {listProducts.Count} products");


        // Remove products whose price is greater than $100.
        //
        // Again, the method accepts ICollection<Product>.
        //
        // It does not need to know whether the collection
        // is a List, HashSet, or another ICollection<T>
        // implementation.
        RemoveExpensive(
            listProducts,
            threshold: 100m);


        Console.WriteLine("Remaining (under $100):");


        // ICollection<T> inherits from IEnumerable<T>,
        // so we can use foreach to iterate over its items.
        foreach (Product p in listProducts)
        {
            Console.WriteLine(
                $"  {p.Name} — ${p.Price}");
        }
    }


    // Accepts ANY collection that implements ICollection<Product>.
    //
    // The method only needs the capabilities provided by
    // ICollection<T>.
    //
    // It does not care whether the caller provides:
    //
    // List<Product>
    // HashSet<Product>
    // or another ICollection<Product> implementation.
    private static void PrintCount(
        ICollection<Product> products,
        string label) =>
        Console.WriteLine(
            $"{label}: {products.Count} items");


    // Adds every item from source into target.
    //
    // target:
    //   ICollection<Product>
    //   → We need Add()
    //
    // source:
    //   IEnumerable<Product>
    //   → We only need to iterate through it.
    //
    // This is a good example of using different interfaces
    // according to the capabilities a method actually needs.
    private static void AddRange(
        ICollection<Product> target,
        IEnumerable<Product> source)
    {
        // Iterate through the source collection.
        foreach (Product item in source)
        {
            // Add each item to the target collection.
            target.Add(item);
        }
    }


    // Removes products whose price is greater than
    // the specified threshold.
    //
    // ICollection<T> provides Remove(),
    // so we can remove items without knowing
    // the concrete collection type.
    private static void RemoveExpensive(
        ICollection<Product> products,
        decimal threshold)
    {
        // We should NOT directly remove items from the
        // collection while iterating over that same collection.
        //
        // This can cause:
        //
        // "Collection was modified; enumeration operation
        // may not execute."
        //
        // Therefore, first create a separate list containing
        // the products that need to be removed.
        //
        // Where() filters the collection.
        //
        // ToList() creates a separate snapshot.
        List<Product> toRemove = products
            .Where(p => p.Price > threshold)
            .ToList();


        // Now we can safely remove the selected products
        // from the original collection.
        foreach (Product p in toRemove)
        {
            products.Remove(p);
        }
    }
}