namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericConstraintExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Constraints ===");

        // Create a User object.
        User user = new() { Id = 1, Name = "Sam" };

        // Call Clone with User as the generic type.
        //
        // T becomes User:
        // Clone<User>(user)
        User cloned = Clone(user);

        Console.WriteLine($"Clone<User>: Id={cloned.Id}, Name={cloned.Name}");
    }

    // T is a generic type parameter.
    //
    // "where T : ICloneable" is a generic constraint.
    //
    // It tells the compiler:
    // "T must implement ICloneable."
    //
    // Because of this constraint, we are allowed to call
    // source.Clone() inside this method.
    private static T Clone<T>(T source) where T : ICloneable
    {
        // ICloneable is a C# interface used to indicate that an object can create a copy of itself.
        // ICloneable.Clone() returns object,
        // so we cast the result back to T.
        //
        // For User:
        // T = User
        // source.Clone() → object
        // (T)source.Clone() → User
        return (T)source.Clone();
    }
}

// sealed means User cannot be inherited from.
//
// Example:
//
// public class AdminUser : User
// {
// }
//
// This is not allowed because User is sealed.
//
// IMPORTANT:
// sealed has nothing to do with generics or ICloneable.
// It is a separate C# feature that prevents inheritance.
public sealed class User : ICloneable
{
    // User's ID.
    public int Id { get; set; }

    // User's name.
    // string.Empty provides a default value instead of null.
    public string Name { get; set; } = string.Empty;

    // ICloneable requires a Clone() method.
    //
    // The method returns object because that is how
    // ICloneable.Clone() is defined.
    public object Clone()
    {
        // Create a NEW User object.
        //
        // We copy the values from the current User.
        return new User
        {
            Id = Id,
            Name = Name
        };
    }
}