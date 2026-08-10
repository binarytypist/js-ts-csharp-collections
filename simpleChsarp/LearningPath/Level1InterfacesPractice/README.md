# Level 1 Interfaces Practice - Interview Questions

This folder now includes an interview-style practice file with problems and solutions:

- `Level1InterfacesPracticeInterviewPractice.cs`

It contains 12 problems from basic to advanced, each written as:

1. Problem statement in comments
2. Runnable solution method
3. Short explanation output

## Covered Topics

1. Value vs reference types
2. Classes and objects (required/non-nullable name)
3. `List<T>` operations
4. `Dictionary<TKey, TValue>` with `TryGetValue`
5. Generic method `Swap<T>`
6. `IEnumerable<T>` with `yield return`
7. Choosing collection interfaces by needed capability
8. Common LINQ interview operations
9. `ISet<T>` / `HashSet<T>` set operations
10. Generic constraint (`where T : IEntity`)
11. Reference assignment and shallow/deep copy concepts
12. Final repository challenge with `IRepository<T>`

## Where It Runs

`Level1InterfacesPracticeDemo.Run()` now calls:

- `Level1InterfacesPracticeInterviewPractice.Run()`

So the new questions run automatically when your app starts (because `Program.cs` already runs `Level1InterfacesPracticeDemo.Run()`).

## Notes

- The code uses nullable reference types (`string?`, `T?`) where appropriate.
- `record` is used for product/user model examples.
- `sealed` is used for selected classes.
- LINQ is used throughout relevant problems.
- `TryGetValue()` is used in dictionary/repository lookup scenarios.
