import { useMemo, useCallback } from 'react';
import type { GanttTask } from './Gantt.types';
import type { ColorSchemeName } from '../_base/types';
import { buildGanttColors } from './Gantt.utils';
import { useHoveredIndex } from '../_base/hooks';

/**
 * Returns a stable color map: group name -> color string.
 */
export function useGanttColors(
    groups: readonly string[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
): Record<string, string> {
    return useMemo(
        () => buildGanttColors(groups, colorScheme),
        [groups, colorScheme],
    );
}

/**
 * Hover/select interaction for Gantt tasks.
 */
export function useGanttInteraction(
    onHover?: (datum: GanttTask | null, index: number | null) => void,
    onSelect?: (datum: GanttTask, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: GanttTask, index: number) => {
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
        (datum: GanttTask, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
