import { useMemo, useCallback } from 'react';
import type { ThresholdDatum, ThresholdInnerProps } from './Threshold.types';
import { buildThresholdScales, defaultGetDate, defaultGetValue0, defaultGetValue1 } from './Threshold.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useThresholdAccessors(
    getDate?: (d: ThresholdDatum) => Date | number | string,
    getValue0?: (d: ThresholdDatum) => number,
    getValue1?: (d: ThresholdDatum) => number,
) {
    return useMemo(() => ({
        getDate: getDate ?? defaultGetDate,
        getValue0: getValue0 ?? defaultGetValue0,
        getValue1: getValue1 ?? defaultGetValue1,
    }), [getDate, getValue0, getValue1]);
}

export function useThresholdScales(
    data: readonly ThresholdDatum[],
    innerWidth: number,
    innerHeight: number,
    getDate: (d: ThresholdDatum) => Date | number | string,
    getValue0: (d: ThresholdDatum) => number,
    getValue1: (d: ThresholdDatum) => number,
    yDomain?: [number, number],
) {
    return useMemo(
        () => buildThresholdScales(data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain),
        [data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain],
    );
}

export function useThresholdColors(
    aboveColor: string | undefined,
    belowColor: string | undefined,
    colorScheme: ThresholdInnerProps['colorScheme'],
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return {
            above: aboveColor ?? palette[0],
            below: belowColor ?? palette[1],
            line0: aboveColor ?? palette[0],
            line1: belowColor ?? palette[1],
        };
    }, [aboveColor, belowColor, colorScheme]);
}

export function useThresholdInteraction(
    onHover?: (datum: ThresholdDatum | null, index: number | null) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: ThresholdDatum, i: number) => {
        enter(i); onHover?.(d, i);
    }, [enter, onHover]);
    const handleLeave = useCallback(() => {
        leave(); onHover?.(null, null);
    }, [leave, onHover]);
    return { hoveredIndex, handleEnter, handleLeave };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
