import type { ButtonToggleValue } from './ButtonToggle.types';
/**
 * Construye las clases CSS del contenedor toggle.
 */
export declare function buildButtonToggleClasses(className?: string, unstyled?: boolean): string;
/**
 * Determina si una opción está activa según el modo de selección.
 */
export declare function isOptionActive(optionValue: string | number, currentValue: ButtonToggleValue, multiple: boolean): boolean;
/**
 * Calcula el nuevo estado de selección después de un click.
 */
export declare function computeNewSelection(optionValue: string | number, currentValue: ButtonToggleValue, multiple: boolean, allowDeselect: boolean): ButtonToggleValue;
//# sourceMappingURL=ButtonToggle.utils.d.ts.map