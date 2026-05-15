import React from 'react';
export type NumberFieldSize = 'sm' | 'md' | 'lg';
export interface NumberFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'min' | 'max' | 'step' | 'size' | 'type'> {
    label?: string;
    name?: string;
    value?: number | string;
    onChange?: (value: number | '') => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    size?: NumberFieldSize;
    leadingIcon?: React.ReactNode;
    placeholder?: string;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    /** Visual variant: solid (default), outlined, ghost, soft */
    variant?: 'solid' | 'outlined' | 'ghost' | 'soft';
}
//# sourceMappingURL=NumberField.types.d.ts.map