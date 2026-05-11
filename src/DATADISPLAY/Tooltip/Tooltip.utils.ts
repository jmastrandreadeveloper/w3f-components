import type { TooltipPosition, TooltipVariant } from './Tooltip.types';

/** Mapa de clases de variante */
const VARIANT_CLASSES: Record<TooltipVariant, string> = {
    dark: 'w3f-tooltip-dark',
    light: 'w3f-tooltip-light',
    primary: 'w3f-tooltip-primary',
    success: 'w3f-tooltip-success',
    warning: 'w3f-tooltip-warning',
    danger: 'w3f-tooltip-danger',
    info: 'w3f-tooltip-info',
};

/**
 * Construye las clases CSS del contenido del tooltip.
 */
export const buildTooltipClasses = (
    position: TooltipPosition,
    variant: TooltipVariant,
    isVisible: boolean,
    unstyled?: boolean
): string => {
    if (unstyled) {
        return ['w3f-tooltip-content', 'w3f-tooltip--unstyled', isVisible && 'w3f-tooltip-visible']
            .filter(Boolean)
            .join(' ');
    }

    const classes: string[] = [
        'w3f-tooltip-content',
        `w3f-tooltip-${position}`,
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark,
    ];

    if (isVisible) classes.push('w3f-tooltip-visible');

    return classes.filter(Boolean).join(' ');
};

/**
 * Construye las clases CSS de la flecha del tooltip.
 */
export const buildArrowClasses = (position: TooltipPosition): string => {
    return `w3f-tooltip-arrow w3f-tooltip-arrow-${position}`;
};
