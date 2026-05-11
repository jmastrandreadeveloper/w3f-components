import type React from 'react';

export type AppBarColor = 'primary' | 'secondary' | 'surface' | 'transparent' | 'dark';
export type AppBarPosition = 'fixed' | 'sticky' | 'static' | 'relative';
export type AppBarSize = 'sm' | 'md' | 'lg';

export interface AppBarProps {
    children?: React.ReactNode;
    color?: AppBarColor;
    position?: AppBarPosition;
    size?: AppBarSize;
    elevated?: boolean;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
}
