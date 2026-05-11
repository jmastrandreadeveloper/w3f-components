import { useMemo, useCallback, useState } from 'react';
import type { BarGroupedDatum, BarGroupedInnerProps } from './BarGrouped.types';
import { BAR_GROUPED_DEFAULTS } from './BarGrouped.constants';
import { buildGroupedScales, defaultGetLabel } from './BarGrouped.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBarGroupedAccessors(getLabel?: (d: BarGroupedDatum) => string | number) {
    return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}

export function useBarGroupedScales(
    data: readonly BarGroupedDatum[],
    keys: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarGroupedDatum) => string | number,
    padding: number = BAR_GROUPED_DEFAULTS.padding,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildGroupedScales(data, keys, innerWidth, innerHeight, getLabel, padding, yDomain),
        [data, keys, innerWidth, innerHeight, getLabel, padding, yDomain],
    );
}

export function useBarGroupedColors(keys: readonly string[], colorScheme: BarGroupedInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = palette[i % palette.length]; });
        return map;
    }, [keys, colorScheme]);
}

export function useBarGroupedInteraction(
    onHover?: (datum: BarGroupedDatum | null, index: number | null) => void,
    onSelect?: (datum: BarGroupedDatum, index: number) => void,
) {
    const [hovered, setHovered] = useState<{ groupIdx: number; keyIdx: number } | null>(null);
    const handleEnter = useCallback((datum: BarGroupedDatum, groupIdx: number, keyIdx: number) => {
        setHovered({ groupIdx, keyIdx });
        onHover?.(datum, groupIdx);
    }, [onHover]);
    const handleLeave = useCallback(() => {
        setHovered(null);
        onHover?.(null, null);
    }, [onHover]);
    const handleClick = useCallback((datum: BarGroupedDatum, groupIdx: number) => {
        onSelect?.(datum, groupIdx);
    }, [onSelect]);
    return { hovered, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
