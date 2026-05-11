import type { TextFieldSize } from './TextField.types';
import { TEXTFIELD_CLASSES } from './TextField.constants';

export function stripDigits(value: string): string {
    return value.replace(/\d/g, '');
}

export function isDigitKey(key: string): boolean {
    return /^\d$/.test(key);
}

export function buildContainerClasses(className?: string, unstyled?: boolean): string {
    const base = TEXTFIELD_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}

export function buildWrapperClasses(size: TextFieldSize): string {
    return [
        TEXTFIELD_CLASSES.wrapper,
        TEXTFIELD_CLASSES.wrapperSizes[size],
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildInputClasses(hasLeading: boolean, hasTrailing: boolean): string {
    return [
        TEXTFIELD_CLASSES.input,
        hasLeading && TEXTFIELD_CLASSES.hasLeading,
        hasTrailing && TEXTFIELD_CLASSES.hasTrailing,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(isFloating: boolean, showShifted: boolean): string {
    return [
        TEXTFIELD_CLASSES.label,
        isFloating && TEXTFIELD_CLASSES.labelFloating,
        showShifted && TEXTFIELD_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}
