export type SliderVariant = 'solid' | 'outlined' | 'ghost' | 'soft';
export interface SliderProps {
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    label?: string;
    showValue?: boolean;
    onChange?: (value: number) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    className?: string;
    variant?: SliderVariant;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
//# sourceMappingURL=Slider.types.d.ts.map