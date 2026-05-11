import { useMemo, useCallback, useState } from 'react';
import type { ChordRibbonInfo } from './Chord.types';
import { buildChordColors } from './Chord.utils';

export function useChordColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildChordColors(count, colorScheme), [count, colorScheme]);
}

export function useChordInteraction(
    onHover?: (datum: ChordRibbonInfo | null, index: number | null) => void,
    onSelect?: (datum: ChordRibbonInfo, index: number) => void,
) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredDatum, setHoveredDatum] = useState<ChordRibbonInfo | null>(null);
    const handleEnter = useCallback((d: ChordRibbonInfo, i: number) => {
        setHoveredIndex(i);
        setHoveredDatum(d);
        onHover?.(d, i);
    }, [onHover]);
    const handleLeave = useCallback(() => {
        setHoveredIndex(null);
        setHoveredDatum(null);
        onHover?.(null, null);
    }, [onHover]);
    const handleClick = useCallback((d: ChordRibbonInfo, i: number) => {
        onSelect?.(d, i);
    }, [onSelect]);
    return { hoveredIndex, hoveredDatum, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';
