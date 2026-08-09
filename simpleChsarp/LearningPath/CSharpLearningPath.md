# C# Learning Path

## Goal

This path is meant to help you move from beginner-friendly C# concepts to practical .NET thinking in a clear order.

## How Generics Fit Into This Path

```text
                 GENERICS
                     |
      +------------+------------+
      |                         |
  List<T>                 Dictionary<K, V>
      |                         |
      +------------+------------+
                   |
              IEnumerable<T>
                   |
                  LINQ
                   |
      +------------+------------+
      |                         |
    Where()                  GroupBy()
```

## Practical Roadmap (In Order)

1. Arrays
2. Generics
3. List<T>
4. Dictionary<TKey, TValue>
5. HashSet<T>
6. Queue<T>
7. Stack<T>
8. IEnumerable<T>
9. LINQ
10. Advanced LINQ
- Generic methods (`T`)
- Generic classes (`Box<T>`)
- Generic interfaces (`IEnumerable<T>`, `IComparable<T>`, `IRepository<T>`)
- Generic constraints (`where T : class`, `new()`, interface constraints)

## LEVEL 1 - C# Collections
- Array (`T[]`)
- List (`List<T>`)
- Dictionary (`Dictionary<TKey, TValue>`)
- HashSet (`HashSet<T>`)
- Queue (`Queue<T>`)
- Stack (`Stack<T>`)
- IEnumerable (`IEnumerable<T>`)

## LEVEL 2 - Basic LINQ
- `Where()`
- `Select()`
- `SelectMany()`
- `First()`
- `FirstOrDefault()`
- `Single()`
- `SingleOrDefault()`
- `Last()`
- `LastOrDefault()`
- `Any()`
- `All()`
- `Contains()`
- `Count()`
- `Sum()`
- `Min()`
- `Max()`
- `Average()`

## LEVEL 3 - Ordering
- `OrderBy()`
- `OrderByDescending()`
- `ThenBy()`
- `ThenByDescending()`
- `Reverse()`

## LEVEL 4 - Grouping
- `GroupBy()`
- `ToLookup()`

## LEVEL 5 - Set Operations
- `Distinct()`
- `Union()`
- `Intersect()`
- `Except()`
- `Concat()`

## LEVEL 6 - Comparing Collections
- `SequenceEqual()`
- `Any()`
- `All()`
- `Contains()`
- `HashSet`

## LEVEL 7 - More Advanced LINQ
- `Join()`
- `GroupJoin()`
- `Aggregate()`
- `Zip()`
- `Chunk()`
- `Take()`
- `TakeLast()`
- `Skip()`
- `SkipLast()`
- `TakeWhile()`
- `SkipWhile()`

## LEVEL 8 - LINQ + Objects
Practice with:
- `List<User>`
- `List<Employee>`
- `List<Product>`
- `List<Order>`

Solve:
- Find active users
- Find duplicate users
- Find unique values
- Find common values
- Find missing values
- Group employees by department
- Find highest salary
- Find second highest salary
- Sort employees
- Count employees by department
- Find employees older than 30
- Compare two lists
- Join employees with departments

This level is now demonstrated in the project through object-based LINQ examples that cover filtering, grouping, joining, and set-style operations.
