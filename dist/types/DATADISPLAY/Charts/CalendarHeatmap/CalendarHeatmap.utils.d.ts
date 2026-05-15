import type { CalendarDatum } from './CalendarHeatmap.types';
export declare function buildCalendarClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function toDate(d: Date | string): Date;
export type CalendarCell = {
    date: Date;
    dayOfWeek: number;
    weekIndex: number;
    value: number;
    datum: CalendarDatum | null;
};
/**
 * Build a grid of cells for one year of data.
 * Returns cells for every day from Jan 1 to Dec 31 of the year present in data.
 */
export declare function buildCalendarCells(data: readonly CalendarDatum[]): {
    cells: CalendarCell[];
    year: number;
    weeksCount: number;
};
/**
 * Map a value to a color from the ramp.
 */
export declare function valueToColor(value: number, maxValue: number, emptyColor: string, colorRamp: readonly string[]): string;
export declare function buildTooltipContent(cell: CalendarCell, formatValue?: (v: number) => string): string;
export declare function getMonthBoundaries(cells: CalendarCell[]): {
    month: string;
    weekIndex: number;
}[];
//# sourceMappingURL=CalendarHeatmap.utils.d.ts.map