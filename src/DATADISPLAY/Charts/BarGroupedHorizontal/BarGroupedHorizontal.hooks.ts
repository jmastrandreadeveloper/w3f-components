import { useMemo, useCallback, useState } from 'react';
import type { BarGroupedHDatum, BarGroupedHInnerProps } from './BarGroupedHorizontal.types';
import { BAR_GH_DEFAULTS } from './BarGroupedHorizontal.constants';
import { buildGroupedHScales, defaultGetLabel } from './BarGroupedHorizontal.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBarGHAccessors(getLabel?: (d: BarGroupedHDatum) => string | number) {
    return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}

export function useBarGHScales(
    data: readonly BarGroupedHDatum[], keys: readonly string[],
    innerWidth: number, innerHeight: number,
    getLabel: (d: BarGroupedHDatum) => string | number,
    padding: number = BAR_GH_DEFAULTS.padding, xDomain?: [number, number],
) {
    return useMemo(
        () => buildGroupedHScales(data, keys, innerWidth, innerHeight, getLabel, padding, xDomain),
        [data, keys, innerWidth, innerHeight, getLabel, padding, xDomain],
    );
}

export function useBarGHColors(keys: readonly string[], colorScheme: BarGroupedHInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = palette[i % palette.length]; });
        return map;
    }, [keys, colorScheme]);
}

export function useBarGHInteraction(
    onHover?: (datum: BarGroupedHDatum | null, index: number | null) => void,
    onSelect?: (datum: BarGroupedHDatum, index: number) => void,
) {
    const [hovered, setHovered] = useState<{ groupIdx: number; keyIdx: number } | null>(null);
    const handleEnter = useCallback((datum: BarGroupedHDatum, groupIdx: number, keyIdx: number) => {
        setHovered({ groupIdx, keyIdx }); onHover?.(datum, groupIdx);
    }, [onHover]);
    const handleLeave = useCallback(() => { setHovered(null); onHover?.(null, null); }, [onHover]);
    const handleClick = useCallback((datum: BarGroupedHDatum, groupIdx: number) => { onSelect?.(datum, groupIdx); }, [onSelect]);
    return { hovered, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
