import { useMemo, useCallback } from 'react';
import type { LineDatum, LineInnerProps } from './Line.types';
import { LINE_DEFAULTS } from './Line.constants';
import { buildTimeScales, defaultGetDate, defaultGetValue } from './Line.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useLineAccessors(
    getDate?: (d: LineDatum) => Date | number | string,
    getValue?: (d: LineDatum) => number,
) {
    return useMemo(() => ({
        getDate: getDate ?? defaultGetDate,
        getValue: getValue ?? defaultGetValue,
    }), [getDate, getValue]);
}

export function useLineScales(
    data: readonly LineDatum[], innerWidth: number, innerHeight: number,
    getDate: (d: LineDatum) => Date | number | string,
    getValue: (d: LineDatum) => number,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildTimeScales(data, innerWidth, innerHeight, getDate, getValue, yDomain),
        [data, innerWidth, innerHeight, getDate, getValue, yDomain],
    );
}

export function useLineColor(colorScheme: LineInnerProps['colorScheme']) {
    return useMemo(() => resolveColorScheme(colorScheme)[0], [colorScheme]);
}

export function useLineInteraction(
    onHover?: (datum: LineDatum | null, index: number | null) => void,
    onSelect?: (datum: LineDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((datum: LineDatum, index: number) => {
        enter(index); onHover?.(datum, index);
    }, [enter, onHover]);
    const handleLeave = useCallback(() => {
        leave(); onHover?.(null, null);
    }, [leave, onHover]);
    const handleClick = useCallback((datum: LineDatum, index: number) => {
        onSelect?.(datum, index);
    }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
