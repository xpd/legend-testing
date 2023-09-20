import { ObservableObject, computed, observable } from "@legendapp/state";
import { interval } from "rxjs";
import type { Direction } from "./types";
import { Dimensions, EdgeId, NodeId, Position } from "./types";

export interface IncompleteNode {
  id: NodeId;
  type: string;
  position: Position;
  dimensions: Dimensions;
}

export interface IncompleteEdge {
  id: EdgeId;
  type: string;
  source: NodeId;
  target: NodeId;
  source$?: ObservableObject<Node>;
  target$?: ObservableObject<Node>;
}
export interface Node extends IncompleteNode {
  isReady: boolean;
}

export interface Edge extends IncompleteEdge {
  isReady: boolean;
}

export const store$ = observable({
  options: {
    direction: "HORIZONTAL" as Direction,
  },
  nodes: [] as Node[],
  edges: [] as Edge[],
  getNode: (id: string) => store$.nodes.find((node$) => node$.id.peek() === id),
  getEdge: (id: string) => store$.edges.find((edge$) => edge$.id.peek() === id),
  addNode: (node: IncompleteNode) => store$.nodes.push(node),
  addEdge: (edge: IncompleteEdge) => store$.edges.push(edge),
});

store$.nodes.forEach((node$) => {
  console.count("running Node isReady check");
  return node$.assign({
    isReady: computed(() => {
      console.count("running Node isReady");
      return Boolean(
        node$.dimensions.width.get() &&
          node$.dimensions.height.get() &&
          node$.position.x.get() &&
          node$.position.y.get()
      );
    }),
  });
});

interval(1000).subscribe(() => {
  console.log("%cFetching all nodes...", "font-weight: bold;");
  store$.nodes.get();
  store$.nodes.forEach((node$) => {
    console.log(node$.isReady.get());
  });
});

store$.edges.forEach((edge$) => {
  console.count("running Edge isReady check");
  console.log(edge$.isReady.peek(), edge$.isReady);
  if (!edge$.isReady.peek()) console.count("running Edge isReady");
  return edge$.assign({
    source$: edge$.source.get() ? store$.getNode(edge$.source.peek()) : null,
    target$: edge$.target.get() ? store$.getNode(edge$.target.peek()) : null,
    isReady: computed(() =>
      Boolean(
        !edge$.source.get() ||
          (edge$.source$.isReady.get() &&
            edge$.source$.isReady.get() &&
            (!edge$.target.get() ||
              (edge$.target$.isReady.get() && edge$.target$.isReady.get())))
      )
    ),
  });
});

export const nodes$ = store$.nodes;
export const edges$ = store$.edges;
