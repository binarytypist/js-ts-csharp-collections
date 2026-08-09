const { of, Subject, delay, exhaustMap } = require('rxjs');
// I'm already processing something. Ignore new values until I'm finished.
const submit$ = new Subject();

submit$
    .pipe(
        exhaustMap(value =>
            of(`Request completed: ${value}`)
                .pipe(delay(100))
        )
    )
    .subscribe(result => {
        console.log(result);
    });


// User clicks three times
submit$.next("Click 1");

setTimeout(() => {
    submit$.next("Click 2");
}, 20);

setTimeout(() => {
    submit$.next("Click 3");
}, 40);