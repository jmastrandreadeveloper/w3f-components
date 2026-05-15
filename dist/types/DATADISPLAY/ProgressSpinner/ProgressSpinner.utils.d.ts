import type { SpinnerSizeName, SpinnerColorName } from './ProgressSpinner.types';
/**
 * Mapeo de colores de utilidad a variables CSS.
 */
export declare const SPINNER_COLOR_MAP: Record<SpinnerColorName, string>;
/**
 * Tamaños predefinidos en px.
 */
export declare const SPINNER_SIZE_MAP: Record<SpinnerSizeName, number>;
/**
 * Resuelve el diámetro final del spinner.
 */
export declare const resolveSpinnerDiameter: (size: number | string, diameter?: number) => number;
/**
 * Resuelve el color de trazo final.
 */
export declare const resolveSpinnerColor: (color: string) => string;
/**
 * Build CSS classes for the ProgressSpinner wrapper.
 */
export declare const buildProgressSpinnerClasses: (unstyled?: boolean, className?: string) => string;
/**
 * Calcula el stroke-dashoffset para modo determinado.
 */
export declare const calcDashOffset: (mode: string, value: number, circumference: number) => number;
//# sourceMappingURL=ProgressSpinner.utils.d.ts.map