import { ObservableObject, opaqueObject } from "@legendapp/state";
import { useObservable } from "@legendapp/state/react";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { ReactElement, ReactNode, cloneElement, useRef } from "react";
import usePosition from "~/hooks/usePosition";

export const useMeasureChildren = (children: ReactNode[]) => {
	const measurements$ = useObservable([] as ObservableObject<{ measure: any; position: any; }>[]);
	const refs = children.map(() => useRef<HTMLDivElement>(null));

	const measurements = refs.map((ref, index) => {
		const measure = useMeasure(ref);
		const position = usePosition(ref);

		measurements$[index].set({
			measure: measure.use(),
			position: position.use(),
			ref: opaqueObject(ref),
		});

		return { ref, measure: measure.use(), position: position.use() };
	});

	const clonedChildren = children.map((child, i) => {
		if (typeof child === 'string' || typeof child === 'number') {
			return <div key={`MeasuredChildren-${i}`} ref={measurements[i].ref}>{child}</div>;
		} else {
			return cloneElement(child as ReactElement, { key: `MeasuredChildren-${i}`, ref: measurements[i].ref });
		}
	});

	return { measurements$, clonedChildren };
};

