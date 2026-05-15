import React from 'react';
export type ToggleButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ToggleButtonSize = 'sm' | 'md' | 'lg';
export type ToggleButtonOrientation = 'horizontal' | 'vertical';
export interface ToggleButtonProps {
    children: React.ReactNode;
    value: string | number;
    selected?: boolean;
    onChange?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>, value: string | number) => void;
    color?: ToggleButtonColor;
    size?: ToggleButtonSize;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
    'aria-label'?: string;
    role?: string;
    'aria-checked'?: boolean;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
export interface ToggleButtonGroupProps {
    name?: string;
    value?: string | number | (string | number)[] | null;
    onChange?: (event: React.SyntheticEvent, newValue: string | number | (string | number)[] | null) => void;
    exclusive?: boolean;
    color?: ToggleButtonColor;
    size?: ToggleButtonSize;
    fullWidth?: boolean;
    orientation?: ToggleButtonOrientation;
    className?: string;
    children: React.ReactNode;
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    'aria-label'?: string;
}
//# sourceMappingURL=ToggleButton.types.d.ts.map