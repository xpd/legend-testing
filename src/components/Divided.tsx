import { Props } from "~/components/types";

export const Divided = {
	// todo: consider creating a simpler way to output classes with children, when there are nothing else
	Root: ({ children }: Props) => <div className="flex flex-row divide-x divide-dashed divide-sage-3">{children}</div>,
	Column: ({ children }: Props) => <div className="flex flex-col gap-4 px-12 max-w-[400px]">{children}</div>
};
