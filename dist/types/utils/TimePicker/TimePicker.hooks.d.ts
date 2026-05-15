import type React from 'react';
import type { TimeValue, AmPm } from './TimePicker.types';
export declare function useTPDropdown(): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    rootRef: React.RefObject<HTMLDivElement | null>;
};
export declare function useTimePicker(options: {
    defaultValue?: Partial<TimeValue> | null;
    format?: 12 | 24;
    showSeconds?: boolean;
    minuteStep?: number;
    secondStep?: number;
    onChange?: (v: TimeValue) => void;
}): {
    hours24: number;
    minutes: number;
    seconds: number;
    ampm: AmPm;
    hours12: number;
    hourValues: number[];
    minuteValues: number[];
    secondValues: number[];
    currentValue: TimeValue;
    setHour: (raw: number) => void;
    setMinute: (m: number) => void;
    setSecond: (s: number) => void;
    toggleAmPm: () => void;
    setNow: () => void;
    clear: () => void;
};
export declare function useScrollWheel(containerRef: React.RefObject<HTMLDivElement | null>, values: number[], selected: number, onSelect: (v: number) => void): {
    onScroll: () => void;
};
//# sourceMappingURL=TimePicker.hooks.d.ts.map