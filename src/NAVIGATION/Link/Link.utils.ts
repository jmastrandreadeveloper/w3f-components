import type { LinkColor, LinkUnderline, LinkVariant } from './Link.types';
import { LINK_CLASSES } from './Link.constants';

/**
 * Construye las clases del componente Link.
 */
export function buildLinkClasses(
    color: LinkColor,
    underline: LinkUnderline,
    variant: LinkVariant,
    disabled: boolean,
    isButton: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [LINK_CLASSES.base, 'w3f-link--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        LINK_CLASSES.base,
        `w3f-link--${color}`,
        `w3f-link--underline-${underline}`,
        `w3f-link--${variant}`,
        disabled && LINK_CLASSES.disabled,
        isButton && LINK_CLASSES.button,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Retorna los atributos necesarios para links externos (target + rel).
 */
export function buildExternalProps(
    external: boolean,
    isButton: boolean,
): Record<string, string> {
    return external && !isButton
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
}
