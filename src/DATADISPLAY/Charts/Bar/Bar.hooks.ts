import { useMemo, useCallback } from 'react';
import type { BarDatum, BarInnerProps } from './Bar.types';
import { BAR_DEFAULTS } from './Bar.constants';
import { buildBarScales, defaultGetLabel, defaultGetValue } from './Bar.utils';
import { useHoveredIndex, useInnerDims, useColorScale } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

/**
 * Resolves accessors from props — always returns stable functions.
 */
export function useBarAccessors(
    getLabel?: (d: BarDatum) => string | number,
    getValue?: (d: BarDatum) => number,
) {
    return useMemo(
        () => ({
            getLabel: getLabel ?? defaultGetLabel,
            getValue: getValue ?? defaultGetValue,
        }),
        [getLabel, getValue],
    );
}

/**
 * Builds the band + linear scales from data and dimensions.
 */
export function useBarScales(
    data: readonly BarDatum[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarDatum) => string | number,
    getValue: (d: BarDatum) => number,
    padding: number = BAR_DEFAULTS.padding,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildBarScales(data, innerWidth, innerHeight, getLabel, getValue, padding, yDomain),
        [data, innerWidth, innerHeight, getLabel, getValue, padding, yDomain],
    );
}

/**
 * Returns the color for each bar, based on the color scheme.
 */
export function useBarColors(
    data: readonly BarDatum[],
    getLabel: (d: BarDatum) => string | number,
    colorScheme: BarInnerProps['colorScheme'],
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

/**
 * Hover + event callbacks for each bar.
 */
export function useBarInteraction(
    onHover?: (datum: BarDatum | null, index: number | null) => void,
    onSelect?: (datum: BarDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: BarDatum, index: number) => {
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
        (datum: BarDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

// Re-export base hooks used by Bar.tsx
export { useChartDimensions, useInnerDims } from '../_base/hooks';
