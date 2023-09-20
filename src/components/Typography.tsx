import { Props } from "~/components/types";

export const H1 = ({ children }: Props) => (
	<h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
		{children}
	</h1>
);
export const H2 = ({ children }: Props) => (
	<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		{children}
	</h2>
);
const H3 = ({ children }: Props) => (
	<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
		{children}
	</h3>
);
