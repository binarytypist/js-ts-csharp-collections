namespace simpleChsarp.LearningPath.Level1Collections;

public static class IEnumerableExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== IEnumerable ===");

        // IEnumerable<int> means:
        //
        // "numbers is a sequence that can provide int values."
        //
        // It does NOT necessarily mean that numbers is a List<int>
        // or an Array.
        //
        // It simply provides a way to iterate through the values.
        IEnumerable<int> numbers = GetEvenNumbers(1, 10);

        // IEnumerable can be used with foreach, LINQ,
        // string.Join(), etc.
        //
        // The sequence produces:
        //
        // 2, 4, 6, 8, 10
        Console.WriteLine(
            "Even numbers: " + string.Join(", ", numbers));
    }


    // This method returns IEnumerable<int>.
    //
    // That means:
    //
    // "This method will provide a sequence of integers."
    //
    // It doesn't need to return a List<int>.
    // It can produce the values one at a time.
    private static IEnumerable<int> GetEvenNumbers(
        int start,
        int end)
    {
        // Loop from start to end.
        for (int i = start; i <= end; i++)
        {
            // Check whether the number is even.
            //
            // % is the remainder operator.
            //
            // If i % 2 == 0:
            // the number is divisible by 2.
            if (i % 2 == 0)
            {
                // yield return produces one value from the sequence.
                //
                // IMPORTANT:
                // yield return does NOT return from the entire
                // method permanently.
                //
                // It produces a value and pauses the method.
                //
                // The next time the caller asks for another value,
                // execution continues from here.
                yield return i;
            }
        }
    }
}