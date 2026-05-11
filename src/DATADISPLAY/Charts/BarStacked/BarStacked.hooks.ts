import { useMemo, useCallback, useState } from 'react';
import type { BarStackedDatum, BarStackedInnerProps } from './BarStacked.types';
import { BAR_STACKED_DEFAULTS } from './BarStacked.constants';
import { buildStackedScales, computeStack, defaultGetLabel } from './BarStacked.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useBarStackedAccessors(getLabel?: (d: BarStackedDatum) => string | number) {
    return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}

export function useBarStackedScales(
    data: readonly BarStackedDatum[], keys: readonly string[],
    innerWidth: number, innerHeight: number,
    getLabel: (d: BarStackedDatum) => string | number,
    padding: number = BAR_STACKED_DEFAULTS.padding,
) {
    return useMemo(
        () => buildStackedScales(data, keys, innerWidth, innerHeight, getLabel, padding),
        [data, keys, innerWidth, innerHeight, getLabel, padding],
    );
}

export function useStackData(
    data: readonly BarStackedDatum[], keys: readonly string[],
    getLabel: (d: BarStackedDatum) => string | number,
) {
    return useMemo(() => computeStack(data, keys, getLabel), [data, keys, getLabel]);
}

export function useBarStackedColors(keys: readonly string[], colorScheme: BarStackedInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = palette[i % palette.length]; });
        return map;
    }, [keys, colorScheme]);
}

export function useBarStackedInteraction(
    onHover?: (datum: BarStackedDatum | null, index: number | null) => void,
    onSelect?: (datum: BarStackedDatum, index: number) => void,
) {
    const [hovered, setHovered] = useState<{ groupIdx: number; keyIdx: number } | null>(null);
    const handleEnter = useCallback((datum: BarStackedDatum, groupIdx: number, keyIdx: number) => {
        setHovered({ groupIdx, keyIdx }); onHover?.(datum, groupIdx);
    }, [onHover]);
    const handleLeave = useCallback(() => { setHovered(null); onHover?.(null, null); }, [onHover]);
    const handleClick = useCallback((datum: BarStackedDatum, groupIdx: number) => { onSelect?.(datum, groupIdx); }, [onSelect]);
    return { hovered, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
