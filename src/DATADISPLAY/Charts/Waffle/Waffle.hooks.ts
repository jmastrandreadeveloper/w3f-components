import { useMemo, useCallback } from 'react';
import type { DatumSlice } from '../_base/types';
import { buildWaffleColors, buildCellMap } from './Waffle.utils';
import { useHoveredIndex } from '../_base/hooks';

export function useWaffleColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildWaffleColors(count, colorScheme), [count, colorScheme]);
}

export function useWaffleCellMap(data: readonly DatumSlice[], totalCells: number) {
    return useMemo(() => buildCellMap(data, totalCells), [data, totalCells]);
}

export function useWaffleInteraction(
    onHover?: (datum: DatumSlice | null, index: number | null) => void,
    onSelect?: (datum: DatumSlice, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: DatumSlice, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: DatumSlice, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';
