import { useMemo, useCallback } from 'react';
import type { DatumHierarchy } from '../_base/types';
import { buildSunburstColors } from './Sunburst.utils';
import { useHoveredIndex } from '../_base/hooks';

export function useSunburstColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildSunburstColors(count, colorScheme), [count, colorScheme]);
}

export function useSunburstInteraction(
    onHover?: (datum: DatumHierarchy | null, index: number | null) => void,
    onSelect?: (datum: DatumHierarchy, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: DatumHierarchy, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: DatumHierarchy, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';
