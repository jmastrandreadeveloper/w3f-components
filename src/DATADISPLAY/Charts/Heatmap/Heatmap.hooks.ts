import { useMemo, useCallback } from 'react';
import type { HeatmapDatum, HeatmapInnerProps } from './Heatmap.types';
import { extractAxes, buildHeatmapScales, defaultGetRow, defaultGetCol, defaultGetValue } from './Heatmap.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';

export function useHeatmapAccessors(
    getRow?: (d: HeatmapDatum) => string | number,
    getCol?: (d: HeatmapDatum) => string | number,
    getValue?: (d: HeatmapDatum) => number,
) {
    return useMemo(() => ({
        getRow: getRow ?? defaultGetRow,
        getCol: getCol ?? defaultGetCol,
        getValue: getValue ?? defaultGetValue,
    }), [getRow, getCol, getValue]);
}

export function useHeatmapAxes(
    data: readonly HeatmapDatum[],
    getRow: (d: HeatmapDatum) => string | number,
    getCol: (d: HeatmapDatum) => string | number,
) {
    return useMemo(() => extractAxes(data, getRow, getCol), [data, getRow, getCol]);
}

export function useHeatmapScales(
    rows: readonly string[],
    cols: readonly string[],
    data: readonly HeatmapDatum[],
    getValue: (d: HeatmapDatum) => number,
    innerWidth: number,
    innerHeight: number,
    colorRange: [string, string],
) {
    return useMemo(
        () => buildHeatmapScales(rows, cols, data, getValue, innerWidth, innerHeight, colorRange),
        [rows, cols, data, getValue, innerWidth, innerHeight, colorRange],
    );
}

export function useHeatmapInteraction(
    onHover?: (datum: HeatmapDatum | null, index: number | null) => void,
    onSelect?: (datum: HeatmapDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: HeatmapDatum, index: number) => {
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
        (datum: HeatmapDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
