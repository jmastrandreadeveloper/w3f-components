import React from 'react';

export type EmailFieldSize = 'sm' | 'md' | 'lg';

export interface EmailFieldProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'type'
    > {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    size?: EmailFieldSize;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /** Valida el formato mientras se escribe (default: solo en blur) */
    validateOnChange?: boolean;
}
