namespace simpleChsarp.LearningPath.Level1Collections;

public static class DictionaryExamples
{
    // Entry point for the Dictionary example.
    public static void Run()
    {
        // Display the collection we are learning.
        //
        // Dictionary<TKey, TValue> stores data as:
        //
        // Key → Value
        //
        // In this example:
        //
        // TKey   = int
        // TValue = string
        //
        // So the dictionary stores:
        //
        // int → string
        Console.WriteLine("\n=== Dictionary<TKey, TValue> ===");


        // Create a Dictionary where:
        //
        // Key   = int
        // Value = string
        //
        // Each key must be unique.
        Dictionary<int, string> employees = new()
        {
            // Key 1 → Value "Sam"
            [1] = "Sam",

            // Key 2 → Value "Nora"
            [2] = "Nora",

            // Key 3 → Value "Alex"
            [3] = "Alex"
        };


        // Access a value using its key.
        //
        // employees[2] means:
        // "Give me the value associated with key 2."
        //
        // Result:
        // Nora
        Console.WriteLine(
            "Employee 2: " + employees[2]);


        // Check whether the dictionary contains
        // a specific key.
        //
        // ContainsKey(3) returns:
        // true
        //
        // because key 3 exists.
        Console.WriteLine(
            "Contains key 3: " + employees.ContainsKey(3));


        // Loop through every key-value pair.
        //
        // KeyValuePair<int, string> represents:
        //
        // Key   → int
        // Value → string
        //
        // Each item contains:
        // item.Key
        // item.Value
        foreach (KeyValuePair<int, string> item in employees)
        {
            Console.WriteLine(
                $"{item.Key} => {item.Value}");
        }
    }
}
