import type { ButtonGroupOrientation } from './ButtonGroup.types';
import { BUTTON_GROUP_CLASSES } from './ButtonGroup.constants';

/**
 * Construye las clases CSS del contenedor del grupo.
 */
export function buildButtonGroupClasses(
    orientation: ButtonGroupOrientation,
    fullWidth: boolean,
    disabled: boolean,
    responsive: boolean,
    className?: string,
    unstyled?: boolean,
): string {
    const base = BUTTON_GROUP_CLASSES.base;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        orientation === 'vertical'
            ? BUTTON_GROUP_CLASSES.vertical
            : BUTTON_GROUP_CLASSES.horizontal,
        fullWidth && BUTTON_GROUP_CLASSES.fullWidth,
        disabled && BUTTON_GROUP_CLASSES.disabled,
        responsive && BUTTON_GROUP_CLASSES.responsive,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Determina la posición de un botón dentro del grupo (para border-radius en CSS).
 * Retorna 'first', 'last' o 'middle'.
 */
export function getButtonPosition(index: number, total: number): string {
    if (total === 1) return 'first';
    if (index === 0) return 'first';
    if (index === total - 1) return 'last';
    return 'middle';
}
