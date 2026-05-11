import type { EmailFieldSize } from './EmailField.types';
import { EMAILFIELD_CLASSES } from './EmailField.constants';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
    return EMAIL_REGEX.test(value);
}

export function buildContainerClasses(className?: string, unstyled?: boolean): string {
    const base = EMAILFIELD_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}

export function buildWrapperClasses(size: EmailFieldSize): string {
    return [
        EMAILFIELD_CLASSES.wrapper,
        EMAILFIELD_CLASSES.wrapperSizes[size],
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildInputClasses(): string {
    return [
        EMAILFIELD_CLASSES.input,
        EMAILFIELD_CLASSES.hasLeading,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(isFloating: boolean): string {
    return [
        EMAILFIELD_CLASSES.label,
        isFloating && EMAILFIELD_CLASSES.labelFloating,
        !isFloating && EMAILFIELD_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}
