// Real-world Angular-style Subject example.
// A search box is an event stream, so Subject is the right fit.

import {
    Subject,
    debounceTime,
    distinctUntilChanged,
    switchMap
} from 'rxjs';

class SearchService {

    private searchSubject = new Subject<string>();

    search$ = this.searchSubject.asObservable();

    constructor() {
        this.search$
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(search => this.searchApi(search))
            )
            .subscribe(result => {
                console.log(result);
            });
    }

    search(value: string) {
        this.searchSubject.next(value);
    }

    searchApi(value: string) {
        console.log('API:', value);
        return [];
    }
}

const service = new SearchService();

service.search('A');
service.search('An');
service.search('Ang');