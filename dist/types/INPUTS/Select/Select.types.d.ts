import React from 'react';
export interface SelectOption {
    value: string | number | null;
    label: string;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
    disabled?: boolean;
}
export type SelectOptionOrGroup = SelectOption | SelectOptionGroup;
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'multiple' | 'size'> {
    label?: string;
    name?: string;
    options?: SelectOptionOrGroup[];
    value?: string | string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    autoFocus?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    /** Visual variant: solid (default), outlined, ghost, soft */
    variant?: 'solid' | 'outlined' | 'ghost' | 'soft';
}
//# sourceMappingURL=Select.types.d.ts.map