// ============================================================
// RXJS FOUNDATION - NEXT LEVEL
// ============================================================
//
// This example demonstrates:
//
// SUBJECTS
//   Subject
//   BehaviorSubject
//   ReplaySubject
//
// FILTERING / STATE
//   filter()
//   distinctUntilChanged()
//
// FLOW CONTROL
//   takeUntil()
//   takeWhile()
//   startWith()
//
// COMBINING OBSERVABLES
//   combineLatest()
//   forkJoin()
//   merge()
//   concat()
//
// ============================================================


const {

    // -------------------------
    // Subjects
    // -------------------------
    Subject,
    BehaviorSubject,
    ReplaySubject,

    // -------------------------
    // Observable creation
    // -------------------------
    of,
    interval,
    timer,

    // -------------------------
    // Combining Observables
    // -------------------------
    combineLatest,
    forkJoin,
    merge,
    concat,

    // -------------------------
    // Operators
    // -------------------------
    filter,
    distinctUntilChanged,
    takeUntil,
    takeWhile,
    startWith,
    take,
    map,
    delay

} = require('rxjs');


// ============================================================
// HELPER FUNCTION
// ============================================================

// Prints a clear section title in the terminal.
//
// Example:
//
// === Subject ===
//
function logSection(title) {

    console.log(`\n=== ${title} ===`);

}


// ============================================================
// 1. SUBJECTS
// ============================================================
//
// We will look at:
//
// Subject
// BehaviorSubject
// ReplaySubject
//
// The main difference is:
// "What happens when a subscriber joins late?"
//


// ============================================================
// SUBJECT
// ============================================================
//
// Subject does NOT remember previous values.
//
// If a subscriber joins late,
// it only receives FUTURE values.
//
// Example:
//
// A subscribes
//     ↓
// next(Welcome)
//     ↓
// A receives Welcome
//
// B subscribes later
//     ↓
// B does NOT receive Welcome
//
// next(Lesson started)
//     ↓
// A receives it
// B receives it
//

async function subjectExamples() {

    logSection('Subject');


    // Create a normal Subject.
    const announcements$ = new Subject();


    // Subscriber A joins first.
    announcements$.subscribe(value => {

        console.log('Subscriber A:', value);

    });


    // Subject sends a value.
    //
    // A receives "Welcome".
    announcements$.next('Welcome');


    // Subject sends another value.
    //
    // A receives "Lesson started".
    announcements$.next('Lesson started');


    console.log('Subscriber B joins late:');


    // Subscriber B joins AFTER the previous values.
    //
    // B does NOT receive:
    //
    // Welcome
    // Lesson started
    //
    // because Subject does not remember old values.
    announcements$.subscribe(value => {

        console.log('Subscriber B:', value);

    });


    // This value happens AFTER B subscribes.
    //
    // Therefore:
    //
    // A receives it
    // B receives it
    //
    announcements$.next('Only future values reach B');


    // ========================================================
    // BEHAVIOR SUBJECT
    // ========================================================
    //
    // BehaviorSubject remembers the LATEST value.
    //
    // It also requires an initial value.
    //
    // Example:
    //
    // BehaviorSubject('light')
    //
    // A subscribes
    //     ↓
    // immediately receives "light"
    //
    // next("dark")
    //     ↓
    // A receives "dark"
    //
    // B subscribes later
    //     ↓
    // B immediately receives "dark"
    //

    logSection('BehaviorSubject');


    // Create BehaviorSubject with initial value.
    const theme$ = new BehaviorSubject('light');


    // Subscriber A joins.
    //
    // A immediately receives:
    //
    // light
    //
    theme$.subscribe(value => {

        console.log('Header theme:', value);

    });


    // Change the current value.
    //
    // A receives:
    //
    // dark
    //
    theme$.next('dark');


    console.log('Sidebar joins late:');


    // Subscriber B joins AFTER "dark".
    //
    // BehaviorSubject remembers the latest value.
    //
    // Therefore B immediately receives:
    //
    // dark
    //
    theme$.subscribe(value => {

        console.log('Sidebar theme:', value);

    });


    // ========================================================
    // REPLAY SUBJECT
    // ========================================================
    //
    // ReplaySubject can remember MULTIPLE previous values.
    //
    // ReplaySubject(2)
    //
    // means:
    //
    // "Remember the latest 2 values."
    //
    // We send:
    //
    // 70
    // 80
    // 90
    //
    // Only:
    //
    // 80
    // 90
    //
    // are remembered.
    //

    logSection('ReplaySubject');


    // Remember the last 2 values.
    const lastScores$ = new ReplaySubject(2);


    // Send first value.
    lastScores$.next(70);


    // Send second value.
    lastScores$.next(80);


    // Send third value.
    //
    // Because buffer size = 2,
    // 70 is now removed from the replay buffer.
    lastScores$.next(90);


    console.log('Late subscriber gets the last 2 values:');


    // Subscriber joins late.
    //
    // ReplaySubject immediately sends:
    //
    // 80
    // 90
    //
    lastScores$.subscribe(value => {

        console.log('Replay score:', value);

    });

}


