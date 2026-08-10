namespace simpleChsarp.LearningPath.Level1Collections;

public static class ArrayExamples
{
    // Entry point for the Array example.
    public static void Run()
    {
        // Display the name of the collection we are learning.
        //
        // T[] means:
        // "An array containing elements of type T."
        //
        // In this example:
        // T = int
        Console.WriteLine("\n=== Array (T[]) ===");


        // Create an integer array.
        //
        // The array contains 4 elements:
        //
        // Index:   0   1   2    3
        // Value:  88  92  75  100
        //
        // Arrays have a fixed size after they are created.
        int[] scores = { 88, 92, 75, 100 };


        // Length returns the total number of elements
        // in the array.
        //
        // Here:
        // scores.Length = 4
        Console.WriteLine($"Length: {scores.Length}");


        // Access an element using its index.
        //
        // Arrays use zero-based indexing:
        //
        // scores[0] → first element → 88
        //
        // ^1 means:
        // "The first element counting from the end."
        //
        // scores[^1] → last element → 100
        Console.WriteLine(
            $"First: {scores[0]}, Last: {scores[^1]}");


        // Sort the array in ascending order.
        //
        // Before:
        // 88, 92, 75, 100
        //
        // After:
        // 75, 88, 92, 100
        //
        // IMPORTANT:
        // Array.Sort() changes the existing array.
        // It does not create a new sorted array.
        Array.Sort(scores);


        // string.Join() combines all array elements into
        // one string separated by ", ".
        //
        // Result:
        // "75, 88, 92, 100"
        Console.WriteLine(
            "Sorted: " + string.Join(", ", scores));
    }
}