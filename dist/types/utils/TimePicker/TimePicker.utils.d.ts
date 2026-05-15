import type { TimeValue, AmPm } from './TimePicker.types';
export declare function buildTimeValue(hours24: number, minutes: number, seconds: number, format: 12 | 24): TimeValue;
export declare function parsePartialTime(partial: Partial<TimeValue> | null | undefined): {
    hours24: number;
    minutes: number;
    seconds: number;
};
export declare function getNowValues(): {
    hours24: number;
    minutes: number;
    seconds: number;
};
export declare function to24Hour(h12: number, ampm: AmPm): number;
export declare function to12Hour(h24: number): number;
export declare function getMinuteValues(step: number): number[];
export declare function getSecondValues(step: number): number[];
export declare function formatTimeDisplay(hours24: number, minutes: number, seconds: number, format: 12 | 24, showSeconds: boolean): string;
export declare function findClosestIndex(values: number[], target: number): number;
//# sourceMappingURL=TimePicker.utils.d.ts.map