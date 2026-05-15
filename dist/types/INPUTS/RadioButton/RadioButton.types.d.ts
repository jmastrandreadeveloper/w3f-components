import React from 'react';
export type RadioGroupDirection = 'horizontal' | 'vertical';
export interface RadioButtonProps {
    label: string;
    value: string;
    disabled?: boolean;
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
export interface RadioGroupProps {
    children: React.ReactNode;
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    direction?: RadioGroupDirection;
    label?: string;
    showSelection?: boolean;
    className?: string;
    error?: string;
    required?: boolean;
    onBlur?: () => void;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
export interface RadioGroupContextValue {
    selectedValue: string;
    onChange: (value: string) => void;
    name: string;
    direction: RadioGroupDirection;
}
//# sourceMappingURL=RadioButton.types.d.ts.map