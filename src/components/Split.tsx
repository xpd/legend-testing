import { tv } from 'tailwind-variants';
import { Props } from './types';

const splitRoot = tv({
	base: ['flex flex-col h-full w-full'],
});

const common = [
	'overflow-hidden relative flex items-center justify-center',
];

const splitLeft = tv({
	base: [
		...common,
		'flex-1 h-full p-22 bg-sage-1',
		'bg-[url(/img/cyb-rough.png)] bg-cover bg-center',
		'text-amber-12',
	],
});
const splitRight = tv({
	base: [
		...common,
		'overflow-hidden relative',
		'flex-1 h-full p-12 bg-sage-12',
		'bg-[url(/img/cyb-light.png)] bg-cover bg-center',
	],
});
export const Split = {
	Root: ({ children }: Props) => <div className={splitRoot()}>{children}</div>,
	Left: ({ children }: Props) => <div className={splitLeft()}>{children}</div>,
	Right: ({ children }: Props) => (
		<div className={splitRight()}>{children}</div>
	),
};
