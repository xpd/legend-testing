import { Container } from "~/components/Container";
import ErrorBoundary from "~/components/ErrorOutput";

import { For } from "@legendapp/state/react";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { ReactElement, useRef } from "react";
import { Chain } from "~/components/Chain";
import { Divided } from "~/components/Divided";
import Json from "~/components/Json";
import { useMeasureChildren } from "~/hooks/useMeasureChildren";
import usePosition from "~/hooks/usePosition";

function Measure() {
  const ref = useRef<HTMLDivElement>(null);
  const measure = useMeasure(ref); // todo: not sure if it actually renders the top
  const position = usePosition(ref);

  return (
    <div>
      <div ref={ref} className="px-4">
        ---
      </div>
      <Json
        value={{
          measure: measure.use(),
          position: position.use(),
        }}
      />
    </div>
  );
}

function MeasuredChildren({ children }: { children: ReactElement[] }) {
  const { measurements$, clonedChildren } = useMeasureChildren(children);

  return (
    <>
      <Chain.Item>
        <div className="flex gap-1">{clonedChildren}</div>
      </Chain.Item>
      <Chain.Item>
        <div className="flex gap-1">
          <For each={measurements$}>
            {(item) => (
              <div className="w-12 h-12 bg-red-8">
                {item.use()?.measure?.width}
              </div>
            )}
          </For>
        </div>
      </Chain.Item>
      <Chain.Item>
        <Json value={measurements$.use()} />
      </Chain.Item>
    </>
  );
}

const Legend = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Divided.Root>
          <Divided.Column>
            <Chain.Root>
              <Chain.Item>
                <Measure />
              </Chain.Item>
              <Chain.Item>
                <MeasuredChildren>
                  <div className="w-12 h-12 text-xs border" />
                  <div className="w-12 h-12 text-xs border" />
                  <div className="w-12 h-12 text-xs border" />
                  <div className="w-12 h-12 text-xs border" />
                </MeasuredChildren>
              </Chain.Item>
            </Chain.Root>
          </Divided.Column>
        </Divided.Root>
      </ErrorBoundary>
    </Container>
  );
};

export default Legend;
