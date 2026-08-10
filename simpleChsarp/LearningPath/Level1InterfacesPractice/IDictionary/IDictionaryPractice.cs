namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class IDictionaryPractice
{
    // A record representing an order.
    //
    // Each order has:
    // - Id       → unique order identifier
    // - Product  → product name
    // - Quantity → number of items ordered
    //
    // Example:
    // Order(1001, "Laptop", 2)
    private record Order(
        int Id,
        string Product,
        int Quantity);


    public static void Run()
    {
        Console.WriteLine(
            "\n=== IDictionary<TKey, TValue> — Intermediate ===");


        // IDictionary<TKey, TValue> represents a collection
        // of key-value pairs.
        //
        // Here:
        //
        // TKey   = int
        // TValue = Order
        //
        // Therefore:
        //
        // int → Order
        //
        // The order ID is used as the key.
        //
        // Simplified:
        //
        // 1001 → Laptop
        // 1002 → Keyboard
        // 1003 → Monitor
        //
        // We use the interface type (IDictionary) instead of
        // the concrete Dictionary type.
        //
        // This means the rest of our code only depends on
        // dictionary capabilities, not a specific implementation.
        IDictionary<int, Order> orders =
            new Dictionary<int, Order>
            {
                [1001] = new(1001, "Laptop", 2),
                [1002] = new(1002, "Keyboard", 5),
                [1003] = new(1003, "Monitor", 1)
            };


        // TryGetValue() safely searches for a key.
        //
        // If the key exists:
        // - returns true
        // - puts the value into "found"
        //
        // If the key does not exist:
        // - returns false
        // - no exception is thrown.
        //
        // This is generally safer than:
        //
        // orders[1002]
        //
        // when you are not sure whether the key exists.
        if (orders.TryGetValue(
                1002,
                out Order? found))
        {
            Console.WriteLine(
                $"Order 1002: {found.Product} x{found.Quantity}");
        }


        // TryGetValue() also handles missing keys safely.
        //
        // Order 9999 does not exist.
        //
        // TryGetValue() returns false.
        //
        // "out _" means:
        // "We don't need the value; we only care whether
        // the key exists."
        if (!orders.TryGetValue(9999, out _))
        {
            Console.WriteLine(
                "Order 9999: not found");
        }


        // Create another dictionary containing new orders.
        //
        // This represents data coming from another source,
        // such as:
        //
        // - another database
        // - an API
        // - an import file
        // - another service
        IDictionary<int, Order> incoming =
            new Dictionary<int, Order>
            {
                // This key already exists in "orders".
                //
                // Merge() should NOT replace the existing order.
                [1003] = new(1003, "Monitor", 99),

                // These keys are new.
                [1004] = new(1004, "Mouse", 10),
                [1005] = new(1005, "Webcam", 3)
            };


        // Merge the incoming orders into the existing dictionary.
        //
        // Existing keys are preserved.
        // New keys are added.
        Merge(orders, incoming);


        // Original dictionary:
        //
        // 1001 → Laptop
        // 1002 → Keyboard
        // 1003 → Monitor
        //
        // Incoming:
        //
        // 1003 → Monitor  ← duplicate
        // 1004 → Mouse    ← new
        // 1005 → Webcam   ← new
        //
        // Result:
        //
        // 1001
        // 1002
        // 1003
        // 1004
        // 1005
        //
        // Total = 5 orders.
        Console.WriteLine(
            $"\nAfter merge: {orders.Count} orders (duplicate skipped)");


        // Calculate the total quantity ordered for each product.
        //
        // Example:
        //
        // Laptop   → 2
        // Keyboard → 5
        // Monitor  → 1
        // Mouse    → 10
        // Webcam   → 3
        //
        // The result uses:
        //
        // Product name → Total quantity
        IDictionary<string, int> totals =
            SumByProduct(orders);


        Console.WriteLine(
            "\nTotal quantity by product:");


        // Dictionary implements IEnumerable<KeyValuePair<TKey,TValue>>,
        // so we can iterate through its key-value pairs.
        //
        // The tuple syntax:
        //
        // (string product, int qty)
        //
        // gives us the key and value directly.
        foreach ((string product, int qty) in totals)
        {
            Console.WriteLine(
                $"  {product}: {qty}");
        }
    }


    // Merge the source dictionary into the target dictionary.
    //
    // Both parameters use IDictionary<int, Order>.
    //
    // Therefore this method is not tied to the concrete
    // Dictionary<TKey, TValue> class.
    private static void Merge(
        IDictionary<int, Order> target,
        IDictionary<int, Order> source)
    {
        // Iterate through every key-value pair in source.
        foreach ((int key, Order order) in source)
        {
            // TryAdd() adds the key only if it does NOT
            // already exist.
            //
            // If the key already exists:
            //   → nothing is changed
            //
            // If the key doesn't exist:
            //   → the new key-value pair is added
            //
            // Therefore:
            //
            // 1003 → skipped
            // 1004 → added
            // 1005 → added
            target.TryAdd(key, order);
        }
    }


    // Calculate the total quantity for each product.
    //
    // Example input:
    //
    // Laptop   → 2
    // Keyboard → 5
    // Monitor  → 1
    // Mouse    → 10
    // Webcam   → 3
    //
    // Result:
    //
    // Laptop   → 2
    // Keyboard → 5
    // Monitor  → 1
    // Mouse    → 10
    // Webcam   → 3
    private static IDictionary<string, int> SumByProduct(
        IDictionary<int, Order> orders)
    {
        // Create a new dictionary where:
        //
        // Key   = product name
        // Value = total quantity
        Dictionary<string, int> result = [];


        // Values contains only the Order objects.
        //
        // We don't need the order ID here because
        // we are interested in the product and quantity.
        foreach (Order order in orders.Values)
        {
            // TryAdd() attempts to create a new entry.
            //
            // Example:
            //
            // First "Laptop":
            // result.TryAdd("Laptop", 2)
            //
            // Since "Laptop" doesn't exist:
            // → adds Laptop → 2
            //
            // If the product already exists,
            // TryAdd() returns false.
            if (!result.TryAdd(
                    order.Product,
                    order.Quantity))
            {
                // The product already exists.
                //
                // Add the new quantity to the existing total.
                //
                // Example:
                //
                // Existing:
                // Monitor → 1
                //
                // New:
                // Monitor → 5
                //
                // Result:
                // Monitor → 6
                result[order.Product] += order.Quantity;
            }
        }


        // Return the dictionary containing the
        // total quantity for each product.
        return result;
    }
}