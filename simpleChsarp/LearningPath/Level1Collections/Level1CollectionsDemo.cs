namespace simpleChsarp.LearningPath.Level1Collections;

public static class Level1CollectionsDemo
{
    public static void Run()
    {
        Console.WriteLine("LEVEL 1 - C# Collections [Roadmap Steps 1, 3-8]");
        Console.WriteLine("Array -> List -> Dictionary -> HashSet -> Queue -> Stack");
        Console.WriteLine("-> IEnumerable -> ICollection -> IList -> ISet -> IReadOnlyCollection -> IReadOnlyList -> IDictionary");

        ArrayExamples.Run();
        ListExamples.Run();
        DictionaryExamples.Run();
        HashSetExamples.Run();
        QueueExamples.Run();
        StackExamples.Run();
        IEnumerableExamples.Run();
        ICollectionExamples.Run();
        IListExamples.Run();
        ISetExamples.Run();
        IReadOnlyCollectionExamples.Run();
        IReadOnlyListExamples.Run();
        IDictionaryExamples.Run();
    }
}
