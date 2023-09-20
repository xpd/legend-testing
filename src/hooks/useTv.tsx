import { useCallback } from "react";
import { tv } from "tailwind-variants";

// todo: consider extracting some of these test styles
// todo: improve types
// highly beneficial to be able to wrap common functionality in better hooks

export const useTv = (baseStyle: string | string[], passedObj: object = {}) => useCallback(
	tv({
		base: baseStyle,
		...passedObj,
	}),
	[baseStyle, passedObj]
);
