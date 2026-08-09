namespace simpleChsarp.LearningPath.Level0Generics;

public static class Level0GenericsDemo
{
    public static void Run()
    {
        Console.WriteLine("LEVEL 0 - Generics (Foundation) [Roadmap Step 2]");
        Console.WriteLine("Generic methods -> Generic classes -> Generic interfaces -> Generic constraints");

        GenericMethodExamples.Run();
        GenericClassExamples.Run();
        GenericInterfaceExamples.Run();
        GenericConstraintExamples.Run();
    }
}
