import type React from 'react';
export type LinkColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'inherit';
export type LinkUnderline = 'always' | 'hover' | 'none';
export type LinkVariant = 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
export type LinkIconPosition = 'left' | 'right';
export interface LinkProps {
    href?: string;
    children?: React.ReactNode;
    color?: LinkColor;
    underline?: LinkUnderline;
    variant?: LinkVariant;
    component?: React.ElementType;
    disabled?: boolean;
    external?: boolean;
    icon?: React.ReactNode;
    iconPosition?: LinkIconPosition;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    [key: string]: unknown;
}
//# sourceMappingURL=Link.types.d.ts.map