import type { ObservableObject } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import { RefObject, useLayoutEffect } from 'react';

function getPosition(el: HTMLElement): { top: number; left: number } | undefined {
    if (el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
        };
    }
    return undefined;
}

export function usePosition(ref: RefObject<HTMLElement>): ObservableObject<{
    top: number | undefined;
    left: number | undefined;
}> {
    const obs = useObservable<{ top: number | undefined; left: number | undefined }>({
        top: undefined,
        left: undefined,
    });

    useLayoutEffect(() => {
        const el = ref.current;
        if (el && el.parentElement) {
            const handlePositionChange = () => {
                if (ref.current) {
                    const oldPosition = obs.peek();
                    const newPosition = getPosition(ref.current);
                    if (newPosition && (newPosition.top !== oldPosition.top || newPosition.left !== oldPosition.left)) {
                        obs.set(newPosition);
                    }
                }
            };
            handlePositionChange();

            let mutationObserver = new MutationObserver(handlePositionChange);
            mutationObserver.observe(el, { attributes: true, childList: true, subtree: true, characterData: true });

            let resizeObserver = new ResizeObserver(handlePositionChange);
            resizeObserver.observe(el);

            let parentResizeObserver = new ResizeObserver(handlePositionChange);
            parentResizeObserver.observe(el.parentElement);

            let intersectionObserver = new IntersectionObserver(handlePositionChange, { root: null, rootMargin: '0px', threshold: 0 });
            intersectionObserver.observe(el);

            return () => {
                mutationObserver.disconnect();
                (mutationObserver as any) = undefined;
                resizeObserver.disconnect();
                (resizeObserver as any) = undefined;
                parentResizeObserver.disconnect();
                (parentResizeObserver as any) = undefined;
                intersectionObserver.disconnect();
                (intersectionObserver as any) = undefined;
            };
        }
    }, [ref.current]);

    return obs;
}

export default usePosition;


