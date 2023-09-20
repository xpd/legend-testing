import { ObservableArray } from '@legendapp/state';
import { For } from '@legendapp/state/react';
import { Node } from './Node';

export function Nodes({ nodes$ }: { nodes$: ObservableArray<Node>; }) {
	return (
		<div className="nodes relative z-10">
			<For each={nodes$}>
				{(node$) => {
					console.count('for nodes$');
					return <Node key={node$.id.peek()} node$={node$} />;
				}}
			</For>
		</div>
	);
}
