import { useMemo, useCallback } from 'react';
import type { Datum1D } from '../_base/types';
import { buildPolarBarColors } from './PolarBar.utils';
import { useHoveredIndex } from '../_base/hooks';

export function usePolarBarColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildPolarBarColors(count, colorScheme), [count, colorScheme]);
}

export function usePolarBarInteraction(
    onHover?: (datum: Datum1D | null, index: number | null) => void,
    onSelect?: (datum: Datum1D, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: Datum1D, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: Datum1D, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';
