import type { ProgressBarSize } from './ProgressBar.types';
/**
 * Mapeo de tamaños a clases CSS del contenedor de la barra de progreso.
 */
export declare const PROGRESS_BAR_SIZE_CLASSES: Record<ProgressBarSize, string>;
/**
 * Limita un valor numérico entre 0 y 100.
 */
export declare const clampProgress: (value: number) => number;
/**
 * Genera la clase CSS de color de fondo para la barra.
 */
export declare const getProgressBgClass: (color: string) => string;
/**
 * Obtiene la clase CSS del contenedor según el tamaño.
 */
export declare const getSizeClass: (size: ProgressBarSize) => string;
/**
 * Construye las clases CSS del contenedor de la barra de progreso.
 */
export declare const buildProgressBarClasses: (size: ProgressBarSize, unstyled?: boolean) => string;
//# sourceMappingURL=ProgressBar.utils.d.ts.map