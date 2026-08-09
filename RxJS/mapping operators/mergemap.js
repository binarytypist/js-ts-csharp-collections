const { of, Subject, delay, mergeMap } = require('rxjs');

const upload$ = new Subject();

upload$
    .pipe(
        mergeMap(file =>
            of(`Uploaded ${file}`)
                .pipe(delay(100))
        )
    )
    .subscribe(result => {
        console.log(result);
    });


// Start three uploads
upload$.next("File A");
upload$.next("File B");
upload$.next("File C");

upload$.complete();