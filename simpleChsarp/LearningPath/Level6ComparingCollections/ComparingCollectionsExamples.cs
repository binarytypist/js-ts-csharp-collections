namespace simpleChsarp.LearningPath.Level6ComparingCollections;

public static class ComparingCollectionsExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Comparing Collections Examples ===");

        List<int> first = [1, 2, 3, 4];
        List<int> second = [1, 2, 3, 4];
        List<int> third = [4, 3, 2, 1];

        // SequenceEqual checks same values in the same order.
        bool sameOrderEqual = first.SequenceEqual(second);
        bool differentOrderEqual = first.SequenceEqual(third);

        // Any checks whether at least one shared value exists.
        bool hasAnyCommon = first.Any(value => third.Contains(value));

        // All + Contains checks whether all items of first are in third.
        bool allIncluded = first.All(value => third.Contains(value));

        // Contains checks membership of a single value.
        bool containsThree = first.Contains(3);

        // HashSet.SetEquals compares as sets (ignores order and duplicates).
        HashSet<int> firstSet = [.. first];
        HashSet<int> thirdSet = [.. third];
        bool setEqual = firstSet.SetEquals(thirdSet);

        Console.WriteLine($"SequenceEqual(first, second): {sameOrderEqual}");
        Console.WriteLine($"SequenceEqual(first, third): {differentOrderEqual}");
        Console.WriteLine($"Any common values: {hasAnyCommon}");
        Console.WriteLine($"All first values exist in third: {allIncluded}");
        Console.WriteLine($"Contains 3 in first: {containsThree}");
        Console.WriteLine($"HashSet.SetEquals(first, third): {setEqual}");
    }
}
