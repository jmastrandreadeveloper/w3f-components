// ─── Valores por defecto ────────────────────────────────────────────
export const CHECKBOX_DEFAULTS = {
    checked: false,
    disabled: false,
    className: '',
    color: 'primary' as const,
    unstyled: false as const,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const CHECKBOX_CLASSES = {
    container: 'w3f-component-container',
    wrapper: 'w3f-checkbox-wrapper',
    wrapperDisabled: 'w3f-checkbox-wrapper--disabled',
    input: 'w3f-checkbox-input',
    label: 'w3f-checkbox-label',
    children: 'w3f-checkbox-children',
    colors: {
        primary: '',
        success: 'w3f-checkbox--success',
        warning: 'w3f-checkbox--warning',
        danger: 'w3f-checkbox--danger',
    },
} as const;
