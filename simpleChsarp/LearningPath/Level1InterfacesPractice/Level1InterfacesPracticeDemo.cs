namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class Level1InterfacesPracticeDemo
{
    public static void Run()
    {
        Console.WriteLine(
            "LEVEL 1b - Collection Interfaces Practice [Intermediate]");

        // This level focuses on the most important collection
        // interfaces used in everyday C# development.
        //
        // The goal is to understand:
        //
        // - What each interface represents
        // - What operations it provides
        // - When to use one interface instead of another
        // - Why we use interfaces instead of concrete types
        //
        // IMPORTANT:
        //
        // These interfaces do NOT form one single inheritance chain.
        //
        // The simplified relationship is:
        //
        //                  IEnumerable<T>
        //                        │
        //                ICollection<T>
        //                  /          \
        //                 /            \
        //             IList<T>        ISet<T>
        //                │               │
        //             List<T>        HashSet<T>
        //
        // IReadOnly interfaces form a separate read-only branch:
        //
        //       IEnumerable<T>
        //              │
        //   IReadOnlyCollection<T>
        //              │
        //      IReadOnlyList<T>
        //
        // Dictionary has its own interface:
        //
        //       IDictionary<TKey, TValue>
        //              │
        //       Dictionary<TKey, TValue>
        //
        // The examples below demonstrate each interface
        // in a small practical scenario.


        // ----------------------------------------------------
        // ICollection<T>
        // ----------------------------------------------------
        //
        // Demonstrates a general mutable collection.
        //
        // Main capabilities:
        //
        //   Add()
        //   Remove()
        //   Count
        //   Contains()
        //
        // The method can work with different collection
        // implementations such as List<T> and HashSet<T>.
        ICollectionPractice.Run();


        // ----------------------------------------------------
        // IList<T>
        // ----------------------------------------------------
        //
        // Demonstrates an ordered collection where
        // position/index matters.
        //
        // Main capabilities:
        //
        //   [index]
        //   Add()
        //   Insert()
        //   RemoveAt()
        //   IndexOf()
        //
        // IList<T> is useful when we need to work
        // with the position of items.
        IListPractice.Run();


        // ----------------------------------------------------
        // ISet<T>
        // ----------------------------------------------------
        //
        // Demonstrates a collection of UNIQUE values.
        //
        // Main capabilities:
        //
        //   No duplicate values
        //   Union
        //   Intersection
        //   Difference
        //   Subset
        //   Superset
        //
        // The most common implementation is HashSet<T>.
        ISetPractice.Run();


        // ----------------------------------------------------
        // IReadOnlyCollection<T>
        // ----------------------------------------------------
        //
        // Demonstrates a collection that callers can READ
        // but cannot modify through the interface.
        //
        // Main capabilities:
        //
        //   Count
        //   foreach
        //   LINQ
        //
        // No:
        //
        //   Add()
        //   Remove()
        //   Clear()
        //
        // Useful when a class wants to protect its
        // internal collection from external modification.
        IReadOnlyCollectionPractice.Run();


        // ----------------------------------------------------
        // IReadOnlyList<T>
        // ----------------------------------------------------
        //
        // Extends the read-only collection concept by
        // providing INDEX-BASED read access.
        //
        // Main capabilities:
        //
        //   Count
        //   foreach
        //   [index] for reading
        //
        // But the caller cannot:
        //
        //   Add()
        //   Remove()
        //   Insert()
        //   [index] = value
        //
        // Useful when the collection is ordered and
        // callers need to access items by position.
        IReadOnlyListPractice.Run();


        // ----------------------------------------------------
        // IDictionary<TKey, TValue>
        // ----------------------------------------------------
        //
        // Demonstrates KEY-VALUE storage.
        //
        // Example:
        //
        //   1001 -> Laptop
        //   1002 -> Keyboard
        //   1003 -> Monitor
        //
        // Instead of accessing an item by its numeric
        // position, we access it using a KEY.
        //
        // Main capabilities:
        //
        //   key -> value
        //   Add()
        //   Remove()
        //   ContainsKey()
        //   TryGetValue()
        //
        // The most common implementation is:
        //
        //   Dictionary<TKey, TValue>
        IDictionaryPractice.Run();

        // ----------------------------------------------------
        // Interview-style mixed practice (Q1-Q12)
        // ----------------------------------------------------
        // Covers value/reference behavior, generics,
        // LINQ, collection interfaces, sets, and a
        // repository implementation challenge.
        Level1InterfacesPracticeInterviewPractice.Run();
    }
}