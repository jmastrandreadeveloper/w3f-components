// ─── Valores por defecto ────────────────────────────────────────────
export const FAB_DEFAULTS = {
    title: 'Acción',
    offset: 24,
    color: 'primary' as const,
    size: 'default' as const,
    extended: false,
    position: 'bottom-right' as const,
    mobileIconOnly: false,
    disabled: false,
    type: 'button' as const,
    className: '',
    unstyled: false as const,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const FAB_CLASSES = {
    base: 'w3f-fab',
    sizes: {
        mini: 'w3f-fab--mini',
        sm: 'w3f-fab--sm',
        default: '',
        lg: 'w3f-fab--lg',
    },
    extended: 'w3f-fab--extended',
    colors: {
        primary: '',
        success: 'w3f-fab--success',
        danger: 'w3f-fab--danger',
        warning: 'w3f-fab--warning',
        info: 'w3f-fab--info',
        secondary: 'w3f-fab--secondary',
        surface: 'w3f-fab--surface',
        'surface-secondary': 'w3f-fab--surface-secondary',
    },
    positions: {
        left: 'w3f-fab--left',
        center: 'w3f-fab--center',
        top: 'w3f-fab--top',
    },
    mobileIconOnly: 'w3f-fab--mobile-icon-only',
    disabled: 'w3f-fab--disabled',
    error: 'w3f-fab--error',
    icon: 'w3f-fab__icon',
    text: 'w3f-fab__text',
    label: 'w3f-fab__label',
    group: 'w3f-fab-group',
    groupOpen: 'is-open',
    message: 'w3f-fab-message',
} as const;
