namespace simpleChsarp.LearningPath.Level1Collections;

public static class QueueExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Queue<T> ===");

        Queue<string> tickets = new();
        tickets.Enqueue("Ticket-100");
        tickets.Enqueue("Ticket-101");
        tickets.Enqueue("Ticket-102");

        Console.WriteLine("Next: " + tickets.Peek());
        Console.WriteLine("Serving: " + tickets.Dequeue());
        Console.WriteLine("Remaining: " + string.Join(", ", tickets));
    }
}
