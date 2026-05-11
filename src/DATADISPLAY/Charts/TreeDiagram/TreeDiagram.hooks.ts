import { useMemo, useCallback } from 'react';
import type { DatumHierarchy } from '../_base/types';
import { buildTreeDiagramColors } from './TreeDiagram.utils';
import { useHoveredIndex } from '../_base/hooks';

export function useTreeDiagramColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildTreeDiagramColors(count, colorScheme), [count, colorScheme]);
}

export function useTreeDiagramInteraction(
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
