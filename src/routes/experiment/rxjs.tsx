import { Observable, computed, observable } from "@legendapp/state";
import {
  Observable as RxjsObservable,
  interval,
  map,
  pipe,
  sampleTime,
} from "rxjs";
import { Chain } from "~/components/Chain";
import { Container } from "~/components/Container";
import ErrorBoundary from "~/components/ErrorOutput";
import Json from "~/components/Json";

function toRxJS<T>(legendObservable: Observable<T>): RxjsObservable<T> {
  return new RxjsObservable<T>((subscriber) => {
    const disposer = legendObservable.onChange((value: T) => {
      subscriber.next(value);
    });
    return () => disposer();
  });
}

function fromRxJS<T>(rxjsObservable: RxjsObservable<T>): Observable<T> {
  const legendObservable = observable<T>();
  rxjsObservable.subscribe((value: T) => legendObservable.set(value));
  return legendObservable;
}

function enrichWithRxJS<T>(legendObservable: Observable<T>) {
  return {
    pipe: (...operators: any[]) => {
      const rxjsObservable = toRxJS(legendObservable);
      const pipedRxjsObservable = pipe(...operators)(rxjsObservable);
      return fromRxJS(pipedRxjsObservable);
    },
  };
}

const rxjs$ = interval(1000).pipe(map((_, i) => i + 1));
const rxjsConverted$ = fromRxJS(rxjs$);

const store$ = observable({
  updatedWithSet: {
    number: 1,
    computed: computed(() => store$.updatedWithSet.number.get() * 2),
  },
  rxjs: {
    interval: computed(() =>
      fromRxJS(interval(100).pipe(map((_, i) => i + 1)))
    ),
    debounced: computed(() =>
      fromRxJS(toRxJS(store$.rxjs.interval).pipe(sampleTime(2000)))
    ),
    debounced2: computed(() =>
      enrichWithRxJS(store$.rxjs.interval).pipe(sampleTime(2000))
    ), // support calling pipe
  },
  rxjs2: {
    random: computed(() =>
      fromRxJS(interval(100).pipe(map(() => Math.random())))
    ),
    averagePerSecond: computed(() =>
      fromRxJS(toRxJS(store$.rxjs2.random).pipe(sampleTime(1000)))
    ),
  },
});

// updatedWithSet
interval(100).subscribe(() => {
  store$.values.number.set(store$.values.number.peek() + 1);
});

const Legend = () => {
  console.log(rxjsConverted$.use());
  return (
    <Container>
      <ErrorBoundary>
        <Chain.Root>
          <Chain.Item>
            <Json value={store$.use()} />
          </Chain.Item>
          <Chain.Item>
            <Json value={rxjsConverted$.get()} />
          </Chain.Item>
        </Chain.Root>
      </ErrorBoundary>
    </Container>
  );
};

export default Legend;
