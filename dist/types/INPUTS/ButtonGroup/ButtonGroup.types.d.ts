import type React from 'react';
import type { ButtonVariant, ButtonColor, ButtonSize } from '../Button/Button.types';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export interface ButtonGroupProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    orientation?: ButtonGroupOrientation;
    fullWidth?: boolean;
    disabled?: boolean;
    responsive?: boolean;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    'aria-label'?: string;
}
//# sourceMappingURL=ButtonGroup.types.d.ts.map