// Import Subject from RxJS.
// Subject allows us to:
// 1. Send values using .next()
// 2. Listen to values using .subscribe()
const { Subject } = require('rxjs');


// =====================================================
// 1. CREATE A SUBJECT
// =====================================================

// Create a new Subject.
// At this point, nobody is listening yet.
const subject = new Subject();


// =====================================================
// 2. SUBSCRIBER A
// =====================================================

// Subscriber A starts listening to the Subject.
//
// Whenever the Subject sends a value,
// this function will be executed.
subject.subscribe(value => {
    console.log("A:", value);
});


// =====================================================
// 3. SUBSCRIBER B
// =====================================================

// Subscriber B also starts listening.
//
// Now we have TWO subscribers listening
// to the same Subject.
//
// Subject
//    |
//    ├──> Subscriber A
//    |
//    └──> Subscriber B
//
subject.subscribe(value => {
    console.log("B:", value);
});


// =====================================================
// 4. SEND VALUE: 10
// =====================================================

// .next(10) sends the value 10 into the Subject.
//
// Because A and B are currently subscribed,
// BOTH subscribers receive 10.
//
// A: 10
// B: 10
//
subject.next(10);


// =====================================================
// 5. SEND VALUE: 20
// =====================================================

// The Subject sends 20 to all current subscribers.
//
// A: 20
// B: 20
//
subject.next(20);


// =====================================================
// 6. SEND VALUE: 30
// =====================================================

// The Subject sends 30 to all current subscribers.
//
// A: 30
// B: 30
//
subject.next(30);

// The important idea

// Think of the Subject as a central channel:

//                  SUBJECT
//                     │
//              ┌──────┴──────┐
//              │             │
//              ↓             ↓
//        Subscriber A   Subscriber B
//              │             │
//              ↓             ↓
//           receives       receives
//           10, 20, 30     10, 20, 30

// When you do:

// subject.next(10);

// you're basically saying:

// "Subject, send 10 to everyone currently subscribed."

// So:

// subject.next(10)
//        ↓
//    ┌───┴───┐
//    ↓       ↓
//    A       B
//   10      10

// Then:

// subject.next(20);
//    Subject
//       ↓
//    ┌──┴──┐
//    ↓     ↓
//    A     B
//   20    20
// The 3 most important things to remember
// const subject = new Subject();

// Create the Subject.

// subject.subscribe(...)

// Start listening to the Subject.

// subject.next(value)

// Send a value to all current subscribers.

// That's the basic foundation of RxJS Subject. 