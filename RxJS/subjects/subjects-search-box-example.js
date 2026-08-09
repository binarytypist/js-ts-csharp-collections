// ============================================================
// REAL-WORLD RXJS SEARCH EXAMPLE
// ============================================================
//
// Imagine an Angular search box:
//
// User types:
// A → An → Ang → Angu → Angular
//
// We don't want to call the API for every keystroke.
//
// Instead:
//
// User typing
//      ↓
// Subject
//      ↓
// debounceTime(300)
//      ↓
// distinctUntilChanged()
//      ↓
// switchMap()
//      ↓
// API request
//      ↓
// Result
// ============================================================


const {
    Subject,
    debounceTime,
    distinctUntilChanged,
    switchMap
} = require('rxjs');


// ============================================================
// SEARCH SERVICE
// ============================================================

class SearchService {

    constructor() {

        // ------------------------------------------------------
        // 1. Create a Subject
        // ------------------------------------------------------
        //
        // Subject can:
        //
        //   - receive values using next()
        //   - send values to subscribers
        //
        // We use it because the search box will PUSH
        // values into this Subject.
        //
        // Example:
        //
        // this.searchSubject.next("Angular");
        //

        this.searchSubject = new Subject();


        // ------------------------------------------------------
        // 2. Convert Subject to Observable
        // ------------------------------------------------------
        //
        // asObservable() hides next(), error(), complete()
        // from consumers.
        //
        // The service controls the Subject.
        // Other code only listens to search$.
        //

        this.search$ =
            this.searchSubject.asObservable();


        // ------------------------------------------------------
        // 3. Create the RxJS pipeline
        // ------------------------------------------------------
        //
        // search$ is an Observable.
        //
        // pipe() allows us to process the values.
        //

        this.search$
            .pipe(

                // ------------------------------------------------
                // 4. debounceTime(300)
                // ------------------------------------------------
                //
                // Wait 300 milliseconds after the user stops
                // typing before continuing.
                //
                // User types:
                //
                // A
                //   ↓
                // wait
                //
                // An
                //   ↓
                // wait
                //
                // Ang
                //   ↓
                // wait 300ms
                //
                // Only "Ang" continues.
                //

                debounceTime(300),


                // ------------------------------------------------
                // 5. distinctUntilChanged()
                // ------------------------------------------------
                //
                // Don't process the same search value twice.
                //
                // Example:
                //
                // Angular
                // Angular
                //
                // The second Angular is ignored.
                //

                distinctUntilChanged(),


                // ------------------------------------------------
                // 6. switchMap()
                // ------------------------------------------------
                //
                // For every search value, call searchApi().
                //
                // In a real Angular application this would normally
                // be an HTTP request.
                //
                // Example:
                //
                // searchApi("Angular")
                //
                // If another search happens before the previous
                // request finishes, switchMap() switches to the
                // newest request.
                //

                switchMap(search =>
                    this.searchApi(search)
                )
            )


            // ----------------------------------------------------
            // 7. subscribe()
            // ----------------------------------------------------
            //
            // subscribe() receives the final result from the
            // Observable pipeline.
            //

            .subscribe(result => {

                console.log("RESULT:", result);

            });
    }


    // ==========================================================
    // 8. search()
    // ==========================================================
    //
    // This method is called when the user types something.
    //
    // Example:
    //
    // service.search("Angular");
    //
    // next() pushes the value into the Subject.
    //

    search(value) {

        this.searchSubject.next(value);

    }


    // ==========================================================
    // 9. searchApi()
    // ==========================================================
    //
    // This represents an API call.
    //
    // In real Angular code you would normally do:
    //
    // return this.http.get("/api/search", {
    //     params: { search: value }
    // });
    //
    // For this Node.js example, we simply return an array.
    //

    searchApi(value) {

        console.log("API:", value);

        return [];

    }
}


// ============================================================
// CREATE THE SERVICE
// ============================================================

const service = new SearchService();


// ============================================================
// SIMULATE USER TYPING
// ============================================================

// User types "A"
service.search("A");

// User quickly types "An"
service.search("An");

// User quickly types "Ang"
service.search("Ang");