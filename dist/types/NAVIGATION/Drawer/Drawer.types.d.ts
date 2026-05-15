import type React from 'react';
export type DrawerVariant = 'temporary' | 'persistent' | 'permanent';
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
export type DrawerColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type DrawerCloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButton';
export interface DrawerProps {
    open?: boolean;
    onClose?: (e: Event | React.MouseEvent, reason: DrawerCloseReason) => void;
    anchor?: DrawerAnchor;
    variant?: DrawerVariant;
    width?: number | string;
    height?: number | string;
    showBackdrop?: boolean;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    color?: DrawerColor;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
    children?: React.ReactNode;
}
//# sourceMappingURL=Drawer.types.d.ts.map