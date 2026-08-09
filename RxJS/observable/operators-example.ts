import {
  BehaviorSubject,
  EMPTY,
  NEVER,
  Observable,
  Subject,
  combineLatest,
  concat,
  defer,
  forkJoin,
  iif,
  interval,
  lastValueFrom,
  merge,
  of,
  throwError,
  timer,
  withLatestFrom,
  zip,
  catchError,
  delay,
  distinctUntilChanged,
  first,
  last,
  map,
  retry,
  retryWhen,
  scan,
  share,
  shareReplay,
  skip,
  skipWhile,
  startWith,
  take,
  takeUntil,
  takeWhile
} from 'rxjs';

interface DemoSection {
  title: string;
  run(): Promise<void>;
}

type Logger = (message: string, value?: unknown) => void;

abstract class BaseSection implements DemoSection {
  public abstract title: string;

  protected readonly log: Logger;

  public constructor(log: Logger) {
    this.log = log;
  }

  public abstract run(): Promise<void>;

  protected heading(): void {
    this.log(`\n=== ${this.title} ===`);
  }
}

class ImportantAndFilteringSection extends BaseSection {
  public title = 'Important Creation + Filtering Operators';

  public async run(): Promise<void> {
    this.heading();
    await this.creationExamples();
    await this.filteringExamples();
    await this.errorAndSharingExamples();
  }

  private async creationExamples(): Promise<void> {
    EMPTY.subscribe({
      complete: () => this.log('EMPTY completes immediately with no next values')
    });

    NEVER.pipe(takeUntil(timer(40))).subscribe({
      complete: () => this.log('NEVER is silent forever unless you stop it')
    });

    await this.collect(
      throwError(() => new Error('Failed')).pipe(
        catchError(err => of(`throwError handled: ${err.message}`))
      ),
      'throwError'
    );

    const isAdmin = false;
    await this.collect(
      iif(
        () => isAdmin,
        of('Admin dashboard'),
        of('Public dashboard')
      ),
      'iif'
    );
  }

  private async filteringExamples(): Promise<void> {
    await this.collect(
      of(10, 10, 20, 20, 30).pipe(distinctUntilChanged()),
      'distinctUntilChanged'
    );

    await this.collect(
      interval(20).pipe(startWith(-1), take(4)),
      'startWith + take'
    );

    await this.collect(
      interval(20).pipe(takeUntil(timer(75))),
      'takeUntil'
    );

    await this.collect(
      of(2, 4, 6, 7, 8).pipe(takeWhile(value => value % 2 === 0)),
      'takeWhile'
    );

    await this.collect(of('A', 'B', 'C', 'D').pipe(skip(2)), 'skip');
    await this.collect(of(5, 7, 9).pipe(first()), 'first');
    await this.collect(of(5, 7, 9).pipe(last()), 'last');
    await this.collect(
      of(1, 2, 3, 4, 5).pipe(skipWhile(value => value < 3)),
      'skipWhile'
    );
  }

  private async errorAndSharingExamples(): Promise<void> {
    let attempts = 0;
    await this.collect(
      defer(() => {
        attempts += 1;
        return attempts < 3
          ? throwError(() => new Error(`Attempt ${attempts} failed`))
          : of('retry succeeded on third attempt');
      }).pipe(
        retry(2),
        catchError(err => of(`retry exhausted: ${err.message}`))
      ),
      'retry'
    );

    let transient = 0;
    await this.collect(
      defer(() => {
        transient += 1;
        return transient <= 2
          ? throwError(() => new Error(`Transient ${transient}`))
          : of('retryWhen recovered');
      }).pipe(
        retryWhen(errors =>
          errors.pipe(
            scan((count, error) => {
              if (count >= 2) {
                throw error;
              }
              return count + 1;
            }, 0),
            delay(25)
          )
        ),
        catchError(err => of(`retryWhen failed: ${err.message}`))
      ),
      'retryWhen'
    );

    const shared$ = interval(20).pipe(take(3), share());
    shared$.subscribe(value => this.log('share A', value));
    setTimeout(() => shared$.subscribe(value => this.log('share B', value)), 25);

    await new Promise<void>(resolve => setTimeout(resolve, 120));

    const apiOnce$ = defer(() => {
      this.log('Simulated API request executed once');
      return of({ id: 1, name: 'cached-profile' });
    }).pipe(shareReplay(1));

    apiOnce$.subscribe(value => this.log('shareReplay A', value));
    apiOnce$.subscribe(value => this.log('shareReplay B', value));

    await new Promise<void>(resolve => setTimeout(resolve, 25));
  }

  private async collect<T>(source: Observable<T>, label: string): Promise<void> {
    await new Promise<void>(resolve => {
      source.subscribe({
        next: value => this.log(label, value),
        complete: resolve
      });
    });
  }
}

class CombiningSection extends BaseSection {
  public title = 'Combining Observables';

  public async run(): Promise<void> {
    this.heading();
    await this.combineLatestExample();
    await this.forkJoinExample();
    await this.mergeConcatZipExample();
    await this.withLatestFromExample();
  }

  private async combineLatestExample(): Promise<void> {
    const user$ = new BehaviorSubject('Sam');
    const language$ = new BehaviorSubject('TS');
    const theme$ = new BehaviorSubject('Light');

    const subscription = combineLatest([user$, language$, theme$]).subscribe(values => {
      this.log('combineLatest', values);
    });

    user$.next('Sammie');
    language$.next('JS');
    theme$.next('Dark');

    await new Promise<void>(resolve => setTimeout(resolve, 40));
    subscription.unsubscribe();
  }

  private async forkJoinExample(): Promise<void> {
    const payload = await lastValueFrom(
      forkJoin({
        users: timer(60).pipe(map(() => ['u1', 'u2'])),
        products: timer(35).pipe(map(() => ['p1', 'p2'])),
        orders: timer(80).pipe(map(() => ['o1']))
      })
    );

    this.log('forkJoin', payload);
  }

  private async mergeConcatZipExample(): Promise<void> {
    await this.collect(merge(of('m1').pipe(delay(20)), of('m2').pipe(delay(40))), 'merge');
    await this.collect(concat(of('c1', 'c2'), of('c3', 'c4')), 'concat');
    await this.collect(zip(of('u1', 'u2'), of('l1', 'l2')), 'zip');
  }

  private async withLatestFromExample(): Promise<void> {
    const saveClick$ = timer(20, 30).pipe(take(3), map(index => `save-${index + 1}`));
    const form$ = new BehaviorSubject({ name: 'draft-1' });

    setTimeout(() => form$.next({ name: 'draft-2' }), 35);

    await this.collect(saveClick$.pipe(withLatestFrom(form$)), 'withLatestFrom');
  }

  private async collect<T>(source: Observable<T>, label: string): Promise<void> {
    await new Promise<void>(resolve => {
      source.subscribe({
        next: value => this.log(label, value),
        complete: resolve
      });
    });
  }
}

class RxjsAdvancedRunner {
  private readonly sections: DemoSection[];

  public constructor(private readonly log: Logger = console.log) {
    this.sections = this.createSections(log);
  }

  private createSections(log: Logger): DemoSection[] {
    return [
      new ImportantAndFilteringSection(log),
      new CombiningSection(log)
    ];
  }

  public async run(): Promise<void> {
    for (const section of this.sections) {
      await section.run();
    }
  }
}

async function main(): Promise<void> {
  const runner = new RxjsAdvancedRunner();
  await runner.run();
}

main();
