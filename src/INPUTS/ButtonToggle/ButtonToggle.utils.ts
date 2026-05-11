import type { ButtonToggleValue } from './ButtonToggle.types';
import { BUTTON_TOGGLE_CLASSES } from './ButtonToggle.constants';

/**
 * Construye las clases CSS del contenedor toggle.
 */
export function buildButtonToggleClasses(className?: string, unstyled?: boolean): string {
    const base = BUTTON_TOGGLE_CLASSES.base;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}

/**
 * Determina si una opción está activa según el modo de selección.
 */
export function isOptionActive(
    optionValue: string | number,
    currentValue: ButtonToggleValue,
    multiple: boolean,
): boolean {
    if (multiple) {
        return Array.isArray(currentValue) && currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
}

/**
 * Calcula el nuevo estado de selección después de un click.
 */
export function computeNewSelection(
    optionValue: string | number,
    currentValue: ButtonToggleValue,
    multiple: boolean,
    allowDeselect: boolean,
): ButtonToggleValue {
    if (multiple) {
        const current = Array.isArray(currentValue) ? currentValue : [];
        if (current.includes(optionValue)) {
            return current.filter((item) => item !== optionValue);
        }
        return [...current, optionValue];
    }
    // Modo simple
    if (currentValue === optionValue) {
        return allowDeselect ? null : optionValue;
    }
    return optionValue;
}