// ============================================================
// 2. FILTERING OPERATORS
// ============================================================


// ============================================================
// filter()
// ============================================================
//
// filter() decides which values should continue.
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
// Condition:
//
// value % 2 === 0
//
// means:
// "Keep only even numbers."
//

async function filteringExamples() {

    logSection('filter()');


    await new Promise(resolve => {


        of(1, 2, 3, 4, 5, 6)
            .pipe(

                // Only allow even numbers.
                filter(value => value % 2 === 0)

            )
            .subscribe({

                next: value => {

                    console.log('Even number:', value);

                },

                complete: resolve

            });

    });


    // ========================================================
    // distinctUntilChanged()
    // ========================================================
    //
    // Removes consecutive duplicate values.
    //
    // Input:
    //
    // a
    // a
    // b
    // b
    // b
    // c
    // a
    //
    // Output:
    //
    // a
    // b
    // c
    // a
    //
    // Notice:
    //
    // The final "a" is allowed because the previous
    // value was "c".
    //

    logSection('distinctUntilChanged()');


    await new Promise(resolve => {


        of('a', 'a', 'b', 'b', 'b', 'c', 'a')
            .pipe(

                // Ignore a value if it is the same
                // as the immediately previous value.
                distinctUntilChanged()

            )
            .subscribe({

                next: value => {

                    console.log('Distinct value:', value);

                },

                complete: resolve

            });

    });

}


// ============================================================
// 3. FLOW CONTROL
// ============================================================


// ============================================================
// takeUntil()
// ============================================================
//
// takeUntil() says:
//
// "Keep receiving values UNTIL another Observable emits."
//
// Here:
//
// interval(50)
//      ↓
// 0, 1, 2, 3, ...
//
// stop$
//      ↓
// emits after 160ms
//
// Therefore interval() stops when stop$ emits.
//

async function controlExamples() {

    logSection('takeUntil()');


    await new Promise(resolve => {


        // This Observable emits once after 160ms.
        const stop$ = timer(160);


        interval(50)
            .pipe(

                // Continue until stop$ emits.
                takeUntil(stop$)

            )
            .subscribe({

                next: value => {

                    console.log('takeUntil value:', value);

                },

                // Called when takeUntil stops the stream.
                complete: resolve

            });

    });


    // ========================================================
    // takeWhile()
    // ========================================================
    //
    // takeWhile() continues WHILE the condition is true.
    //
    // Values:
    //
    // 3  → true  → keep
    // 6  → true  → keep
    // 9  → true  → keep
    // 12 → false → STOP
    // 15 → never reached
    //

    logSection('takeWhile()');


    await new Promise(resolve => {


        of(3, 6, 9, 12, 15)
            .pipe(

                // Continue while value < 12.
                takeWhile(value => value < 12)

            )
            .subscribe({

                next: value => {

                    console.log('takeWhile value:', value);

                },

                complete: resolve

            });

    });


    // ========================================================
    // startWith()
    // ========================================================
    //
    // startWith() adds a value BEFORE the Observable
    // starts emitting its normal values.
    //
    // Without startWith():
    //
    // Angular
    // RxJS
    //
    // With startWith():
    //
    // Loading topics
    // Angular
    // RxJS
    //
    // Very useful for loading/default UI states.
    //

    logSection('startWith()');


    await new Promise(resolve => {


        of('Angular', 'RxJS')
            .pipe(

                // Emit this value first.
                startWith('Loading topics')

            )
            .subscribe({

                next: value => {

                    console.log('startWith value:', value);

                },

                complete: resolve

            });

    });

}


