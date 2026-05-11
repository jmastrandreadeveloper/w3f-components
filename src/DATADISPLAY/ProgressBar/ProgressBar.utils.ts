import type { ProgressBarSize } from './ProgressBar.types';

/**
 * Mapeo de tamaños a clases CSS del contenedor de la barra de progreso.
 */
export const PROGRESS_BAR_SIZE_CLASSES: Record<ProgressBarSize, string> = {
    sm: 'w3f-progress-bar-container-sm',
    md: 'w3f-progress-bar-container',
    lg: 'w3f-progress-bar-container-lg',
};

/**
 * Limita un valor numérico entre 0 y 100.
 */
export const clampProgress = (value: number): number => {
    return Math.min(100, Math.max(0, value));
};

/**
 * Genera la clase CSS de color de fondo para la barra.
 */
export const getProgressBgClass = (color: string): string => {
    return `w3f-bg-${color}`;
};

/**
 * Obtiene la clase CSS del contenedor según el tamaño.
 */
export const getSizeClass = (size: ProgressBarSize): string => {
    return PROGRESS_BAR_SIZE_CLASSES[size] || PROGRESS_BAR_SIZE_CLASSES.md;
};

/**
 * Construye las clases CSS del contenedor de la barra de progreso.
 */
export const buildProgressBarClasses = (
    size: ProgressBarSize,
    unstyled?: boolean,
): string => {
    if (unstyled) {
        return 'w3f-progress-bar-container w3f-progress-bar--unstyled';
    }
    return `${getSizeClass(size)} w3f-bg-gray-200`;
};
