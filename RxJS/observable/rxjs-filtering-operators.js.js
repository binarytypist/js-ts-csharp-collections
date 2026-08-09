const {
    interval,
    of,
    timer,
    distinctUntilChanged,
    filter,
    first,
    last,
    skip,
    skipWhile,
    take,
    takeUntil,
    takeWhile
} = require('rxjs');


// ============================================================
// HELPER: PRINT SECTION TITLE
// ============================================================

function logSection(title) {

    console.log(`\n=== ${title} ===`);

}


// ============================================================
// HELPER: SUBSCRIBE TO AN OBSERVABLE
// ============================================================
//
// This function subscribes to an Observable.
//
// next()
//     → runs whenever a value is emitted.
//
// complete()
//     → runs when the Observable finishes.
//
// We return a Promise so that async/await can wait until
// the Observable has completed.
//

function collectExample(source$, label) {

    return new Promise(resolve => {

        source$.subscribe({

            // Receive every emitted value.
            next: value => {

                console.log(`${label}:`, value);

            },

            // Resolve the Promise when Observable completes.
            complete: resolve

        });

    });

}


// ============================================================
// 1. filter()
// ============================================================
//
// filter() decides which values are allowed through.
//
// Example:
//
// 1 ❌
// 2 ✅
// 3 ❌
// 4 ✅
// 5 ❌
// 6 ✅
//
// Only even numbers continue.
//

async function showFilterExample() {

    logSection('filter()');


    await collectExample(

        of(1, 2, 3, 4, 5, 6, 7, 8)

            .pipe(

                // Keep only even numbers.
                filter(value => value % 2 === 0)

            ),

        'filter'

    );

}


// ============================================================
// 2. take()
// ============================================================
//
// take(4) means:
//
// "Give me the first 4 values and then STOP."
//
// interval:
//
// 0
// 1
// 2
// 3
// 4
// 5...
//
// take(4):
//
// 0 ✅
// 1 ✅
// 2 ✅
// 3 ✅
// 4 ❌
//
// After 3, the Observable automatically completes.
//

async function showTakeExample() {

    logSection('take()');


    await collectExample(

        interval(20)

            .pipe(

                // Take only the first 4 values.
                take(4)

            ),

        'take'

    );

}


// ============================================================
// 3. takeUntil()
// ============================================================
//
// takeUntil() means:
//
// "Continue until another Observable emits."
//
// Main Observable:
//
// interval(20)
//
// Stop Observable:
//
// timer(75)
//
// When timer() emits, interval() stops.
//

async function showTakeUntilExample() {

    logSection('takeUntil()');


    await collectExample(

        interval(20)

            .pipe(

                // Stop when timer(75) emits.
                takeUntil(timer(75))

            ),

        'takeUntil'

    );

}


// ============================================================
// 4. takeWhile()
// ============================================================
//
// takeWhile() continues WHILE the condition is true.
//
// Values:
//
// 2 → true  → continue
// 4 → true  → continue
// 6 → true  → continue
// 7 → false → STOP
// 8 → never reached
//
// Important:
//
// Once the condition becomes false,
// the Observable completes.
//

async function showTakeWhileExample() {

    logSection('takeWhile()');


    await collectExample(

        of(2, 4, 6, 7, 8)

            .pipe(

                // Continue while number is even.
                takeWhile(value => value % 2 === 0)

            ),

        'takeWhile'

    );

}


// ============================================================
// 5. first()
// ============================================================
//
// first() takes the FIRST value.
//
// Observable:
//
// draft
// review
// published
//
// Result:
//
// draft
//
// Then it completes.
//

async function showFirstExample() {

    logSection('first()');


    await collectExample(

        of(
            'draft',
            'review',
            'published'
        )

            .pipe(

                // Take the first value.
                first()

            ),

        'first'

    );

}


// ============================================================
// 6. last()
// ============================================================
//
// last() waits for the Observable to complete.
//
// Then it gives you the LAST value.
//
// Observable:
//
// draft
// review
// published
//
// Result:
//
// published
//

async function showLastExample() {

    logSection('last()');


    await collectExample(

        of(
            'draft',
            'review',
            'published'
        )

            .pipe(

                // Take the final value.
                last()

            ),

        'last'

    );

}


// ============================================================
// 7. skip()
// ============================================================
//
// skip(2) means:
//
// "Ignore the first 2 values."
//
// A → ignored
// B → ignored
// C → emitted
// D → emitted
//

async function showSkipExample() {

    logSection('skip()');


    await collectExample(

        of(
            'A',
            'B',
            'C',
            'D'
        )

            .pipe(

                // Ignore first 2 values.
                skip(2)

            ),

        'skip'

    );

}


// ============================================================
// 8. skipWhile()
// ============================================================
//
// skipWhile() ignores values WHILE the condition is true.
//
// Values:
//
// 1 → < 3 → skip
// 2 → < 3 → skip
// 3 → < 3 is false → START EMITTING
// 1 → now condition is NOT checked for skipping
// 0 → also emitted
//
// IMPORTANT:
//
// skipWhile() stops skipping once the condition becomes false.
//
// It does NOT start skipping again.
//

async function showSkipWhileExample() {

    logSection('skipWhile()');


    await collectExample(

        of(
            1,
            2,
            3,
            1,
            0
        )

            .pipe(

                // Skip values while they are less than 3.
                skipWhile(value => value < 3)

            ),

        'skipWhile'

    );

}


// ============================================================
// 9. distinctUntilChanged()
// ============================================================
//
// Removes consecutive duplicate values.
//
// Input:
//
// idle
// idle
// typing
// typing
// saved
// saved
//
// Output:
//
// idle
// typing
// saved
//
// IMPORTANT:
//
// It only removes CONSECUTIVE duplicates.
//
// Example:
//
// A
// A
// B
// A
//
// Result:
//
// A
// B
// A
//
// The second A is emitted because it is different from B.
//

async function showDistinctUntilChangedExample() {

    logSection('distinctUntilChanged()');


    await collectExample(

        of(
            'idle',
            'idle',
            'typing',
            'typing',
            'saved',
            'saved'
        )

            .pipe(

                // Ignore consecutive duplicate values.
                distinctUntilChanged()

            ),

        'distinctUntilChanged'

    );

}


// ============================================================
// RUN ALL EXAMPLES
// ============================================================

async function runImportantAndFilteringExamples() {

    // Remove values that don't match a condition.
    await showFilterExample();


    // Take a fixed number of values.
    await showTakeExample();


    // Stop when another Observable emits.
    await showTakeUntilExample();


    // Continue while a condition is true.
    await showTakeWhileExample();


    // Take the first value.
    await showFirstExample();


    // Take the last value.
    await showLastExample();


    // Skip a fixed number of values.
    await showSkipExample();


    // Skip while a condition is true.
    await showSkipWhileExample();


    // Remove consecutive duplicate values.
    await showDistinctUntilChangedExample();

}


// ============================================================
// EXPORT
// ============================================================
//
// Another file can import this function:
//
// const {
//     runImportantAndFilteringExamples
// } = require('./filename');
//
// runImportantAndFilteringExamples();
//

module.exports = {

    runImportantAndFilteringExamples

};