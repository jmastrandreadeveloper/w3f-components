// ─── Valores por defecto ────────────────────────────────────────────
export const BUTTON_DEFAULTS = {
    type: 'button' as const,
    variant: 'raised' as const,
    color: 'primary' as const,
    size: 'md' as const,
    fullWidth: false,
    iconPosition: 'left' as const,
    disabled: false,
    className: '',
    unstyled: false,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const BUTTON_CLASSES = {
    base: 'w3f-button',
    content: 'w3f-button__content',
    icon: 'w3f-button__icon',
    text: 'w3f-button__text',
    variants: {
        raised: 'w3f-button--raised',
        flat: 'w3f-button--flat',
        outline: 'w3f-button--outline',
    },
    colors: {
        primary: '',
        success: 'w3f-button--success',
        danger: 'w3f-button--danger',
        warning: 'w3f-button--warning',
        info: 'w3f-button--info',
        secondary: 'w3f-button--secondary',
    },
    sizes: {
        xxxs: 'w3f-button--xxxs',
        xxs: 'w3f-button--xxs',
        xs: 'w3f-button--xs',
        sm: 'w3f-button--sm',
        md: 'w3f-button--md',
        lg: 'w3f-button--lg',
        xl: 'w3f-button--xl',
    },
    full: 'w3f-button--full',
} as const;
