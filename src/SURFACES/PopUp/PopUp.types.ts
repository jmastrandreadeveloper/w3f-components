import type React from 'react';

export type PopUpVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type PopUpSize = 'sm' | 'md' | 'lg';

export interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /** Contenido del cuerpo (alternativa a children) */
    content?: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    variant?: PopUpVariant;
    size?: PopUpSize;
    closeOnOverlayClick?: boolean;
    children?: React.ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    /** Reemplaza los botones de acción por defecto */
    footerActions?: React.ReactNode;
}
