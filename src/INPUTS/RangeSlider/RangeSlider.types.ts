export interface RangeValue {
    min: number;
    max: number;
}

export interface RangeSliderProps {
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: RangeValue;
    defaultMinValue?: number;
    defaultMaxValue?: number;
    onChange?: (value: RangeValue) => void;
    formatLabel?: (value: number) => string | number;
    disabled?: boolean;
    ariaLabel?: string;
    error?: string;
    className?: string;
    onBlur?: () => void;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
