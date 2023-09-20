import { observable } from "@legendapp/state";
import { Suspense } from "react";
import { Chain } from "~/components/Chain";
import { Container } from "~/components/Container";
import { Divided } from "~/components/Divided";
import ErrorBoundary from "~/components/ErrorOutput";

const FLASK_URL = "http://localhost:5000";

// try out proper error boundaries and suspense
// Feat: Support Suspense with useSelector(state, { suspend: true }) or state.use({ suspend: true })

const suspense$ = observable(
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, this is a resolved promise");
    }, 5000);
  })
);

const Loading = () => {
  return <div>Loading...</div>;
};

const Suspended = () => <>{suspense$.use({ suspense: true })}</>;

const SuspenseTest = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Suspended />
    </Suspense>
  );
};

const ErrorTest = () => {
  throw new Error("Crashing the component");
};

const Legend = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Divided.Root>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>
                Fetch an image and show loading while doing it
              </Chain.Item>
              <Chain.Item>
                Show suspense or loading until we have an image, then request
                and show a different loading
              </Chain.Item>
              <Chain.Item>
                Try to use some value from the prev, show loading until
                available, and error boundary when it fails
              </Chain.Item>
            </Chain.Root>
          </Divided.Column>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>Testing suspense and error handling</Chain.Item>
              <Chain.Item>
                <div>
                  <SuspenseTest />
                </div>
              </Chain.Item>
              <Chain.Item>
                <ErrorTest />
              </Chain.Item>
            </Chain.Root>
          </Divided.Column>
        </Divided.Root>
      </ErrorBoundary>
    </Container>
  );
};

export default Legend;
