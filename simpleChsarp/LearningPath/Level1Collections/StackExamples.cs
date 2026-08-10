namespace simpleChsarp.LearningPath.Level1Collections;

public static class StackExamples
{
    public static void Run()
    {
        // Display the collection we are learning.
        Console.WriteLine("\n=== Stack<T> ===");


        // Create an empty Stack<string>.
        //
        // T = string
        //
        // A Stack<T> follows LIFO:
        //
        // Last In → First Out
        //
        // Think of a stack like a pile of plates:
        //
        // The last plate placed on the top
        // is the first plate removed.
        Stack<string> actions = new();


        // Push() adds an item to the TOP of the stack.
        //
        // Stack:
        //
        // Top
        //  ↓
        // Open file
        actions.Push("Open file");


        // Add another action to the TOP.
        //
        // Top
        //  ↓
        // Edit line
        // Open file
        actions.Push("Edit line");


        // Add another action to the TOP.
        //
        // Top
        //  ↓
        // Save file
        // Edit line
        // Open file
        actions.Push("Save file");


        // Peek() returns the item at the TOP
        // without removing it.
        //
        // The most recent action is:
        // Save file
        //
        // IMPORTANT:
        // Peek() only looks at the top item.
        Console.WriteLine(
            "Top: " + actions.Peek());


        // Pop() removes AND returns the item at the TOP.
        //
        // Since "Save file" was added last,
        // it is removed first.
        //
        // Before:
        // Save file
        // Edit line
        // Open file
        //
        // After:
        // Edit line
        // Open file
        Console.WriteLine(
            "Undo: " + actions.Pop());


        // Stack<T> implements IEnumerable<T>,
        // so we can iterate through the remaining actions.
        //
        // The iteration starts from the TOP of the stack.
        Console.WriteLine(
            "Remaining: " + string.Join(" -> ", actions));
    }
}