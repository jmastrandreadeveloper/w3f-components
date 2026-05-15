import type { GanttTask } from './Gantt.types';
import type { ColorSchemeName } from '../_base/types';
export declare function buildGanttClasses(className: string | undefined, unstyled: boolean | undefined): string;
/**
 * Map each unique group name to a color from the resolved palette.
 */
export declare function buildGanttColors(groups: readonly string[], colorScheme: ColorSchemeName | readonly string[] | undefined): Record<string, string>;
/**
 * Normalize a date input (Date | string | number) to a Date object.
 */
export declare function toDate(d: Date | string | number): Date;
/**
 * Format a date as "MMM DD" (e.g. "Jan 05").
 */
export declare function formatDate(d: Date): string;
/**
 * Build a tooltip string for a Gantt task.
 */
export declare function buildTooltipContent(task: GanttTask): string;
//# sourceMappingURL=Gantt.utils.d.ts.map