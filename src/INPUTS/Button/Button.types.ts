import type React from 'react';

// ─── Tipos de variantes y tamaños ──────────────────────────────────
export type ButtonVariant = 'raised' | 'flat' | 'outline';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary';
export type ButtonSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

// ─── Props del componente ──────────────────────────────────────────
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    text?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: ButtonIconPosition;
    className?: string;
    disabled?: boolean;
    /** When true, strips all visual styles — only structural CSS remains.
     *  Compose appearance via trait classes on `className`. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
