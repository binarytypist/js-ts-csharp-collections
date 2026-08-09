using System;
using System.Linq;

string[] firstPortNumbers = { "sa", "m", "mit" };
string[] secondPortNumbers = { "mit", "sa", "m" };

bool result = firstPortNumbers.OrderBy(x => x)
                              .SequenceEqual(secondPortNumbers.OrderBy(x => x));

Console.WriteLine(result);
Console.WriteLine(firstPortNumbers.OrderBy(x => x).SequenceEqual(secondPortNumbers.OrderBy(x => x)));