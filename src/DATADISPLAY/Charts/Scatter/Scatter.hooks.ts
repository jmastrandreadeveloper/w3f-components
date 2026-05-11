import { useMemo, useCallback } from 'react';
import type { ScatterDatum, ScatterInnerProps } from './Scatter.types';
import { buildScatterScales, defaultGetX, defaultGetY, defaultGetR, defaultGetLabel } from './Scatter.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useScatterAccessors(
    getX?: (d: ScatterDatum) => number,
    getY?: (d: ScatterDatum) => number,
    getR?: (d: ScatterDatum) => number,
    getLabel?: (d: ScatterDatum) => string,
) {
    return useMemo(() => ({
        getX: getX ?? defaultGetX,
        getY: getY ?? defaultGetY,
        getR: getR ?? defaultGetR,
        getLabel: getLabel ?? defaultGetLabel,
    }), [getX, getY, getR, getLabel]);
}

export function useScatterScales(
    data: readonly ScatterDatum[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: ScatterDatum) => number,
    getY: (d: ScatterDatum) => number,
    xDomain?: [number, number],
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildScatterScales(data, innerWidth, innerHeight, getX, getY, xDomain, yDomain),
        [data, innerWidth, innerHeight, getX, getY, xDomain, yDomain],
    );
}

export function useScatterColors(
    data: readonly ScatterDatum[],
    colorScheme: ScatterInnerProps['colorScheme'],
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

export function useScatterInteraction(
    onHover?: (datum: ScatterDatum | null, index: number | null) => void,
    onSelect?: (datum: ScatterDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: ScatterDatum, index: number) => {
            enter(index);
            onHover?.(datum, index);
        },
        [enter, onHover],
    );

    const handleLeave = useCallback(() => {
        leave();
        onHover?.(null, null);
    }, [leave, onHover]);

    const handleClick = useCallback(
        (datum: ScatterDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
