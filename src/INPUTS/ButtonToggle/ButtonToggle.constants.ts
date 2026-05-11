// ─── Valores por defecto ────────────────────────────────────────────
export const BUTTON_TOGGLE_DEFAULTS = {
    options: [] as const,
    multiple: false,
    allowDeselect: false,
    color: 'primary' as const,
    size: 'md' as const,
    disabled: false,
    unstyled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const BUTTON_TOGGLE_CLASSES = {
    base: 'w3f-button-toggle',
} as const;
