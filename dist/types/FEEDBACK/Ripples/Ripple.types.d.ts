import type React from 'react';
export type RippleColor = 'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export interface RippleAnimation {
    enterDuration?: number;
    exitDuration?: number;
}
export interface RippleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    children?: React.ReactNode;
    className?: string;
    color?: RippleColor;
    disabled?: boolean;
    unbounded?: boolean;
    centered?: boolean;
    radius?: number;
    animation?: RippleAnimation;
    trigger?: HTMLElement | null;
    flat?: boolean;
    role?: string;
    tabIndex?: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export interface RippleRef {
    launch: (x?: number, y?: number) => void;
    fadeOutAll: () => void;
}
export interface UseRippleOptions {
    disabled?: boolean;
    centered?: boolean;
    unbounded?: boolean;
    radius?: number;
    enterDuration?: number;
    exitDuration?: number;
}
export interface UseRippleReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    createRipple: (e: React.MouseEvent | {
        clientX: number;
        clientY: number;
    }) => void;
    clearRipples: () => void;
}
//# sourceMappingURL=Ripple.types.d.ts.map