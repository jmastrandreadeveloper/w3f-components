import { useMemo, useCallback } from 'react';
import type { CandlestickDatum, CandlestickData } from './Candlestick.types';
import { buildCandlestickScales } from './Candlestick.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';

export function useCandlestickScales(
    data: CandlestickData,
    innerWidth: number,
    innerHeight: number,
    volumeHeight: number,
) {
    return useMemo(
        () => buildCandlestickScales(data, innerWidth, innerHeight, volumeHeight),
        [data, innerWidth, innerHeight, volumeHeight],
    );
}

export function useCandlestickInteraction(
    onHover?: (datum: CandlestickDatum | null, index: number | null) => void,
    onSelect?: (datum: CandlestickDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: CandlestickDatum, index: number) => {
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
        (datum: CandlestickDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
