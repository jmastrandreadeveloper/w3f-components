import React from 'react';

export type TextFieldSize = 'sm' | 'md' | 'lg';
export type TextFieldType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

export interface TextFieldProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'type'
    > {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: TextFieldType;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    size?: TextFieldSize;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onIconClick?: () => void;
    placeholder?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    maxLength?: number;
    showCount?: boolean;
    clearable?: boolean;
    onClear?: () => void;
}
