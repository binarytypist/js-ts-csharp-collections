namespace simpleChsarp.LearningPath.Level1Collections;

public static class ListExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== List<T> ===");

        List<string> users = ["Sam", "Alex", "Nora"];
        users.Add("Mina");
        users.Remove("Alex");

        Console.WriteLine($"Count: {users.Count}");
        Console.WriteLine("Users: " + string.Join(", ", users));
    }
}
