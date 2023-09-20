import { Reactive, useObserveEffect } from '@legendapp/state/react';
import { useTv } from '~/hooks/useTv';
import type { Edge as EdgeType } from '~/store/store$';
import { store$ } from '~/store/store$';
import { getEdgeCoordinates } from '~/utils/edge';


const getStraightPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
	return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

const getSmoothStepPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
	const midX = (start.x + end.x) / 2;
	let smoothing = 5; // smoothing factor

	// If there isn't enough space for a smooth curve, reduce the smoothing factor
	if (Math.abs(start.y - end.y) < smoothing * 2) {
		smoothing = Math.abs(start.y - end.y) / 2;
	}

	const direction = start.y < end.y ? 1 : -1;

	return `M ${start.x} ${start.y}
					L ${midX - smoothing} ${start.y}
					Q ${midX} ${start.y}, ${midX} ${start.y + smoothing * direction}
					L ${midX} ${end.y - smoothing * direction}
					Q ${midX} ${end.y}, ${midX + smoothing} ${end.y}
					L ${end.x} ${end.y}`;
};

export const Edge = ({ id, source, target }: EdgeType) => {

	// todo: should this comp actually setup everything in the store, or should the comp just render?
	const edge$ = store$.getEdge(id); // todo: useComputed to not pull it multiple times? or maybe useRef or something.

	if (!edge$) throw new Error(`Edge with id ${id} not found in store`);

	// useEffect(() => {
	// 	edge$.source$.set(store$.getNode(source));
	// 	edge$.target$.set(store$.getNode(target));
	// })

	const style = useTv([
		'stroke-sage-4 fill-transparent duration-100 ease-in-out',
		'will-change-[opacity,contents]'
	], {
		variants: {
			'isReady': {
				false: 'opacity-0 pointer-events-none',
				true: 'opacity-200 pointer-events-auto', // todo: maybe move transition
			},
			'isInPosition': {
				false: 'transition-opacity',
				true: 'transition-all',
			},
		},
		defaultVariants: {
			'isReady': false,
			'isInPosition': false,
		},
	});


	const source$ = store$.getNode(source);
	const target$ = store$.getNode(target);

	const sourcePosition = source$.position.use();
	const sourceDimensions = source$.dimensions.use();
	const targetPosition = target$.position.use();
	const targetDimensions = target$.dimensions.use();

	const coordinates = getEdgeCoordinates(sourcePosition, sourceDimensions, targetPosition, targetDimensions);

	// todo: dumb solution
	useObserveEffect(() => {
		const isReady = edge$.isReady.get();
		setTimeout(() => {
			edge$.isInPosition.set(isReady);
		}, 10);
	});

	if (!edge$.isReady.use()) return <></>;

	const { start, end } = coordinates;

	const pathD = getSmoothStepPath(start, end);

	// todo: maybe set up a local store and just use a reactive wrapper or something
	return (
		<Reactive.path
			d={pathD}
			className={style({ isReady: edge$.isReady.get(), isInPosition: edge$.isInPosition.get() })}
			style={{ 'shape-rendering': 'optimizeSpeed' }}
			strokeWidth="1"
			strokeLinecap="round"
			markerStart={`url(#circle`}
			markerEnd={`url(#arrow`} />
	);
};
