const { Subject, of, delay, switchMap } = require('rxjs');

// =====================================================
// switchMap - EASY EXAMPLE
// =====================================================

// Think of a search box:
// When the user types quickly, we only want the latest search result.
// Older results should be ignored.
//
// switchMap does this for us.
// It cancels the previous request and starts the newest one.

const searchInput$ = new Subject();

searchInput$
    .pipe(
        switchMap(searchText => {
            console.log(`Starting search for: ${searchText}`);

            // Simulate an API request that takes 1.5 seconds.
            return of(`Result for ${searchText}`)
                .pipe(delay(1500));
        })
    )
    .subscribe(result => {
        console.log("Final result:", result);
    });

// User types quickly
console.log("Typing: react -> rxjs -> node");
searchInput$.next("react");

setTimeout(() => {
    searchInput$.next("rxjs");
}, 300);

setTimeout(() => {
    searchInput$.next("node");
}, 600);