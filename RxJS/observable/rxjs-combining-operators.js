const {
    BehaviorSubject,
    combineLatest,
    concat,
    forkJoin,
    merge,
    of,
    timer,
    withLatestFrom,
    zip,
    map,
    take,
    delay
} = require('rxjs');


// ============================================================
// HELPER
// ============================================================

// Prints a section title in the terminal.
function logSection(title) {

    console.log(`\n=== ${title} ===`);

}


// ============================================================
// 1. combineLatest()
// ============================================================
//
// combineLatest() combines the LATEST value from every
// Observable.
//
// It waits until every Observable has emitted at least once.
//
// After that, whenever ANY Observable changes,
// combineLatest() emits all latest values.
//
// Example:
//
// user     = Sam
// language = TypeScript
// theme    = Light
//
// If user changes:
//
// user     = Sammie
// language = TypeScript
// theme    = Light
//
// All three latest values are emitted.
//

async function showCombineLatestExample() {

    logSection('combineLatest()');


    // BehaviorSubject is useful here because it
    // already has an initial value.
    const user$ = new BehaviorSubject('Sam');

    const language$ = new BehaviorSubject('TypeScript');

    const theme$ = new BehaviorSubject('Light');


    // Combine the three Observables.
    const combined$ = combineLatest([
        user$,
        language$,
        theme$
    ]);


    // Subscribe to the combined Observable.
    const subscription = combined$.subscribe(
        ([user, language, theme]) => {

            console.log(
                'combineLatest:',
                {
                    user,
                    language,
                    theme
                }
            );

        }
    );


    // Change the user.
    //
    // combineLatest() emits:
    //
    // Sammie
    // TypeScript
    // Light
    //
    user$.next('Sammie');


    // Change the language.
    //
    // combineLatest() emits:
    //
    // Sammie
    // JavaScript
    // Light
    //
    language$.next('JavaScript');


    // Change the theme.
    //
    // combineLatest() emits:
    //
    // Sammie
    // JavaScript
    // Dark
    //
    theme$.next('Dark');


    // Wait a little before unsubscribing.
    await new Promise(resolve =>
        setTimeout(resolve, 40)
    );


    // Stop listening to the Observable.
    subscription.unsubscribe();

}


// ============================================================
// 2. forkJoin()
// ============================================================
//
// forkJoin() waits until ALL Observables complete.
//
// Think about multiple API requests:
//
// Users API
// Products API
// Orders API
//
//       ↓
// ALL FINISH
//       ↓
// forkJoin() gives one final result.
//
// Very common when you need several HTTP requests
// to finish before continuing.
//

async function showForkJoinExample() {

    logSection('forkJoin()');


    // Simulate Users API.
    //
    // Completes after 70ms.
    const users$ = timer(70).pipe(

        map(() => ['u1', 'u2'])

    );


    // Simulate Products API.
    //
    // Completes after 40ms.
    const products$ = timer(40).pipe(

        map(() => ['p1', 'p2', 'p3'])

    );


    // Simulate Orders API.
    //
    // Completes after 90ms.
    const orders$ = timer(90).pipe(

        map(() => ['o1'])

    );


    await new Promise(resolve => {


        forkJoin({

            // Result from users$.
            users: users$,

            // Result from products$.
            products: products$,

            // Result from orders$.
            orders: orders$

        })
        .subscribe({

            // This runs only AFTER all three
            // Observables have completed.
            next: value => {

                console.log(
                    'forkJoin:',
                    value
                );

            },

            complete: resolve

        });

    });

}


// ============================================================
// 3. merge()
// ============================================================
//
// merge() combines multiple Observables.
//
// It does NOT wait for one Observable to finish.
//
// Whoever emits first gets emitted first.
//
// Example:
//
// fast$ → fast-1
// fast$ → fast-2
//
// then later:
//
// slow$ → slow-1
// slow$ → slow-2
//
// The final order depends on timing.
//

async function showMergeExample() {

    logSection('merge()');


    // First Observable.
    //
    // Values are delayed by 20ms.
    const fast$ = of(
        'fast-1',
        'fast-2'
    ).pipe(

        delay(20)

    );


    // Second Observable.
    //
    // Values are delayed by 60ms.
    const slow$ = of(
        'slow-1',
        'slow-2'
    ).pipe(

        delay(60)

    );


    await new Promise(resolve => {


        // Combine both streams.
        merge(
            fast$,
            slow$
        )
        .subscribe({

            // Values arrive according to timing.
            next: value => {

                console.log(
                    'merge:',
                    value
                );

            },

            complete: resolve

        });

    });

}


