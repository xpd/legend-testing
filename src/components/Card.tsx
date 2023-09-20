import { tv } from "tailwind-variants";
import { Props } from './types';

const card = tv({
	base: [
		// 'bg-black/30',
		'max-w-[550px]',
		'border border-black/90 p-4',
		'rounded-lg bg-black/80',
		'flex flex-col items-center gap-6 text-center',
		'shadow-xl shadow-black/70',
		'backdrop-blur-sm',
	],
});
export const Card = {
	Root: ({ children }: Props) => (
		<div className={card()}>
			{children}
		</div>
	),
};
