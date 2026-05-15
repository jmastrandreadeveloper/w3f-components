/**
 * Calcula el z-index de una ventana dado su orden en el array.
 */
export declare function getWindowZIndex(windowOrder: string[], key: string): number;
/**
 * Mueve una ventana al frente del orden (fin del array).
 */
export declare function bringToFront(order: string[], key: string): string[];
/**
 * Sincroniza el order array con las keys actuales de los hijos.
 */
export declare function syncWindowOrder(prevOrder: string[], currentKeys: string[]): string[];
/**
 * Construye las clases del contenedor Desktop.
 */
export declare function buildDesktopClasses(className: string, unstyled?: boolean): string;
//# sourceMappingURL=Desktop.utils.d.ts.map