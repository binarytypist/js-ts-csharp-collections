// This file is kept as a note-style example.
// Use it to remember the basic idea of Subject and BehaviorSubject.
//
// Subject: sends values to all subscribers manually.
// BehaviorSubject: also remembers the latest value for new subscribers.


//   UserService
//                      │
//         ┌────────────┴────────────┐
//         │                         │
//  BehaviorSubject               user$
//  private                        public
//         │                         │
//         │ next()                  │ subscribe()
//         ↓                         ↓
//      change state              read state

import { Subject, BehaviorSubject } from 'rxjs';


// ======================================================
// SUBJECT
// ======================================================

// Create a Subject.
// A Subject does NOT have an initial value.
const subject = new Subject<number>();


// Subscriber A starts listening.
subject.subscribe(value => {
    console.log('A:', value);
});


// Subscriber B starts listening.
subject.subscribe(value => {
    console.log('B:', value);
});


// Send value 10 to all current subscribers.
subject.next(10);

// A: 10
// B: 10


// Send value 20 to all current subscribers.
subject.next(20);

// A: 20
// B: 20


// Complete the Subject.
// After complete(), it cannot emit new values.
subject.complete();


// ======================================================
// BEHAVIORSUBJECT
// ======================================================

// BehaviorSubject REQUIRES an initial value.
// Here the initial value is 0.
const behaviorSubject = new BehaviorSubject<number>(0);


// Subscriber C subscribes.
//
// IMPORTANT:
// BehaviorSubject immediately gives C
// the current value: 0.
behaviorSubject.subscribe(value => {
    console.log('C:', value);
});

// C: 0


// Change current value to 10.
behaviorSubject.next(10);

// C: 10


// Change current value to 20.
behaviorSubject.next(20);

// C: 20


// Subscriber D subscribes AFTER 20.
//
// BehaviorSubject immediately gives D
// the latest/current value: 20.
behaviorSubject.subscribe(value => {
    console.log('D:', value);
});

// D: 20