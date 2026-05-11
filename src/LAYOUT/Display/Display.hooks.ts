import { W3F_POSITION_CLASSES, VALID_DISPLAY_POSITIONS } from './Display.constants';

/**
 * Hook para generar clases CSS para DisplayContainer y sus hijos.
 */
export function useDisplayStyles() {
    const containerClass = W3F_POSITION_CLASSES.CONTAINER;

    const itemClass = (pos?: string): string => {
        if (pos && VALID_DISPLAY_POSITIONS.includes(pos)) {
            return pos;
        }

        if (process.env.NODE_ENV !== 'production' && pos && pos !== '') {
            console.warn(
                `[DisplayContainer] Posición no válida: "${pos}". Las posiciones válidas son: ${VALID_DISPLAY_POSITIONS.join(', ')}`
            );
        }

        return '';
    };

    return {
        containerClass,
        itemClass,
    };
}
