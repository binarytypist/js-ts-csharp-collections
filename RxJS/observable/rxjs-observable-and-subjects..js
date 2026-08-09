const { Observable, Subject, BehaviorSubject } = require("rxjs");

console.log("=== 1) Observable + Observer ===");

// Observable: produces values.
const numbers$ = new Observable((observer) => {
	observer.next(10);
	observer.next(20);
	observer.next(30);
	observer.complete();
});

// Observer: receives and handles values.
const observer = {
	next: (value) => {
		console.log("Value:", value);
	},
	error: (error) => {
		console.log("Error:", error);
	},
	complete: () => {
		console.log("Finished");
	},
};

numbers$.subscribe(observer);

console.log("\n=== 2) Subject ===");

// Subject: can both emit values and be subscribed to.
const subject = new Subject();

subject.subscribe((value) => {
	console.log("A:", value);
});

subject.subscribe((value) => {
	console.log("B:", value);
});

subject.next(10);
subject.next(20);

console.log("\n=== 3) BehaviorSubject + asObservable() ===");

// BehaviorSubject stores the latest value and emits it to new subscribers.
const dataSubject = new BehaviorSubject("Initial data");

// Expose read-only observable side.
const data$ = dataSubject.asObservable();

data$.subscribe((value) => {
	console.log("Component 1:", value);
});

dataSubject.next("Updated data");

data$.subscribe((value) => {
	console.log("Component 2:", value);
});
