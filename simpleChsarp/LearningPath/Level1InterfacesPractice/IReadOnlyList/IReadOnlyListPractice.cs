namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class IReadOnlyListPractice
{
    // A simple immutable record representing a product.
    private record Product(
        string Name,
        decimal Price);


    public static void Run()
    {
        Console.WriteLine(
            "\n=== IReadOnlyList<T> — Intermediate ===");


        // IReadOnlyList<T> is a read-only, ordered collection
        // that provides index-based access.
        //
        // Think of it as:
        //
        // IReadOnlyCollection<T>
        //        +
        // index access [0]
        //
        // It provides:
        //
        // Count       ✅
        // foreach     ✅
        // [index]     ✅
        // LINQ        ✅
        //
        // But it does NOT provide:
        //
        // Add()       
        // Remove()    
        // Insert()    
        // RemoveAt()  
        // [index] =   
        //
        // Use IReadOnlyList<T> when:
        //
        // "I want to expose an ordered list,
        // allow callers to read items by index,
        // but I don't want callers to modify the list."
        IReadOnlyList<Product> catalog =
        [
            new("Laptop", 999m),
            new("Keyboard", 49m),
            new("Monitor", 329m),
            new("Mouse", 29m),
            new("Webcam", 89m)
        ];


        // Count tells us how many products are in the list.
        Console.WriteLine(
            $"Catalog: {catalog.Count} items");


        // IReadOnlyList<T> provides index-based READ access.
        //
        // Index 0 means the first item.
        //
        // IMPORTANT:
        //
        // catalog[0]       ✅ read
        // catalog[0] = ... ❌ cannot modify
        Console.WriteLine(
            $"First: {catalog[0].Name}");


        // The last valid index is Count - 1.
        //
        // If Count = 5:
        //
        // Index:  0   1   2   3   4
        //         ↑           ↑
        //       first        last
        Console.WriteLine(
            $"Last:  {catalog[catalog.Count - 1].Name}");


        // IReadOnlyList<T> is useful when working with
        // positions in an ordered collection.
        //
        // Here we demonstrate simple pagination.
        //
        // Page size = 2
        //
        // Page 1:
        //   Laptop
        //   Keyboard
        //
        // Page 2:
        //   Monitor
        //   Mouse
        //
        // Page 3:
        //   Webcam
        //
        // GetPage() uses the indexes from IReadOnlyList<T>
        // to return only the requested section.


        Console.WriteLine(
            "\nPage 1 (size 2):");


        foreach (Product p in GetPage(
                     catalog,
                     page: 1,
                     pageSize: 2))
        {
            Console.WriteLine(
                $"  {p.Name} — ${p.Price}");
        }


        Console.WriteLine(
            "\nPage 2 (size 2):");


        foreach (Product p in GetPage(
                     catalog,
                     page: 2,
                     pageSize: 2))
        {
            Console.WriteLine(
                $"  {p.Name} — ${p.Price}");
        }


        // LINQ can create a sorted view of the products.
        //
        // OrderBy() sorts products by price.
        //
        // ToList() creates a new List<Product>.
        //
        // We then expose that list through
        // IReadOnlyList<Product>.
        //
        // This means the rest of the code can read
        // the sorted list by index without modifying it.
        IReadOnlyList<Product> sorted =
            catalog
                .OrderBy(p => p.Price)
                .ToList();


        // Because IReadOnlyList<T> supports index access,
        // we can easily get the cheapest item.
        //
        // After sorting:
        //
        // [0] = Mouse ($29)
        Console.WriteLine(
            $"\nCheapest: {sorted[0].Name} (${sorted[0].Price})");


        // Count - 1 gives the last item.
        //
        // After sorting:
        //
        // [Count - 1] = Laptop ($999)
        Console.WriteLine(
            $"Most expensive: " +
            $"{sorted[sorted.Count - 1].Name} " +
            $"(${sorted[sorted.Count - 1].Price})");
    }


    // Get one page of products from an IReadOnlyList<T>.
    //
    // Why IReadOnlyList<T> here?
    //
    // This method only needs to:
    //
    // - Read Count
    // - Read items by index
    //
    // It does NOT need to Add, Remove, or Insert.
    //
    // Therefore IReadOnlyList<T> is the appropriate
    // interface for this method.
    private static IEnumerable<Product> GetPage(
        IReadOnlyList<Product> source,
        int page,
        int pageSize)
    {
        // Calculate the first index for the requested page.
        //
        // Page 1, size 2:
        // (1 - 1) * 2 = 0
        //
        // Page 2, size 2:
        // (2 - 1) * 2 = 2
        //
        // Page 3, size 2:
        // (3 - 1) * 2 = 4
        int start =
            (page - 1) * pageSize;


        // Calculate the end index.
        //
        // Math.Min() prevents us from going beyond
        // the end of the collection.
        //
        // Example:
        //
        // 5 products, page size 2
        //
        // Page 3 starts at index 4.
        // There is only one item remaining.
        int end =
            Math.Min(
                start + pageSize,
                source.Count);


        // Read items by index.
        //
        // yield return means the method produces
        // one Product at a time instead of creating
        // another list containing the page.
        for (int i = start;
             i < end;
             i++)
        {
            yield return source[i];
        }
    }
}