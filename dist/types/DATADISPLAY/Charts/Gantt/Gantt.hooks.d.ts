import type { GanttTask } from './Gantt.types';
import type { ColorSchemeName } from '../_base/types';
/**
 * Returns a stable color map: group name -> color string.
 */
export declare function useGanttColors(groups: readonly string[], colorScheme: ColorSchemeName | readonly string[] | undefined): Record<string, string>;
/**
 * Hover/select interaction for Gantt tasks.
 */
export declare function useGanttInteraction(onHover?: (datum: GanttTask | null, index: number | null) => void, onSelect?: (datum: GanttTask, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: GanttTask, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: GanttTask, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Gantt.hooks.d.ts.map