import { Observable } from '@legendapp/state';
import ErrorBoundary from '~/components/ErrorOutput';
import type { Edge, Node } from '~/store/store$';
import { BgGrid } from './BgGrid';
import { Edges } from './Edges';
import { Nodes } from './Nodes';

// todo: can something from legend be used to typing or regular graph type?
interface GraphProps {
	nodes$: Observable<Node[]>;
	edges$: Observable<Edge[]>;
}
// todo: use suspense

export function Graph({ nodes$, edges$ }: GraphProps) {
	console.count('render Graph');
	return (
		<div className="relative w-full h-full overflow-scroll">
			<ErrorBoundary>
				<Nodes nodes$={nodes$} />
				<Edges edges$={edges$} />
				<BgGrid />
			</ErrorBoundary>
		</div>
	);
}
