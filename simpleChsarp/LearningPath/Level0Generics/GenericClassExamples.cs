namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericClassExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Classes ===");

        // Same class, different type arguments.
        // The compiler knows that one Box contains string
        // and the other Box contains int.
        Box<string> userBox = new("Sammie");
        Box<int> scoreBox = new(95);

        Console.WriteLine($"Box<string>: {userBox.Value}");
        Console.WriteLine($"Box<int>: {scoreBox.Value}");
    }
}

// Use sealed when you intentionally want to prevent inheritance—for example, when the class represents
//  a complete implementation and you don't want subclasses changing or extending its behavior.
// So for your Generics learning project, I would explain it as:
// sealed is not related to generics. It is a separate C# feature that prevents inheritance.
// sealed means this class cannot be inherited.
//
// Example:
// public class SpecialBox<T> : Box<T> not aLLowed
// We use sealed when Box<T> is intended to be the final class
// and we do not want other classes to extend or change its behavior.
public sealed class Box<T>
{
    // T represents the type that will be supplied when the class is used.
    //
    // Box<string>  → T is string
    // Box<int>     → T is int
    public Box(T value)
    {
        Value = value;
    }

    // Stores the value using the exact generic type T.
    //
    // Box<string> → Value is string
    // Box<int>    → Value is int
    public T Value { get; }
}

// Think of it like this:

// Box<T>
//   │
//   ├── Box<string>
//   ├── Box<int>
//   └── Box<double>

// sealed says: the final implementation of Box<T>. Nobody can inherit from it."