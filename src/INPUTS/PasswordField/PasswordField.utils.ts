import type { PasswordFieldSize, PasswordStrength } from './PasswordField.types';
import { PASSWORDFIELD_CLASSES } from './PasswordField.constants';

export function getPasswordStrength(password: string): PasswordStrength | null {
    if (!password) return null;
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
}

export function buildContainerClasses(className?: string, unstyled?: boolean): string {
    const base = PASSWORDFIELD_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}

export function buildWrapperClasses(size: PasswordFieldSize): string {
    return [
        PASSWORDFIELD_CLASSES.wrapper,
        PASSWORDFIELD_CLASSES.wrapperSizes[size],
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildInputClasses(): string {
    return [
        PASSWORDFIELD_CLASSES.input,
        PASSWORDFIELD_CLASSES.hasLeading,
        PASSWORDFIELD_CLASSES.hasTrailing,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(isFloating: boolean): string {
    return [
        PASSWORDFIELD_CLASSES.label,
        isFloating && PASSWORDFIELD_CLASSES.labelFloating,
        !isFloating && PASSWORDFIELD_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildStrengthSegmentClasses(
    segmentIndex: number,
    activeSegments: number,
    strength: PasswordStrength,
): string {
    const isActive = segmentIndex < activeSegments;
    return [
        PASSWORDFIELD_CLASSES.strengthSegment,
        isActive && PASSWORDFIELD_CLASSES.strengthSegmentActive,
        isActive && PASSWORDFIELD_CLASSES.strengthModifiers[strength],
    ]
        .filter(Boolean)
        .join(' ');
}
