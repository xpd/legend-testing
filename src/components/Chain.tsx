import { Children, Fragment } from "react";
import ErrorBoundary from "~/components/ErrorOutput";
import { Props } from "~/components/types";
import { useTv } from '~/hooks/useTv';

const ChainLink = () => <div className="w-0.5 h-6 bg-sage-3 mx-auto"></div>;
export const Chain = {
	Root: ({ children }: Props) => {
		const style = useTv('flex flex-col space-y-4 itemss-center');
		const childArray = Children.toArray(children);

		const renderChildrenWithLinks = () => childArray.map((child, index) => (
			<Fragment key={index}>
				{child}
				{index < childArray.length - 1 && <ChainLink />}
			</Fragment>
		));

		return (
			<div className={style()}>
				<ErrorBoundary>
					{renderChildrenWithLinks()}
				</ErrorBoundary>
			</div>
		);
	},
	Item: ({ children }: Props) => {
		const style = useTv([
			'rounded-lg border border-2 border-sage-4 text-sage-11 text-sm',
			'overflow-x-hidden overflow-y-scroll ![&>*]:p-4',
		]);

		return (
			<div className={style()}>
				<ErrorBoundary><div>{children}</div></ErrorBoundary>
			</div>
		);
	}
};
