import { Props } from "~/components/types";
import { useTv } from '~/hooks/useTv';

export const Container = ({ children }: Props) => {
	const style = useTv([
		'w-full h-full flex',
		'overflow-hidden relative flex items-center justify-center',
		'flex-1 h-full bg-gradient-to-br from-sage-2 to-sage-2',
		// 'bg-[url(/img/cyb-light.png)] bg-cover bg-center',
	]);

	return <div className={style()}>{children}</div>;
};
