import type { ReactNode } from 'react';
export interface DateValue {
    date: Date;
    formatted: string;
    display: string;
    day: number;
    month: number;
    year: number;
    weekday: string;
    timestamp: number;
}
export interface DateRangeValue {
    startDate: DateValue | null;
    endDate: DateValue | null;
    formattedRange: string;
    days: number;
}
export type DatePickerMode = 'single' | 'range' | 'multiple';
export interface BaseDatePickerProps {
    /** Initial month to show (Date object or "YYYY-MM" string) */
    initialMonth?: Date | string;
    /** Field name for form integration */
    name?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Disable specific dates */
    disabledDates?: Date[];
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Show week numbers */
    showWeekNumbers?: boolean;
    /** Locale for display */
    locale?: string;
}
export interface DatePickerProps extends BaseDatePickerProps {
    /** Currently selected date (controlled) */
    value?: Date | null;
    /** Default selected date (uncontrolled) */
    defaultValue?: Date | null;
    /** Fired when date changes */
    onChange?: (value: DateValue | null) => void;
    /** Show as always-visible (true) or dropdown (false) */
    inline?: boolean;
    /** Show "Clear" button */
    clearable?: boolean;
}
export interface DateRangePickerProps extends BaseDatePickerProps {
    value?: DateRangeValue | null;
    defaultValue?: DateRangeValue | null;
    onChange?: (value: DateRangeValue) => void;
    /** Show two calendars side by side */
    dual?: boolean;
    /** Allow discontinuous (independent) months in dual mode */
    discontinuous?: boolean;
}
export interface MultipleDatePickerProps extends BaseDatePickerProps {
    value?: DateValue[];
    defaultValue?: DateValue[];
    onChange?: (values: DateValue[]) => void;
    /** Max number of date pickers that can be added */
    maxPickers?: number;
    /** Label for the Accept button */
    acceptLabel?: string;
    onAccept?: (values: DateValue[]) => void;
    children?: ReactNode;
}
export interface CalendarMonth {
    year: number;
    month: number;
}
export interface DayCell {
    date: Date;
    dayNum: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSunday: boolean;
    isDisabled: boolean;
}
//# sourceMappingURL=DatePicker.types.d.ts.map