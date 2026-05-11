import type { AuthVariant, AuthColor, AuthFieldErrors } from './AuthLogin.types';
import { AUTH_CLASSES, VALIDATION_RULES } from './AuthLogin.constants';

// ─── Email validation ───────────────────────────────────────────────
export function validateEmail(email: string): string | undefined {
    if (!email.trim()) return 'Email is required';
    if (!VALIDATION_RULES.email.test(email)) return 'Invalid email format';
    return undefined;
}

// ─── Password validation with strength ──────────────────────────────
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export function validatePassword(password: string): {
    error?: string;
    strength: PasswordStrength;
    score: number;
} {
    if (!password) return { error: 'Password is required', strength: 'weak', score: 0 };
    if (password.length < VALIDATION_RULES.passwordMinLength) {
        return {
            error: `Password must be at least ${VALIDATION_RULES.passwordMinLength} characters`,
            strength: 'weak',
            score: 1,
        };
    }

    let score = 1;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strength: PasswordStrength =
        score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong';

    return { strength, score: Math.min(score, 4) };
}

// ─── Login form validation ──────────────────────────────────────────
export function validateLoginForm(email: string, password: string): AuthFieldErrors {
    const errors: AuthFieldErrors = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;
    if (!password) errors.password = 'Password is required';
    return errors;
}

// ─── Register form validation ───────────────────────────────────────
export function validateRegisterForm(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean,
): AuthFieldErrors {
    const errors: AuthFieldErrors = {};

    if (!name.trim()) errors.name = 'Name is required';
    else if (name.trim().length < VALIDATION_RULES.nameMinLength)
        errors.name = `Name must be at least ${VALIDATION_RULES.nameMinLength} characters`;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const { error: passErr } = validatePassword(password);
    if (passErr) errors.password = passErr;

    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (!acceptTerms) errors.terms = 'You must accept the terms and conditions';

    return errors;
}

// ─── Forgot password validation ─────────────────────────────────────
export function validateForgotForm(email: string): AuthFieldErrors {
    const errors: AuthFieldErrors = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;
    return errors;
}

// ─── CSS class builder ──────────────────────────────────────────────
export function buildAuthClasses(
    variant: AuthVariant,
    color: AuthColor,
    className?: string,
): string {
    return [
        AUTH_CLASSES.base,
        AUTH_CLASSES.variants[variant],
        AUTH_CLASSES.colors[color],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

// ─── Check if errors object is empty ────────────────────────────────
export function hasErrors(errors: AuthFieldErrors): boolean {
    return Object.keys(errors).length > 0;
}
