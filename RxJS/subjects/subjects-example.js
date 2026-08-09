// This file is kept as a note-style example.
// Use it to remember the basic idea of Subject and BehaviorSubject.
//
// Subject: sends values to all subscribers manually.
// BehaviorSubject: also remembers the latest value for new subscribers.

const { Subject, BehaviorSubject } = require('rxjs');

const subject = new Subject();
subject.subscribe(value => console.log('A:', value));
subject.subscribe(value => console.log('B:', value));

subject.next(10);
subject.next(20);
subject.complete();

const behaviorSubject = new BehaviorSubject(0);
behaviorSubject.subscribe(value => console.log('C:', value));
behaviorSubject.next(10);
behaviorSubject.next(20);

behaviorSubject.subscribe(value => console.log('D:', value));
