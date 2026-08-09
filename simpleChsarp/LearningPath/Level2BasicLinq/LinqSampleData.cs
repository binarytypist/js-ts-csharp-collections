namespace simpleChsarp.LearningPath.Level2BasicLinq;

public static class LinqSampleData
{
    public static List<LinqUser> Users =>
    [
        new LinqUser(1, "Sam", 29, ["C#", "SQL"], true, 7200m, "Engineering"),
        new LinqUser(2, "Nora", 34, ["C#", "Azure", "SQL"], true, 9200m, "Engineering"),
        new LinqUser(3, "Alex", 25, ["Support", "Excel"], false, 4200m, "Support"),
        new LinqUser(4, "Mina", 31, ["Sales", "CRM"], true, 6100m, "Sales")
    ];
}

public sealed record LinqUser(
    int Id,
    string Name,
    int Age,
    List<string> Skills,
    bool IsActive,
    decimal Salary,
    string Department
);
