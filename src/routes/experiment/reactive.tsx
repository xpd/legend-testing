import { computed, observable } from "@legendapp/state";
import { observableFetch } from "@legendapp/state/helpers/fetch";
import { interval } from "rxjs";
import { Chain } from "~/components/Chain";
import { Container } from "~/components/Container";
import { Divided } from "~/components/Divided";
import ErrorBoundary from "~/components/ErrorOutput";
import Json from "~/components/Json";

const FLASK_URL = "http://localhost:5000";

const observableFlask = (endpoint: string) => {
  return observableFetch(`${FLASK_URL}/${endpoint}`);
};

const initial$ = observable({
  test: "Initial",
  number: 1,
});

const second$ = observable({
  computed: computed(() => initial$.number.get() * 2),
});

interval(1000).subscribe(() => {
  initial$.number.set(initial$.number.peek() + 1);
});

const Legend = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Divided.Root>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>
                <Json value={initial$.use()} />
              </Chain.Item>
              <Chain.Item>
                <Json value={second$.use()} />
              </Chain.Item>
              <Chain.Item>Item 3</Chain.Item>
            </Chain.Root>
          </Divided.Column>
        </Divided.Root>
      </ErrorBoundary>
    </Container>
  );
};

export default Legend;
