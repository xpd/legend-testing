import { ObservableArray, beginBatch, endBatch } from '@legendapp/state';
import ELK from 'elkjs/lib/elk.bundled.js';
import { Edge, Node } from 'reactflow';
import { store$ } from '~/store/store$';

const elk = new ELK();

const updateElkLayout = (nodes$: ObservableArray<Node[]>, edges$: ObservableArray<Edge[]>) => {
	const nodes = nodes$.get();
	const edges = edges$.get();

	const direction = store$.options.direction.get();
	const isHorizontal = direction === 'HORIZONTAL';

	// Define nodes and edges in the format ElkJS expects
	const elkNodes = nodes.map((node) => ({
		...node,

		width: node.dimensions.width | 10,
		height: node.dimensions.height | 10,
	}));
	const elkEdges = edges;

	const graph = {
		id: 'root',
		layoutOptions: {
			'elk.direction': isHorizontal ? 'RIGHT' : 'DOWN',
			'elk.algorithm': 'layered',
			'elk.layered.spacing.nodeNodeBetweenLayers': '100',
			'elk.spacing.nodeNode': '10',
		},
		children: elkNodes,
		edges: elkEdges,
	};

	// Compute the layout
	elk.layout(graph)
		.then((result) => {
			// After the layout has been computed, you can update the positions of the nodes
			beginBatch();
			result.children.forEach((node, index) => {
				nodes$[index].position.set({
					x: node.x + 100, // tmp padding
					y: node.y + 100, // tmp padding
				});
			});
			endBatch();
		})
		.catch((error) => console.error('ElkJS layout error', error));
};

export default updateElkLayout;
