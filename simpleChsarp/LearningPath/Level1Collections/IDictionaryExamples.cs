namespace simpleChsarp.LearningPath.Level1Collections;

public static class IDictionaryExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IDictionary<TKey, TValue> ===");

        // IDictionary<TKey, TValue> maps keys to values.
        //
        // Key     Value
        // ──────────────
        // 1   →   Sam
        // 2   →   Nora
        //
        // Use it for key-based lookup.
        // The interface gives you the contract without
        // tying you to Dictionary<TKey,TValue> specifically.
        IDictionary<int, string> employees =
            new Dictionary<int, string>
            {
                [1] = "Sam",
                [2] = "Nora"
            };

        employees.Add(3, "Alex");
        employees[2] = "Michael";

        Console.WriteLine($"Employee 1: {employees[1]}");
        Console.WriteLine($"ContainsKey 3: {employees.ContainsKey(3)}");

        foreach (KeyValuePair<int, string> entry in employees)
        {
            Console.WriteLine($"  {entry.Key} → {entry.Value}");
        }
    }
}
