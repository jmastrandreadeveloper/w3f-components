import type { ButtonGroupOrientation } from './ButtonGroup.types';
/**
 * Construye las clases CSS del contenedor del grupo.
 */
export declare function buildButtonGroupClasses(orientation: ButtonGroupOrientation, fullWidth: boolean, disabled: boolean, responsive: boolean, className?: string, unstyled?: boolean): string;
/**
 * Determina la posición de un botón dentro del grupo (para border-radius en CSS).
 * Retorna 'first', 'last' o 'middle'.
 */
export declare function getButtonPosition(index: number, total: number): string;
//# sourceMappingURL=ButtonGroup.utils.d.ts.map