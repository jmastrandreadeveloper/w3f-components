import type { BottomNavColor, BottomNavVariant } from './BottomNavigation.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const BOTTOM_NAV_DEFAULTS = {
    color: 'primary' as BottomNavColor,
    variant: 'filled' as BottomNavVariant,
    showLabels: true,
    fixed: false,
    disabled: false,
    unstyled: false,
    className: '',
} as const;

export const BOTTOM_NAV_ACTION_DEFAULTS = {
    disabled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const BOTTOM_NAV_CLASSES = {
    nav: 'w3f-bottom-nav',
    action: 'w3f-bottom-nav-action',
    actionActive: 'w3f-bottom-nav-action--active',
    actionDisabled: 'w3f-bottom-nav-action--disabled',
    actionIconOnly: 'w3f-bottom-nav-action--icon-only',
    icon: 'w3f-bottom-nav-action__icon',
    badge: 'w3f-bottom-nav-action__badge',
    label: 'w3f-bottom-nav-action__label',
} as const;
