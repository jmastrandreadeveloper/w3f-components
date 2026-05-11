import { useMemo, useCallback } from 'react';
import type { DotPlotDatum } from './DotPlot.types';
import { buildDotPlotScales, defaultGetX, defaultGetCategory } from './DotPlot.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useDotPlotAccessors(
    getX?: (d: DotPlotDatum) => number,
    getCategory?: (d: DotPlotDatum) => number,
) {
    return useMemo(() => ({
        getX: getX ?? defaultGetX,
        getCategory: getCategory ?? defaultGetCategory,
    }), [getX, getCategory]);
}

export function useDotPlotScales(
    data: readonly DotPlotDatum[],
    categories: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: DotPlotDatum) => number,
    xDomain?: [number, number],
) {
    return useMemo(
        () => buildDotPlotScales(data, categories, innerWidth, innerHeight, getX, xDomain),
        [data, categories, innerWidth, innerHeight, getX, xDomain],
    );
}

export function useDotPlotColors(categories: readonly string[], colorScheme: unknown) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme as any);
        return categories.map((_, i) => palette[i % palette.length]);
    }, [categories, colorScheme]);
}

export function useDotPlotInteraction(
    onHover?: (datum: DotPlotDatum | null, index: number | null) => void,
    onSelect?: (datum: DotPlotDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((datum: DotPlotDatum, index: number) => { enter(index); onHover?.(datum, index); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((datum: DotPlotDatum, index: number) => { onSelect?.(datum, index); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
