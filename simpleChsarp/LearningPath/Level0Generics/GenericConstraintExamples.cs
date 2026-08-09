namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericConstraintExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Constraints ===");

        User user = new() { Id = 1, Name = "Sam" };
        User cloned = Clone(user);

        Console.WriteLine($"Clone<User>: Id={cloned.Id}, Name={cloned.Name}");
    }

    private static T Clone<T>(T source) where T : ICloneable
    {
        return (T)source.Clone();
    }
}

public sealed class User : ICloneable
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public object Clone()
    {
        return new User
        {
            Id = Id,
            Name = Name
        };
    }
}
