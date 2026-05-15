import type React from 'react';
export type DividerType = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
export type DividerContentPosition = 'left' | 'center' | 'right';
export interface DividerGradient {
    from: string;
    to: string;
    direction?: string;
}
export interface DividersProps {
    type?: DividerType;
    className?: string;
    spacing?: string;
    thickness?: string;
    height?: string;
    color?: string | null;
    variant?: DividerVariant;
    gradient?: DividerGradient | null;
    animated?: boolean;
    children?: React.ReactNode;
    contentStyle?: React.CSSProperties;
    contentPosition?: DividerContentPosition;
    style?: React.CSSProperties;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    [key: string]: unknown;
}
//# sourceMappingURL=Dividers.types.d.ts.map