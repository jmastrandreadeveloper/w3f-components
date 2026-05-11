import { BASE_Z_INDEX, DESKTOP_CLASSES } from './Desktop.constants';

/**
 * Calcula el z-index de una ventana dado su orden en el array.
 */
export function getWindowZIndex(windowOrder: string[], key: string): number {
    const index = windowOrder.indexOf(key);
    return index !== -1 ? BASE_Z_INDEX + index : BASE_Z_INDEX;
}

/**
 * Mueve una ventana al frente del orden (fin del array).
 */
export function bringToFront(order: string[], key: string): string[] {
    if (order[order.length - 1] === key) return order;
    return [...order.filter((k) => k !== key), key];
}

/**
 * Sincroniza el order array con las keys actuales de los hijos.
 */
export function syncWindowOrder(prevOrder: string[], currentKeys: string[]): string[] {
    const filtered = prevOrder.filter((key) => currentKeys.includes(key));
    currentKeys.forEach((key) => {
        if (!filtered.includes(key)) filtered.push(key);
    });
    return filtered;
}

/**
 * Construye las clases del contenedor Desktop.
 */
export function buildDesktopClasses(
    className: string,
    unstyled?: boolean,
): string {
    const base = DESKTOP_CLASSES.root;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}
