// ============================================================
// Array Comparison Exercises
// ============================================================

// ============================================================
// 1. Compare arrays using sort() + JSON.stringify()
// ============================================================
//
// Compares two arrays regardless of order.
//
// Example:
// [3, 1, 2] and [2, 3, 1] -> true
//
// IMPORTANT:
// This works well for primitive values, but JSON.stringify()
// is not always the best approach for objects or special values.

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Create copies so the original arrays are not modified.
    const sortedA = [...arr1].sort();
    const sortedB = [...arr2].sort();

    // Alternative:
    //
    // return sortedA.every(
    //     (value, index) => value === sortedB[index]
    // );

    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}


// ============================================================
// 2. Compare arrays using sort() + join()
// ============================================================
//
// join() converts the array into one string.
//
// Example:
//
// ["b", "a"] -> "a=b"
//
// Then the two strings can be compared using ===.
//
// IMPORTANT:
// The separator should not create ambiguity when array values
// themselves contain that separator.

function compareArrays1(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return [...arr1].sort().join("=") ===
           [...arr2].sort().join("=");
}


// ============================================================
// 3. Compare arrays using filter() + includes()
// ============================================================
//
// Checks whether every value in arr1 exists somewhere in arr2.
//
// IMPORTANT:
// This does NOT correctly handle duplicate counts.
//
// Example:
//
// arr1 = ["m", "m", "sa"]
// arr2 = ["m", "sa", "sa"]
//
// Every value from arr1 exists in arr2,
// but the arrays are NOT actually equal as multisets.
//
// Therefore this is a simple approach, but it is not a
// complete solution when duplicate values matter.

function compareArrays2(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.filter((value) => arr2.includes(value)).length ===
           arr1.length;
}


// ============================================================
// 4. Compare arrays using Map frequency counting
// ============================================================
//
// Compare two arrays regardless of order.
//
// Duplicate values ARE taken into account.
//
// Example:
//
// ["m", "m", "sa"]
// ["sa", "m", "m"]
//
// -> true
//
// But:
//
// ["m", "m", "sa"]
// ["sa", "m", "sa"]
//
// -> false
//
// This is the strongest solution of these four approaches
// for primitive values when:
//   - order does not matter
//   - duplicate counts matter
//
// Typical complexity:
//   Time:  O(n)
//   Space: O(n)

function compareArrays3(arr1, arr2) {

    // If the arrays have different lengths,
    // they cannot contain exactly the same values.
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Create a Map to store the frequency/count
    // of each value in arr1.
    //
    // Example:
    //
    // ["m", "m", "sa"]
    //
    // becomes:
    //
    // m  -> 2
    // sa -> 1
    const count = new Map();

    // Loop through every value in the first array.
    for (const value of arr1) {

        // Get the current count of this value.
        //
        // If the value does not exist yet,
        // Map.get() returns undefined.
        //
        // undefined || 0 -> 0
        //
        // Then add 1 to the count.
        count.set(
            value,
            (count.get(value) || 0) + 1
        );
    }

    // Now check every value from the second array.
    for (const value of arr2) {

        // If this value was never found in arr1,
        // the arrays cannot be equal.
        if (!count.has(value)) {
            return false;
        }

        // Decrease the count because we found
        // one occurrence of this value in arr2.
        //
        // Example:
        //
        // m -> 2
        //
        // after finding "m":
        //
        // m -> 1
        count.set(
            value,
            count.get(value) - 1
        );

        // If the count becomes negative,
        // arr2 contains this value more times
        // than arr1 contains it.
        //
        // Example:
        //
        // arr1: ["m", "sa"]
        // arr2: ["m", "m"]
        //
        // m starts at 1
        // first "m" -> 0
        // second "m" -> -1
        //
        // Therefore the arrays are different.
        if (count.get(value) < 0) {
            return false;
        }
    }

    // If we reached here:
    //
    // - Both arrays have the same length.
    // - Every value in arr2 exists in arr1.
    // - No value occurs more times in arr2.
    //
    // Therefore the arrays contain the same values
    // with the same number of occurrences.
    return true;
}


// ============================================================
// TESTS
// ============================================================

console.log("========== compareArrays ==========");

console.log(
    compareArrays(
        ["sa", "mit", "m"],
        ["m", "sa", "mit"]
    )
); // true


console.log("========== compareArrays1 ==========");

console.log(
    compareArrays1(
        ["sa", "mit", "m"],
        ["m", "sa", "mit"]
    )
); // true


console.log("========== compareArrays2 ==========");

console.log(
    compareArrays2(
        ["sa", "mit", "m"],
        ["m", "sa", "mit"]
    )
); // true


console.log("========== compareArrays3 ==========");

console.log(
    compareArrays3(
        ["sa", "mit", "m"],
        ["m", "sa", "mit"]
    )
); // true


// ============================================================
// DUPLICATE TESTS
// ============================================================

console.log(
    compareArrays3(
        ["m", "m", "sa"],
        ["sa", "m", "m"]
    )
); // true


console.log(
    compareArrays3(
        ["m", "m", "sa"],
        ["sa", "m", "sa"]
    )
); // false


// ============================================================
// NUMBER TESTS
// ============================================================

console.log(
    compareArrays3(
        [1, 2, 3],
        [3, 1, 2]
    )
); // true


console.log(
    compareArrays3(
        [1, 2, 2, 3],
        [3, 2, 1, 2]
    )
); // true


console.log(
    compareArrays3(
        [1, 2, 2, 3],
        [3, 2, 1, 1]
    )
); // false


// ============================================================
// DIFFERENT LENGTH
// ============================================================

console.log(
    compareArrays3(
        ["a", "b", "c"],
        ["a", "b"]
    )
); // false


// ============================================================
// COMPLETELY DIFFERENT VALUES
// ============================================================

console.log(
    compareArrays3(
        ["a", "b", "c"],
        ["x", "y", "z"]
    )
); // false