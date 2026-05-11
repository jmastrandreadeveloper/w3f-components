import type { NumberFieldSize } from './NumberField.types';
import { NUMBERFIELD_CLASSES, NUMBERFIELD_VARIANT_CLASSES } from './NumberField.constants';

export function roundToPrecision(num: number, precision?: number): number {
    if (precision === undefined) return num;
    return Number(num.toFixed(precision));
}

export function clampValue(num: number, min: number, max: number, precision?: number): number {
    const clamped = Math.max(min, Math.min(max, num));
    return roundToPrecision(clamped, precision);
}

export function isValidNumber(str: string): boolean {
    if (str === '' || str === '-' || str === '.') return false;
    return !isNaN(Number(str));
}

export function formatValue(val: number | string, precision?: number): string {
    if (val === '' || val === null || val === undefined) return '';
    const num = Number(val);
    if (isNaN(num)) return '';
    return precision !== undefined ? num.toFixed(precision) : String(num);
}

export function buildWrapperClasses(size: NumberFieldSize, unstyled?: boolean, variant?: string): string {
    if (unstyled) {
        return [
            NUMBERFIELD_CLASSES.wrapper,
            'w3f-number-field--unstyled',
        ]
            .filter(Boolean)
            .join(' ');
    }
    return [
        NUMBERFIELD_CLASSES.wrapper,
        size !== 'md' ? NUMBERFIELD_CLASSES.wrapperSizes[size] : '',
        variant && NUMBERFIELD_VARIANT_CLASSES[variant],
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildInputClasses(hasLeading: boolean, className?: string): string {
    return [
        NUMBERFIELD_CLASSES.input,
        hasLeading && NUMBERFIELD_CLASSES.inputWithLeading,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(isFloating: boolean, showShifted: boolean): string {
    return [
        NUMBERFIELD_CLASSES.label,
        isFloating && NUMBERFIELD_CLASSES.labelFloating,
        showShifted && NUMBERFIELD_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}
