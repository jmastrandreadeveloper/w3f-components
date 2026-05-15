import type { ComponentType } from 'react';
export type IconSizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconColorName = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'white' | 'black' | 'gray';
export interface IconProps {
    name: string;
    size?: number | string | IconSizeName;
    color?: string | IconColorName;
    className?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
export interface LucideIconProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
}
export interface UseIconResult {
    LucideIcon: ComponentType<LucideIconProps> | null;
    size: number;
    color: string;
    className: string;
    name: string;
}
//# sourceMappingURL=Icon.types.d.ts.map