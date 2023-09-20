import { ObservableArray } from '@legendapp/state';
import { For } from '@legendapp/state/react';
import type { Edge as EdgeType } from '~/store/store$';
import { Edge } from './Edge';

const Markers = () => (
	<defs>
		<marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
			<path d="M0,0 L0,6 L7,3 z" className="fill-sage-3" strokeLinecap="round" />
		</marker>
		<marker id="circle" markerWidth="5" markerHeight="5" refX="0" refY="2.5" orient="auto" markerUnits="strokeWidth">
			<circle cx="2.5" cy="2.5" r="2.5" className="fill-sage-3" />
		</marker>
	</defs>
);

export function Edges({ edges$ }: { edges$: ObservableArray<EdgeType[]>; }) {
	return (
		<div className="edges absolute inset-0 pointer-events-none">
				<For each={edges$}>
					{(edge$) => {
						const { id, source, target } = edge$.use();
						return (
							<svg
								className="absolute w-full h-[3000px] will-change-contents"
								style={{ 'shape-rendering': 'optimizeSpeed' }}>
								<Markers />
								<Edge key={id} id={id} source={source} target={target} />
							</svg>
						);
					}}
				</For>
		</div>
	);
}
