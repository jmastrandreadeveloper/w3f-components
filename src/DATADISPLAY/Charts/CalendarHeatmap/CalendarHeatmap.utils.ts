import type { CalendarDatum } from './CalendarHeatmap.types';
import { CALENDAR_ROOT_CLASS, CALENDAR_DEFAULTS } from './CalendarHeatmap.constants';
import { buildChartRootClasses } from '../_base/utils';

export function buildCalendarClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(CALENDAR_ROOT_CLASS, className, unstyled);
}

export function toDate(d: Date | string): Date {
    return d instanceof Date ? d : new Date(d);
}

function getWeekOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const startDay = start.getDay();
    const diff = (date.getTime() - start.getTime()) / 86400000;
    return Math.floor((diff + startDay) / 7);
}

export type CalendarCell = {
    date: Date;
    dayOfWeek: number; // 0=Sun, 6=Sat
    weekIndex: number; // column index (week of year relative to start)
    value: number;
    datum: CalendarDatum | null;
};

/**
 * Build a grid of cells for one year of data.
 * Returns cells for every day from Jan 1 to Dec 31 of the year present in data.
 */
export function buildCalendarCells(
    data: readonly CalendarDatum[],
): { cells: CalendarCell[]; year: number; weeksCount: number } {
    // Determine year from data
    const dates = data.map((d) => toDate(d.date));
    const year = dates.length > 0 ? dates[0].getFullYear() : new Date().getFullYear();

    // Build lookup
    const lookup = new Map<string, CalendarDatum>();
    for (const d of data) {
        const dt = toDate(d.date);
        const key = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
        lookup.set(key, d);
    }

    const cells: CalendarCell[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // First week offset: the column for Jan 1
    const startWeek = getWeekOfYear(startDate);

    let current = new Date(startDate);
    while (current <= endDate) {
        const dayOfWeek = current.getDay();
        const weekIndex = getWeekOfYear(current) - startWeek;
        const key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
        const datum = lookup.get(key) ?? null;

        cells.push({
            date: new Date(current),
            dayOfWeek,
            weekIndex,
            value: datum?.value ?? 0,
            datum,
        });

        current = new Date(current.getTime() + 86400000);
    }

    const weeksCount = cells.length > 0 ? cells[cells.length - 1].weekIndex + 1 : 53;

    return { cells, year, weeksCount };
}

/**
 * Map a value to a color from the ramp.
 */
export function valueToColor(
    value: number,
    maxValue: number,
    emptyColor: string,
    colorRamp: readonly string[],
): string {
    if (value <= 0) return emptyColor;
    if (maxValue <= 0) return emptyColor;
    const ratio = Math.min(value / maxValue, 1);
    const idx = Math.min(Math.floor(ratio * colorRamp.length), colorRamp.length - 1);
    return colorRamp[idx];
}

export function buildTooltipContent(cell: CalendarCell, formatValue?: (v: number) => string): string {
    const dateStr = cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const valStr = formatValue ? formatValue(cell.value) : cell.value.toLocaleString();
    return `${dateStr}: ${valStr}`;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMonthBoundaries(cells: CalendarCell[]): { month: string; weekIndex: number }[] {
    const result: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    for (const cell of cells) {
        const m = cell.date.getMonth();
        if (m !== lastMonth) {
            result.push({ month: MONTH_LABELS[m], weekIndex: cell.weekIndex });
            lastMonth = m;
        }
    }
    return result;
}
