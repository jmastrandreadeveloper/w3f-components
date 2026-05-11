import { useMemo, useCallback } from 'react';
import type { WaterfallDatum, WaterfallData } from './Waterfall.types';
import { computeWaterfallBars, buildWaterfallScales } from './Waterfall.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';

export function useWaterfallBars(data: WaterfallData) {
    return useMemo(() => computeWaterfallBars(data), [data]);
}

export function useWaterfallScales(
    bars: ReturnType<typeof computeWaterfallBars>,
    data: WaterfallData,
    innerWidth: number,
    innerHeight: number,
) {
    return useMemo(
        () => buildWaterfallScales(bars, data, innerWidth, innerHeight),
        [bars, data, innerWidth, innerHeight],
    );
}

export function useWaterfallInteraction(
    onHover?: (datum: WaterfallDatum | null, index: number | null) => void,
    onSelect?: (datum: WaterfallDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: WaterfallDatum, index: number) => {
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
        (datum: WaterfallDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
