import type { GanttTask } from './Gantt.types';
import { GANTT_ROOT_CLASS } from './Gantt.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';
import type { ColorSchemeName } from '../_base/types';

export function buildGanttClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(GANTT_ROOT_CLASS, className, unstyled);
}

/**
 * Map each unique group name to a color from the resolved palette.
 */
export function buildGanttColors(
    groups: readonly string[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
): Record<string, string> {
    const palette = resolveColorScheme(colorScheme);
    const result: Record<string, string> = {};
    groups.forEach((g, i) => {
        result[g] = palette[i % palette.length];
    });
    return result;
}

/**
 * Normalize a date input (Date | string | number) to a Date object.
 */
export function toDate(d: Date | string | number): Date {
    if (d instanceof Date) return d;
    return new Date(d);
}

/**
 * Format a date as "MMM DD" (e.g. "Jan 05").
 */
export function formatDate(d: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate().toString().padStart(2, '0')}`;
}

/**
 * Build a tooltip string for a Gantt task.
 */
export function buildTooltipContent(task: GanttTask): string {
    const start = formatDate(toDate(task.start));
    const end = formatDate(toDate(task.end));
    let text = `${task.label}: ${start} \u2013 ${end}`;
    if (task.progress != null) {
        text += ` (${Math.round(task.progress * 100)}%)`;
    }
    return text;
}
