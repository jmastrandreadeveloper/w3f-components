import type React from 'react';
export type SnackbarVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';
export interface SnackbarAnchorOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}
export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClose'> {
    open: boolean;
    message?: React.ReactNode;
    onClose?: (event: Event | React.SyntheticEvent | null, reason: SnackbarCloseReason) => void;
    autoHideDuration?: number | null;
    variant?: SnackbarVariant;
    anchorOrigin?: SnackbarAnchorOrigin;
    action?: React.ReactNode;
    resumeHideDuration?: number;
    className?: string;
    /** @deprecated Use `open` instead */
    show?: boolean;
    /** @deprecated Use `autoHideDuration` instead */
    duration?: number;
}
export interface UseSnackbarOptions {
    defaultDuration?: number;
    defaultVariant?: SnackbarVariant;
}
export interface SnackbarState {
    show: boolean;
    message: React.ReactNode;
    variant: SnackbarVariant;
    duration: number;
    anchorOrigin?: SnackbarAnchorOrigin;
    action?: React.ReactNode;
}
export interface ShowSnackbarConfig {
    variant?: SnackbarVariant;
    duration?: number;
    anchorOrigin?: SnackbarAnchorOrigin;
    action?: React.ReactNode;
}
export interface UseSnackbarReturn {
    show: boolean;
    message: React.ReactNode;
    variant: SnackbarVariant;
    duration: number;
    anchorOrigin?: SnackbarAnchorOrigin;
    action?: React.ReactNode;
    showSnackbar: (message: React.ReactNode, config?: ShowSnackbarConfig) => void;
    closeSnackbar: () => void;
    showSuccess: (message: React.ReactNode, config?: ShowSnackbarConfig) => void;
    showWarning: (message: React.ReactNode, config?: ShowSnackbarConfig) => void;
    showDanger: (message: React.ReactNode, config?: ShowSnackbarConfig) => void;
    showInfo: (message: React.ReactNode, config?: ShowSnackbarConfig) => void;
}
//# sourceMappingURL=Snackbar.types.d.ts.map