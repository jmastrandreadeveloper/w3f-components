import type { LinkColor, LinkUnderline, LinkVariant, LinkIconPosition } from './Link.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const LINK_DEFAULTS = {
    color: 'primary' as LinkColor,
    underline: 'always' as LinkUnderline,
    variant: 'body1' as LinkVariant,
    disabled: false,
    external: false,
    iconPosition: 'left' as LinkIconPosition,
    unstyled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const LINK_CLASSES = {
    base: 'w3f-link',
    button: 'w3f-link--button',
    disabled: 'w3f-link--disabled',
    icon: 'w3f-link__icon',
} as const;
