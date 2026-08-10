namespace simpleChsarp.LearningPath.Level1Collections;

public static class QueueExamples
{
    public static void Run()
    {
        // Display the collection we are learning.
        Console.WriteLine("\n=== Queue<T> ===");


        // Create an empty Queue<string>.
        //
        // T = string
        //
        // A Queue<T> follows FIFO:
        //
        // First In → First Out
        //
        // Think of a queue like a line of people:
        //
        // First person in line
        //        ↓
        // Gets served first
        //
        // Example:
        //
        // Ticket-100 → Ticket-101 → Ticket-102
        Queue<string> tickets = new();


        // Enqueue() adds an item to the END of the queue.
        //
        // Queue:
        // Ticket-100
        tickets.Enqueue("Ticket-100");


        // Add another ticket to the end.
        //
        // Queue:
        // Ticket-100 → Ticket-101
        tickets.Enqueue("Ticket-101");


        // Add another ticket to the end.
        //
        // Queue:
        // Ticket-100 → Ticket-101 → Ticket-102
        tickets.Enqueue("Ticket-102");


        // Peek() looks at the item at the FRONT of the queue
        // without removing it.
        //
        // The next ticket to be served is:
        // Ticket-100
        //
        // IMPORTANT:
        // Peek() does NOT remove the item.
        Console.WriteLine(
            "Next: " + tickets.Peek());


        // Dequeue() removes AND returns the item at the
        // FRONT of the queue.
        //
        // Ticket-100 is removed and returned.
        //
        // Before:
        // Ticket-100 → Ticket-101 → Ticket-102
        //
        // After:
        // Ticket-101 → Ticket-102
        Console.WriteLine(
            "Serving: " + tickets.Dequeue());


        // Count tells us how many items remain.
        Console.WriteLine(
            $"Remaining count: {tickets.Count}");


        // Queue implements IEnumerable<T>, so we can iterate
        // through the remaining items.
        //
        // At this point:
        //
        // Ticket-101
        // Ticket-102
        Console.WriteLine(
            "Remaining: " + string.Join(", ", tickets));
    }
}