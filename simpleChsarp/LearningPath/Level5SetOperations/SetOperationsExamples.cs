namespace simpleChsarp.LearningPath.Level5SetOperations;

public static class SetOperationsExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Set Operations Examples ===");

        List<int> first = [1, 2, 2, 3, 4, 5];
        List<int> second = [4, 5, 6, 6, 7];

        // Distinct removes duplicate values from a sequence.
        List<int> distinctFirst = first.Distinct().ToList();

        // Union combines both sequences and removes duplicates.
        List<int> union = first.Union(second).ToList();

        // Intersect returns values present in both sequences.
        List<int> intersect = first.Intersect(second).ToList();

        // Except returns values in first that are not in second.
        List<int> except = first.Except(second).ToList();

        // Concat appends sequences and keeps duplicates/order.
        List<int> concat = first.Concat(second).ToList();

        Console.WriteLine("Distinct(first): " + string.Join(", ", distinctFirst));
        Console.WriteLine("Union(first, second): " + string.Join(", ", union));
        Console.WriteLine("Intersect(first, second): " + string.Join(", ", intersect));
        Console.WriteLine("Except(first, second): " + string.Join(", ", except));
        Console.WriteLine("Concat(first, second): " + string.Join(", ", concat));
    }
}
