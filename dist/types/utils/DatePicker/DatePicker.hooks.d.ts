import type { DateValue, DateRangeValue, CalendarMonth } from './DatePicker.types';
export declare function useMonthNavigation(initialMonth?: Date | string): {
    current: CalendarMonth;
    days: import("./DatePicker.types").DayCell[];
    goPrev: () => void;
    goNext: () => void;
    setMonth: (cal: CalendarMonth) => void;
};
export declare function useDropdown(): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    rootRef: import("react").RefObject<HTMLDivElement | null>;
};
export declare function useSingleDate(defaultValue?: Date | null, onChange?: (v: DateValue | null) => void, disabledDates?: Date[], minDate?: Date, maxDate?: Date): {
    selected: Date | null;
    select: (date: Date) => void;
    clear: () => void;
};
export declare function useDateRange(defaultValue?: DateRangeValue | null, onChange?: (v: DateRangeValue) => void, disabledDates?: Date[], minDate?: Date, maxDate?: Date): {
    startDate: Date | null;
    endDate: Date | null;
    selecting: "end" | "start";
    selectDate: (date: Date) => void;
    clear: () => void;
    isDayInRange: (date: Date) => boolean;
    isDayStart: (date: Date) => boolean;
    isDayEnd: (date: Date) => boolean;
};
interface PickerEntry {
    id: number;
    value: DateValue | null;
    initialMonth: Date;
}
export declare function useMultipleDatePicker(onChange?: (values: DateValue[]) => void, onAccept?: (values: DateValue[]) => void): {
    pickers: PickerEntry[];
    addPicker: () => void;
    removePicker: (id: number) => void;
    updateValue: (id: number, value: DateValue | null) => void;
    accept: () => void;
};
export {};
//# sourceMappingURL=DatePicker.hooks.d.ts.map