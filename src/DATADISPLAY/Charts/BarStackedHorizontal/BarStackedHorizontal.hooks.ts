import { useMemo, useCallback, useState } from 'react';
import type { BarStackedHDatum, BarStackedHInnerProps } from './BarStackedHorizontal.types';
import { BAR_SH_DEFAULTS } from './BarStackedHorizontal.constants';
import { buildStackedHScales, computeStackH, defaultGetLabel } from './BarStackedHorizontal.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBarSHAccessors(getLabel?: (d: BarStackedHDatum) => string | number) {
    return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}

export function useBarSHScales(
    data: readonly BarStackedHDatum[], keys: readonly string[],
    innerWidth: number, innerHeight: number,
    getLabel: (d: BarStackedHDatum) => string | number,
    padding: number = BAR_SH_DEFAULTS.padding,
) {
    return useMemo(
        () => buildStackedHScales(data, keys, innerWidth, innerHeight, getLabel, padding),
        [data, keys, innerWidth, innerHeight, getLabel, padding],
    );
}

export function useStackHData(
    data: readonly BarStackedHDatum[], keys: readonly string[],
    getLabel: (d: BarStackedHDatum) => string | number,
) {
    return useMemo(() => computeStackH(data, keys, getLabel), [data, keys, getLabel]);
}

export function useBarSHColors(keys: readonly string[], colorScheme: BarStackedHInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = palette[i % palette.length]; });
        return map;
    }, [keys, colorScheme]);
}

export function useBarSHInteraction(
    onHover?: (datum: BarStackedHDatum | null, index: number | null) => void,
    onSelect?: (datum: BarStackedHDatum, index: number) => void,
) {
    const [hovered, setHovered] = useState<{ groupIdx: number; keyIdx: number } | null>(null);
    const handleEnter = useCallback((datum: BarStackedHDatum, groupIdx: number, keyIdx: number) => {
        setHovered({ groupIdx, keyIdx }); onHover?.(datum, groupIdx);
    }, [onHover]);
    const handleLeave = useCallback(() => { setHovered(null); onHover?.(null, null); }, [onHover]);
    const handleClick = useCallback((datum: BarStackedHDatum, groupIdx: number) => { onSelect?.(datum, groupIdx); }, [onSelect]);
    return { hovered, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
