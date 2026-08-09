const { Subject, of, delay, concatMap } = require('rxjs');

// ============================================
// CONCATMAP - PROCESS ORDERS ONE BY ONE
// ============================================

// This Subject represents incoming orders.
const order$ = new Subject();


// Listen for orders
order$
    .pipe(

        // Process each order one after another.
        //
        // Order 2 waits until Order 1 finishes.
        // Order 3 waits until Order 2 finishes.
        concatMap(order => {

            console.log("Starting:", order);

            // Simulate an API/database operation
            // that takes 1 second.
            return of(`Completed: ${order}`)
                .pipe(
                    delay(1000)
                );
        })

    )
    .subscribe(result => {

        console.log(result);

    });


// ============================================
// THREE ORDERS ARRIVE
// ============================================

order$.next("Order 1");
order$.next("Order 2");
order$.next("Order 3");

order$.complete();