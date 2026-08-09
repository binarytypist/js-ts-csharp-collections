namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class Level2BasicLinqDemo
{
    public static void Run()
    {
        Console.WriteLine("LEVEL 2 - Basic LINQ [Roadmap Step 9]");
        Console.WriteLine("Where -> Select -> SelectMany -> First/Single/Last -> Any/All/Contains -> Count/Sum/Min/Max/Average");

        ProjectionExamples.Run();
        ElementExamples.Run();
        QuantifierExamples.Run();
        AggregateExamples.Run();
    }
}
