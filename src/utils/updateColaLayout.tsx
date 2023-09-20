import { ObservableArray, beginBatch, endBatch } from "@legendapp/state";
import { Edge, Node } from "reactflow";
import { Layout } from "webcola";
import { store$ } from "~/store/store$";

const updateColaLayout = (
  nodes$: ObservableArray<Node[]>,
  edges$: ObservableArray<Edge[]>
) => {
  const nodes = nodes$.get(true);
  const edges = edges$.get(true);

  const direction = store$.options.direction.get();
  const isHorizontal = direction === "HORIZONTAL";

  console.log("updateColaLayout", { direction });

  // Define nodes and edges in the format WebCola expects
  const colaNodes = nodes.map((node, index) => ({
    ...node,
    index,
  }));
  const colaEdges = edges.map((edge) => ({
    ...edge,
    source: nodes.findIndex((node) => node.id === edge.source),
    target: nodes.findIndex((node) => node.id === edge.target),
  }));

  const flowDirection = isHorizontal ? "x" : "y";

  // Create constraints for the layout direction
  const constraints = colaNodes.map((node, i) => {
    const parentNode = colaEdges.find((edge) => edge.target === node.index)
      ?.source;
    const left = parentNode !== undefined ? parentNode : i;
    const right = parentNode !== undefined ? i : i + 1;
    return { axis: flowDirection, left, right, gap: 500 };
  });

  const layout = new Layout()
    .avoidOverlaps(true)
    // .convergenceThreshold(10)
    .flowLayout("flowDirection", 150)
    .size([1000, 600])
    .nodes(colaNodes)
    .links(colaEdges)
    .jaccardLinkLengths(150)
    .start(50, 50, 150); // start the layout

  // After the layout has been computed, you can update the positions of the nodes
  beginBatch();
  colaNodes.forEach((node, index) => {
    nodes$[index].position.assign({ x: node.x, y: node.y });
  });
  endBatch();

  // // Increase the layout count
  // store$.internal.layoutCount.set((count) => count + 1);
};

export default updateColaLayout;
