import type { PopUpSize, PopUpVariant } from './PopUp.types';

export const POPUP_DEFAULTS = {
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    showCancel: true,
    variant: 'elevated' as PopUpVariant,
    size: 'md' as PopUpSize,
    closeOnOverlayClick: true,
    unstyled: false,
    className: '',
} as const;

export const POPUP_CLASSES = {
    overlay: 'w3f-popup-overlay',
    overlayOpen: 'is-open',
    container: 'w3f-popup-container',
    card: 'w3f-popup-card',
    closeBtn: 'w3f-popup-close-btn',
} as const;
