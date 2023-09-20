import { Observable } from '@legendapp/state';
import { Reactive, useObserveEffect } from '@legendapp/state/react';
import { useMeasure } from '@legendapp/state/react-hooks/useMeasure';
import { useRef } from 'react';
import { usePress } from 'react-aria';
import ErrorBoundary from '~/components/ErrorOutput';
import { useTv } from '~/hooks/useTv';
import type { Node } from '~/store/store$';

// Graph Components


export function Node({ node$ }: { node$: Observable<Node>; }) {
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const measured$ = useMeasure(nodeRef);

	console.count('render Node');

	// todo: this will only run if we don't have reactive.div, as it doesn't seem to trigger
	useObserveEffect(() => {
		const dimensions = measured$.get();
		if (dimensions.width && dimensions.height) {
			node$.dimensions.set(dimensions);
		}
	});

	// todo: dumb solution
	useObserveEffect(() => {
		const isReady = node$.isReady.get();
		setTimeout(() => {
			node$.isInPosition.set(isReady);
		}, 10);
	});

	const style = useTv([
		'w-[100px] h-[50px] overflow-hidden p-2',
		'text-[8px] font-bold absolute',
		' bg-sage-1 border border-sage-3 text-sage-8 rounded-lg shadow-lg',
		'hover:bg-sage-2 hover:border-sage-4 hover:text-sage-9',
		'focus:ring-1 focus:ring-blue-8 focus:ring-opacity-80 focus:ring-offset-2 focus:ring-offset-sage-2 focus:outline-none',
		'duration-200 ease-in-out',
		// 'will-change-[opacity,top,right,width,height]',
		'will-change-[opacity,transform,width,height]',
		'hover:w-[150px] focus:h-[80px]'
	], {
		variants: {
			'isReady': {
				false: 'fixed opacity-0 pointer-events-none',
				true: 'opacity-100 pointer-events-auto',
			},
			'isInPosition': {
				false: 'transition-opacity',
				true: 'transition-[opacity,top,right,width,height]',
			},
		},
		defaultVariants: {
			'isReady': false,
			'isInPosition': false,
		},
	});

	const { pressProps } = usePress({
		onPress: () => {
			console.log('Clicked focus for node', id);
		}
	});

	const { id, position } = node$.use();

	return (
		<Reactive.div
			ref={nodeRef}
			{...pressProps}
			tabIndex={-1}
			className={style({ isReady: node$.isReady.use(), isInPosition: node$.isInPosition.use() })}
			// style={{ position: 'absolute', left: position.x, top: position.y }}
			style={{
				position: 'absolute',
				// transform: `translate(-50%, -50%) translateX(${position.x}px) translateY(${position.y}px)`
				transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0)`
			}}
			>
			<ErrorBoundary>
				{console.count('Node Reactive.div')}
				<pre>
					{JSON.stringify(measured$.use(), null, 2)}
				</pre>
			</ErrorBoundary>
		</Reactive.div>
	);
}
