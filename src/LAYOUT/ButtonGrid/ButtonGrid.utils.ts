import type { ButtonGridAlign } from './ButtonGrid.types';
import { BUTTON_GRID_CLASSES, BUTTON_GRID_ALIGN_MAP } from './ButtonGrid.constants';

/**
 * Construye las clases CSS del ButtonGrid.
 */
export function buildButtonGridClasses(
    align: ButtonGridAlign = 'start',
    className?: string,
): string {
    return [
        BUTTON_GRID_CLASSES.base,
        BUTTON_GRID_CLASSES.gap,
        BUTTON_GRID_CLASSES.wrap,
        BUTTON_GRID_CLASSES.mt,
        BUTTON_GRID_ALIGN_MAP[align],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
