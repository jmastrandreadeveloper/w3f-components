import type React from 'react';

// ─── Tipos de variante, anchor y color ─────────────────────────────────────
export type DrawerVariant = 'temporary' | 'persistent' | 'permanent';
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
export type DrawerColor =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';

export type DrawerCloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButton';

// ─── Props del componente ───────────────────────────────────────────────────
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
