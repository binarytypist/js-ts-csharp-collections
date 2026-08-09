namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class ProjectionExamples
{
    public static void Run()
    {
        Console.WriteLine("\n=== Where / Select / SelectMany ===");

        List<LinqUser> users = LinqSampleData.Users;

        // Where filters items, then Select projects each item to a new shape.
        List<string> olderThan30 = users
            .Where(user => user.Age > 30)
            .Select(user => user.Name)
            .ToList();

        // SelectMany flattens nested collections (List<List<string>> -> List<string>).
        List<string> allSkills = users
            .SelectMany(user => user.Skills)
            .Distinct()
            .OrderBy(skill => skill)
            .ToList();

        Console.WriteLine("Where + Select (Age > 30): " + string.Join(", ", olderThan30));
        Console.WriteLine("SelectMany (all skills): " + string.Join(", ", allSkills));
    }
}
