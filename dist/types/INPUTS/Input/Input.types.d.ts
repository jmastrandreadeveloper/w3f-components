import React from 'react';
import type { MaskDefinition } from './Input.masks';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'pattern'> {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    /** Icono al inicio: string (nombre de icono) o ReactNode */
    leadingIcon?: React.ReactNode | string;
    /** Icono al final: string (nombre de icono) o ReactNode */
    trailingIcon?: React.ReactNode | string;
    /** Handler click en el trailing icon (p.ej. mostrar/ocultar contraseña) */
    onIconClick?: () => void;
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    /** Input mask — predefined name ('phone','date','currency','credit-card','zip-code','cuit') or custom MaskDefinition */
    mask?: string | MaskDefinition;
    /** Regex pattern for validation on blur. Shows error if value doesn't match. */
    pattern?: string | RegExp;
    /** Visual variant: solid (default), outlined, ghost, soft */
    variant?: 'solid' | 'outlined' | 'ghost' | 'soft';
    /** Size of the input field */
    size?: 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
//# sourceMappingURL=Input.types.d.ts.map