// ============================================================
// 4. COMBINING OBSERVABLES
// ============================================================


// ============================================================
// combineLatest()
// ============================================================
//
// combineLatest() combines the LATEST value from each
// Observable.
//
// Think:
//
// Observable A → latest value
// Observable B → latest value
//
//             ↓
//
//       combineLatest()
//
//             ↓
//
//    [latest A, latest B]
//
// It emits whenever one of the sources emits,
// after every source has emitted at least once.
//

async function combiningExamples() {

    logSection('combineLatest()');


    await new Promise(resolve => {


        combineLatest([

            // Emits:
            //
            // 0 → 1 → 2
            //
            // every 60ms.
            timer(0, 60)
                .pipe(take(3)),


            // Emits the values synchronously,
            // but delay() delays the whole Observable.
            of(
                'Beginner',
                'Intermediate',
                'Advanced'
            )
                .pipe(delay(30))

        ])
            .pipe(

                // Destructure the combined array.
                //
                // [step, label]
                //
                // and create a readable string.
                map(([step, label]) =>

                    `Step ${step}: ${label}`

                )

            )
            .subscribe({

                next: value => {

                    console.log(value);

                },

                complete: resolve

            });

    });


    // ========================================================
    // forkJoin()
    // ========================================================
    //
    // forkJoin() waits until ALL Observables complete.
    //
    // Think:
    //
    // API 1 ──────────→ complete
    // API 2 ───────→ complete
    // API 3 ─────────────→ complete
    //                       ↓
    //                  forkJoin result
    //
    // Very useful when several HTTP requests must all
    // finish before continuing.
    //

    logSection('forkJoin()');


    await new Promise(resolve => {


        forkJoin({

            // Simulate profile API.
            profile: of('Sam')
                .pipe(delay(40)),


            // Simulate score API.
            score: of(95)
                .pipe(delay(80))

        })
            .subscribe({

                // Result is an object:
                //
                // {
                //   profile: "Sam",
                //   score: 95
                // }
                //
                next: value => {

                    console.log(
                        'forkJoin result:',
                        value
                    );

                },

                complete: resolve

            });

    });


    // ========================================================
    // merge()
    // ========================================================
    //
    // merge() combines multiple Observables into one stream.
    //
    // Values are emitted AS SOON AS they arrive.
    //
    // It does NOT wait for one Observable to finish.
    //
    // Think:
    //
    // Left  ──→
    // Right ──→
    //
    // Values are mixed according to timing.
    //

    logSection('merge()');


    await new Promise(resolve => {


        merge(

            // Emits every 40ms.
            interval(40)
                .pipe(

                    take(2),

                    map(value => `left ${value}`)

                ),


            // Emits every 25ms.
            interval(25)
                .pipe(

                    take(3),

                    map(value => `right ${value}`)

                )

        )
            .subscribe({

                next: value => {

                    console.log('merge value:', value);

                },

                complete: resolve

            });

    });


    // ========================================================
    // concat()
    // ========================================================
    //
    // concat() waits for the FIRST Observable to complete
    // before subscribing to the SECOND Observable.
    //
    // First stream
    //      ↓
    // A
    // B
    //      ↓ complete
    //
    // Second stream
    //      ↓
    // A
    // B
    //
    // Therefore the order is guaranteed.
    //

    logSection('concat()');


    await new Promise(resolve => {


        concat(

            // First Observable runs first.
            of(
                'First stream A',
                'First stream B'
            ),


            // This starts only after the first Observable
            // has completed.
            of(
                'Second stream A',
                'Second stream B'
            )

        )
            .subscribe({

                next: value => {

                    console.log('concat value:', value);

                },

                complete: resolve

            });

    });

}


// ============================================================
// 5. RUN EVERYTHING
// ============================================================

async function run() {

    // Subject
    // BehaviorSubject
    // ReplaySubject
    await subjectExamples();


    // filter
    // distinctUntilChanged
    await filteringExamples();


    // takeUntil
    // takeWhile
    // startWith
    await controlExamples();


    // combineLatest
    // forkJoin
    // merge
    // concat
    await combiningExamples();

}


// Start the program.
run();