# Subject and BehaviorSubject in RxJS

A `Subject` is both an Observable and an Observer. It lets you push values into the stream manually.

## 1. `Subject`

A `Subject` is useful when you want multiple subscribers to receive the same values.

```ts
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe(value => console.log('A:', value));
subject.subscribe(value => console.log('B:', value));

subject.next(10);
subject.next(20);
subject.complete();
```

### Output

```text
A: 10
B: 10
A: 20
B: 20
```

---

## 2. `BehaviorSubject`

A `BehaviorSubject` holds the latest value and immediately emits it to new subscribers.

```ts
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject<number>(0);

subject.subscribe(value => console.log('A:', value));
subject.next(10);
subject.next(20);

subject.subscribe(value => console.log('B:', value));
```

### Output

```text
A: 0
A: 10
A: 20
B: 20
```

---

## 3. Difference between Subject and BehaviorSubject

| Type | Emits old value to new subscribers | Good for |
| --- | --- | --- |
| Subject | No | Event-like streams |
| BehaviorSubject | Yes | State and current value sharing |

---

## 4. Common methods

- `next(value)` → send a value
- `error(err)` → send an error
- `complete()` → finish the stream

---

## 5. Angular use case

In Angular, `BehaviorSubject` is commonly used for shared state such as:

- user authentication state
- theme settings
- cart data
- loading flags
