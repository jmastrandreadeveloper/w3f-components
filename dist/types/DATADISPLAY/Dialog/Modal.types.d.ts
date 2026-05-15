import type React from 'react';
export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalHeaderVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
    headerVariant?: ModalHeaderVariant;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
export interface ModalConfirmProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}
export interface ModalSimpleProps {
    show: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    size?: ModalSize;
}
export interface UserData {
    name: string;
    email: string;
    phone?: string;
}
export interface ModalWithDataProps {
    show: boolean;
    onClose: () => void;
    title: React.ReactNode;
    data: UserData | null;
    size?: ModalSize;
}
//# sourceMappingURL=Modal.types.d.ts.map