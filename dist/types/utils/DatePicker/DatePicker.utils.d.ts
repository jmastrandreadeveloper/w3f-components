import type { DateValue, DateRangeValue, DayCell, CalendarMonth } from './DatePicker.types';
export declare function toDateValue(date: Date): DateValue;
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isToday(date: Date): boolean;
export declare function isBetween(date: Date, start: Date | null, end: Date | null): boolean;
export declare function isDateDisabled(date: Date, disabledDates?: Date[], minDate?: Date, maxDate?: Date): boolean;
export declare function buildCalendarDays(year: number, month: number): DayCell[];
export declare function prevMonth(cal: CalendarMonth): CalendarMonth;
export declare function nextMonth(cal: CalendarMonth): CalendarMonth;
export declare function formatMonthTitle(year: number, month: number): string;
export declare function buildRangeValue(startDate: Date | null, endDate: Date | null): DateRangeValue;
export declare function parseInitialMonth(initialMonth?: Date | string): CalendarMonth;
//# sourceMappingURL=DatePicker.utils.d.ts.map