import { useMemo, useCallback } from 'react';
import type { BoxPlotGroup, BoxPlotStats } from './BoxPlot.types';
import { computeStats, buildBoxPlotScales } from './BoxPlot.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBoxPlotStats(data: readonly BoxPlotGroup[]): BoxPlotStats[] {
    return useMemo(() => data.map(computeStats), [data]);
}

export function useBoxPlotScales(
    stats: readonly BoxPlotStats[],
    innerWidth: number,
    innerHeight: number,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildBoxPlotScales(stats, innerWidth, innerHeight, yDomain),
        [stats, innerWidth, innerHeight, yDomain],
    );
}

export function useBoxPlotColors(stats: readonly BoxPlotStats[], colorScheme: unknown) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme as any);
        return stats.map((_, i) => palette[i % palette.length]);
    }, [stats, colorScheme]);
}

export function useBoxPlotInteraction(
    onHover?: (datum: BoxPlotStats | null, index: number | null) => void,
    onSelect?: (datum: BoxPlotStats, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: BoxPlotStats, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: BoxPlotStats, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
