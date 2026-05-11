// ─── Valores por defecto ────────────────────────────────────────────
export const BUTTON_GROUP_DEFAULTS = {
    variant: 'raised' as const,
    color: 'primary' as const,
    size: 'md' as const,
    orientation: 'horizontal' as const,
    fullWidth: false,
    disabled: false,
    responsive: false,
    unstyled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const BUTTON_GROUP_CLASSES = {
    base: 'w3f-button-group',
    horizontal: 'w3f-button-group--horizontal',
    vertical: 'w3f-button-group--vertical',
    fullWidth: 'w3f-button-group--full-width',
    disabled: 'w3f-button-group--disabled',
    responsive: 'w3f-button-group--responsive',
} as const;
