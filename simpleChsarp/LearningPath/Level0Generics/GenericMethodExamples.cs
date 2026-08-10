namespace simpleChsarp.LearningPath.Level0Generics;

public static class GenericMethodExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Generic Methods ===");

        // Create two int variables.
        int first = 10;
        int second = 20;

        // Call the generic Swap<T> method.
        //
        // C# automatically determines:
        //
        // T = int
        //
        // So this is effectively:
        //
        // Swap<int>(ref first, ref second);
        //
        // ref allows the method to modify the original variables.
        Swap(ref first, ref second);

        Console.WriteLine(
            $"Swap<int>: first={first}, second={second}");

        // Create an array of strings.
        //
        // new[] automatically creates:
        //
        // string[]
        //
        // GetFirst<T>() is called with:
        //
        // T = string
        //
        // So this is effectively:
        //
        // GetFirst<string>(new[] { "Sam", "Alex", "Nora" })
        Console.WriteLine(
            $"GetFirst<string>: {GetFirst(new[] { "Sam", "Alex", "Nora" })}");
    }


    // Generic method.
    //
    // <T> means T is a generic type parameter.
    //
    // The method can work with different types:
    //
    // Swap<int>()
    // Swap<string>()
    // Swap<double>()
    // Swap<User>()
    //
    // ref means the method receives references to the
    // original variables, so it can change their values.
    private static void Swap<T>(ref T left, ref T right)
    {
        // Create a temporary variable of type T.
        //
        // If T = int:
        // int temp = left;
        //
        // If T = string:
        // string temp = left;
        T temp = left;

        // Put the right value into the left variable.
        left = right;

        // Put the original left value into the right variable.
        right = temp;
    }


    // Another generic method.
    //
    // T can be any type.
    //
    // IEnumerable<T> means:
    //
    // "Give me a collection/enumerable sequence of T."
    //
    // Examples:
    //
    // IEnumerable<string>
    // IEnumerable<int>
    // IEnumerable<User>
    private static T GetFirst<T>(IEnumerable<T> values)
    {
        // First() returns the first element in the sequence.
        //
        // Because values contains T:
        //
        // First() returns T.
        return values.First();
    }
}