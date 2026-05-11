import { useMemo, useCallback } from 'react';
import type { DatumHierarchy } from '../_base/types';
import { buildTreemapColors } from './Treemap.utils';
import { useHoveredIndex } from '../_base/hooks';

export function useTreemapColors(leafCount: number, colorScheme: unknown) {
    return useMemo(() => buildTreemapColors(leafCount, colorScheme), [leafCount, colorScheme]);
}

export function useTreemapInteraction(
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
