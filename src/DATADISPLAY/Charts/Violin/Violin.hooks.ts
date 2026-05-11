import { useMemo, useCallback } from 'react';
import type { ViolinGroup } from './Violin.types';
import { buildViolinScales, kde } from './Violin.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useViolinScales(
    data: readonly ViolinGroup[],
    innerWidth: number,
    innerHeight: number,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildViolinScales(data, innerWidth, innerHeight, yDomain),
        [data, innerWidth, innerHeight, yDomain],
    );
}

export function useViolinKDE(
    data: readonly ViolinGroup[],
    yMin: number,
    yMax: number,
    resolution: number,
    bandwidth: number,
) {
    return useMemo(
        () => data.map((g) => kde(g.values, yMin, yMax, resolution, bandwidth)),
        [data, yMin, yMax, resolution, bandwidth],
    );
}

export function useViolinColors(data: readonly ViolinGroup[], colorScheme: unknown) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme as any);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

export function useViolinInteraction(
    onHover?: (datum: ViolinGroup | null, index: number | null) => void,
    onSelect?: (datum: ViolinGroup, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: ViolinGroup, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: ViolinGroup, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
