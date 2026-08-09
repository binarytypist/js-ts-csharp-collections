namespace simpleChsarp.LearningPath.Level1Collections;

public static class StackExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Stack<T> ===");

        Stack<string> actions = new();
        actions.Push("Open file");
        actions.Push("Edit line");
        actions.Push("Save file");

        Console.WriteLine("Top: " + actions.Peek());
        Console.WriteLine("Undo: " + actions.Pop());
        Console.WriteLine("Remaining: " + string.Join(" -> ", actions));
    }
}
