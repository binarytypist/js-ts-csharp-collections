const { BehaviorSubject, ReplaySubject, AsyncSubject } = require('rxjs');

console.log('\n=== BehaviorSubject ===');

const connectionStatus = new BehaviorSubject('offline');

connectionStatus.subscribe(value => {
    console.log('Subscriber A:', value);
});

connectionStatus.next('connecting');
connectionStatus.next('online');

console.log('Subscriber B joins late:');
connectionStatus.subscribe(value => {
    console.log('Subscriber B:', value);
});

connectionStatus.next('busy');

console.log('\n=== ReplaySubject(2) ===');

const recentNotifications = new ReplaySubject(2);

recentNotifications.next('Order placed');
recentNotifications.next('Payment confirmed');
recentNotifications.next('Packed');
recentNotifications.next('Shipped');

console.log('Subscriber joins late:');
recentNotifications.subscribe(value => {
    console.log('Replay subscriber:', value);
});

recentNotifications.next('Delivered');

console.log('\n=== AsyncSubject ===');

const finalScore = new AsyncSubject();

finalScore.subscribe(value => {
    console.log('Subscriber A final score:', value);
});

finalScore.next(25);
finalScore.next(50);
finalScore.next(75);

console.log('Subscriber B joins before complete:');
finalScore.subscribe(value => {
    console.log('Subscriber B final score:', value);
});

finalScore.next(100);
finalScore.complete();