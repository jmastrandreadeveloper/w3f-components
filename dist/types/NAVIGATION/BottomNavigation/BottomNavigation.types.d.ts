import type React from 'react';
export type BottomNavColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type BottomNavVariant = 'filled' | 'flat' | 'elevated';
export interface BottomNavContextValue {
    value: string | number | null;
    onChange: (e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void;
    showLabels: boolean;
    color: BottomNavColor;
}
export interface BottomNavigationProps {
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void;
    showLabels?: boolean;
    color?: BottomNavColor;
    variant?: BottomNavVariant;
    fixed?: boolean;
    disabled?: boolean;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export interface BottomNavigationActionProps {
    icon?: React.ReactNode;
    label?: string;
    value?: string | number;
    showLabel?: boolean;
    disabled?: boolean;
    badge?: React.ReactNode | number;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
//# sourceMappingURL=BottomNavigation.types.d.ts.map