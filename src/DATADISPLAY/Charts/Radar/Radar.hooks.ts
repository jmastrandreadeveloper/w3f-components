import { useMemo, useCallback } from 'react';
import type { RadarDatum } from './Radar.types';
import { defaultGetLabel, defaultGetValue, buildRadarScale } from './Radar.utils';
import { useHoveredIndex } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useRadarAccessors(
    getLabel?: (d: RadarDatum) => string,
    getValue?: (d: RadarDatum) => number,
) {
    return useMemo(() => ({
        getLabel: getLabel ?? defaultGetLabel,
        getValue: getValue ?? defaultGetValue,
    }), [getLabel, getValue]);
}

export function useRadarScale(data: readonly RadarDatum[], getValue: (d: RadarDatum) => number, radius: number, maxValue?: number) {
    return useMemo(() => {
        const max = maxValue ?? Math.max(...data.map(getValue), 1);
        return buildRadarScale(max, radius);
    }, [data, getValue, radius, maxValue]);
}

export function useRadarColor(colorScheme: unknown) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme as any);
        return palette[0];
    }, [colorScheme]);
}

export function useRadarInteraction(
    onHover?: (datum: RadarDatum | null, index: number | null) => void,
    onSelect?: (datum: RadarDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: RadarDatum, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: RadarDatum, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';
