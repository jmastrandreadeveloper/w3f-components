import type { CheckboxColor } from './Checkbox.types';
import { CHECKBOX_CLASSES } from './Checkbox.constants';

/**
 * Construye las clases del input checkbox con variante de color.
 */
export function buildCheckboxInputClasses(color: CheckboxColor, unstyled?: boolean): string {
    if (unstyled) {
        return [CHECKBOX_CLASSES.input, 'w3f-checkbox--unstyled'].join(' ');
    }
    return [CHECKBOX_CLASSES.input, CHECKBOX_CLASSES.colors[color]]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del contenedor principal.
 */
export function buildCheckboxContainerClasses(className?: string, unstyled?: boolean): string {
    if (unstyled) {
        return [CHECKBOX_CLASSES.container, 'w3f-checkbox--unstyled', className].filter(Boolean).join(' ');
    }
    return [CHECKBOX_CLASSES.container, className].filter(Boolean).join(' ');
}

/**
 * Construye las clases del wrapper (input + label).
 */
export function buildCheckboxWrapperClasses(disabled: boolean, unstyled?: boolean): string {
    if (unstyled) {
        return [CHECKBOX_CLASSES.wrapper, 'w3f-checkbox-wrapper--unstyled'].join(' ');
    }
    return [
        CHECKBOX_CLASSES.wrapper,
        disabled && CHECKBOX_CLASSES.wrapperDisabled,
    ]
        .filter(Boolean)
        .join(' ');
}
