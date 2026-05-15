import type { AuthVariant, AuthColor, AuthFieldErrors } from './AuthLogin.types';
export declare function validateEmail(email: string): string | undefined;
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';
export declare function validatePassword(password: string): {
    error?: string;
    strength: PasswordStrength;
    score: number;
};
export declare function validateLoginForm(email: string, password: string): AuthFieldErrors;
export declare function validateRegisterForm(name: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean): AuthFieldErrors;
export declare function validateForgotForm(email: string): AuthFieldErrors;
export declare function buildAuthClasses(variant: AuthVariant, color: AuthColor, className?: string): string;
export declare function hasErrors(errors: AuthFieldErrors): boolean;
//# sourceMappingURL=AuthLogin.utils.d.ts.map