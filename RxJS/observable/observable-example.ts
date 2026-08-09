import {
  Observable,
  of,
  from,
  fromEvent,
  interval,
  timer,
  map,
  filter,
  tap
} from 'rxjs';


// ============================================================
// 1. Observable - Create our own Observable
// ============================================================

// numbers$ is an Observable that sends:
// 10 → 20 → 30 → complete
//
// The $ at the end of the variable name is a common RxJS
// naming convention meaning:
// "This variable is an Observable."

const numbers$ = new Observable<number>(observer => {

  // Send the first value
  observer.next(10);

  // Send the second value
  observer.next(20);

  // Send the third value
  observer.next(30);

  // Tell the Observable that there are no more values
  observer.complete();

});


// ============================================================
// 2. subscribe() - Receive values from Observable
// ============================================================

console.log('--- subscribe example ---');

// subscribe() listens to the Observable.
//
// numbers$ sends:
// 10
// 20
// 30
//
// subscribe receives each value.

numbers$.subscribe(value => {

  console.log(value);

});


// ============================================================
// 3. pipe() + map() + filter()
// ============================================================

console.log('--- pipe example ---');

// pipe() allows us to use RxJS operators.
//
// map()
// Changes each value.
//
// 10 → 20
// 20 → 40
// 30 → 60
//
// filter()
// Keeps only values greater than 20.
//
// 20 ❌
// 40 ✅
// 60 ✅

numbers$
  .pipe(

    // Multiply every value by 2
    map(x => x * 2),

    // Keep values greater than 20
    filter(x => x > 20)

  )
  .subscribe(value => {

    console.log(value);

  });


// ============================================================
// 4. of() - Create Observable from values
// ============================================================

console.log('--- of example ---');

// of() creates an Observable from the values
// passed to it.
//
// Emits:
// 1
// 2
// 3

of(1, 2, 3)
  .subscribe(value => {

    console.log(value);

  });


// ============================================================
// 5. from() - Convert an array to Observable
// ============================================================

console.log('--- from example ---');

// from() can convert an array into an Observable.
//
// Array:
// [4, 5, 6]
//
// Observable emits:
// 4
// 5
// 6

from([4, 5, 6])
  .subscribe(value => {

    console.log(value);

  });


// ============================================================
// 6. timer() - Emit after a delay
// ============================================================

console.log('--- timer example ---');

// timer(1000)
// Waits 1000 milliseconds = 1 second.
//
// After 1 second:
// "Timer fired"

timer(1000)
  .subscribe(() => {

    console.log('Timer fired');

  });


// ============================================================
// 7. interval() - Emit repeatedly
// ============================================================

console.log('--- interval example ---');

// interval(1000)
// Emits a number every 1 second.
//
// 0
// 1
// 2
// 3
// 4
// ...
//
// IMPORTANT:
// This Observable keeps running until you unsubscribe.

interval(1000)
  .subscribe(value => {

    console.log('Tick:', value);

  });


// ============================================================
// 8. tap() - Look at values without changing them
// ============================================================

console.log('--- tap example ---');

// tap() is mainly useful for:
// - debugging
// - logging
// - side effects
//
// tap() does NOT change the value.
//
// Flow:
//
// 10
// ↓
// tap → "Before map: 10"
// ↓
// map → 15
// ↓
// subscribe → "After map: 15"

numbers$
  .pipe(

    // Look at the value before map()
    tap(value => {

      console.log('Before map:', value);

    }),

    // Add 5 to every value
    map(value => value + 5)

  )
  .subscribe(value => {

    console.log('After map:', value);

  });


// ============================================================
// 9. fromEvent() - Convert browser events to Observable
// ============================================================

// IMPORTANT:
//
// This section works in a browser because it uses:
//
// document
// document.body
// button
//
// It will NOT work directly in normal Node.js.

const button = document.createElement('button');


// Set button text
button.textContent = 'Click me';


// Add button to the webpage
document.body.appendChild(button);


console.log('--- fromEvent example ---');


// fromEvent() converts a DOM event into an Observable.
//
// Every time the button is clicked:
//
// click event
//     ↓
// fromEvent()
//     ↓
// Observable
//     ↓
// subscribe()
//     ↓
// "Button clicked"

fromEvent(button, 'click')
  .subscribe(() => {

    console.log('Button clicked');

  });