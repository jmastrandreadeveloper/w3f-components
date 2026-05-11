import { useMemo, useCallback } from 'react';
import type { BarHorizontalDatum, BarHorizontalInnerProps } from './BarHorizontal.types';
import { BAR_H_DEFAULTS } from './BarHorizontal.constants';
import { buildBarHScales, defaultGetLabel, defaultGetValue } from './BarHorizontal.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBarHAccessors(
    getLabel?: (d: BarHorizontalDatum) => string | number,
    getValue?: (d: BarHorizontalDatum) => number,
) {
    return useMemo(() => ({
        getLabel: getLabel ?? defaultGetLabel,
        getValue: getValue ?? defaultGetValue,
    }), [getLabel, getValue]);
}

export function useBarHScales(
    data: readonly BarHorizontalDatum[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarHorizontalDatum) => string | number,
    getValue: (d: BarHorizontalDatum) => number,
    padding: number = BAR_H_DEFAULTS.padding,
    xDomain?: [number, number],
) {
    return useMemo(
        () => buildBarHScales(data, innerWidth, innerHeight, getLabel, getValue, padding, xDomain),
        [data, innerWidth, innerHeight, getLabel, getValue, padding, xDomain],
    );
}

export function useBarHColors(
    data: readonly BarHorizontalDatum[],
    colorScheme: BarHorizontalInnerProps['colorScheme'],
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

export function useBarHInteraction(
    onHover?: (datum: BarHorizontalDatum | null, index: number | null) => void,
    onSelect?: (datum: BarHorizontalDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((datum: BarHorizontalDatum, index: number) => {
        enter(index);
        onHover?.(datum, index);
    }, [enter, onHover]);
    const handleLeave = useCallback(() => {
        leave();
        onHover?.(null, null);
    }, [leave, onHover]);
    const handleClick = useCallback((datum: BarHorizontalDatum, index: number) => {
        onSelect?.(datum, index);
    }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
