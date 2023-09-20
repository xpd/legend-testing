import { interval } from "rxjs";
import { Container } from "~/components/Container";
import ErrorBoundary from "~/components/ErrorOutput";
import { Graph } from "~/components/Graph";
import Json from "~/components/Json";
import { Edge, Node, edges$, nodes$, store$ } from "~/store/store$";
import { nanoid } from "~/utils/nanoid";
import updateElkLayout from "~/utils/updateElkLayout";

const x = (times: number, callback: (index: number) => void): void[] =>
  Array.from({ length: times }, (_, i) => callback(i));

const mock = (
  i: number,
  parentIds: null | string[] = null
): { node: Node; edges: Edge[] } => {
  const id = nanoid();
  const edges =
    parentIds?.map((parentId) => ({
      id: `${parentId}_${id}`,
      source: parentId,
      target: id,
      type: "smoothstep",
    })) || [];

  return {
    node: {
      id: id,
      type: "custom",
      data: { label: `${i}` },
      position: { x: 0, y: 0 },
      dimensions: { width: 0, height: 0 },
    },
    edges: edges,
  };
};

const mainNode = mock(1);
store$.addNode(mainNode.node);

const nodesToLink = [] as string[];

x(8, (i: number) => {
  const generated = mock(i, [mainNode.node.id]);
  const lvl2Parent = generated.node.id;
  store$.addNode(generated.node);
  generated.edges && generated.edges.forEach((edge) => store$.addEdge(edge));

  x(2, (i: number) => {
    const generated = mock(i, [lvl2Parent]);
    const lvl3Parent = generated.node.id;
    store$.addNode(generated.node);
    generated.edges && generated.edges.forEach((edge) => store$.addEdge(edge));

    x(3, (i: number) => {
      const generated = mock(i, [lvl3Parent]);
      store$.addNode(generated.node);
      generated.edges &&
        generated.edges.forEach((edge) => store$.addEdge(edge));
      nodesToLink.push(generated.node.id);
    });
  });
});

const lastNode = mock(1, nodesToLink);
store$.addNode(lastNode.node);
lastNode.edges && lastNode.edges.forEach((edge) => store$.addEdge(edge));

interval(1000).subscribe(() => {
  console.count("update layout");
  updateElkLayout(nodes$, edges$);
  // updateColaLayout(nodes$, edges$);
});

// Route Components

function Observability() {
  return (
    <div className="text-xs overflow-scroll">
      <ErrorBoundary>
        <Json value={store$.use()} />
      </ErrorBoundary>
    </div>
  );
}

// experiement with reactive store
export default function App() {
  console.count("render App");
  return (
    <Container>
      <div className="flex flex w-full h-full">
        <div className="flex-1 overflow-hidden">
          <Graph nodes$={store$.nodes} edges$={store$.edges} />
        </div>
        <div className="flex-none w-[600px] overflow-hidden">
          <Observability />
        </div>
      </div>
    </Container>
  );
} // core
