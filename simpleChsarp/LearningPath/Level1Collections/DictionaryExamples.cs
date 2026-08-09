namespace simpleChsarp.LearningPath.Level1Collections;

public static class DictionaryExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Dictionary<TKey, TValue> ===");

        Dictionary<int, string> employees = new()
        {
            [1] = "Sam",
            [2] = "Nora",
            [3] = "Alex"
        };

        Console.WriteLine("Employee 2: " + employees[2]);
        Console.WriteLine("Contains key 3: " + employees.ContainsKey(3));

        foreach (KeyValuePair<int, string> item in employees)
        {
            Console.WriteLine($"{item.Key} => {item.Value}");
        }
    }
}
