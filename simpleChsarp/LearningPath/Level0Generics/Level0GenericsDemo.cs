namespace simpleChsarp.LearningPath.Level0Generics;

public static class Level0GenericsDemo
{
    // Main entry point for the Level 0 Generics section.
    //
    // This method runs all the generic examples in sequence.
    public static void Run()
    {
        // Display the name of this learning section.
        Console.WriteLine(
            "LEVEL 0 - Generics (Foundation) [Roadmap Step 2]");

        // Display the learning order.
        //
        // We start with generic methods because they are simple
        // and help us understand the basic idea of T.
        //
        // Then we move to generic classes.
        //
        // Then generic interfaces.
        //
        // Finally, generic constraints.
        Console.WriteLine(
            "Generic methods -> Generic classes -> Generic interfaces -> Generic constraints");


        // Run the Generic Methods example.
        //
        // This demonstrates:
        // - Generic method
        // - Type parameter <T>
        // - Type inference
        // - ref with generic methods
        GenericMethodExamples.Run();


        // Run the Generic Classes example.
        //
        // This demonstrates:
        // - Generic class Box<T>
        // - Using the same class with different types
        // - Box<string>
        // - Box<int>
        GenericClassExamples.Run();


        // Run the Generic Interfaces example.
        //
        // This demonstrates:
        // - Generic interface IRepository<T>
        // - Generic implementation InMemoryRepository<T>
        // - Generic interface constraints
        // - where T : IEntity
        GenericInterfaceExamples.Run();


        // Run the Generic Constraints example.
        //
        // This demonstrates:
        // - Generic constraints
        // - where T : ICloneable
        // - Restricting which types can be used with T
        GenericConstraintExamples.Run();
    }
}