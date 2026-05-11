import { useMemo, useCallback } from 'react';
import type { HistogramBin } from './Histogram.types';
import { computeBins, buildHistogramScales } from './Histogram.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useHistogramBins(
    data: readonly number[],
    binCount: number,
    xDomain?: [number, number],
) {
    return useMemo(() => computeBins(data, binCount, xDomain), [data, binCount, xDomain]);
}

export function useHistogramScales(
    bins: readonly HistogramBin[],
    innerWidth: number,
    innerHeight: number,
) {
    return useMemo(
        () => buildHistogramScales(bins, innerWidth, innerHeight),
        [bins, innerWidth, innerHeight],
    );
}

export function useHistogramColor(colorScheme: unknown) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme as any);
        return palette[0];
    }, [colorScheme]);
}

export function useHistogramInteraction(
    onHover?: (bin: HistogramBin | null, index: number | null) => void,
    onSelect?: (bin: HistogramBin, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((b: HistogramBin, i: number) => { enter(i); onHover?.(b, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((b: HistogramBin, i: number) => { onSelect?.(b, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