// ============================================================
// 4. concat()
// ============================================================
//
// concat() runs Observables ONE AFTER ANOTHER.
//
// First Observable must complete:
//
// first$
//   A1
//   A2
//   complete
//
// THEN:
//
// second$
//   B1
//   B2
//
// Therefore the order is guaranteed:
//
// A1
// A2
// B1
// B2
//

async function showConcatExample() {

    logSection('concat()');


    // First Observable.
    const first$ = of(
        'A1',
        'A2'
    ).pipe(

        delay(20)

    );


    // Second Observable.
    const second$ = of(
        'B1',
        'B2'
    ).pipe(

        delay(20)

    );


    await new Promise(resolve => {


        concat(
            first$,
            second$
        )
        .subscribe({

            next: value => {

                console.log(
                    'concat:',
                    value
                );

            },

            complete: resolve

        });

    });

}


// ============================================================
// 5. zip()
// ============================================================
//
// zip() matches values by POSITION.
//
// First Observable:
//
// U1
// U2
// U3
//
// Second Observable:
//
// L1
// L2
// L3
//
// zip() produces:
//
// [U1, L1]
// [U2, L2]
// [U3, L3]
//
// Think:
//
// first value  + first value
// second value + second value
// third value  + third value
//

async function showZipExample() {

    logSection('zip()');


    await new Promise(resolve => {


        zip(

            // First Observable.
            of(
                'U1',
                'U2',
                'U3'
            ),


            // Second Observable.
            of(
                'L1',
                'L2',
                'L3'
            )

        )
        .subscribe({

            // Receive matching pairs.
            next: pair => {

                console.log(
                    'zip:',
                    pair
                );

            },

            complete: resolve

        });

    });

}


// ============================================================
// 6. withLatestFrom()
// ============================================================
//
// withLatestFrom() is different from combineLatest().
//
// There is a MAIN Observable.
//
// In this example:
//
// saveClick$
//      ↓
// MAIN / TRIGGER
//
// formState$
//      ↓
// latest value
//
// When saveClick$ emits:
//
// saveClick + latest formState
//
// are combined.
//
// IMPORTANT:
//
// formState$ changing by itself does NOT trigger
// a withLatestFrom() emission.
//
// The MAIN Observable must emit.
//

async function showWithLatestFromExample() {

    logSection('withLatestFrom()');


    // MAIN / TRIGGER Observable.
    //
    // Emits:
    //
    // save-click-1
    // save-click-2
    // save-click-3
    //
    const saveClick$ = timer(
        20,
        40
    )
    .pipe(

        // Only 3 clicks.
        take(3),

        // Convert 0,1,2 into readable click names.
        map(index =>
            `save-click-${index + 1}`
        )

    );


    // Holds the current form state.
    //
    // BehaviorSubject immediately provides
    // the current value.
    const formState$ = new BehaviorSubject({

        draft: 'initial'

    });


    // Form changes independently.
    //
    // This does NOT trigger withLatestFrom()
    // by itself.
    setTimeout(() => {

        formState$.next({
            draft: 'updated-1'
        });

    }, 35);


    setTimeout(() => {

        formState$.next({
            draft: 'updated-2'
        });

    }, 75);


    await new Promise(resolve => {


        saveClick$
            .pipe(

                // When saveClick$ emits,
                // take the latest value from formState$.
                withLatestFrom(formState$)

            )
            .subscribe({

                // Result:
                //
                // [save click, latest form]
                //
                next: ([click, form]) => {

                    console.log(
                        'withLatestFrom:',
                        {
                            click,
                            form
                        }
                    );

                },

                complete: resolve

            });

    });

}


// ============================================================
// 7. RUN ALL EXAMPLES
// ============================================================

async function runCombiningExamples() {


    // Combines latest values from all sources.
    await showCombineLatestExample();


    // Wait for all Observables to complete.
    await showForkJoinExample();


    // Merge streams and emit whoever produces first.
    await showMergeExample();


    // Run streams sequentially.
    await showConcatExample();


    // Match values by position.
    await showZipExample();


    // Main Observable + latest value from another Observable.
    await showWithLatestFromExample();

}


// ============================================================
// EXPORT
// ============================================================
//
// This allows another JavaScript file to call:
//
// const { runCombiningExamples } = require('./filename');
//
// runCombiningExamples();
//

module.exports = {

    runCombiningExamples

};