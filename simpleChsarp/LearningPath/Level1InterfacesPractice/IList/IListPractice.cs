namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class IListPractice
{
    private record TaskItem(int Priority, string Title);

    public static void Run()
    {
        Console.WriteLine("\n=== IList<T> — Intermediate ===");

        IList<TaskItem> tasks =
        [
            new(2, "Write tests"),
            new(3, "Deploy to staging"),
            new(1, "Fix critical bug")
        ];

        SortByPriority(tasks);

        Console.WriteLine("Sorted by priority:");
        for (int i = 0; i < tasks.Count; i++)
            Console.WriteLine($"  [{i}] P{tasks[i].Priority} — {tasks[i].Title}");

        // InsertByPriority uses Insert() to place at the correct index.
        InsertByPriority(tasks, new TaskItem(0, "Hotfix production"));

        Console.WriteLine("\nAfter inserting hotfix:");
        foreach (TaskItem t in tasks)
            Console.WriteLine($"  P{t.Priority} — {t.Title}");

        // Walk backwards to safely remove while mutating the list.
        RemoveLowPriority(tasks, cutoff: 1);

        Console.WriteLine("\nHigh-priority only (P0, P1):");
        foreach (TaskItem t in tasks)
            Console.WriteLine($"  P{t.Priority} — {t.Title}");
    }

    private static void SortByPriority(IList<TaskItem> tasks)
    {
        // Bubble sort using IList<T> index access and tuple swap.
        for (int i = 0; i < tasks.Count - 1; i++)
            for (int j = 0; j < tasks.Count - i - 1; j++)
                if (tasks[j].Priority > tasks[j + 1].Priority)
                    (tasks[j], tasks[j + 1]) = (tasks[j + 1], tasks[j]);
    }

    private static void InsertByPriority(IList<TaskItem> tasks, TaskItem newTask)
    {
        for (int i = 0; i < tasks.Count; i++)
        {
            if (newTask.Priority < tasks[i].Priority)
            {
                tasks.Insert(i, newTask);
                return;
            }
        }

        tasks.Add(newTask);
    }

    private static void RemoveLowPriority(IList<TaskItem> tasks, int cutoff)
    {
        for (int i = tasks.Count - 1; i >= 0; i--)
            if (tasks[i].Priority > cutoff)
                tasks.RemoveAt(i);
    }
}
