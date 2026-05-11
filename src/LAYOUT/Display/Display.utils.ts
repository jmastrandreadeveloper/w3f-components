import { W3F_POSITION_CLASSES } from './Display.constants';

/**
 * Construye las clases CSS del DisplayContainer.
 */
export function buildDisplayContainerClasses(className?: string): string {
    return [W3F_POSITION_CLASSES.CONTAINER, className].filter(Boolean).join(' ');
}
