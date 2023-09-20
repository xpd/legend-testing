import { computed, observable } from "@legendapp/state";
import { observableFetch } from "@legendapp/state/helpers/fetch";
import { Chain } from "~/components/Chain";
import { Container } from "~/components/Container";
import { Divided } from "~/components/Divided";
import ErrorBoundary from "~/components/ErrorOutput";
import Json from "~/components/Json";

const FLASK_URL = "http://localhost:5000";

const observableFlask = (endpoint: string) => {
  return observableFetch(`${FLASK_URL}/${endpoint}`);
};

const fetch$ = observableFetch("https://jsonplaceholder.typicode.com/posts/1");

const fetchComputed$ = observable({
  computed: computed(() => fetch$?.data?.get()?.title?.toUpperCase()),
});

const flask$ = observableFlask("hello");

const Legend = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Divided.Root>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>
                <Json value={fetch$.use()} />
              </Chain.Item>
              <Chain.Item>
                <Json value={fetchComputed$.use()} />
              </Chain.Item>
            </Chain.Root>
          </Divided.Column>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>
                <Json value={flask$.use()} />
              </Chain.Item>
            </Chain.Root>
          </Divided.Column>
        </Divided.Root>
      </ErrorBoundary>
    </Container>
  );
};

export default Legend;
