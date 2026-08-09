namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericClassExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Classes ===");

        // Same class, different type argument: compile-time type safety without duplicate classes.
        Box<string> userBox = new("Sammie");
        Box<int> scoreBox = new(95);

        Console.WriteLine($"Box<string>: {userBox.Value}");
        Console.WriteLine($"Box<int>: {scoreBox.Value}");
    }
}

public sealed class Box<T>
{
    // T makes this class reusable for any type while keeping strong typing.
    public Box(T value)
    {
        Value = value;
    }

    // The stored value preserves the exact type passed into Box<T>.
    public T Value { get; }
}
