import type { DrawerAnchor, DrawerColor, DrawerVariant } from './Drawer.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const DRAWER_DEFAULTS = {
    open: false,
    anchor: 'left' as DrawerAnchor,
    variant: 'temporary' as DrawerVariant,
    width: 280,
    height: 300,
    showBackdrop: true,
    showCloseButton: false,
    closeOnBackdropClick: true,
    closeOnEsc: true,
    color: 'default' as DrawerColor,
    unstyled: false,
    className: '',
    animationDuration: 300,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const DRAWER_CLASSES = {
    root: 'w3f-drawer-root',
    rootOpen: 'w3f-drawer-root--open',
    drawer: 'w3f-drawer',
    open: 'w3f-drawer--open',
    backdrop: 'w3f-drawer__backdrop',
    close: 'w3f-drawer__close',
    content: 'w3f-drawer__content',
} as const;
