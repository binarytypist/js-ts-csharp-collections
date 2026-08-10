namespace simpleChsarp.LearningPath.Level1InterfacesPractice;

public static class ISetPractice
{
    public static void Run()
    {
        Console.WriteLine(
            "\n=== ISet<T> — Intermediate ===");


        // ISet<T> represents a collection of UNIQUE values.
        //
        // Unlike IList<T>:
        //
        // IList<T>
        //   → order and position matter
        //   → duplicates are allowed
        //
        // ISet<T>
        //   → uniqueness matters
        //   → set operations are supported
        //   → duplicates are not allowed
        //
        // ISet<T> is useful when you want to work with
        // mathematical set operations such as:
        //
        // Union
        // Intersection
        // Difference
        // Subset
        // Superset
        //
        // HashSet<T> is the most common implementation
        // of ISet<T>.


        // Create a set containing backend skills.
        //
        // ISet<string>
        //      ↓
        // A set containing unique strings.
        //
        // C#, SQL, REST and Docker are stored here.
        ISet<string> backendSkills =
            new HashSet<string>
            {
                "C#",
                "SQL",
                "REST",
                "Docker"
            };


        // Create another set containing frontend skills.
        //
        // Notice that REST and Docker appear in both sets.
        //
        // Those common values will be useful when we
        // demonstrate IntersectWith().
        ISet<string> frontendSkills =
            new HashSet<string>
            {
                "TypeScript",
                "React",
                "REST",
                "Docker"
            };


        // ----------------------------------------------------
        // SUBSET
        // ----------------------------------------------------

        // Create a set containing the skills required
        // for a backend role.
        ISet<string> required =
            new HashSet<string>
            {
                "C#",
                "SQL"
            };


        // IsSubsetOf() asks:
        //
        // "Are ALL items in 'required' also present
        //  in 'backendSkills'?"
        //
        // required:
        //   C#, SQL
        //
        // backendSkills:
        //   C#, SQL, REST, Docker
        //
        // Since C# and SQL both exist in backendSkills:
        //
        // required ⊆ backendSkills
        //
        // Therefore the result is true.
        Console.WriteLine(
            $"Has required backend skills: " +
            $"{required.IsSubsetOf(backendSkills)}");


        // ----------------------------------------------------
        // INTERSECTION
        // ----------------------------------------------------

        // Create a copy of backendSkills.
        //
        // We create a copy because IntersectWith()
        // modifies the set on which it is called.
        //
        // We don't want to destroy backendSkills.
        ISet<string> shared =
            new HashSet<string>(backendSkills);


        // IntersectWith() keeps ONLY values that exist
        // in BOTH sets.
        //
        // Backend:
        //   C#, SQL, REST, Docker
        //
        // Frontend:
        //   TypeScript, React, REST, Docker
        //
        // Common:
        //   REST, Docker
        shared.IntersectWith(frontendSkills);


        Console.WriteLine(
            "Shared skills:       " +
            string.Join(", ", shared));


        // ----------------------------------------------------
        // UNION
        // ----------------------------------------------------

        // Create another copy of backendSkills.
        //
        // UnionWith() will add all values from the
        // frontend set.
        ISet<string> fullStack =
            new HashSet<string>(backendSkills);


        // UnionWith() combines both sets.
        //
        // Backend:
        //   C#, SQL, REST, Docker
        //
        // Frontend:
        //   TypeScript, React, REST, Docker
        //
        // Result:
        //   C#, SQL, REST, Docker,
        //   TypeScript, React
        //
        // REST and Docker appear only once because
        // a set cannot contain duplicates.
        fullStack.UnionWith(frontendSkills);


        Console.WriteLine(
            "Full-stack skills:   " +
            string.Join(", ", fullStack));


        // ----------------------------------------------------
        // DIFFERENCE
        // ----------------------------------------------------

        // Create another copy of backendSkills.
        ISet<string> backendOnly =
            new HashSet<string>(backendSkills);


        // ExceptWith() removes every item that also
        // exists in frontendSkills.
        //
        // Backend:
        //   C#, SQL, REST, Docker
        //
        // Frontend:
        //   TypeScript, React, REST, Docker
        //
        // Backend-only:
        //   C#, SQL
        //
        // REST and Docker are removed because they
        // exist in both sets.
        backendOnly.ExceptWith(frontendSkills);


        Console.WriteLine(
            "Backend-only skills: " +
            string.Join(", ", backendOnly));


        // ----------------------------------------------------
        // SUPERSET
        // ----------------------------------------------------

        // IsSupersetOf() asks:
        //
        // "Does fullStack contain ALL items from required?"
        //
        // required:
        //   C#, SQL
        //
        // fullStack:
        //   C#, SQL, REST, Docker,
        //   TypeScript, React
        //
        // Yes.
        //
        // Therefore fullStack is a superset of required.
        Console.WriteLine(
            $"Full-stack covers required: " +
            $"{fullStack.IsSupersetOf(required)}");
    }
}