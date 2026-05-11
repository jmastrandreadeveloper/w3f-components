import type { SpinnerSizeName, SpinnerColorName } from './ProgressSpinner.types';

/**
 * Mapeo de colores de utilidad a variables CSS.
 */
export const SPINNER_COLOR_MAP: Record<SpinnerColorName, string> = {
    primary: 'var(--w3f-primary)',
    secondary: 'var(--w3f-secondary)',
    success: 'var(--w3f-success)',
    warning: 'var(--w3f-warning)',
    danger: 'var(--w3f-danger)',
    info: 'var(--w3f-info)',
    gray: 'var(--w3f-gray-500)',
};

/**
 * Tamaños predefinidos en px.
 */
export const SPINNER_SIZE_MAP: Record<SpinnerSizeName, number> = {
    xs: 16,
    sm: 24,
    md: 40,
    lg: 56,
    xl: 72,
};

/**
 * Resuelve el diámetro final del spinner.
 */
export const resolveSpinnerDiameter = (
    size: number | string,
    diameter?: number
): number => {
    if (diameter !== undefined) return diameter;
    if (typeof size === 'string') {
        return (SPINNER_SIZE_MAP as Record<string, number>)[size] ?? SPINNER_SIZE_MAP.md;
    }
    return size;
};

/**
 * Resuelve el color de trazo final.
 */
export const resolveSpinnerColor = (color: string): string => {
    return (SPINNER_COLOR_MAP as Record<string, string>)[color] ?? color;
};

/**
 * Build CSS classes for the ProgressSpinner wrapper.
 */
export const buildProgressSpinnerClasses = (
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-progress-spinner';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, 'w3f-inline-block w3f-relative', className].filter(Boolean).join(' ');
};

/**
 * Calcula el stroke-dashoffset para modo determinado.
 */
export const calcDashOffset = (
    mode: string,
    value: number,
    circumference: number
): number => {
    if (mode === 'determinate') {
        const clamped = Math.max(0, Math.min(100, value));
        return circumference - (clamped / 100) * circumference;
    }
    return 0;
};
