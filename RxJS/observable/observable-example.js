// ============================================================
// RXJS BASIC PRACTICE
// ============================================================
//
// Topics covered:
//
// 1. Observable
// 2. subscribe()
// 3. pipe()
// 4. map()
// 5. filter()
// 6. of()
// 7. from()
// 8. timer()
// 9. interval()
// 10. tap()
//
// ============================================================


// Import RxJS.
const rxjs = require('rxjs');


// Get the RxJS functions we need.
const {
    Observable,
    of,
    from,
    fromEvent,
    interval,
    timer,
    map,
    filter,
    tap
} = rxjs;


// ============================================================
// 1. Observable
// ============================================================
//
// Observable is a stream of values.
//
// This Observable manually sends:
//
// 10
// 20
// 30
//
// Then it completes.
//
// The "$" at the end of numbers$ is a common RxJS naming
// convention. It means that numbers$ is an Observable.
//

const numbers$ = new Observable(observer => {


    // Send the first value.
    observer.next(10);


    // Send the second value.
    observer.next(20);


    // Send the third value.
    observer.next(30);


    // Tell subscribers that there are no more values.
    observer.complete();

});


// ============================================================
// 2. subscribe()
// ============================================================
//
// subscribe() listens to an Observable.
//
// Think:
//
// Observable
//     ↓
// subscribe()
//     ↓
// receive values
//
// numbers$ sends:
//
// 10
// 20
// 30
//
// subscribe() receives each value.
//

console.log('--- subscribe example ---');


numbers$.subscribe(value => {

    // Print every value received from numbers$.
    console.log(value);

});


// ============================================================
// 3. pipe() + map() + filter()
// ============================================================
//
// pipe() allows us to put RxJS operators together.
//
// Flow:
//
// numbers$
//    ↓
// map()
//    ↓
// filter()
//    ↓
// subscribe()
//
// map() changes the values.
//
// filter() decides which values continue.
//

console.log('--- pipe example ---');


numbers$
    .pipe(

        // map() transforms every value.
        //
        // 10 → 20
        // 20 → 40
        // 30 → 60
        //
        map(x => x * 2),


        // filter() keeps only values greater than 20.
        //
        // 20 ❌
        // 40 ✅
        // 60 ✅
        //
        filter(x => x > 20)

    )
    .subscribe(value => {

        // Only 40 and 60 reach subscribe().
        console.log(value);

    });


// ============================================================
// 4. of()
// ============================================================
//
// of() creates an Observable from individual values.
//
// of(1, 2, 3)
//
// emits:
//
// 1
// 2
// 3
//
// and then completes.
//

console.log('--- of example ---');


of(1, 2, 3)
    .subscribe(value => {

        console.log(value);

    });


// ============================================================
// 5. from()
// ============================================================
//
// from() converts something such as an array into
// an Observable.
//
// Array:
//
// [4, 5, 6]
//
// becomes:
//
// 4
// 5
// 6
//
// Each item is emitted separately.
//

console.log('--- from example ---');


from([4, 5, 6])
    .subscribe(value => {

        console.log(value);

    });


// ============================================================
// 6. timer()
// ============================================================
//
// timer(1000) waits for 1000 milliseconds.
//
// 1000 milliseconds = 1 second.
//
// After one second:
//
// Timer fired
//
// It emits once and completes.
//

console.log('--- timer example ---');


timer(1000)
    .subscribe(() => {

        console.log('Timer fired');

    });


// ============================================================
// 7. interval()
// ============================================================
//
// interval(1000) emits a number every 1 second.
//
// The values are:
//
// 0
// 1
// 2
// 3
// 4
// ...
//
// IMPORTANT:
//
// interval() does NOT automatically complete.
//
// It continues running until you unsubscribe or use
// an operator such as take().
//

console.log('--- interval example ---');


interval(1000)
    .subscribe(value => {

        console.log('Tick:', value);

    });


// ============================================================
// 8. tap()
// ============================================================
//
// tap() allows us to LOOK at a value without changing it.
//
// It is commonly used for:
//
// - debugging
// - logging
// - side effects
//
// tap() does NOT transform the value.
//
// Flow:
//
// 10
// ↓
// tap()      → prints "Before map: 10"
// ↓
// map()      → 15
// ↓
// subscribe() → prints "After map: 15"
//

console.log('--- tap example ---');


numbers$
    .pipe(

        // tap() sees the original value.
        //
        // 10
        // 20
        // 30
        //
        // It does NOT change them.
        tap(value => {

            console.log('Before map:', value);

        }),


        // map() changes the value.
        //
        // 10 → 15
        // 20 → 25
        // 30 → 35
        //
        map(value => value + 5)

    )
    .subscribe(value => {

        // These are the values AFTER map().
        console.log('After map:', value);

    });


// ============================================================
// IMPORTANT
// ============================================================
//
// This program contains:
//
// timer(1000)
//
// and:
//
// interval(1000)
//
// timer() finishes after one emission.
//
// interval() keeps running forever.
//
// Therefore this Node.js program will continue running.
//
// To stop it manually:
//
// Ctrl + C
//
// Later, you can learn:
//
// interval(1000)
//     .pipe(take(5))
//
// which will automatically stop after 5 values.
//
// ============================================================