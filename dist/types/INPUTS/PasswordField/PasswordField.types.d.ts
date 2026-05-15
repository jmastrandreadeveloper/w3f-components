import React from 'react';
export type PasswordFieldSize = 'sm' | 'md' | 'lg';
export type PasswordStrength = 'weak' | 'medium' | 'strong';
export interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type'> {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    size?: PasswordFieldSize;
    /** Muestra barra de fortaleza de contraseña */
    showStrength?: boolean;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
//# sourceMappingURL=PasswordField.types.d.ts.map