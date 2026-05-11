import { useMemo, useCallback } from 'react';
import type { BubbleDatum, BubbleInnerProps } from './Bubble.types';
import { buildBubbleScales, defaultGetX, defaultGetY, defaultGetR, defaultGetLabel } from './Bubble.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBubbleAccessors(
    getX?: (d: BubbleDatum) => number,
    getY?: (d: BubbleDatum) => number,
    getR?: (d: BubbleDatum) => number,
    getLabel?: (d: BubbleDatum) => string,
) {
    return useMemo(() => ({
        getX: getX ?? defaultGetX,
        getY: getY ?? defaultGetY,
        getR: getR ?? defaultGetR,
        getLabel: getLabel ?? defaultGetLabel,
    }), [getX, getY, getR, getLabel]);
}

export function useBubbleScales(
    data: readonly BubbleDatum[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: BubbleDatum) => number,
    getY: (d: BubbleDatum) => number,
    getR: (d: BubbleDatum) => number,
    minRadius: number,
    maxRadius: number,
    xDomain?: [number, number],
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildBubbleScales(data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain),
        [data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain],
    );
}

export function useBubbleColors(data: readonly BubbleDatum[], colorScheme: BubbleInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

export function useBubbleInteraction(
    onHover?: (datum: BubbleDatum | null, index: number | null) => void,
    onSelect?: (datum: BubbleDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((datum: BubbleDatum, index: number) => { enter(index); onHover?.(datum, index); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((datum: BubbleDatum, index: number) => { onSelect?.(datum, index); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
