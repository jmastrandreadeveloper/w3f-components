import { useMemo, useCallback } from 'react';
import type { AreaDatum, AreaInnerProps } from './Area.types';
import { buildAreaScales, defaultGetDate, defaultGetValue } from './Area.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useAreaAccessors(
    getDate?: (d: AreaDatum) => Date | number | string,
    getValue?: (d: AreaDatum) => number,
) {
    return useMemo(() => ({
        getDate: getDate ?? defaultGetDate,
        getValue: getValue ?? defaultGetValue,
    }), [getDate, getValue]);
}

export function useAreaScales(
    data: readonly AreaDatum[], innerWidth: number, innerHeight: number,
    getDate: (d: AreaDatum) => Date | number | string,
    getValue: (d: AreaDatum) => number,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildAreaScales(data, innerWidth, innerHeight, getDate, getValue, yDomain),
        [data, innerWidth, innerHeight, getDate, getValue, yDomain],
    );
}

export function useAreaColor(colorScheme: AreaInnerProps['colorScheme']) {
    return useMemo(() => resolveColorScheme(colorScheme)[0], [colorScheme]);
}

export function useAreaInteraction(
    onHover?: (datum: AreaDatum | null, index: number | null) => void,
    onSelect?: (datum: AreaDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: AreaDatum, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: AreaDatum, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
